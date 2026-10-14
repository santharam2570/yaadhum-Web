import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowUpRight, Check, Cloud, Plug, Users } from "lucide-react";
import { ProductCard } from "@/components/cards";
import { Reveal } from "@/components/Reveal";
import { ServiceMock } from "@/components/ServiceMock";
import { DetailSkeleton } from "@/components/Skeletons";
import { Accent, Breadcrumbs, ButtonLink, CtaBand, Eyebrow, PageShell, SectionHeading, industryIcons, productIcons } from "@/components/ui";
import { industries } from "@/data/industries";
import { getProduct, products } from "@/data/products";
import { getService } from "@/data/services";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return { title: `YAADHUM ${product.name} — ${product.category}`, description: product.short };
}

export default function ProductPage({ params }: PageProps<"/products/[slug]">) {
  return (
    <PageShell>
      <Suspense fallback={<DetailSkeleton />}>
        <ProductDetail params={params} />
      </Suspense>
    </PageShell>
  );
}

async function ProductDetail({ params }: { params: PageProps<"/products/[slug]">["params"] }) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const Icon = productIcons[product.slug];
  const service = getService(product.service)!;
  const usedIn = industries.filter((i) => i.products.includes(product.slug));
  const others = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40">
        <div className="pointer-events-none absolute inset-0 grid-lines" />
        <div className="pointer-events-none absolute top-1/4 -left-40 size-[30rem] rounded-full bg-ember-700/25 blur-[140px]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-[1fr_1.05fr] lg:px-8">
          <div className="animate-rise">
            <Breadcrumbs items={[{ href: "/products", label: "Products" }, { label: product.name }]} />
            <div className="mt-8 flex items-center gap-4">
              <span className="grid size-14 place-items-center rounded-2xl bg-fire shadow-xl shadow-ember-700/40">
                <Icon className="size-7 text-white" />
              </span>
              <Eyebrow>{product.category.toUpperCase()}</Eyebrow>
            </div>
            <h1 className="mt-6 font-display text-5xl leading-[0.98] font-bold tracking-tight sm:text-7xl">
              <span className="block font-brand text-2xl tracking-logo text-ember-500 sm:text-3xl">YAADHUM</span>
              {product.name}
            </h1>
            <p className="mt-5 font-serif text-2xl text-gold italic sm:text-3xl">{product.tagline}</p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/65">{product.description}</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <ButtonLink href="/contact?topic=demo">Request a demo</ButtonLink>
              <ButtonLink href="#features" variant="ghost">
                See features
              </ButtonLink>
            </div>
          </div>
          <div className="relative animate-rise [animation-delay:200ms]">
            <div className="pointer-events-none absolute -inset-10 rounded-full bg-ember-600/25 blur-[100px]" />
            <div data-tilt="5" className="relative">
              <ServiceMock slug={product.service} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid overflow-hidden rounded-[2rem] bg-fire sm:grid-cols-3">
          {product.metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 100} className={`p-8 sm:p-10 ${i > 0 ? "border-white/20 max-sm:border-t sm:border-l" : ""}`}>
              <p className="font-display text-5xl font-extrabold text-white sm:text-6xl">{m.value}</p>
              <p className="mt-2 text-white/80">{m.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:py-32 lg:px-8">
        <SectionHeading
          eyebrow="FEATURES"
          title={
            <>
              Everything you need to <Accent>run at scale.</Accent>
            </>
          }
        />
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {product.features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 90}>
              <div className="panel spotlight group h-full p-7">
                <span className="grid size-10 place-items-center rounded-xl bg-ember-500/15 transition group-hover:bg-fire">
                  <Check className="size-5 text-flame transition group-hover:text-white" strokeWidth={3} />
                </span>
                <h3 className="mt-6 font-display text-2xl font-bold">{f.title}</h3>
                <p className="mt-2 leading-relaxed text-cream/60">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-coal py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 lg:grid-cols-3 lg:px-8">
          <Reveal>
            <div className="panel h-full p-8">
              <p className="font-brand text-xs font-bold tracking-logo text-gold">MODULES</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {product.modules.map((m) => (
                  <li key={m} className="rounded-full border border-ember-500/30 bg-ember-500/10 px-3.5 py-1.5 text-sm text-cream/85">
                    {m}
                  </li>
                ))}
              </ul>
              <p className="mt-8 flex items-center gap-2 font-brand text-xs font-bold tracking-logo text-gold">
                <Cloud className="size-4" /> DEPLOYMENT
              </p>
              <p className="mt-3 text-cream/75">{product.deployment.join(" · ")}</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="panel h-full p-8">
              <p className="flex items-center gap-2 font-brand text-xs font-bold tracking-logo text-gold">
                <Plug className="size-4" /> INTEGRATIONS
              </p>
              <ul className="mt-5 grid grid-cols-2 gap-2">
                {product.integrations.map((m) => (
                  <li key={m} className="rounded-xl border border-cream/10 bg-ink/50 px-3 py-3 text-center text-sm text-cream/80">
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="panel h-full p-8">
              <p className="flex items-center gap-2 font-brand text-xs font-bold tracking-logo text-gold">
                <Users className="size-4" /> IDEAL FOR
              </p>
              <ul className="mt-5 space-y-3">
                {product.idealFor.map((m) => (
                  <li key={m} className="flex items-center gap-3 text-cream/80">
                    <Check className="size-4 text-flame" strokeWidth={3} /> {m}
                  </li>
                ))}
              </ul>
              <p className="mt-8 font-brand text-xs font-bold tracking-logo text-gold">POPULAR IN</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {usedIn.map((ind) => {
                  const IIcon = industryIcons[ind.slug];
                  return (
                    <li key={ind.slug}>
                      <Link href={`/industries#${ind.slug}`} className="flex items-center gap-1.5 rounded-full border border-cream/10 px-3 py-1.5 text-xs text-cream/70 transition hover:border-flame hover:text-cream">
                        <IIcon className="size-3.5 text-flame" /> {ind.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <Reveal>
          <Link href={`/services/${service.slug}`} className="panel spotlight group flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center sm:p-10">
            <div>
              <p className="font-brand text-xs font-bold tracking-logo text-gold">IMPLEMENTATION & SUPPORT</p>
              <h2 className="mt-2 font-display text-3xl font-bold">Backed by our {service.label} team</h2>
              <p className="mt-2 max-w-2xl text-cream/60">
                Our specialists handle setup, integration, migration, training and ongoing optimisation, so {product.name} delivers value from the first week.
              </p>
            </div>
            <span className="grid size-14 shrink-0 place-items-center rounded-full border border-cream/15 transition group-hover:border-flame group-hover:bg-fire">
              <ArrowUpRight className="size-6 transition-transform group-hover:rotate-45" />
            </span>
          </Link>
        </Reveal>
      </section>

      <section className="bg-coal py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            align="left"
            eyebrow="MORE PRODUCTS"
            title={
              <>
                Works even better <Accent>together.</Accent>
              </>
            }
          />
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {others.map((p, i) => (
              <Reveal key={p.slug} delay={i * 90}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={
          <>
            See {product.name} <Accent>in action.</Accent>
          </>
        }
        text={`Book a personalised walkthrough of YAADHUM ${product.name} with one of our product specialists — tailored to your systems and goals.`}
      />
    </>
  );
}
