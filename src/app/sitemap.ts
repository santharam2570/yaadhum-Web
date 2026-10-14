import type { MetadataRoute } from "next";
import { jobs } from "@/data/careers";
import { company } from "@/data/company";
import { products } from "@/data/products";
import { services } from "@/data/services";
import { getAllPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const url = (path: string) => `${company.url}${path}`;

  return [
    { url: url("/"), changeFrequency: "weekly", priority: 1 },
    ...["/services", "/products", "/industries", "/about", "/careers", "/blog", "/contact"].map((p) => ({
      url: url(p),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...services.map((s) => ({ url: url(`/services/${s.slug}`), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...products.map((p) => ({ url: url(`/products/${p.slug}`), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...jobs.map((j) => ({ url: url(`/careers/${j.slug}`), lastModified: j.postedAt, changeFrequency: "weekly" as const, priority: 0.6 })),
    ...posts.map((p) => ({ url: url(`/blog/${p.slug}`), lastModified: p.date, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...["/privacy", "/terms"].map((p) => ({ url: url(p), changeFrequency: "yearly" as const, priority: 0.2 })),
  ];
}
