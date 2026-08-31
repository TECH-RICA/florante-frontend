import { Link } from "react-router-dom";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { CTAButton } from "../components/CTAButton";
import { useApi } from "../hooks/useApi";
import { Spinner } from "../components/Spinner";
import type { Industry } from "../lib/types";
import { IconGradCap, IconBriefcase, IconBuilding, IconUsers, IconArrowRight } from "../components/icons";

const icons: Record<string, React.ReactNode> = {
  education: <IconGradCap size={22} />,
  smes: <IconBriefcase size={22} />,
  "financial-services": <IconBuilding size={22} />,
  organizations: <IconUsers size={22} />,
};
const colors: string[] = [
  "from-indigo-500/20 to-indigo-500/5 border-indigo-200 text-indigo-600",
  "from-sky-500/20 to-sky-500/5 border-sky-200 text-sky-600",
  "from-amber-500/20 to-amber-500/5 border-amber-200 text-amber-600",
  "from-violet-500/20 to-violet-500/5 border-violet-200 text-violet-600",
];

const fallbackIndustries = [
  { id: 1, slug: "education",         name: "Education",          short_description: "Digital platforms for universities, colleges and schools.", description: "", image: null, icon: "", products_count: 0 },
  { id: 2, slug: "smes",              name: "SMEs",               short_description: "Affordable, scalable tech for growing businesses.",          description: "", image: null, icon: "", products_count: 0 },
  { id: 3, slug: "financial-services",name: "Financial Services", short_description: "Secure fintech, compliance and payment systems.",             description: "", image: null, icon: "", products_count: 0 },
  { id: 4, slug: "organizations",     name: "Organizations",      short_description: "Enterprise & NGO digital transformation.",                    description: "", image: null, icon: "", products_count: 0 },
] as Industry[];

export function Industries() {
  const { data, loading } = useApi<Industry[]>("industries/");
  const list = data && data.length > 0 ? data : fallbackIndustries;

  return (
    <>
      <section className="relative overflow-hidden bg-green-grad pt-28 pb-14 text-white sm:pt-36 sm:pb-20 md:py-36">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50" style={{ backgroundSize: "48px 48px" }} />
        <div className="pointer-events-none absolute inset-0 bg-industries-mesh" />
        <div className="container-page relative text-center">
          <Reveal><span className="eyebrow-dark">Industries we serve</span></Reveal>
          <Reveal delay={80}>
            <h1 className="mx-auto mt-4 max-w-3xl font-heading text-2xl font-bold tracking-tightest sm:mt-6 sm:text-5xl lg:text-6xl">
              Technology Built for{" "}
              <span className="text-gradient-bright">Your Industry</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-florante-100/90 sm:mt-5 sm:text-lg">
              We understand that different industries face different problems. We build solutions specific to your sector's challenges, regulations, and opportunities.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Our sectors"
            title="Who we work with"
            subtitle="From universities to SMEs — we bring deep sector knowledge to every engagement."
          />
          {loading ? <Spinner label="Loading…" /> : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {list.map((ind, i) => (
                <Reveal key={ind.slug} delay={i * 70}>
                  <Link
                    to={`/industries/${ind.slug}`}
                    className={`group flex flex-col rounded-2xl border bg-gradient-to-br p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${colors[i % colors.length]}`}
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/60 backdrop-blur">
                      {icons[ind.slug] ?? <IconBuilding size={22} />}
                    </span>
                    <h2 className="mt-5 font-heading text-2xl font-bold text-florante-900">{ind.name}</h2>
                    <p className="mt-2 flex-1 leading-relaxed text-florante-700/80">{ind.short_description}</p>
                    {ind.products_count > 0 && (
                      <span className="mt-3 text-xs font-semibold text-florante-500">{ind.products_count} products available</span>
                    )}
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-florante-800 transition-colors group-hover:text-florante-950">
                      Explore solutions <IconArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-moss/50 py-16">
        <div className="container-narrow text-center">
          <h2 className="font-heading text-2xl font-bold text-florante-800 md:text-3xl">Don't see your industry?</h2>
          <p className="mt-4 text-gray-600">We work across many sectors. Tell us about your organization and we'll show you how we can help.</p>
          <CTAButton to="/contact" className="mt-7" withArrow>Talk to us</CTAButton>
        </div>
      </section>
    </>
  );
}
