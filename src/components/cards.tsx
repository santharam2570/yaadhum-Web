import Link from "next/link";
import { ArrowUpRight, Atom, BrainCircuit, Clock, Cloud, CodeXml, MapPin, Server, ShieldCheck, Workflow, type LucideIcon } from "lucide-react";
import { categoryName, formatDate, type CategorySlug } from "@/data/blog";
import { getService } from "@/data/services";
import type { Product } from "@/data/products";
import type { CaseStudy } from "@/data/proof";
import type { PostMeta } from "@/lib/blog";
import { productIcons, serviceIcons } from "./icons";

const coverStyles: Record<CategorySlug, { icon: LucideIcon; bg: string }> = {
  ai: { icon: BrainCircuit, bg: "bg-[radial-gradient(circle_at_20%_20%,#ff6a2b_0%,#8f0b10_45%,#1a0b0b_100%)]" },
  cloud: { icon: Cloud, bg: "bg-[radial-gradient(circle_at_80%_15%,#f6c27a_0%,#e3221c_40%,#2e0305_100%)]" },
  software: { icon: CodeXml, bg: "bg-[linear-gradient(135deg,#2e0305_0%,#c0141a_55%,#ff8a6b_100%)]" },
  automation: { icon: Workflow, bg: "bg-[radial-gradient(circle_at_70%_80%,#ff4d2e_0%,#5c0609_50%,#110707_100%)]" },
  cybersecurity: { icon: ShieldCheck, bg: "bg-[linear-gradient(160deg,#110707_0%,#5c0609_50%,#e3221c_100%)]" },
  infrastructure: { icon: Server, bg: "bg-[radial-gradient(circle_at_30%_85%,#f6c27a_0%,#c0141a_40%,#1a0b0b_100%)]" },
  "emerging-tech": { icon: Atom, bg: "bg-[conic-gradient(from_200deg_at_70%_40%,#ff6a2b,#8f0b10,#1a0b0b,#e3221c,#ff6a2b)]" },
};

export function PostCover({ category, className = "", large = false }: { category: CategorySlug; className?: string; large?: boolean }) {
  const { icon: Icon, bg } = coverStyles[category];
  return (
    <div className={`relative overflow-hidden ${bg} ${className}`}>
      <div className="absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.06)_1px,transparent_1px)] bg-[size:28px_28px]" />
      <Icon
        aria-hidden
        strokeWidth={0.8}
        className={`absolute text-white/25 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6 ${large ? "-right-8 -bottom-10 size-72" : "-right-6 -bottom-8 size-44"}`}
      />
      <span className="absolute top-4 left-4 rounded-full bg-ink/60 px-3 py-1 font-brand text-[11px] font-bold tracking-logo text-white backdrop-blur">
        {categoryName(category).toUpperCase()}
      </span>
    </div>
  );
}

export function PostCard({ post, priority = false }: { post: PostMeta; priority?: boolean }) {
  return (
    <article className="group panel spotlight flex h-full flex-col overflow-hidden !p-0">
      <Link href={`/blog/${post.slug}`} className="flex h-full flex-col" prefetch={priority || undefined}>
        <PostCover category={post.category} className="aspect-[16/9] rounded-t-[1.45rem]" />
        <div className="flex flex-1 flex-col p-6">
          <p className="flex items-center gap-3 text-xs text-cream/45">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="size-1 rounded-full bg-cream/25" />
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" /> {post.readingMinutes} min read
            </span>
          </p>
          <h3 className="mt-3 font-display text-xl leading-snug font-bold text-balance transition-colors group-hover:text-flame">{post.title}</h3>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-cream/55">{post.excerpt}</p>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-5 font-brand text-sm font-bold tracking-wider text-flame">
            Read article <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
          </span>
        </div>
      </Link>
    </article>
  );
}

export function CaseCard({ study }: { study: CaseStudy }) {
  const service = getService(study.service)!;
  const Icon = serviceIcons[study.service];
  return (
    <article className="panel spotlight group flex h-full flex-col p-7">
      <div className="flex items-center justify-between gap-4">
        <span className="grid size-12 place-items-center rounded-2xl bg-fire shadow-lg shadow-ember-700/40">
          <Icon className="size-6 text-white" />
        </span>
        <span className="flex items-center gap-1.5 text-xs text-cream/45">
          <MapPin className="size-3.5" /> {study.location}
        </span>
      </div>
      <p className="mt-6 font-brand text-xs font-bold tracking-logo text-gold">{service.label.toUpperCase()}</p>
      <h3 className="mt-2 font-display text-2xl font-bold">{study.title}</h3>
      <p className="mt-1 text-sm text-cream/45">{study.client}</p>
      <p className="mt-4 text-sm leading-relaxed text-cream/65">{study.summary}</p>
      <div className="mt-auto pt-6">
        <p className="rounded-2xl border border-flame/25 bg-flame/10 px-4 py-3 font-display text-lg font-bold text-cream">{study.impact}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {study.stack.map((t) => (
            <span key={t} className="rounded-full bg-cream/5 px-2.5 py-1 text-[11px] text-cream/55">
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export function ProductCard({ product, large = false }: { product: Product; large?: boolean }) {
  const Icon = productIcons[product.slug];
  return (
    <Link href={`/products/${product.slug}`} className="panel spotlight group relative flex h-full flex-col overflow-hidden p-7 sm:p-8">
      <div className="pointer-events-none absolute -top-20 -right-20 size-56 rounded-full bg-ember-600/15 blur-3xl transition-opacity duration-500 group-hover:opacity-100 sm:opacity-0" />
      <div className="relative flex items-start justify-between gap-4">
        <span className="grid size-14 place-items-center rounded-2xl bg-fire shadow-lg shadow-ember-700/40 transition-transform duration-500 group-hover:-rotate-6">
          <Icon className="size-7 text-white" />
        </span>
        <span className="rounded-full border border-cream/10 px-3 py-1 font-brand text-[11px] font-bold tracking-logo text-cream/55">{product.category.toUpperCase()}</span>
      </div>
      <p className="relative mt-7 font-brand text-sm font-bold tracking-logo text-ember-500">YAADHUM</p>
      <h3 className={`relative font-display font-bold ${large ? "text-4xl sm:text-5xl" : "text-3xl"}`}>{product.name}</h3>
      <p className={`relative mt-3 leading-relaxed text-cream/60 ${large ? "max-w-md text-lg" : "text-sm"}`}>{product.tagline}</p>
      <div className="relative mt-auto flex items-end justify-between gap-4 pt-8">
        <div>
          <p className="font-display text-3xl font-extrabold text-fire">{product.metrics[0].value}</p>
          <p className="text-xs text-cream/50">{product.metrics[0].label}</p>
        </div>
        <span className="grid size-11 place-items-center rounded-full border border-cream/15 transition group-hover:border-flame group-hover:bg-fire">
          <ArrowUpRight className="size-5 transition-transform duration-500 group-hover:rotate-45" />
        </span>
      </div>
    </Link>
  );
}
