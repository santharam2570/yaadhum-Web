"use client";

import { ArrowRight, CircleCheck, LoaderCircle } from "lucide-react";
import { subscribe } from "@/app/actions";
import { Honeypot, useServerForm } from "./forms";

export function NewsletterForm({ source, compact = false }: { source: string; compact?: boolean }) {
  const { state, pending, onSubmit } = useServerForm(subscribe);

  if (state.status === "success") {
    return (
      <p role="status" className="flex items-center gap-3 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-5 py-4 text-sm text-emerald-200">
        <CircleCheck className="size-5 shrink-0" /> {state.message ?? "You're subscribed."}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative w-full">
      <Honeypot />
      <input type="hidden" name="source" value={source} />
      <div
        className={`flex gap-2 border border-cream/15 bg-ink/70 p-1.5 transition focus-within:border-flame ${compact ? "flex-col rounded-3xl" : "rounded-full sm:p-2"}`}
      >
        <label htmlFor={`newsletter-${source}`} className="sr-only">
          Work email
        </label>
        <input
          id={`newsletter-${source}`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          className={`min-w-0 flex-1 bg-transparent px-4 text-cream placeholder:text-cream/35 focus:outline-none ${compact ? "py-2.5" : ""}`}
        />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-fire px-5 py-3 font-brand text-sm font-bold tracking-wider text-white transition disabled:opacity-70"
        >
          {pending ? <LoaderCircle className="size-4 animate-spin" /> : <ArrowRight className="size-4" />}
          Subscribe
        </button>
      </div>
      <p aria-live="polite" className={`mt-2 px-4 text-xs ${state.status === "error" ? "text-ember-300" : "text-cream/40"}`}>
        {state.status === "error" ? state.message : "No spam. Unsubscribe anytime."}
      </p>
    </form>
  );
}
