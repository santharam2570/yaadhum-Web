import type { Metadata } from "next";
import { ArrowUpRight, Briefcase, Headset, Mail, Presentation, Sparkles } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Faq } from "@/components/Faq";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";
import { OfficeCard } from "@/components/Offices";
import { Reveal } from "@/components/Reveal";
import { WorldClocks } from "@/components/WorldClocks";
import { Accent, PageHero, PageShell, SectionHeading } from "@/components/ui";
import { company, offices, regions } from "@/data/company";
import { generalFaqs } from "@/data/proof";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Talk to ${company.name} about AI, software development, cloud management, IT infrastructure, automation or e-commerce. We respond within one business day.`,
};

const channels = [
  { icon: Sparkles, title: "New projects & sales", text: "Discuss a project, request a proposal or get pricing.", email: company.salesEmail },
  { icon: Headset, title: "Client support", text: company.supportHours, email: company.supportEmail },
  { icon: Briefcase, title: "Careers", text: "Questions about open roles or your application.", email: company.careersEmail },
  { icon: Mail, title: "General enquiries", text: "Partnerships, media, analysts and everything else.", email: company.email },
];

const nextSteps = [
  { title: "We reply within one business day", text: "A senior consultant reads every enquiry personally." },
  { title: "30-minute discovery call", text: "We listen, ask the right questions and share initial ideas." },
  { title: "Clear proposal", text: "Scope, timeline, team and transparent pricing — no obligation." },
];

const social = [
  { href: company.social.linkedin, label: "LinkedIn", icon: LinkedInIcon },
  { href: company.social.x, label: "X", icon: XIcon },
  { href: company.social.github, label: "GitHub", icon: GitHubIcon },
];

export default function ContactPage() {
  return (
    <PageShell>
      <PageHero
        index="CONTACT"
        eyebrow="GET IN TOUCH"
        word="HELLO"
        title={
          <>
            Let&apos;s build something <Accent>remarkable.</Accent>
          </>
        }
        text="Tell us about your goals — whether it's an AI initiative, a new application, a cloud migration or managed IT support. Wherever you are in the world, you'll hear back within one business day."
        aside={
          <div className="flex flex-wrap gap-2">
            <a href="/contact?topic=demo#enquiry" className="inline-flex items-center gap-2 rounded-full border border-cream/15 px-4 py-2 text-sm text-cream/75 transition hover:border-flame hover:text-cream">
              <Presentation className="size-4 text-flame" /> Book a product demo
            </a>
            <a href="/contact?topic=amc#enquiry" className="inline-flex items-center gap-2 rounded-full border border-cream/15 px-4 py-2 text-sm text-cream/75 transition hover:border-flame hover:text-cream">
              <Headset className="size-4 text-flame" /> Managed services / AMC
            </a>
          </div>
        }
      />

      <section id="enquiry" className="mx-auto grid max-w-7xl scroll-mt-24 gap-10 px-5 pb-24 lg:grid-cols-[0.8fr_1.4fr] lg:px-8">
        <div className="space-y-8 lg:sticky lg:top-28 lg:self-start">
          <div className="space-y-3">
            <p className="font-brand text-xs font-bold tracking-logo text-cream/45">OUR OFFICES</p>
            {offices.map((o, i) => (
              <Reveal key={o.id} variant="left" delay={i * 80}>
                <OfficeCard office={o} />
              </Reveal>
            ))}
            <p className="flex items-center gap-2 px-1 text-sm text-cream/50">
              <Headset className="size-4 shrink-0 text-flame" /> Support: {company.supportHours}
            </p>
          </div>

          <Reveal>
            <p className="font-brand text-xs font-bold tracking-logo text-cream/45">WHAT HAPPENS NEXT</p>
            <ol className="mt-4 space-y-5 border-l border-ember-500/30 pl-6">
              {nextSteps.map((s, i) => (
                <li key={s.title} className="relative">
                  <span className="absolute top-0.5 -left-[calc(1.5rem+0.8rem)] grid size-6 place-items-center rounded-full bg-fire font-brand text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <p className="font-display font-bold">{s.title}</p>
                  <p className="text-sm text-cream/55">{s.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal>
            <p className="font-brand text-xs font-bold tracking-logo text-cream/45">FOLLOW US</p>
            <div className="mt-3 flex gap-2">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid size-11 place-items-center rounded-full border border-cream/15 text-cream/70 transition hover:border-flame hover:bg-flame/10 hover:text-cream"
                >
                  <s.icon className="size-4" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal variant="right">
          <ContactForm />
        </Reveal>
      </section>

      <section className="bg-coal py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="DIRECT LINES"
            title={
              <>
                Reach the <Accent>right team</Accent> first time.
              </>
            }
          />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {channels.map((c, i) => (
              <Reveal key={c.title} delay={i * 80}>
                <a href={`mailto:${c.email}`} className="panel spotlight group flex h-full flex-col p-6">
                  <span className="grid size-12 place-items-center rounded-2xl bg-ember-500/15 transition group-hover:bg-fire">
                    <c.icon className="size-6 text-flame transition group-hover:text-white" />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-bold">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/55">{c.text}</p>
                  <span className="mt-auto flex items-center justify-between gap-2 pt-6 text-sm font-semibold text-flame">
                    <span className="truncate">{c.email}</span>
                    <ArrowUpRight className="size-4 shrink-0 transition-transform group-hover:rotate-45" />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:py-32 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="GLOBAL PRESENCE"
              title={
                <>
                  Local partners, <Accent>global delivery.</Accent>
                </>
              }
              text="Our head office in Tiruchirappalli, India and our UAE branch in Ajman work alongside client teams in every major time zone, with follow-the-sun coverage for managed services."
            />
            <ul className="mt-10 divide-y divide-cream/10 border-y border-cream/10">
              {regions.map((r) => (
                <li key={r.name} className="flex flex-wrap items-baseline justify-between gap-2 py-4">
                  <span className="font-display text-lg font-bold">{r.name}</span>
                  <span className="text-sm text-cream/55">{r.markets}</span>
                </li>
              ))}
            </ul>
          </div>
          <Reveal className="lg:pt-10">
            <p className="mb-3 font-brand text-xs font-bold tracking-logo text-cream/45">OUR CLOCKS RIGHT NOW</p>
            <WorldClocks />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 border-t border-cream/10 px-5 py-24 sm:py-32 lg:grid-cols-[0.7fr_1.3fr] lg:px-8">
        <SectionHeading
          align="left"
          eyebrow="FAQ"
          title={
            <>
              Common <Accent>questions.</Accent>
            </>
          }
        />
        <Faq items={generalFaqs} />
      </section>
    </PageShell>
  );
}
