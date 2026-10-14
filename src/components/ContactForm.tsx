"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Check, Send } from "lucide-react";
import { submitEnquiry } from "@/app/actions";
import { services } from "@/data/services";
import { serviceIcons } from "./icons";
import { ConsentField, FormAlert, Honeypot, SelectField, SubmitButton, SuccessPanel, TextAreaField, TextField, useServerForm } from "./forms";

const topics = ["New project", "Product demo", "Managed services / AMC", "Partnership", "Careers", "Other"];
const topicParam: Record<string, string> = { demo: "Product demo", amc: "Managed services / AMC", partner: "Partnership" };
const timelines = ["Immediately", "1–3 months", "3–6 months", "Just exploring"];
const budgets = ["Under $10k", "$10k – $50k", "$50k – $150k", "$150k+", "Not sure yet"];

function ChoiceGroup({ name, label, options, type }: { name: string; label: string; options: string[]; type: "radio" | "checkbox" }) {
  return (
    <fieldset>
      <legend className="font-brand text-xs font-bold tracking-logo text-gold">{label}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o} className="cursor-pointer">
            <input type={type} name={name} value={o} className="peer sr-only" />
            <span className="block rounded-full border border-cream/10 px-4 py-2 text-sm text-cream/60 transition peer-checked:border-flame peer-checked:bg-flame/15 peer-checked:text-cream peer-focus-visible:ring-2 peer-focus-visible:ring-flame hover:border-cream/30 hover:text-cream">
              {o}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function ContactForm() {
  const { state, pending, onSubmit } = useServerForm(submitEnquiry);
  const formRef = useRef<HTMLFormElement>(null);
  const e = state.errors ?? {};

  useEffect(() => {
    const topic = topicParam[new URLSearchParams(window.location.search).get("topic") ?? ""];
    const select = formRef.current?.elements.namedItem("topic");
    if (topic && select instanceof HTMLSelectElement) select.value = topic;
  }, []);

  if (state.status === "success") {
    return (
      <SuccessPanel
        title="Thank you — message received."
        message={state.message}
        action={
          <Link href="/blog" className="font-brand font-bold tracking-wider text-flame hover:text-gold">
            Read our latest insights while you wait →
          </Link>
        }
      />
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="panel relative space-y-8 p-6 sm:p-10">
      <Honeypot />
      <fieldset>
        <legend className="font-brand text-xs font-bold tracking-logo text-gold">WHAT CAN WE HELP WITH?</legend>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {services.map((s) => {
            const Icon = serviceIcons[s.slug];
            return (
              <label key={s.slug} className="group cursor-pointer">
                <input type="checkbox" name="services" value={s.label} className="peer sr-only" />
                <span className="relative flex h-full flex-col items-start gap-3 rounded-2xl border border-cream/10 p-4 text-left transition peer-checked:border-flame peer-checked:bg-flame/10 peer-focus-visible:ring-2 peer-focus-visible:ring-flame hover:border-cream/30">
                  <span className="grid size-10 place-items-center rounded-xl bg-cream/5">
                    <Icon className="size-5 text-flame" />
                  </span>
                  <span className="pr-4 font-display text-sm leading-tight font-bold">{s.label}</span>
                  <span className="absolute top-3 right-3 grid size-5 place-items-center rounded-full border border-cream/20 transition group-has-checked:border-flame group-has-checked:bg-flame">
                    <Check className="size-3 text-white opacity-0 group-has-checked:opacity-100" strokeWidth={3} />
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-8 lg:grid-cols-2">
        <ChoiceGroup name="timeline" label="TIMELINE" options={timelines} type="radio" />
        <ChoiceGroup name="budget" label="ESTIMATED BUDGET (OPTIONAL)" options={budgets} type="radio" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField name="name" label="Full name" required autoComplete="name" error={e.name} />
        <TextField name="email" label="Work email" type="email" required autoComplete="email" error={e.email} />
        <TextField name="company" label="Company" autoComplete="organization" />
        <TextField name="phone" label="Phone (with country code)" type="tel" autoComplete="tel" />
        <TextField name="country" label="Country" autoComplete="country-name" />
        <SelectField name="topic" label="Enquiry type" options={topics} defaultValue="New project" />
        <div className="sm:col-span-2">
          <TextAreaField name="message" label="Tell us about your goals or project" required rows={5} maxLength={5000} error={e.message} />
        </div>
      </div>

      <ConsentField error={e.consent}>
        I agree to YAADHUM processing my details to respond to this enquiry, as described in the{" "}
        <Link href="/privacy" className="text-flame underline-offset-2 hover:underline">
          privacy policy
        </Link>
        .
      </ConsentField>

      <FormAlert state={state} />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-cream/45">We reply within one business day. Your details are never shared.</p>
        <SubmitButton pending={pending}>
          {pending ? "Sending…" : "Send enquiry"}
          {!pending && <Send className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />}
        </SubmitButton>
      </div>
    </form>
  );
}
