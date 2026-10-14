"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { serviceIcons } from "./icons";
import { ServiceMock } from "./ServiceMock";
import { services } from "@/data/services";

const CYCLE_MS = 7000;

export function ServiceExplorer() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const current = services[active];

  useEffect(() => {
    const list = listRef.current;
    const tab = list?.children[active] as HTMLElement | undefined;
    if (!list || !tab || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({ left: tab.offsetLeft - list.offsetLeft - 20, behavior: "smooth" });
  }, [active]);

  return (
    <div
      className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div ref={listRef} role="tablist" aria-label="Services" className="no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
        {services.map((s, i) => {
          const Icon = serviceIcons[s.slug];
          const on = i === active;
          return (
            <button
              key={s.slug}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls="service-panel"
              onClick={() => setActive(i)}
              className={`group relative shrink-0 overflow-hidden rounded-2xl border text-left transition-all duration-500 max-lg:min-w-[15rem] ${
                on ? "border-ember-500/40 bg-char/80" : "border-cream/8 bg-transparent hover:border-cream/20"
              }`}
            >
              <div className="flex items-center gap-4 px-5 py-4">
                <span className={`grid size-12 shrink-0 place-items-center rounded-xl transition-colors duration-500 ${on ? "bg-fire shadow-lg shadow-ember-700/50" : "bg-cream/5"}`}>
                  <Icon className={`size-5.5 ${on ? "text-white" : "text-cream/60"}`} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline gap-2">
                    <span className="font-brand text-xs font-bold tracking-logo text-cream/35">{s.code}</span>
                    <span className={`font-display text-lg font-bold transition-colors sm:text-xl ${on ? "text-cream" : "text-cream/70"}`}>{s.label}</span>
                  </span>
                  <span className="mt-0.5 block truncate font-serif text-base text-gold/80 italic">…that {s.verb}</span>
                </span>
              </div>
              <div className={`grid transition-[grid-template-rows] duration-500 max-lg:hidden ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                  <p className="px-5 text-sm leading-relaxed text-cream/60">{s.description}</p>
                  <Link
                    href={`/services/${s.slug}`}
                    className="mx-5 mt-4 mb-5 inline-flex items-center gap-1.5 font-brand text-sm font-bold tracking-wider text-flame hover:text-gold"
                    tabIndex={on ? 0 : -1}
                  >
                    Explore {s.name} <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </div>
              {on && (
                <span
                  key={`${active}`}
                  onAnimationEnd={() => setActive((a) => (a + 1) % services.length)}
                  className="absolute inset-x-0 bottom-0 h-0.5 origin-left animate-progress bg-fire"
                  style={{ animationDuration: `${CYCLE_MS}ms`, animationPlayState: paused ? "paused" : "running" }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div id="service-panel" role="tabpanel" aria-label={current.label} className="relative min-w-0">
        <div className="pointer-events-none absolute -inset-10 rounded-full bg-ember-600/20 blur-[100px]" />
        <div data-tilt="4" className="relative">
          <ServiceMock key={current.slug} slug={current.slug} />
        </div>
        <div className="relative mt-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {current.stack.slice(0, 4).map((t) => (
              <span key={t} className="rounded-full border border-cream/10 px-3 py-1 text-xs text-cream/60">
                {t}
              </span>
            ))}
          </div>
          <Link href={`/services/${current.slug}`} className="inline-flex items-center gap-1.5 font-brand text-sm font-bold tracking-wider text-flame hover:text-gold lg:hidden">
            Explore {current.name} <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
