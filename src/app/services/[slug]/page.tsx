import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, X } from "lucide-react";
import { CaseCard } from "@/components/cards";
import { Faq } from "@/components/Faq";
import { Reveal } from "@/components/Reveal";
import { ServiceMock } from "@/components/ServiceMock";
import { DetailSkeleton } from "@/components/Skeletons";
import { Accent, Breadcrumbs, ButtonLink, CtaBand, Eyebrow, Marquee, PageShell, SectionHeading, industryIcons, productIcons, serviceIcons } from "@/components/ui";
import { industries } from "@/data/industries";
import { products } from "@/data/products";
import { caseStudies, processSteps } from "@/data/proof";
import { getService, services } from "@/data/services";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return { title: service.title, description: `${service.headline} ${service.short}` };
}

export default function ServicePage({ params }: PageProps<"/services/[slug]">) {
  return (
    <PageShell>
      <Suspense fallback={<DetailSkeleton />}>
        <ServiceDetail params={params} />
      </Suspense>
    </PageShell>
  );
}

async function ServiceDetail({ params }: { params: PageProps<"/services/[slug]">["params"] }) {
  const service = getService((await params).slug);
  if (!service) notFound();

  const Icon = serviceIcons[service.slug];
  const index = services.indexOf(service);
  const prev = services[(index - 1 + services.length) % services.length];
  const next = services[(index + 1) % services.length];
  const related = caseStudies.filter((c) => c.service === service.slug);
  const product = products.find((p) => p.service === service.slug);
  const relatedIndustries = industries.filter((i) => i.services.includes(service.slug));
  const ProductIcon = product ? productIcons[product.slug] : null;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40">
        <div className="pointer-events-none absolute inset-0 grid-lines" />
        <span aria-hidden className="text-outline pointer-events-none absolute -top-10 -left-8 font-brand text-[11rem] leading-none font-bold whitespace-nowrap select-none sm:text-[18rem]">
          {service.name.toUpperCase()}
        </span>
        <div className="pointer-events-none absolute top-1/3 right-0 size-[30rem] rounded-full bg-ember-700/25 blur-[140px]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-[1fr_1.05fr] lg:px-8">
          <div className="animate-rise">
            <Breadcrumbs items={[{ href: "/services", label: "Services" }, { label: service.label }]} />
            <div className="mt-8 flex items-center gap-4">
              <span className="grid size-14 place-items-center rounded-2xl bg-fire shadow-xl shadow-ember-700/40">
                <Icon className="size-7 text-white" />
              </span>
              <Eyebrow>
                {service.code} — {service.title.toUpperCase()}
              </Eyebrow>
            </div>
            <h1 className="mt-6 font-display text-5xl leading-[0.98] font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl">{service.headline}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/65">{service.description}</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <ButtonLink href="/contact">Discuss your project</ButtonLink>
              <ButtonLink href="#capabilities" variant="ghost">
                What&apos;s included
              </ButtonLink>
            </div>
          </div>
          <div className="relative animate-rise [animation-delay:200ms]">
            <div className="pointer-events-none absolute -inset-10 rounded-full bg-ember-600/25 blur-[100px]" />
            <div data-tilt="5" className="relative">
              <ServiceMock slug={service.slug} />
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid overflow-hidden rounded-[2rem] bg-fire sm:grid-cols-3">
          {service.outcomes.map((o, i) => (
            <Reveal key={o.label} delay={i * 100} className={`relative p-8 sm:p-10 ${i > 0 ? "border-white/20 max-sm:border-t sm:border-l" : ""}`}>
              <p className="font-display text-5xl font-extrabold text-white sm:text-6xl">{o.value}</p>
              <p className="mt-2 text-white/80">{o.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Problems */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:py-32 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            align="left"
            eyebrow="SOUND FAMILIAR?"
            title={
              <>
                The challenges we <Accent>help you solve.</Accent>
              </>
            }
            text="If any of these ring true, the right partner can turn them into a competitive advantage — faster than you might expect."
          />
          <ul className="space-y-4">
            {service.problems.map((p, i) => (
              <Reveal as="li" key={p} delay={i * 100} variant="right">
                <div className="group panel flex items-center gap-5 p-6 sm:p-7">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-ember-500/40 text-ember-400 transition-colors group-hover:bg-fire group-hover:text-white">
                    <X className="size-5" />
                  </span>
                  <p className="font-display text-xl font-semibold text-cream/85 decoration-ember-500 decoration-2 transition-all group-hover:text-cream/40 group-hover:line-through sm:text-2xl">
                    {p}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Capabilities */}
      <section id="capabilities" className="scroll-mt-24 bg-coal py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="CAPABILITIES"
            title={
              <>
                Everything you need, <Accent>nothing you don&apos;t.</Accent>
              </>
            }
          />
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.capabilities.map((c, i) => (
              <Reveal key={c.title} delay={(i % 3) * 90}>
                <div className="panel spotlight group h-full p-7">
                  <span className="font-brand text-sm font-bold text-flame">0{i + 1}</span>
                  <h3 className="mt-6 font-display text-2xl font-bold">{c.title}</h3>
                  <p className="mt-2 leading-relaxed text-cream/60">{c.text}</p>
                  <span className="mt-6 block h-px w-10 bg-fire transition-all duration-500 group-hover:w-full" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="mt-20 border-y border-cream/10 py-6">
          <Marquee items={service.stack} itemClassName="font-display text-3xl font-semibold text-cream/40 sm:text-4xl" />
        </div>
      </section>

      {/* Delivery */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:py-32 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              align="left"
              eyebrow="WHAT YOU GET"
              title={
                <>
                  Clear deliverables, <Accent>no surprises.</Accent>
                </>
              }
            />
            <ul className="mt-10 space-y-3">
              {service.deliverables.map((d, i) => (
                <Reveal as="li" key={d} delay={i * 80}>
                  <div className="flex items-center gap-4 rounded-2xl border border-cream/10 px-5 py-4">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-fire">
                      <Check className="size-4 text-white" strokeWidth={3} />
                    </span>
                    <span className="font-display text-lg font-semibold">{d}</span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2">
            {processSteps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 100}>
                <div className="relative h-full rounded-3xl border border-cream/10 p-7">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-5xl font-extrabold text-cream/10">0{i + 1}</span>
                    <span className="font-brand text-xs font-bold tracking-wider text-gold">{s.duration}</span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/60">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Product + industries */}
      {product && ProductIcon && (
        <section className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal variant="scale">
            <div className="panel relative grid gap-8 overflow-hidden p-8 sm:p-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div className="pointer-events-none absolute -top-24 -left-24 size-80 rounded-full bg-ember-600/20 blur-3xl" />
              <div className="relative">
                <p className="font-brand text-xs font-bold tracking-logo text-gold">ACCELERATE WITH OUR PRODUCT</p>
                <h2 className="mt-3 flex items-center gap-3 font-display text-4xl font-bold">
                  <span className="grid size-12 place-items-center rounded-2xl bg-fire">
                    <ProductIcon className="size-6 text-white" />
                  </span>
                  YAADHUM {product.name}
                </h2>
                <p className="mt-4 max-w-lg text-lg text-cream/60">{product.short}</p>
                <Link href={`/products/${product.slug}`} className="mt-6 inline-flex items-center gap-1.5 font-brand font-bold tracking-wider text-flame hover:text-gold">
                  Explore {product.name} <ArrowUpRight className="size-4" />
                </Link>
              </div>
              <div className="relative">
                <p className="font-brand text-xs font-bold tracking-logo text-cream/45">INDUSTRIES WE SERVE WITH {service.name.toUpperCase()}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {relatedIndustries.map((ind) => {
                    const IIcon = industryIcons[ind.slug];
                    return (
                      <li key={ind.slug}>
                        <Link href={`/industries#${ind.slug}`} className="flex items-center gap-2 rounded-full border border-cream/10 bg-ink/50 px-3.5 py-2 text-sm text-cream/75 transition hover:border-flame hover:text-cream">
                          <IIcon className="size-4 text-flame" /> {ind.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* Related work */}
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-24 sm:py-32 lg:px-8">
          <SectionHeading
            align="left"
            eyebrow="CLIENT OUTCOMES"
            title={
              <>
                {service.name} <Accent>in action.</Accent>
              </>
            }
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {related.map((c, i) => (
              <Reveal key={c.title} delay={i * 100}>
                <CaseCard study={c} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="bg-coal">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:py-32 lg:grid-cols-[0.7fr_1.3fr] lg:px-8">
          <SectionHeading
            align="left"
            eyebrow="FAQ"
            title={
              <>
                Questions, <Accent>answered.</Accent>
              </>
            }
          />
          <Faq items={service.faqs} />
        </div>
      </section>

      {/* Prev / next */}
      <nav aria-label="Other services" className="mx-auto mt-24 grid max-w-7xl gap-4 px-5 sm:grid-cols-2 lg:px-8">
        {[
          { s: prev, dir: "Previous", icon: ArrowLeft },
          { s: next, dir: "Next", icon: ArrowRight },
        ].map(({ s, dir, icon: Arrow }) => {
          const SIcon = serviceIcons[s.slug];
          return (
            <Link
              key={dir}
              href={`/services/${s.slug}`}
              className={`panel spotlight group flex items-center gap-5 p-6 ${dir === "Next" ? "sm:flex-row-reverse sm:text-right" : ""}`}
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-full border border-cream/15 transition group-hover:border-flame group-hover:bg-fire">
                <Arrow className="size-5" />
              </span>
              <span className="flex-1">
                <span className="block font-brand text-xs font-bold tracking-logo text-cream/40">{dir.toUpperCase()} SERVICE</span>
                <span className={`mt-1 flex items-center gap-2 font-display text-xl font-bold sm:text-2xl ${dir === "Next" ? "sm:justify-end" : ""}`}>
                  <SIcon className="size-5 shrink-0 text-flame" /> {s.label}
                </span>
              </span>
            </Link>
          );
        })}
      </nav>

      <CtaBand
        title={
          <>
            Ready to talk <Accent>{service.name}?</Accent>
          </>
        }
        text={`Tell us where you are today and where you want to be. We'll respond within one business day with honest next steps for your ${service.label.toLowerCase()} initiative.`}
      />
    </>
  );
}
