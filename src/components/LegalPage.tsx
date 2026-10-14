import type { ReactNode } from "react";
import { Breadcrumbs, Eyebrow, PageShell } from "./ui";

export type LegalSection = { id: string; title: string; body: ReactNode };

export function LegalPage({ title, updated, intro, sections }: { title: string; updated: string; intro: ReactNode; sections: LegalSection[] }) {
  return (
    <PageShell>
      <section className="relative overflow-hidden pt-32 pb-12 sm:pt-40">
        <div className="pointer-events-none absolute inset-0 grid-lines" />
        <div className="relative mx-auto max-w-4xl animate-rise px-5 lg:px-8">
          <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: title }]} />
          <Eyebrow className="mt-8">LEGAL</Eyebrow>
          <h1 className="mt-5 font-display text-5xl font-bold tracking-tight sm:text-6xl">{title}</h1>
          <p className="mt-4 text-sm text-cream/45">Last updated: {updated}</p>
          <div className="mt-6 max-w-3xl text-lg leading-relaxed text-cream/65">{intro}</div>
        </div>
      </section>
      <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-24 lg:grid-cols-[14rem_minmax(0,1fr)] lg:px-8">
        <nav aria-label="Sections" className="hidden lg:block">
          <ol className="sticky top-28 space-y-2 border-l border-cream/10 text-sm">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="-ml-px block border-l-2 border-transparent py-1 pl-4 text-cream/55 transition hover:border-flame hover:text-cream">
                  {i + 1}. {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="article-body min-w-0">
          {sections.map((s, i) => (
            <section key={s.id}>
              <h2 id={s.id}>
                {i + 1}. {s.title}
              </h2>
              {s.body}
            </section>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
