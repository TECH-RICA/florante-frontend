import { Reveal } from "../components/Reveal";
import { CTAButton } from "../components/CTAButton";
import { IconBriefcase, IconCheck, IconArrowRight, IconUsers, IconStar, IconMapPin } from "../components/icons";

const openRoles = [
  {
    title: "Full Stack Developer",
    type: "Full-time",
    location: "Nairobi / Remote",
    dept: "Engineering",
    desc: "Build and maintain our core products and client platforms using Django, React and modern tooling.",
    skills: ["Django", "React / TypeScript", "PostgreSQL", "REST APIs"],
  },
  {
    title: "UI / UX Designer",
    type: "Full-time",
    location: "Nairobi",
    dept: "Design",
    desc: "Design beautiful, user-centric interfaces for our products and client projects.",
    skills: ["Figma", "Design Systems", "Prototyping", "User Research"],
  },
  {
    title: "Cybersecurity Analyst",
    type: "Full-time",
    location: "Nairobi",
    dept: "Security",
    desc: "Help our clients and internal systems stay secure through audits, monitoring and incident response.",
    skills: ["Penetration Testing", "SIEM", "Network Security", "Compliance"],
  },
];

const perks = [
  "Competitive KES salary + equity discussion",
  "Flexible / remote-friendly culture",
  "Learning & development budget",
  "Work on real African tech problems",
  "Collaborative, small-team environment",
  "Health cover",
];

export function Careers() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-green-grad pt-28 pb-14 text-white sm:pt-36 sm:pb-20 md:py-36">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50" style={{ backgroundSize: "48px 48px" }} />
        <div className="pointer-events-none absolute inset-0 bg-hero-mesh" />
        <div className="container-narrow relative text-center">
          <Reveal>
            <span className="eyebrow-dark">
              <IconBriefcase size={13} className="text-accent" /> Careers at Florante
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mx-auto mt-4 max-w-3xl font-heading text-2xl font-bold tracking-tightest sm:mt-6 sm:text-5xl lg:text-6xl">
              Build Africa's{" "}
              <span className="text-gradient-bright">Digital Future</span>{" "}
              With Us
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-florante-100/90 sm:mt-5 sm:text-lg">
              We're a small, ambitious team building serious technology for African businesses and institutions.
              If you want your work to matter, you're in the right place.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Why Florante */}
      <section className="bg-white py-16 md:py-20">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="eyebrow">Why Florante</span>
              <h2 className="mt-4 font-heading text-3xl font-bold text-florante-800 md:text-4xl">
                Small team. Big impact.
              </h2>
              <p className="mt-4 leading-relaxed text-gray-600">
                At Florante, you won't be a cog in a machine. Every person on the team has direct impact
                on products that real African organizations depend on every day. We move fast, learn together,
                and care about the quality of our work.
              </p>
              <ul className="mt-6 grid grid-cols-2 gap-3">
                {perks.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <IconCheck size={14} className="mt-0.5 shrink-0 text-accent-dark" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid gap-4">
              {[
                { Icon: IconStar, title: "Mission-driven",  desc: "We exist to advance African technology — not just to ship features." },
                { Icon: IconUsers,title: "Team-first",      desc: "Every hire matters. We invest in growth, feedback and culture." },
                { Icon: IconMapPin,title: "Kenya-based",    desc: "Headquartered in Kirinyaga, working with clients across the continent." },
              ].map(({ Icon, title, desc }) => (
                <div key={title} className="flex gap-4 rounded-2xl border border-florante-100 bg-florante-50/50 p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-florante-100 text-florante-700">
                    <Icon size={18} />
                  </span>
                  <div>
                    <p className="font-heading text-sm font-bold text-florante-800">{title}</p>
                    <p className="mt-1 text-sm text-gray-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="bg-moss/50 py-16 md:py-20">
        <div className="container-page">
          <span className="eyebrow">Open positions</span>
          <h2 className="mt-4 font-heading text-2xl font-bold text-florante-800 md:text-3xl">Join the team</h2>
          <div className="mt-8 space-y-4">
            {openRoles.map((role, i) => (
              <Reveal key={role.title} delay={i * 60}>
                <div className="group rounded-2xl border border-florante-100 bg-white p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="pill pill-green">{role.dept}</span>
                        <span className="pill bg-florante-50 text-florante-600">{role.type}</span>
                      </div>
                      <h3 className="mt-2 font-heading text-xl font-bold text-florante-800">{role.title}</h3>
                      <p className="mt-0.5 flex items-center gap-1.5 text-sm text-gray-400">
                        <IconMapPin size={13} /> {role.location}
                      </p>
                    </div>
                    <CTAButton to="/contact" withArrow className="shrink-0">Apply now</CTAButton>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-gray-600">{role.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {role.skills.map((s) => (
                      <span key={s} className="rounded-lg border border-florante-100 bg-florante-50 px-3 py-1 text-xs font-medium text-florante-700">{s}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Spontaneous application */}
      <section className="bg-white py-16 text-center">
        <div className="container-narrow">
          <h2 className="font-heading text-2xl font-bold text-florante-800">Don't see a fit?</h2>
          <p className="mt-4 text-gray-500">We always want to hear from exceptional people. Send us your CV and tell us how you'd contribute.</p>
          <a
            href="mailto:florantej@gmail.com?subject=Spontaneous%20Application%20-%20Florante"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-florante-700 px-7 py-3.5 text-sm font-semibold text-white shadow-soft hover:bg-florante-800 hover:shadow-glow"
          >
            Send your CV <IconArrowRight size={15} />
          </a>
        </div>
      </section>
    </>
  );
}
