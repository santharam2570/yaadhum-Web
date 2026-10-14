export const categories = [
  { slug: "ai", name: "AI & Machine Learning" },
  { slug: "cloud", name: "Cloud Computing" },
  { slug: "software", name: "Software Development" },
  { slug: "automation", name: "Automation" },
  { slug: "cybersecurity", name: "Cybersecurity" },
  { slug: "infrastructure", name: "IT Infrastructure" },
  { slug: "emerging-tech", name: "Emerging Tech" },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];

export const categoryName = (slug: CategorySlug) => categories.find((c) => c.slug === slug)?.name ?? slug;

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

export const formatDate = (iso: string) => dateFormat.format(new Date(`${iso}T00:00:00Z`));
