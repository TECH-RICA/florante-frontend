import { useParams } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { Spinner } from "../components/Spinner";
import { NotFoundDetail } from "../components/NotFoundDetail";
import { CTAButton } from "../components/CTAButton";
import { Reveal } from "../components/Reveal";
import type { Industry } from "../lib/types";
import { IconCheck, IconArrowRight } from "../components/icons";
import { useTalkModal } from "../hooks/useTalkModal";

// Static content per industry since backend may not have full content yet
const INDUSTRY_CONTENT: Record<string, { hero: string; problems: string[]; solutions: string[]; cta: string }> = {
  education: {
    hero: "We build platforms that help universities, colleges and schools deliver better education, manage operations, and connect students with opportunities.",
    problems: ["Manual accommodation and fee management", "Fragmented student data across departments", "No digital engagement for alumni", "Difficult timetabling and scheduling"],
    solutions: ["Student management & accommodation systems (Unicrib)", "Digital learning management systems", "University analytics dashboards", "Alumni engagement platforms"],
    cta: "Request a Demo",
  },
  smes: {
    hero: "We help small and growing businesses automate operations, build digital presence, and compete in an increasingly digital marketplace.",
    problems: ["Manual bookkeeping and invoicing", "No online presence or e-commerce", "Repetitive admin slowing growth", "Data scattered in spreadsheets"],
    solutions: ["Business automation & workflow tools", "Custom websites and mobile apps", "Inventory and sales management systems", "Affordable cloud-based ERP"],
    cta: "Get a Solution",
  },
  "financial-services": {
    hero: "We build secure, compliant technology for financial institutions — from mobile money integrations to fraud detection systems.",
    problems: ["Slow, manual loan processing", "No real-time transaction visibility", "Compliance and audit complexity", "Poor customer onboarding experience"],
    solutions: ["Loan management and arrears tracking", "M-Pesa and mobile money integrations", "Audit trail and compliance dashboards", "Customer portal and digital onboarding"],
    cta: "Talk to an Expert",
  },
  organizations: {
    hero: "We support NGOs, government agencies and enterprises in digitizing workflows, managing projects and improving organizational efficiency.",
    problems: ["Paper-based processes slowing operations", "Lack of performance tracking systems", "Siloed communication across teams", "No way to measure program impact"],
    solutions: ["Project and program management tools", "Digital forms and workflow automation", "Impact reporting dashboards", "Staff management and HR systems"],
    cta: "Discuss Your Project",
  },
};

export function IndustryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data, loading, notFound } = useApi<Industry | null>(slug ? `industries/${slug}/` : null);
  const { openModal } = useTalkModal();

  const knownContent = INDUSTRY_CONTENT[slug ?? ""];
  const content = knownContent ?? {
    hero: "We build tailored technology solutions for your industry.",
    problems: [], solutions: [], cta: "Talk to Florante",
  };

  if (loading) return <div className="flex min-h-screen items-center justify-center"><Spinner /></div>;

  // If API 404'd AND slug is not in our known list → show coming soon
  if (notFound && !knownContent)
    return <NotFoundDetail type="industry" indexPath="/" indexLabel="Back to home" slug={slug} />;

  const name = data?.name ?? slug?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) ?? "Industry";

  return (
    <>
      <section className="relative overflow-hidden bg-green-grad pt-28 pb-14 text-white sm:pt-36 sm:pb-20 md:py-36">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50" style={{ backgroundSize: "48px 48px" }} />
        <div className="pointer-events-none absolute inset-0 bg-industries-mesh" />
        <div className="container-narrow relative">
          <Reveal>
            <span className="eyebrow-dark">Industries → {name}</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-4 font-heading text-2xl font-bold tracking-tightest sm:mt-6 sm:text-5xl lg:text-6xl">
              Florante for{" "}
              <span className="text-gradient-bright">{name}</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-florante-100/90 sm:mt-6 sm:text-lg">{content.hero}</p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <button
                onClick={() => openModal({ need: name })}
                className="group relative inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 px-8 py-3.5 text-sm font-bold text-florante-950 shadow-[0_0_25px_rgba(52,211,153,0.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(52,211,153,0.55)] active:scale-95 sm:w-auto"
              >
                <span>{content.cta}</span>
                <IconArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <CTAButton to="/solutions" variant="secondary" className="w-full sm:w-auto !py-3.5 !px-8 hover:scale-[1.02] active:scale-95">
                Explore solutions
              </CTAButton>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <span className="eyebrow">The challenge</span>
              <h2 className="mt-4 font-heading text-2xl font-bold text-florante-800 md:text-3xl">Problems we solve for {name}</h2>
              <ul className="mt-6 space-y-4">
                {content.problems.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-gray-600">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-500 text-xs font-bold">✕</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="eyebrow">Our approach</span>
              <h2 className="mt-4 font-heading text-2xl font-bold text-florante-800 md:text-3xl">How Florante helps</h2>
              <ul className="mt-6 space-y-4">
                {content.solutions.map((s) => (
                  <li key={s} className="flex items-start gap-3 text-gray-600">
                    <IconCheck size={16} className="mt-0.5 shrink-0 text-accent-dark" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-green-grad py-16 text-center text-white">
        <div className="container-narrow">
          <h2 className="font-heading text-2xl font-bold md:text-3xl">Ready to modernize your {name.toLowerCase()} operations?</h2>
          <p className="mt-4 text-florante-100/70">Let's start with a conversation about your specific challenges.</p>
          <button onClick={() => openModal({ need: name })} className="mt-7 inline-flex items-center gap-2 rounded-full bg-accent-grad px-7 py-3.5 text-sm font-semibold text-florante-950 shadow-glow hover:brightness-105">
            {content.cta} <IconArrowRight size={15} />
          </button>
        </div>
      </section>
    </>
  );
}
