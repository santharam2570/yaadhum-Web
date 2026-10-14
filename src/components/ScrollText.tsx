"use client";

import { useEffect, useRef, useState } from "react";

type Segment = { text: string; accent?: boolean };

/** Words light up one by one as the block scrolls through the viewport. */
export function ScrollText({
  segments,
  className = "",
  accentClassName = "text-gold",
}: {
  segments: Segment[];
  className?: string;
  accentClassName?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = segments.flatMap((s) => s.text.split(" ").filter(Boolean).map((w) => ({ w, accent: s.accent })));
  const [lit, setLit] = useState(words.length);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const measure = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = (vh * 0.9 - r.top) / (r.height * 0.6 + vh * 0.2);
      setLit(Math.round(Math.max(0, Math.min(1, progress)) * words.length));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    raf = requestAnimationFrame(measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [words.length]);

  return (
    <p ref={ref} className={className}>
      {words.map(({ w, accent }, i) => (
        <span
          key={i}
          className={`transition-[opacity,color] duration-500 ${i < lit ? "opacity-100" : "opacity-35"} ${accent ? `font-serif font-normal italic ${accentClassName}` : ""}`}
        >
          {w}{" "}
        </span>
      ))}
    </p>
  );
}
