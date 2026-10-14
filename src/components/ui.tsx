import Link from "next/link";
import { ViewTransition, type ReactNode } from "react";
import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { company } from "@/data/company";

export { serviceIcons, industryIcons, productIcons } from "./icons";

/** Wraps page content so route changes animate with the View Transitions API. */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}

export function Accent({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`font-serif font-normal tracking-normal text-fire italic pr-[0.08em] ${className}`}>{children}</span>;
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 font-brand text-xs font-bold tracking-logo text-flame ${className}`}>
      <span className="relative flex size-2">
        <span className="absolute inset-0 animate-ping-slow rounded-full bg-flame/70" />
        <span className="relative size-2 rounded-full bg-flame" />
      </span>
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "center",
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  text?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <Reveal className={`${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"} ${className}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-5 font-display text-4xl leading-[1.02] font-bold tracking-tight text-balance text-cream sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {text && <p className="mt-6 text-lg leading-relaxed text-pretty text-cream/60">{text}</p>}
    </Reveal>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const base =
    "group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-3.5 font-brand text-base font-bold tracking-wider transition-colors";
  const styles =
    variant === "primary"
      ? "bg-fire text-white shadow-xl shadow-ember-700/40"
      : "border border-cream/20 text-cream hover:border-flame hover:text-flame";
  return (
    <Link href={href} data-magnetic="0.25" className={`${base} ${styles} ${className}`}>
      {variant === "primary" && (
        <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-sheen bg-gradient-to-r from-transparent via-white/35 to-transparent" />
      )}
      <span className="relative">{children}</span>
      <ArrowRight className="relative size-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

export function Breadcrumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-cream/45">
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight className="size-3.5" />}
          {item.href ? (
            <Link href={item.href} className="transition hover:text-flame">
              {item.label}
            </Link>
          ) : (
            <span aria-current="page" className="text-cream/80">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function Chip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`rounded-full border border-cream/10 px-3 py-1 text-xs text-cream/65 ${className}`}>{children}</span>;
}

export function PageHero({
  eyebrow,
  title,
  text,
  index,
  word,
  aside,
}: {
  eyebrow: string;
  title: ReactNode;
  text: ReactNode;
  index: string;
  word?: string;
  aside?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-36 pb-16 sm:pt-44">
      <div className="pointer-events-none absolute inset-0 grid-lines" />
      {word ? (
        <span
          aria-hidden
          className="text-outline pointer-events-none absolute -top-6 -right-6 font-brand text-[9rem] leading-none font-bold tracking-tight select-none sm:text-[14rem] lg:text-[18rem]"
        >
          {word}
        </span>
      ) : (
        <Swirl className="pointer-events-none absolute -top-24 -right-24 w-[34rem] animate-spin-slow opacity-[0.07]" />
      )}
      <div className="pointer-events-none absolute top-1/3 -left-40 size-[28rem] rounded-full bg-ember-700/25 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_0.7fr] lg:items-end">
          <div className="animate-rise">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="mt-6 font-display text-5xl leading-[0.98] font-bold tracking-tight text-balance sm:text-7xl lg:text-[5.5rem]">
              {title}
            </h1>
          </div>
          <div className="animate-rise [animation-delay:150ms]">
            <p className="text-lg leading-relaxed text-pretty text-cream/65">{text}</p>
            {aside && <div className="mt-6">{aside}</div>}
          </div>
        </div>
        <div className="mt-16 flex items-center gap-5 font-brand text-xs font-bold tracking-logo text-cream/40">
          <span className="text-flame">/{index}</span>
          <span className="h-px flex-1 bg-gradient-to-r from-ember-500/50 via-cream/10 to-transparent" />
          <span>SCROLL</span>
        </div>
      </div>
    </section>
  );
}

/** The two interlocking teardrop curves from the logo, as a decorative backdrop. */
export function Swirl({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" fill="none" aria-hidden className={className}>
      <defs>
        <linearGradient id="swirl-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff6a2b" />
          <stop offset="0.55" stopColor="#e3221c" />
          <stop offset="1" stopColor="#2e0305" />
        </linearGradient>
        <linearGradient id="swirl-b" x1="1" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#ff4d2e" />
          <stop offset="0.6" stopColor="#8f0b10" />
          <stop offset="1" stopColor="#1a0b0b" />
        </linearGradient>
      </defs>
      <path d="M120 60c48 0 70 60 70 130s30 120 60 150c-60 10-150-40-170-130S70 60 120 60Z" fill="url(#swirl-a)" />
      <path d="M280 340c-48 0-70-60-70-130s-30-120-60-150c60-10 150 40 170 130s10 150-40 150Z" fill="url(#swirl-b)" />
    </svg>
  );
}

export function Marquee({
  items,
  reverse = false,
  className = "",
  itemClassName = "",
}: {
  items: string[];
  reverse?: boolean;
  className?: string;
  itemClassName?: string;
}) {
  return (
    <div className={`relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)] ${className}`}>
      <div className={`flex w-max shrink-0 items-center ${reverse ? "animate-marquee-reverse" : "animate-marquee"} hover:[animation-play-state:paused]`}>
        {[...items, ...items].map((m, i) => (
          <span key={i} aria-hidden={i >= items.length} className={`flex items-center gap-8 pr-8 whitespace-nowrap ${itemClassName}`}>
            {m}
            <svg viewBox="0 0 24 24" className="size-4 shrink-0 text-ember-500" fill="currentColor" aria-hidden>
              <path d="M12 0c1 6 6 11 12 12-6 1-11 6-12 12-1-6-6-11-12-12C6 11 11 6 12 0Z" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}

/** Circular CTA with text orbiting the edge. */
export function RoundBadge({ href, text, className = "" }: { href: string; text: string; className?: string }) {
  return (
    <Link
      href={href}
      data-magnetic="0.35"
      aria-label={text}
      className={`group relative grid size-36 shrink-0 place-items-center rounded-full bg-ink text-cream sm:size-44 ${className}`}
    >
      <svg viewBox="0 0 200 200" className="absolute inset-0 animate-spin-slow" aria-hidden>
        <defs>
          <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text className="fill-cream/80 font-brand text-[16px] font-bold">
          <textPath href="#badge-circle" textLength={486} lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <span className="grid size-16 place-items-center rounded-full bg-fire transition-transform duration-500 group-hover:scale-110 sm:size-20">
        <ArrowUpRight className="size-7 text-white transition-transform duration-500 group-hover:rotate-45" />
      </span>
    </Link>
  );
}

export function CtaBand({
  title = (
    <>
      Let&apos;s build <Accent>what&apos;s next</Accent> — together.
    </>
  ),
  text = "Whether you are in New York, London, Dubai or Singapore, the first consultation is free and the advice is honest. Tell us what you're working on.",
}: {
  title?: ReactNode;
  text?: string;
}) {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <Reveal variant="scale">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-fire px-7 py-14 sm:px-14 sm:py-20">
          <Swirl className="pointer-events-none absolute -right-24 -bottom-32 w-[30rem] opacity-30 mix-blend-multiply" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_15%,rgba(255,243,223,0.4),transparent_45%)]" />
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-6 left-6 font-brand text-[7rem] leading-none font-bold tracking-tight whitespace-nowrap text-white/10 select-none sm:text-[10rem]"
          >
            YAADHUM
          </span>
          <div className="relative flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl leading-[1.02] font-bold tracking-tight text-white sm:text-6xl [&_.text-fire]:text-white [&_.text-fire]:[background:none]">
                {title}
              </h2>
              <p className="mt-6 max-w-xl text-lg text-white/85">{text}</p>
              <a href={`mailto:${company.email}`} className="mt-6 inline-flex items-center gap-2 font-brand font-bold tracking-wider text-white underline-offset-4 hover:underline">
                {company.email} <ArrowUpRight className="size-4" />
              </a>
            </div>
            <RoundBadge href="/contact" text="START A PROJECT • START A PROJECT • " />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
