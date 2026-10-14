export type WorkMode = "On-site" | "Hybrid" | "Remote";
export type EmploymentType = "Full-time" | "Contract" | "Internship";

export type Job = {
  slug: string;
  title: string;
  department: string;
  location: string;
  workMode: WorkMode;
  type: EmploymentType;
  experience: string;
  postedAt: string;
  summary: string;
  about: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  skills: string[];
};

export const jobs: Job[] = [
  {
    slug: "senior-ai-ml-engineer",
    title: "Senior AI / ML Engineer",
    department: "AI & Data",
    location: "Tiruchirappalli, India",
    workMode: "Hybrid",
    type: "Full-time",
    experience: "5+ years",
    postedAt: "2026-10-06",
    summary: "Design and ship production LLM, retrieval and machine learning systems for global enterprise clients.",
    about:
      "You will lead the technical design of AI solutions for clients across finance, logistics and healthcare — from retrieval-augmented assistants to document intelligence and forecasting models. You'll work closely with product, cloud and client teams to take models from prototype to reliable production systems.",
    responsibilities: [
      "Architect and build LLM applications, retrieval pipelines and AI agents for client use cases",
      "Train, fine-tune and evaluate machine learning models on structured and unstructured data",
      "Build evaluation suites, guardrails and monitoring for accuracy, cost and safety",
      "Deploy models on AWS, Azure and private infrastructure with MLOps best practices",
      "Mentor engineers and contribute to our internal AI platform, Cortex AI",
    ],
    requirements: [
      "5+ years of software or ML engineering experience, with 2+ years shipping ML to production",
      "Strong Python and experience with PyTorch, scikit-learn or similar frameworks",
      "Hands-on experience with LLM APIs, embeddings, vector databases and RAG patterns",
      "Solid understanding of data pipelines, APIs and cloud services",
      "Clear communication skills for working directly with international clients",
    ],
    niceToHave: ["Experience with LangChain, LlamaIndex or agent frameworks", "Computer vision or OCR experience", "Publications or open-source contributions"],
    skills: ["Python", "PyTorch", "LLMs", "RAG", "MLOps", "Azure AI"],
  },
  {
    slug: "full-stack-developer",
    title: "Full-Stack Developer (React / Node.js)",
    department: "Engineering",
    location: "Remote — India",
    workMode: "Remote",
    type: "Full-time",
    experience: "3+ years",
    postedAt: "2026-10-02",
    summary: "Build fast, accessible web applications and APIs for SaaS products and enterprise platforms.",
    about:
      "Join a product engineering squad building web platforms used by thousands of people every day. You'll own features end to end — from database schema and APIs to polished, accessible user interfaces — and ship to production every sprint.",
    responsibilities: [
      "Develop features across React/Next.js frontends and Node.js/TypeScript APIs",
      "Design data models and write efficient queries for PostgreSQL and MongoDB",
      "Write automated tests and participate in code reviews",
      "Collaborate with designers, QA and client stakeholders in two-week sprints",
      "Improve performance, accessibility and security of existing applications",
    ],
    requirements: [
      "3+ years building production web applications with React and Node.js",
      "Strong TypeScript, HTML, CSS and REST/GraphQL API skills",
      "Experience with SQL and NoSQL databases",
      "Familiarity with Git, CI/CD and cloud deployment",
    ],
    niceToHave: ["Next.js App Router experience", "Experience with Tailwind CSS", "Exposure to AWS or Azure services"],
    skills: ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL"],
  },
  {
    slug: "cloud-devops-engineer",
    title: "Cloud DevOps Engineer (AWS / Azure)",
    department: "Cloud & Infrastructure",
    location: "Tiruchirappalli, India",
    workMode: "Hybrid",
    type: "Full-time",
    experience: "4+ years",
    postedAt: "2026-09-28",
    summary: "Automate, secure and operate cloud platforms for clients across three continents.",
    about:
      "You'll design landing zones, build CI/CD pipelines, run Kubernetes clusters and help clients cut cloud costs — all with infrastructure as code. You'll also participate in our managed cloud on-call rotation, keeping critical workloads healthy around the clock.",
    responsibilities: [
      "Design and implement cloud architectures on AWS and Azure using Terraform",
      "Build and maintain CI/CD pipelines and container platforms (Docker, Kubernetes)",
      "Implement monitoring, alerting, backup and disaster recovery",
      "Run FinOps reviews and implement cost optimisation recommendations",
      "Respond to incidents and conduct post-incident reviews",
    ],
    requirements: [
      "4+ years in DevOps, SRE or cloud engineering roles",
      "Hands-on experience with AWS and/or Azure in production",
      "Strong Terraform, Linux and scripting (Bash or Python) skills",
      "Experience with Kubernetes and GitHub Actions, GitLab CI or Azure DevOps",
    ],
    niceToHave: ["AWS or Azure professional-level certification", "Experience with Datadog, Prometheus or Grafana", "Security and compliance automation"],
    skills: ["AWS", "Azure", "Terraform", "Kubernetes", "CI/CD"],
  },
  {
    slug: "it-infrastructure-engineer",
    title: "IT Infrastructure Support Engineer (AMC)",
    department: "Cloud & Infrastructure",
    location: "Tiruchirappalli, India",
    workMode: "On-site",
    type: "Full-time",
    experience: "2+ years",
    postedAt: "2026-09-24",
    summary: "Keep client networks, servers and end-user devices running smoothly under our AMC contracts.",
    about:
      "As part of our managed IT team, you'll be the trusted engineer for a portfolio of client sites — performing preventive maintenance, resolving incidents and helping clients plan upgrades. You'll work with modern tooling and have clear paths into cloud and security roles.",
    responsibilities: [
      "Provide L1/L2 support for desktops, laptops, printers and peripherals",
      "Maintain networks, firewalls, Wi-Fi, servers and backup systems",
      "Perform scheduled preventive maintenance visits at client sites",
      "Manage tickets in ServiceDesk and meet SLA commitments",
      "Maintain accurate asset records and documentation",
    ],
    requirements: [
      "2+ years in IT support or infrastructure roles",
      "Working knowledge of Windows Server, Active Directory and Microsoft 365",
      "Networking fundamentals: LAN/WAN, VLANs, DHCP, DNS and VPN",
      "Willingness to travel to client sites within the city",
    ],
    niceToHave: ["CCNA, MCSA or CompTIA certifications", "Experience with Fortinet or Sophos firewalls", "Exposure to Intune or endpoint management"],
    skills: ["Windows Server", "Networking", "Microsoft 365", "ITIL"],
  },
  {
    slug: "automation-developer",
    title: "RPA & Automation Developer",
    department: "Automation",
    location: "Remote — India",
    workMode: "Remote",
    type: "Full-time",
    experience: "3+ years",
    postedAt: "2026-09-20",
    summary: "Build bots and intelligent workflows that remove repetitive work for finance and operations teams.",
    about:
      "You'll partner with business analysts to map processes, then design and build automations using UiPath, Power Automate and our FlowStudio platform — increasingly combined with AI document and decision steps.",
    responsibilities: [
      "Analyse business processes and design automation solutions",
      "Develop, test and deploy RPA bots and workflow automations",
      "Integrate automations with ERPs, CRMs and APIs",
      "Monitor bots in production and handle exceptions and improvements",
      "Document solutions and train client users",
    ],
    requirements: [
      "3+ years building automations with UiPath, Power Automate or Automation Anywhere",
      "Programming experience in C#, Python or JavaScript",
      "Understanding of APIs, databases and Excel/data manipulation",
      "Strong problem-solving and process-mapping skills",
    ],
    niceToHave: ["UiPath Advanced Developer certification", "Experience with AI document processing", "Finance or accounting process knowledge"],
    skills: ["UiPath", "Power Automate", "Python", "APIs"],
  },
  {
    slug: "ecommerce-developer",
    title: "E-commerce Developer (Shopify / Headless)",
    department: "Engineering",
    location: "Remote — Global",
    workMode: "Remote",
    type: "Contract",
    experience: "3+ years",
    postedAt: "2026-09-15",
    summary: "Build high-converting Shopify Plus and headless storefronts for international brands.",
    about:
      "Work with our commerce practice to deliver storefronts, checkout extensions and integrations for D2C and B2B brands in the UK, US and Middle East. This is a 12-month contract with strong potential to convert to full-time.",
    responsibilities: [
      "Develop Shopify themes, apps and checkout extensions",
      "Build headless storefronts with Next.js and the Storefront API",
      "Integrate payments, ERP, search and marketing tools",
      "Optimise performance, Core Web Vitals and conversion",
    ],
    requirements: [
      "3+ years of e-commerce development with Shopify or similar platforms",
      "Strong JavaScript/TypeScript, Liquid and React skills",
      "Experience with REST and GraphQL APIs",
      "Ability to overlap at least four hours with UK time",
    ],
    niceToHave: ["Shopify Plus partner experience", "WooCommerce or Magento experience", "A/B testing and analytics experience"],
    skills: ["Shopify", "Liquid", "Next.js", "GraphQL"],
  },
  {
    slug: "ui-ux-designer",
    title: "Product Designer (UI / UX)",
    department: "Design",
    location: "Tiruchirappalli, India",
    workMode: "Hybrid",
    type: "Full-time",
    experience: "3+ years",
    postedAt: "2026-09-10",
    summary: "Design intuitive enterprise products, dashboards and mobile apps for a global client base.",
    about:
      "You'll shape the experience of complex B2B software — from research and journey mapping to polished interfaces and design systems — working side by side with engineers and clients.",
    responsibilities: [
      "Run user research, workshops and usability testing",
      "Create user flows, wireframes, prototypes and high-fidelity UI",
      "Build and maintain design systems in Figma",
      "Collaborate with engineers to ensure quality implementation",
    ],
    requirements: [
      "3+ years designing web and mobile products",
      "Strong portfolio showing process and outcomes",
      "Expert-level Figma skills",
      "Understanding of accessibility standards (WCAG)",
    ],
    niceToHave: ["Experience designing data-heavy dashboards", "Motion design skills", "Basic HTML/CSS knowledge"],
    skills: ["Figma", "UX research", "Design systems", "Prototyping"],
  },
  {
    slug: "business-development-manager",
    title: "Business Development Manager — International",
    department: "Sales & Partnerships",
    location: "Remote — Middle East / Europe",
    workMode: "Remote",
    type: "Full-time",
    experience: "6+ years",
    postedAt: "2026-09-05",
    summary: "Grow YAADHUM's client base across the Middle East and Europe for IT services and products.",
    about:
      "You'll own new business development in your region — building relationships with CIOs and business leaders, shaping solutions with our delivery teams and closing multi-year engagements across our services and product portfolio.",
    responsibilities: [
      "Identify, qualify and close new IT services and product opportunities",
      "Build long-term relationships with senior client stakeholders",
      "Work with solution architects on proposals and presentations",
      "Represent YAADHUM at industry events and partner meetings",
      "Maintain an accurate pipeline and forecast",
    ],
    requirements: [
      "6+ years of B2B IT services or software sales experience",
      "Proven track record of meeting or exceeding targets",
      "Existing network in the Middle East or European markets",
      "Excellent written and spoken English",
    ],
    niceToHave: ["Arabic or German language skills", "Experience selling cloud or AI services", "Partner ecosystem experience (AWS, Microsoft)"],
    skills: ["Enterprise sales", "Solution selling", "Negotiation", "CRM"],
  },
  {
    slug: "graduate-software-engineer",
    title: "Graduate Software Engineer",
    department: "Early Careers",
    location: "Tiruchirappalli, India",
    workMode: "On-site",
    type: "Full-time",
    experience: "0–1 years",
    postedAt: "2026-08-30",
    summary: "Start your career with a structured six-month programme across software, cloud and AI projects.",
    about:
      "Our graduate programme combines hands-on training, mentorship and real client work. You'll rotate through engineering squads, learn modern tools and practices, and graduate into a permanent role in the practice that suits you best.",
    responsibilities: [
      "Complete structured training in web development, cloud and testing",
      "Contribute to real client projects under the guidance of senior engineers",
      "Write clean, tested code and participate in code reviews",
      "Present your work at sprint demos",
    ],
    requirements: [
      "Degree in Computer Science, IT or a related field (2025 or 2026 graduates)",
      "Solid programming fundamentals in any modern language",
      "Curiosity, a strong work ethic and good communication skills",
    ],
    niceToHave: ["Personal or open-source projects", "Internship experience", "Familiarity with Git"],
    skills: ["JavaScript", "Python", "SQL", "Git"],
  },
];

export const getJob = (slug: string) => jobs.find((j) => j.slug === slug);

export const departments = Array.from(new Set(jobs.map((j) => j.department)));
export const workModes: WorkMode[] = ["On-site", "Hybrid", "Remote"];

export const perks = [
  { title: "Global projects", text: "Work with clients across North America, Europe, the Middle East and Asia-Pacific." },
  { title: "Learning budget", text: "Annual budget for certifications, courses and conferences — plus paid study time." },
  { title: "Flexible work", text: "Hybrid and remote roles with core collaboration hours, not rigid schedules." },
  { title: "Health & wellbeing", text: "Comprehensive health insurance for you and your family, plus wellness days." },
  { title: "Career growth", text: "Clear career frameworks, mentorship and internal mobility across practices." },
  { title: "Modern tooling", text: "Latest hardware, cloud sandboxes and AI tools to help you do your best work." },
];

export const hiringSteps = [
  { title: "Apply", text: "Submit your application and resume. Every application is reviewed by a person, not just a filter." },
  { title: "Intro call", text: "A 30-minute conversation with our talent team about your experience and goals." },
  { title: "Skills session", text: "A practical, role-relevant exercise or technical discussion — no trick questions." },
  { title: "Team interview", text: "Meet the people you'll work with and the leader of your practice." },
  { title: "Offer", text: "We aim to make decisions within 10 working days of your first interview." },
];

export const careerFaqs = [
  {
    q: "Can I apply for more than one role?",
    a: "Yes, but we recommend focusing on the one or two roles that best match your experience. Our talent team will also consider you for other suitable openings.",
  },
  {
    q: "Do you hire internationally?",
    a: "Many roles are open to remote candidates. The location on each job post shows where we can employ people for that role.",
  },
  {
    q: "What if I don't see a role that fits?",
    a: "Send a general application. We regularly hire for new projects and will reach out when a suitable role opens.",
  },
  {
    q: "How long does the hiring process take?",
    a: "Typically two to three weeks from application to offer, depending on scheduling and the role.",
  },
];
