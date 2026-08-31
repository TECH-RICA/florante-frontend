import type { Solution, Product, Article, ArticleCategory, TeamMember } from "../lib/types";

export const DEFAULT_SOLUTIONS: Solution[] = [
  {
    id: 1,
    title: "AI & Automation",
    slug: "ai-automation",
    category: "ai",
    short_description: "Intelligent machine learning and automation systems designed to streamline workflows and drive predictive decisions.",
    hero_text: "Automate repetitive tasks, build custom ML models, and gain predictive insights with enterprise AI engineered for African operational environments.",
    problem: "Organizations lose thousands of hours every month on manual data entry, repetitive document processing, and delayed operational decision making.",
    approach: "We design and deploy custom AI models, NLP engines, and Robotic Process Automation (RPA) workflows tailored to your specific organizational context.",
    cta_text: "Talk to our AI team",
    published: true,
    capabilities: ["Custom ML Model Development", "Robotic Process Automation (RPA)", "Natural Language Processing & Speech", "Predictive Analytics & Forecasting"],
    use_cases: ["Automated Document Processing", "Customer Support Chatbots", "Risk & Fraud Scoring Models", "Operational Demand Forecasting"],
    benefits: ["Reduce operational costs by up to 40%", "24/7 automated task execution", "Faster data-driven decision making", "Scale operations without linear headcount growth"],
    technologies: ["Python", "PyTorch", "TensorFlow", "FastAPI", "Celery", "OpenAI"],
  },
  {
    id: 2,
    title: "Cybersecurity & Protection",
    slug: "cybersecurity",
    category: "cybersecurity",
    short_description: "Comprehensive security assessments, penetration testing, compliance, and threat monitoring for modern enterprises.",
    hero_text: "Safeguard your critical systems, cloud applications, and sensitive client data from evolving cybersecurity threats.",
    problem: "Cyber attacks in East Africa are growing rapidly, targeting unprotected Web, Mobile, and API endpoints without continuous security monitoring.",
    approach: "Proactive security auditing, penetration testing, automated threat detection, and end-to-end security architecture aligned with ISO 27001 & Data Protection Act.",
    cta_text: "Get a Security Audit",
    published: true,
    capabilities: ["Penetration Testing & Vulnerability Assessment", "API & Web Application Security", "Data Protection & ISO Compliance Audits", "Incident Response & Forensics"],
    use_cases: ["Banking & Fintech Security Audits", "Healthcare Data Privacy Assurance", "Cloud Infrastructure Hardening", "Regulatory Compliance Preparation"],
    benefits: ["Mitigate data breach and reputational risks", "Build institutional trust with secure systems", "Full compliance with Kenyan & African data privacy laws", "Real-time threat visibility"],
    technologies: ["OWASP", "Burp Suite", "WAF", "Docker", "Vault", "SIEM"],
  },
  {
    id: 3,
    title: "Software Engineering",
    slug: "software-engineering",
    category: "software",
    short_description: "High-performance web applications, mobile platforms, and enterprise software built with modern architectures.",
    hero_text: "Scalable web apps, mobile systems, and microservice APIs engineered for reliable performance and business growth.",
    problem: "Generic off-the-shelf software rarely fits complex organizational workflows, leading to clunky workarounds, data silos, and poor user satisfaction.",
    approach: "We build custom, maintainable web and mobile applications using modern clean architecture, scalable databases, and automated testing.",
    cta_text: "Discuss Your Software Project",
    published: true,
    capabilities: ["Custom Web Application Development", "Cross-Platform Mobile Apps (iOS/Android)", "REST & GraphQL API Architecture", "Database Design & Optimization"],
    use_cases: ["Enterprise ERP & Core Portals", "Customer Facing Portals & Marketplaces", "Mobile Money & Payment Portals", "Field Agent Mobile Tools"],
    benefits: ["100% tailored to your business rules", "High performance under heavy load", "Full code ownership and zero lock-in", "Seamless third-party API integration"],
    technologies: ["React", "TypeScript", "Python / Django", "PostgreSQL", "Tailwind CSS", "Redis"],
  },
  {
    id: 4,
    title: "Digital Transformation",
    slug: "digital-transformation",
    category: "digital_transformation",
    short_description: "Legacy system modernization, cloud migration, and workflow digitization for African institutions.",
    hero_text: "Transition from paper, spreadsheets, and legacy systems to modern cloud-first operations.",
    problem: "Legacy paper processes and disconnected spreadsheets slow down organizational growth, create compliance risks, and cause data loss.",
    approach: "We audit existing workflows and build connected digital portals that digitize paper processes end-to-end with real-time tracking.",
    cta_text: "Start Digital Transformation",
    published: true,
    capabilities: ["End-to-End Workflow Digitization", "Cloud Infrastructure Migration", "Legacy System API Wrapping", "Digital Customer & Staff Onboarding"],
    use_cases: ["Paperless NGO & Enterprise Workflows", "University Digital Student Records", "SME Operations Automation", "Multi-Branch Reporting Systems"],
    benefits: ["Eliminate paper bottlenecks and manual errors", "Centralized real-time operational data", "Empower remote & multi-branch staff", "Reduce operational cycle times by 60%"],
    technologies: ["Cloud Architecture", "Docker", "REST APIs", "React", "PostgreSQL"],
  },
  {
    id: 5,
    title: "Data & Intelligence",
    slug: "data-intelligence",
    category: "data",
    short_description: "Data pipelines, warehousing, custom dashboards, and business intelligence solutions.",
    hero_text: "Turn scattered operational data into clear, actionable business dashboards and predictive insights.",
    problem: "Operational data is trapped across separate software systems and spreadsheets, making real-time reporting and decision-making slow and difficult.",
    approach: "We consolidate your data sources into unified data warehouses and build interactive real-time executive dashboards.",
    cta_text: "Build Your Data Dashboard",
    published: true,
    capabilities: ["Data Pipeline (ETL/ELT) Engineering", "Centralized Data Warehousing", "Interactive Executive Dashboards", "Operational & Financial Reporting"],
    use_cases: ["Executive Performance Dashboards", "Multi-Location Sales Analytics", "Financial Portfolio Reporting", "Supply Chain Data Tracking"],
    benefits: ["Single source of truth for leadership", "Automated daily/weekly reporting", "Faster response to market changes", "Uncover hidden revenue opportunities"],
    technologies: ["Python", "PostgreSQL", "Metabase", "Pandas", "Celery"],
  },
];

export const DEFAULT_SOLUTIONS_MAP: Record<string, Solution> = Object.fromEntries(
  DEFAULT_SOLUTIONS.map((s) => [s.slug, s])
);

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Unicrib Accommodation System",
    slug: "unicrib",
    category: "Education",
    short_description: "Automated student housing, room allocation, and fee management platform for African universities.",
    long_description: "Unicrib simplifies campus accommodation by digitizing room reservation, fee verification, student check-in, and maintenance ticketing in one seamless portal.",
    industries: ["Education"],
    features: ["Online Room Booking & Instant Allocation", "Automated M-Pesa Fee Verification", "Digital Student Pass & Check-In", "Maintenance Request System"],
    benefits: ["Zero queue lines during admission week", "Eliminate fee record reconciliation errors", "Real-time occupancy tracking for campus admin"],
    images: [],
    screenshots: [],
    pricing: "Custom quote",
    pricing_type: "custom",
    demo_url: "/contact",
    status: "available",
    technologies: ["React", "Django", "PostgreSQL", "M-Pesa API"],
    integrations: ["M-Pesa", "Google Workspace", "SMS Gateways"],
    faqs: [
      { question: "Can Unicrib integrate with our existing ERP?", answer: "Yes, Unicrib provides REST APIs to sync student databases and financial ledgers seamlessly." },
      { question: "How fast can we deploy Unicrib?", answer: "Setup and data migration typically take under 2 weeks for university campuses." },
    ],
    testimonials: [],
    target_customer: "Universities, polytechnics, and private student hostels.",
    problem_solved: "Eliminates long physical registration queues and manual payment verification spreadsheets during semester intake.",
    how_it_works: "Students log in, view available rooms in real-time, pay via M-Pesa or bank integration, and receive an instant digital hostel gate pass.",
    security_notes: "Built with role-based access control (RBAC) and encrypted student record storage.",
  },
  {
    id: 2,
    name: "Florante Core ERP",
    slug: "florante-core-erp",
    category: "SME Solutions",
    short_description: "All-in-one business management software for sales, inventory, accounting, and staff management.",
    long_description: "Engineered specifically for growing African businesses to automate invoicing, track inventory in real time, and monitor company performance from anywhere.",
    industries: ["SMEs", "Financial Services"],
    features: ["Real-time Inventory & Stock Tracking", "Automated Tax & Invoicing Tools", "Point of Sale (POS) Integration", "Multi-branch Financial Auditing"],
    benefits: ["Full control over stock theft and discrepancies", "Instant daily financial summaries", "Multi-branch oversight from a single phone or laptop"],
    images: [],
    screenshots: [],
    pricing: "KES 5,000 / month",
    pricing_type: "monthly",
    demo_url: "/contact",
    status: "available",
    technologies: ["TypeScript", "Python", "Tailwind CSS"],
    integrations: ["M-Pesa Daraja API", "KRA iTax", "WhatsApp Notifications"],
    faqs: [
      { question: "Does it work offline?", answer: "Yes, the POS module caches transactions locally and syncs automatically when connection resumes." },
    ],
    testimonials: [],
    target_customer: "Retailers, wholesalers, logistics firms, and service SMBs.",
    problem_solved: "Replaces unorganized paper receipts and Excel files with automated, tamper-proof business records.",
    how_it_works: "Staff record sales or inventory changes, which automatically adjust financial ledgers and send automated alerts to management.",
    security_notes: "Includes audit trail logging for every stock movement and financial transaction.",
  },
  {
    id: 3,
    name: "Sentinel Security Audit Suite",
    slug: "sentinel-audit",
    category: "Cybersecurity",
    short_description: "Automated vulnerability scanner, API security monitor, and threat detection tool for web and cloud apps.",
    long_description: "Sentinel continuously audits web endpoints, databases, and microservices for security flaws, compliance gaps, and unauthorized access attempts.",
    industries: ["Financial Services", "Organizations"],
    features: ["Automated OWASP Vulnerability Scan", "Continuous API Access Monitoring", "ISO 27001 Compliance Checking", "Real-Time Threat Alerts"],
    benefits: ["Identify security weaknesses before attackers do", "Maintain continuous compliance with Kenya Data Protection Regulations", "Automated vulnerability reports for executive review"],
    images: [],
    screenshots: [],
    pricing: "Custom quote",
    pricing_type: "custom",
    demo_url: "/contact",
    status: "available",
    technologies: ["Python", "Docker", "Go", "PostgreSQL"],
    integrations: ["Slack Alerts", "Email / SMS Gateways", "GitHub CI/CD"],
    faqs: [
      { question: "Can Sentinel audit third-party APIs?", answer: "Yes, Sentinel supports authenticated and unauthenticated API vulnerability assessments." },
    ],
    testimonials: [],
    target_customer: "Banks, SACCOs, fintech startups, and government digital services.",
    problem_solved: "Prevents data breaches and costly security compliance fines by detecting vulnerabilities proactively.",
    how_it_works: "Sentinel runs scheduled or continuous security scans against specified endpoints and outputs risk-prioritized remediation steps.",
    security_notes: "Operates with zero data exposure, running in secure isolated execution environments.",
  },
  {
    id: 4,
    name: "Flow Forms & Workflow Digitizer",
    slug: "flow-forms",
    category: "Organizations",
    short_description: "Paperless form builder, approval engine, and document tracking portal for enterprises and NGOs.",
    long_description: "Replace physical sign-off sheets, requisition forms, and email approval threads with structured, automated digital workflows.",
    industries: ["Organizations", "SMEs"],
    features: ["Drag-and-Drop Digital Form Builder", "Multi-Tier Approval Routing", "E-Signature & Audit Trail", "PDF Report Generation"],
    benefits: ["Cut approval turnaround time from days to minutes", "100% paperless institutional tracking", "Never lose a pending document or requisition"],
    images: [],
    screenshots: [],
    pricing: "KES 15,000 / month",
    pricing_type: "monthly",
    demo_url: "/contact",
    status: "available",
    technologies: ["React", "FastAPI", "PostgreSQL"],
    integrations: ["Google Drive", "Microsoft 365", "WhatsApp"],
    faqs: [
      { question: "Can non-technical staff create forms?", answer: "Yes, the visual form builder requires zero code knowledge." },
    ],
    testimonials: [],
    target_customer: "NGOs, government agencies, schools, and corporate organizations.",
    problem_solved: "Eliminates lost paperwork and slow manual approval chains across departments.",
    how_it_works: "Staff submit digital forms, which route automatically to assigned managers for instant e-approval via email or mobile.",
    security_notes: "All approvals are cryptographically signed with date, time, and user IP audit logs.",
  },
];

export const DEFAULT_PRODUCTS_MAP: Record<string, Product> = Object.fromEntries(
  DEFAULT_PRODUCTS.map((p) => [p.slug, p])
);

export const DEFAULT_CATEGORIES: ArticleCategory[] = [
  { id: 1, label: "AI & Automation", slug: "ai" },
  { id: 2, label: "Cybersecurity", slug: "cybersecurity" },
  { id: 3, label: "Digital Transformation", slug: "digital_transformation" },
  { id: 4, label: "Software Engineering", slug: "engineering" },
];

export const DEFAULT_ARTICLES: Article[] = [
  {
    id: 1,
    title: "The Rise of Pragmatic AI in African Enterprise Operations",
    slug: "ai-trends-africa-2026",
    category: "AI & Automation",
    excerpt: "How forward-thinking African businesses are deploying targeted machine learning models to solve operational bottlenecks rather than chasing hype.",
    content: `Artificial Intelligence in Africa has reached an inflection point. While global headlines focus on multi-billion dollar general language models, African enterprises and tech teams are quietly building pragmatic, domain-focused AI systems that solve real operational bottlenecks.

### 1. Moving Beyond Generic Chatbots
Generic AI chatbots often fail when faced with local languages, specialized business jargon, or specific African regulatory environments. African organizations are moving toward fine-tuned, localized models that handle document extraction, M-Pesa transaction auditing, and dialect-aware customer service.

### 2. Automated Operational Workflows
The biggest ROI for AI in East Africa today is in workflow automation. From automated invoice processing in SMEs to credit scoring models for micro-lenders, machine learning is reducing operational cycle times from days to seconds.

### 3. Key Takeaway for Business Leaders
Building successful AI systems requires starting with a clear problem definition. Identify where your team spends manual hours, structure your data, and deploy targeted AI tools that integrate directly into your existing software stack.`,
    published_at: "2026-08-15T10:00:00Z",
    read_time: "5 min read",
    author_name: "Florante AI Research",
    author_role: "Engineering Team",
    views_count: 342,
    tags: ["AI", "Automation", "Machine Learning"],
  },
  {
    id: 2,
    title: "Navigating Kenya's Data Protection Act for Digital Systems",
    slug: "cybersecurity-compliance-kenya",
    category: "Cybersecurity",
    excerpt: "A practical breakdown of data privacy requirements for software applications operating in Kenya and the wider East African region.",
    content: `Compliance with data protection laws is no longer optional for African companies. Kenya's Data Protection Act (DPA) enforces strict guidelines on how personal data is collected, processed, and stored.

### 1. Data Minimization & Consent
Organizations must only collect data that is strictly required for the service rendered. Clear user consent must be captured and logged in audit trails.

### 2. Encryption & Access Control
All customer records, API keys, and financial credentials must be encrypted both in transit (TLS 1.3) and at rest (AES-256). Role-based access control (RBAC) ensures staff members only access data necessary for their role.

### 3. Incident Response Requirements
In the event of a security breach or unauthorized access attempt, organizations are legally mandated to notify regulators and affected data subjects within designated timeframes. Proactive security logging is essential.`,
    published_at: "2026-08-10T14:30:00Z",
    read_time: "7 min read",
    author_name: "Florante Security Team",
    author_role: "Cybersecurity Desk",
    views_count: 518,
    tags: ["Cybersecurity", "Compliance", "Privacy"],
  },
  {
    id: 3,
    title: "How African Institutions Are Replacing Paper Sheets with Digital Workflows",
    slug: "paperless-workflows-ngos",
    category: "Digital Transformation",
    excerpt: "A step-by-step guide to digitizing approval flows, paper forms, and departmental requests without disrupting staff operations.",
    content: `Transitioning an institution from physical paper files to digital workflows is a strategic shift that transforms organizational speed and accountability.

### 1. Mapping the Approval Hierarchy
Start by auditing existing physical approval forms — travel requests, procurement requisitions, and leave applications. Define the exact sign-off sequence and multi-tier approval rules.

### 2. Digital Forms & E-Signatures
Replace paper sheets with responsive web forms that validate input data automatically. Approvers receive notifications via email or WhatsApp and sign off with a single click.

### 3. Real-Time Institutional Audit Trails
Digital workflows maintain tamper-proof logs showing who created, edited, approved, or rejected every request, complete with timestamps and user IP records.`,
    published_at: "2026-08-02T09:15:00Z",
    read_time: "6 min read",
    author_name: "Florante Digital Labs",
    author_role: "Solutions Desk",
    views_count: 289,
    tags: ["Digital Transformation", "Workflows", "Paperless"],
  },
];

export const DEFAULT_ARTICLES_MAP: Record<string, Article> = Object.fromEntries(
  DEFAULT_ARTICLES.map((a) => [a.slug, a])
);

export const DEFAULT_TEAM: TeamMember[] = [
  {
    id: 1,
    name: "Willy Maina",
    role: "Lead Systems Architect & Founder",
    bio: "Passionate software engineer building resilient cloud platforms, AI automation tools, and secure web architectures for African institutions.",
    image: null,
    portfolio_url: "",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    twitter: "https://twitter.com",
  },
  {
    id: 2,
    name: "Florante Engineering",
    role: "Core Software & AI Desk",
    bio: "Cross-functional engineering team specializing in Django microservices, React UI frameworks, and data pipeline security.",
    image: null,
    portfolio_url: "",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    twitter: "https://twitter.com",
  },
  {
    id: 3,
    name: "Florante Solutions Desk",
    role: "Digital Strategy & Security",
    bio: "Dedicated team guiding organizational digitization, ISO cybersecurity compliance, and enterprise cloud migrations.",
    image: null,
    portfolio_url: "",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    twitter: "https://twitter.com",
  },
];

export const DEFAULT_UNIVERSITIES = [
  { id: 1, name: "University of Nairobi", county: "Nairobi" },
  { id: 2, name: "Kenyatta University", county: "Nairobi" },
  { id: 3, name: "Strathmore University", county: "Nairobi" },
  { id: 4, name: "Jomo Kenyatta University of Agriculture & Technology", county: "Kiambu" },
  { id: 5, name: "Moi University", county: "Uasin Gishu" },
  { id: 6, name: "Egerton University", county: "Nakuru" },
];

export const DEFAULT_CASE_STUDIES = [
  {
    id: 1,
    title: "Digitizing Campus Accommodation for 15,000+ Students",
    slug: "unicrib-campus-deployment",
    client: "East African Partner Universities",
    industry: "Education",
    challenge: "Long physical queues during registration week and payment verification discrepancies.",
    existing_situation: "Manual ledger books and Excel spreadsheets prone to fraud and registration delays.",
    solution: "Deployed Unicrib Accommodation Platform with automated M-Pesa fee verification and instant digital room allocation.",
    technologies: ["React", "Django", "PostgreSQL", "M-Pesa API"],
    implementation: "Phased rollout over 2 weeks across multi-building student hostelling complexes.",
    result: "Eliminated physical admission queues completely and reduced fee verification time to under 3 seconds.",
    client_quote: "Florante transformed our hostel administration from a week of chaos into a smooth digital experience.",
    client_quote_author: "Dean of Student Affairs",
    image: null,
  },
  {
    id: 2,
    title: "ISO Security Hardening & Continuous Vulnerability Monitoring",
    slug: "sentinel-cybersecurity-banking",
    client: "Regional Financial Institution",
    industry: "Financial Services",
    challenge: "Meeting strict Kenya Data Protection Act compliance while securing multi-branch financial APIs.",
    existing_situation: "Periodic manual audits left system endpoints exposed to emerging cyber threats between audit cycles.",
    solution: "Integrated Sentinel Security Audit Suite for 24/7 endpoint vulnerability scanning and real-time threat logging.",
    technologies: ["Python", "Docker", "WAF", "PostgreSQL"],
    implementation: "Non-disruptive agentless deployment scanning core API gateways continuously.",
    result: "Achieved 100% regulatory data privacy compliance with zero high-severity vulnerabilities.",
    client_quote: "Sentinel gives our board complete visibility over system security and compliance.",
    client_quote_author: "Head of IT Infrastructure",
    image: null,
  },
];
