import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  IconClose, IconMenu, IconArrowRight,
  IconSparkles, IconShield, IconCode, IconLayers, IconChart,
  IconGlobe, IconUsers, IconBuilding, IconGradCap,
  IconFlask, IconBriefcase, IconSearch
} from "./icons";
import { useTalkModal } from "../hooks/useTalkModal";
import { useSearchModal } from "../hooks/useSearchModal";

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  desc?: string;
}

interface NavGroup {
  label: string;
  href?: string;
  children?: { heading?: string; items: NavItem[] }[];
  single?: boolean;
}

const SOLUTIONS: NavItem[] = [
  { label: "AI & Automation",        href: "/solutions/ai-automation",        icon: <IconSparkles size={18} />, desc: "Intelligent systems that automate and predict" },
  { label: "Cybersecurity",          href: "/solutions/cybersecurity",         icon: <IconShield size={18} />,   desc: "Protect systems, applications and data" },
  { label: "Software Engineering",   href: "/solutions/software-engineering",  icon: <IconCode size={18} />,     desc: "Scalable web, mobile & enterprise platforms" },
  { label: "Digital Transformation", href: "/solutions/digital-transformation",icon: <IconLayers size={18} />,   desc: "Modernize workflows and connected operations" },
  { label: "Data & Intelligence",    href: "/solutions/data-intelligence",     icon: <IconChart size={18} />,    desc: "Turn data into actionable business insights" },
];

const INDUSTRIES: NavItem[] = [
  { label: "Education",          href: "/industries/education",         icon: <IconGradCap size={18} />,  desc: "Platforms for universities & schools" },
  { label: "SMEs",               href: "/industries/smes",              icon: <IconBriefcase size={18} />,desc: "Affordable tech for small businesses" },
  { label: "Financial Services", href: "/industries/financial-services",icon: <IconBuilding size={18} />, desc: "Secure fintech & compliance systems" },
  { label: "Organizations",      href: "/industries/organizations",     icon: <IconUsers size={18} />,    desc: "Enterprise & NGO digital systems" },
];

const COMPANY: NavItem[] = [
  { label: "About Florante", href: "/about",    icon: <IconGlobe size={18} />,    desc: "Our story, mission and team" },
  { label: "Florante Labs",  href: "/labs",     icon: <IconFlask size={18} />,    desc: "Hackathons, experiments and open projects" },
  { label: "Careers",        href: "/careers",  icon: <IconBriefcase size={18} />,desc: "Join the Florante team" },
  { label: "Partners",       href: "/partners", icon: <IconUsers size={18} />,    desc: "Institutions we work with" },
];

const NAV_GROUPS: NavGroup[] = [
  {
    label: "Home",
    href:  "/",
    single: true,
  },
  {
    label: "Solutions",
    href:  "/solutions",
    children: [{ heading: "What we build", items: SOLUTIONS }],
  },
  {
    label: "Products",
    href:  "/products",
    single: true,
  },
  {
    label: "Industries",
    href:  "/industries",
    children: [{ heading: "Who we serve", items: INDUSTRIES }],
  },
  {
    label: "Insights",
    href:  "/insights",
    single: true,
  },
  {
    label: "Company",
    children: [{ heading: "Our company", items: COMPANY }],
  },
];

function MegaMenu({ group, onClose }: { group: NavGroup; onClose: () => void }) {
  if (!group.children) return null;
  return (
    <div className="animate-slide-down absolute left-1/2 top-full z-50 mt-2 w-[580px] max-w-[calc(100vw-2rem)] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-florante-900/95 shadow-mega backdrop-blur-xl">
      <div className="absolute inset-0 bg-grid-dark opacity-30 pointer-events-none" style={{ backgroundSize: "32px 32px" }} />
      <div className="relative p-4">
        {group.children.map((section) => (
          <div key={section.heading ?? "items"}>
            {section.heading && (
              <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-white/40">
                {section.heading}
              </p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={onClose}
                  className="mega-item group"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/8 text-accent transition-colors group-hover:bg-accent/20">
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{item.label}</p>
                    {item.desc && (
                      <p className="mt-0.5 text-xs leading-snug text-white/50">{item.desc}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
        {group.href && (
          <div className="mt-3 border-t border-white/8 pt-3 px-3">
            <Link
              to={group.href}
              onClick={onClose}
              className="group inline-flex items-center gap-2 text-xs font-semibold text-accent hover:text-accent-soft transition-colors"
            >
              View all {group.label.toLowerCase()}
              <IconArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export function Navbar() {
  const [open, setOpen]           = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const location = useLocation();
  const menuTimeout = useRef<ReturnType<typeof setTimeout>>(null);
  const { openModal } = useTalkModal();
  const { openSearch } = useSearchModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    setOpen(false);
    setActiveMenu(null);
  }, [location.pathname]);

  const handleMouseEnter = (label: string) => {
    if (menuTimeout.current) clearTimeout(menuTimeout.current);
    setActiveMenu(label);
  };
  const handleMouseLeave = () => {
    menuTimeout.current = setTimeout(() => setActiveMenu(null), 120);
  };

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-shadow duration-300 ${scrolled ? "bg-florante-950/95 shadow-[0_4px_24px_rgba(8,31,17,0.45)] backdrop-blur-xl" : "bg-green-grad"}`}>
        <div className="absolute inset-x-0 bottom-0 h-px">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        </div>

        <nav className="container-page flex h-[4.5rem] items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-2.5 shrink-0">
            <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-white/10 backdrop-blur">
              <svg width="20" height="20" viewBox="0 0 48 48" fill="none" className="text-accent">
                <path d="M13 31V20.5L24 14l11 6.5V31l-11 6.5L13 31Z" stroke="currentColor" strokeWidth="3.4" strokeLinejoin="round" />
                <path d="M13 20.5L24 27l11-6.5M24 27v10.5"            stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="font-heading text-lg font-bold tracking-tight text-white">
              Florante<span className="text-accent">.</span>
              <span className="hidden text-sm font-medium text-white/60 sm:inline"> Tech</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {NAV_GROUPS.map((group) => (
              <li
                key={group.label}
                className="relative"
                onMouseEnter={() => group.children && handleMouseEnter(group.label)}
                onMouseLeave={handleMouseLeave}
              >
                {group.single || !group.children ? (
                  <NavLink
                    to={group.href!}
                    end={false}
                    className={({ isActive }) =>
                      `group relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        isActive ? "text-white" : "text-white/75 hover:text-white"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {group.label}
                        <span className={`absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-accent to-florante-400 transition-all duration-300 ${isActive ? "opacity-100" : "opacity-0"}`} />
                      </>
                    )}
                  </NavLink>
                ) : (
                  <button
                    className={`group relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      activeMenu === group.label ? "text-white" : "text-white/75 hover:text-white"
                    }`}
                    onClick={() => setActiveMenu(activeMenu === group.label ? null : group.label)}
                  >
                    {group.label}
                    <svg width="11" height="11" viewBox="0 0 12 12" className={`mt-0.5 transition-transform duration-200 ${activeMenu === group.label ? "rotate-180" : ""}`}>
                      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                    <span className={`absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-accent to-florante-400 transition-all duration-300 ${activeMenu === group.label ? "opacity-100" : "opacity-0"}`} />
                  </button>
                )}
                {group.children && activeMenu === group.label && (
                  <MegaMenu group={group} onClose={() => setActiveMenu(null)} />
                )}
              </li>
            ))}
          </ul>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <button
              onClick={openSearch}
              className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white/85 hover:bg-white/20 transition"
              title="Search website (Ctrl+K)"
            >
              <IconSearch size={14} className="text-accent" />
              <span>Search</span>
              <kbd className="hidden rounded bg-white/20 px-1 py-0.5 text-[10px] sm:inline">Ctrl K</kbd>
            </button>

            <Link
              to="/contact"
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              Contact
            </Link>
            <button
              onClick={() => openModal()}
              className="group inline-flex items-center gap-2 rounded-full bg-accent-grad px-5 py-2.5 text-sm font-semibold text-florante-950 shadow-glow-sm transition-all duration-300 hover:brightness-105 hover:shadow-glow"
            >
              Talk to Florante
              <IconArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={openSearch}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
              aria-label="Search"
            >
              <IconSearch size={18} />
            </button>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <IconClose size={20} /> : <IconMenu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile drawer */}
        {open && (
          <div className="fixed inset-0 top-[4.5rem] z-50 border-t border-white/10 bg-[#06190e] lg:hidden overflow-y-auto">
            <div className="container-page py-6 min-h-[calc(100vh-4.5rem)] flex flex-col justify-between">
              <div className="space-y-1">
                {NAV_GROUPS.map((group) => (
                  <div key={group.label} className="border-b border-white/10 last:border-0">
                    {group.children ? (
                      <>
                        <button
                          onClick={() => setMobileGroup(mobileGroup === group.label ? null : group.label)}
                          className="flex w-full items-center justify-between py-3.5 text-base font-semibold text-white"
                        >
                          {group.label}
                          <svg width="14" height="14" viewBox="0 0 12 12" className={`transition-transform duration-200 ${mobileGroup === group.label ? "rotate-180" : ""}`}>
                            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                          </svg>
                        </button>
                        {mobileGroup === group.label && (
                          <div className="mb-4 space-y-1 pl-2">
                            {group.children.flatMap((s) => s.items).map((item) => (
                              <Link
                                key={item.href}
                                to={item.href}
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-3 rounded-xl px-3 py-2.5 bg-white/5 transition-colors hover:bg-white/15"
                              >
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
                                  {item.icon}
                                </span>
                                <span className="text-sm font-medium text-white">{item.label}</span>
                              </Link>
                            ))}
                            {group.href && (
                              <Link
                                to={group.href}
                                onClick={() => setOpen(false)}
                                className="mt-2 flex items-center gap-2 px-3 py-2 text-xs font-semibold text-accent"
                              >
                                View all {group.label.toLowerCase()} <IconArrowRight size={12} />
                              </Link>
                            )}
                          </div>
                        )}
                      </>
                    ) : (
                      <NavLink
                        to={group.href!}
                        end={false}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          `block py-3.5 text-base font-semibold transition-colors ${isActive ? "text-accent" : "text-white"}`
                        }
                      >
                        {group.label}
                      </NavLink>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 pb-8 pt-4 border-t border-white/10">
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="block rounded-full border border-white/25 bg-white/5 px-5 py-3.5 text-center text-sm font-semibold text-white hover:bg-white/15 transition"
                >
                  Contact
                </Link>
                <button
                  onClick={() => { openModal(); setOpen(false); }}
                  className="block rounded-full bg-accent-grad px-5 py-3.5 text-center text-sm font-semibold text-florante-950 shadow-glow-sm transition hover:brightness-105"
                >
                  Talk to Florante →
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}