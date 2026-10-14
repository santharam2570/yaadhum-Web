"use client";

import { useEffect, useRef } from "react";
import { cities } from "@/data/company";
import { LAND_DOTS } from "@/lib/land-dots";

const DEG = Math.PI / 180;
const LEFT_LABELS = new Set(["Riyadh", "London", "Toronto"]);
type Vec = [number, number, number];

const toVec = (lat: number, lon: number): Vec => [
  Math.cos(lat) * Math.sin(lon),
  Math.sin(lat),
  Math.cos(lat) * Math.cos(lon),
];

function decodeLand(): Float32Array {
  const n = LAND_DOTS.length / 4;
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const lat = (parseInt(LAND_DOTS.slice(i * 4, i * 4 + 2), 36) / 2 - 90) * DEG;
    const lon = (parseInt(LAND_DOTS.slice(i * 4 + 2, i * 4 + 4), 36) / 2 - 180) * DEG;
    const [x, y, z] = toVec(lat, lon);
    out.set([x, y, z], i * 3);
  }
  return out;
}

function buildArc(a: Vec, b: Vec, steps = 56): Vec[] {
  const dot = Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]);
  const omega = Math.acos(dot);
  const s = Math.sin(omega);
  const lift = 0.03 + Math.min(omega, 1.2) * 0.07;
  const pts: Vec[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const k1 = Math.sin((1 - t) * omega) / s;
    const k2 = Math.sin(t * omega) / s;
    const r = 1 + lift * Math.sin(Math.PI * t);
    pts.push([(k1 * a[0] + k2 * b[0]) * r, (k1 * a[1] + k2 * b[1]) * r, (k1 * a[2] + k2 * b[2]) * r]);
  }
  return pts;
}

export function Globe({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const land = decodeLand();
    const hq = cities.find((c) => c.hq)!;
    const hqVec = toVec(hq.lat * DEG, hq.lon * DEG);
    const markers = cities.map((c) => ({ ...c, v: toVec(c.lat * DEG, c.lon * DEG) }));
    const arcs = markers.filter((c) => !c.hq).map((c) => buildArc(hqVec, c.v));
    const labelFont = getComputedStyle(document.documentElement).getPropertyValue("--font-rajdhani") || "sans-serif";

    let size = 0;
    let dpr = 1;
    let rot = (hq.lon - 18) * DEG;
    let tilt = 16 * DEG;
    let vel = 0;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let visible = true;
    let raf = 0;
    let prev = performance.now();

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = wrap.clientWidth;
      canvas.width = canvas.height = size * dpr;
      canvas.style.width = canvas.style.height = `${size}px`;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const project = (v: Vec, cr: number, sr: number, ct: number, st: number) => {
      const x = v[0] * cr - v[2] * sr;
      const z0 = v[0] * sr + v[2] * cr;
      const y = v[1] * ct - z0 * st;
      const z = v[1] * st + z0 * ct;
      return [x, y, z] as const;
    };

    const draw = (now: number) => {
      const dt = Math.min(now - prev, 50);
      prev = now;
      if (!dragging) {
        if (!calm) rot += 0.00011 * dt;
        rot += vel;
        vel *= 0.94;
      }

      const W = size * dpr;
      const cx = W / 2;
      const cy = W / 2;
      const R = W * 0.4;
      const cr = Math.cos(rot);
      const sr = Math.sin(rot);
      const ct = Math.cos(tilt);
      const st = Math.sin(tilt);

      ctx.clearRect(0, 0, W, W);

      const halo = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.35);
      halo.addColorStop(0, "rgba(255,106,43,0.22)");
      halo.addColorStop(1, "rgba(255,106,43,0)");
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, W, W);

      const body = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R);
      body.addColorStop(0, "rgba(120,14,16,0.55)");
      body.addColorStop(0.7, "rgba(30,8,8,0.92)");
      body.addColorStop(1, "rgba(12,4,4,0.98)");
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = body;
      ctx.fill();
      ctx.lineWidth = 1.2 * dpr;
      ctx.strokeStyle = "rgba(255,138,80,0.35)";
      ctx.stroke();

      ctx.fillStyle = "#f6c27a";
      const dot = 1.7 * dpr;
      for (let i = 0; i < land.length; i += 3) {
        const [x, y, z] = project([land[i], land[i + 1], land[i + 2]], cr, sr, ct, st);
        if (z <= 0) continue;
        ctx.globalAlpha = 0.12 + z * 0.75;
        const s = dot * (0.55 + z * 0.6);
        ctx.fillRect(cx + x * R - s / 2, cy - y * R - s / 2, s, s);
      }
      ctx.globalAlpha = 1;

      const t = now / 1000;
      ctx.lineCap = "round";
      arcs.forEach((arc, ai) => {
        const pts = arc.map((p) => project(p, cr, sr, ct, st));
        const seen = (p: readonly [number, number, number]) => p[2] > 0;

        ctx.lineWidth = 1 * dpr;
        ctx.strokeStyle = "rgba(255,106,43,0.28)";
        ctx.beginPath();
        let pen = false;
        for (const p of pts) {
          if (!seen(p)) {
            pen = false;
            continue;
          }
          const px = cx + p[0] * R;
          const py = cy - p[1] * R;
          if (pen) ctx.lineTo(px, py);
          else ctx.moveTo(px, py);
          pen = true;
        }
        ctx.stroke();

        if (calm) return;
        const head = ((t * 0.35 + ai * 0.29) % 1.5) * pts.length;
        const tail = 16;
        ctx.lineWidth = 2.2 * dpr;
        for (let k = Math.max(1, Math.floor(head - tail)); k < Math.min(pts.length, head); k++) {
          const a = pts[k - 1];
          const b = pts[k];
          if (!seen(a) || !seen(b)) continue;
          const f = 1 - (head - k) / tail;
          ctx.strokeStyle = `rgba(255,${Math.round(140 + 80 * f)},${Math.round(60 + 80 * f)},${f})`;
          ctx.beginPath();
          ctx.moveTo(cx + a[0] * R, cy - a[1] * R);
          ctx.lineTo(cx + b[0] * R, cy - b[1] * R);
          ctx.stroke();
        }
      });

      ctx.textBaseline = "middle";
      for (const m of markers) {
        const [x, y, z] = project(m.v, cr, sr, ct, st);
        if (z <= 0.02) continue;
        const px = cx + x * R;
        const py = cy - y * R;
        const a = Math.min(1, z * 1.6);

        if (m.hq) {
          const pulse = (t * 0.8) % 1;
          ctx.beginPath();
          ctx.arc(px, py, (4 + pulse * 18) * dpr, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(246,194,122,${(1 - pulse) * 0.8 * a})`;
          ctx.lineWidth = 1.5 * dpr;
          ctx.stroke();
        }
        const g = ctx.createRadialGradient(px, py, 0, px, py, 10 * dpr);
        g.addColorStop(0, `rgba(255,106,43,${0.55 * a})`);
        g.addColorStop(1, "rgba(255,106,43,0)");
        ctx.fillStyle = g;
        ctx.fillRect(px - 10 * dpr, py - 10 * dpr, 20 * dpr, 20 * dpr);
        ctx.beginPath();
        const office = m.hq || m.branch;
        ctx.arc(px, py, (m.hq ? 3.6 : m.branch ? 3 : 2.4) * dpr, 0, Math.PI * 2);
        ctx.fillStyle = office ? `rgba(255,243,223,${a})` : `rgba(255,138,80,${a})`;
        ctx.fill();

        if (m.name === "Kuala Lumpur" || z < 0.25 || size < 260) continue;
        const left = LEFT_LABELS.has(m.name);
        ctx.textAlign = left ? "right" : "left";
        ctx.font = `${office ? 700 : 600} ${(m.hq ? 13 : m.branch ? 12 : 11) * dpr}px ${labelFont}`;
        ctx.fillStyle = office ? `rgba(246,194,122,${a})` : `rgba(255,243,223,${a * 0.75})`;
        const label = m.hq ? `${m.name.toUpperCase()} · HQ` : m.branch ? `${m.name.toUpperCase()} · UAE` : m.name.toUpperCase();
        ctx.fillText(label, px + (left ? -8 : 8) * dpr, py - (m.branch ? 10 : 0) * dpr);
      }

      if (visible && !document.hidden) raf = requestAnimationFrame(draw);
      else raf = 0;
    };

    const start = () => {
      if (!raf) {
        prev = performance.now();
        raf = requestAnimationFrame(draw);
      }
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
    });
    io.observe(wrap);
    const onVis = () => !document.hidden && visible && start();
    document.addEventListener("visibilitychange", onVis);

    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      vel = 0;
      canvas.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      vel = -dx * 0.005;
      rot += vel;
      tilt = Math.max(-0.2, Math.min(0.8, tilt + dy * 0.004));
      start();
    };
    const onUp = () => {
      dragging = false;
    };
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <div ref={wrapRef} className={`relative aspect-square w-full ${className}`}>
      <canvas
        ref={canvasRef}
        aria-label="Interactive globe showing Yaadhum's client locations, connected to our Tiruchirappalli head office and Ajman (UAE) branch. Drag to rotate."
        role="img"
        className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing"
      />
    </div>
  );
}
