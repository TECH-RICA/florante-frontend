import { useEffect, useState, useRef } from "react";
import { useTalkModal } from "../hooks/useTalkModal";
import { IconClose, IconCheck, IconArrowRight, IconWhatsApp, IconMail } from "./icons";
import api from "../lib/api";

const NEEDS = [
  "AI & Automation",
  "Cybersecurity",
  "Website / Portal",
  "Mobile App",
  "Enterprise System",
  "Digital Transformation",
  "Data & Analytics",
  "Product Demo",
  "Other",
];

const BUDGETS = [
  "Under KES 100K",
  "KES 100K – 500K",
  "KES 500K – 1M",
  "Over KES 1M",
  "Let's discuss",
];

type Step = "form" | "success";

interface FormData {
  name: string;
  organization: string;
  email: string;
  phone: string;
  industry: string;
  need: string;
  budget_range: string;
  message: string;
}

const EMPTY: FormData = {
  name: "", organization: "", email: "", phone: "",
  industry: "", need: "", budget_range: "", message: "",
};

export function TalkModal() {
  const { isOpen, closeModal, defaults } = useTalkModal();
  const [form, setForm]     = useState<FormData>(EMPTY);
  const [step, setStep]     = useState<Step>("form");
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);

  // Pre-fill from context
  useEffect(() => {
    if (isOpen) {
      setForm({ ...EMPTY, need: defaults.need ?? "", organization: defaults.product ?? "" });
      setStep("form");
      setError("");
    }
  }, [isOpen, defaults]);

  // Prevent body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeModal]);

  const set = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) { setError("Name and email are required."); return; }
    setLoading(true); setError("");
    try {
      await api.post("leads/", {
        name:         form.name,
        organization: form.organization,
        email:        form.email,
        phone:        form.phone,
        industry:     form.industry,
        need:         form.need,
        budget_range: form.budget_range,
        message:      form.message,
        category:     "talk_to_florante",
      });
      setStep("success");
    } catch {
      setError("Something went wrong. Please try again or WhatsApp us directly.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="modal-backdrop"
      onClick={(e) => { if (e.target === overlayRef.current) closeModal(); }}
    >
      <div className="modal-panel animate-scale-in">
        {/* Header */}
        <div className="relative flex items-start justify-between gap-4 bg-green-grad px-6 py-5">
          <div className="pointer-events-none absolute inset-0 bg-hero-mesh opacity-70" />
          <div className="relative">
            <p className="font-heading text-lg font-bold text-white">Talk to Florante</p>
            <p className="mt-0.5 text-sm text-white/65">
              Tell us what you need — we'll get back within 24 hours.
            </p>
          </div>
          <button
            onClick={closeModal}
            className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20"
          >
            <IconClose size={16} />
          </button>
        </div>

        {step === "success" ? (
          <div className="flex flex-col items-center px-6 py-12 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/15 text-accent-dark">
              <IconCheck size={32} />
            </span>
            <h3 className="mt-5 font-heading text-xl font-bold text-florante-800">Message received!</h3>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-gray-500">
              Thanks, {form.name.split(" ")[0]}! We'll review your enquiry and be in touch shortly.
            </p>
            <div className="mt-6 flex flex-col gap-3 w-full">
              <a
                href="https://wa.me/254770428297?text=Hello%20Florante%2C%20I%20just%20sent%20an%20enquiry%20and%20would%20like%20to%20connect."
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 text-sm font-semibold text-white"
              >
                <IconWhatsApp size={16} /> Also reach us on WhatsApp
              </a>
              <button
                onClick={closeModal}
                className="rounded-full border border-florante-200 py-3 text-sm font-medium text-florante-700 hover:bg-florante-50"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Full name *</label>
                <input
                  value={form.name} onChange={set("name")} required
                  placeholder="Jane Wanjiku"
                  className="w-full rounded-xl border border-florante-200 bg-florante-50/50 px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-florante-500 focus:ring-2 focus:ring-florante-200 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Organization</label>
                <input
                  value={form.organization} onChange={set("organization")}
                  placeholder="Company / University"
                  className="w-full rounded-xl border border-florante-200 bg-florante-50/50 px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-florante-500 focus:ring-2 focus:ring-florante-200 transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email *</label>
                <input
                  type="email" value={form.email} onChange={set("email")} required
                  placeholder="you@company.com"
                  className="w-full rounded-xl border border-florante-200 bg-florante-50/50 px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-florante-500 focus:ring-2 focus:ring-florante-200 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Phone / WhatsApp</label>
                <input
                  value={form.phone} onChange={set("phone")}
                  placeholder="+254 7XX XXX XXX"
                  className="w-full rounded-xl border border-florante-200 bg-florante-50/50 px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-florante-500 focus:ring-2 focus:ring-florante-200 transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">What do you need?</label>
                <select
                  value={form.need} onChange={set("need")}
                  className="w-full rounded-xl border border-florante-200 bg-florante-50/50 px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:border-florante-500 focus:ring-2 focus:ring-florante-200 transition"
                >
                  <option value="">Select area…</option>
                  {NEEDS.map((n) => <option key={n}>{n}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Budget range</label>
                <select
                  value={form.budget_range} onChange={set("budget_range")}
                  className="w-full rounded-xl border border-florante-200 bg-florante-50/50 px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:border-florante-500 focus:ring-2 focus:ring-florante-200 transition"
                >
                  <option value="">Optional…</option>
                  {BUDGETS.map((b) => <option key={b}>{b}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Tell us more</label>
              <textarea
                value={form.message} onChange={set("message")} rows={3}
                placeholder="Describe your project, challenge or question…"
                className="w-full resize-none rounded-xl border border-florante-200 bg-florante-50/50 px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-florante-500 focus:ring-2 focus:ring-florante-200 transition"
              />
            </div>

            {error && (
              <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm text-rose-600">{error}</p>
            )}

            <div className="flex flex-col gap-2.5 pt-1 pb-2">
              <button
                type="submit" disabled={loading}
                className="flex items-center justify-center gap-2 rounded-full bg-florante-700 py-3.5 text-sm font-semibold text-white shadow-soft transition-all hover:bg-florante-800 hover:shadow-glow disabled:opacity-60"
              >
                {loading ? "Sending…" : <>Send enquiry <IconArrowRight size={15} /></>}
              </button>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-florante-100" />
                <span className="text-xs text-gray-400 font-medium">or</span>
                <div className="flex-1 h-px bg-florante-100" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="https://wa.me/254770428297?text=Hello%20Florante%2C%20I%20have%20an%20enquiry."
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full border border-florante-200 py-2.5 text-sm font-medium text-florante-700 hover:bg-florante-50"
                >
                  <IconWhatsApp size={15} /> WhatsApp
                </a>
                <a
                  href="mailto:florantej@gmail.com"
                  className="flex items-center justify-center gap-2 rounded-full border border-florante-200 py-2.5 text-sm font-medium text-florante-700 hover:bg-florante-50"
                >
                  <IconMail size={15} /> Email us
                </a>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
