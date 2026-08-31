import { Reveal } from "../components/Reveal";
import { CTAButton } from "../components/CTAButton";
import { useApi } from "../hooks/useApi";
import { Spinner } from "../components/Spinner";
import type { Hackathon } from "../lib/types";
import { IconFlask, IconCheck, IconRocket, IconSparkles, IconUsers, IconBolt, IconCode } from "../components/icons";

const experiments = [
  { title: "AI Chatbot Framework", desc: "Open-source conversational AI scaffolding for African languages and dialects.", tag: "Open Source", Icon: IconSparkles },
  { title: "M-Pesa SDK",           desc: "Developer-friendly wrapper for M-Pesa API integrations in modern stacks.",      tag: "Dev Tool",    Icon: IconCode },
  { title: "Edge Analytics",        desc: "Lightweight analytics pipeline designed for low-bandwidth African networks.",    tag: "Research",    Icon: IconBolt },
];

export function Labs() {
  const hackathons = useApi<Hackathon[]>("hackathons/");

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-green-grad pt-28 pb-14 text-white sm:pt-36 sm:pb-20 md:py-36">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50" style={{ backgroundSize: "48px 48px" }} />
        <div className="pointer-events-none absolute inset-0 bg-labs-mesh" />
        <div className="pointer-events-none absolute -left-32 top-8 h-80 w-80 animate-blob rounded-full bg-violet-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 animate-blob rounded-full bg-accent/20 blur-3xl [animation-delay:5s]" />
        <div className="container-page relative text-center">
          <Reveal>
            <span className="eyebrow-dark">
              <IconFlask size={13} className="text-accent" /> Florante Labs
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mx-auto mt-4 max-w-3xl font-heading text-2xl font-bold tracking-tightest sm:mt-6 sm:text-5xl lg:text-6xl">
              Where We Experiment,{" "}
              <span className="text-gradient-bright">Build and Innovate</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-florante-100/90 sm:mt-6 sm:text-lg">
              Florante Labs is our innovation arm — where we run hackathons, build open tools,
              and experiment with ideas that push African technology forward.
            </p>
          </Reveal>
        </div>
      </section>

      {/* What is Labs */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="eyebrow">What we do</span>
              <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-florante-800 md:text-4xl">
                Experiments that become products
              </h2>
              <p className="mt-4 leading-relaxed text-gray-600">
                Not every idea makes it to production — but every experiment teaches us something.
                Florante Labs is where curiosity meets engineering discipline.
              </p>
              <ul className="mt-6 space-y-3">
                {["Hackathons for students and developers", "Open-source tools for African developers", "Research into AI for local languages", "Pilot projects with universities and NGOs"].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-600">
                    <IconCheck size={16} className="mt-0.5 shrink-0 text-accent-dark" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Hackathons run",       value: "3+",  Icon: IconRocket },
                { label: "Participants",          value: "500+",Icon: IconUsers },
                { label: "Open-source projects",  value: "5+",  Icon: IconCode },
                { label: "University partners",   value: "8+",  Icon: IconFlask },
              ].map(({ label, value, Icon }) => (
                <div key={label} className="stat-card text-center">
                  <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                    <Icon size={18} />
                  </span>
                  <p className="mt-3 font-heading text-2xl font-bold text-florante-800">{value}</p>
                  <p className="mt-1 text-xs text-gray-500">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experiments */}
      <section className="bg-moss/50 py-16 md:py-20">
        <div className="container-page">
          <span className="eyebrow">Current experiments</span>
          <h2 className="mt-4 font-heading text-2xl font-bold text-florante-800 md:text-3xl">
            What we're building
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {experiments.map(({ title, desc, tag, Icon }, i) => (
              <Reveal key={title} delay={i * 70}>
                <div className="flex h-full flex-col rounded-2xl border border-florante-100 bg-white p-6 shadow-soft">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                    <Icon size={20} />
                  </span>
                  <span className="mt-3 pill pill-violet self-start">{tag}</span>
                  <h3 className="mt-3 font-heading text-base font-bold text-florante-800">{title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Hackathons */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-page">
          <span className="eyebrow">Hackathons</span>
          <h2 className="mt-4 font-heading text-2xl font-bold text-florante-800 md:text-3xl">
            Competitions & Events
          </h2>
          {hackathons.loading ? <Spinner label="Loading…" /> :
           hackathons.error   ? <p className="mt-6 text-gray-400 text-sm">Events coming soon.</p> :
           (hackathons.data?.length ?? 0) === 0 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-florante-200 bg-florante-50/60 p-12 text-center">
              <IconRocket size={36} className="mx-auto text-florante-300" />
              <h3 className="mt-4 font-heading text-xl font-bold text-florante-700">Next hackathon coming soon</h3>
              <p className="mt-2 text-sm text-gray-500">We host regular events for students and developers across Kenya. Join the waitlist to be notified.</p>
              <CTAButton to="/contact" className="mt-6" withArrow>Get notified</CTAButton>
            </div>
          ) : (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {hackathons.data!.map((h) => (
                <div key={h.id} className="flex flex-col rounded-2xl border border-florante-100 bg-white p-6 shadow-soft">
                  <span className={`pill self-start ${h.status === "open" ? "pill-green" : h.status === "upcoming" ? "pill-sky" : "bg-gray-100 text-gray-500"}`}>
                    {h.status}
                  </span>
                  <h3 className="mt-3 font-heading text-lg font-bold text-florante-800">{h.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-gray-500">{h.tagline}</p>
                  {h.participants_count > 0 && (
                    <p className="mt-4 text-xs font-semibold text-florante-500">{h.participants_count} participants</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-grad py-16 text-white">
        <div className="container-page text-center">
          <h2 className="font-heading text-2xl font-bold md:text-3xl">Got a project idea or want to collaborate?</h2>
          <p className="mx-auto mt-4 max-w-md text-florante-100/70">We work with universities, developers, and innovators. Let's build something interesting together.</p>
          <CTAButton to="/contact" variant="lime" withArrow className="mt-7">
            Get in touch
          </CTAButton>
        </div>
      </section>
    </>
  );
}
