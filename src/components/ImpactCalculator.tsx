"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const AUTOMATION_RATE = 0.6;
const WORK_WEEKS = 48;
const FTE_HOURS = 1900;

const currencies = {
  USD: { symbol: "$", min: 10, max: 150, step: 5, start: 40, locale: "en-US" },
  EUR: { symbol: "€", min: 10, max: 140, step: 5, start: 38, locale: "en-IE" },
  GBP: { symbol: "£", min: 10, max: 120, step: 5, start: 32, locale: "en-GB" },
  INR: { symbol: "₹", min: 200, max: 3000, step: 100, start: 600, locale: "en-IN" },
} as const;

type Currency = keyof typeof currencies;

function Slider({
  label,
  value,
  display,
  min,
  max,
  step = 1,
  onChange,
}: {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step?: number;
  onChange: (n: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-4">
        <span className="text-sm text-cream/65">{label}</span>
        <span className="font-display text-2xl font-bold tabular-nums">{display}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full accent-flame [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-ink [&::-webkit-slider-thumb]:bg-flame [&::-webkit-slider-thumb]:shadow-[0_0_0_2px] [&::-webkit-slider-thumb]:shadow-flame"
        style={{ background: `linear-gradient(90deg, #ff6a2b ${pct}%, rgb(255 243 223 / 0.12) ${pct}%)` }}
      />
    </label>
  );
}

export function ImpactCalculator() {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [team, setTeam] = useState(25);
  const [hours, setHours] = useState(8);
  const [rate, setRate] = useState<number>(currencies.USD.start);
  const c = currencies[currency];

  const hoursSaved = Math.round(team * hours * WORK_WEEKS * AUTOMATION_RATE);
  const value = hoursSaved * rate;
  const fte = hoursSaved / FTE_HOURS;
  const money = (n: number) => `${c.symbol}${Math.round(n).toLocaleString(c.locale)}`;

  return (
    <div className="panel grid overflow-hidden lg:grid-cols-[1.1fr_1fr]">
      <div className="space-y-8 p-7 sm:p-10">
        <div className="flex items-center justify-between gap-4">
          <p className="font-brand text-xs font-bold tracking-logo text-gold">YOUR NUMBERS</p>
          <div className="flex rounded-full border border-cream/10 p-1 text-xs">
            {(Object.keys(currencies) as Currency[]).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => {
                  setCurrency(k);
                  setRate(currencies[k].start);
                }}
                className={`rounded-full px-3 py-1 font-semibold transition ${currency === k ? "bg-fire text-white" : "text-cream/60 hover:text-cream"}`}
              >
                {k}
              </button>
            ))}
          </div>
        </div>
        <Slider label="People doing repetitive work" value={team} display={`${team}`} min={1} max={200} onChange={setTeam} />
        <Slider label="Hours each spends on manual tasks / week" value={hours} display={`${hours} h`} min={1} max={25} onChange={setHours} />
        <Slider
          label="Average loaded cost per hour"
          value={rate}
          display={money(rate)}
          min={c.min}
          max={c.max}
          step={c.step}
          onChange={setRate}
        />
        <p className="text-xs leading-relaxed text-cream/40">
          Illustrative estimate assuming {AUTOMATION_RATE * 100}% of manual effort is automated over {WORK_WEEKS} working weeks. A discovery
          workshop produces a real, process-by-process figure.
        </p>
      </div>
      <div className="relative flex flex-col justify-between gap-8 bg-fire p-7 text-white sm:p-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(255,243,223,0.35),transparent_50%)]" />
        <div className="relative">
          <p className="font-brand text-xs font-bold tracking-logo text-white/75">HOURS GIVEN BACK EVERY YEAR</p>
          <p className="mt-2 font-display text-6xl font-extrabold tabular-nums sm:text-7xl">{hoursSaved.toLocaleString(c.locale)}</p>
        </div>
        <div className="relative grid grid-cols-2 gap-6 border-t border-white/25 pt-6">
          <div>
            <p className="text-sm text-white/75">Annual value unlocked</p>
            <p className="mt-1 font-display text-3xl font-bold tabular-nums">{money(value)}</p>
          </div>
          <div>
            <p className="text-sm text-white/75">Equivalent capacity</p>
            <p className="mt-1 font-display text-3xl font-bold tabular-nums">{fte.toFixed(1)} FTE</p>
          </div>
        </div>
        <Link
          href="/contact"
          data-magnetic="0.2"
          className="relative inline-flex w-fit items-center gap-2 rounded-full bg-ink px-6 py-3 font-brand font-bold tracking-wider text-cream transition hover:bg-coal"
        >
          Get a precise estimate <ArrowRight className="size-4 text-flame" />
        </Link>
      </div>
    </div>
  );
}
