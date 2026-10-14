import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Faq } from "@/components/Faq";
import { ImpactCalculator } from "@/components/ImpactCalculator";
import { Reveal } from "@/components/Reveal";
import { ServiceMock } from "@/components/ServiceMock";
import { Accent, CtaBand, PageHero, PageShell, SectionHeading, serviceIcons } from "@/components/ui";
import { engagementModels, generalFaqs } from "@/data/proof";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "IT Services",
  description:
    "AI & machine learning, custom software development, cloud management, IT infrastructure & AMC, business process automation, e-commerce and enterprise digital solutions.",
};

export default function ServicesPage() {
  return (
    <PageShell>
      <PageHero
        index="SERVICES"
        eyebrow="WHAT WE DO"
        word="BUILD"
        title={
          <>
            End-to-end IT services, <Accent>one accountable team.</Accent>
          </>
        }
        text="From AI strategy and software engineering to cloud operations and 24/7 infrastructure support, our seven practices work as one — so your technology is designed, delivered and run to the same standard."
        aside={
          <ul className="flex flex-wrap gap-2">
            {services.map((s) => (
              <li key={s.slug}>
                <a href={`#${s.slug}`} className="block rounded-full border border-cream/10 px-3 py-1.5 text-xs text-cream/70 transition hover:border-flame hover:text-cream">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        }
      />

      {/* Stacking service cards */}
      <section className="relative mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="space-y-8">
          {services.map((s, i) => {
            const Icon = serviceIcons[s.slug];
            return (
              <article
                key={s.slug}
                id={s.slug}
                className="sticky scroll-mt-28 overflow-hidden rounded-[2rem] border border-ember-500/20 bg-char shadow-[0_-20px_60px_-20px] shadow-black/80"
                style={{ top: `${6.5 + i * 1}rem` }}
              >
                <div className="pointer-events-none absolute -top-32 -right-32 size-96 rounded-full bg-ember-600/15 blur-3xl" />
                <div className="relative grid gap-10 p-7 sm:p-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
                  <div>
                    <div className="flex items-center gap-4">
                      <span className="grid size-14 place-items-center rounded-2xl bg-fire shadow-xl shadow-ember-700/40">
                        <Icon className="size-7 text-white" />
                      </span>
                      <span className="font-brand text-sm font-bold tracking-logo text-cream/40">
                        {s.code} / {String(services.length).padStart(2, "0")}
                      </span>
                    </div>
                    <h2 className="mt-6 font-display text-3xl font-bold tracking-tight sm:text-5xl">{s.title}</h2>
                    <p className="mt-3 font-serif text-2xl text-gold italic">Technology that {s.verb}</p>
                    <p className="mt-5 leading-relaxed text-cream/65">{s.description}</p>
                    <ul className="mt-6 grid gap-2.5 text-sm text-cream/80 sm:grid-cols-2">
                      {s.capabilities.slice(0, 4).map((c) => (
                        <li key={c.title} className="flex gap-2.5">
                          <Check className="mt-0.5 size-4 shrink-0 text-flame" strokeWidth={3} />
                          {c.title}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/services/${s.slug}`}
                      data-magnetic="0.2"
                      className="group mt-8 inline-flex items-center gap-2 rounded-full bg-fire px-6 py-3 font-brand font-bold tracking-wider text-white shadow-lg shadow-ember-700/40"
                    >
                      Explore {s.name}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                  <div className="max-lg:hidden">
                    <ServiceMock slug={s.slug} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ROI calculator */}
      <section className="bg-coal py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="AUTOMATION VALUE ESTIMATOR"
            title={
              <>
                What could automation <Accent>give back to you?</Accent>
              </>
            }
            text="Move the sliders to estimate the hours and value intelligent automation could unlock for your teams each year."
          />
          <Reveal variant="scale" className="mt-14">
            <ImpactCalculator />
          </Reveal>
        </div>
      </section>

      {/* Engagement models */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:py-32 lg:px-8">
        <SectionHeading
          align="left"
          eyebrow="ENGAGEMENT MODELS"
          title={
            <>
              Flexible ways to <Accent>work together.</Accent>
            </>
          }
        />
        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {engagementModels.map((m, i) => (
            <Reveal key={m.title} delay={i * 100}>
              <div className="panel spotlight flex h-full flex-col p-8">
                <span className="font-display text-6xl font-extrabold text-cream/10">0{i + 1}</span>
                <p className="mt-4 font-brand text-xs font-bold tracking-logo text-gold">BEST FOR · {m.bestFor.toUpperCase()}</p>
                <h3 className="mt-2 font-display text-3xl font-bold">{m.title}</h3>
                <p className="mt-3 leading-relaxed text-cream/60">{m.text}</p>
                <ul className="mt-6 space-y-2">
                  {m.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-cream/75">
                      <Check className="size-4 text-flame" strokeWidth={3} /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

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
          <Faq items={generalFaqs} />
        </div>
      </section>

      <CtaBand />
    </PageShell>
  );
}
