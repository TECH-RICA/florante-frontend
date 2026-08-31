import type { ReactNode } from "react";
import {
  IconAward,
  IconBolt,
  IconBook,
  IconBuilding,
  IconChart,
  IconLayers,
  IconMail,
  IconPin,
  IconQuote,
  IconRocket,
  IconShield,
  IconSearch,
} from "../components/icons";

export type FieldType =
  | "text"
  | "email"
  | "url"
  | "number"
  | "textarea"
  | "checkbox"
  | "select"
  | "datetime"
  | "array"
  | "json"
  | "m2m"
  | "fk"
  | "image";

export interface FieldConfig {
  key: string;
  label: string;
  type: FieldType;
  options?: { value: string; label: string }[];
  optionsUrl?: string;
  labelField?: string;
  placeholder?: string;
  help?: string;
  required?: boolean;
  rows?: number;
}

export interface ResourceConfig {
  key: string;
  label: string;
  singular: string;
  icon: ReactNode;
  titleField: string;
  subtitleFields?: string[];
  fields: FieldConfig[];
  allowCreate?: boolean;
  allowDelete?: boolean;
  formGuide?: {
    summary: string;
    publicUrl: string;
    tips: string[];
  };
}

export const PRODUCT_STATUS = [
  { value: "draft", label: "Draft" },
  { value: "beta", label: "Beta" },
  { value: "available", label: "Available" },
  { value: "coming_soon", label: "Coming Soon" },
  { value: "deprecated", label: "Deprecated" },
];

export const PRICING_TYPE = [
  { value: "one_time", label: "One-time" },
  { value: "monthly", label: "Monthly" },
  { value: "annual", label: "Annual" },
  { value: "custom", label: "Custom Quote" },
  { value: "free", label: "Free" },
];

export const SOLUTION_CATEGORIES = [
  { value: "ai-automation", label: "AI & Automation" },
  { value: "cybersecurity", label: "Cybersecurity" },
  { value: "software-engineering", label: "Software Engineering" },
  { value: "digital-transformation", label: "Digital Transformation" },
  { value: "data-intelligence", label: "Data & Intelligence" },
];

export const ARTICLE_CATEGORIES = [
  { value: "ai", label: "AI" },
  { value: "cybersecurity", label: "Cybersecurity" },
  { value: "african-technology", label: "African Technology" },
  { value: "software-engineering", label: "Software Engineering" },
  { value: "digital-transformation", label: "Digital Transformation" },
  { value: "business-technology", label: "Business Technology" },
  { value: "education-technology", label: "Education Technology" },
];

export const LEAD_SOURCES = [
  { value: "contact_form", label: "Contact Form" },
  { value: "demo_request", label: "Demo Request" },
  { value: "quote_request", label: "Quote Request" },
  { value: "newsletter", label: "Newsletter" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "phone", label: "Phone" },
  { value: "email", label: "Email" },
];

export const LEAD_CATEGORIES = [
  { value: "individual", label: "Individual" },
  { value: "organization", label: "Organization" },
];

export const LEAD_STATUSES = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "meeting_scheduled", label: "Meeting Scheduled" },
  { value: "demo", label: "Demo" },
  { value: "proposal", label: "Proposal" },
  { value: "negotiation", label: "Negotiation" },
  { value: "won", label: "Won" },
  { value: "lost", label: "Lost" },
];

export const LEAD_NEEDS = [
  { value: "ai", label: "AI" },
  { value: "cybersecurity", label: "Cybersecurity" },
  { value: "website", label: "Website" },
  { value: "mobile_app", label: "Mobile App" },
  { value: "enterprise_system", label: "Enterprise System" },
  { value: "automation", label: "Automation" },
  { value: "digital_transformation", label: "Digital Transformation" },
  { value: "product", label: "Product" },
  { value: "other", label: "Other" },
];

export const HACKATHON_STATUS = [
  { value: "upcoming", label: "Upcoming" },
  { value: "ongoing", label: "Ongoing" },
  { value: "closed", label: "Closed" },
];

export const RESOURCE_CONFIGS: ResourceConfig[] = [
  {
    key: "products",
    label: "Products",
    singular: "Product",
    icon: <IconLayers />,
    titleField: "name",
    subtitleFields: ["category", "status"],
    allowCreate: true,
    allowDelete: true,
    formGuide: {
      summary: "Powers the Products catalog (/products) and home page 'Ready to deploy' section.",
      publicUrl: "/products",
      tips: [
        "Name and Short Description are required for catalog cards.",
        "Select 'Available' status to show the product as ready.",
        "Features, Benefits, Images, and Screenshots accept one item per line.",
        "Toggle 'Published' to make the product visible on the live site.",
      ],
    },
    fields: [
      { key: "name", label: "Name", type: "text", required: true },
      { key: "slug", label: "Slug", type: "text", help: "Leave blank to auto-generate." },
      { key: "category", label: "Category", type: "text" },
      { key: "short_description", label: "Short description", type: "textarea", rows: 3 },
      { key: "long_description", label: "Long description", type: "textarea", rows: 6 },
      { key: "industries", label: "Industries", type: "m2m", optionsUrl: "industries", labelField: "name" },
      { key: "features", label: "Features", type: "array", help: "One item per line." },
      { key: "benefits", label: "Benefits", type: "array", help: "One item per line." },
      { key: "images", label: "Images (URLs)", type: "array", help: "One URL per line." },
      { key: "screenshots", label: "Screenshots (URLs)", type: "array", help: "One URL per line." },
      { key: "pricing", label: "Pricing (display)", type: "text", placeholder: "e.g. From KSh 1,500/mo" },
      { key: "pricing_type", label: "Pricing type", type: "select", options: PRICING_TYPE },
      { key: "demo_url", label: "Demo URL", type: "url" },
      { key: "status", label: "Status", type: "select", options: PRODUCT_STATUS },
      { key: "technologies", label: "Technologies", type: "array", help: "One per line." },
      { key: "integrations", label: "Integrations", type: "array", help: "One per line." },
      { key: "faqs", label: "FAQs (JSON)", type: "json", help: '[{"question": "...", "answer": "..."}]' },
      { key: "testimonials", label: "Testimonials", type: "m2m", optionsUrl: "testimonials", labelField: "author" },
      { key: "target_customer", label: "Target customer", type: "text" },
      { key: "problem_solved", label: "Problem solved", type: "textarea", rows: 4 },
      { key: "how_it_works", label: "How it works", type: "textarea", rows: 4 },
      { key: "security_notes", label: "Security notes", type: "textarea", rows: 4 },
      { key: "seo_title", label: "SEO title", type: "text" },
      { key: "seo_description", label: "SEO description", type: "textarea", rows: 2 },
      { key: "published", label: "Published", type: "checkbox" },
    ],
  },
  {
    key: "solutions",
    label: "Solutions",
    singular: "Solution",
    icon: <IconRocket />,
    titleField: "title",
    subtitleFields: ["category"],
    allowCreate: true,
    allowDelete: true,
    formGuide: {
      summary: "Powers the Solutions page (/solutions) and home page 'Core solutions' section.",
      publicUrl: "/solutions",
      tips: [
        "Title and Category determine where and how the solution is grouped.",
        "Fill in Hero text, Problem, and Approach to build a complete solution story.",
        "Capabilities, Use Cases, and Benefits accept one item per line.",
        "CTA text customizes the action button on the solution card.",
      ],
    },
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "slug", label: "Slug", type: "text", help: "Leave blank to auto-generate." },
      { key: "category", label: "Category", type: "select", options: SOLUTION_CATEGORIES },
      { key: "short_description", label: "Short description", type: "textarea", rows: 3 },
      { key: "hero_text", label: "Hero text", type: "textarea", rows: 3 },
      { key: "problem", label: "Problem", type: "textarea", rows: 4 },
      { key: "approach", label: "Approach", type: "textarea", rows: 4 },
      { key: "capabilities", label: "Capabilities", type: "array", help: "One per line." },
      { key: "use_cases", label: "Use cases", type: "array", help: "One per line." },
      { key: "benefits", label: "Benefits", type: "array", help: "One per line." },
      { key: "technologies", label: "Technologies", type: "array", help: "One per line." },
      { key: "faqs", label: "FAQs (JSON)", type: "json", help: '[{"question": "...", "answer": "..."}]' },
      { key: "cta_text", label: "CTA text", type: "text", placeholder: "e.g. Discuss This Solution" },
      { key: "published", label: "Published", type: "checkbox" },
    ],
  },
  {
    key: "articles",
    label: "Articles",
    singular: "Article",
    icon: <IconBook />,
    titleField: "title",
    subtitleFields: ["category"],
    allowCreate: true,
    allowDelete: true,
    formGuide: {
      summary: "Powers the Insights section (/insights). Every article opens its own reading page.",
      publicUrl: "/insights",
      tips: [
        "Title and Content are required fields.",
        "Check 'Featured' to pin this article as the hero story on /insights.",
        "Check 'Published' and set Published At to control when it goes live.",
      ],
    },
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "slug", label: "Slug", type: "text", help: "Leave blank to auto-generate." },
      { key: "category", label: "Category", type: "select", options: ARTICLE_CATEGORIES },
      { key: "excerpt", label: "Excerpt", type: "textarea", rows: 3 },
      { key: "content", label: "Content", type: "textarea", rows: 10, required: true },
      { key: "author_name", label: "Author name", type: "text" },
      { key: "author_role", label: "Author role", type: "text" },
      { key: "featured_image", label: "Featured image URL", type: "url" },
      { key: "read_time_minutes", label: "Read time (min)", type: "number" },
      { key: "published_at", label: "Published date", type: "datetime" },
      { key: "featured", label: "Featured", type: "checkbox" },
      { key: "published", label: "Published", type: "checkbox" },
    ],
  },
  {
    key: "case-studies",
    label: "Case Studies",
    singular: "Case Study",
    icon: <IconAward />,
    titleField: "title",
    subtitleFields: ["client_name", "industry_name"],
    allowCreate: true,
    allowDelete: true,
    formGuide: {
      summary: "Powers the 'Client Success & Case Studies' section on the Solutions page (/solutions).",
      publicUrl: "/solutions",
      tips: [
        "Include Client name, Industry, Challenge, Solution, and Result.",
        "Client quote and quote author appear in a highlighted quote box on the card.",
        "Technologies accept one tech stack item per line.",
      ],
    },
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "slug", label: "Slug", type: "text", help: "Leave blank to auto-generate." },
      { key: "client_name", label: "Client name", type: "text" },
      { key: "industry_name", label: "Industry name", type: "text" },
      { key: "challenge", label: "Challenge", type: "textarea", rows: 4 },
      { key: "solution", label: "Solution", type: "textarea", rows: 4 },
      { key: "result", label: "Result", type: "textarea", rows: 4 },
      { key: "metrics", label: "Metrics (JSON)", type: "json", help: '[{"label": "Uptime", "value": "99.9%"}]' },
      { key: "technologies", label: "Technologies", type: "array", help: "One per line." },
      { key: "featured_image", label: "Featured image URL", type: "url" },
      { key: "client_quote", label: "Client quote", type: "textarea", rows: 3 },
      { key: "quote_author", label: "Quote author", type: "text" },
      { key: "featured", label: "Featured", type: "checkbox" },
      { key: "published", label: "Published", type: "checkbox" },
    ],
  },
  {
    key: "industries",
    label: "Industries",
    singular: "Industry",
    icon: <IconBuilding />,
    titleField: "name",
    subtitleFields: ["slug"],
    allowCreate: true,
    allowDelete: true,
    formGuide: {
      summary: "Powers industry categories across Products and Case Studies (/industries).",
      publicUrl: "/industries",
      tips: [
        "Name is required.",
        "Check 'Featured' to highlight this industry on overview pages.",
      ],
    },
    fields: [
      { key: "name", label: "Name", type: "text", required: true },
      { key: "slug", label: "Slug", type: "text", help: "Leave blank to auto-generate." },
      { key: "short_description", label: "Short description", type: "textarea", rows: 3 },
      { key: "description", label: "Description", type: "textarea", rows: 5 },
      { key: "icon", label: "Icon", type: "text" },
      { key: "featured", label: "Featured", type: "checkbox" },
      { key: "published", label: "Published", type: "checkbox" },
    ],
  },
  {
    key: "testimonials",
    label: "Testimonials",
    singular: "Testimonial",
    icon: <IconQuote />,
    titleField: "author",
    subtitleFields: ["company"],
    allowCreate: true,
    allowDelete: true,
    fields: [
      { key: "quote", label: "Quote", type: "textarea", rows: 4, required: true },
      { key: "author", label: "Author", type: "text", required: true },
      { key: "role", label: "Role", type: "text" },
      { key: "company", label: "Company", type: "text" },
      { key: "published", label: "Published", type: "checkbox" },
    ],
  },
  {
    key: "universities",
    label: "Universities",
    singular: "University",
    icon: <IconPin />,
    titleField: "name",
    subtitleFields: ["county"],
    allowCreate: true,
    allowDelete: true,
    fields: [
      { key: "name", label: "Name", type: "text", required: true },
      { key: "county", label: "County", type: "text" },
    ],
  },
  {
    key: "team",
    label: "Team",
    singular: "Team member",
    icon: <IconShield />,
    titleField: "name",
    subtitleFields: ["role", "published"],
    allowCreate: true,
    allowDelete: true,
    fields: [
      { key: "name", label: "Name", type: "text", required: true },
      { key: "role", label: "Role", type: "text" },
      {
        key: "image",
        label: "Photo",
        type: "image",
        help: "Upload a portrait — shown on the About page next to their name.",
      },
      { key: "bio", label: "Bio", type: "textarea", rows: 4 },
      {
        key: "portfolio_url",
        label: "Portfolio link",
        type: "url",
        placeholder: "https://your-portfolio.example.com",
        help: "Opens the member's portfolio in a new tab when a visitor clicks 'Portfolio' on the About page.",
      },
      { key: "linkedin", label: "LinkedIn", type: "url" },
      { key: "github", label: "GitHub", type: "url" },
      { key: "twitter", label: "Twitter", type: "url" },
      { key: "order", label: "Order", type: "number" },
      { key: "published", label: "Published", type: "checkbox" },
    ],
  },
  {
    key: "faqs",
    label: "FAQs",
    singular: "FAQ",
    icon: <IconSearch />,
    titleField: "question",
    subtitleFields: ["context"],
    allowCreate: true,
    allowDelete: true,
    fields: [
      { key: "question", label: "Question", type: "text", required: true },
      { key: "answer", label: "Answer", type: "textarea", rows: 4, required: true },
      { key: "context", label: "Context", type: "text", placeholder: "products, cybersecurity, general" },
      { key: "order", label: "Order", type: "number" },
      { key: "published", label: "Published", type: "checkbox" },
    ],
  },
  {
    key: "leads",
    label: "Messages",
    singular: "Lead",
    icon: <IconMail />,
    titleField: "name",
    subtitleFields: ["email", "status"],
    allowCreate: false,
    allowDelete: true,
    fields: [
      { key: "name", label: "Name", type: "text", required: true },
      { key: "category", label: "Type", type: "select", options: LEAD_CATEGORIES },
      { key: "organization", label: "Organization", type: "text" },
      { key: "email", label: "Email", type: "email" },
      { key: "phone", label: "Phone", type: "text" },
      { key: "industry", label: "Industry", type: "text" },
      { key: "need", label: "Need", type: "select", options: LEAD_NEEDS },
      { key: "product", label: "Product", type: "fk", optionsUrl: "products", labelField: "name" },
      { key: "budget_range", label: "Budget range", type: "text" },
      { key: "message", label: "Message", type: "textarea", rows: 4 },
      { key: "source", label: "Source", type: "select", options: LEAD_SOURCES },
      { key: "status", label: "Status", type: "select", options: LEAD_STATUSES },
      { key: "lead_score", label: "Lead score", type: "number" },
      { key: "notes", label: "Notes", type: "textarea", rows: 4 },
      { key: "assigned_to", label: "Assigned to", type: "fk", optionsUrl: "users", labelField: "username" },
      { key: "next_action", label: "Next action", type: "text" },
    ],
  },
  {
    key: "hackathons",
    label: "Hackathons",
    singular: "Hackathon",
    icon: <IconBolt />,
    titleField: "title",
    subtitleFields: ["status", "published"],
    allowCreate: true,
    allowDelete: true,
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "slug", label: "Slug", type: "text", help: "Leave blank to auto-generate." },
      { key: "tagline", label: "Tagline", type: "text" },
      { key: "description", label: "Description", type: "textarea", rows: 4 },
      { key: "long_description", label: "Long description", type: "textarea", rows: 8 },
      { key: "rules", label: "Rules", type: "textarea", rows: 6 },
      { key: "tech_stack", label: "Tech stack", type: "array", help: "One per line." },
      { key: "prizes", label: "Prizes (JSON)", type: "json", help: '[{"place": "1st", "prize": "..."}]' },
      { key: "schedule", label: "Schedule (JSON)", type: "json", help: '[{"date": "...", "title": "..."}]' },
      { key: "sponsors", label: "Sponsors", type: "array", help: "One per line." },
      { key: "start_date", label: "Start date", type: "datetime" },
      { key: "deadline", label: "Deadline", type: "datetime" },
      { key: "status", label: "Status", type: "select", options: HACKATHON_STATUS },
      { key: "participants_count", label: "Participants", type: "number" },
      { key: "published", label: "Published", type: "checkbox" },
    ],
  },
];

export const RESOURCE_MAP: Record<string, ResourceConfig> = Object.fromEntries(
  RESOURCE_CONFIGS.map((r) => [r.key, r])
);

export const SITE_FIELDS: FieldConfig[] = [
  { key: "site_name", label: "Site name", type: "text" },
  { key: "tagline", label: "Tagline", type: "text" },
  { key: "description", label: "Description", type: "textarea", rows: 4 },
  { key: "primary_email", label: "Primary email", type: "email" },
  { key: "secondary_email", label: "Secondary email", type: "email" },
  { key: "phone", label: "Phone", type: "text" },
  { key: "whatsapp", label: "WhatsApp", type: "text" },
  { key: "address", label: "Address", type: "text" },
  { key: "city", label: "City", type: "text" },
  { key: "linkedin", label: "LinkedIn URL", type: "url" },
  { key: "github", label: "GitHub URL", type: "url" },
  { key: "twitter", label: "Twitter URL", type: "url" },
  { key: "facebook", label: "Facebook URL", type: "url" },
];

export function useResourceIcons() {
  return RESOURCE_CONFIGS;
}

export { IconChart as DashboardIcon };
