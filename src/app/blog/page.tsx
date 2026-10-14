import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock, Rss } from "lucide-react";
import { BlogExplorer } from "@/components/blog/BlogExplorer";
import { PostCover } from "@/components/cards";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Reveal } from "@/components/Reveal";
import { Accent, PageHero, PageShell } from "@/components/ui";
import { categoryName, formatDate } from "@/data/blog";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Insights — Technology Blog",
  description:
    "Expert articles on artificial intelligence, cloud computing, software development, automation, cybersecurity and emerging technology from the YAADHUM team.",
  alternates: { canonical: "/blog", types: { "application/rss+xml": "/blog/rss.xml" } },
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p.slug !== featured?.slug);

  return (
    <PageShell>
      <PageHero
        index="INSIGHTS"
        eyebrow="THE YAADHUM BLOG"
        word="INSIGHTS"
        title={
          <>
            Ideas that move <Accent>technology forward.</Accent>
          </>
        }
        text="Practical perspectives on AI, cloud, software engineering, automation and cybersecurity — written by the engineers and consultants who deliver them."
        aside={
          <a href="/blog/rss.xml" className="inline-flex items-center gap-2 text-sm font-semibold text-flame hover:text-gold">
            <Rss className="size-4" /> Subscribe via RSS
          </a>
        }
      />

      {featured && (
        <section className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <Link href={`/blog/${featured.slug}`} className="panel spotlight group grid overflow-hidden !p-0 lg:grid-cols-[1.1fr_0.9fr]">
              <PostCover category={featured.category} large className="min-h-72 lg:min-h-[26rem]" />
              <div className="flex flex-col p-8 sm:p-12">
                <p className="font-brand text-xs font-bold tracking-logo text-gold">FEATURED · {categoryName(featured.category).toUpperCase()}</p>
                <h2 className="mt-4 font-display text-3xl leading-tight font-bold text-balance transition-colors group-hover:text-flame sm:text-4xl">{featured.title}</h2>
                <p className="mt-4 leading-relaxed text-cream/60">{featured.excerpt}</p>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-8">
                  <div className="text-sm">
                    <p className="font-semibold text-cream">{featured.author}</p>
                    <p className="flex items-center gap-2 text-cream/45">
                      <time dateTime={featured.date}>{formatDate(featured.date)}</time> · <Clock className="size-3.5" /> {featured.readingMinutes} min read
                    </p>
                  </div>
                  <span className="grid size-12 place-items-center rounded-full border border-cream/15 transition group-hover:border-flame group-hover:bg-fire">
                    <ArrowUpRight className="size-5 transition-transform group-hover:rotate-45" />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-5 py-20 sm:py-24 lg:px-8">
        <BlogExplorer posts={rest} />
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-fire p-8 sm:p-14">
            <span aria-hidden className="pointer-events-none absolute -right-10 -bottom-20 font-brand text-[12rem] leading-none font-bold text-white/10 select-none">
              NEWS
            </span>
            <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="font-brand text-xs font-bold tracking-logo text-white/75">THE MONTHLY BRIEFING</p>
                <h2 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">Get our best thinking in your inbox.</h2>
                <p className="mt-3 max-w-md text-white/80">One concise email a month on AI, cloud and digital transformation. No spam — unsubscribe anytime.</p>
              </div>
              <div className="rounded-3xl bg-ink/85 p-5 backdrop-blur sm:p-6">
                <NewsletterForm source="blog" />
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </PageShell>
  );
}
