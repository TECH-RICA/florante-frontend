import { Link } from "react-router-dom";
import { CTAButton } from "../components/CTAButton";
import { SectionHeading } from "../components/SectionHeading";
import { Reveal } from "../components/Reveal";
import { Spinner } from "../components/Spinner";
import { ErrorState } from "../components/ErrorState";
import { useApi } from "../hooks/useApi";
import { useTalkModal } from "../hooks/useTalkModal";
import type { Solution, Product, Testimonial } from "../lib/types";
import {
  IconArrowRight, IconBolt, IconShield, IconCode, IconChart, IconLayers,
  IconSparkles, IconGlobe, IconQuote, IconCheck, IconUsers, IconTarget,
  IconAward,
} from "../components/icons";
import { useRef, useEffect } from "react";

const capabilities = [
  { title: "AI & Machine Learning", Icon: IconSparkles },
  { title: "Cybersecurity", Icon: IconShield },
  { title: "Custom Software", Icon: IconCode },
  { title: "Digital Transformation", Icon: IconLayers },
  { title: "Data Engineering", Icon: IconChart },
  { title: "Automation", Icon: IconBolt },
];

const problems = [
  { title: "Automate Operations", text: "Replace repetitive manual work with intelligent automation that runs 24/7.", Icon: IconBolt },
  { title: "Build Digital Platforms", text: "Scalable web and mobile systems designed to grow with your organization.", Icon: IconCode },
  { title: "Protect Digital Assets", text: "Stronger cybersecurity and resilience against modern digital threats.", Icon: IconShield },
  { title: "Modernize the Enterprise", text: "Retire disconnected spreadsheets and silos in favour of connected systems.", Icon: IconLayers },
  { title: "Turn Data Into Decisions", text: "Use analytics and AI to surface the intelligence hiding inside your data.", Icon: IconChart },
];

const stats = [
  { value: "25+", label: "Projects delivered", Icon: IconTarget },
  { value: "12+", label: "Organizations served", Icon: IconUsers },
  { value: "5+", label: "Products deployed", Icon: IconAward },
  { value: "3", label: "Countries reached", Icon: IconGlobe },
];

const solutionIcons = [IconSparkles, IconShield, IconCode, IconLayers, IconChart, IconBolt];

export function Home() {
  const solutions = useApi<Solution[]>("solutions/");
  const products = useApi<Product[]>("products/");
  const testimonials = useApi<Testimonial[]>("testimonials/");
  const { openModal } = useTalkModal();

  const hasProducts = (products.data?.length ?? 0) > 0;
  const hasTestimonials = (testimonials.data?.length ?? 0) > 0;
  const showProducts = products.loading || products.error || hasProducts;
  const showTestimonials = testimonials.loading || testimonials.error || hasTestimonials;

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Autoplay was prevented:", error);
      });
    }
  }, []);

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-green-grad text-white" data-track-section="hero">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-60" style={{ backgroundSize: "48px 48px" }} />
        <div className="pointer-events-none absolute inset-0 bg-hero-mesh" />
        <div className="pointer-events-none absolute -left-40 top-10 h-[28rem] w-[28rem] animate-blob rounded-full bg-accent/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 animate-blob rounded-full bg-florante-400/20 blur-3xl [animation-delay:4s]" />

        {/* --- 1. VIDEO LAYER (Forced playback via ref) --- */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div
            className="absolute left-0 top-0 h-full w-full lg:w-[60%] opacity-90"
            style={{
              WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%)",
              maskImage: "linear-gradient(to right, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%)"
            }}
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
              onEnded={(e) => e.currentTarget.pause()}
            >
              <source src={`${import.meta.env.BASE_URL}hero-bg-cp.mp4`} type="video/mp4" />
            </video>
          </div>
        </div>

        <div className="container-page relative pt-28 pb-16 text-center sm:pt-36 sm:pb-24 md:pt-40 md:pb-32 lg:pt-44 lg:pb-36">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <span className="eyebrow-dark shadow-sm">
                <IconGlobe size={13} className="text-accent animate-pulse" />
                Built in Africa · Blooming Technology Designed to Scale Globally
              </span>
            </Reveal>
            <Reveal delay={90}>
              <h1 className="mx-auto mt-5 max-w-3xl font-heading text-3xl font-bold leading-[1.15] tracking-tightest sm:mt-6 sm:text-5xl lg:text-[4.2rem]">
                Intelligent & Blooming{" "}
                <span className="text-gradient-bright">Technology Built for</span>{" "}
                Africa's Digital Future
              </h1>
            </Reveal>
            <Reveal delay={180}>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-florante-100/90 sm:mt-6 sm:text-lg">
                Florante builds secure, blooming technology systems that help African businesses
                and institutions operate smarter, scale faster, and flourish globally.
              </p>
            </Reveal>
            <Reveal delay={270}>
              <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:mt-10 sm:flex-row sm:gap-4">
                <button
                  onClick={() => openModal()}
                  className="group relative inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 px-8 py-3.5 text-sm font-bold text-florante-950 shadow-[0_0_25px_rgba(52,211,153,0.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(52,211,153,0.55)] active:scale-95 sm:w-auto"
                >
                  <span>Talk to Florante</span>
                  <IconArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                <div className="w-full sm:w-auto">
                  <CTAButton to="/solutions" variant="secondary" className="w-full sm:w-auto !py-3.5 !px-8 hover:scale-[1.02] active:scale-95 shadow-sm">
                    Explore solutions
                  </CTAButton>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Capability pills */}
          <Reveal delay={450} className="mt-10 sm:mt-14">
            <div className="border-t border-white/10 pt-6 sm:pt-8">
              <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto pb-2 no-scrollbar sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0 sm:snap-none">
                {capabilities.map((c) => (
                  <span key={c.title} className="inline-flex shrink-0 snap-center items-center gap-2 whitespace-nowrap rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-florante-100 backdrop-blur sm:px-3.5 sm:py-2 sm:text-sm">
                    <c.Icon size={14} className="text-accent" />
                    {c.title}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── TRUST METRICS ── */}
      <section className="bg-white py-14 md:py-16" data-track-section="trust">
        <div className="container-page">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map(({ value, label, Icon }, i) => (
              <Reveal key={label} delay={i * 60}>
                <div className="stat-card text-center">
                  <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-florante-50 text-florante-700">
                    <Icon size={18} />
                  </span>
                  <p className="mt-3 font-heading text-3xl font-bold tracking-tight text-florante-800">{value}</p>
                  <p className="mt-1 text-sm text-gray-500">{label}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-gray-400 italic">* Verified figures · growing</p>
        </div>
      </section>

      {/* ── CUSTOMER PROBLEMS ── */}
      <section className="relative overflow-hidden bg-moss/60 py-16 md:py-24" data-track-section="what-we-solve">
        <div className="pointer-events-none absolute inset-0 bg-grid-light opacity-60" style={{ backgroundSize: "48px 48px" }} />
        <div className="container-page relative">
          <SectionHeading
            eyebrow="What we solve"
            title={<>Every challenge has a <span className="text-gradient">technology answer</span></>}
            subtitle="We lead with the problem, not the technology. Tell us what's broken — we'll show you the fix."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {problems.map(({ title, text, Icon }, i) => (
              <Reveal key={title} delay={i * 60}>
                <div className="group flex h-full gap-4 rounded-2xl border border-florante-100 bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-florante-200 hover:shadow-lift">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-florante-50 text-florante-700 transition-colors duration-300 group-hover:bg-green-grad group-hover:text-white">
                    <Icon size={20} />
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-bold text-florante-800">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-gray-500">{text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTIONS ── */}
      <section className="bg-white py-16 md:py-24" data-track-section="solutions">
        <div className="container-page">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Core solutions"
              title="Built for outcomes, not activities"
              subtitle="Five practice areas, each delivering measurable business results."
              className="mb-0"
            />
            <Link to="/solutions" className="group shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-florante-700 hover:text-florante-900">
              View all <IconArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {solutions.loading ? <Spinner label="Loading solutions…" /> :
            solutions.error ? <ErrorState message={solutions.error} onRetry={solutions.reload} /> : (
              <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:snap-none md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-3">
                {(solutions.data ?? []).map((s, i) => {
                  const Icon = solutionIcons[i % solutionIcons.length];
                  return (
                    <Reveal key={s.slug} delay={i * 50} className="w-[82%] shrink-0 snap-center md:w-auto">
                      <Link to={`/solutions/${s.slug}`} className="group relative flex h-full flex-col rounded-2xl border border-florante-100 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-florante-200 hover:shadow-lift">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-florante-50 text-florante-700 transition-colors duration-300 group-hover:bg-green-grad group-hover:text-white">
                          <Icon size={20} />
                        </span>
                        <h3 className="mt-5 font-heading text-lg font-bold text-florante-800">{s.title}</h3>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500">{s.short_description}</p>
                        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-florante-700 transition-colors group-hover:text-florante-900">
                          {s.cta_text || "Learn more"}
                          <IconArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </Link>
                    </Reveal>
                  );
                })}
              </div>
            )}
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      {showProducts && (
        <section className="relative overflow-hidden bg-florante-950 py-16 md:py-24 text-white" data-track-section="products">
          <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-40" style={{ backgroundSize: "48px 48px" }} />
          <div className="pointer-events-none absolute inset-0 bg-cta-mesh" />
          <div className="container-page relative">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <span className="eyebrow-dark">Ready to deploy</span>
                <h2 className="mt-3 font-heading text-3xl font-bold tracking-tightest text-white md:text-4xl">
                  Technology Ready to Deploy
                </h2>
                <p className="mt-3 max-w-xl text-florante-100/70">
                  Professionally built digital products you can deploy, customize and scale — without starting from scratch.
                </p>
              </div>
              <Link to="/products" className="group shrink-0 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/20">
                Browse all <IconArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {products.loading ? <Spinner label="Loading products…" /> :
              products.error ? <ErrorState message={products.error} onRetry={products.reload} /> : (
                <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:snap-none md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-3">
                  {(products.data ?? []).map((p, i) => (
                    <Reveal key={p.slug} delay={i * 50} className="w-[82%] shrink-0 snap-center md:w-auto">
                      <Link to={`/products/${p.slug}`} className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:bg-white/10">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-semibold uppercase tracking-widest text-accent/70">{p.category}</span>
                          <span className={`pill ${p.status === "available" ? "pill-green" : "bg-amber-900/40 text-amber-300"}`}>
                            {p.status.replace("_", " ")}
                          </span>
                        </div>
                        <h3 className="mt-4 font-heading text-lg font-bold text-white">{p.name}</h3>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">{p.short_description}</p>
                        {p.problem_solved && (
                          <p className="mt-3 text-xs text-white/40 italic line-clamp-2">{p.problem_solved}</p>
                        )}
                        <div className="mt-5 flex items-center justify-between">
                          <span className="font-heading text-sm font-bold text-accent">{p.pricing || "Custom quote"}</span>
                          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-white transition-colors group-hover:bg-accent group-hover:text-florante-950">
                            <IconArrowRight size={14} />
                          </span>
                        </div>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              )}
          </div>
        </section>
      )}

      {/* ── TESTIMONIALS ── */}
      {showTestimonials && (
        <section className="relative overflow-hidden bg-moss/60 py-16 md:py-24" data-track-section="testimonials">
          <div className="pointer-events-none absolute inset-0 bg-grid-light opacity-60" style={{ backgroundSize: "48px 48px" }} />
          <div className="container-page relative">
            <SectionHeading
              eyebrow="Client stories"
              title="Trusted by organizations that matter"
              subtitle="Real results from real partnerships across the continent."
            />
            {testimonials.loading ? <Spinner label="Loading…" /> :
              testimonials.error ? <ErrorState message={testimonials.error} onRetry={testimonials.reload} /> : (
                <div className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 lg:grid lg:snap-none lg:grid-cols-2 lg:overflow-visible lg:pb-0">
                  {(testimonials.data ?? []).map((t) => (
                    <Reveal key={t.id} className="w-[85%] shrink-0 snap-center sm:w-[60%] lg:w-auto">
                      <figure className="relative flex h-full flex-col rounded-2xl border border-florante-100 bg-white p-6 shadow-soft">
                        <IconQuote size={28} className="text-florante-200 shrink-0" />
                        <blockquote className="mt-4 flex-1 font-heading text-lg font-medium leading-relaxed tracking-tight text-florante-800">
                          "{t.quote}"
                        </blockquote>
                        <figcaption className="mt-6 flex items-center gap-3 border-t border-florante-50 pt-5">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-grad font-heading text-sm font-bold text-white">
                            {t.author.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-florante-900">{t.author}</p>
                            <p className="text-xs text-gray-400">{[t.role, t.company].filter(Boolean).join(" · ")}</p>
                          </div>
                        </figcaption>
                      </figure>
                    </Reveal>
                  ))}
                </div>
              )}
          </div>
        </section>
      )}

      {/* ── INDUSTRIES TEASER ── */}
      <section className="bg-white py-16 md:py-24" data-track-section="industries">
        <div className="container-page">
          <SectionHeading
            eyebrow="Industries we serve"
            title={<>Technology built for <span className="text-gradient">your sector</span></>}
            subtitle="We understand that different industries have different needs. Here's how we serve yours."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Education", slug: "education", desc: "Platforms for universities & institutions", color: "bg-indigo-50 text-indigo-600 border-indigo-100" },
              { label: "SMEs", slug: "smes", desc: "Affordable systems for growing businesses", color: "bg-sky-50 text-sky-600 border-sky-100" },
              { label: "Financial Services", slug: "financial-services", desc: "Secure fintech & compliance technology", color: "bg-amber-50 text-amber-600 border-amber-100" },
              { label: "Organizations", slug: "organizations", desc: "Enterprise & NGO digital transformation", color: "bg-violet-50 text-violet-600 border-violet-100" },
            ].map(({ label, slug, desc, color }, i) => (
              <Reveal key={slug} delay={i * 60}>
                <Link to={`/industries/${slug}`} className={`group flex flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${color}`}>
                  <h3 className="font-heading text-lg font-bold">{label}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed opacity-80">{desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">
                    Explore <IconArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSIGHTS TEASER ── */}
      <section className="relative bg-moss/40 py-16 md:py-20" data-track-section="insights">
        <div className="container-page">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Insights"
              title="African tech, our perspective"
              subtitle="Articles, research and case studies from the Florante team."
              className="mb-0"
            />
            <Link to="/insights" className="group shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-florante-700 hover:text-florante-900">
              All articles <IconArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="relative overflow-hidden py-20 md:py-24" data-track-section="cta-band">
        <div className="container-page">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] bg-green-grad px-8 py-16 text-center text-white shadow-lift md:px-16">
              <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-60" style={{ backgroundSize: "44px 44px" }} />
              <div className="pointer-events-none absolute inset-0 bg-cta-mesh" />
              <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 animate-blob rounded-full bg-accent/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 animate-blob rounded-full bg-florante-400/30 blur-3xl [animation-delay:5s]" />

              <div className="relative mx-auto max-w-2xl">
                <span className="eyebrow-dark mb-4">Start a conversation</span>
                <h2 className="mt-4 font-heading text-3xl font-bold leading-tight tracking-tightest sm:text-4xl md:text-[2.75rem]">
                  Let's build what your organization needs next
                </h2>
                <p className="mt-5 text-lg text-florante-100/75">
                  A 30-minute conversation is enough to start. Tell us your challenge — we'll show you the path forward.
                </p>
                <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={() => openModal()}
                    className="group inline-flex items-center gap-2 rounded-full bg-accent-grad px-7 py-3.5 text-sm font-semibold text-florante-950 shadow-glow transition-all hover:brightness-105"
                  >
                    Talk to Florante <IconArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                  </button>
                  <CTAButton to="/contact" variant="secondary" className="border-white/40 bg-white/10 text-white hover:bg-white/20">
                    Send a message
                  </CTAButton>
                </div>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-florante-100/60">
                  {["No commitment required", "Response within 24 hours", "Free initial consultation"].map((t) => (
                    <span key={t} className="flex items-center gap-2">
                      <IconCheck size={13} className="text-accent" /> {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}