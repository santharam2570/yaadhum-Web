import { categoryName } from "@/data/blog";
import { company } from "@/data/company";
import { getAllPosts } from "@/lib/blog";

const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

export async function GET() {
  const posts = await getAllPosts();
  const items = posts
    .map((p) => {
      const link = `${company.url}/blog/${p.slug}`;
      return `    <item>
      <title>${escape(p.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escape(p.excerpt)}</description>
      <category>${escape(categoryName(p.category))}</category>
      <dc:creator>${escape(p.author)}</dc:creator>
      <pubDate>${new Date(`${p.date}T00:00:00Z`).toUTCString()}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escape(company.name)} — Insights</title>
    <link>${company.url}/blog</link>
    <atom:link href="${company.url}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <description>Articles on AI, cloud, software development, automation, cybersecurity and emerging technology.</description>
    <language>en</language>
${posts[0] ? `    <lastBuildDate>${new Date(`${posts[0].date}T00:00:00Z`).toUTCString()}</lastBuildDate>\n` : ""}${items}
  </channel>
</rss>
`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
