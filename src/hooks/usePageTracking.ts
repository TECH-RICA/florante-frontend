import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import api from "../lib/api";
import { isAdminPath } from "../lib/adminPaths";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
const HEARTBEAT_MS = 20000;
const SCROLL_MILESTONES = [25, 50, 75, 100];

export function usePageTracking() {
  const { pathname } = useLocation();

  const last = useRef<string | null>(null);
  const startAt = useRef(0);
  const sectionTimes = useRef<Record<string, number>>({});
  const visibleSections = useRef<Map<string, number>>(new Map());
  const maxScroll = useRef(0);
  const loggedScroll = useRef<Set<number>>(new Set());
  const heartbeat = useRef<number | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (isAdminPath(pathname)) return;

    if (pathname !== last.current) {
      last.current = pathname;
      api
        .post("/analytics/track/", {
          path: pathname,
          referrer: document.referrer || "",
        })
        .catch(() => {});
    }

    startAt.current = Date.now();
    maxScroll.current = 0;
    loggedScroll.current = new Set();
    sectionTimes.current = {};
    visibleSections.current = new Map();

    const logActivity = (action: string, label = "", meta: Record<string, unknown> = {}) => {
      api
        .post("/analytics/activity/", { path: pathname, action, label, meta })
        .catch(() => {});
    };

    const foldVisibleSections = () => {
      const now = Date.now();
      for (const [name, entered] of visibleSections.current) {
        const secs = (now - entered) / 1000;
        sectionTimes.current[name] = (sectionTimes.current[name] || 0) + secs;
        visibleSections.current.set(name, now);
      }
    };

    const flush = (beacon = false) => {
      foldVisibleSections();
      const elapsed = Math.max(0, Math.floor((Date.now() - startAt.current) / 1000));
      const sections = Object.entries(sectionTimes.current).map(([section, seconds]) => ({
        section,
        seconds: Math.round(seconds),
      }));
      sectionTimes.current = {};
      startAt.current = Date.now();
      if (elapsed === 0 && sections.length === 0) return;
      const payload = { path: pathname, duration_seconds: elapsed, sections };
      if (beacon && navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
        navigator.sendBeacon(`${API_BASE}/analytics/heartbeat/`, blob);
      } else {
        api.post("/analytics/heartbeat/", payload).catch(() => {});
      }
    };

    const tick = () => flush(false);

    const onVisibilityHidden = () => {
      if (document.visibilityState === "hidden") flush(true);
    };
    const onPageHide = () => flush(true);

    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.round((window.scrollY / max) * 100) : 0;
      if (pct > maxScroll.current) {
        maxScroll.current = pct;
        for (const m of SCROLL_MILESTONES) {
          if (maxScroll.current >= m && !loggedScroll.current.has(m)) {
            loggedScroll.current.add(m);
            logActivity("scroll_depth", `${m}%`);
          }
        }
      }
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const tracked = target.closest<HTMLElement>("[data-track-click]");
      if (tracked) {
        logActivity(
          tracked.dataset.trackClick || "click",
          tracked.dataset.trackLabel || tracked.textContent?.trim().slice(0, 80) || ""
        );
        return;
      }
      const anchor = target.closest<HTMLAnchorElement>("a");
      if (anchor && /whatsapp\.com|wa\.me/i.test(anchor.getAttribute("href") || "")) {
        logActivity("whatsapp", anchor.dataset.trackLabel || "WhatsApp");
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (e.key === "Enter" && target.matches("[data-track-search]")) {
        logActivity("search", (target as HTMLInputElement).value || "");
      }
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      const now = Date.now();
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        const name = el.dataset.trackSection;
        if (!name) continue;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          if (!visibleSections.current.has(name)) {
            visibleSections.current.set(name, now);
            logActivity("section_view", name, { section: name });
          }
        } else if (visibleSections.current.has(name)) {
          const entered = visibleSections.current.get(name)!;
          visibleSections.current.delete(name);
          sectionTimes.current[name] = (sectionTimes.current[name] || 0) + (now - entered) / 1000;
        }
      }
    };

    heartbeat.current = window.setInterval(tick, HEARTBEAT_MS);

    if ("IntersectionObserver" in window) {
      observer.current = new IntersectionObserver(observerCallback, { threshold: [0.5] });
      document
        .querySelectorAll<HTMLElement>("[data-track-section]")
        .forEach((el) => observer.current?.observe(el));
    }

    document.addEventListener("visibilitychange", onVisibilityHidden);
    window.addEventListener("pagehide", onPageHide);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      foldVisibleSections();
      flush(true);
      if (heartbeat.current) window.clearInterval(heartbeat.current);
      observer.current?.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityHidden);
      window.removeEventListener("pagehide", onPageHide);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [pathname]);
}