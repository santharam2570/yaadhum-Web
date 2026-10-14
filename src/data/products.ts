import type { ServiceSlug } from "./services";

export type ProductSlug = "cloudops" | "flowstudio" | "cortex" | "servicedesk" | "commercehub" | "bizsuite";

export type Product = {
  slug: ProductSlug;
  name: string;
  category: string;
  tagline: string;
  short: string;
  description: string;
  metrics: { value: string; label: string }[];
  features: { title: string; text: string }[];
  modules: string[];
  integrations: string[];
  deployment: string[];
  idealFor: string[];
  service: ServiceSlug;
};

export const products: Product[] = [
  {
    slug: "cloudops",
    name: "CloudOps",
    category: "Cloud Solutions",
    tagline: "Multi-cloud visibility, cost control and governance in one console.",
    short: "Monitor, govern and optimise AWS, Azure and Google Cloud from a single pane of glass.",
    description:
      "YAADHUM CloudOps unifies every cloud account into one live view of cost, performance, security posture and compliance. Automated recommendations rightsize resources, schedule idle workloads and flag risky configurations before they become incidents.",
    metrics: [
      { value: "30%", label: "average cloud cost reduction" },
      { value: "3", label: "major clouds in one console" },
      { value: "200+", label: "built-in policy checks" },
    ],
    features: [
      { title: "Unified cost explorer", text: "Spend by team, product and environment with budgets, forecasts and anomaly alerts." },
      { title: "Rightsizing engine", text: "Usage-based recommendations with one-click scheduling and shutdown of idle resources." },
      { title: "Security posture", text: "Continuous checks against CIS benchmarks with prioritised, actionable findings." },
      { title: "Governance policies", text: "Tagging, region and instance policies enforced automatically across accounts." },
      { title: "Health & uptime", text: "Service health, SLO tracking and incident timelines for every workload." },
      { title: "Showback reports", text: "Automated monthly reports for finance, engineering and leadership." },
    ],
    modules: ["Cost Explorer", "Optimiser", "Posture Manager", "Policy Engine", "Reports"],
    integrations: ["AWS", "Azure", "Google Cloud", "Slack", "Microsoft Teams", "Jira"],
    deployment: ["SaaS", "Private cloud"],
    idealFor: ["Scaling SaaS companies", "Multi-account enterprises", "Managed service providers"],
    service: "cloud-management",
  },
  {
    slug: "flowstudio",
    name: "FlowStudio",
    category: "Automation Tools",
    tagline: "Design, run and monitor business automations — without the complexity.",
    short: "A visual automation platform combining workflows, approvals, bots and AI steps.",
    description:
      "YAADHUM FlowStudio lets business and IT teams build automations together. Drag-and-drop workflows, digital forms, approval chains, API connectors and AI document steps run on a secure, auditable engine with real-time monitoring.",
    metrics: [
      { value: "300+", label: "pre-built connectors" },
      { value: "60%", label: "less manual processing" },
      { value: "100%", label: "audit trail coverage" },
    ],
    features: [
      { title: "Visual workflow builder", text: "Design multi-step processes with branches, timers and parallel paths." },
      { title: "Digital forms & approvals", text: "Mobile-friendly forms with role-based routing, delegation and escalations." },
      { title: "AI document steps", text: "Extract, classify and validate data from invoices, IDs and contracts." },
      { title: "Bots & connectors", text: "Connect APIs, databases, email and legacy apps through RPA bots." },
      { title: "Live process monitor", text: "Track every running case, bottleneck and SLA in real time." },
      { title: "Enterprise governance", text: "Versioning, environments, role-based access and full audit logs." },
    ],
    modules: ["Designer", "Forms", "Approvals", "AI Steps", "Bot Runner", "Monitor"],
    integrations: ["Microsoft 365", "Google Workspace", "SAP", "Salesforce", "Zoho", "REST & SOAP APIs"],
    deployment: ["SaaS", "Private cloud", "On-premise"],
    idealFor: ["Finance & operations teams", "Shared service centres", "HR & procurement"],
    service: "process-automation",
  },
  {
    slug: "cortex",
    name: "Cortex AI",
    category: "AI Platform",
    tagline: "Secure enterprise AI assistants and document intelligence, ready in weeks.",
    short: "Private AI assistants and document processing grounded in your own business knowledge.",
    description:
      "YAADHUM Cortex AI is an enterprise AI platform for building assistants and document pipelines on your own data. Permission-aware retrieval, guardrails and evaluation tools let you deploy generative AI safely across support, sales, HR and operations.",
    metrics: [
      { value: "95%+", label: "document extraction accuracy" },
      { value: "< 4 wks", label: "to a production assistant" },
      { value: "0", label: "training on your data by default" },
    ],
    features: [
      { title: "Knowledge assistants", text: "Chat with policies, manuals and records with cited, permission-aware answers." },
      { title: "Document intelligence", text: "Read invoices, purchase orders, claims and contracts into structured data." },
      { title: "Agent toolkit", text: "Let assistants take actions through approved APIs with human approval steps." },
      { title: "Guardrails & redaction", text: "PII masking, topic controls and prompt-injection protection built in." },
      { title: "Evaluation studio", text: "Test answer quality, accuracy and cost before every release." },
      { title: "Model flexibility", text: "Use OpenAI, Azure OpenAI, Anthropic or open-source models — switch anytime." },
    ],
    modules: ["Assistants", "DocAI", "Agents", "Guardrails", "Evaluation", "Analytics"],
    integrations: ["SharePoint", "Google Drive", "Confluence", "Salesforce", "ServiceNow", "Slack"],
    deployment: ["SaaS", "Private cloud", "Customer VPC"],
    idealFor: ["Customer support teams", "Finance & back office", "Knowledge-heavy organisations"],
    service: "ai-machine-learning",
  },
  {
    slug: "servicedesk",
    name: "ServiceDesk",
    category: "IT Operations",
    tagline: "IT service management and AMC operations, simplified.",
    short: "Ticketing, asset management and SLA tracking built for IT teams and AMC providers.",
    description:
      "YAADHUM ServiceDesk brings tickets, assets, contracts and field visits into one ITIL-aligned platform. Automated routing, SLA timers and a self-service portal help IT teams resolve issues faster and prove the value of every contract.",
    metrics: [
      { value: "45%", label: "faster ticket resolution" },
      { value: "100%", label: "asset and warranty visibility" },
      { value: "24/7", label: "self-service portal" },
    ],
    features: [
      { title: "Omnichannel ticketing", text: "Email, portal, chat and phone tickets with smart categorisation and routing." },
      { title: "SLA management", text: "Response and resolution timers with escalations and breach alerts." },
      { title: "Asset & CMDB", text: "Discover hardware and software, track warranties and map dependencies." },
      { title: "AMC contract tracking", text: "Coverage, renewals, preventive visits and billing in one place." },
      { title: "Field service app", text: "Mobile job sheets, GPS check-in and customer sign-off for engineers." },
      { title: "Knowledge base", text: "Self-help articles that deflect tickets and onboard new staff faster." },
    ],
    modules: ["Incidents", "Requests", "Assets", "Contracts", "Field Service", "Knowledge"],
    integrations: ["Microsoft Intune", "Active Directory", "Microsoft Teams", "WhatsApp", "Jira", "Email"],
    deployment: ["SaaS", "Private cloud"],
    idealFor: ["Internal IT departments", "AMC & managed service providers", "Multi-site businesses"],
    service: "it-infrastructure-amc",
  },
  {
    slug: "commercehub",
    name: "CommerceHub",
    category: "Commerce",
    tagline: "Run every sales channel, order and SKU from one hub.",
    short: "Order, inventory and channel management for growing online businesses.",
    description:
      "YAADHUM CommerceHub connects your storefronts, marketplaces, warehouses and payment providers. Orders, stock and customer data stay in sync across every channel, while built-in analytics show what's selling, where and why.",
    metrics: [
      { value: "15+", label: "channel and marketplace connectors" },
      { value: "99.9%", label: "inventory sync accuracy" },
      { value: "3×", label: "faster order fulfilment" },
    ],
    features: [
      { title: "Multi-channel orders", text: "Shopify, WooCommerce, Amazon and more flowing into one order queue." },
      { title: "Real-time inventory", text: "Stock synced across warehouses and channels to prevent overselling." },
      { title: "Fulfilment automation", text: "Rules-based routing, label printing and carrier integrations." },
      { title: "Returns management", text: "Self-service returns, refunds and restocking workflows." },
      { title: "Customer 360", text: "Unified customer profiles, order history and lifetime value." },
      { title: "Commerce analytics", text: "Revenue, margin and product performance dashboards by channel." },
    ],
    modules: ["Orders", "Inventory", "Fulfilment", "Returns", "Customers", "Analytics"],
    integrations: ["Shopify", "WooCommerce", "Amazon", "Stripe", "Razorpay", "ShipStation"],
    deployment: ["SaaS"],
    idealFor: ["D2C brands", "Multi-channel retailers", "B2B distributors"],
    service: "ecommerce",
  },
  {
    slug: "bizsuite",
    name: "BizSuite",
    category: "Business Management",
    tagline: "CRM, HR, finance and operations on one connected platform.",
    short: "An integrated business management suite for growing companies.",
    description:
      "YAADHUM BizSuite replaces disconnected spreadsheets and point tools with one modular platform. Start with the modules you need — CRM, HR, finance, procurement or projects — and add more as you grow, with shared data and real-time dashboards throughout.",
    metrics: [
      { value: "8", label: "integrated business modules" },
      { value: "40%", label: "faster month-end close" },
      { value: "1", label: "source of truth company-wide" },
    ],
    features: [
      { title: "CRM & sales", text: "Leads, pipeline, quotes and customer communication in one place." },
      { title: "HR & payroll", text: "Employee records, attendance, leave, payroll and self-service." },
      { title: "Finance & billing", text: "Invoicing, expenses, multi-currency accounting and tax compliance." },
      { title: "Procurement & inventory", text: "Purchase requests, vendor management and stock control." },
      { title: "Projects & timesheets", text: "Plan work, track time and measure project profitability." },
      { title: "Executive dashboards", text: "Real-time KPIs across sales, people, cash and operations." },
    ],
    modules: ["CRM", "HR", "Payroll", "Finance", "Procurement", "Inventory", "Projects", "Analytics"],
    integrations: ["Microsoft 365", "Google Workspace", "Stripe", "QuickBooks", "Tally", "WhatsApp"],
    deployment: ["SaaS", "Private cloud", "On-premise"],
    idealFor: ["SMEs and mid-market companies", "Professional services firms", "Multi-entity groups"],
    service: "enterprise-solutions",
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
