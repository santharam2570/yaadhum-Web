import type { ProductSlug } from "./products";
import type { ServiceSlug } from "./services";

export type IndustrySlug =
  | "banking-finance"
  | "healthcare"
  | "retail-ecommerce"
  | "manufacturing"
  | "logistics"
  | "education"
  | "real-estate"
  | "hospitality";

export type Industry = {
  slug: IndustrySlug;
  name: string;
  headline: string;
  text: string;
  challenges: string[];
  solutions: string[];
  stat: { value: string; label: string };
  services: ServiceSlug[];
  products: ProductSlug[];
};

export const industries: Industry[] = [
  {
    slug: "banking-finance",
    name: "Banking & Financial Services",
    headline: "Secure, compliant and always-on financial technology.",
    text: "We help banks, NBFCs, insurers and fintechs modernise customer journeys, automate back-office operations and run secure, compliant cloud infrastructure.",
    challenges: ["Strict regulatory and audit requirements", "Manual KYC and loan processing", "Legacy core systems slowing innovation"],
    solutions: ["KYC & document AI", "Loan and claims automation", "Secure cloud landing zones", "Customer self-service portals"],
    stat: { value: "80%", label: "faster document verification" },
    services: ["ai-machine-learning", "process-automation", "cloud-management"],
    products: ["cortex", "flowstudio", "cloudops"],
  },
  {
    slug: "healthcare",
    name: "Healthcare & Life Sciences",
    headline: "Technology that gives clinicians more time for patients.",
    text: "Patient engagement apps, clinical workflow automation, secure data platforms and reliable IT infrastructure for hospitals, clinics, diagnostics and pharma.",
    challenges: ["Sensitive patient data and privacy rules", "Administrative overload on clinical staff", "Disconnected systems across departments"],
    solutions: ["Patient apps & portals", "Claims and billing automation", "Clinical data platforms", "Managed hospital IT & AMC"],
    stat: { value: "35%", label: "less administrative workload" },
    services: ["software-development", "process-automation", "it-infrastructure-amc"],
    products: ["flowstudio", "servicedesk", "cortex"],
  },
  {
    slug: "retail-ecommerce",
    name: "Retail & E-commerce",
    headline: "Every channel, every store, one customer experience.",
    text: "Storefronts, marketplaces, order management and personalisation for retailers and D2C brands scaling across regions and channels.",
    challenges: ["Inventory out of sync across channels", "Rising customer acquisition costs", "Peak-season traffic and performance"],
    solutions: ["Headless storefronts", "Omnichannel order hubs", "AI product recommendations", "Store IT & POS support"],
    stat: { value: "+35%", label: "online conversion uplift" },
    services: ["ecommerce", "ai-machine-learning", "it-infrastructure-amc"],
    products: ["commercehub", "cortex", "servicedesk"],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing & Industrial",
    headline: "Connected, data-driven operations from shop floor to boardroom.",
    text: "Industrial IoT, computer vision quality inspection, business management platforms and plant IT infrastructure for modern manufacturers.",
    challenges: ["Limited real-time visibility into production", "Manual quality inspection", "Ageing plant IT and OT networks"],
    solutions: ["AI visual inspection", "Production dashboards", "Integrated business suites", "Plant network management"],
    stat: { value: "96%", label: "defect detection accuracy" },
    services: ["ai-machine-learning", "enterprise-solutions", "it-infrastructure-amc"],
    products: ["bizsuite", "cortex", "servicedesk"],
  },
  {
    slug: "logistics",
    name: "Logistics & Transportation",
    headline: "Paperwork that processes itself, shipments you can see.",
    text: "Document AI, tracking platforms, workflow automation and cloud systems for freight forwarders, 3PLs, fleets and warehouses.",
    challenges: ["High volumes of shipping documents", "Poor shipment visibility for customers", "Manual billing and reconciliation"],
    solutions: ["Shipping document AI", "Customer tracking portals", "Automated billing", "Cloud-native TMS integrations"],
    stat: { value: "12k+", label: "documents automated monthly" },
    services: ["ai-machine-learning", "process-automation", "software-development"],
    products: ["cortex", "flowstudio", "cloudops"],
  },
  {
    slug: "education",
    name: "Education & EdTech",
    headline: "Digital learning platforms that scale with every learner.",
    text: "Learning platforms, student portals, campus IT management and cloud infrastructure for universities, schools and EdTech companies.",
    challenges: ["Traffic spikes during exams and admissions", "Fragmented student and staff systems", "Campus device and network support"],
    solutions: ["LMS & learning apps", "Admissions automation", "Campus IT & AMC", "Scalable cloud hosting"],
    stat: { value: "500k+", label: "learner sessions supported" },
    services: ["software-development", "cloud-management", "it-infrastructure-amc"],
    products: ["servicedesk", "flowstudio", "cloudops"],
  },
  {
    slug: "real-estate",
    name: "Real Estate & Construction",
    headline: "From lead to handover, fully digital.",
    text: "Sales CRMs, customer portals, project management and document automation for developers, brokers and construction firms.",
    challenges: ["Leads lost across agents and channels", "Paper-heavy sales and approval processes", "Limited visibility into project costs"],
    solutions: ["Real estate CRM", "Buyer & tenant portals", "Contract automation", "Project cost dashboards"],
    stat: { value: "2×", label: "faster sales follow-up" },
    services: ["enterprise-solutions", "process-automation", "software-development"],
    products: ["bizsuite", "flowstudio", "cortex"],
  },
  {
    slug: "hospitality",
    name: "Hospitality & Travel",
    headline: "Guest experiences that feel personal at any scale.",
    text: "Booking engines, guest apps, revenue analytics and managed IT for hotels, travel operators and restaurant groups.",
    challenges: ["Dependence on third-party booking channels", "Disconnected guest data", "IT downtime affecting guests"],
    solutions: ["Direct booking platforms", "AI guest assistants", "Revenue dashboards", "Property IT management"],
    stat: { value: "+28%", label: "direct bookings" },
    services: ["ecommerce", "ai-machine-learning", "it-infrastructure-amc"],
    products: ["commercehub", "cortex", "servicedesk"],
  },
];
