import { Reveal } from "../components/Reveal";
import { CTAButton } from "../components/CTAButton";
import { useApi } from "../hooks/useApi";

import type { University } from "../lib/types";
import { IconHeartHandshake, IconGlobe, IconUsers, IconAward, IconArrowRight } from "../components/icons";

const partnerTypes = [
  { Icon: IconGlobe,          title: "Technology Partners",  desc: "Cloud providers, software vendors and technology companies who extend our capabilities." },
  { Icon: IconUsers,          title: "Academic Partners",    desc: "Universities and research institutions collaborating on innovation and talent development." },
  { Icon: IconHeartHandshake, title: "Implementation Partners", desc: "Organizations we work with to deliver projects across East Africa and beyond." },
  { Icon: IconAward,          title: "Community Partners",   desc: "NGOs and government bodies aligned on digital inclusion and transformation in Africa." },
];

import { DEFAULT_UNIVERSITIES } from "../data/defaults";

export function Partners() {
  const universities = useApi<University[]>("universities/");
  const uniList = (universities.data && universities.data.length > 0) ? universities.data : DEFAULT_UNIVERSITIES;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-green-grad pt-28 pb-14 text-white sm:pt-36 sm:pb-20 md:py-36">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50" style={{ backgroundSize: "48px 48px" }} />
        <div className="pointer-events-none absolute inset-0 bg-hero-mesh" />
        <div className="container-narrow relative text-center">
          <Reveal>
            <span className="eyebrow-dark">
              <IconHeartHandshake size={13} className="text-accent" /> Partners
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mx-auto mt-4 max-w-3xl font-heading text-2xl font-bold tracking-tightest sm:mt-6 sm:text-5xl lg:text-6xl">
              Better Together —{" "}
              <span className="text-gradient-bright">Our Partners</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-florante-100/90 sm:mt-5 sm:text-lg">
              We believe in the power of collaboration. Florante works with universities, technology companies,
              NGOs and institutions to build a stronger African technology ecosystem.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Partner types */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-page">
          <span className="eyebrow">How we partner</span>
          <h2 className="mt-4 font-heading text-2xl font-bold text-florante-800 md:text-3xl">Types of partnerships</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {partnerTypes.map(({ Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 60}>
                <div className="flex h-full flex-col rounded-2xl border border-florante-100 bg-white p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-florante-50 text-florante-700">
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-4 font-heading text-base font-bold text-florante-800">{title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* University partners */}
      <section className="bg-moss/50 py-16 md:py-20">
        <div className="container-page">
          <span className="eyebrow">Academic network</span>
          <h2 className="mt-4 font-heading text-2xl font-bold text-florante-800 md:text-3xl">Universities we work with</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {uniList.map((u) => (
              <div key={u.id} className="rounded-xl border border-florante-100 bg-white p-4 shadow-soft">
                <p className="font-heading text-sm font-bold text-florante-800">{u.name}</p>
                {u.county && <p className="mt-1 text-xs text-gray-400">{u.county}, Kenya</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a partner */}
      <section className="bg-white py-16 md:py-20">
        <div className="container-narrow">
          <div className="rounded-[2.5rem] border border-florante-100 bg-florante-50/60 p-10 text-center md:p-14">
            <span className="eyebrow">Interested?</span>
            <h2 className="mt-4 font-heading text-2xl font-bold text-florante-800 md:text-3xl">
              Become a Florante Partner
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-gray-600 leading-relaxed">
              Whether you're a technology vendor, university, NGO or government body — we'd love to explore
              how we can work together to advance African technology.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-4">
              <CTAButton to="/contact" withArrow>Get in touch</CTAButton>
              <a href="mailto:florantej@gmail.com" className="inline-flex items-center gap-2 rounded-full border border-florante-200 px-6 py-3 text-sm font-medium text-florante-700 hover:bg-florante-100">
                Email us <IconArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
