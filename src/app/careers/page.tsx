import type { Metadata } from "next";
import { BookOpen, Globe2, HeartPulse, Laptop, Sparkles, TrendingUp } from "lucide-react";
import { ApplicationForm } from "@/components/careers/ApplicationForm";
import { JobBoard } from "@/components/careers/JobBoard";
import { Faq } from "@/components/Faq";
import { Reveal } from "@/components/Reveal";
import { Accent, ButtonLink, CtaBand, PageHero, PageShell, SectionHeading } from "@/components/ui";
import { careerFaqs, departments, hiringSteps, jobs, perks } from "@/data/careers";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Careers",
  description: `Join ${company.name}. Explore open roles in AI, software engineering, cloud, infrastructure, automation, design and business development.`,
};

const perkIcons = [Globe2, BookOpen, Laptop, HeartPulse, TrendingUp, Sparkles];

const culture = [
  { value: `${jobs.length}`, label: "Open roles right now" },
  { value: `${departments.length}`, label: "Teams hiring" },
  { value: "40+", label: "Hours of learning per year" },
  { value: "4.6/5", label: "Average employee rating" },
];

export default function CareersPage() {
  return (
    <PageShell>
      <PageHero
        index="CAREERS"
        eyebrow="JOIN YAADHUM"
        word="CAREERS"
        title={
          <>
            Build technology <Accent>the world relies on.</Accent>
          </>
        }
        text="Join a team of engineers, designers and consultants delivering AI, cloud and software solutions for clients across five continents — with the mentorship and freedom to do your best work."
        aside={
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="#openings">View open roles</ButtonLink>
            <ButtonLink href="#apply" variant="ghost">
              General application
            </ButtonLink>
          </div>
        }
      />

      <section className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid grid-cols-2 overflow-hidden rounded-[2rem] border border-cream/10 lg:grid-cols-4">
          {culture.map((c, i) => (
            <Reveal key={c.label} delay={i * 80} className={`p-7 sm:p-9 ${i % 2 ? "border-l border-cream/10" : ""} ${i > 1 ? "max-lg:border-t max-lg:border-cream/10" : ""} ${i === 2 ? "lg:border-l lg:border-cream/10" : ""}`}>
              <p className="font-display text-4xl font-extrabold text-fire sm:text-5xl">{c.value}</p>
              <p className="mt-2 text-sm text-cream/60">{c.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:py-32 lg:px-8">
        <SectionHeading
          eyebrow="WHY WORK WITH US"
          title={
            <>
              Grow faster, <Accent>together.</Accent>
            </>
          }
          text="We invest in people the same way we invest in client outcomes — deliberately, generously and for the long term."
        />
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {perks.map((p, i) => {
            const Icon = perkIcons[i % perkIcons.length];
            return (
              <Reveal key={p.title} delay={(i % 3) * 90}>
                <div className="panel spotlight group h-full p-7">
                  <span className="grid size-12 place-items-center rounded-2xl bg-ember-500/15 transition group-hover:bg-fire">
                    <Icon className="size-6 text-flame transition group-hover:text-white" />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-bold">{p.title}</h3>
                  <p className="mt-2 leading-relaxed text-cream/60">{p.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section id="openings" className="scroll-mt-20 bg-coal py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            align="left"
            eyebrow="OPEN POSITIONS"
            title={
              <>
                Find your <Accent>next role.</Accent>
              </>
            }
            text="Search and filter current openings across our global delivery teams. Every application is read by a real person."
          />
          <div className="mt-12">
            <JobBoard jobs={jobs} departments={departments} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:py-32 lg:px-8">
        <SectionHeading
          eyebrow="HIRING PROCESS"
          title={
            <>
              Clear, respectful <Accent>and fast.</Accent>
            </>
          }
          text="Most candidates go from application to decision in under three weeks."
        />
        <ol className="relative mt-16 grid gap-4 md:grid-cols-5">
          <span aria-hidden className="absolute top-7 right-[10%] left-[10%] hidden h-px bg-gradient-to-r from-ember-500/0 via-ember-500/60 to-ember-500/0 md:block" />
          {hiringSteps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 100} className="relative text-center">
              <span className="relative mx-auto grid size-14 place-items-center rounded-full border border-ember-500/40 bg-ink font-display text-lg font-bold text-flame">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 font-display text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/55">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section id="apply" className="scroll-mt-20 bg-coal py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              align="left"
              eyebrow="GENERAL APPLICATION"
              title={
                <>
                  Don&apos;t see the <Accent>right role?</Accent>
                </>
              }
              text="Send us your profile anyway. We keep strong applications on file and reach out as soon as a matching opportunity opens."
            />
            <p className="mt-8 text-sm text-cream/50">
              Questions about hiring? Email{" "}
              <a href={`mailto:${company.careersEmail}`} className="text-flame underline-offset-4 hover:underline">
                {company.careersEmail}
              </a>
            </p>
          </div>
          <Reveal>
            <ApplicationForm roles={departments} />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-24 sm:py-32 lg:px-8">
        <SectionHeading eyebrow="FAQ" title={<>Candidate questions</>} />
        <div className="mt-12">
          <Faq items={careerFaqs} />
        </div>
      </section>

      <CtaBand
        title={
          <>
            Not job hunting? <Accent>Let&apos;s build together.</Accent>
          </>
        }
        text="If you're here as a client or partner, our team would love to hear about your next project."
      />
    </PageShell>
  );
}
