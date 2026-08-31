import { useEffect, useState } from "react";
import { adminApi } from "../../lib/adminApi";
import { SITE_FIELDS } from "../../lib/adminResources";
import { AdminField } from "../../components/admin/AdminField";
import { Spinner } from "../../components/Spinner";
import { ErrorState } from "../../components/ErrorState";
import { useToast } from "../../components/Toast";
import { IconArrowRight, IconCheck, IconGear, IconSend } from "../../components/icons";

type Row = Record<string, unknown>;

interface EmailInfo {
  configured: boolean;
  mode: string;
  host: string;
  port: number;
  from_email: string;
  from_name: string;
}

interface TelegramInfo {
  configured: boolean;
  username: string;
  name: string;
  webhook_set: boolean;
  detail: string;
}

const GROUPS: { title: string; sub: string; keys: string[] }[] = [
  {
    title: "Brand",
    sub: "How the site introduces itself",
    keys: ["site_name", "tagline", "description"],
  },
  {
    title: "Contact",
    sub: "Where enquiries and visitors land",
    keys: ["primary_email", "secondary_email", "phone", "whatsapp", "address", "city"],
  },
  {
    title: "Social",
    sub: "Profiles linked across the site",
    keys: ["linkedin", "github", "twitter", "facebook"],
  },
];

const fieldMap = new Map(SITE_FIELDS.map((f) => [f.key, f]));

export function SiteSettings() {
  const [form, setForm] = useState<Row>({});
  const [original, setOriginal] = useState<Row>({});
  const [showGuide, setShowGuide] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [editing, setEditing] = useState(false);
  const [emailInfo, setEmailInfo] = useState<EmailInfo>({
    configured: false,
    mode: "api",
    host: "",
    port: 443,
    from_email: "",
    from_name: "",
  });
  const [testEmail, setTestEmail] = useState("");
  const [testing, setTesting] = useState(false);
  const [telegramInfo, setTelegramInfo] = useState<TelegramInfo>({
    configured: false,
    username: "",
    name: "",
    webhook_set: false,
    detail: "",
  });
  const toast = useToast();

  useEffect(() => {
    adminApi
      .get<EmailInfo>("/test-email/")
      .then((res) => {
        setEmailInfo(res.data);
        if (res.data.configured) setTestEmail((prev) => prev || res.data.from_email);
      })
      .catch(() => {});
    adminApi
      .get<TelegramInfo>("/telegram/")
      .then((res) => setTelegramInfo(res.data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    adminApi
      .get<Row>("/site/")
      .then((res) => {
        setForm(res.data);
        setOriginal(res.data);
      })
      .catch((err: unknown) =>
        setError(
          (err as { response?: { data?: { detail?: string } } }).response?.data?.detail ||
            "Unable to load site settings."
        )
      )
      .finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    try {
      const res = await adminApi.put<Row>("/site/", form);
      setForm(res.data);
      setOriginal(res.data);
      setEditing(false);
      setSaved(true);
      toast.success("Settings saved", "Your changes are live on the site.");
      setTimeout(() => setSaved(false), 2500);
    } catch (err: unknown) {
      const data = (err as { response?: { data?: unknown } }).response?.data;
      let message = "Unable to save.";
      if (data && typeof data === "object") {
        message = Object.entries(data as Record<string, unknown>)
          .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : String(v)}`)
          .join("; ");
      }
      setError(message);
      toast.error("Settings not saved", message);
    } finally {
      setSaving(false);
    }
  }

  function cancelEdit() {
    setForm(original);
    setError(null);
    setEditing(false);
  }

  async function sendTestEmail() {
    if (!testEmail.trim()) {
      toast.error("Recipient required", "Enter an email address to send the test to.");
      return;
    }
    setTesting(true);
    try {
      const res = await adminApi.post<{ detail: string }>("/test-email/", { to: testEmail.trim() });
      toast.success("Test email sent", res.data.detail);
    } catch (err: unknown) {
      const data = (err as { response?: { data?: { detail?: string } } }).response?.data;
      toast.error("Test email failed", data?.detail || "Check your Brevo credentials in backend/.env.");
    } finally {
      setTesting(false);
    }
  }

  if (loading) return <Spinner label="Loading settings" />;
  if (error && Object.keys(form).length === 0) return <ErrorState message={error} />;

  const emailConfigured = emailInfo.configured;
  const telegramConfigured = telegramInfo.configured;

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
        <div className="relative px-6 py-6 sm:px-8">
          <span className="eyebrow-dark">
            <IconGear size={12} /> System
          </span>
          <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight text-white">
            Site settings
          </h1>
          <p className="mt-1.5 text-sm text-white/60">
            Brand, contact and social details shown across the public site.
          </p>
        </div>
      </div>

      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="overflow-hidden rounded-[2rem] border border-florante-100 bg-white shadow-lift">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-florante-100 bg-florante-50/60 px-6 py-4 sm:px-8">
          <div>
            <p className="font-heading text-base font-bold text-florante-900">Email delivery (Brevo)</p>
            <p className="mt-0.5 text-xs text-gray-400">
              Replies from the Messages inbox and test emails are sent through Brevo SMTP.
            </p>
          </div>
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${
              emailConfigured ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"
            }`}
          >
            <span className={`h-2 w-2 rounded-full ${emailConfigured ? "bg-green-500" : "bg-amber-500"}`} />
            {emailConfigured ? "Configured" : "Awaiting keys"}
          </span>
        </div>
        <div className="px-6 py-5 sm:px-8">
          <p className="text-xs leading-relaxed text-gray-500">
            {emailConfigured
              ? `Via Brevo ${emailInfo.mode === "api" ? "transactional API" : `SMTP relay ${emailInfo.host}:${emailInfo.port}`} · from ${emailInfo.from_name} <${emailInfo.from_email}>`
              : "Add a Brevo key to backend/.env (BREVO_API_KEY or EMAIL_HOST_USER + EMAIL_HOST_PASSWORD), then restart the backend."}
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              type="email"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              placeholder="Recipient email (e.g. you@gmail.com)"
              className="w-full rounded-full border border-florante-100 bg-moss/40 px-4 py-2.5 text-sm text-florante-900 outline-none transition focus:border-florante-500 focus:bg-white sm:max-w-sm"
            />
            <button
              onClick={sendTestEmail}
              disabled={testing || !emailConfigured}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-green-grad px-6 py-2.5 text-sm font-bold text-white shadow-soft transition hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-50"
            >
              {testing ? "Sending…" : "Send test email"}
              <IconSend size={15} />
            </button>
          </div>
        </div>
      </div>

<div className="overflow-hidden rounded-[2rem] border border-florante-100 bg-white shadow-lift">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-florante-100 bg-florante-50/60 px-6 py-4 sm:px-8">
          <div>
            <p className="font-heading text-base font-bold text-florante-900">Telegram bot</p>
            <p className="mt-0.5 text-xs text-gray-400">
              Customers message your bot and their chats land in the Messages inbox for you to reply to.
            </p>
          </div>
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${
              telegramConfigured ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"
            }`}
          >
            <span className={`h-2 w-2 rounded-full ${telegramConfigured ? "bg-green-500" : "bg-amber-500"}`} />
            {telegramConfigured ? `@${telegramInfo.username}` : "Not configured"}
          </span>
        </div>
        <div className="px-6 py-5 sm:px-8">
          <p className="text-xs leading-relaxed text-gray-500">
            {telegramConfigured
              ? `${telegramInfo.name} is live as @${telegramInfo.username}. Anyone who messages the bot appears here automatically.`
              : "Create a bot with @BotFather on Telegram, paste TELEGRAM_BOT_TOKEN into backend/.env, then restart the backend."}
          </p>
          {telegramConfigured && (
            <a
              href={`https://t.me/${telegramInfo.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-florante-700 px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-florante-800 hover:shadow-glow"
            >
              Open the bot <IconArrowRight size={15} />
            </a>
          )}
          {telegramInfo.detail && (
            <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-2.5 text-xs text-amber-700">
              {telegramInfo.detail}
            </p>
          )}
        </div>
      </div>

              <div className="overflow-hidden rounded-[2rem] border border-florante-100 bg-white shadow-lift">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-florante-100 bg-florante-50/60 px-6 py-3.5 sm:px-8">
            <div className="flex items-center gap-3">
              <p className="text-xs font-medium text-gray-500">
                {editing ? "Editing enabled — changes go live when you save." : "Read-only — press Edit to change these settings."}
              </p>
              <button
                type="button"
                onClick={() => setShowGuide((prev) => !prev)}
                className="inline-flex items-center gap-1 rounded-full border border-florante-200 bg-white px-2.5 py-1 text-xs font-semibold text-florante-700 hover:bg-florante-100"
              >
                💡 {showGuide ? "Hide Guidance" : "Show Guidance"}
              </button>
            </div>
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="inline-flex items-center gap-2 rounded-full bg-florante-700 px-5 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-florante-800 hover:shadow-glow"
              >
                <IconGear size={14} /> Edit
              </button>
            )}
          </div>

          {showGuide && (
            <div className="m-6 rounded-2xl border border-florante-200 bg-florante-50/50 p-4 text-xs text-gray-700 space-y-2">
              <p className="font-bold text-florante-900">💡 Site Settings Field Guide:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li><b>Brand:</b> Site Name & Description power SEO open-graph tags and header logo text across the website.</li>
                <li><b>Contact:</b> Primary email, phone & WhatsApp number populate the /contact page and footer quick-contact links.</li>
                <li><b>Social:</b> Full URLs to LinkedIn, GitHub, Twitter & Facebook render in the main footer navigation.</li>
              </ul>
            </div>
          )}
          <fieldset disabled={!editing} className="disabled:opacity-70">
            <div className="px-6 py-8 sm:px-8">
              {GROUPS.map((group) => (
                <div key={group.title} className="mt-8 first:mt-0">
                  <div className="flex items-center gap-3">
                    <span className="admin-index">{GROUPS.indexOf(group) + 1}</span>
                    <div>
                      <h2 className="font-heading text-base font-bold text-florante-900">{group.title}</h2>
                      <p className="text-xs text-gray-400">{group.sub}</p>
                    </div>
                  </div>
                  <div className="admin-rule my-5" />
                  <div className="grid gap-6 lg:grid-cols-2">
                    {group.keys.map((key) => {
                      const field = fieldMap.get(key);
                      if (!field) return null;
                      return (
                        <div key={key} className={field.type === "textarea" ? "lg:col-span-2" : ""}>
                          <AdminField
                            field={field}
                            value={form[key]}
                            onChange={(v) => setForm((prev) => ({ ...prev, [key]: v }))}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </fieldset>

          {editing && (
            <div className="sticky bottom-0 z-10 border-t border-florante-100 bg-white/95 px-6 py-4 backdrop-blur sm:px-8">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-full bg-accent-grad px-6 py-2.5 text-sm font-bold text-florante-950 shadow-glow transition hover:brightness-105 disabled:opacity-60"
                >
                  {saving ? "Saving…" : "Save settings"}
                  <IconArrowRight size={15} />
                </button>
                <button
                  onClick={cancelEdit}
                  className="rounded-full border border-florante-200 bg-white px-6 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-florante-50"
                >
                  Cancel
                </button>
                {saved && (
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-dark">
                    <IconCheck size={15} /> Saved
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
    </div>
  );
}