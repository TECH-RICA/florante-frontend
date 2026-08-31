import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { adminApi } from "../../lib/adminApi";
import type { DashboardStats, RecentLead } from "../../lib/adminTypes";
import { RESOURCE_CONFIGS } from "../../lib/adminResources";
import { adminResourcePath } from "../../lib/adminPaths";
import { Spinner } from "../../components/Spinner";
import { ErrorState } from "../../components/ErrorState";
import { ReplyModal } from "../../components/admin/ReplyModal";
import {
  IconArrowUpRight,
  IconChart,
  IconClock,
  IconEye,
  IconMail,
  IconMailReply,
  IconUsers,
} from "../../components/icons";

function GlassStat({
  index,
  label,
  value,
  to,
}: {
  index: string;
  label: string;
  value: number;
  to?: string;
}) {
  const inner = (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur transition group-hover:border-accent/40">
      <span className="absolute right-3.5 top-3.5 font-mono text-[11px] font-bold text-white/25">
        {index}
      </span>
      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-accent-soft">
        <IconChart size={15} />
      </span>
      <p className="mt-4 text-[10px] font-semibold uppercase tracking-wider text-white/50">
        {label}
      </p>
      <p className="mt-1 font-heading text-2xl font-bold text-white">{value}</p>
    </div>
  );
  return to ? (
    <Link to={to} className="group">
      {inner}
    </Link>
  ) : (
    inner
  );
}

function CardHead({
  index,
  title,
  sub,
  right,
}: {
  index: string;
  title: string;
  sub?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-3">
        <span className="admin-index">{index}</span>
        <div>
          <h2 className="font-heading text-base font-bold text-florante-900">{title}</h2>
          {sub && <p className="text-xs text-gray-400">{sub}</p>}
        </div>
      </div>
      {right}
    </div>
  );
}

function VisitChart({ byDay }: { byDay: { date: string; count: number }[] }) {
  const max = Math.max(1, ...byDay.map((d) => d.count));
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="block border-t border-dashed border-florante-100/70" />
        ))}
      </div>
      {byDay.length === 0 ? (
        <p className="relative py-12 text-center text-sm text-gray-400">No visits recorded yet.</p>
      ) : (
        <div className="relative flex h-48 items-end gap-1.5">
          {byDay.map((d) => (
            <div key={d.date} className="group flex flex-1 flex-col items-center justify-end gap-1.5">
              <span className="text-[10px] font-semibold text-florante-600 opacity-0 transition group-hover:opacity-100">
                {d.count}
              </span>
              <div
                className="w-full rounded-t-lg bg-gradient-to-t from-florante-700 to-accent transition-all group-hover:brightness-110"
                style={{ height: `${Math.max(4, (d.count / max) * 100)}%` }}
              />
              <span className="text-[10px] text-gray-400">
                {new Date(`${d.date}T12:00:00`).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ label, tone }: { label: string; tone: string }) {
  const cls: Record<string, string> = {
    green: "bg-accent/15 text-accent-dark",
    amber: "bg-amber-100 text-amber-700",
    red: "bg-red-100 text-red-700",
    gray: "bg-gray-100 text-gray-600",
  };
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${cls[tone] || cls.gray}`}>
      {label}
    </span>
  );
}

function statusTone(status: string) {
  if (["won", "qualified", "demo", "proposal", "negotiation"].includes(status)) return "green";
  if (["new", "contacted", "meeting_scheduled"].includes(status)) return "amber";
  if (["lost"].includes(status)) return "red";
  return "gray";
}

function pipelineBar(status: string) {
  const tones: Record<string, string> = {
    won: "bg-accent-grad",
    qualified: "bg-florante-400",
    demo: "bg-florante-500",
    proposal: "bg-florante-600",
    negotiation: "bg-florante-600",
    new: "bg-florante-300",
    contacted: "bg-florante-300",
    meeting_scheduled: "bg-florante-400",
    lost: "bg-gray-300",
  };
  return tones[status] || "bg-florante-300";
}

function fmtDuration(totalSeconds: number): string {
  const s = totalSeconds;
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m`;
  return `${Math.floor(m / 60)}h ${m % 60}m`;
}

function activityDot(action: string) {
  if (action === "contact_submit") return "bg-accent-dark";
  if (action === "whatsapp") return "bg-green-500";
  if (action === "search") return "bg-blue-500";
  if (action === "scroll_depth") return "bg-amber-500";
  if (action === "section_view") return "bg-florante-400";
  return "bg-gray-300";
}

function pageLabel(path: string): string {
  const clean = path.split("?")[0].split("#")[0];
  if (clean === "/") return "Home";
  return clean;
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [replyingTo, setReplyingTo] = useState<RecentLead | null>(null);

  useEffect(() => {
    adminApi
      .get<DashboardStats>("/dashboard/")
      .then((res) => setStats(res.data))
      .catch((err: unknown) =>
        setError(
          (err as { response?: { data?: { detail?: string } } }).response?.data?.detail ||
            "Unable to load dashboard."
        )
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner label="Loading dashboard" />;
  if (error || !stats) return <ErrorState message={error || "No data"} />;

  const { counts, visits, recent_leads, recent_visits } = stats;
  const { pages_time: pagesTime, recent_activity: recentActivity } = stats.engagement;
  const now = new Date().toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const statuses = Object.entries(stats.lead_statuses);
  const pipelineMax = Math.max(1, ...statuses.map(([, c]) => c));
  const totalTime = pagesTime.reduce((a, p) => a + p.total_seconds, 0);

  return (
    <div className="space-y-8">
      {/* Hero band */}
      <div className="relative overflow-hidden rounded-[2rem] bg-green-grad shadow-lift">
        <div
          className="pointer-events-none absolute inset-0 bg-grid-dark opacity-70"
          style={{ backgroundSize: "40px 40px" }}
        />
        <div className="pointer-events-none absolute inset-0 bg-hero-mesh" />
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 animate-blob rounded-full bg-accent/15 blur-3xl" />
        <span className="pointer-events-none absolute -right-2 top-1/2 hidden -translate-y-1/2 select-none font-heading text-[9rem] font-bold leading-none text-white/[0.04] xl:block">
          30d
        </span>

        <div className="relative px-6 pb-6 pt-8 sm:px-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="eyebrow-dark">Command center</span>
              <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight text-white">
                Dashboard
              </h1>
              <p className="mt-1.5 text-sm text-white/60">
                {now} · {visits.unique_sessions_30d} unique visitors in 30 days
              </p>
            </div>
            <Link
              to={adminResourcePath("analytics")}
              className="inline-flex items-center gap-2 rounded-full bg-accent-grad px-5 py-2.5 text-sm font-bold text-florante-950 shadow-glow transition hover:brightness-105"
            >
              <IconEye size={15} /> Open analytics
            </Link>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
            <GlassStat index="01" label="Visits · 30d" value={visits.total_30d} />
            <GlassStat index="02" label="Visits today" value={visits.today} />
            <GlassStat index="03" label="Messages" value={counts.leads} to={adminResourcePath("leads")} />
            <GlassStat index="04" label="Products" value={counts.products} to={adminResourcePath("products")} />
            <GlassStat index="05" label="Solutions" value={counts.solutions} to={adminResourcePath("solutions")} />
            <GlassStat index="06" label="Articles" value={counts.articles} to={adminResourcePath("articles")} />
          </div>
        </div>
      </div>

      {/* Visits + pipeline */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="admin-corners relative rounded-[2rem] border border-florante-100 bg-white p-6 shadow-card sm:p-7 lg:col-span-2">
          <CardHead
            index="01"
            title="Visits — last 14 days"
            sub="Traffic rhythm across the site"
            right={
              <span className="hidden items-center gap-3 text-xs text-gray-500 sm:flex">
                <span className="flex items-center gap-1.5">
                  <IconUsers size={13} className="text-florante-500" />
                  {visits.devices.desktop || 0} desktop
                </span>
                <span className="flex items-center gap-1.5">
                  <IconChart size={13} className="text-florante-500" />
                  {visits.devices.mobile || 0} mobile
                </span>
                <span className="flex items-center gap-1.5">
                  <IconClock size={13} className="text-florante-500" />
                  {visits.devices.tablet || 0} tablet
                </span>
              </span>
            }
          />
          <div className="mt-6">
            <VisitChart byDay={visits.by_day} />
          </div>
          <div className="admin-rule mt-6" />
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              Top pages
            </span>
            {visits.top_pages.length === 0 && <span className="text-sm text-gray-400">—</span>}
            {visits.top_pages.map((p) => (
              <span
                key={p.path}
                className="rounded-full border border-florante-100 bg-florante-50 px-2.5 py-0.5 font-mono text-xs font-medium text-florante-700"
              >
                {pageLabel(p.path)} · {p.count}
              </span>
            ))}
          </div>
        </div>

        <div className="admin-corners relative rounded-[2rem] border border-florante-100 bg-white p-6 shadow-card sm:p-7">
          <CardHead index="02" title="Lead pipeline" sub="Where deals sit right now" />
          {statuses.length === 0 ? (
            <p className="mt-6 text-sm text-gray-400">No messages yet.</p>
          ) : (
            <div className="mt-6 space-y-4">
              {statuses.map(([status, count]) => (
                <div key={status}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="capitalize text-gray-600">{status.replace("_", " ")}</span>
                    <span className="font-heading text-sm font-bold text-florante-800">{count}</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-florante-100/60">
                    <div
                      className={`h-full rounded-full ${pipelineBar(status)}`}
                      style={{ width: `${Math.max(3, (count / pipelineMax) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content + engagement */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="admin-corners relative rounded-[2rem] border border-florante-100 bg-white p-6 shadow-card sm:p-7">
          <CardHead index="03" title="Content library" sub="Records across the site" />
          <div className="mt-5 divide-y divide-florante-50">
            {RESOURCE_CONFIGS.map((r, i) => (
              <Link
                key={r.key}
                to={adminResourcePath(r.key)}
                className="group flex items-center gap-3 py-2.5"
              >
                <span className="w-6 font-mono text-[11px] font-bold text-gray-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-moss text-florante-700 transition group-hover:bg-florante-700 group-hover:text-accent-soft">
                  {r.icon}
                </span>
                <span className="min-w-0 flex-1 truncate text-sm font-medium text-florante-900">
                  {r.label}
                </span>
                <span className="font-heading text-sm font-bold text-florante-700">
                  {counts[r.key] ?? 0}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="admin-corners relative rounded-[2rem] border border-florante-100 bg-white p-6 shadow-card sm:p-7">
          <CardHead
            index="04"
            title="Top pages by time"
            sub={`${fmtDuration(totalTime)} total across pages`}
            right={
              <Link
                to={adminResourcePath("analytics")}
                className="inline-flex items-center gap-1 text-xs font-semibold text-florante-700 hover:text-florante-900"
              >
                Analytics <IconArrowUpRight size={13} />
              </Link>
            }
          />
          <div className="mt-4 divide-y divide-florante-50">
            {pagesTime.length === 0 && (
              <p className="py-8 text-center text-sm text-gray-400">No time data yet.</p>
            )}
            {pagesTime.slice(0, 5).map((p, i) => (
              <div key={p.path} className="flex items-center gap-3 py-2.5">
                <span className="w-6 font-mono text-[11px] font-bold text-gray-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1 truncate font-mono text-sm font-medium text-florante-900">
                  {pageLabel(p.path)}
                </span>
                <div className="hidden w-24 overflow-hidden rounded-full bg-florante-100/60 md:block">
                  <div
                    className="h-1.5 rounded-full bg-gradient-to-r from-florante-600 to-accent"
                    style={{
                      width: `${Math.max(4, (p.avg_seconds / Math.max(1, ...pagesTime.map((x) => x.avg_seconds))) * 100)}%`,
                    }}
                  />
                </div>
                <span className="shrink-0 font-heading text-xs font-bold text-florante-700">
                  {fmtDuration(p.avg_seconds)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-corners relative rounded-[2rem] border border-florante-100 bg-white p-6 shadow-card sm:p-7">
          <CardHead
            index="05"
            title="Recent activity"
            sub="Latest actions on the site"
            right={
              <Link
                to={adminResourcePath("analytics")}
                className="inline-flex items-center gap-1 text-xs font-semibold text-florante-700 hover:text-florante-900"
              >
                Analytics <IconArrowUpRight size={13} />
              </Link>
            }
          />
          <div className="mt-4 divide-y divide-florante-50">
            {recentActivity.length === 0 && (
              <p className="py-8 text-center text-sm text-gray-400">No activity yet.</p>
            )}
            {recentActivity.slice(0, 6).map((a) => (
              <div key={a.id} className="flex items-center gap-3 py-2.5">
                <span className={`h-2 w-2 shrink-0 rounded-full ${activityDot(a.action)}`} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-gray-700">
                    <span className="font-semibold capitalize text-florante-900">
                      {a.action.replaceAll("_", " ")}
                    </span>
                    {a.label && <span className="text-gray-400"> · {a.label}</span>}
                  </p>
                  <p className="truncate text-[11px] text-gray-400">
                    {pageLabel(a.path)} ·{" "}
                    {new Date(a.created_at).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leads + visits */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="admin-corners relative rounded-[2rem] border border-florante-100 bg-white p-6 shadow-card sm:p-7">
          <CardHead
            index="06"
            title="Recent messages"
            sub="Newest enquiries"
            right={
              <Link
                to={adminResourcePath("leads")}
                className="inline-flex items-center gap-1 text-xs font-semibold text-florante-700 hover:text-florante-900"
              >
                View all <IconArrowUpRight size={13} />
              </Link>
            }
          />
          <div className="mt-4 divide-y divide-florante-50">
            {recent_leads.length === 0 && (
              <p className="py-8 text-center text-sm text-gray-400">No messages yet.</p>
            )}
            {recent_leads.map((l) => (
              <div key={l.id} className={`flex items-start gap-3 py-3.5 ${!l.is_read ? "relative" : ""}`}>
                {!l.is_read && (
                  <span className="absolute left-0 top-5 h-2 w-2 -translate-x-1 rounded-full bg-accent" />
                )}
                <Link
                  to={adminResourcePath("leads")}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-florante-50 font-heading text-xs font-bold text-florante-700 transition hover:bg-florante-100"
                >
                  {initials(l.name)}
                </Link>
                <div className="min-w-0 flex-1">
                  <Link to={adminResourcePath("leads")} className="group block">
                    <p className="flex flex-wrap items-center gap-x-2 text-sm font-semibold text-florante-900">
                      <span className="truncate">{l.name}</span>
                      {!l.is_read && (
                        <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent-dark">
                          New
                        </span>
                      )}
                    </p>
                    <p className="truncate text-xs text-gray-400">
                      {l.email} {l.need ? `· ${l.need.replace("_", " ")}` : ""}
                    </p>
                    {l.message && (
                      <p className="mt-1 line-clamp-2 text-xs italic leading-relaxed text-gray-500">
                        "{l.message}"
                      </p>
                    )}
                  </Link>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-2">
                  <StatusBadge label={l.status.replace("_", " ")} tone={statusTone(l.status)} />
                  <button
                    onClick={() => setReplyingTo(l)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-green-grad px-3 py-1.5 text-xs font-bold text-white transition hover:shadow-glow-sm"
                  >
                    <IconMailReply size={13} /> Reply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-corners relative rounded-[2rem] border border-florante-100 bg-white p-6 shadow-card sm:p-7">
          <CardHead index="07" title="Recent visits" sub="Footfall, most recent first" />
          <div className="mt-4 divide-y divide-florante-50">
            {recent_visits.length === 0 && (
              <p className="py-8 text-center text-sm text-gray-400">No visits yet.</p>
            )}
            {recent_visits.map((v) => (
              <div key={v.id} className="flex items-center gap-3 py-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-moss text-florante-600">
                  <IconMail size={15} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-mono text-sm font-medium text-florante-900">
                    {pageLabel(v.path)}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(v.viewed_at).toLocaleString()} · {v.device}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ReplyModal
        lead={replyingTo}
        onClose={() => setReplyingTo(null)}
        onSent={() =>
          setStats((s) =>
            s
              ? {
                  ...s,
                  recent_leads: s.recent_leads.map((l) =>
                    l.id === replyingTo?.id ? { ...l, is_read: true, status: "contacted" } : l
                  ),
                }
              : s
          )
        }
      />
    </div>
  );
}
