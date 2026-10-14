import Link from "next/link";
import { ArrowUpRight, BadgeCheck, BrainCircuit, Hand, Handshake, LifeBuoy, ShieldCheck } from "lucide-react";
import { CaseCard, PostCard, ProductCard } from "@/components/cards";
import { CountUp } from "@/components/CountUp";
import { Globe } from "@/components/Globe";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { Reveal } from "@/components/Reveal";
import { ScrollText } from "@/components/ScrollText";
import { ServiceExplorer } from "@/components/ServiceExplorer";
import { Testimonials } from "@/components/Testimonials";
import { TextRotator } from "@/components/TextRotator";
import { WorldClocks } from "@/components/WorldClocks";
import { Accent, ButtonLink, CtaBand, Eyebrow, Marquee, PageShell, SectionHeading, industryIcons, serviceIcons } from "@/components/ui";
import { certifications, regions, stats, technologies } from "@/data/company";
import { industries } from "@/data/industries";
import { products } from "@/data/products";
import { caseStudies } from "@/data/proof";
import { services } from "@/data/services";
import { getAllPosts } from "@/lib/blog";

export default function Home() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-12 lg:min-h-[100svh] lg:pt-36">
        <div className="pointer-events-none absolute inset-0 grid-lines" />
        <div className="pointer-events-none absolute top-1/4 -left-48 size-[34rem] rounded-full bg-ember-700/30 blur-[140px]" />
        <div className="pointer-events-none absolute -right-40 bottom-0 size-[30rem] rounded-full bg-flame/10 blur-[140px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-[1.1fr_1fr] lg:gap-6 lg:px-8">
          <div>
            <div className="animate-rise">
              <Eyebrow>GLOBAL IT SERVICES & TECHNOLOGY PARTNER</Eyebrow>
            </div>
            <h1 className="mt-7 animate-rise font-display text-[2.7rem] leading-[0.98] font-bold tracking-tight [animation-delay:100ms] sm:text-7xl xl:text-[5.2rem]">
              We engineer technology that <TextRotator words={services.map((s) => s.verb)} className="font-serif font-normal tracking-normal text-fire italic" />
            </h1>
            <p className="mt-7 max-w-xl animate-rise text-lg leading-relaxed text-pretty text-cream/65 [animation-delay:200ms]">
              YAADHUM delivers <strong className="font-semibold text-cream">AI & machine learning</strong>,{" "}
              <strong className="font-semibold text-cream">custom software</strong>, <strong className="font-semibold text-cream">cloud management</strong>,{" "}
              <strong className="font-semibold text-cream">managed IT</strong> and <strong className="font-semibold text-cream">intelligent automation</strong> for
              ambitious businesses across five continents.
            </p>
            <div className="mt-9 flex animate-rise flex-wrap gap-4 [animation-delay:300ms]">
              <ButtonLink href="/contact">Start your project</ButtonLink>
              <ButtonLink href="/services" variant="ghost">
                Explore services
              </ButtonLink>
            </div>
            <div className="mt-12 flex animate-rise flex-wrap gap-2 [animation-delay:400ms]">
              {services.map((s) => {
                const Icon = serviceIcons[s.slug];
                return (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="flex items-center gap-2 rounded-full border border-cream/10 bg-ink/40 py-1.5 pr-4 pl-1.5 text-sm text-cream/75 backdrop-blur transition hover:border-flame/60 hover:text-cream"
                  >
                    <span className="grid size-7 place-items-center rounded-full bg-fire">
                      <Icon className="size-3.5 text-white" />
                    </span>
                    {s.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[36rem] animate-rise [animation-delay:250ms]">
            <Globe />
            <div className="pointer-events-none absolute top-[8%] left-0 animate-float sm:left-[2%]">
              <div className="panel !rounded-2xl px-4 py-3">
                <p className="font-brand text-[10px] font-bold tracking-logo text-gold">DELIVERING ACROSS</p>
                <p className="mt-0.5 font-display text-lg font-bold">
                  {regions.length} regions · <span className="text-fire">10+ countries</span>
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute right-0 bottom-[10%] animate-float [animation-delay:2s] sm:right-[2%]">
              <div className="panel flex items-center gap-3 !rounded-2xl px-4 py-3">
                <span className="relative flex size-2.5">
                  <span className="absolute inset-0 animate-ping-slow rounded-full bg-emerald-400" />
                  <span className="relative size-2.5 rounded-full bg-emerald-400" />
                </span>
                <span>
                  <span className="block font-display text-sm font-bold">24/7 managed support</span>
                  <span className="block text-xs text-cream/50">99.9% uptime SLA</span>
                </span>
              </div>
            </div>
            <p className="pointer-events-none absolute -bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1.5 font-brand text-[11px] font-bold tracking-logo text-cream/35">
              <Hand className="size-3.5" /> DRAG TO EXPLORE
            </p>
          </div>
        </div>

        <div className="relative mx-auto mt-14 max-w-7xl px-5 lg:mt-10 lg:px-8">
          <div className="panel grid grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`px-6 py-7 text-center ${i % 2 === 1 ? "border-l border-cream/8" : ""} ${i >= 2 ? "border-t border-cream/8 lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}
              >
                <p className="font-display text-4xl font-extrabold text-fire sm:text-5xl">
                  <CountUp value={s.value} suffix={s.suffix} decimals={s.decimals} />
                </p>
                <p className="mt-1 text-sm tracking-wide text-cream/55">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology marquee */}
      <section aria-label="Technologies we work with" className="border-y border-cream/8 py-8">
        <p className="mb-5 text-center font-brand text-xs font-bold tracking-logo text-cream/40">PLATFORMS & TECHNOLOGIES WE BUILD WITH</p>
        <Marquee items={technologies} itemClassName="font-display text-2xl font-semibold text-cream/35 sm:text-3xl" />
      </section>

      {/* Manifesto */}
      <section className="relative bg-coal py-24 text-white sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.35fr_1fr] lg:px-8">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="font-brand text-xs font-bold tracking-logo text-ember-400">01 — WHO WE ARE</p>
            <p className="mt-4 font-display text-2xl font-semibold text-gold">One partner.</p>
            <p className="mt-1 font-serif text-lg text-white/70 italic">From strategy to support.</p>
          </div>
          <div>
            <ScrollText
              className="font-display text-3xl leading-[1.15] font-semibold tracking-tight sm:text-5xl lg:text-[3.4rem]"
              accentClassName="text-flame"
              segments={[
                { text: "Technology should make a business" },
                { text: "faster, safer and smarter", accent: true },
                { text: "— not more complicated. We design, build and run the AI, software, cloud and IT systems that ambitious companies depend on, and we stay accountable for" },
                { text: "the results.", accent: true },
                { text: "Engineered in India. Trusted around the world." },
              ]}
            />
            <Link href="/about" className="group mt-12 inline-flex items-center gap-3 font-brand text-lg font-bold tracking-wider text-white">
              <span className="grid size-12 place-items-center rounded-full bg-fire text-white transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight className="size-5" />
              </span>
              Discover our story
            </Link>
          </div>
        </div>
      </section>

      {/* Service explorer */}
      <section className="relative mx-auto max-w-7xl px-5 py-24 sm:py-32 lg:px-8">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="02 — WHAT WE DO"
            title={
              <>
                Seven capabilities. <Accent>One accountable partner.</Accent>
              </>
            }
            text="Explore the kind of systems we design, build and operate — live, working software that teams rely on every day."
          />
          <ButtonLink href="/services" variant="ghost">
            All services
          </ButtonLink>
        </div>
        <ServiceExplorer />
      </section>

      {/* Products */}
      <section className="relative overflow-hidden bg-coal py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              align="left"
              eyebrow="03 — PRODUCTS"
              title={
                <>
                  Platforms that put <Accent>expertise into software.</Accent>
                </>
              }
              text="Our enterprise products package years of delivery experience into ready-to-deploy platforms for cloud, automation, AI, IT operations, commerce and business management."
            />
            <ButtonLink href="/products" variant="ghost">
              All products
            </ButtonLink>
          </div>
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 90} className={i === 0 ? "md:col-span-2 lg:col-span-2" : ""}>
                <ProductCard product={p} large={i === 0} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why YAADHUM */}
      <section className="relative py-24 sm:py-32">
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="04 — WHY YAADHUM"
            title={
              <>
                Global standards. <Accent>Personal accountability.</Accent>
              </>
            }
            text="Like the two flowing halves of our logo, we bring deep engineering and a genuinely human partnership together — so your technology keeps delivering, year after year."
          />

          <div className="mt-16 grid auto-rows-[minmax(11rem,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Reveal className="panel spotlight flex flex-col p-7 sm:col-span-2 lg:row-span-2">
              <p className="font-brand text-xs font-bold tracking-logo text-gold">FOLLOW-THE-SUN DELIVERY</p>
              <h3 className="mt-3 font-display text-3xl font-bold sm:text-4xl">We&apos;re working when you are.</h3>
              <p className="mt-3 max-w-md text-cream/60">
                Overlapping hours with North America, Europe, the Middle East and Asia-Pacific — plus a dedicated delivery lead and a 24/7 support desk for managed services.
              </p>
              <div className="mt-auto pt-8">
                <WorldClocks />
              </div>
            </Reveal>

            <Reveal delay={80} className="panel spotlight flex flex-col justify-between p-7">
              <BrainCircuit className="size-9 text-flame" strokeWidth={1.5} />
              <div>
                <h3 className="font-display text-2xl font-bold">AI-first engineering</h3>
                <p className="mt-2 text-sm text-cream/60">Every system we build is designed to be ready for intelligent automation from day one.</p>
              </div>
            </Reveal>

            <Reveal delay={160} className="panel spotlight flex flex-col justify-between p-7">
              <ShieldCheck className="size-9 text-flame" strokeWidth={1.5} />
              <div>
                <h3 className="font-display text-2xl font-bold">Secure by design</h3>
                <p className="mt-2 text-sm text-cream/60">Least-privilege access, encryption, code reviews and audit trails as standard.</p>
              </div>
            </Reveal>

            <Reveal delay={80} className="panel spotlight flex flex-col justify-between p-7">
              <p className="font-brand text-xs font-bold tracking-logo text-cream/45">PROJECTS DELIVERED</p>
              <div>
                <p className="font-display text-6xl font-extrabold text-fire">
                  <CountUp value={150} suffix="+" />
                </p>
                <p className="mt-1 text-cream/60">across 8 industries</p>
              </div>
            </Reveal>

            <Reveal delay={160} className="panel spotlight flex flex-col justify-between p-7">
              <BadgeCheck className="size-9 text-flame" strokeWidth={1.5} />
              <ul className="space-y-1.5 text-sm text-cream/70">
                {certifications.map((c) => (
                  <li key={c} className="flex items-start gap-2">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-flame" /> {c}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={80} className="panel spotlight relative flex flex-col justify-between overflow-hidden p-7 sm:col-span-2">
              <Handshake className="size-9 text-flame" strokeWidth={1.5} />
              <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
                <div className="max-w-sm">
                  <h3 className="font-display text-2xl font-bold sm:text-3xl">Partners long after launch.</h3>
                  <p className="mt-2 text-sm text-cream/60">Training, SLA-backed support and quarterly roadmap reviews. Most clients stay with us for years.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Hypercare", "SLA support", "Roadmaps"].map((t) => (
                    <span key={t} className="rounded-full border border-ember-500/30 bg-ember-500/10 px-3 py-1.5 text-xs text-cream/80">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={160} className="panel spotlight flex flex-col justify-between p-7 sm:col-span-2">
              <LifeBuoy className="size-9 text-flame" strokeWidth={1.5} />
              <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
                <div className="max-w-sm">
                  <h3 className="font-display text-2xl font-bold sm:text-3xl">Inherited a difficult system?</h3>
                  <p className="mt-2 text-sm text-cream/60">We audit, stabilise and modernise platforms other vendors left behind — without stopping your business.</p>
                </div>
                <Link href="/services/software-development" className="inline-flex items-center gap-1.5 font-brand text-sm font-bold tracking-wider text-flame hover:text-gold">
                  Modernisation <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative bg-coal py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            align="left"
            eyebrow="05 — HOW WE DELIVER"
            title={
              <>
                A delivery model built for <Accent>every time zone.</Accent>
              </>
            }
            className="mb-16"
          />
          <ProcessTimeline />
        </div>
      </section>

      {/* Industries */}
      <section className="relative mx-auto max-w-7xl px-5 py-24 sm:py-32 lg:px-8">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="06 — INDUSTRIES"
            title={
              <>
                Fluent in the way <Accent>your industry</Accent> works.
              </>
            }
          />
          <ButtonLink href="/industries" variant="ghost">
            Explore industries
          </ButtonLink>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((ind, i) => {
            const Icon = industryIcons[ind.slug];
            return (
              <Reveal key={ind.slug} delay={(i % 4) * 70}>
                <Link href={`/industries#${ind.slug}`} className="panel spotlight group flex h-full min-h-[13rem] flex-col p-6">
                  <div className="flex items-start justify-between">
                    <Icon className="size-8 text-flame transition-transform duration-500 group-hover:-translate-y-1" strokeWidth={1.5} />
                    <ArrowUpRight className="size-5 text-cream/30 transition group-hover:rotate-45 group-hover:text-flame" />
                  </div>
                  <h3 className="mt-auto pt-6 font-display text-xl leading-tight font-bold">{ind.name}</h3>
                  <p className="mt-2 text-sm text-cream/50">
                    <span className="font-semibold text-gold">{ind.stat.value}</span> {ind.stat.label}
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Case studies */}
      <section className="relative bg-coal py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            align="left"
            eyebrow="07 — CLIENT OUTCOMES"
            title={
              <>
                Results you can <Accent>measure.</Accent>
              </>
            }
            text="A selection of recent engagements. Client names are withheld under confidentiality agreements."
          />
          <div className="no-scrollbar -mx-5 mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0">
            {caseStudies.slice(0, 6).map((c, i) => (
              <Reveal key={c.title} delay={(i % 3) * 100} className="w-[85%] shrink-0 snap-center sm:w-[24rem] lg:w-auto">
                <CaseCard study={c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <span aria-hidden className="text-outline pointer-events-none absolute -bottom-6 -left-4 font-brand text-[7rem] leading-none font-bold select-none sm:text-[11rem]">
          TRUST
        </span>
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.6fr_1.4fr] lg:px-8">
          <div>
            <Eyebrow>08 — CLIENT VOICES</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Trusted by teams <Accent>worldwide.</Accent>
            </h2>
          </div>
          <Testimonials />
        </div>
      </section>

      <LatestInsights />

      <CtaBand />
    </PageShell>
  );
}

async function LatestInsights() {
  const posts = (await getAllPosts()).slice(0, 3);
  return (
    <section className="relative bg-coal py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="09 — INSIGHTS"
            title={
              <>
                Ideas from the <Accent>front line.</Accent>
              </>
            }
            text="Practical thinking on AI, cloud, automation, security and software from our practice leads."
          />
          <ButtonLink href="/blog" variant="ghost">
            Visit the blog
          </ButtonLink>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 100}>
              <PostCard post={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
