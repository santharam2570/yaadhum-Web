import {
  BrainCircuit,
  Building2,
  CloudCog,
  CodeXml,
  Factory,
  GraduationCap,
  HeartPulse,
  Hotel,
  Landmark,
  Layers,
  Server,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Truck,
  Workflow,
  Headset,
  Store,
  LayoutGrid,
  type LucideIcon,
} from "lucide-react";
import type { SVGProps } from "react";
import type { IndustrySlug } from "@/data/industries";
import type { ProductSlug } from "@/data/products";
import type { ServiceSlug } from "@/data/services";

export const serviceIcons: Record<ServiceSlug, LucideIcon> = {
  "ai-machine-learning": BrainCircuit,
  "software-development": CodeXml,
  "cloud-management": CloudCog,
  "it-infrastructure-amc": Server,
  "process-automation": Workflow,
  ecommerce: ShoppingCart,
  "enterprise-solutions": Layers,
};

export const productIcons: Record<ProductSlug, LucideIcon> = {
  cloudops: CloudCog,
  flowstudio: Workflow,
  cortex: Sparkles,
  servicedesk: Headset,
  commercehub: Store,
  bizsuite: LayoutGrid,
};

export const industryIcons: Record<IndustrySlug, LucideIcon> = {
  "banking-finance": Landmark,
  healthcare: HeartPulse,
  "retail-ecommerce": ShoppingBag,
  manufacturing: Factory,
  logistics: Truck,
  education: GraduationCap,
  "real-estate": Building2,
  hospitality: Hotel,
};

type IconProps = SVGProps<SVGSVGElement>;

export function LinkedInIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

export function XIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z" />
    </svg>
  );
}

export function GitHubIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.1.9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3Z" />
    </svg>
  );
}
