"use client";

import { useEffect, useRef } from "react";

/**
 * One delegated pointer listener for the whole site:
 * `.spotlight` cards get --x/--y, `[data-magnetic]` elements drift toward the cursor,
 * `[data-tilt]` elements rotate in 3D, and a soft ember glow follows the pointer.
 */
export function InteractionLayer() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine) return;

    let magnet: HTMLElement | null = null;
    let tilt: HTMLElement | null = null;
    let frame = 0;
    let last: PointerEvent | null = null;

    const release = (el: HTMLElement | null) => {
      if (el) el.style.transform = "";
    };

    const update = () => {
      frame = 0;
      const e = last;
      if (!e) return;
      const target = e.target as Element | null;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }

      const spot = target?.closest<HTMLElement>(".spotlight");
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty("--x", `${e.clientX - r.left}px`);
        spot.style.setProperty("--y", `${e.clientY - r.top}px`);
      }

      if (calm) return;

      const m = target?.closest<HTMLElement>("[data-magnetic]") ?? null;
      if (m !== magnet) {
        release(magnet);
        magnet = m;
      }
      if (m) {
        const r = m.getBoundingClientRect();
        const strength = Number(m.dataset.magnetic) || 0.3;
        const dx = (e.clientX - (r.left + r.width / 2)) * strength;
        const dy = (e.clientY - (r.top + r.height / 2)) * strength;
        m.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      }

      const t = target?.closest<HTMLElement>("[data-tilt]") ?? null;
      if (t !== tilt) {
        release(tilt);
        tilt = t;
      }
      if (t) {
        const r = t.getBoundingClientRect();
        const max = Number(t.dataset.tilt) || 6;
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        t.style.transform = `perspective(1000px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg)`;
      }
    };

    const onMove = (e: PointerEvent) => {
      last = e;
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onLeave = () => {
      release(magnet);
      release(tilt);
      magnet = tilt = null;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-0 hidden size-[34rem] rounded-full bg-[radial-gradient(circle,rgb(227_34_28/0.10),transparent_65%)] [@media(pointer:fine)]:block"
      style={{ transform: "translate3d(-100vw, -100vh, 0)" }}
    />
  );
}
