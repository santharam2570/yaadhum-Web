"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { processSteps } from "@/data/proof";

export function ProcessTimeline() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
      <div className="lg:sticky lg:top-32 lg:self-start">
        <div className="relative hidden aspect-square max-w-sm place-items-center lg:grid">
          <svg viewBox="0 0 200 200" className="absolute inset-0 -rotate-90">
            <circle cx="100" cy="100" r="92" fill="none" stroke="rgb(255 243 223 / 0.08)" strokeWidth="2" />
            <circle
              cx="100"
              cy="100"
              r="92"
              fill="none"
              stroke="url(#proc-grad)"
              strokeWidth="3"
              strokeLinecap="round"
              pathLength={100}
              strokeDasharray="100"
              strokeDashoffset={100 - ((active + 1) / processSteps.length) * 100}
              className="transition-[stroke-dashoffset] duration-700 ease-out"
            />
            <defs>
              <linearGradient id="proc-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#f6c27a" />
                <stop offset="1" stopColor="#e3221c" />
              </linearGradient>
            </defs>
          </svg>
          <div className="text-center">
            <p key={active} className="animate-rise font-display text-[7rem] leading-none font-extrabold text-fire">
              0{active + 1}
            </p>
            <p className="mt-2 font-brand text-sm font-bold tracking-logo text-cream/50">{processSteps[active].title.toUpperCase()}</p>
          </div>
        </div>
      </div>

      <ol className="relative space-y-6 border-l border-cream/10 pl-8 sm:pl-12">
        {processSteps.map((step, i) => {
          const on = i <= active;
          return (
            <li
              key={step.title}
              ref={(el) => {
                refs.current[i] = el;
              }}
              data-index={i}
              className={`relative rounded-3xl border p-7 transition-all duration-700 sm:p-9 ${
                i === active ? "border-ember-500/40 bg-char/80" : "border-transparent"
              }`}
            >
              <span
                className={`absolute top-10 -left-[calc(2rem+7px)] size-3.5 rounded-full border-2 transition-colors duration-500 sm:-left-[calc(3rem+7px)] ${
                  on ? "border-flame bg-flame shadow-[0_0_14px_2px] shadow-flame/70" : "border-cream/30 bg-ink"
                }`}
              />
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className={`font-display text-3xl font-bold transition-colors sm:text-4xl ${on ? "text-cream" : "text-cream/40"}`}>
                  <span className="mr-3 font-brand text-lg text-flame">0{i + 1}</span>
                  {step.title}
                </h3>
                <span className="rounded-full border border-cream/10 px-3 py-1 font-brand text-xs font-bold tracking-wider text-gold">{step.duration}</span>
              </div>
              <p className="mt-4 max-w-xl leading-relaxed text-cream/60">{step.text}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {step.deliverables.map((d) => (
                  <li key={d} className="flex items-center gap-1.5 rounded-full bg-cream/5 px-3 py-1.5 text-sm text-cream/75">
                    <Check className="size-3.5 text-flame" strokeWidth={3} />
                    {d}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
