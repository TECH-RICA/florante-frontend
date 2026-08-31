import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { adminApi, clearAdminToken, isAdminAuthed } from "../../lib/adminApi";
import type { AdminUser } from "../../lib/adminTypes";

import {
  ADMIN_LOGIN,
  ADMIN_DASHBOARD,
  ADMIN_ANALYTICS,
  ADMIN_SITE,
  ADMIN_USERS,
  ADMIN_HELP,
  ADMIN_AUDIT,
  adminResourcePath,
} from "../../lib/adminPaths";
import {
  IconActivity,
  IconArrowUpRight,
  IconBook,
  IconBolt,
  IconChart,
  IconClose,
  IconCode,
  IconEye,
  IconGear,
  IconGlobe,
  IconLayers,
  IconLogout,
  IconMail,
  IconMenu,
  IconPin,
  IconQuote,
  IconRocket,
  IconSearch,
  IconShield,
  IconSparkles,
  IconUsers,
} from "../../components/icons";

interface NavItem {
  to: string;
  label: string;
  icon: React.ReactNode;
  hint?: string;   // public page this resource feeds
  end?: boolean;
}

const NAV_GROUPS: { title: string; items: NavItem[] }[] = [
  {
    title: "Overview",
    items: [
      { to: ADMIN_DASHBOARD, label: "Dashboard", icon: <IconChart />, end: true },
      { to: ADMIN_ANALYTICS, label: "Analytics", icon: <IconEye /> },
    ],
  },
  {
    title: "Pages — Main Content",
    items: [
      { to: adminResourcePath("solutions"),   label: "Solutions",   icon: <IconRocket />,    hint: "/solutions" },
      { to: adminResourcePath("products"),    label: "Products",    icon: <IconLayers />,    hint: "/products" },
      { to: adminResourcePath("industries"),  label: "Industries",  icon: <IconGlobe />,     hint: "/industries" },
      { to: adminResourcePath("articles"),    label: "Articles",    icon: <IconSparkles />,  hint: "/insights" },
      { to: adminResourcePath("case-studies"),label: "Case Studies", icon: <IconCode />,     hint: "/solutions" },
    ],
  },
  {
    title: "Pages — Social Proof",
    items: [
      { to: adminResourcePath("testimonials"), label: "Testimonials", icon: <IconQuote />,   hint: "Home & /about" },
      { to: adminResourcePath("team"),         label: "Team",         icon: <IconUsers />,   hint: "/about" },
      { to: adminResourcePath("universities"), label: "Universities", icon: <IconPin />,     hint: "/partners" },
      { to: adminResourcePath("faqs"),         label: "FAQs",         icon: <IconSearch />,  hint: "/contact & details" },
    ],
  },
  {
    title: "Engagement",
    items: [
      { to: adminResourcePath("leads"),      label: "Messages",    icon: <IconMail />,    hint: "Contact form" },
      { to: adminResourcePath("hackathons"), label: "Hackathons",   icon: <IconBolt />,    hint: "/labs" },
    ],
  },
  {
    title: "System",
    items: [
      { to: ADMIN_USERS, label: "Admin users", icon: <IconShield /> },
      { to: ADMIN_SITE,  label: "Site settings", icon: <IconGear /> },
      { to: ADMIN_AUDIT, label: "Audit trail",   icon: <IconActivity /> },
      { to: ADMIN_HELP,  label: "Help guide",    icon: <IconBook /> },
    ],
  },
];

function initials(user: AdminUser | null): string {
  if (!user) return "F";
  const name = `${user.first_name} ${user.last_name}`.trim();
  if (name.length > 0) {
    return name
      .split(/\s+/)
      .map((p) => p[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }
  return user.username.slice(0, 2).toUpperCase();
}

export function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isAdminAuthed()) {
      navigate(ADMIN_LOGIN, { replace: true });
      return;
    }
    adminApi
      .get<AdminUser>("/me/")
      .then((res) => setUser(res.data))
      .catch(() => {});
  }, [navigate]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // 10 minutes inactivity auto logout (600,000 ms)
  useEffect(() => {
    if (!isAdminAuthed()) return;

    let timer: ReturnType<typeof setTimeout>;

    const resetTimer = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        try {
          adminApi.post("/logout/");
        } catch {
          /* ignore */
        }
        clearAdminToken();
        navigate(`${ADMIN_LOGIN}?reason=timeout`, { replace: true });
      }, 10 * 60 * 1000);
    };

    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    events.forEach((evt) => window.addEventListener(evt, resetTimer, { passive: true }));
    resetTimer();

    return () => {
      if (timer) clearTimeout(timer);
      events.forEach((evt) => window.removeEventListener(evt, resetTimer));
    };
  }, [navigate]);

  async function handleLogout() {
    try {
      await adminApi.post("/logout/");
    } catch {
      /* ignore */
    }
    clearAdminToken();
    navigate(ADMIN_LOGIN, { replace: true });
  }

  if (!isAdminAuthed()) return null;

  const navLinkCls = ({ isActive }: { isActive: boolean }) =>
    `relative flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition before:absolute before:left-0 before:top-1/2 before:h-5 before:w-[3px] before:-translate-y-1/2 before:rounded-full before:bg-accent before:opacity-0 before:transition ${
      isActive
        ? "bg-white/10 text-white shadow-glow-sm before:opacity-100"
        : "text-white/65 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <div className="flex min-h-screen bg-moss/40">
      {/* Mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-between bg-green-grad px-4 py-3 lg:hidden">
        <span className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent-grad font-heading text-sm font-bold text-florante-950">
            F
          </span>
          <span className="font-heading text-sm font-bold tracking-[0.18em] text-white">
            FLORANTE
          </span>
        </span>
        <button
          onClick={() => setOpen((o) => !o)}
          className="rounded-lg p-1.5 text-white/80 hover:bg-white/10"
          aria-label="Toggle menu"
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 transform overflow-y-auto bg-green-grad transition-transform duration-200 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="relative flex h-full flex-col">
          <div
            className="pointer-events-none absolute inset-0 bg-grid-dark opacity-70"
            style={{ backgroundSize: "36px 36px" }}
          />
          <div className="pointer-events-none absolute inset-0 bg-radial-fade" />

          <div className="relative flex items-center gap-3 px-6 pb-2 pt-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-grad font-heading text-lg font-bold text-florante-950 shadow-glow-sm">
              F
            </span>
            <div>
              <p className="font-heading text-sm font-bold tracking-[0.22em] text-white">
                FLORANTE
              </p>
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-accent-soft/70">
                Control room
              </p>
            </div>
          </div>

          <div className="admin-rule mx-6 my-5" />

          <nav className="flex-1 px-4 pb-6">
            {NAV_GROUPS.map((group) => (
              <div key={group.title} className="mt-5 first:mt-0">
                <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40">
                  {group.title}
                </p>
                <div className="space-y-0.5">
                  {group.items.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.end}
                      className={navLinkCls}
                    >
                      <span
                        className={
                          item.to === location.pathname
                            ? "text-accent"
                            : "text-white/50"
                        }
                      >
                        {item.icon}
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block truncate">{item.label}</span>
                        {item.hint && (
                          <span className="block truncate text-[10px] text-white/30 font-normal leading-tight">
                            {item.hint}
                          </span>
                        )}
                      </span>
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <div className="border-t border-white/10 px-5 py-5">
            <NavLink
              to={ADMIN_USERS}
              className="flex items-center gap-3 rounded-xl p-1.5 transition hover:bg-white/10 group"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-grad font-heading text-sm font-bold text-florante-950">
                {initials(user)}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="truncate text-sm font-semibold text-white">
                    {user ? `${user.first_name || ""} ${user.last_name || ""}`.trim() || user.username : "Administrator"}
                  </p>
                  {user?.is_superuser && (
                    <span className="rounded-full bg-accent px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-florante-950 leading-none">
                      SU
                    </span>
                  )}
                </div>
                <p className="truncate text-xs text-white/50">
                  {user?.email || "View my profile →"}
                </p>
              </div>
            </NavLink>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/20"
              >
                View site <IconArrowUpRight size={14} />
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-500/80"
              >
                <IconLogout size={14} /> Logout
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <main className="min-w-0 flex-1 px-4 pb-16 pt-20 sm:px-6 sm:pt-20 lg:ml-72 lg:px-10 lg:pt-10">
        <Outlet />
      </main>
    </div>
  );
}
