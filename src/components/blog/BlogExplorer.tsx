"use client";

import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { categories, type CategorySlug } from "@/data/blog";
import type { PostMeta } from "@/lib/blog";
import { PostCard } from "../cards";

type Filter = CategorySlug | "all";

export function BlogExplorer({ posts }: { posts: PostMeta[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Filter>("all");
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const c = params.get("category");
    const q = params.get("q");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate filters from a shared URL once on mount
    if (c && categories.some((x) => x.slug === c)) setCategory(c as CategorySlug);
    if (q) setQuery(q);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (category !== "all") params.set("category", category);
    if (deferredQuery.trim()) params.set("q", deferredQuery.trim());
    const qs = params.toString();
    window.history.replaceState(window.history.state, "", `${window.location.pathname}${qs ? `?${qs}` : ""}`);
  }, [category, deferredQuery]);

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of posts) map.set(p.category, (map.get(p.category) ?? 0) + 1);
    return map;
  }, [posts]);

  const results = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    return posts.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (!q) return true;
      return [p.title, p.excerpt, p.author, ...p.tags].join(" ").toLowerCase().includes(q);
    });
  }, [posts, category, deferredQuery]);

  const reset = () => {
    setQuery("");
    setCategory("all");
  };

  const pill = (on: boolean) =>
    `inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${on ? "border-flame bg-flame/15 text-cream" : "border-cream/10 text-cream/60 hover:border-cream/30 hover:text-cream"}`;

  return (
    <div>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div role="radiogroup" aria-label="Filter by topic" className="flex flex-wrap gap-2">
          <button type="button" role="radio" aria-checked={category === "all"} onClick={() => setCategory("all")} className={pill(category === "all")}>
            All topics <span className="text-xs text-cream/40">{posts.length}</span>
          </button>
          {categories
            .filter((c) => counts.has(c.slug))
            .map((c) => (
              <button key={c.slug} type="button" role="radio" aria-checked={category === c.slug} onClick={() => setCategory(c.slug)} className={pill(category === c.slug)}>
                {c.name} <span className="text-xs text-cream/40">{counts.get(c.slug)}</span>
              </button>
            ))}
        </div>
        <label className="relative block lg:w-80">
          <span className="sr-only">Search articles</span>
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-cream/40" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles…"
            className="w-full rounded-full border border-cream/10 bg-ink/70 py-3 pr-4 pl-11 text-sm text-cream placeholder:text-cream/35 focus:border-flame focus:ring-4 focus:ring-flame/10 focus:outline-none"
          />
        </label>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <p aria-live="polite" className="text-sm text-cream/55">
          {results.length} {results.length === 1 ? "article" : "articles"}
        </p>
        {(query || category !== "all") && (
          <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 text-sm font-semibold text-flame hover:text-gold">
            <X className="size-4" /> Clear
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((post) => (
            <div key={post.slug} className="animate-rise">
              <PostCard post={post} />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-3xl border border-dashed border-cream/15 p-12 text-center">
          <p className="font-display text-2xl font-bold">No articles found.</p>
          <p className="mt-2 text-cream/55">Try another keyword or browse all topics.</p>
          <button type="button" onClick={reset} className="mt-6 rounded-full bg-fire px-5 py-2.5 font-brand font-bold tracking-wider text-white">
            Show all articles
          </button>
        </div>
      )}
    </div>
  );
}
