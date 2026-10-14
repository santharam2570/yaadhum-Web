import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check, Compass, Eye, Globe2, Target } from "lucide-react";
import { CountUp } from "@/components/CountUp";
import { LogoMark } from "@/components/LogoMark";
import { Reveal } from "@/components/Reveal";
import { Accent, CtaBand, PageHero, PageShell, SectionHeading, serviceIcons } from "@/components/ui";
import { OfficeList } from "@/components/Offices";
import { company, offices, regions, stats } from "@/data/company";
import { engagementModels, processSteps } from "@/data/proof";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "YAADHUM International Technologies is a global IT services and technology company. Learn about our mission, vision, expertise and the way we partner with clients worldwide.",
};

const pillars = [
  {
    icon: Target,
    title: "Mission",
    text: "To help organisations everywhere become faster, safer and smarter by designing, building and running technology that delivers measurable business outcomes.",
  },
  {
    icon: Eye,
    title: "Vision",
    text: "To be the most trusted technology partner for growing enterprises worldwide — known for engineering excellence, honest advice and long-term partnership.",
  },
  {
    icon: Compass,
    title: "Approach",
    text: "Outcome-led, AI-first and security-minded. We start with the business problem, prove value early and stay accountable long after launch.",
  },
];

const markMeaning = [
  { title: "Two flows", text: "The interlocking curves represent technology and people — strategy and engineering — always moving together." },
  { title: "One sphere", text: "The circle is the world we serve: no edges, no borders. Every client receives the same standard of care." },
  { title: "A monogram at the heart", text: "At the centre sits the mark of our name, a reminder that every engagement carries our personal accountability." },
];

const values = [
  { title: "Clients are partners", text: "We treat every business we work with as if it were our own." },
  { title: "Quality without shortcuts", text: "We would rather build it right than build it twice." },
  { title: "Ownership, end to end", text: "From the first workshop to the thousandth support ticket." },
  { title: "Curious by default", text: "We adopt new tools and methods when they genuinely help — not because they are fashionable." },
  { title: "Respect for every culture", text: "Different languages, holidays and ways of working are welcome on every team." },
  { title: "Outcomes over output", text: "We measure success in hours saved, risks reduced and revenue gained." },
];

const facts = [
  { label: "Founded", value: String(company.founded) },
  { label: "Head office", value: `${company.hq.city}, ${company.hq.country}` },
  { label: "UAE branch", value: `${offices[1].city}, ${offices[1].country}` },
  { label: "Delivery model", value: "Onsite · Offshore · Hybrid" },
  { label: "Clients in", value: "10+ countries" },
];

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero
        index="ABOUT"
        eyebrow="WHO WE ARE"
        word="ABOUT"
        title={
          <>
            Global technology. <Accent>Personal partnership.</Accent>
          </>
        }
        text={`${company.name} is an IT services and technology company helping organisations around the world adopt AI, modernise software, run reliable cloud and IT infrastructure, and automate the work that slows them down.`}
      />

      {/* Overview */}
      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <h2 className="font-display text-3xl leading-tight font-bold sm:text-4xl">Company overview</h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-cream/65">
              <p>
                YAADHUM was founded on a simple belief: businesses of every size deserve the kind of technology partner usually reserved for the world&apos;s largest
                enterprises — one that understands strategy, engineers with care and stays accountable for results.
              </p>
              <p>
                Today, our teams deliver AI and machine learning solutions, custom software and mobile applications, cloud migration and managed cloud operations, IT
                infrastructure management and Annual Maintenance Contracts, intelligent automation, e-commerce platforms and enterprise digital solutions. Alongside our
                services, we build our own products for cloud operations, automation, AI, IT service management, commerce and business management.
              </p>
              <p>
                Our name is inspired by a classical idea that every place is home and every person is kin. It reflects how we work: as one global team, treating every
                client with the same care, wherever they are.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120} variant="right">
            <dl className="panel divide-y divide-cream/8">
              {facts.map((f) => (
                <div key={f.label} className="flex items-center justify-between gap-4 px-7 py-5">
                  <dt className="font-brand text-xs font-bold tracking-logo text-cream/45">{f.label.toUpperCase()}</dt>
                  <dd className="text-right font-display text-lg font-bold">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Mission / Vision / Approach */}
      <section className="bg-coal py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 md:grid-cols-3 lg:px-8">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 100} className="h-full">
              <div className="panel spotlight group h-full p-8 sm:p-10">
                <span className="grid size-14 place-items-center rounded-2xl bg-fire shadow-lg shadow-ember-700/40 transition-transform duration-500 group-hover:rotate-6">
                  <p.icon className="size-7 text-white" />
                </span>
                <h3 className="mt-8 font-display text-4xl font-bold">{p.title}</h3>
                <p className="mt-3 text-lg leading-relaxed text-cream/60">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Expertise */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:py-32 lg:px-8">
        <SectionHeading
          align="left"
          eyebrow="OUR EXPERTISE"
          title={
            <>
              Deep capability across the <Accent>modern technology stack.</Accent>
            </>
          }
          text="Seven practices, one integrated team. Because our specialists work together, clients get joined-up solutions instead of disconnected projects."
        />
        <ul className="mt-14 grid border-t border-cream/10 md:grid-cols-2">
          {services.map((s, i) => {
            const Icon = serviceIcons[s.slug];
            return (
              <Reveal as="li" key={s.slug} delay={(i % 2) * 80} className="border-b border-cream/10 md:odd:border-r md:odd:pr-10 md:even:pl-10">
                <Link href={`/services/${s.slug}`} className="group flex items-start gap-5 py-7">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-ember-500/15 transition group-hover:bg-fire">
                    <Icon className="size-6 text-flame transition group-hover:text-white" />
                  </span>
                  <span className="flex-1">
                    <span className="flex items-center justify-between gap-3 font-display text-2xl font-bold">
                      {s.label}
                      <ArrowUpRight className="size-5 shrink-0 text-cream/30 transition group-hover:rotate-45 group-hover:text-flame" />
                    </span>
                    <span className="mt-1 block text-cream/55">{s.short}</span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </section>

      {/* Business approach */}
      <section className="bg-coal py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="HOW WE WORK"
            title={
              <>
                A business approach built on <Accent>clarity and trust.</Accent>
              </>
            }
            text="Every engagement follows a proven four-stage delivery framework, and you choose the commercial model that fits your goals."
          />
          <ol className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {engagementModels.map((m, i) => (
              <Reveal key={m.title} delay={i * 100}>
                <div className="panel spotlight h-full p-8">
                  <p className="font-brand text-xs font-bold tracking-logo text-gold">BEST FOR · {m.bestFor.toUpperCase()}</p>
                  <h3 className="mt-3 font-display text-2xl font-bold">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/60">{m.text}</p>
                  <ul className="mt-5 space-y-2">
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
        </div>
      </section>

      {/* The mark */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:py-32 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <Reveal variant="scale">
            <div className="relative mx-auto grid aspect-square max-w-md place-items-center">
              <LogoMark size={300} orbit className="max-sm:scale-75" />
            </div>
          </Reveal>
          <div>
            <SectionHeading
              align="left"
              eyebrow="OUR BRAND"
              title={
                <>
                  A mark that <Accent>tells our story.</Accent>
                </>
              }
            />
            <ol className="mt-10 space-y-4">
              {markMeaning.map((m, i) => (
                <Reveal as="li" key={m.title} delay={i * 100} variant="right">
                  <div className="panel spotlight flex gap-5 p-6">
                    <span className="font-display text-3xl font-extrabold text-fire">0{i + 1}</span>
                    <div>
                      <h3 className="font-display text-xl font-bold">{m.title}</h3>
                      <p className="mt-1 text-cream/60">{m.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Global presence */}
      <section className="bg-coal py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="GLOBAL REACH"
            title={
              <>
                Serving clients on <Accent>five continents.</Accent>
              </>
            }
            text="Our head office in Tiruchirappalli, India and our UAE branch in Ajman work seamlessly with clients across time zones, supported by remote specialists and trusted local partners."
          />
          <Reveal className="mx-auto mt-16 max-w-4xl">
            <OfficeList />
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {regions.map((r, i) => (
              <Reveal key={r.name} delay={i * 80}>
                <div className="panel spotlight h-full p-6">
                  <Globe2 className="size-7 text-flame" strokeWidth={1.5} />
                  <h3 className="mt-6 font-display text-xl font-bold">{r.name}</h3>
                  <p className="mt-1 text-sm text-cream/55">{r.markets}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:py-32 lg:px-8">
        <SectionHeading
          align="left"
          eyebrow="OUR VALUES"
          title={
            <>
              What we <Accent>stand for.</Accent>
            </>
          }
        />
        <ul className="mt-14 grid border-t border-cream/10 md:grid-cols-2">
          {values.map((v, i) => (
            <Reveal as="li" key={v.title} delay={(i % 2) * 80} className="border-b border-cream/10 md:odd:border-r md:odd:pr-10 md:even:pl-10">
              <div className="group flex gap-6 py-8">
                <span className="font-brand text-sm font-bold text-flame">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-2xl font-bold transition-transform duration-500 group-hover:translate-x-2 sm:text-3xl">{v.title}</h3>
                  <p className="mt-2 text-cream/55">{v.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
        <div className="mt-20 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="border-l-2 border-ember-500 pl-5">
              <p className="font-display text-5xl font-extrabold text-fire">
                <CountUp value={s.value} suffix={s.suffix} decimals={s.decimals} />
              </p>
              <p className="mt-1 text-sm text-cream/55">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand />
    </PageShell>
  );
}
