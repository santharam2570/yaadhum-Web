import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check, CircleAlert } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Accent, CtaBand, PageHero, PageShell, industryIcons, productIcons, serviceIcons } from "@/components/ui";
import { industries } from "@/data/industries";
import { getProduct } from "@/data/products";
import { caseStudies } from "@/data/proof";
import { getService } from "@/data/services";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "IT services, AI, cloud and automation solutions for banking and finance, healthcare, retail and e-commerce, manufacturing, logistics, education, real estate and hospitality.",
};

export default function IndustriesPage() {
  return (
    <PageShell>
      <PageHero
        index="INDUSTRIES"
        eyebrow="WHO WE SERVE"
        word="SECTORS"
        title={
          <>
            Industry knowledge, <Accent>built into every solution.</Accent>
          </>
        }
        text="We don't learn your business on your budget. Our teams bring proven patterns, compliance awareness and domain vocabulary to every sector we serve."
        aside={
          <div className="flex flex-wrap gap-2">
            {industries.map((ind) => (
              <a key={ind.slug} href={`#${ind.slug}`} className="rounded-full border border-cream/10 px-3 py-1.5 text-sm text-cream/70 transition hover:border-flame hover:text-cream">
                {ind.name}
              </a>
            ))}
          </div>
        }
      />

      <section className="mx-auto max-w-7xl space-y-6 px-5 pb-24 lg:px-8">
        {industries.map((ind, i) => {
          const Icon = industryIcons[ind.slug];
          const caseStudy = caseStudies.find((c) => c.industry === ind.slug);
          const flip = i % 2 === 1;
          return (
            <Reveal key={ind.slug}>
              <article id={ind.slug} className={`panel grid scroll-mt-28 overflow-hidden ${flip ? "lg:grid-cols-[1.15fr_0.85fr]" : "lg:grid-cols-[0.85fr_1.15fr]"}`}>
                <div
                  className={`relative flex min-h-72 flex-col justify-between overflow-hidden p-8 sm:p-10 ${flip ? "lg:order-2" : ""} ${
                    i % 3 === 0 ? "bg-fire" : i % 3 === 1 ? "bg-gradient-to-br from-ember-800 to-ink" : "bg-gradient-to-br from-char to-ember-900"
                  }`}
                >
                  <span aria-hidden className="pointer-events-none absolute -right-6 -bottom-16 font-display text-[14rem] leading-none font-extrabold text-white/10 select-none">
                    0{i + 1}
                  </span>
                  <Icon className="relative size-14 text-white" strokeWidth={1.4} />
                  <div className="relative">
                    <p className="font-brand text-xs font-bold tracking-logo text-white/70">INDUSTRY 0{i + 1}</p>
                    <h2 className="mt-2 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">{ind.name}</h2>
                    <p className="mt-6 inline-flex items-baseline gap-2 rounded-2xl bg-ink/40 px-4 py-2.5 backdrop-blur">
                      <span className="font-display text-2xl font-extrabold text-white">{ind.stat.value}</span>
                      <span className="text-sm text-white/80">{ind.stat.label}</span>
                    </p>
                  </div>
                </div>
                <div className="p-8 sm:p-10">
                  <h3 className="font-serif text-3xl text-gold italic sm:text-4xl">{ind.headline}</h3>
                  <p className="mt-4 leading-relaxed text-cream/65">{ind.text}</p>
                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    <div>
                      <p className="font-brand text-xs font-bold tracking-logo text-cream/40">KEY CHALLENGES</p>
                      <ul className="mt-3 space-y-2">
                        {ind.challenges.map((c) => (
                          <li key={c} className="flex gap-2.5 text-sm text-cream/70">
                            <CircleAlert className="mt-0.5 size-4 shrink-0 text-ember-400" /> {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-brand text-xs font-bold tracking-logo text-cream/40">OUR SOLUTIONS</p>
                      <ul className="mt-3 space-y-2">
                        {ind.solutions.map((s) => (
                          <li key={s} className="flex gap-2.5 text-sm text-cream/85">
                            <Check className="mt-0.5 size-4 shrink-0 text-flame" strokeWidth={3} /> {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-cream/8 pt-6">
                    <span className="mr-2 font-brand text-xs font-bold tracking-logo text-cream/40">SERVICES</span>
                    {ind.services.map((slug) => {
                      const SIcon = serviceIcons[slug];
                      return (
                        <Link key={slug} href={`/services/${slug}`} className="flex items-center gap-1.5 rounded-full bg-ember-500/10 px-3 py-1.5 text-sm text-cream/85 transition hover:bg-fire hover:text-white">
                          <SIcon className="size-3.5" /> {getService(slug)!.name}
                        </Link>
                      );
                    })}
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="mr-2 font-brand text-xs font-bold tracking-logo text-cream/40">PRODUCTS</span>
                    {ind.products.map((slug) => {
                      const PIcon = productIcons[slug];
                      return (
                        <Link key={slug} href={`/products/${slug}`} className="flex items-center gap-1.5 rounded-full border border-cream/10 px-3 py-1.5 text-sm text-cream/75 transition hover:border-flame hover:text-cream">
                          <PIcon className="size-3.5 text-flame" /> {getProduct(slug)!.name}
                        </Link>
                      );
                    })}
                  </div>
                  {caseStudy && (
                    <Link
                      href={`/services/${caseStudy.service}`}
                      className="group mt-6 flex items-center justify-between gap-4 rounded-2xl border border-cream/10 bg-ink/50 p-4 transition hover:border-ember-500/40"
                    >
                      <span>
                        <span className="block font-brand text-[10px] font-bold tracking-logo text-cream/40">CLIENT OUTCOME · {caseStudy.location.toUpperCase()}</span>
                        <span className="mt-0.5 block font-display font-bold">{caseStudy.title}</span>
                      </span>
                      <span className="flex shrink-0 items-center gap-2 text-right font-display text-sm font-bold text-fire sm:text-base">
                        {caseStudy.impact}
                        <ArrowUpRight className="size-4 text-flame transition-transform group-hover:rotate-45" />
                      </span>
                    </Link>
                  )}
                </div>
              </article>
            </Reveal>
          );
        })}
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 rounded-[2rem] border border-dashed border-ember-500/40 p-8 sm:flex-row sm:items-center sm:p-10">
            <div>
              <h2 className="font-display text-3xl font-bold">Don&apos;t see your industry?</h2>
              <p className="mt-2 max-w-xl text-cream/60">
                Energy, telecom, media, professional services, non-profits — the patterns behind great AI, cloud and automation travel well. Let&apos;s talk about yours.
              </p>
            </div>
            <Link href="/contact" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-fire px-6 py-3 font-brand font-bold tracking-wider text-white">
              Tell us about it <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </Reveal>
      </section>

      <CtaBand />
    </PageShell>
  );
}
