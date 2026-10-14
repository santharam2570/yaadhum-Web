import type { IndustrySlug } from "./industries";
import type { ServiceSlug } from "./services";

export type CaseStudy = {
  title: string;
  client: string;
  location: string;
  service: ServiceSlug;
  industry: IndustrySlug;
  summary: string;
  impact: string;
  stack: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    title: "Shipping Document AI",
    client: "Regional freight forwarder",
    location: "Singapore",
    service: "ai-machine-learning",
    industry: "logistics",
    summary: "An LLM-powered pipeline that reads bills of lading, invoices and customs forms directly into the transport management system.",
    impact: "12,000 documents automated every month",
    stack: ["Python", "Azure OpenAI", "Cortex AI"],
  },
  {
    title: "Multi-Cloud Cost Optimisation",
    client: "B2B SaaS company",
    location: "Austin, USA",
    service: "cloud-management",
    industry: "retail-ecommerce",
    summary: "FinOps programme and Kubernetes rightsizing across AWS and Google Cloud, with automated showback for every product team.",
    impact: "34% lower monthly cloud bill",
    stack: ["AWS", "GKE", "Terraform", "CloudOps"],
  },
  {
    title: "Managed IT for 40 Retail Sites",
    client: "Lifestyle retail chain",
    location: "Chennai, India",
    service: "it-infrastructure-amc",
    industry: "retail-ecommerce",
    summary: "Comprehensive AMC covering POS, networks, CCTV and back-office systems with a 24/7 service desk and field engineers.",
    impact: "99.95% store systems uptime",
    stack: ["Fortinet", "Intune", "ServiceDesk"],
  },
  {
    title: "Finance Process Automation",
    client: "Multi-specialty healthcare network",
    location: "Dubai, UAE",
    service: "process-automation",
    industry: "healthcare",
    summary: "Invoice capture, three-way matching and insurance claims submission automated end to end with human review for exceptions.",
    impact: "70% less manual data entry",
    stack: ["UiPath", "FlowStudio", "SAP"],
  },
  {
    title: "Headless Commerce Replatform",
    client: "D2C lifestyle brand",
    location: "London, UK",
    service: "ecommerce",
    industry: "retail-ecommerce",
    summary: "Migration from a legacy platform to a Next.js storefront on Shopify Plus with multi-currency checkout and personalised search.",
    impact: "+42% conversion rate",
    stack: ["Next.js", "Shopify Plus", "Algolia"],
  },
  {
    title: "Field Service Mobile Platform",
    client: "Facilities management group",
    location: "Sydney, Australia",
    service: "software-development",
    industry: "real-estate",
    summary: "Offline-first mobile app and dispatch console for 600 technicians, integrated with scheduling, inventory and billing.",
    impact: "3× faster job close-out",
    stack: ["Flutter", "Node.js", "PostgreSQL"],
  },
  {
    title: "Connected Business Suite",
    client: "Industrial components distributor",
    location: "Kuala Lumpur, Malaysia",
    service: "enterprise-solutions",
    industry: "manufacturing",
    summary: "Replaced eleven disconnected tools with BizSuite across sales, procurement, inventory and finance, plus Power BI dashboards.",
    impact: "40% faster month-end close",
    stack: ["BizSuite", "Power BI", "Azure"],
  },
];

export const testimonials = [
  {
    quote:
      "YAADHUM took our AI idea from a whiteboard sketch to a production system in eight weeks. Our operations team now spends its time on exceptions, not data entry.",
    role: "Chief Operating Officer",
    org: "Regional freight forwarder",
    location: "Singapore",
  },
  {
    quote:
      "Their FinOps review paid for itself in the first month. More importantly, our engineers finally understand what their services cost to run.",
    role: "VP of Engineering",
    org: "B2B SaaS company",
    location: "Austin, USA",
  },
  {
    quote:
      "Forty stores, one service desk and almost no downtime. Moving to YAADHUM's AMC was the easiest IT decision we've made.",
    role: "Head of IT",
    org: "Lifestyle retail chain",
    location: "Chennai, India",
  },
  {
    quote:
      "Working across a four-hour time difference felt seamless — weekly demos, honest updates and a team that genuinely cared about our customers.",
    role: "E-commerce Director",
    org: "D2C lifestyle brand",
    location: "London, UK",
  },
];

export const processSteps = [
  {
    title: "Discover",
    duration: "1–2 weeks",
    text: "We study your goals, users, systems and data, then agree on measurable outcomes before a single line of code is written.",
    deliverables: ["Stakeholder workshops", "Opportunity assessment", "Fixed-scope proposal"],
  },
  {
    title: "Design",
    duration: "2–3 weeks",
    text: "Solution architecture, security design and clickable prototypes — reviewed with you and signed off before build.",
    deliverables: ["Architecture blueprint", "Clickable prototype", "Delivery roadmap"],
  },
  {
    title: "Build",
    duration: "Agile sprints",
    text: "Two-week sprints with live demos, automated testing and CI/CD, so you see working software every fortnight.",
    deliverables: ["Fortnightly demos", "Automated test suites", "Staging environments"],
  },
  {
    title: "Run & Evolve",
    duration: "Ongoing",
    text: "Launch, train, monitor and continuously improve — backed by SLAs, 24/7 support and quarterly roadmap reviews.",
    deliverables: ["Hypercare & training", "SLA-backed support", "Quarterly business reviews"],
  },
];

export const engagementModels = [
  {
    title: "Fixed-scope project",
    bestFor: "Clear requirements",
    text: "A defined outcome, fixed price and milestone plan — ideal for new builds, implementations and migrations.",
    points: ["Fixed price & timeline", "Milestone-based billing", "Warranty period included"],
  },
  {
    title: "Dedicated team",
    bestFor: "Evolving roadmaps",
    text: "Your own pod of engineers, QA and a delivery lead working in your tools and overlapping with your hours.",
    points: ["Scale monthly", "Time-zone aligned", "Direct access to engineers"],
  },
  {
    title: "Managed services",
    bestFor: "Live systems & infrastructure",
    text: "SLA-backed management of cloud, applications and IT infrastructure, with proactive monitoring and improvement.",
    points: ["24/7 monitoring", "Guaranteed response times", "Monthly health reports"],
  },
];

export const generalFaqs = [
  {
    q: "Do you work with international clients?",
    a: "Yes. We deliver projects and managed services for clients across North America, Europe, the Middle East, Asia-Pacific and India, with overlapping working hours and a dedicated delivery lead.",
  },
  {
    q: "How do you price engagements?",
    a: "Fixed-scope projects are priced per milestone after discovery. Dedicated teams are billed monthly, and managed services and AMCs are priced per asset, user or environment.",
  },
  {
    q: "How do you protect our data and intellectual property?",
    a: "We sign NDAs as standard, follow ISO 27001-aligned security practices, use least-privilege access and transfer full IP ownership to you on delivery.",
  },
  {
    q: "Can you take over systems built by another vendor?",
    a: "Yes. We start with a structured audit and knowledge transfer, stabilise the system, then improve it step by step without disrupting your business.",
  },
  {
    q: "How quickly can you start?",
    a: "Discovery can usually begin within one to two weeks of our first conversation, and dedicated teams can be onboarded within three to four weeks.",
  },
];
