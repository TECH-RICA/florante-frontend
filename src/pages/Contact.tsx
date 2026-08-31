import { useState } from "react";
import api from "../lib/api";
import { SectionHeading } from "../components/SectionHeading";
import { Reveal } from "../components/Reveal";
import { Spinner } from "../components/Spinner";
import { useApi } from "../hooks/useApi";
import { useToast } from "../components/Toast";
import type { SiteConfig, LeadPayload } from "../lib/types";
import {
  IconMail,
  IconPhone,
  IconPin,
  IconWhatsApp,
  IconArrowRight,
  IconCheck,
  IconUser,
  IconGlobe,
  IconShield,
} from "../components/icons";

const NEED_OPTIONS = [
  { value: "ai", label: "AI" },
  { value: "cybersecurity", label: "Cybersecurity" },
  { value: "website", label: "Website" },
  { value: "mobile_app", label: "Mobile App" },
  { value: "enterprise_system", label: "Enterprise System" },
  { value: "automation", label: "Automation" },
  { value: "digital_transformation", label: "Digital Transformation" },
  { value: "product", label: "Product" },
  { value: "other", label: "Other" },
];

const promises = [
  "Response within 24 hours",
  "Your information stays private",
  "Honest, expert advice — no pressure",
];

type Category = "individual" | "organization";

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

const STEPS = [
  { label: "Who are you", n: "01" },
  { label: "Your details", n: "02" },
  { label: "Project & send", n: "03" },
];

function StepIndicator({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-3">
      {STEPS.map((s, i) => {
        const n = i + 1;
        const active = n === step;
        const done = n < step;
        return (
          <div key={s.n} className="flex items-center gap-3">
            <div className="flex items-center gap-2.5">
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full font-mono text-xs font-bold transition-all duration-300 ${
                  done
                    ? "bg-accent-grad text-florante-950"
                    : active
                      ? "bg-green-grad text-white shadow-glow-sm ring-4 ring-florante-100"
                      : "bg-moss text-florante-400"
                }`}
              >
                {done ? <IconCheck size={15} /> : s.n}
              </span>
              <span
                className={`hidden text-xs font-semibold sm:block ${
                  active ? "text-florante-900" : "text-gray-400"
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <span
                className={`h-px w-8 transition-colors sm:w-14 ${n < step ? "bg-accent" : "bg-florante-100"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function Contact() {
  const site = useApi<SiteConfig>("site/");
  const [category, setCategory] = useState<Category | null>(null);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<LeadPayload>({
    name: "",
    organization: "",
    email: "",
    phone: "",
    industry: "",
    need: "",
    budget_range: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  function resetForm() {
    setCategory(null);
    setStep(1);
    setForm({
      name: "",
      organization: "",
      email: "",
      phone: "",
      industry: "",
      need: "",
      budget_range: "",
      message: "",
    });
    setError(null);
    setSubmitted(false);
  }

  const set =
    (k: keyof LeadPayload) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  function validateStep(stepToCheck: number): string | null {
    if (stepToCheck === 1) {
      if (!category) return "Please choose whether you're an individual or an organization.";
      return null;
    }
    if (stepToCheck === 2) {
      if (!form.name.trim()) return "Please enter your full name.";
      if (!emailOk(form.email)) return "Please enter a valid email address.";
      return null;
    }
    return null;
  }

  function goNext() {
    const problem = validateStep(step);
    if (problem) {
      setError(problem);
      return;
    }
    setError(null);
    setStep((s) => Math.min(3, s + 1));
  }

  function goBack() {
    setError(null);
    if (step === 2 && category) setStep(1);
    else setStep((s) => Math.max(1, s - 1));
  }

  const sendForm = async () => {
    const problem = validateStep(2);
    if (problem) {
      setError(problem);
      setStep(2);
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const [response] = await Promise.all([
        api.post("leads/", { ...form, category }),
        new Promise((r) => setTimeout(r, 2000)),
      ]);
      if (response.status >= 200 && response.status < 300) {
        setSubmitted(true);
        toast.success(
          "Message sent — thank you!",
          "We'll review your enquiry and get back to you within 24 hours."
        );
      } else {
        setError("We couldn't send your message. Please try again.");
      }
    } catch {
      setError("Failed to send your message. Please check your connection and try again.");
      toast.error("Message not sent", "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappUrl = site.data?.whatsapp
    ? `https://wa.me/${site.data.whatsapp}?text=${encodeURIComponent("Hello Florante, I'd like to discuss a project.")}`
    : "https://wa.me/254770428297";

  const inputCls =
    "w-full rounded-xl border border-florante-100 bg-moss/40 px-4 py-3 text-sm text-florante-900 transition-colors placeholder:text-gray-500 focus:border-florante-500 focus:bg-white focus:outline-none";

  if (submitted) {
    return (
      <div className="relative flex min-h-[70vh] items-center overflow-hidden bg-moss/60 py-24">
        <div
          className="pointer-events-none absolute inset-0 bg-grid-light opacity-60"
          style={{ backgroundSize: "48px 48px" }}
        />
        <div className="container-narrow relative text-center">
          <Reveal>
            <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-accent-grad text-florante-950 shadow-glow">
              <IconCheck size={36} />
            </span>
            <h1 className="mt-8 font-heading text-3xl font-bold text-florante-800 sm:text-4xl">
              Message received. Thank you.
            </h1>
            <p className="mx-auto mt-4 max-w-md text-gray-600">
              We'll review your enquiry and get back to you within 24 hours —
              often much sooner.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={resetForm}
                className="inline-flex items-center gap-2 rounded-full bg-florante-700 px-7 py-3.5 text-sm font-semibold text-white shadow-soft transition-all hover:bg-florante-800 hover:shadow-glow"
              >
                Send another message
                <IconArrowRight size={15} />
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="relative overflow-hidden border-b border-florante-100 bg-moss/60 py-12 sm:py-16 md:py-24" data-track-section="hero">
        <div
          className="pointer-events-none absolute inset-0 bg-grid-light opacity-60"
          style={{ backgroundSize: "48px 48px" }}
        />
        <div className="pointer-events-none absolute -left-32 -top-24 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
        <div className="container-page relative">
          <SectionHeading
            index="01"
            eyebrow="Contact"
            title="Let's solve your technology problem"
            subtitle="Tell us about your challenge — we'll show you the path forward. No jargon, no pressure."
          />
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-16 md:py-24" data-track-section="contact-form">
        <div className="container-page grid gap-14 lg:grid-cols-[1.4fr_0.8fr]">
          <Reveal>
            <div className="relative">
              <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
              <div className="flex flex-wrap items-center justify-between gap-4 pt-8">
                <h2 className="font-heading text-2xl font-bold text-florante-800">
                  Tell us about your project
                </h2>
                <p className="text-sm text-gray-500">Fields marked * are required.</p>
              </div>

              <div className="mt-6">
                <StepIndicator step={step} />
              </div>

              <div className="mt-8">
                {step === 1 && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => {
                        setCategory("individual");
                        setError(null);
                      }}
                      data-track-click="form_category_individual"
                      className={`group relative rounded-2xl border-2 p-6 text-left transition-all duration-300 ${
                        category === "individual"
                          ? "border-florante-700 bg-florante-50 shadow-lift"
                          : "border-florante-100 bg-white hover:border-florante-300 hover:shadow-soft"
                      }`}
                    >
                      {category === "individual" && (
                        <span className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-accent-grad text-florante-950">
                          <IconCheck size={15} />
                        </span>
                      )}
                      <span
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-colors duration-300 ${
                          category === "individual"
                            ? "bg-green-grad text-white"
                            : "bg-florante-50 text-florante-700 group-hover:bg-green-grad group-hover:text-white"
                        }`}
                      >
                        <IconUser size={22} />
                      </span>
                      <h3 className="mt-5 font-heading text-lg font-bold text-florante-800">
                        I'm an individual
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
                        Just you, your idea and your budget — no company needed.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setCategory("organization");
                        setError(null);
                      }}
                      data-track-click="form_category_organization"
                      className={`group relative rounded-2xl border-2 p-6 text-left transition-all duration-300 ${
                        category === "organization"
                          ? "border-florante-700 bg-florante-50 shadow-lift"
                          : "border-florante-100 bg-white hover:border-florante-300 hover:shadow-soft"
                      }`}
                    >
                      {category === "organization" && (
                        <span className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-accent-grad text-florante-950">
                          <IconCheck size={15} />
                        </span>
                      )}
                      <span
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-colors duration-300 ${
                          category === "organization"
                            ? "bg-green-grad text-white"
                            : "bg-florante-50 text-florante-700 group-hover:bg-green-grad group-hover:text-white"
                        }`}
                      >
                        <IconGlobe size={22} />
                      </span>
                      <h3 className="mt-5 font-heading text-lg font-bold text-florante-800">
                        I'm representing an organization
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
                        A team, company or institution that needs technology.
                      </p>
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Full name *
                      </label>
                      <input type="text" value={form.name} onChange={set("name")} placeholder="Jane Mwangi" className={inputCls} />
                    </div>
                    {category === "organization" && (
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                          Organization
                        </label>
                        <input type="text" value={form.organization} onChange={set("organization")} placeholder="Company / institution" className={inputCls} />
                      </div>
                    )}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        {category === "organization" ? "Work email *" : "Email *"}
                      </label>
                      <input type="email" value={form.email} onChange={set("email")} placeholder={category === "organization" ? "you@company.com" : "you@email.com"} className={inputCls} />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Phone / WhatsApp
                      </label>
                      <input type="tel" value={form.phone} onChange={set("phone")} placeholder="+254 7xx xxx xxx" className={inputCls} />
                    </div>
                    {category === "organization" && (
                      <div className="sm:col-span-2">
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                          Industry
                        </label>
                        <input type="text" value={form.industry} onChange={set("industry")} placeholder="e.g. Education, SME, Finance" className={inputCls} />
                      </div>
                    )}
                  </div>
                )}

                {step === 3 && (
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        What do you need help with?
                      </label>
                      <select value={form.need} onChange={set("need")} className={inputCls}>
                        <option value="">Select a focus area...</option>
                        {NEED_OPTIONS.map((o) => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Budget range (optional)
                      </label>
                      <input type="text" value={form.budget_range} onChange={set("budget_range")} placeholder="e.g. KES 50k – 200k" className={inputCls} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">Message</label>
                      <textarea value={form.message} onChange={set("message")} rows={5} placeholder="Tell us about the challenge you're facing..." className={inputCls} />
                    </div>

                    <div className="sm:col-span-2">
                      <div className="rounded-2xl border border-florante-100 bg-moss/40 p-5">
                        <p className="text-xs font-semibold uppercase tracking-widest text-florante-500">
                          Review before sending
                        </p>
                        <dl className="mt-3 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                          <div className="flex gap-2">
                            <dt className="text-gray-400">Type</dt>
                            <dd className="font-semibold capitalize text-florante-900">{category}</dd>
                          </div>
                          <div className="flex gap-2">
                            <dt className="text-gray-400">Name</dt>
                            <dd className="font-semibold text-florante-900">{form.name}</dd>
                          </div>
                          <div className="flex gap-2">
                            <dt className="text-gray-400">Email</dt>
                            <dd className="font-semibold text-florante-900">{form.email}</dd>
                          </div>
                          {form.organization && (
                            <div className="flex gap-2">
                              <dt className="text-gray-400">Organization</dt>
                              <dd className="font-semibold text-florante-900">{form.organization}</dd>
                            </div>
                          )}
                        </dl>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {error && (
                <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
              )}

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex flex-wrap items-center gap-3">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={goBack}
                      className="inline-flex items-center gap-2 rounded-full border border-florante-200 bg-white px-6 py-3.5 text-sm font-semibold text-gray-600 transition hover:bg-florante-50"
                    >
                      <IconArrowRight className="rotate-180" size={15} />
                      Back
                    </button>
                  )}
                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={goNext}
                      data-track-click="form_next"
                      className="group inline-flex items-center gap-2 rounded-full bg-florante-700 px-8 py-3.5 text-sm font-semibold text-white shadow-soft transition-all hover:bg-florante-800 hover:shadow-glow"
                    >
                      Continue
                      <IconArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={sendForm}
                      disabled={submitting}
                      data-track-click="contact_submit"
                      className="group inline-flex items-center justify-center gap-2 rounded-full bg-florante-700 px-8 py-3.5 text-sm font-semibold text-white shadow-soft transition-all hover:bg-florante-800 hover:shadow-glow disabled:opacity-60"
                    >
                      {submitting ? (
                        <>
                          <Spinner size={18} /> Sending...
                        </>
                      ) : (
                        <>
                          Send message
                          <IconArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                        </>
                      )}
                    </button>
                  )}
                </div>
                <p className="flex items-center gap-2 text-xs text-gray-600 sm:ml-2">
                  <IconShield size={14} className="text-florante-600" />
                  Your details are safe with us.
                </p>
              </div>
            </div>
          </Reveal>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Reveal delay={80}>
              <div className="relative overflow-hidden rounded-[2rem] bg-green-grad p-8 text-white shadow-lift">
                <div
                  className="pointer-events-none absolute inset-0 bg-grid-dark opacity-60"
                  style={{ backgroundSize: "36px 36px" }}
                />
                <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-accent/20 blur-2xl" />
                <div className="relative">
                  <span className="eyebrow-dark">Fastest route</span>
                  <h3 className="mt-5 font-heading text-2xl font-bold">Prefer to chat?</h3>
                  <p className="mt-2 text-sm text-florante-100/80">
                    Get a faster response on WhatsApp — we reply quickly during working hours.
                  </p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-6 inline-flex items-center gap-2 rounded-full bg-accent-grad px-6 py-3 text-sm font-semibold text-florante-950 shadow-glow-sm transition-all hover:brightness-105"
                  >
                    <IconWhatsApp size={17} /> Chat on WhatsApp
                    <IconArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </Reveal>

            <div className="editorial-list mt-10">
              <Reveal>
                <div className="py-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-florante-500">
                    Contact information
                  </p>
                  <ul className="mt-4 space-y-4 text-sm text-gray-600">
                    <li className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-moss text-florante-700">
                        <IconMail size={16} />
                      </span>
                      <a href={`mailto:${site.data?.primary_email || ""}`} className="font-medium text-florante-800 hover:underline">
                        {site.data?.primary_email || "techrica2@gmail.com"}
                      </a>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-moss text-florante-700">
                        <IconPhone size={16} />
                      </span>
                      <span className="font-medium text-florante-800">
                        {site.data?.phone || "+254 770 428 297"}
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-moss text-florante-700">
                        <IconPin size={16} />
                      </span>
                      <span className="font-medium text-florante-800">
                        {[site.data?.address, site.data?.city].filter(Boolean).join(", ") || "Kirinyaga, Kenya"}
                      </span>
                    </li>
                  </ul>
                </div>
              </Reveal>

              <Reveal>
                <div className="border-t border-florante-100 py-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-florante-500">
                    What to expect
                  </p>
                  <ul className="mt-4 space-y-3">
                    {promises.map((text) => (
                      <li key={text} className="flex items-center gap-3 text-sm text-gray-600">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-dark">
                          <IconCheck size={13} />
                        </span>
                        {text}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}