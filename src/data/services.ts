export type ServiceSlug =
  | "ai-machine-learning"
  | "software-development"
  | "cloud-management"
  | "it-infrastructure-amc"
  | "process-automation"
  | "ecommerce"
  | "enterprise-solutions";

export type Service = {
  slug: ServiceSlug;
  code: string;
  name: string;
  label: string;
  title: string;
  verb: string;
  short: string;
  headline: string;
  description: string;
  problems: string[];
  outcomes: { value: string; label: string }[];
  capabilities: { title: string; text: string }[];
  deliverables: string[];
  stack: string[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "ai-machine-learning",
    label: "AI & Machine Learning",
    code: "01",
    name: "AI & ML",
    title: "AI & Machine Learning Development",
    verb: "learns from your data.",
    short: "Production-grade AI, from LLM assistants to predictive models and computer vision.",
    headline: "AI that moves from the demo to the P&L.",
    description:
      "We design, build and operate AI systems that solve measurable business problems — private LLM assistants grounded in your knowledge, document intelligence, forecasting and computer vision. Every model ships with the data pipelines, guardrails and monitoring it needs to stay accurate in production.",
    problems: [
      "AI pilots that never make it past the proof of concept",
      "Teams buried in documents, emails and forms that need reading",
      "Decisions made on last quarter's data instead of tomorrow's forecast",
    ],
    outcomes: [
      { value: "70%", label: "less manual document handling" },
      { value: "6 wks", label: "typical time to a production pilot" },
      { value: "95%+", label: "extraction accuracy targets" },
    ],
    capabilities: [
      { title: "Generative AI & LLM apps", text: "Assistants, copilots and chat experiences grounded in your data with retrieval-augmented generation." },
      { title: "AI agents", text: "Task-completing agents that call your APIs, follow policy and hand off to humans when it matters." },
      { title: "Document intelligence", text: "OCR and LLM pipelines that read invoices, contracts and forms straight into your systems." },
      { title: "Predictive analytics", text: "Demand, churn, risk and revenue forecasting models your planners can actually trust." },
      { title: "Computer vision", text: "Inspection, counting, safety monitoring and visual search on cameras you already own." },
      { title: "MLOps & governance", text: "Model registries, evaluation suites, drift monitoring and audit trails for responsible AI." },
    ],
    deliverables: ["AI opportunity assessment", "Working pilot in weeks", "Evaluation & guardrail suite", "Production deployment & monitoring"],
    stack: ["Python", "PyTorch", "OpenAI", "Azure AI", "AWS Bedrock", "LangChain", "Vector databases", "MLflow"],
    faqs: [
      {
        q: "Is our data safe when we use large language models?",
        a: "Yes. We design for privacy first — private model deployments, data masking, role-based retrieval and zero training on your data unless you explicitly opt in. Everything is logged for audit.",
      },
      {
        q: "We are not sure where AI fits in our business. Can you help?",
        a: "Our two-week AI discovery sprint maps your workflows, scores opportunities by value and feasibility, and ends with a working proof of concept on your own data.",
      },
      {
        q: "Do you build on OpenAI, open-source models, or both?",
        a: "Both. We choose per use case based on accuracy, latency, cost and data-residency needs — and design the system so models can be swapped as the market evolves.",
      },
    ],
  },
  {
    slug: "software-development",
    label: "Custom Software Development",
    code: "02",
    name: "Software",
    title: "Custom Software & Application Development",
    verb: "scales with your ambition.",
    short: "Web, mobile and SaaS products engineered for performance, security and growth.",
    headline: "Software built around how your business really works.",
    description:
      "From customer-facing apps to complex internal platforms, our product engineering teams take ideas from discovery to launch and beyond. We combine product thinking, modern architecture and rigorous quality engineering to deliver software that is fast, secure and easy to evolve.",
    problems: [
      "Off-the-shelf tools that force your team into awkward workarounds",
      "Legacy systems that are slow, fragile and expensive to change",
      "Release cycles measured in months instead of weeks",
    ],
    outcomes: [
      { value: "2×", label: "faster release cadence" },
      { value: "40%", label: "lower maintenance effort after modernisation" },
      { value: "100%", label: "IP and source code ownership" },
    ],
    capabilities: [
      { title: "Web applications", text: "High-performance web platforms and portals built with React, Next.js, Node.js and .NET." },
      { title: "Mobile apps", text: "Native and cross-platform iOS and Android apps with offline support and secure sync." },
      { title: "SaaS product engineering", text: "Multi-tenant architecture, billing, onboarding and analytics for software businesses." },
      { title: "Legacy modernisation", text: "Incremental re-platforming of monoliths to cloud-native services without downtime." },
      { title: "APIs & integrations", text: "Clean, documented APIs that connect CRMs, ERPs, payment gateways and partner systems." },
      { title: "QA & test automation", text: "Automated regression, performance and security testing built into every pipeline." },
    ],
    deliverables: ["Product discovery & UX prototypes", "Solution architecture", "Fortnightly working releases", "Documentation & full code handover"],
    stack: ["TypeScript", "React", "Next.js", "Node.js", ".NET", "Java", "Flutter", "PostgreSQL"],
    faqs: [
      {
        q: "Who owns the source code and intellectual property?",
        a: "You do. Source code, documentation and all intellectual property are transferred to you, and we work in your repositories from day one if you prefer.",
      },
      {
        q: "Can you take over an application built by another vendor?",
        a: "Yes. We begin with a code, architecture and security audit, stabilise the system, then improve it step by step with a clear roadmap.",
      },
      {
        q: "How do you keep projects on time across time zones?",
        a: "Two-week sprints with live demos, a dedicated delivery lead, shared boards and overlapping working hours with your team.",
      },
    ],
  },
  {
    slug: "cloud-management",
    label: "Cloud Management",
    code: "03",
    name: "Cloud",
    title: "Cloud Management & Cloud-Based Solutions",
    verb: "runs in every cloud.",
    short: "Migration, DevOps, FinOps and 24/7 managed cloud across AWS, Azure and Google Cloud.",
    headline: "A cloud that is faster, safer and cheaper to run.",
    description:
      "We plan, migrate, modernise and manage cloud environments on AWS, Microsoft Azure and Google Cloud. Our certified engineers combine infrastructure as code, automated security and continuous cost optimisation so your platform scales smoothly — and your cloud bill doesn't.",
    problems: [
      "Cloud bills that grow faster than revenue",
      "Manual deployments, configuration drift and late-night outages",
      "No single view of security, compliance and cost across accounts",
    ],
    outcomes: [
      { value: "30%", label: "average reduction in cloud spend" },
      { value: "99.95%", label: "availability on managed workloads" },
      { value: "15 min", label: "critical incident response" },
    ],
    capabilities: [
      { title: "Cloud strategy & migration", text: "Assessment, landing zones and phased migrations with rollback plans and zero surprises." },
      { title: "Managed cloud operations", text: "24/7 monitoring, patching, backup and incident response under clear SLAs." },
      { title: "DevOps & CI/CD", text: "Automated pipelines, containers and Kubernetes so teams ship safely, many times a day." },
      { title: "FinOps & cost optimisation", text: "Rightsizing, reserved capacity, tagging and showback dashboards that cut waste." },
      { title: "Cloud security & compliance", text: "Identity, encryption, posture management and audit-ready controls by default." },
      { title: "Serverless & cloud-native", text: "Event-driven architectures and managed services that scale to zero when idle." },
    ],
    deliverables: ["Cloud readiness assessment", "Landing zone & IaC templates", "Migration runbooks", "Monthly cost & health reports"],
    stack: ["AWS", "Microsoft Azure", "Google Cloud", "Kubernetes", "Terraform", "Docker", "GitHub Actions", "Datadog"],
    faqs: [
      {
        q: "Which cloud providers do you support?",
        a: "AWS, Microsoft Azure and Google Cloud, including hybrid and multi-cloud setups. We are vendor-neutral and recommend what fits your workloads and contracts.",
      },
      {
        q: "Can you reduce our existing cloud bill?",
        a: "In most environments, yes. A two-week FinOps review typically identifies 20–40% in savings through rightsizing, commitments, storage tiering and clean-up.",
      },
      {
        q: "Do you offer 24/7 managed cloud support?",
        a: "Yes. Managed cloud plans include round-the-clock monitoring, on-call engineers, defined response times and monthly reporting.",
      },
    ],
  },
  {
    slug: "it-infrastructure-amc",
    label: "IT Infrastructure & AMC",
    code: "04",
    name: "IT & AMC",
    title: "IT Infrastructure Management & AMC Services",
    verb: "never sleeps.",
    short: "Proactive infrastructure management and Annual Maintenance Contracts with guaranteed SLAs.",
    headline: "IT that just works — every day, at every site.",
    description:
      "Our Annual Maintenance Contracts and managed infrastructure services keep servers, networks, end-user devices and business applications healthy. Proactive monitoring, preventive maintenance and a responsive service desk mean fewer outages and predictable IT costs.",
    problems: [
      "Break-fix support that only arrives after something has failed",
      "Unpredictable repair bills and ageing, untracked assets",
      "Branch offices waiting hours or days for basic IT help",
    ],
    outcomes: [
      { value: "60%", label: "fewer unplanned outages" },
      { value: "< 30 min", label: "response for critical tickets" },
      { value: "Fixed", label: "annual cost — no surprise invoices" },
    ],
    capabilities: [
      { title: "Comprehensive & non-comprehensive AMC", text: "Flexible annual contracts covering hardware, software, networks and peripherals." },
      { title: "Network & server management", text: "Firewalls, switches, Wi-Fi, servers and storage — monitored and maintained." },
      { title: "Service desk & remote support", text: "Multi-channel help desk with ticketing, SLAs and escalation paths." },
      { title: "On-site field engineers", text: "Scheduled preventive visits and rapid dispatch for multi-site businesses." },
      { title: "Asset lifecycle management", text: "Inventory, warranty tracking, refresh planning and secure disposal." },
      { title: "Backup & disaster recovery", text: "Tested backup policies and recovery plans that keep the business running." },
    ],
    deliverables: ["Infrastructure health audit", "Asset register & SLA matrix", "Preventive maintenance calendar", "Monthly service reports"],
    stack: ["Microsoft 365", "Windows Server", "Linux", "VMware", "Fortinet", "Cisco", "Intune", "ServiceNow"],
    faqs: [
      {
        q: "What is the difference between comprehensive and non-comprehensive AMC?",
        a: "Comprehensive AMC includes labour and replacement parts; non-comprehensive covers labour and support with parts billed separately. We help you choose based on asset age and risk.",
      },
      {
        q: "Do you support multi-site and international offices?",
        a: "Yes. We combine remote support, monitoring and a partner network for on-site visits, all managed through a single service desk and SLA.",
      },
      {
        q: "Can you take over from our current IT vendor?",
        a: "Absolutely. We run a structured transition — audit, documentation, access hand-over and a stabilisation period — without disrupting your users.",
      },
    ],
  },
  {
    slug: "process-automation",
    label: "Process Automation",
    code: "05",
    name: "Automation",
    title: "Business Process & Intelligent Automation",
    verb: "works while you rest.",
    short: "Workflow automation, RPA and AI agents that remove repetitive work across teams.",
    headline: "Give your people back the hours lost to busywork.",
    description:
      "We find the repetitive, rules-based work slowing your teams down and automate it end to end. Combining workflow platforms, robotic process automation and AI, we build automations that are reliable, auditable and easy for your business users to own.",
    problems: [
      "Skilled people copying data between systems all day",
      "Approvals stuck in inboxes and spreadsheets",
      "Processes that break whenever a key person is on leave",
    ],
    outcomes: [
      { value: "60%", label: "of manual effort automated on average" },
      { value: "4–8 wks", label: "to first automation in production" },
      { value: "< 9 mo", label: "typical payback period" },
    ],
    capabilities: [
      { title: "Process discovery", text: "Workshops and process mining to find and prioritise the highest-value automations." },
      { title: "Robotic process automation", text: "Software robots that work across legacy apps, portals and spreadsheets." },
      { title: "Workflow & approvals", text: "Digital forms, routing and approvals with full audit trails and SLAs." },
      { title: "Intelligent automation", text: "AI that reads, classifies and decides — with humans in the loop for exceptions." },
      { title: "System integration", text: "APIs and iPaaS connectors that keep data flowing between every tool." },
      { title: "Automation CoE", text: "Governance, monitoring and training so your automation programme scales." },
    ],
    deliverables: ["Automation opportunity map", "ROI business case", "Bots & workflows in production", "Runbooks & bot monitoring"],
    stack: ["UiPath", "Power Automate", "n8n", "Python", "Camunda", "Zapier", "Azure Logic Apps", "OpenAI"],
    faqs: [
      {
        q: "Which processes are best suited to automation?",
        a: "High-volume, rules-based and repetitive tasks — invoice processing, onboarding, reconciliations, report generation and data entry are common starting points.",
      },
      {
        q: "Will automation replace our employees?",
        a: "Our goal is to remove repetitive work so your people can focus on customers, judgement and growth. Most clients redeploy saved capacity into higher-value roles.",
      },
      {
        q: "How do you measure the ROI of automation?",
        a: "We baseline volumes, handling time and error rates before we start, then report hours saved, cost avoided and quality improvements every month.",
      },
    ],
  },
  {
    slug: "ecommerce",
    label: "E-commerce Development",
    code: "06",
    name: "E-commerce",
    title: "E-commerce Development & Management",
    verb: "sells around the clock.",
    short: "High-converting storefronts, marketplaces and fully managed e-commerce operations.",
    headline: "Commerce experiences that convert — on every channel.",
    description:
      "We design, build and run e-commerce platforms for D2C brands, retailers and B2B sellers. From headless storefronts and marketplace integrations to payments, logistics and ongoing optimisation, we handle the technology so you can focus on growth.",
    problems: [
      "Slow storefronts and checkouts that lose customers",
      "Inventory and orders out of sync across channels",
      "No in-house team to manage, optimise and scale the store",
    ],
    outcomes: [
      { value: "+35%", label: "average conversion uplift after replatforming" },
      { value: "< 1.5 s", label: "target page load time" },
      { value: "1", label: "unified view of orders and stock" },
    ],
    capabilities: [
      { title: "Storefront development", text: "Shopify, WooCommerce, Magento and custom builds designed to convert." },
      { title: "Headless commerce", text: "Lightning-fast Next.js frontends on top of flexible commerce engines." },
      { title: "B2B & marketplace platforms", text: "Multi-vendor marketplaces, dealer portals, quotes and tiered pricing." },
      { title: "Payments & integrations", text: "Global payment gateways, ERP, shipping and tax integrations." },
      { title: "Managed e-commerce", text: "Catalogue, promotions, performance, security and uptime — managed for you." },
      { title: "Growth & optimisation", text: "CRO, analytics, SEO and personalisation that compound revenue." },
    ],
    deliverables: ["UX & conversion audit", "Storefront & checkout build", "Channel & ERP integrations", "Monthly growth reports"],
    stack: ["Shopify Plus", "WooCommerce", "Magento", "commercetools", "Next.js", "Stripe", "Razorpay", "Algolia"],
    faqs: [
      {
        q: "Should we choose Shopify or a custom/headless build?",
        a: "Shopify is ideal for speed and simplicity; headless suits brands needing unique experiences, complex catalogues or multi-region performance. We recommend after a short discovery.",
      },
      {
        q: "Can you migrate our existing store without losing SEO?",
        a: "Yes. We migrate products, customers and orders and preserve rankings with URL mapping, redirects and structured data validation.",
      },
      {
        q: "Do you offer ongoing store management?",
        a: "Yes — our managed e-commerce plans cover updates, catalogue operations, performance monitoring, security and conversion optimisation.",
      },
    ],
  },
  {
    slug: "enterprise-solutions",
    label: "Enterprise Solutions",
    code: "07",
    name: "Enterprise",
    title: "Enterprise IT Products & Digital Solutions",
    verb: "connects your enterprise.",
    short: "Business suites, data platforms and digital transformation for growing enterprises.",
    headline: "One connected digital backbone for the whole enterprise.",
    description:
      "We help organisations modernise how they operate — implementing business management platforms, unifying data and analytics, and delivering digital transformation programmes that connect people, processes and systems across every department.",
    problems: [
      "Every department running its own disconnected software",
      "Leadership waiting weeks for reliable reports",
      "Digital initiatives that stall without a clear roadmap",
    ],
    outcomes: [
      { value: "40%", label: "faster month-end reporting" },
      { value: "1", label: "source of truth across departments" },
      { value: "Real-time", label: "dashboards for leadership" },
    ],
    capabilities: [
      { title: "Digital transformation consulting", text: "Current-state assessments, target architecture and a prioritised roadmap." },
      { title: "Business management suites", text: "CRM, HR, finance, procurement and inventory on one integrated platform." },
      { title: "Data platforms & BI", text: "Data warehouses, pipelines and dashboards that turn data into decisions." },
      { title: "Enterprise portals", text: "Employee, partner and customer portals with single sign-on and workflows." },
      { title: "Identity & access", text: "SSO, MFA and role-based access across every enterprise application." },
      { title: "Licensing & implementation", text: "Microsoft 365, Zoho and Odoo licensing, rollout and adoption support." },
    ],
    deliverables: ["Digital maturity assessment", "Target architecture & roadmap", "Phased implementation", "Training & adoption programme"],
    stack: ["Microsoft 365", "Power BI", "Odoo", "Zoho", "Snowflake", "dbt", "Okta", "Entra ID"],
    faqs: [
      {
        q: "Do we need to replace all our existing systems?",
        a: "Rarely. We prefer to integrate and extend what works, replacing only the systems that genuinely hold you back.",
      },
      {
        q: "How long does a digital transformation programme take?",
        a: "Most programmes run in 90-day phases. Each phase delivers working capability, so value arrives early rather than at the end.",
      },
      {
        q: "Can you support users after go-live?",
        a: "Yes. Every implementation includes training, documentation and hypercare, with optional long-term support plans.",
      },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
