import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, ArrowUpRight, Briefcase, CalendarDays, Check, Clock, MapPin, Plus } from "lucide-react";
import { ApplicationForm } from "@/components/careers/ApplicationForm";
import { Reveal } from "@/components/Reveal";
import { ShareButtons } from "@/components/ShareButtons";
import { DetailSkeleton } from "@/components/Skeletons";
import { Accent, Breadcrumbs, ButtonLink, Chip, Eyebrow, PageShell } from "@/components/ui";
import { formatDate } from "@/data/blog";
import { getJob, jobs, perks, type Job } from "@/data/careers";
import { company, postalAddress } from "@/data/company";

export function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: PageProps<"/careers/[slug]">): Promise<Metadata> {
  const job = getJob((await params).slug);
  if (!job) return {};
  return {
    title: `${job.title} — Careers`,
    description: `${job.summary} ${job.location} · ${job.workMode} · ${job.type}.`,
    alternates: { canonical: `/careers/${job.slug}` },
  };
}

export default function JobPage({ params }: PageProps<"/careers/[slug]">) {
  return (
    <PageShell>
      <Suspense fallback={<DetailSkeleton />}>
        <JobDetail params={params} />
      </Suspense>
    </PageShell>
  );
}

const employmentTypes: Record<Job["type"], string> = { "Full-time": "FULL_TIME", Contract: "CONTRACTOR", Internship: "INTERN" };

function jobPostingSchema(job: Job) {
  const validThrough = new Date(`${job.postedAt}T00:00:00Z`);
  validThrough.setUTCDate(validThrough.getUTCDate() + 60);
  const remote = job.workMode === "Remote";
  const regions = job.location.split("—")[1]?.split("/").map((r) => r.trim()).filter((r) => r && r !== "Global") ?? [];

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: [`<p>${job.about}</p>`, `<ul>${job.responsibilities.map((r) => `<li>${r}</li>`).join("")}</ul>`, `<ul>${job.requirements.map((r) => `<li>${r}</li>`).join("")}</ul>`].join(""),
    datePosted: job.postedAt,
    validThrough: validThrough.toISOString().slice(0, 10),
    employmentType: employmentTypes[job.type],
    hiringOrganization: { "@type": "Organization", name: company.name, sameAs: company.url, logo: `${company.url}/logo-mark.jpg` },
    industry: "Information Technology",
    skills: job.skills.join(", "),
    ...(remote
      ? {
          jobLocationType: "TELECOMMUTE",
          ...(regions.length && { applicantLocationRequirements: regions.map((name) => ({ "@type": name === "India" ? "Country" : "AdministrativeArea", name })) }),
        }
      : {
          jobLocation: {
            "@type": "Place",
            address: postalAddress(company.hq),
          },
        }),
  };
}

function ListBlock({ title, items, icon: Icon = Check }: { title: string; items: string[]; icon?: typeof Check }) {
  return (
    <Reveal as="section">
      <h2 className="font-display text-2xl font-bold sm:text-3xl">{title}</h2>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 leading-relaxed text-cream/75">
            <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-ember-500/15">
              <Icon className="size-3 text-flame" strokeWidth={3} />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

async function JobDetail({ params }: { params: PageProps<"/careers/[slug]">["params"] }) {
  const job = getJob((await params).slug);
  if (!job) notFound();

  const similar = jobs.filter((j) => j.slug !== job.slug && j.department === job.department).concat(jobs.filter((j) => j.slug !== job.slug && j.department !== job.department)).slice(0, 3);
  const meta = [
    { icon: MapPin, label: "Location", value: job.location },
    { icon: Briefcase, label: "Employment", value: `${job.type} · ${job.workMode}` },
    { icon: Clock, label: "Experience", value: job.experience },
    { icon: CalendarDays, label: "Posted", value: formatDate(job.postedAt) },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema(job)).replace(/</g, "\\u003c") }} />

      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40">
        <div className="pointer-events-none absolute inset-0 grid-lines" />
        <div className="pointer-events-none absolute top-1/4 -left-40 size-[30rem] rounded-full bg-ember-700/25 blur-[140px]" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <div className="animate-rise">
            <Breadcrumbs items={[{ href: "/careers", label: "Careers" }, { href: "/careers#openings", label: "Open roles" }, { label: job.title }]} />
            <Eyebrow className="mt-8">{job.department.toUpperCase()}</Eyebrow>
            <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[0.98] font-bold tracking-tight text-balance sm:text-7xl">{job.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/65">{job.summary}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ButtonLink href="#apply">Apply now</ButtonLink>
              <ShareButtons url={`${company.url}/careers/${job.slug}`} title={`${job.title} at ${company.short}`} />
            </div>
          </div>
          <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-cream/10 bg-cream/10 lg:grid-cols-4">
            {meta.map((m) => (
              <div key={m.label} className="bg-ink p-5 sm:p-6">
                <dt className="flex items-center gap-2 font-brand text-xs font-bold tracking-logo text-cream/45">
                  <m.icon className="size-4 text-flame" /> {m.label.toUpperCase()}
                </dt>
                <dd className="mt-2 font-semibold text-cream">{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-14 px-5 pb-24 lg:grid-cols-[1.4fr_0.6fr] lg:px-8">
        <div className="space-y-14">
          <Reveal as="section">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">About the role</h2>
            <p className="mt-5 text-lg leading-relaxed text-cream/75">{job.about}</p>
          </Reveal>
          <ListBlock title="What you'll do" items={job.responsibilities} />
          <ListBlock title="What we're looking for" items={job.requirements} />
          {job.niceToHave.length > 0 && <ListBlock title="Nice to have" items={job.niceToHave} icon={Plus} />}
          <Reveal as="section">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">Skills & tools</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {job.skills.map((s) => (
                <Chip key={s} className="!px-4 !py-2 !text-sm">
                  {s}
                </Chip>
              ))}
            </div>
          </Reveal>
          <Reveal as="section">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">What you&apos;ll get</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {perks.map((p) => (
                <div key={p.title} className="rounded-2xl border border-cream/10 p-5">
                  <p className="font-display text-lg font-bold">{p.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-cream/55">{p.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="panel overflow-hidden">
            <div className="bg-fire p-6">
              <p className="font-brand text-xs font-bold tracking-logo text-white/75">READY TO APPLY?</p>
              <p className="mt-2 font-display text-2xl font-bold text-white">It takes about 5 minutes.</p>
            </div>
            <div className="space-y-4 p-6">
              <p className="text-sm leading-relaxed text-cream/60">Have your resume ready (PDF or Word, up to 5 MB). We respond to every application within 10 working days.</p>
              <a href="#apply" className="flex items-center justify-center gap-2 rounded-full bg-fire px-6 py-3 font-brand font-bold tracking-wider text-white">
                Start application <ArrowUpRight className="size-4" />
              </a>
              <p className="text-center text-xs text-cream/45">
                Questions?{" "}
                <a href={`mailto:${company.careersEmail}?subject=${encodeURIComponent(job.title)}`} className="text-flame hover:underline">
                  {company.careersEmail}
                </a>
              </p>
            </div>
          </div>
          <Link href="/careers#openings" className="mt-5 inline-flex items-center gap-2 text-sm text-cream/55 transition hover:text-flame">
            <ArrowLeft className="size-4" /> All open roles
          </Link>
        </aside>
      </section>

      <section id="apply" className="scroll-mt-20 bg-coal py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <div className="mb-10 text-center">
            <Eyebrow>APPLICATION</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Apply for <Accent>{job.title}</Accent>
            </h2>
          </div>
          <ApplicationForm job={{ slug: job.slug, title: job.title }} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Other open roles</h2>
          <Link href="/careers#openings" className="hidden font-brand font-bold tracking-wider text-flame hover:text-gold sm:block">
            View all →
          </Link>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {similar.map((j, i) => (
            <Reveal key={j.slug} delay={i * 90}>
              <Link href={`/careers/${j.slug}`} className="panel spotlight group flex h-full flex-col p-6">
                <p className="font-brand text-xs font-bold tracking-logo text-gold">{j.department.toUpperCase()}</p>
                <h3 className="mt-2 font-display text-xl font-bold transition-colors group-hover:text-flame">{j.title}</h3>
                <p className="mt-auto flex items-center gap-2 pt-6 text-sm text-cream/55">
                  <MapPin className="size-4 text-flame" /> {j.location} · {j.workMode}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
