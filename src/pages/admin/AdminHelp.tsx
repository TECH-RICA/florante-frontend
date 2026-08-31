import { IconArrowUpRight, IconBook, IconCheck, IconSparkles } from "../../components/icons";

interface GuideSection {
  id: string;
  index: string;
  title: string;
  intro: string;
  rows?: { label: string; text: string; page?: string }[];
  bullets?: string[];
  tips?: { title: string; text: string }[];
}

const PAGES: GuideSection = {
  id: "pages",
  index: "01",
  title: "The website at a glance",
  intro:
    "This guide explains what every page of the public website expects, and where each piece of content comes from. Everything you manage here in the control room appears on the live site.",
  rows: [
    {
      label: "Home",
      page: "/",
      text: "Hero, eight core disciplines, 'What we solve', Core solutions (from Solutions), Ready to deploy (from Products), and Client stories (from Testimonials).",
    },
    {
      label: "Solutions",
      page: "/solutions",
      text: "Lists every published Solution and individual Solution pages, plus the featured Client Success & Case Studies section.",
    },
    {
      label: "Products",
      page: "/products",
      text: "Searchable catalog of published Products with filters. Each product links to a full page with features, benefits, pricing, and FAQs.",
    },
    {
      label: "Insights",
      page: "/insights",
      text: "Featured article plus published Articles catalog. Each article opens its own reading page with CTA.",
    },
    {
      label: "Partners",
      page: "/partners",
      text: "Shows University partner network (from Universities) and partner alignment programs.",
    },
    {
      label: "About",
      page: "/about",
      text: "Company story, core values, and Team roster (from Team). Each member shows a portrait photo and a Portfolio link.",
    },
    {
      label: "Contact",
      page: "/contact",
      text: "Contact form (creates a Lead/Message in control room), WhatsApp direct link, FAQs list (from FAQs), and Site Settings details.",
    },
  ],
};

const RESOURCES: GuideSection = {
  id: "resources",
  index: "02",
  title: "Managing content",
  intro:
    "Each item in the sidebar feeds specific sections of the website. Open any resource to search, edit, create or delete records. Fields marked * are required.",
  rows: [
    {
      label: "Solutions",
      page: "/solutions",
      text: "Power the Solutions page and home 'Core solutions'. Add title, category, short description, problem/approach, capabilities, and CTA text.",
    },
    {
      label: "Products",
      page: "/products",
      text: "Power the Products catalog and home 'Ready to deploy'. Choose status (Draft/Beta/Available/Coming soon), set pricing, features, and publish.",
    },
    {
      label: "Articles",
      page: "/insights",
      text: "Power the Insights articles page. Toggle 'Featured' for the primary story and 'Published' to make it live.",
    },
    {
      label: "Case Studies",
      page: "/solutions",
      text: "Power the 'Client Success & Case Studies' section on the Solutions page (Challenge, Solution, Result, and Client Quotes).",
    },
    {
      label: "Industries",
      page: "/industries",
      text: "Industry sectors used to organize Products and Case Studies.",
    },
    {
      label: "Testimonials",
      page: "Home & /about",
      text: "Power 'Client stories' on the Home page and testimonials on Product detail pages.",
    },
    {
      label: "Universities",
      page: "/partners",
      text: "Power the Academic Network partner list on the Partners page.",
    },
    {
      label: "Team",
      page: "/about",
      text: "Power the About page team roster. Upload photos, write bios, and add member Portfolio links.",
    },
    {
      label: "FAQs",
      page: "/contact & details",
      text: "General and category-specific questions shown on Contact and Product detail pages.",
    },
    {
      label: "Messages",
      page: "Control Room",
      text: "Created automatically when visitors submit the website contact form or demo requests.",
    },
    {
      label: "Hackathons",
      page: "/labs",
      text: "Innovation events with rules, prizes, schedule, and sponsor lists.",
    },
  ],
};

const USER_GOVERNANCE: GuideSection = {
  id: "user-governance",
  index: "03",
  title: "Admin users & access control",
  intro:
    "System administrators control website content and access. Manage staff accounts from Admin Users (/sanctum/control/users).",
  bullets: [
    "Registering Admins: Admins can register new staff accounts by providing Full Name, Email Address, and Password.",
    "Deactivation: Deactivating an admin sets their active status to off and immediately revokes their active login tokens.",
    "Permanent Deletion: Deleting an admin permanently removes their account from the system after confirmation.",
    "Superuser Protection: Superuser accounts are protected from deactivation or deletion to prevent administrative lockout.",
    "Self-Protection: You cannot deactivate or delete your own active account while logged in.",
    "Profile Inspection: Click any admin card or 'My Profile' in the sidebar to view complete account details and login timestamps.",
  ],
};

const CHECKLIST: GuideSection = {
  id: "checklist",
  index: "04",
  title: "Publishing checklist",
  intro: "Before content appears on the live site, make sure of the following:",
  bullets: [
    "The Published / is_published checkbox is turned on.",
    "Products also need a status — use Available to show them as ready.",
    "Slugs can be left blank; they generate automatically. If set manually, use lowercase with dashes.",
    "Empty sections display graceful fallback views until new content is added.",
    "Changes go live immediately when you click Save Changes.",
  ],
};

const FILES: GuideSection = {
  id: "files",
  index: "05",
  title: "Images & files",
  intro: "How images are handled across the platform:",
  rows: [
    {
      label: "Upload",
      text: "Team portraits can be uploaded directly in the editor with 'Upload photo'. Files are stored securely on the server.",
    },
    {
      label: "Paste a URL",
      text: "Product images, screenshots, and article featured images accept web image URLs.",
    },
  ],
};

const SETTINGS: GuideSection = {
  id: "settings",
  index: "06",
  title: "Site settings",
  intro: "Global configuration applied across all pages:",
  bullets: [
    "Brand — site name, tagline, and description used for SEO and metadata.",
    "Contact — primary/secondary email, phone, WhatsApp, address, and city shown on the Contact page.",
    "Social — LinkedIn, GitHub, Twitter, and Facebook links used in footers and navigation.",
  ],
};

const ANALYTICS: GuideSection = {
  id: "analytics",
  index: "07",
  title: "Analytics & tracking",
  intro:
    "The Analytics page tracks visitor sessions, dwell time per section, scroll depth (25%, 50%, 75%, 100%), CTA button clicks, and active online visitors in real time.",
};

const TIPS: GuideSection = {
  id: "tips",
  index: "08",
  title: "Quick tips",
  intro: "Best practices for maintaining the website:",
  tips: [
    {
      title: "Search before you edit",
      text: "Use the search box on every resource page to quickly locate records.",
    },
    {
      title: "Deletes are permanent",
      text: "Deleting a record cannot be undone. To temporarily hide content, uncheck Published instead.",
    },
    {
      title: "Preview live changes",
      text: "Click 'View site' in the bottom sidebar to inspect your published changes on the public website.",
    },
    {
      title: "Superuser security",
      text: "Always keep at least one active Superuser account with a strong password.",
    },
  ],
};

const SECTIONS: GuideSection[] = [PAGES, RESOURCES, USER_GOVERNANCE, CHECKLIST, FILES, SETTINGS, ANALYTICS, TIPS];

function GuideSectionBlock({ section }: { section: GuideSection }) {
  return (
    <div
      id={section.id}
      className="admin-corners relative scroll-mt-24 rounded-[2rem] border border-florante-100 bg-white p-6 shadow-card sm:p-8"
    >
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-grad font-heading text-sm font-bold text-white">
          {section.index}
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="font-heading text-xl font-bold tracking-tight text-florante-900">
            {section.title}
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{section.intro}</p>
        </div>
      </div>

      {section.rows && (
        <div className="mt-6 space-y-4">
          {section.rows.map((r) => (
            <div
              key={r.label}
              className="grid gap-1.5 border-t border-florante-100 pt-4 sm:grid-cols-[11rem_1fr] sm:gap-4"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-heading text-sm font-bold text-florante-800">{r.label}</span>
                {r.page && (
                  <span className="rounded-full bg-moss/60 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-florante-700">
                    {r.page}
                  </span>
                )}
              </div>
              <p className="text-sm leading-relaxed text-gray-600">{r.text}</p>
            </div>
          ))}
        </div>
      )}

      {section.bullets && (
        <ul className="mt-6 space-y-2.5 border-t border-florante-100 pt-5">
          {section.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2.5 text-sm leading-relaxed text-gray-700">
              <IconCheck size={16} className="mt-0.5 shrink-0 text-accent-dark" />
              {b}
            </li>
          ))}
        </ul>
      )}

      {section.tips && (
        <div className="mt-6 grid gap-3 border-t border-florante-100 pt-5 sm:grid-cols-2">
          {section.tips.map((t) => (
            <div key={t.title} className="rounded-2xl bg-moss/50 p-4">
              <p className="flex items-center gap-1.5 text-sm font-bold text-florante-900">
                <IconSparkles size={14} className="text-accent-dark" />
                {t.title}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-gray-600">{t.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function AdminHelp() {
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-[2rem] bg-green-grad shadow-lift">
        <div
          className="pointer-events-none absolute inset-0 bg-grid-dark opacity-70"
          style={{ backgroundSize: "40px 40px" }}
        />
        <div className="pointer-events-none absolute inset-0 bg-hero-mesh" />
        <span className="pointer-events-none absolute -right-2 -top-10 select-none font-heading text-[10rem] font-bold leading-none text-white/[0.06]">
          ?
        </span>
        <div className="relative px-6 py-8 sm:px-8">
          <span className="eyebrow-dark">
            <IconBook size={14} className="text-accent" />
            Help guide
          </span>
          <h1 className="mt-3 max-w-xl font-heading text-3xl font-bold tracking-tight text-white">
            Everything about the Florante website
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-white/70">
            What every page expects, where each piece of content comes from, how to manage admin accounts, and how to keep the
            site healthy. Use the shortcuts below to jump to a topic.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-florante-100 bg-white px-3.5 py-1.5 text-xs font-semibold text-florante-700 shadow-soft transition hover:border-florante-300 hover:bg-florante-50"
          >
            <span className="font-mono font-bold text-accent-dark">{s.index}</span>
            {s.title}
          </a>
        ))}
      </div>

      {SECTIONS.map((s) => (
        <GuideSectionBlock key={s.id} section={s} />
      ))}

      <div className="admin-corners relative rounded-[2rem] border border-florante-100 bg-white p-6 shadow-card sm:p-8">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-heading text-lg font-bold text-florante-900">
              See it in action
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Open the live website to check how your content appears to visitors.
            </p>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-accent-grad px-5 py-2.5 text-sm font-bold text-florante-950 shadow-glow transition hover:brightness-105"
          >
            View the site <IconArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </div>
  );
}