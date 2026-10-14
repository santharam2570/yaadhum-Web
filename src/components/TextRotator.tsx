"use client";

import { useEffect, useState } from "react";

export function TextRotator({ words, interval = 2600, className = "" }: { words: string[]; interval?: number; className?: string }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className={`relative inline-grid ${className}`} aria-live="polite">
      {/* Reserve the width of the longest phrase so surrounding text never jumps */}
      {words.map((w) => (
        <span key={w} aria-hidden className="invisible col-start-1 row-start-1">
          {w}
        </span>
      ))}
      <span key={i} className="col-start-1 row-start-1 animate-rise">
        {words[i]}
      </span>
    </span>
  );
}
