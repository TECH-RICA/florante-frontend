import { useParams, Link } from "react-router-dom";
import { CTAButton } from "../components/CTAButton";
import { SectionHeading } from "../components/SectionHeading";
import { Reveal } from "../components/Reveal";
import { Spinner } from "../components/Spinner";
import { NotFoundDetail } from "../components/NotFoundDetail";
import { useApi } from "../hooks/useApi";
import type { Solution } from "../lib/types";
import {
  IconArrowRight,
  IconCheck,
  IconChevronRight,
} from "../components/icons";

function OpenList({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null;
  return (
    <div className="border-t border-florante-100 pt-8">
      <div className="flex items-baseline gap-3">
        <h3 className="font-heading text-lg font-bold text-florante-800">{title}</h3>
        <span className="font-mono text-xs font-bold text-florante-300">
          {String(items.length).padStart(2, "0")}
        </span>
      </div>
      <div className="mt-5 grid gap-x-12 gap-y-3.5 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-dark">
              <IconCheck size={12} />
            </span>
            <span className="text-sm leading-snug text-gray-600">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useTalkModal } from "../hooks/useTalkModal";
import { DEFAULT_SOLUTIONS_MAP } from "../data/defaults";

export function SolutionDetail() {
  const { slug } = useParams();
  const { data: apiData, loading, notFound } = useApi<Solution>(`solutions/${slug}/`);
  const { openModal } = useTalkModal();

  // API data takes priority; defaults are the crafted content fallback.
  // Only show Coming Soon when slug is truly unknown (not in defaults AND API 404'd).
  const defaultData = slug ? DEFAULT_SOLUTIONS_MAP[slug] : null;
  const s = apiData || defaultData;

  if (loading && !s) return <Spinner label="Loading solution..." />;
  if (!s || (notFound && !defaultData))
    return <NotFoundDetail type="solution" indexPath="/solutions" indexLabel="Browse solutions" slug={slug} />;

  const process = [
    { step: "01", title: "Discover", text: "We map your current operations and identify the real bottleneck." },
    { step: "02", title: "Design", text: "A tailored roadmap with clear scope, timeline and measurable outcomes." },
    { step: "03", title: "Deliver", text: "Agile build sprints with full transparency and QA at every step." },
    { step: "04", title: "Grow", text: "Training, support and iteration so the solution scales with you." },
  ];

  return (
    <div>
      <section className="relative overflow-hidden bg-green-grad pt-28 pb-14 text-white sm:pt-36 sm:pb-20 md:py-32" data-track-section="hero">
        <div
          className="pointer-events-none absolute inset-0 bg-grid-dark opacity-70"
          style={{ backgroundSize: "48px 48px" }}
        />
        <div className="pointer-events-none absolute inset-0 bg-hero-mesh" />
        <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 animate-blob rounded-full bg-accent/15 blur-3xl" />
        <div className="container-page relative">
          <nav className="flex flex-wrap items-center gap-2 text-xs font-medium text-florante-100/85">
            <Link to="/" className="transition-colors hover:text-white">Home</Link>
            <IconChevronRight size={13} />
            <Link to="/solutions" className="transition-colors hover:text-white">Solutions</Link>
            <IconChevronRight size={13} />
            <span className="text-accent-soft">{s.title}</span>
          </nav>
          <Reveal>
            <h1 className="mt-4 max-w-3xl font-heading text-2xl font-bold leading-tight tracking-tightest sm:mt-6 sm:text-5xl md:text-6xl">
              {s.title}
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-florante-100/90 sm:mt-6 sm:text-lg">
              {s.hero_text || s.short_description}
            </p>
          </Reveal>
          <Reveal delay={180}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <button
                onClick={() => openModal({ need: s.title })}
                className="group relative inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 px-8 py-3.5 text-sm font-bold text-florante-950 shadow-[0_0_25px_rgba(52,211,153,0.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(52,211,153,0.55)] active:scale-95 sm:w-auto"
              >
                <span>{s.cta_text}</span>
                <IconArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <CTAButton href="https://wa.me/254770428297" variant="secondary" className="w-full sm:w-auto !py-3.5 !px-8 hover:scale-[1.02] active:scale-95">
                Talk on WhatsApp
              </CTAButton>
            </div>
          </Reveal>
        </div>
      </section>

      {s.problem && (
        <section className="relative overflow-hidden bg-white py-20 md:py-24" data-track-section="problem">
          <div className="container-page grid gap-14 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <div>
              <SectionHeading
                align="left"
                index="P"
                eyebrow="The problem"
                title={<>What holds organizations back</>}
              />
              <Reveal>
                <p className="mt-6 max-w-xl whitespace-pre-line text-base leading-relaxed text-gray-600">
                  {s.problem}
                </p>
              </Reveal>
            </div>
            <Reveal delay={120}>
              <div className="border-l-2 border-accent pl-6 pt-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-florante-600">
                  Our approach
                </p>
                <p className="mt-4 whitespace-pre-line text-[15px] leading-relaxed text-gray-700">
                  {s.approach}
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section className="relative overflow-hidden bg-moss/60 py-20 md:py-24" data-track-section="approach">
        <div
          className="pointer-events-none absolute inset-0 bg-grid-light opacity-50"
          style={{ backgroundSize: "48px 48px" }}
        />
        <div className="container-page relative">
          <SectionHeading
            index="W"
            eyebrow="How we work"
            title="A proven path from problem to outcome"
            subtitle="A structured engagement with complete transparency at every stage."
          />
          <div className="mt-16 grid gap-x-10 gap-y-12 border-t border-florante-100 pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 90}>
                <div className="group">
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-5xl font-bold text-florante-900/[0.12] transition-colors group-hover:text-accent">
                      {p.step}
                    </span>
                    <span className="h-px w-12 bg-gradient-to-r from-accent to-transparent" />
                  </div>
                  <h3 className="mt-5 font-heading text-lg font-bold text-florante-800">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-20 md:py-24" data-track-section="faqs-and-cta">
        <div className="container-page grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-12">
            <Reveal>
              <OpenList title="Capabilities" items={s.capabilities} />
            </Reveal>
            <Reveal>
              <OpenList title="Use cases" items={s.use_cases} />
            </Reveal>
            <Reveal>
              <OpenList title="Benefits" items={s.benefits} />
            </Reveal>

            {!!s.technologies?.length && (
              <Reveal>
                <div className="border-t border-florante-100 pt-8">
                  <h3 className="font-heading text-lg font-bold text-florante-800">Technologies</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {s.technologies.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-florante-100 px-3.5 py-1.5 text-xs font-medium text-florante-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            {!!s.faqs?.length && (
              <Reveal>
                <div className="border-t border-florante-100 pt-8">
                  <h3 className="font-heading text-lg font-bold text-florante-800">FAQs</h3>
                  <div className="mt-4">
                    {s.faqs.map((f) => (
                      <details key={f.question} className="group border-b border-florante-100 py-4">
                        <summary className="cursor-pointer list-none text-sm font-semibold text-florante-800">
                          <span className="flex items-center justify-between gap-3">
                            {f.question}
                            <IconChevronRight size={15} className="shrink-0 text-florante-400 transition-transform duration-300 group-open:rotate-90" />
                          </span>
                        </summary>
                        <p className="mt-3 text-sm leading-relaxed text-gray-600">{f.answer}</p>
                      </details>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Reveal>
              <div className="relative overflow-hidden rounded-[2rem] bg-green-grad p-8 text-white shadow-lift">
                <div
                  className="pointer-events-none absolute inset-0 bg-grid-dark opacity-60"
                  style={{ backgroundSize: "36px 36px" }}
                />
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/20 blur-2xl" />
                <div className="relative">
                  <span className="eyebrow-dark">Next step</span>
                  <h3 className="mt-5 font-heading text-xl font-bold">Ready to start?</h3>
                  <p className="mt-2 text-sm text-florante-100/80">
                    Talk to our team about how {s.title} can help your organization.
                  </p>
                  <button
                    onClick={() => openModal({ need: s.title })}
                    className="group mt-6 inline-flex items-center gap-2 rounded-full bg-accent-grad px-5 py-2.5 text-sm font-semibold text-florante-950 shadow-glow-sm transition-all hover:brightness-105"
                  >
                    {s.cta_text}
                    <IconArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="editorial-list mt-10">
                <div className="border-b border-florante-100 py-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-florante-500">
                    What you get
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {[
                      "Dedicated engagement team",
                      "Transparent progress reporting",
                      "Security & QA at every sprint",
                    ].map((text) => (
                      <li key={text} className="flex items-center gap-3 text-sm text-gray-600">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </div>
  );
}