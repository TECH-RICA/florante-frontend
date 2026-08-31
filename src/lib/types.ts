export interface SiteConfig {
  site_name: string;
  tagline: string;
  description: string;
  primary_email: string;
  secondary_email: string;
  phone: string;
  whatsapp: string;
  address: string;
  city: string;
  linkedin: string;
  github: string;
  twitter: string;
  facebook: string;
}

export interface Industry {
  id: number;
  name: string;
  slug: string;
  short_description: string;
  description: string;
  image: string | null;
  icon: string;
  products_count: number;
}

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  image: string | null;
}

export interface University {
  id: number;
  name: string;
  county: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string | null;
  portfolio_url: string;
  linkedin: string;
  github: string;
  twitter: string;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  context: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  short_description: string;
  long_description: string;
  industries: string[];
  features: string[];
  benefits: string[];
  images: string[];
  screenshots: string[];
  pricing: string;
  pricing_type: string;
  demo_url: string;
  status: string;
  technologies: string[];
  integrations: string[];
  faqs: { question: string; answer: string }[];
  testimonials: Testimonial[];
  target_customer: string;
  problem_solved: string;
  how_it_works: string;
  security_notes: string;
}

export interface Solution {
  id: number;
  title: string;
  slug: string;
  category: string;
  short_description: string;
  hero_text?: string;
  problem?: string;
  approach?: string;
  capabilities: string[];
  use_cases?: string[];
  benefits?: string[];
  technologies?: string[];
  faqs?: { question: string; answer: string }[];
  image?: string | null;
  icon?: string;
  cta_text?: string;
  published?: boolean;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  featured_image?: string;
  author_name: string;
  author_role?: string;
  published_at: string;
  views_count: number;
  read_time?: string;
}

export interface ArticleCategory {
  id?: number;
  slug: string;
  label: string;
}

export interface CaseStudy {
  id: number;
  title: string;
  slug: string;
  client: string;
  industry: string;
  challenge: string;
  existing_situation: string;
  solution: string;
  technologies: string[];
  implementation: string;
  result: string;
  client_quote: string;
  client_quote_author: string;
  image: string | null;
}

export interface Hackathon {
  id: number;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  long_description: string;
  rules: string;
  tech_stack: string[];
  prizes: unknown[];
  schedule: unknown[];
  sponsors: string[];
  start_date: string;
  deadline: string;
  status: string;
  participants_count: number;
  image: string;
}

export interface LeadPayload {
  name: string;
  category?: string;
  organization?: string;
  email: string;
  phone?: string;
  industry?: string;
  need?: string;
  product?: number | null;
  budget_range?: string;
  message?: string;
}