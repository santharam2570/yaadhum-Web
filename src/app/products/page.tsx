import type { Metadata } from "next";
import { Blocks, Lock, PlugZap, Server } from "lucide-react";
import { ProductCard } from "@/components/cards";
import { ProductSwitcher } from "@/components/ProductSwitcher";
import { Reveal } from "@/components/Reveal";
import { ServiceMock } from "@/components/ServiceMock";
import { Accent, ButtonLink, CtaBand, PageHero, PageShell, SectionHeading } from "@/components/ui";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "YAADHUM enterprise products: CloudOps multi-cloud management, FlowStudio automation, Cortex AI, ServiceDesk ITSM & AMC, CommerceHub and BizSuite business management.",
};

const principles = [
  { icon: Blocks, title: "Built from real delivery", text: "Every product grew out of patterns we implemented repeatedly for clients — so it solves real problems, not imagined ones." },
  { icon: PlugZap, title: "Integrates with your stack", text: "Hundreds of connectors and open APIs for Microsoft 365, Google Workspace, SAP, Salesforce, Shopify and more." },
  { icon: Server, title: "Deploy your way", text: "Run as SaaS, in your private cloud or on-premise, with the same features and support." },
  { icon: Lock, title: "Enterprise-grade security", text: "SSO, role-based access, encryption and audit logs come standard across every product." },
];

export default function ProductsPage() {
  const visuals = Object.fromEntries(products.map((p) => [p.slug, <ServiceMock key={p.slug} slug={p.service} />]));

  return (
    <PageShell>
      <PageHero
        index="PRODUCTS"
        eyebrow="ENTERPRISE PRODUCTS & PLATFORMS"
        word="PLATFORM"
        title={
          <>
            Products that turn expertise into <Accent>everyday advantage.</Accent>
          </>
        }
        text="Six ready-to-deploy platforms for cloud operations, automation, AI, IT service management, commerce and business management — each backed by our implementation and support teams."
        aside={<ButtonLink href="/contact?topic=demo">Request a demo</ButtonLink>}
      />

      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <ProductSwitcher products={products} visuals={visuals} />
      </section>

      <section className="bg-coal py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="THE PORTFOLIO"
            title={
              <>
                One family of products. <Accent>Endless combinations.</Accent>
              </>
            }
            text="Use a single product or combine several — they share identity, data and design, so they work together from day one."
          />
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 90}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:py-32 lg:px-8">
        <SectionHeading
          align="left"
          eyebrow="WHY YAADHUM PRODUCTS"
          title={
            <>
              Software with a <Accent>services team behind it.</Accent>
            </>
          }
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <div className="panel spotlight h-full p-7">
                <p.icon className="size-9 text-flame" strokeWidth={1.5} />
                <h3 className="mt-8 font-display text-xl font-bold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/60">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand
        title={
          <>
            See it on <Accent>your own data.</Accent>
          </>
        }
        text="Book a personalised demo and we'll show you exactly how our products fit your workflows, systems and goals."
      />
    </PageShell>
  );
}
