import "server-only";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { Marked, type Tokens } from "marked";
import { cacheLife } from "next/cache";
import { categories, type CategorySlug } from "@/data/blog";

export type PostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  category: CategorySlug;
  tags: string[];
  date: string;
  author: string;
  authorRole: string;
  featured: boolean;
  readingMinutes: number;
};

export type Heading = { id: string; text: string; depth: number };
export type Post = PostMeta & { html: string; headings: Heading[] };

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

function parseFrontmatter(raw: string) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!match) return { attrs: {} as Record<string, string | string[]>, body: raw };
  const attrs: Record<string, string | string[]> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const m = /^([A-Za-z][\w-]*):\s*(.*)$/.exec(line);
    if (!m) continue;
    const value = m[2].trim();
    const unquote = (s: string) => s.trim().replace(/^["'](.*)["']$/, "$1");
    attrs[m[1]] = value.startsWith("[") && value.endsWith("]") ? value.slice(1, -1).split(",").map(unquote).filter(Boolean) : unquote(value);
  }
  return { attrs, body: raw.slice(match[0].length) };
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z]+;/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function toMeta(slug: string, attrs: Record<string, string | string[]>, body: string): PostMeta {
  const str = (k: string, fallback = "") => (typeof attrs[k] === "string" ? (attrs[k] as string) : fallback);
  const category = str("category") as CategorySlug;
  if (!categories.some((c) => c.slug === category)) {
    throw new Error(`Blog post "${slug}" has unknown category "${category}".`);
  }
  const words = body.split(/\s+/).filter(Boolean).length;
  return {
    slug,
    title: str("title", slug),
    excerpt: str("excerpt"),
    category,
    tags: Array.isArray(attrs.tags) ? attrs.tags : [],
    date: str("date"),
    author: str("author", "YAADHUM Editorial Team"),
    authorRole: str("authorRole", "YAADHUM International Technologies"),
    featured: str("featured") === "true",
    readingMinutes: Math.max(1, Math.round(words / 220)),
  };
}

function render(markdown: string) {
  const headings: Heading[] = [];
  const seen = new Map<string, number>();
  const marked = new Marked({ gfm: true });
  marked.use({
    renderer: {
      heading(this: { parser: { parseInline: (t: Tokens.Heading["tokens"]) => string } }, token: Tokens.Heading) {
        const inner = this.parser.parseInline(token.tokens);
        const base = slugify(token.text) || "section";
        const count = seen.get(base) ?? 0;
        seen.set(base, count + 1);
        const id = count ? `${base}-${count}` : base;
        if (token.depth === 2 || token.depth === 3) headings.push({ id, text: token.text.replace(/[*_`]/g, ""), depth: token.depth });
        return `<h${token.depth} id="${id}">${inner}</h${token.depth}>`;
      },
      link(this: { parser: { parseInline: (t: Tokens.Link["tokens"]) => string } }, token: Tokens.Link) {
        const inner = this.parser.parseInline(token.tokens);
        const external = /^https?:\/\//.test(token.href);
        const title = token.title ? ` title="${token.title}"` : "";
        return `<a href="${token.href}"${title}${external ? ' target="_blank" rel="noopener noreferrer"' : ""}>${inner}</a>`;
      },
    },
  });
  const html = marked.parse(markdown, { async: false }) as string;
  return { html, headings };
}

async function loadAll(): Promise<{ meta: PostMeta; body: string }[]> {
  const files = (await readdir(POSTS_DIR)).filter((f) => f.endsWith(".md"));
  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.md$/, "");
      const { attrs, body } = parseFrontmatter(await readFile(path.join(POSTS_DIR, file), "utf8"));
      if (attrs.draft === "true") return null;
      return { meta: toMeta(slug, attrs, body), body };
    }),
  );
  return posts.filter((p): p is NonNullable<typeof p> => p !== null).sort((a, b) => b.meta.date.localeCompare(a.meta.date));
}

export async function getAllPosts(): Promise<PostMeta[]> {
  "use cache";
  cacheLife("days");
  return (await loadAll()).map((p) => p.meta);
}

export async function getPost(slug: string): Promise<Post | null> {
  "use cache";
  cacheLife("days");
  const entry = (await loadAll()).find((p) => p.meta.slug === slug);
  if (!entry) return null;
  return { ...entry.meta, ...render(entry.body) };
}

export async function getRelatedPosts(slug: string, limit = 3): Promise<PostMeta[]> {
  const all = await getAllPosts();
  const current = all.find((p) => p.slug === slug);
  if (!current) return all.slice(0, limit);
  const score = (p: PostMeta) => (p.category === current.category ? 3 : 0) + p.tags.filter((t) => current.tags.includes(t)).length;
  return all
    .filter((p) => p.slug !== slug)
    .sort((a, b) => score(b) - score(a) || b.date.localeCompare(a.date))
    .slice(0, limit);
}
