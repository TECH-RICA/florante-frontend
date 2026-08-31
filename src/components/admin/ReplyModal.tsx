import { useEffect, useState } from "react";
import { adminApi } from "../../lib/adminApi";
import type { RecentLead } from "../../lib/adminTypes";
import { useToast } from "../Toast";
import { IconClose, IconMail, IconSend } from "../icons";

type Channel = "email" | "telegram";

interface ReplyModalProps {
  lead: RecentLead | null;
  onClose: () => void;
  onSent?: () => void;
}

export function ReplyModal({ lead, onClose, onSent }: ReplyModalProps) {
  const [channel, setChannel] = useState<Channel>("email");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const hasEmail = Boolean(lead?.email);
  const hasTelegram = Boolean(lead?.telegram_chat_id);
  const channels: Channel[] = [];
  if (hasEmail) channels.push("email");
  if (hasTelegram) channels.push("telegram");

  useEffect(() => {
    if (lead) {
      setChannel(hasTelegram && !hasEmail ? "telegram" : "email");
      setSubject(`Re: Your enquiry to Florante`);
      setBody(`Hi ${lead.name.split(" ")[0] || "there"},\n\n`);
      setError(null);
    }
  }, [lead, hasEmail, hasTelegram]);

  if (!lead) return null;

  async function handleSend() {
    if (!lead) return;
    if (channel === "email" && (!subject.trim() || !body.trim())) {
      setError("Please enter both a subject and a message.");
      return;
    }
    if (channel === "telegram" && !body.trim()) {
      setError("Please enter a message.");
      return;
    }
    setSending(true);
    setError(null);
    try {
      const res = await adminApi.post<{ delivered: boolean; detail: string; url?: string }>(
        `/leads/${lead.id}/reply/`,
        channel === "email" ? { channel: "email", subject, body } : { channel: "telegram", body }
      );
      if (res.data.delivered) {
        toast.success(
          "Reply sent",
          channel === "email" ? `Delivered to ${lead.email}.` : "Delivered on Telegram."
        );
      } else if (res.data.url) {
        window.open(res.data.url, "_blank", "noopener,noreferrer");
        toast.info("Opening your mail app", "Email isn't configured yet — your draft is ready.");
      } else {
        toast.success("Reply recorded", res.data.detail);
      }
      onSent?.();
      onClose();
    } catch (err: unknown) {
      const data = (err as { response?: { data?: { detail?: string } } }).response?.data;
      const message = data?.detail || "Unable to send the reply.";
      setError(message);
      toast.error("Reply not sent", message);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-florante-950/50 backdrop-blur-sm"
      />
      <div className="relative w-full max-w-lg overflow-hidden rounded-[1.75rem] bg-white shadow-lift">
        <div className="relative overflow-hidden bg-green-grad px-6 py-5">
          <div
            className="pointer-events-none absolute inset-0 bg-grid-dark opacity-60"
            style={{ backgroundSize: "32px 32px" }}
          />
          <div className="relative flex items-center justify-between gap-4">
            <div>
              <span className="eyebrow-dark">
                {channel === "email" ? <IconMail size={12} /> : <IconSend size={12} />}
                Reply by {channel === "email" ? "email" : "Telegram"}
              </span>
              <h3 className="mt-1.5 font-heading text-xl font-bold text-white">Reply to {lead.name}</h3>
            </div>
            <button
              onClick={onClose}
              className="rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
              aria-label="Close"
            >
              <IconClose size={16} />
            </button>
          </div>
          {channels.length > 1 && (
            <div className="relative mt-4 flex gap-1.5">
              {channels.map((c) => (
                <button
                  key={c}
                  onClick={() => { setChannel(c); setError(null); }}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                    channel === c ? "bg-white text-florante-900 shadow" : "bg-white/10 text-white/80 hover:bg-white/20"
                  }`}
                >
                  {c === "email" ? <IconMail size={14} /> : <IconSend size={14} />}
                  {c === "email" ? "Email" : "Telegram"}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4 px-6 py-6">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">To</label>
            <p className="mt-1 rounded-xl border border-florante-100 bg-moss/40 px-4 py-2.5 text-sm font-medium text-florante-900">
              {channel === "email"
                ? lead.email || "—"
                : lead.telegram_username
                  ? `@${lead.telegram_username}`
                  : `Telegram chat ${lead.telegram_chat_id}`}
            </p>
          </div>
          {channel === "email" && (
            <div>
              <label htmlFor="reply-subject" className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Subject
              </label>
              <input
                id="reply-subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="mt-1 w-full rounded-xl border border-florante-100 bg-moss/40 px-4 py-3 text-sm text-florante-900 transition-colors placeholder:text-gray-500 focus:border-florante-500 focus:bg-white focus:outline-none"
              />
            </div>
          )}
          <div>
            <label htmlFor="reply-body" className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Message
            </label>
            <textarea
              id="reply-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={7}
              className="mt-1 w-full resize-y rounded-xl border border-florante-100 bg-moss/40 px-4 py-3 text-sm leading-relaxed text-florante-900 transition-colors placeholder:text-gray-500 focus:border-florante-500 focus:bg-white focus:outline-none"
            />
          </div>
          {error && <p className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700">{error}</p>}
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3 border-t border-florante-100 bg-florante-50/60 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-full border border-florante-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-florante-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={sending}
            className="inline-flex items-center gap-2 rounded-full bg-green-grad px-6 py-2.5 text-sm font-bold text-white shadow-soft transition hover:shadow-glow disabled:opacity-60"
          >
            {sending ? "Sending…" : channel === "email" ? "Send reply" : "Send on Telegram"}
            <IconSend size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}