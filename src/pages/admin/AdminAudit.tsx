import { useEffect, useMemo, useState } from "react";
import { adminApi } from "../../lib/adminApi";
import type { AuditEntry } from "../../lib/adminTypes";
import { Spinner } from "../../components/Spinner";
import { ErrorState } from "../../components/ErrorState";
import { IconActivity } from "../../components/icons";

const ACTION_LABELS: Record<string, string> = {
  created: "Created",
  updated: "Updated",
  deleted: "Deleted",
  replied: "Replied",
  archived: "Archived",
  unarchived: "Restored",
  marked_read: "Marked read",
  marked_unread: "Marked unread",
  uploaded: "Uploaded",
  sent_test: "Sent test email",
  sent_telegram: "Sent Telegram message",
};

const ACTION_TONES: Record<string, string> = {
  created: "bg-green-50 text-green-700",
  updated: "bg-blue-50 text-blue-700",
  deleted: "bg-red-50 text-red-600",
  replied: "bg-purple-50 text-purple-700",
  archived: "bg-amber-50 text-amber-700",
  unarchived: "bg-amber-50 text-amber-700",
  marked_read: "bg-florante-50 text-florante-700",
  marked_unread: "bg-florante-50 text-florante-700",
  uploaded: "bg-teal-50 text-teal-700",
  sent_test: "bg-teal-50 text-teal-700",
  sent_telegram: "bg-sky-50 text-sky-700",
};

function timeAgo(iso: string): string {
  const then = new Date(iso).getTime();
  const diff = Date.now() - then;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export function AdminAudit() {
  const [items, setItems] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    adminApi
      .get<AuditEntry[]>("/audit/")
      .then((res) => setItems(res.data))
      .catch(() => setError("Unable to load the audit trail."))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () => (filter === "all" ? items : items.filter((a) => a.action === filter)),
    [items, filter]
  );

  const actions = useMemo(() => {
    const seen = new Set<string>();
    const list: string[] = [];
    for (const a of items) {
      if (!seen.has(a.action)) {
        seen.add(a.action);
        list.push(a.action);
      }
    }
    return list;
  }, [items]);

  if (loading) return <Spinner label="Loading audit trail" />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-[2rem] bg-green-grad shadow-lift">
        <div
          className="pointer-events-none absolute inset-0 bg-grid-dark opacity-70"
          style={{ backgroundSize: "40px 40px" }}
        />
        <div className="pointer-events-none absolute inset-0 bg-hero-mesh" />
        <div className="relative px-6 py-6 sm:px-8">
          <span className="eyebrow-dark">
            <IconActivity size={12} /> System
          </span>
          <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight text-white">Audit trail</h1>
          <p className="mt-1.5 text-sm text-white/60">
            Everything staff do in the admin — who replied, who deleted, who published.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            filter === "all" ? "bg-florante-700 text-white shadow-soft" : "bg-white text-gray-600 border border-florante-100 hover:bg-florante-50"
          }`}
        >
          All
        </button>
        {actions.map((a) => (
          <button
            key={a}
            onClick={() => setFilter(a)}
            className={`rounded-full px-4 py-2 text-sm font-semibold capitalize transition ${
              filter === a ? "bg-florante-700 text-white shadow-soft" : "bg-white text-gray-600 border border-florante-100 hover:bg-florante-50"
            }`}
          >
            {ACTION_LABELS[a] ?? a.replace("_", " ")}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="admin-corners relative rounded-[2rem] border border-dashed border-florante-200 bg-white/70 p-16 text-center shadow-card">
          <p className="font-heading text-xl font-semibold text-florante-800">No audit entries</p>
          <p className="mt-1.5 text-sm text-gray-500">Actions from the admin panel will appear here.</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {filtered.map((a) => {
            const tone = ACTION_TONES[a.action] ?? "bg-florante-50 text-florante-700";
            return (
              <div
                key={a.id}
                className="flex items-start gap-4 rounded-2xl border border-florante-100 bg-white p-4 shadow-card transition hover:shadow-lift sm:px-5"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-florante-50 font-heading text-xs font-bold text-florante-700">
                  {(a.actor_name || "S").split(/\s+/).map((p) => p[0]).slice(0, 2).join("").toUpperCase()}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-florante-900">
                    <span className="capitalize">{ACTION_LABELS[a.action] ?? a.action.replace("_", " ")}</span>
                    {a.resource && <span className="text-gray-400"> · {a.resource}</span>}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-gray-500">{a.summary}</p>
                  <p className="mt-1 text-[11px] text-gray-400">
                    {a.actor_name || "System"}
                    {a.actor_email ? ` · ${a.actor_email}` : ""} · {timeAgo(a.created_at)}
                  </p>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${tone}`}>
                  {ACTION_LABELS[a.action] ?? a.action.replace("_", " ")}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}