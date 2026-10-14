"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import type { Product } from "@/data/products";
import { productIcons } from "./icons";

export function ProductSwitcher({ products, visuals }: { products: Product[]; visuals: Record<string, ReactNode> }) {
  const [active, setActive] = useState(0);
  const p = products[active];
  const Icon = productIcons[p.slug];

  return (
    <div>
      <div role="tablist" aria-label="Products" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 lg:mx-0 lg:flex-wrap lg:px-0">
        {products.map((prod, i) => {
          const PIcon = productIcons[prod.slug];
          const on = i === active;
          return (
            <button
              key={prod.slug}
              type="button"
              role="tab"
              id={`tab-${prod.slug}`}
              aria-selected={on}
              aria-controls="product-panel"
              onClick={() => setActive(i)}
              className={`flex shrink-0 items-center gap-2.5 rounded-full border py-2 pr-5 pl-2 text-sm font-semibold transition ${
                on ? "border-flame bg-flame/15 text-cream" : "border-cream/10 text-cream/60 hover:border-cream/30 hover:text-cream"
              }`}
            >
              <span className={`grid size-8 place-items-center rounded-full transition ${on ? "bg-fire" : "bg-cream/5"}`}>
                <PIcon className={`size-4 ${on ? "text-white" : "text-flame"}`} />
              </span>
              {prod.name}
            </button>
          );
        })}
      </div>

      <div id="product-panel" role="tabpanel" aria-labelledby={`tab-${p.slug}`} className="panel relative mt-6 overflow-hidden">
        <div className="pointer-events-none absolute -top-32 -left-32 size-96 rounded-full bg-ember-600/15 blur-3xl" />
        <div key={p.slug} className="relative grid gap-10 p-7 sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div className="animate-rise">
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-2xl bg-fire shadow-lg shadow-ember-700/40">
                <Icon className="size-6 text-white" />
              </span>
              <span className="font-brand text-xs font-bold tracking-logo text-gold">{p.category.toUpperCase()}</span>
            </div>
            <h3 className="mt-5 font-display text-4xl font-bold sm:text-5xl">
              <span className="font-brand text-ember-500">YAADHUM</span> {p.name}
            </h3>
            <p className="mt-3 font-serif text-2xl text-gold italic">{p.tagline}</p>
            <p className="mt-4 leading-relaxed text-cream/65">{p.description}</p>
            <ul className="mt-6 grid gap-2.5 text-sm text-cream/80 sm:grid-cols-2">
              {p.features.slice(0, 4).map((f) => (
                <li key={f.title} className="flex gap-2.5">
                  <Check className="mt-0.5 size-4 shrink-0 text-flame" strokeWidth={3} /> {f.title}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={`/products/${p.slug}`}
                data-magnetic="0.2"
                className="group inline-flex items-center gap-2 rounded-full bg-fire px-6 py-3 font-brand font-bold tracking-wider text-white shadow-lg shadow-ember-700/40"
              >
                Explore {p.name} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/contact?topic=demo" className="inline-flex items-center gap-1.5 font-brand font-bold tracking-wider text-flame hover:text-gold">
                Request a demo <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
          <div className="animate-rise [animation-delay:150ms]">
            {visuals[p.slug]}
            <div className="mt-4 grid grid-cols-3 gap-2">
              {p.metrics.map((m) => (
                <div key={m.label} className="rounded-2xl border border-cream/8 bg-ink/50 p-3 text-center">
                  <p className="font-display text-2xl font-extrabold text-fire">{m.value}</p>
                  <p className="mt-0.5 text-[11px] leading-tight text-cream/50">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
