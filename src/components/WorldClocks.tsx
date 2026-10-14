"use client";

import { useEffect, useState } from "react";
import { timezones } from "@/data/company";

function useNow(interval = 15_000) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, interval);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, [interval]);
  return now;
}

function local(now: Date, zone: string) {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: zone, hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(now);
  const h = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const m = parts.find((p) => p.type === "minute")?.value ?? "00";
  return { label: `${String(h).padStart(2, "0")}:${m}`, working: h >= 9 && h < 19 };
}

export function WorldClocks({ variant = "grid" }: { variant?: "grid" | "inline" }) {
  const now = useNow();

  if (variant === "inline") {
    return (
      <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
        {timezones.map((tz) => {
          const t = now ? local(now, tz.zone) : null;
          return (
            <li key={tz.city} className="flex items-center gap-2 text-cream/50">
              <span className={`size-1.5 rounded-full ${t?.working ? "bg-emerald-400 shadow-[0_0_8px] shadow-emerald-400" : "bg-cream/20"}`} />
              <span className="font-brand font-semibold tracking-wider">{tz.city.toUpperCase()}</span>
              <span className="tabular-nums text-cream/80">{t?.label ?? "--:--"}</span>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
      {timezones.map((tz) => {
        const t = now ? local(now, tz.zone) : null;
        return (
          <li key={tz.city} className="rounded-xl border border-cream/8 bg-ink/50 px-3.5 py-3">
            <p className="flex items-center justify-between font-brand text-[11px] font-bold tracking-logo text-cream/45">
              {tz.city.toUpperCase()}
              <span className={`size-1.5 rounded-full ${t?.working ? "bg-emerald-400 shadow-[0_0_8px] shadow-emerald-400" : "bg-cream/20"}`} />
            </p>
            <p className="mt-1 font-display text-2xl font-bold tabular-nums">{t?.label ?? "--:--"}</p>
          </li>
        );
      })}
    </ul>
  );
}
