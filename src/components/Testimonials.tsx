"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { testimonials } from "@/data/proof";

export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = (n: number) => setI((n + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => setI((n) => (n + 1) % testimonials.length), 7000);
    return () => clearTimeout(id);
  }, [i, paused]);

  const t = testimonials[i];

  return (
    <div
      className="relative"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <Quote className="size-14 text-ember-500/40" strokeWidth={1.2} />
      <figure key={i} className="mt-6 min-h-[16rem] sm:min-h-[13rem]">
        <blockquote className="animate-rise font-serif text-3xl leading-[1.2] text-cream sm:text-4xl lg:text-[2.75rem]">
          “{t.quote}”
        </blockquote>
        <figcaption className="mt-8 flex animate-rise items-center gap-4 [animation-delay:150ms]">
          <span className="h-px w-10 bg-fire" />
          <span>
            <span className="block font-display text-lg font-bold">{t.role}</span>
            <span className="text-sm text-cream/55">
              {t.org} · {t.location}
            </span>
          </span>
        </figcaption>
      </figure>
      <div className="mt-10 flex items-center gap-4">
        <button type="button" aria-label="Previous testimonial" onClick={() => go(i - 1)} className="grid size-12 place-items-center rounded-full border border-cream/15 transition hover:border-flame hover:text-flame">
          <ArrowLeft className="size-5" />
        </button>
        <button type="button" aria-label="Next testimonial" onClick={() => go(i + 1)} className="grid size-12 place-items-center rounded-full border border-cream/15 transition hover:border-flame hover:text-flame">
          <ArrowRight className="size-5" />
        </button>
        <div className="ml-2 flex gap-2">
          {testimonials.map((_, n) => (
            <button
              key={n}
              type="button"
              aria-label={`Show testimonial ${n + 1}`}
              onClick={() => go(n)}
              className={`h-1.5 rounded-full transition-all duration-500 ${n === i ? "w-10 bg-fire" : "w-4 bg-cream/20 hover:bg-cream/40"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
