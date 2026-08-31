import { Link } from "react-router-dom";
import { SectionHeading } from "../components/SectionHeading";
import { Reveal } from "../components/Reveal";
import { Spinner } from "../components/Spinner";
import { ErrorState } from "../components/ErrorState";
import { useApi } from "../hooks/useApi";
import type { Solution, CaseStudy } from "../lib/types";
import { IconArrowRight, IconSparkles, IconShield, IconCode, IconLayers, IconChart, IconGear } from "../components/icons";

import { DEFAULT_SOLUTIONS, DEFAULT_CASE_STUDIES } from "../data/defaults";

const icons = [
  <IconSparkles key="sparkles" size={22} />,
  <IconShield key="shield" size={22} />,
  <IconCode key="code" size={22} />,
  <IconLayers key="layers" size={22} />,
  <IconChart key="chart" size={22} />,
  <IconGear key="gear" size={22} />,
];

export function Solutions() {
  const { data, loading, error, reload } = useApi<Solution[]>("solutions/");
  const list = (data && data.length > 0) ? data : DEFAULT_SOLUTIONS;

  return (
    <div>
      <section className="relative overflow-hidden border-b border-florante-100 bg-moss/60 py-12 sm:py-16 md:py-24" data-track-section="hero">
        <div
          className="pointer-events-none absolute inset-0 bg-grid-light opacity-60"
          style={{ backgroundSize: "48px 48px" }}
        />
        <div className="pointer-events-none absolute -right-32 -top-24 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
        <div className="container-page relative">
          <SectionHeading
            index="I"
            eyebrow="Solutions"
            title="Outcomes, not activities"
            subtitle="We sell results. Explore how we apply intelligent, secure technology to real business problems — then let's talk about yours."
          />
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-16 md:py-24" data-track-section="all-solutions">
        <div className="container-page">
          <span className="pointer-events-none absolute right-6 top-16 hidden select-none font-heading text-[11rem] font-bold leading-none text-florante-900/[0.04] lg:block">
            I
          </span>
          {loading ? (
            <Spinner label="Loading solutions..." />
          ) : error ? (
            <ErrorState message={error} onRetry={reload} />
          ) : (
            <div className="editorial-list">
              {list.map((s, i) => (
                <Reveal key={s.slug}>
                  <Link to={`/solutions/${s.slug}`} className="group editorial-link">
                    <span className="editorial-num">{String(i + 1).padStart(2, "0")}</span>
                    <div className="md:flex md:items-baseline md:gap-6">
                      <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-florante-50 text-florante-700 transition-colors group-hover:bg-green-grad group-hover:text-white md:flex">
                        {icons[i % icons.length]}
                      </span>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <h2 className="font-heading text-xl font-bold text-florante-800 md:text-2xl">
                            {s.title}
                          </h2>
                          {s.category && (
                            <span className="text-xs font-semibold uppercase tracking-widest text-florante-500">
                              {s.category.replaceAll("_", " ")}
                            </span>
                          )}
                        </div>
                        <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-gray-600">
                          {s.short_description}
                        </p>
                        {s.capabilities?.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                            {s.capabilities.slice(0, 4).map((c) => (
                              <span key={c} className="text-xs text-florante-600">
                                {c}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <span className="editorial-arrow self-start md:self-center">
                      <span className="hidden text-xs font-semibold uppercase tracking-widest md:inline">
                        {s.cta_text}
                      </span>
                      <IconArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Case Studies Section */}
      <CaseStudiesSection />
    </div>
  );
}

function CaseStudiesSection() {
  const { data } = useApi<CaseStudy[]>("case-studies/");
  const caseStudies = (data && data.length > 0) ? data : DEFAULT_CASE_STUDIES;

  return (
    <section className="bg-florante-950 py-20 text-white md:py-28" data-track-section="case-studies">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow-dark">Proven Impact</span>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
            Client Success & Case Studies
          </h2>
          <p className="mt-3 text-base text-florante-100/70">
            Real deployments demonstrating how our engineering and AI solutions drive measurable business outcomes.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {caseStudies.map((cs, i) => (
            <Reveal key={cs.id} delay={i * 100}>
              <div className="flex h-full flex-col justify-between rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition duration-300 hover:border-accent/30 hover:bg-white/10">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-accent">
                    <span>{cs.industry}</span>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-white/80">{cs.client}</span>
                  </div>
                  <h3 className="mt-4 font-heading text-xl font-bold text-white md:text-2xl">
                    {cs.title}
                  </h3>
                  <p className="mt-3 text-sm text-florante-100/70 leading-relaxed">
                    <strong className="text-white">Challenge:</strong> {cs.challenge}
                  </p>
                  <p className="mt-2 text-sm text-florante-100/70 leading-relaxed">
                    <strong className="text-accent">Solution:</strong> {cs.solution}
                  </p>
                  <div className="mt-4 rounded-xl border border-green-500/20 bg-green-500/10 p-3.5 text-xs font-semibold text-green-300">
                    <strong>Result:</strong> {cs.result}
                  </div>
                </div>

                {cs.client_quote && (
                  <blockquote className="mt-6 border-t border-white/10 pt-4 text-xs italic text-florante-100/60">
                    "{cs.client_quote}"
                    <cite className="mt-1 block font-semibold not-italic text-white/80">
                      — {cs.client_quote_author}
                    </cite>
                  </blockquote>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}