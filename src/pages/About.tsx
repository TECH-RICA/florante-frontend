import { SectionHeading } from "../components/SectionHeading";
import { Reveal } from "../components/Reveal";
import { Spinner } from "../components/Spinner";
import { CTAButton } from "../components/CTAButton";
import { useApi } from "../hooks/useApi";
import type { TeamMember, SiteConfig } from "../lib/types";
import {
  IconArrowUpRight,
  IconBolt,
  IconShield,
  IconCode,
  IconGlobe,
  IconLinkedIn,
  IconTwitter,
  IconGitHub,
} from "../components/icons";

const values = [
  {
    Icon: IconCode,
    title: "Engineering excellence",
    text: "We sweat the details — clean code, rigorous testing and systems built to last.",
  },
  {
    Icon: IconBolt,
    title: "Speed with substance",
    text: "We move fast without cutting corners, because your time is money.",
  },
  {
    Icon: IconShield,
    title: "Security first",
    text: "Every system we ship is hardened, monitored and built to protect your data.",
  },
  {
    Icon: IconGlobe,
    title: "African first",
    text: "Solutions designed for African realities — infrastructure, context and cost.",
  },
];

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function TeamCard({ m }: { m: TeamMember }) {
  const socials: { href: string; label: string; Icon: typeof IconLinkedIn }[] = [
    ...(m.linkedin ? [{ href: m.linkedin, label: "LinkedIn", Icon: IconLinkedIn }] : []),
    ...(m.twitter ? [{ href: m.twitter, label: "X", Icon: IconTwitter }] : []),
    ...(m.github ? [{ href: m.github, label: "GitHub", Icon: IconGitHub }] : []),
  ];

  return (
    <div className="group flex h-full flex-col items-center rounded-[1.75rem] border border-florante-100 bg-white p-8 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-florante-200 hover:shadow-lift">
      <span className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-green-grad shadow-lift ring-4 ring-florante-50">
        {m.image ? (
          <img
            src={m.image}
            alt={m.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <span className="font-heading text-4xl font-bold text-white/80">{initials(m.name)}</span>
        )}
      </span>
      <h3 className="mt-5 font-heading text-xl font-bold text-florante-800">{m.name}</h3>
      <p className="mt-0.5 text-xs font-semibold uppercase tracking-widest text-florante-600">
        {m.role}
      </p>
      {m.bio && (
        <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600">{m.bio}</p>
      )}
      <div className="mt-6 flex w-full items-center justify-between gap-3 border-t border-florante-100 pt-5">
        {m.portfolio_url ? (
          <a
            href={m.portfolio_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${m.name}'s portfolio`}
            className="inline-flex items-center gap-1.5 rounded-full bg-green-grad px-4 py-2 text-xs font-semibold text-white shadow-soft transition hover:shadow-glow"
          >
            View portfolio <IconArrowUpRight size={13} />
          </a>
        ) : (
          <span className="text-xs font-semibold text-florante-400">Florante team</span>
        )}
        {socials.length > 0 && (
          <div className="flex items-center gap-1.5">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${m.name} on ${s.label}`}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-florante-50 text-florante-700 transition-colors hover:bg-florante-700 hover:text-white"
              >
                <s.Icon size={15} />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import { DEFAULT_TEAM } from "../data/defaults";

export function About() {
  const team = useApi<TeamMember[]>("team/");
  const site = useApi<SiteConfig>("site/");
  const teamList = (team.data && team.data.length > 0) ? team.data : DEFAULT_TEAM;

  return (
    <div>
      <section className="relative overflow-hidden bg-green-grad pt-24 pb-14 text-white sm:pt-32 sm:pb-20 md:py-32" data-track-section="hero">
        <div
          className="pointer-events-none absolute inset-0 bg-grid-dark opacity-70"
          style={{ backgroundSize: "48px 48px" }}
        />
        <div className="pointer-events-none absolute inset-0 bg-hero-mesh" />
        <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 animate-blob rounded-full bg-accent/15 blur-3xl" />
        <div className="container-page relative max-w-4xl text-center">
          <Reveal>
            <span className="eyebrow-dark">About Florante</span>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-4 font-heading text-2xl font-bold leading-tight tracking-tightest sm:mt-6 sm:text-5xl md:text-6xl">
              African technology, built to <span className="text-gradient-bright">scale globally</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-florante-100/90 sm:mt-6 sm:text-lg">
              {site.data?.description ||
                "Florante Tech Limited helps African organizations solve complex business problems through intelligent, secure technology — from AI and automation to cybersecurity and software engineering."}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-20 md:py-28">
        <div className="container-page">
          <SectionHeading
            index="01"
            eyebrow="What we stand for"
            title="The principles behind every project"
            subtitle="Four values shape how we design, build and partner with our clients."
          />
          <div className="editorial-list mt-12 grid gap-x-14 lg:grid-cols-2">
            {values.map(({ Icon, title, text }, i) => (
              <Reveal key={title}>
                <div className="border-b border-florante-100 py-8 lg:border-b-0">
                  <div className="flex items-start gap-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-florante-50 text-florante-700">
                      <Icon size={22} />
                    </span>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-florante-800">{title}</h3>
                      <p className="mt-1.5 max-w-md text-[15px] leading-relaxed text-gray-600">{text}</p>
                    </div>
                    <span className="ml-auto font-mono text-sm font-bold text-florante-300">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-moss/60 py-20 md:py-28" data-track-section="team">
        <div
          className="pointer-events-none absolute inset-0 bg-grid-light opacity-50"
          style={{ backgroundSize: "48px 48px" }}
        />
        <div className="container-page relative">
          <SectionHeading
            index="02"
            eyebrow="The people"
            title="Meet the team behind the work"
            subtitle="Engineers, designers and strategists committed to African excellence."
          />

          {team.loading && !team.data ? (
            <Spinner label="Loading team..." />
          ) : (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {teamList.map((m, i) => (
                <Reveal key={m.id} delay={i * 60}>
                  <TeamCard m={m} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-white py-20 md:py-24" data-track-section="cta-band">
        <div className="container-page">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] bg-green-grad px-8 py-16 text-center text-white shadow-lift md:px-16">
              <div
                className="pointer-events-none absolute inset-0 bg-grid-dark opacity-60"
                style={{ backgroundSize: "44px 44px" }}
              />
              <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 animate-blob rounded-full bg-accent/20 blur-3xl" />
              <div className="relative mx-auto max-w-2xl">
                <h2 className="font-heading text-3xl font-bold leading-tight tracking-tightest sm:text-4xl">
                  Ready to build with us?
                </h2>
                <p className="mt-5 text-lg text-florante-100/80">
                  Whether it's a product, a platform or a transformation — we'd love to hear about it.
                </p>
                <div className="mt-9">
                  <CTAButton to="/contact" variant="white" withArrow>
                    Talk to Florante
                  </CTAButton>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}