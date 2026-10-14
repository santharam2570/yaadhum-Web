export type Office = {
  id: "head-office" | "uae";
  label: string;
  street: string;
  city: string;
  shortCity: string;
  region: string;
  postalCode?: string;
  country: string;
  countryCode: string;
  phone: string;
  hours: string;
  timezone: string;
  lat: number;
  lon: number;
};

export const offices: Office[] = [
  {
    id: "head-office",
    label: "Head Office",
    street: "New Street, 6/75E, Williams Road, Othakadai, Cantonment",
    city: "Tiruchirappalli",
    shortCity: "Trichy",
    region: "Tamil Nadu",
    postalCode: "620001",
    country: "India",
    countryCode: "IN",
    phone: "+91 99527 73417",
    hours: "Monday – Saturday, 09:30 – 18:30 IST",
    timezone: "Asia/Kolkata",
    lat: 10.8,
    lon: 78.69,
  },
  {
    id: "uae",
    label: "UAE Branch",
    street: "Amber Gem Tower, 26th Floor, Sheikh Khalifa Street, Al Rashidiya 3",
    city: "Ajman",
    shortCity: "Ajman",
    region: "Ajman",
    country: "United Arab Emirates",
    countryCode: "AE",
    phone: "+971 55 884 5766",
    hours: "Monday – Friday, 09:00 – 18:00 GST",
    timezone: "Asia/Dubai",
    lat: 25.41,
    lon: 55.45,
  },
];

export const headOffice = offices[0];

export const officeAddress = (o: Office) => [o.street, o.city, [o.region !== o.city && o.region, o.postalCode].filter(Boolean).join(" "), o.country].filter(Boolean).join(", ");

export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

export const postalAddress = (o: Office) => ({
  "@type": "PostalAddress",
  streetAddress: o.street,
  addressLocality: o.city,
  addressRegion: o.region,
  ...(o.postalCode && { postalCode: o.postalCode }),
  addressCountry: o.countryCode,
});

export const mapUrl = (o: Office) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(officeAddress(o))}`;

export const company = {
  name: "YAADHUM International Technologies",
  short: "YAADHUM",
  legalName: "Yaadhum International Technologies",
  tagline: "Intelligent technology. Delivered globally.",
  description:
    "YAADHUM is a global IT services and technology company delivering AI and machine learning, custom software, cloud management, IT infrastructure and AMC, intelligent automation, e-commerce and enterprise digital solutions.",
  url: "https://yaadhum.com",
  founded: 2019,
  email: "hello@yaadhum.com",
  salesEmail: "sales@yaadhum.com",
  supportEmail: "support@yaadhum.com",
  careersEmail: "careers@yaadhum.com",
  phone: headOffice.phone,
  hq: headOffice,
  hours: headOffice.hours,
  supportHours: "24/7 for managed services & AMC clients",
  social: {
    linkedin: "https://www.linkedin.com/company/yaadhum",
    x: "https://x.com/yaadhum",
    github: "https://github.com/yaadhum",
  },
};

export const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/industries", label: "Industries" },
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
  { href: "/blog", label: "Insights" },
] as const;

export const stats = [
  { value: 150, suffix: "+", label: "Projects delivered" },
  { value: 10, suffix: "+", label: "Countries served" },
  { value: 99.9, suffix: "%", label: "Managed uptime SLA", decimals: 1 },
  { value: 24, suffix: "/7", label: "Global support desk" },
];

export type City = { name: string; lat: number; lon: number; hq?: boolean; branch?: boolean };

export const cities: City[] = [
  { name: headOffice.shortCity, lat: headOffice.lat, lon: headOffice.lon, hq: true },
  { name: offices[1].shortCity, lat: offices[1].lat, lon: offices[1].lon, branch: true },
  { name: "Singapore", lat: 1.35, lon: 103.82 },
  { name: "Kuala Lumpur", lat: 3.14, lon: 101.69 },
  { name: "Riyadh", lat: 24.71, lon: 46.68 },
  { name: "London", lat: 51.51, lon: -0.13 },
  { name: "Frankfurt", lat: 50.11, lon: 8.68 },
  { name: "Austin", lat: 30.27, lon: -97.74 },
  { name: "Toronto", lat: 43.65, lon: -79.38 },
  { name: "Sydney", lat: -33.87, lon: 151.21 },
];

export const regions = [
  { name: "North America", markets: "United States · Canada" },
  { name: "Europe & UK", markets: "United Kingdom · Germany · Netherlands" },
  { name: "Middle East", markets: "UAE (Ajman branch) · Saudi Arabia · Qatar" },
  { name: "Asia-Pacific", markets: "Singapore · Malaysia · Australia" },
  { name: "India", markets: "Tiruchirappalli (HQ) · Chennai · Bengaluru · Hyderabad" },
];

export const timezones = [
  { city: headOffice.shortCity, zone: headOffice.timezone },
  { city: offices[1].shortCity, zone: offices[1].timezone },
  { city: "Singapore", zone: "Asia/Singapore" },
  { city: "London", zone: "Europe/London" },
  { city: "Frankfurt", zone: "Europe/Berlin" },
  { city: "New York", zone: "America/New_York" },
];

export const technologies = [
  "AWS",
  "Microsoft Azure",
  "Google Cloud",
  "Kubernetes",
  "Terraform",
  "Python",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  ".NET",
  "Java",
  "Flutter",
  "PyTorch",
  "OpenAI",
  "LangChain",
  "PostgreSQL",
  "MongoDB",
  "Shopify",
  "UiPath",
  "Power Automate",
  "ServiceNow",
];

export const certifications = [
  "ISO 27001-aligned practices",
  "GDPR-ready data handling",
  "AWS & Azure certified engineers",
  "ITIL-based service management",
];
