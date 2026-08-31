import { useCallback, useEffect, useMemo, useState } from "react";
import { adminApi } from "../../lib/adminApi";
import type { RecentLead, SenderSummary } from "../../lib/adminTypes";
import { Spinner } from "../../components/Spinner";
import { ErrorState } from "../../components/ErrorState";
import { ReplyModal } from "../../components/admin/ReplyModal";
import { useToast } from "../../components/Toast";
import {
  IconArchive,
  IconArrowUpRight,
  IconCheck,
  IconInbox,
  IconMail,
  IconMailReply,
  IconMore,
  IconRefresh,
  IconSearch,
  IconTrash,
} from "../../components/icons";

type FilterKey = "all" | "unread" | "read" | "archived";

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function relativeTime(iso: string): string {
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

function statusTone(status: string): string {
  const map: Record<string, string> = {
    new: "bg-blue-50 text-blue-700",
    contacted: "bg-amber-50 text-amber-700",
    qualified: "bg-green-50 text-green-700",
    won: "bg-green-50 text-green-700",
    lost: "bg-red-50 text-red-600",
    proposal: "bg-purple-50 text-purple-700",
  };
  return map[status] ?? "bg-florante-50 text-florante-700";
}

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "unread", label: "Unread" },
  { key: "read", label: "Read" },
  { key: "archived", label: "Archived" },
];

export function AdminMessages() {
  const [items, setItems] = useState<RecentLead[]>([]);
  const [senders, setSenders] = useState<SenderSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");
  const [sortNewest, setSortNewest] = useState(true);
  const [senderEmail, setSenderEmail] = useState<string>("");
  const [menuFor, setMenuFor] = useState<number | null>(null);
  const [viewing, setViewing] = useState<RecentLead | null>(null);
  const [replying, setReplying] = useState<RecentLead | null>(null);
  const toast = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [leadsRes, sendersRes] = await Promise.all([
        adminApi.get<RecentLead[]>("/leads/"),
        adminApi.get<SenderSummary[]>("/leads/senders/"),
      ]);
      setItems(leadsRes.data);
      setSenders(sendersRes.data);
    } catch {
      setError("Unable to load messages.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const patch = (id: number, update: Partial<RecentLead>) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...update } : i)));
  };

  const counts = useMemo(() => {
    return {
      all: items.length,
      unread: items.filter((i) => !i.is_read && !i.is_archived).length,
      read: items.filter((i) => i.is_read && !i.is_archived).length,
      archived: items.filter((i) => i.is_archived).length,
    };
  }, [items]);

  const filtered = useMemo(() => {
    let list = [...items];
    if (filter === "unread") list = list.filter((i) => !i.is_read && !i.is_archived);
    if (filter === "read") list = list.filter((i) => i.is_read && !i.is_archived);
    if (filter === "archived") list = list.filter((i) => i.is_archived);
    if (senderEmail) list = list.filter((i) => i.email === senderEmail);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.email.toLowerCase().includes(q) ||
          i.message.toLowerCase().includes(q) ||
          i.organization.toLowerCase().includes(q)
      );
    }
    list.sort((a, b) =>
      sortNewest
        ? new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        : new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );
    return list;
  }, [items, filter, senderEmail, search, sortNewest]);

  async function markRead(lead: RecentLead, val: boolean) {
    try {
      await adminApi.post(`/leads/${lead.id}/read/`, { is_read: val });
      patch(lead.id, { is_read: val });
      toast.success(val ? "Marked as read" : "Marked as unread", lead.name);
      setMenuFor(null);
    } catch {
      toast.error("Couldn't update message", "Please try again.");
    }
  }

  async function toggleArchive(lead: RecentLead) {
    const val = !lead.is_archived;
    try {
      await adminApi.post(`/leads/${lead.id}/archive/`, { is_archived: val });
      patch(lead.id, { is_archived: val });
      toast.success(val ? "Message archived" : "Message restored", lead.name);
      setMenuFor(null);
    } catch {
      toast.error("Couldn't update message", "Please try again.");
    }
  }

  async function deleteLead(lead: RecentLead) {
    if (!window.confirm(`Delete this message from ${lead.name}? This cannot be undone.`)) return;
    try {
      await adminApi.delete(`/leads/${lead.id}/`);
      setItems((prev) => prev.filter((i) => i.id !== lead.id));
      setMenuFor(null);
      if (viewing?.id === lead.id) setViewing(null);
      toast.success("Message deleted", lead.name);
    } catch {
      toast.error("Couldn't delete message", "Please try again.");
    }
  }

  function onReplied() {
    if (replying) patch(replying.id, { is_read: true, status: "contacted" });
    setReplying(null);
  }

  if (loading) return <Spinner label="Loading messages" />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="space-y-6">
      {/* Header band */}
      <div className="relative overflow-hidden rounded-[2rem] bg-green-grad shadow-lift">
        <div
          className="pointer-events-none absolute inset-0 bg-grid-dark opacity-70"
          style={{ backgroundSize: "40px 40px" }}
        />
        <div className="pointer-events-none absolute inset-0 bg-hero-mesh" />
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 animate-blob rounded-full bg-accent/15 blur-3xl" />
        <div className="relative flex flex-wrap items-center justify-between gap-4 px-6 py-6 sm:px-8">
          <div>
            <span className="eyebrow-dark">
              <IconInbox size={12} /> Inbox
            </span>
            <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight text-white">Messages</h1>
            <p className="mt-1.5 text-sm text-white/60">
              Every enquiry from the website contact form, in one place.
            </p>
          </div>
          <div className="flex items-center gap-2 text-white">
            {counts.unread > 0 && (
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-florante-950">
                {counts.unread} unread
              </span>
            )}
            <button
              onClick={load}
              disabled={loading}
              title="Refresh messages"
              aria-label="Refresh messages"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white disabled:opacity-50"
            >
              <IconRefresh size={16} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`admin-corners rounded-2xl border p-4 text-left transition ${
              filter === f.key
                ? "border-florante-700 bg-florante-50 shadow-lift"
                : "border-florante-100 bg-white hover:border-florante-300"
            }`}
          >
            <p className="font-heading text-2xl font-bold text-florante-900">{counts[f.key]}</p>
            <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-gray-500">
              {f.label}
            </p>
          </button>
        ))}
      </div>

      {/* Filters bar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-56 flex-1">
          <IconSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-florante-400" size={18} />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email or message…"
            className="w-full rounded-full border border-florante-100 bg-white py-3 pl-11 pr-4 text-sm shadow-card outline-none transition focus:border-florante-500 focus:ring-4 focus:ring-florante-500/15"
          />
        </div>
        <select
          value={senderEmail}
          onChange={(e) => setSenderEmail(e.target.value)}
          className="rounded-full border border-florante-100 bg-white px-4 py-3 text-sm shadow-card outline-none transition focus:border-florante-500"
        >
          <option value="">All senders</option>
          {senders.map((s) => (
            <option key={s.email} value={s.email}>
              {s.name || s.email} · {s.count} message{s.count === 1 ? "" : "s"}
            </option>
          ))}
        </select>
        <button
          onClick={() => setSortNewest((v) => !v)}
          className="inline-flex items-center gap-2 rounded-full border border-florante-100 bg-white px-4 py-3 text-sm font-semibold text-florante-700 shadow-card transition hover:bg-florante-50"
        >
          {sortNewest ? "Newest first" : "Oldest first"}
          <IconArrowUpRight size={14} className={sortNewest ? "" : "rotate-180"} />
        </button>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="admin-corners relative rounded-[2rem] border border-dashed border-florante-200 bg-white/70 p-16 text-center shadow-card">
          <p className="font-heading text-xl font-semibold text-florante-800">No messages here</p>
          <p className="mt-1.5 text-sm text-gray-500">
            {search || senderEmail || filter !== "all" ? "Try a different filter or search." : "Messages from the contact form will appear here."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((l, i) => (
            <div
              key={l.id}
              className={`admin-corners relative flex items-center gap-4 rounded-2xl border bg-white p-4 shadow-card transition hover:-translate-y-0.5 hover:shadow-lift sm:p-5 ${
                menuFor === l.id ? "z-10" : ""
              } ${!l.is_read ? "border-accent/40 bg-florante-50/60" : "border-florante-100"}`}
            >
              {!l.is_read && <span className="absolute left-2 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-accent" />}
              <span className="admin-index">{String(i + 1).padStart(2, "0")}</span>
              <button
                onClick={() => setViewing(l)}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-grad font-heading text-sm font-bold text-white"
              >
                {initials(l.name)}
              </button>
              <button onClick={() => setViewing(l)} className="min-w-0 flex-1 text-left">
                <p className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  <span className="truncate font-heading text-base font-semibold text-florante-900">
                    {l.name}
                  </span>
                  <span className="rounded-full bg-moss px-2 py-0.5 text-[10px] font-semibold capitalize text-florante-600">
                    {l.category}
                  </span>
                  {l.telegram_chat_id && (
                    <span className="rounded-full bg-sky-50 px-2 py-0.5 text-[10px] font-semibold text-sky-700">
                      Telegram
                    </span>
                  )}
                  <span className="text-[11px] text-gray-400">{relativeTime(l.created_at)}</span>
                </p>
                <p className="truncate text-xs text-gray-400">
                  {l.email}
                  {l.phone ? ` · ${l.phone}` : ""}
                  {l.need ? ` · ${l.need.replace("_", " ")}` : ""}
                </p>
                {l.message && (
                  <p className="mt-1 line-clamp-2 text-xs italic leading-relaxed text-gray-500">
                    "{l.message}"
                  </p>
                )}
              </button>
              <div className="flex shrink-0 items-center gap-1.5">
                <span className={`hidden rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize sm:inline-block ${statusTone(l.status)}`}>
                  {l.status.replace("_", " ")}
                </span>
                <div className="relative">
                  <button
                    onClick={() => setMenuFor(menuFor === l.id ? null : l.id)}
                    className="rounded-xl p-2 text-gray-400 transition hover:bg-florante-50 hover:text-florante-800"
                    title="Actions"
                    aria-label={`Actions for ${l.name}`}
                  >
                    <IconMore size={18} />
                  </button>
                  {menuFor === l.id && (
                    <>
                      <button
                        aria-label="Close menu"
                        onClick={() => setMenuFor(null)}
                        className="fixed inset-0 z-20 cursor-default"
                      />
                      <div className="absolute right-0 top-full z-40 mt-1 w-52 overflow-hidden rounded-2xl border border-florante-100 bg-white py-1.5 shadow-lift">
                        <MenuButton icon={<IconMail size={15} />} onClick={() => { setMenuFor(null); setViewing(l); }}>
                          View message
                        </MenuButton>
                        <MenuButton icon={<IconMailReply size={15} />} onClick={() => { setMenuFor(null); setReplying(l); }}>
                          Reply
                        </MenuButton>
                        <MenuButton
                          icon={l.is_read ? <IconInbox size={15} /> : <IconCheck size={15} />}
                          onClick={() => markRead(l, !l.is_read)}
                        >
                          {l.is_read ? "Mark as unread" : "Mark as read"}
                        </MenuButton>
                        <MenuButton icon={<IconArchive size={15} />} onClick={() => toggleArchive(l)}>
                          {l.is_archived ? "Restore from archive" : "Archive"}
                        </MenuButton>
                        <div className="my-1.5 h-px bg-florante-50" />
                        <MenuButton
                          danger
                          icon={<IconTrash size={15} />}
                          onClick={() => deleteLead(l)}
                        >
                          Delete
                        </MenuButton>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View modal */}
      {viewing && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
          <button
            aria-label="Close"
            onClick={() => setViewing(null)}
            className="absolute inset-0 bg-florante-950/50 backdrop-blur-sm"
          />
          <div className="relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-lift">
            <div className="relative overflow-hidden bg-green-grad px-6 py-5">
              <div
                className="pointer-events-none absolute inset-0 bg-grid-dark opacity-60"
                style={{ backgroundSize: "32px 32px" }}
              />
              <div className="relative flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 font-heading text-sm font-bold text-white">
                    {initials(viewing.name)}
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-white">{viewing.name}</h3>
                    <p className="text-xs text-white/60">
                      {relativeTime(viewing.created_at)} · {viewing.category}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setViewing(null)}
                  className="rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
                  aria-label="Close"
                >
                  <IconMore className="rotate-90" size={16} />
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
              <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                {[
                  { label: "Name", value: viewing.name },
                  { label: "Type", value: viewing.category },
                  { label: "Organization", value: viewing.organization || "—" },
                  { label: "Email", value: viewing.email || "—" },
                  { label: "Phone", value: viewing.phone || "—" },
                  { label: "Industry", value: viewing.industry || "—" },
                  { label: "Interested in", value: viewing.need ? viewing.need.replace("_", " ") : "—" },
                  { label: "Budget", value: viewing.budget_range || "—" },
                  { label: "Source", value: viewing.source.replace("_", " ") },
                  {
                    label: "Telegram",
                    value: viewing.telegram_chat_id
                      ? viewing.telegram_username
                        ? `@${viewing.telegram_username}`
                        : `chat ${viewing.telegram_chat_id}`
                      : "—",
                  },
                ].map((row) => (
                  <div key={row.label}>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">{row.label}</p>
                    <p className="mt-0.5 text-sm font-medium capitalize text-florante-900">{row.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Message</p>
                <div className="mt-1.5 rounded-2xl border border-florante-100 bg-moss/40 p-4 text-sm leading-relaxed text-florante-900">
                  {viewing.message || "No message included."}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 border-t border-florante-100 bg-florante-50/60 px-6 py-4">
              <button
                onClick={() => { setViewing(null); setReplying(viewing); }}
                className="inline-flex items-center gap-2 rounded-full bg-green-grad px-6 py-2.5 text-sm font-bold text-white shadow-soft transition hover:shadow-glow"
              >
                <IconMailReply size={15} /> Reply
              </button>
              <button
                onClick={() => setViewing(null)}
                className="rounded-full border border-florante-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-florante-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <ReplyModal lead={replying} onClose={() => setReplying(null)} onSent={onReplied} />
    </div>
  );
}

function MenuButton({
  icon,
  children,
  onClick,
  danger,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-2.5 px-4 py-2 text-left text-sm font-medium transition ${
        danger ? "text-red-600 hover:bg-red-50" : "text-gray-700 hover:bg-florante-50"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}