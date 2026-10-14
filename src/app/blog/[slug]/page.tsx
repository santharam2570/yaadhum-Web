import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import { ReadingProgress, TableOfContents } from "@/components/blog/ArticleChrome";
import { PostCard, PostCover } from "@/components/cards";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Reveal } from "@/components/Reveal";
import { ShareButtons } from "@/components/ShareButtons";
import { DetailSkeleton } from "@/components/Skeletons";
import { Breadcrumbs, Chip, PageShell, serviceIcons } from "@/components/ui";
import { categoryName, formatDate, type CategorySlug } from "@/data/blog";
import { company } from "@/data/company";
import { getService, type ServiceSlug } from "@/data/services";
import { getAllPosts, getPost, getRelatedPosts } from "@/lib/blog";

export async function generateStaticParams() {
  return (await getAllPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.excerpt, publishedTime: post.date, authors: [post.author], tags: post.tags },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt },
  };
}

export default function ArticlePage({ params }: PageProps<"/blog/[slug]">) {
  return (
    <PageShell>
      <Suspense fallback={<DetailSkeleton />}>
        <Article params={params} />
      </Suspense>
    </PageShell>
  );
}

const relatedService: Record<CategorySlug, ServiceSlug> = {
  ai: "ai-machine-learning",
  cloud: "cloud-management",
  software: "software-development",
  automation: "process-automation",
  cybersecurity: "it-infrastructure-amc",
  infrastructure: "it-infrastructure-amc",
  "emerging-tech": "ai-machine-learning",
};

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

async function Article({ params }: { params: PageProps<"/blog/[slug]">["params"] }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const [all, related] = await Promise.all([getAllPosts(), getRelatedPosts(slug)]);
  const index = all.findIndex((p) => p.slug === slug);
  const newer = index > 0 ? all[index - 1] : undefined;
  const older = index < all.length - 1 ? all[index + 1] : undefined;
  const service = getService(relatedService[post.category])!;
  const ServiceIcon = serviceIcons[service.slug];
  const url = `${company.url}/blog/${post.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: company.name, logo: { "@type": "ImageObject", url: `${company.url}/logo-mark.jpg` } },
    mainEntityOfPage: url,
    keywords: post.tags.join(", "),
    articleSection: categoryName(post.category),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <ReadingProgress target="article-body" />

      <header className="relative overflow-hidden pt-32 sm:pt-40">
        <div className="pointer-events-none absolute inset-0 grid-lines" />
        <div className="pointer-events-none absolute top-1/4 -left-40 size-[30rem] rounded-full bg-ember-700/25 blur-[140px]" />
        <div className="relative mx-auto max-w-4xl px-5 text-center lg:px-8">
          <div className="flex animate-rise justify-center">
            <Breadcrumbs items={[{ href: "/blog", label: "Insights" }, { href: `/blog?category=${post.category}`, label: categoryName(post.category) }, { label: "Article" }]} />
          </div>
          <h1 className="mt-8 animate-rise font-display text-4xl leading-[1.05] font-bold tracking-tight text-balance [animation-delay:100ms] sm:text-6xl">{post.title}</h1>
          <p className="mx-auto mt-6 max-w-2xl animate-rise text-lg leading-relaxed text-pretty text-cream/65 [animation-delay:150ms]">{post.excerpt}</p>
          <div className="mt-8 flex animate-rise flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-cream/55 [animation-delay:200ms]">
            <span className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-fire font-brand text-sm font-bold text-white">{initials(post.author)}</span>
              <span className="text-left">
                <span className="block font-semibold text-cream">{post.author}</span>
                <span className="block text-xs">{post.authorRole}</span>
              </span>
            </span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" /> {post.readingMinutes} min read
            </span>
          </div>
        </div>
        <div className="relative mx-auto mt-14 max-w-6xl px-5 lg:px-8">
          <PostCover category={post.category} large className="aspect-[21/9] min-h-56 animate-rise rounded-[2rem] [animation-delay:250ms]" />
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:py-20 lg:grid-cols-[14rem_minmax(0,1fr)_14rem] lg:px-8 xl:gap-16">
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <TableOfContents headings={post.headings} />
          </div>
        </aside>

        <article id="article-body" className="min-w-0">
          {post.headings.length > 0 && (
            <details className="mb-10 rounded-2xl border border-cream/10 p-5 lg:hidden">
              <summary className="cursor-pointer font-brand text-xs font-bold tracking-logo text-gold">ON THIS PAGE</summary>
              <ul className="mt-4 space-y-2 text-sm">
                {post.headings.map((h) => (
                  <li key={h.id} className={h.depth === 3 ? "pl-4" : ""}>
                    <a href={`#${h.id}`} className="text-cream/65 hover:text-flame">
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          )}

          <div className="article-body" dangerouslySetInnerHTML={{ __html: post.html }} />

          <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-y border-cream/10 py-6">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <Link key={t} href={`/blog?q=${encodeURIComponent(t)}`}>
                  <Chip className="transition hover:border-flame hover:text-cream">#{t}</Chip>
                </Link>
              ))}
            </div>
            <ShareButtons url={url} title={post.title} />
          </div>

          <div className="mt-10 flex gap-5 rounded-3xl border border-cream/10 bg-coal p-6 sm:p-8">
            <span className="grid size-14 shrink-0 place-items-center rounded-full bg-fire font-brand text-lg font-bold text-white">{initials(post.author)}</span>
            <div>
              <p className="font-brand text-xs font-bold tracking-logo text-cream/40">WRITTEN BY</p>
              <p className="mt-1 font-display text-xl font-bold">{post.author}</p>
              <p className="text-sm text-cream/55">{post.authorRole}</p>
              <p className="mt-3 text-sm leading-relaxed text-cream/60">
                Our practitioners share what they learn delivering {categoryName(post.category).toLowerCase()} projects for clients around the world.
              </p>
            </div>
          </div>

          <nav aria-label="More articles" className="mt-10 grid gap-4 sm:grid-cols-2">
            {older ? (
              <Link href={`/blog/${older.slug}`} className="panel group p-6">
                <span className="flex items-center gap-2 font-brand text-xs font-bold tracking-logo text-cream/40">
                  <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" /> PREVIOUS
                </span>
                <span className="mt-2 block font-display font-bold transition-colors group-hover:text-flame">{older.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {newer && (
              <Link href={`/blog/${newer.slug}`} className="panel group p-6 text-right">
                <span className="flex items-center justify-end gap-2 font-brand text-xs font-bold tracking-logo text-cream/40">
                  NEXT <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="mt-2 block font-display font-bold transition-colors group-hover:text-flame">{newer.title}</span>
              </Link>
            )}
          </nav>
        </article>

        <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
          <Link href={`/services/${service.slug}`} className="panel spotlight group block overflow-hidden !p-0">
            <div className="bg-fire p-5">
              <ServiceIcon className="size-7 text-white" />
              <p className="mt-4 font-brand text-[11px] font-bold tracking-logo text-white/75">RELATED SERVICE</p>
              <p className="font-display text-xl font-bold text-white">{service.label}</p>
            </div>
            <div className="p-5">
              <p className="text-sm leading-relaxed text-cream/60">{service.short}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 font-brand text-sm font-bold tracking-wider text-flame">
                Explore <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
              </span>
            </div>
          </Link>
          <div className="panel p-5">
            <p className="font-brand text-[11px] font-bold tracking-logo text-gold">NEWSLETTER</p>
            <p className="mt-1 font-display text-lg font-bold">Monthly insights, no noise.</p>
            <div className="mt-4">
              <NewsletterForm source={`article:${post.slug}`} compact />
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="bg-coal py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex items-end justify-between gap-6">
              <h2 className="font-display text-3xl font-bold sm:text-4xl">Keep reading</h2>
              <Link href="/blog" className="font-brand font-bold tracking-wider text-flame hover:text-gold">
                All insights →
              </Link>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={i * 90}>
                  <PostCard post={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
