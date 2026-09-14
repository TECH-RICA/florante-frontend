import { Link } from "react-router-dom";
import { IconArrowRight, IconMail, IconWhatsApp, IconLinkedIn, IconTwitter, IconGitHub, IconMapPin } from "./icons";
import faviconLogo from "/favicon.svg";

const columns = [
  {
    title: "Solutions",
    links: [
      { label: "AI & Automation", href: "/solutions/ai-automation" },
      { label: "Cybersecurity", href: "/solutions/cybersecurity" },
      { label: "Software Engineering", href: "/solutions/software-engineering" },
      { label: "Digital Transformation", href: "/solutions/digital-transformation" },
      { label: "Data & Intelligence", href: "/solutions/data-intelligence" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Education", href: "/industries/education" },
      { label: "SMEs", href: "/industries/smes" },
      { label: "Financial Services", href: "/industries/financial-services" },
      { label: "Organizations", href: "/industries/organizations" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Products", href: "/products" },
      { label: "Florante Labs", href: "/labs" },
      { label: "Careers", href: "/careers" },
      { label: "Partners", href: "/partners" },
      { label: "Insights", href: "/insights" },
    ],
  },
];

const socials = [
  { label: "WhatsApp", href: "https://wa.me/254770428297", Icon: IconWhatsApp },
  { label: "LinkedIn", href: "#", Icon: IconLinkedIn },
  { label: "Twitter", href: "#", Icon: IconTwitter },
  { label: "GitHub", href: "#", Icon: IconGitHub },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-green-grad text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50" style={{ backgroundSize: "44px 44px" }} />
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-accent/8 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-florante-500/15 blur-3xl" />

      <div className="container-page relative">
        <div className="grid grid-cols-2 gap-8 border-b border-white/10 py-12 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1.2fr] lg:gap-12 lg:py-16">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/60 backdrop-blur">
                <img
                  src={faviconLogo}
                  alt=""
                  className="h-full w-full transition-transform group-hover:scale-105"
                />
              </span>
              <span className="font-heading text-lg font-bold">
                Florante<span className="text-accent">.</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-florante-100/80">
              Intelligent, blooming technology built for African organizations to operate smarter, scale faster and compete globally.
            </p>
            <div className="mt-5 flex gap-2.5">
              {socials.map(({ label, href, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-florante-100/70 transition-all hover:border-accent/50 hover:bg-accent/10 hover:text-accent">
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <ul className="mt-5 space-y-2 text-sm text-florante-100/80">
              <li>
                <a href="mailto:florantej@gmail.com" className="flex items-center gap-2.5 transition-colors hover:text-white">
                  <IconMail size={14} className="text-accent" /> florantej@gmail.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/254770428297" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 transition-colors hover:text-white">
                  <IconWhatsApp size={14} className="text-accent" /> +254 770 428 297
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-florante-100/60">
                <IconMapPin size={14} className="mt-0.5 shrink-0 text-accent" /> Kirinyaga, Kenya
              </li>
            </ul>
          </div>

          {/* Nav columns */}
          {columns.map((col) => (
            <div key={col.title} className="col-span-1">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-accent-soft/80">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.href} className="text-sm text-florante-100/75 transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* CTA */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-1">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-accent-soft/80">Start a project</h4>
            <p className="mt-4 text-sm leading-relaxed text-florante-100/70">
              Tell us what you're building. We'll show you the fastest way to make it real.
            </p>
            <Link to="/contact" className="group mt-4 inline-flex items-center gap-2 rounded-full bg-accent-grad px-5 py-2.5 text-sm font-semibold text-florante-950 shadow-glow-sm transition-all hover:brightness-105">
              Get in touch
              <IconArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        <div className="relative flex flex-col items-center justify-between gap-4 py-7 sm:flex-row">
          <p className="text-xs text-florante-100/50">© {new Date().getFullYear()} Florante Tech Limited. All rights reserved.</p>
          <p className="text-xs text-florante-100/40">Built in Africa · Designed to scale globally</p>
        </div>
      </div>

      <span className="pointer-events-none absolute -bottom-8 left-1/2 hidden -translate-x-1/2 select-none whitespace-nowrap font-heading text-[16vw] font-bold leading-none text-white/[0.025] lg:block">
        FLORANTE
      </span>
    </footer>
  );
}