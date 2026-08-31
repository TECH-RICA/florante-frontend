import { useEffect, useMemo, useState } from "react";
import { adminApi } from "../../lib/adminApi";
import type { DashboardStats, SectionTime, ActivityItem } from "../../lib/adminTypes";
import { Spinner } from "../../components/Spinner";
import { ErrorState } from "../../components/ErrorState";
import {
  IconActivity,
  IconArrowRight,
  IconBolt,
  IconChart,
  IconClock,
  IconEye,
  IconFlame,
  IconLayers,
  IconMail,
  IconMousePointer,
  IconQuote,
  IconRocket,
  IconSearch,
  IconSparkles,
  IconUsers,
  IconWhatsApp,
} from "../../components/icons";

type Tab = "pages" | "sections" | "activity" | "live";

const TABS: { key: Tab; label: string; icon: React.ReactNode }[] = [
  { key: "pages", label: "Time on page", icon: <IconClock size={16} /> },
  { key: "sections", label: "Sections", icon: <IconLayers size={16} /> },
  { key: "activity", label: "Activity", icon: <IconActivity size={16} /> },
  { key: "live", label: "Live now", icon: <IconUsers size={16} /> },
];

function fmtDuration(totalSeconds: number): string {
  const s = Math.max(0, totalSeconds);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ${s % 60}s`;
  const h = Math.floor(m / 60);
  return `${h}h ${m % 60}m`;
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function pageLabel(path: string): string {
  const clean = path.split("?")[0].split("#")[0];
  if (clean === "/") return "Home";
  return clean;
}

function sectionIcon(section: string) {
  const map: Record<string, React.ReactNode> = {
    hero: <IconRocket size={15} />,
    solutions: <IconLayers size={15} />,
    products: <IconBolt size={15} />,
    testimonials: <IconQuote size={15} />,
    "cta-band": <IconSparkles size={15} />,
    "contact-form": <IconMail size={15} />,
    "all-solutions": <IconLayers size={15} />,
    catalog: <IconBolt size={15} />,
    details: <IconBolt size={15} />,
    "articles-list": <IconSearch size={15} />,
    "article-content": <IconSearch size={15} />,
    "article-hero": <IconSparkles size={15} />,
    values: <IconShieldStub />,
    team: <IconUsers size={15} />,
    approach: <IconArrowRight size={15} />,
    "faqs-and-cta": <IconSparkles size={15} />,
  };
  return map[section] || <IconChart size={15} />;
}

function IconShieldStub() {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3 4.5 6v6c0 4.5 3 7.5 7.5 9 4.5-1.5 7.5-4.5 7.5-9V6L12 3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function actionMeta(action: string) {
  const map: Record<string, { label: string; icon: React.ReactNode; chip: string }> = {
    cta: { label: "CTA click", icon: <IconArrowRight size={14} />, chip: "bg-accent/15 text-accent-dark" },
    whatsapp: { label: "WhatsApp", icon: <IconWhatsApp size={14} />, chip: "bg-green-100 text-green-700" },
    search: { label: "Search", icon: <IconSearch size={14} />, chip: "bg-blue-100 text-blue-700" },
    scroll_depth: { label: "Scroll depth", icon: <IconMousePointer size={14} />, chip: "bg-amber-100 text-amber-700" },
    section_view: { label: "Section view", icon: <IconEye size={14} />, chip: "bg-florante-100 text-florante-700" },
    contact_submit: { label: "Contact", icon: <IconMail size={14} />, chip: "bg-accent/15 text-accent-dark" },
  };
  return map[action] || { label: action.replaceAll("_", " "), icon: <IconSparkles size={14} />, chip: "bg-gray-100 text-gray-600" };
}

function StatCard({
  icon,
  label,
  value,
  hint,
  pulse,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint?: string;
  pulse?: boolean;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
      <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-accent/15 blur-2xl" />
      <div className="flex items-center justify-between">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-accent-soft">
          {icon}
        </span>
        {pulse && (
          <span className="flex items-center gap-1.5 rounded-full bg-accent/20 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-soft">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-soft opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-soft" />
            </span>
            Live
          </span>
        )}
      </div>
      <p className="mt-4 font-heading text-3xl font-bold text-white">{value}</p>
      <p className="mt-0.5 text-xs font-medium text-white/60">{label}</p>
      {hint && <p className="mt-0.5 text-[11px] text-white/40">{hint}</p>}
    </div>
  );
}

export function AdminAnalytics() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("pages");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    adminApi
      .get<DashboardStats>("/dashboard/")
      .then((res) => setStats(res.data))
      .catch((err: unknown) =>
        setError(
          (err as { response?: { data?: { detail?: string } } }).response?.data?.detail ||
            "Unable to load analytics."
        )
      )
      .finally(() => setLoading(false));
  }, []);

  const summary = useMemo(() => {
    if (!stats) return null;
    const { pages_time, sections_by_page, recent_activity, active_now } = stats.engagement;
    const totalTime = pages_time.reduce((a, p) => a + p.total_seconds, 0);
    const avgPage = pages_time.length ? Math.round(totalTime / pages_time.length) : 0;
    const totalSections = Object.values(sections_by_page).reduce(
      (a, arr) => a + arr.length,
      0
    );
    return {
      totalTime,
      avgPage,
      totalActive: active_now.reduce((a, x) => a + x.active, 0),
      totalSections,
      topPage: pages_time[0]?.path || null,
      topPageTime: pages_time[0]?.total_seconds || 0,
      activityCount: recent_activity.length,
    };
  }, [stats]);

  if (loading) return <Spinner label="Loading analytics" />;
  if (error || !stats || !summary)
    return <ErrorState message={error || "No data"} />;

  const { pages_time, sections_by_page, recent_activity, active_now } = stats.engagement;
  const maxPageTime = Math.max(1, ...pages_time.map((p) => p.total_seconds));

  return (
    <div className="space-y-8">
      {/* Hero band with summary stats */}
      <div className="relative overflow-hidden rounded-[2rem] bg-green-grad shadow-lift">
        <div
          className="pointer-events-none absolute inset-0 bg-grid-dark opacity-70"
          style={{ backgroundSize: "40px 40px" }}
        />
        <div className="pointer-events-none absolute inset-0 bg-hero-mesh" />
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 animate-blob rounded-full bg-accent/15 blur-3xl" />

        <div className="relative px-6 pb-6 pt-8 sm:px-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="eyebrow-dark">Insights</span>
              <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight text-white">
                Analytics
              </h1>
              <p className="mt-1.5 max-w-md text-sm text-white/60">
                What visitors actually engage with — the pages, sections and actions that matter.
              </p>
            </div>
            {summary.topPage && (
              <div className="hidden items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur md:flex">
                <IconFlame size={18} className="text-accent" />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-white/50">
                    Hottest page
                  </p>
                  <p className="font-mono text-sm font-semibold text-white">
                    {pageLabel(summary.topPage)}
                    <span className="ml-2 text-accent-soft">{fmtDuration(summary.topPageTime)}</span>
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
            <StatCard
              icon={<IconClock size={18} />}
              label="Time on site · 30d"
              value={fmtDuration(summary.totalTime)}
              hint="Total dwell time"
            />
            <StatCard
              icon={<IconChart size={18} />}
              label="Avg per page"
              value={fmtDuration(summary.avgPage)}
              hint="Across tracked pages"
            />
            <StatCard
              icon={<IconLayers size={18} />}
              label="Sections tracked"
              value={String(summary.totalSections)}
              hint="Engagement points"
            />
            <StatCard
              icon={<IconUsers size={18} />}
              label="Active now"
              value={String(summary.totalActive)}
              hint="Last 5 minutes"
              pulse
            />
          </div>
        </div>
      </div>

      {/* Segmented tabs */}
      <div className="sticky top-0 z-10 -mx-1 px-1 py-2">
        <div className="flex max-w-full gap-1.5 overflow-x-auto rounded-2xl border border-gray-100 bg-white/90 p-1.5 shadow-soft backdrop-blur">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                tab === t.key
                  ? "bg-florante-700 text-white shadow-soft"
                  : "text-gray-500 hover:bg-florante-50 hover:text-florante-700"
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {tab === "pages" && (
        <div className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-soft sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <h2 className="font-heading text-xl font-bold text-florante-900">Where time is spent</h2>
              <p className="mt-1 text-sm text-gray-500">
                Ranked by total dwell time over the last 30 days.
              </p>
            </div>
            <span className="rounded-full bg-florante-50 px-3 py-1 text-xs font-semibold text-florante-700">
              {pages_time.length} page{pages_time.length === 1 ? "" : "s"}
            </span>
          </div>

          {pages_time.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-gray-200 bg-moss/40 p-12 text-center">
              <IconClock size={28} className="mx-auto text-florante-300" />
              <p className="mt-3 font-heading font-semibold text-florante-800">No time data yet</p>
              <p className="mt-1 text-sm text-gray-500">
                Dwell time appears once visitors browse the site.
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-3">
              {pages_time.map((p, i) => {
                const pct = (p.total_seconds / maxPageTime) * 100;
                return (
                  <div
                    key={p.path}
                    className={`group rounded-2xl border p-4 transition-all ${
                      i === 0
                        ? "border-accent/40 bg-gradient-to-r from-florante-50 to-accent/10"
                        : "border-gray-100 bg-white hover:border-florante-200 hover:bg-florante-50/40"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-heading text-sm font-bold ${
                          i === 0
                            ? "bg-accent-grad text-florante-950"
                            : i === 1
                              ? "bg-florante-100 text-florante-800"
                              : i === 2
                                ? "bg-moss text-florante-700"
                                : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {i === 0 ? "🔥" : i + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5">
                          <span className="truncate font-mono text-sm font-semibold text-florante-900">
                            {pageLabel(p.path)}
                          </span>
                          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-500">
                            {p.sessions} session{p.sessions === 1 ? "" : "s"}
                          </span>
                        </div>
                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-florante-100/60">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-florante-700 to-accent transition-all duration-700"
                            style={{ width: `${Math.max(3, pct)}%` }}
                          />
                        </div>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="font-heading text-lg font-bold text-florante-800">
                          {fmtDuration(p.total_seconds)}
                        </p>
                        <p className="text-[11px] text-gray-400">
                          {fmtDuration(p.avg_seconds)} / visit
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {tab === "sections" && (
        <div className="space-y-4">
          {Object.keys(sections_by_page).length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-gray-200 bg-white/70 p-14 text-center shadow-soft">
              <IconLayers size={28} className="mx-auto text-florante-300" />
              <p className="mt-3 font-heading font-semibold text-florante-800">No section data yet</p>
              <p className="mt-1 text-sm text-gray-500">
                Sections light up once visitors scroll through your pages.
              </p>
            </div>
          ) : (
            Object.entries(sections_by_page).map(([path, sections]) => {
              const isOpen = !!expanded[path];
              const sorted = [...sections].sort((a, b) => b.total_seconds - a.total_seconds);
              const total = sorted.reduce((a, s: SectionTime) => a + s.total_seconds, 0);
              const maxSection = Math.max(1, ...sorted.map((s: SectionTime) => s.total_seconds));
              return (
                <div
                  key={path}
                  className={`overflow-hidden rounded-[2rem] border transition-all ${
                    isOpen ? "border-florante-200 shadow-lift" : "border-gray-100 shadow-soft"
                  }`}
                >
                  <button
                    onClick={() => setExpanded((prev) => ({ ...prev, [path]: !isOpen }))}
                    className="flex w-full items-center justify-between gap-3 bg-white px-6 py-5 text-left transition hover:bg-florante-50/40"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-moss text-florante-700">
                        <IconLayers size={18} />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-mono text-sm font-bold text-florante-900">
                          {pageLabel(path)}
                        </p>
                        <p className="text-xs text-gray-400">
                          {sorted.length} sections · {fmtDuration(total)} total
                        </p>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <span className="hidden rounded-full bg-florante-50 px-2.5 py-1 text-[11px] font-semibold text-florante-700 sm:block">
                        {fmtDuration(total)}
                      </span>
                      <IconArrowRight
                        size={16}
                        className={`text-gray-400 transition-transform duration-300 ${
                          isOpen ? "rotate-90" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="grid gap-3 border-t border-gray-100 bg-moss/30 p-5 sm:grid-cols-2 xl:grid-cols-3">
                      {sorted.map((s: SectionTime) => (
                        <div
                          key={s.section}
                          className="rounded-2xl border border-gray-100 bg-white p-4 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
                        >
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-2 text-sm font-semibold capitalize text-florante-800">
                              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-florante-50 text-florante-600">
                                {sectionIcon(s.section)}
                              </span>
                              {s.section.replaceAll("-", " ")}
                            </span>
                            <span className="font-heading text-base font-bold text-florante-800">
                              {fmtDuration(s.total_seconds)}
                            </span>
                          </div>
                          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-florante-100/60">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-florante-500 to-accent"
                              style={{ width: `${Math.max(4, (s.total_seconds / maxSection) * 100)}%` }}
                            />
                          </div>
                          <p className="mt-2 text-[11px] text-gray-400">
                            {s.views} view{s.views === 1 ? "" : "s"}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {tab === "activity" && (
        <div className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-soft sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <h2 className="font-heading text-xl font-bold text-florante-900">Activity feed</h2>
              <p className="mt-1 text-sm text-gray-500">
                The most recent actions taken across the site.
              </p>
            </div>
          </div>

          {recent_activity.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-gray-200 bg-moss/40 p-12 text-center">
              <IconActivity size={28} className="mx-auto text-florante-300" />
              <p className="mt-3 font-heading font-semibold text-florante-800">No activity yet</p>
              <p className="mt-1 text-sm text-gray-500">
                CTA clicks, WhatsApp opens, searches and form submissions will stream in here.
              </p>
            </div>
          ) : (
            <div className="relative mt-6 space-y-1">
              <span className="absolute bottom-4 left-[1.15rem] top-4 w-px bg-florante-100" />
              {recent_activity.map((a: ActivityItem) => {
                const meta = actionMeta(a.action);
                return (
                  <div key={a.id} className="relative flex items-center gap-4 rounded-xl px-2 py-2.5 transition hover:bg-florante-50/40">
                    <span className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${meta.chip}`}>
                      {meta.icon}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-gray-800">
                        <span className="font-semibold capitalize text-florante-900">{meta.label}</span>
                        {a.label && (
                          <span className="text-gray-500">
                            {" "}· <span className="font-medium text-gray-600">{a.label}</span>
                          </span>
                        )}
                      </p>
                      <p className="truncate font-mono text-[11px] text-gray-400">{pageLabel(a.path) || a.path}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-xs font-semibold text-gray-500">{timeAgo(a.created_at)}</p>
                      <p className="text-[11px] text-gray-400">
                        {new Date(a.created_at).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {tab === "live" && (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="relative overflow-hidden rounded-[2rem] bg-green-grad p-8 shadow-lift lg:col-span-1">
            <div
              className="pointer-events-none absolute inset-0 bg-grid-dark opacity-70"
              style={{ backgroundSize: "40px 40px" }}
            />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent-soft">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-soft opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-soft" />
                </span>
                Live
              </span>
              <p className="mt-6 font-heading text-6xl font-bold text-white">{summary.totalActive}</p>
              <p className="mt-1 text-sm text-white/60">
                active visitor{summary.totalActive === 1 ? "" : "s"} right now
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {active_now.length === 0 && (
                  <span className="text-sm text-white/50">Nobody on the site at the moment.</span>
                )}
                {active_now.map((a) => (
                  <span
                    key={a.path}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 font-mono text-xs text-white backdrop-blur"
                  >
                    {pageLabel(a.path)}
                    <span className="text-accent-soft">{a.active}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-soft lg:col-span-2">
            <h2 className="font-heading text-lg font-bold text-florante-900">Reading the numbers</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: <IconClock size={18} />,
                  title: "Time on page",
                  text: "Long dwell = content that lands. Invest more there; shorten or rethink pages people leave fast.",
                },
                {
                  icon: <IconLayers size={18} />,
                  title: "Sections",
                  text: "Which parts of a page people actually see tells you what to move higher or expand.",
                },
                {
                  icon: <IconActivity size={18} />,
                  title: "Activity",
                  text: "CTA clicks, WhatsApp opens, searches and form submissions reveal buyer intent.",
                },
                {
                  icon: <IconFlame size={18} />,
                  title: "Trending",
                  text: "Check the hottest page regularly — new content should be built where interest already is.",
                },
              ].map((c) => (
                <div key={c.title} className="rounded-2xl border border-gray-100 bg-moss/40 p-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-florante-700 text-accent-soft">
                    {c.icon}
                  </span>
                  <p className="mt-3 font-heading text-sm font-bold text-florante-900">{c.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">{c.text}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 rounded-xl bg-florante-50 px-4 py-3 text-xs text-florante-700">
              Analytics data is kept for 90 days and then pruned automatically.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}