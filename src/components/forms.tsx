"use client";

import { startTransition, useActionState, type FormEvent, type ReactNode } from "react";
import { AlertCircle, Check, ChevronDown, LoaderCircle } from "lucide-react";
import { initialFormState, type FormState } from "@/lib/form-state";

const fieldBase =
  "peer w-full rounded-xl border bg-ink/70 px-4 pt-6 pb-2.5 text-cream placeholder-transparent outline-none transition focus:ring-4";
const fieldTone = (invalid: boolean) =>
  invalid ? "border-ember-400/70 focus:border-ember-400 focus:ring-ember-400/15" : "border-cream/10 focus:border-flame focus:ring-flame/10";
const floating =
  "pointer-events-none absolute top-2 left-4 text-[11px] font-semibold tracking-wide text-cream/45 uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:tracking-normal peer-placeholder-shown:normal-case peer-focus:top-2 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:tracking-wide peer-focus:text-flame peer-focus:uppercase";

/**
 * Submits through a Server Action without React's automatic form reset,
 * so users never lose what they typed (or their attached file) on a validation error.
 */
export function useServerForm(action: (state: FormState, fd: FormData) => Promise<FormState>) {
  const [state, dispatch, pending] = useActionState(action, initialFormState);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(() => dispatch(fd));
  };
  return { state, pending, onSubmit };
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 flex items-center gap-1.5 text-xs text-ember-300">
      <AlertCircle className="size-3.5 shrink-0" /> {message}
    </p>
  );
}

export function TextField({
  name,
  label,
  type = "text",
  required = false,
  error,
  autoComplete,
  defaultValue,
  inputMode,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  error?: string;
  autoComplete?: string;
  defaultValue?: string;
  inputMode?: "text" | "email" | "tel" | "url";
}) {
  const errId = `${name}-error`;
  return (
    <div>
      <label className="relative block">
        <input
          name={name}
          type={type}
          required={required}
          placeholder={label}
          autoComplete={autoComplete}
          defaultValue={defaultValue}
          inputMode={inputMode}
          aria-invalid={!!error}
          aria-describedby={error ? errId : undefined}
          className={`${fieldBase} ${fieldTone(!!error)}`}
        />
        <span className={floating}>
          {label}
          {required && " *"}
        </span>
      </label>
      <FieldError id={errId} message={error} />
    </div>
  );
}

export function TextAreaField({
  name,
  label,
  required = false,
  error,
  rows = 5,
  maxLength,
  defaultValue,
}: {
  name: string;
  label: string;
  required?: boolean;
  error?: string;
  rows?: number;
  maxLength?: number;
  defaultValue?: string;
}) {
  const errId = `${name}-error`;
  return (
    <div>
      <label className="relative block">
        <textarea
          name={name}
          required={required}
          rows={rows}
          maxLength={maxLength}
          placeholder={label}
          defaultValue={defaultValue}
          aria-invalid={!!error}
          aria-describedby={error ? errId : undefined}
          className={`${fieldBase} ${fieldTone(!!error)} resize-y`}
        />
        <span className={floating}>
          {label}
          {required && " *"}
        </span>
      </label>
      <FieldError id={errId} message={error} />
    </div>
  );
}

export function SelectField({
  name,
  label,
  options,
  required = false,
  error,
  defaultValue = "",
}: {
  name: string;
  label: string;
  options: string[];
  required?: boolean;
  error?: string;
  defaultValue?: string;
}) {
  const errId = `${name}-error`;
  return (
    <div>
      <label className="relative block">
        <select
          name={name}
          required={required}
          defaultValue={defaultValue}
          aria-invalid={!!error}
          aria-describedby={error ? errId : undefined}
          className={`${fieldBase} ${fieldTone(!!error)} appearance-none pr-10 invalid:text-cream/45`}
        >
          <option value="" disabled>
            Select…
          </option>
          {options.map((o) => (
            <option key={o} value={o} className="bg-coal text-cream">
              {o}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-flame" />
        <span className="pointer-events-none absolute top-2 left-4 text-[11px] font-semibold tracking-wide text-cream/45 uppercase">
          {label}
          {required && " *"}
        </span>
      </label>
      <FieldError id={errId} message={error} />
    </div>
  );
}

export function ConsentField({ error, children }: { error?: string; children: ReactNode }) {
  return (
    <div>
      <label className="flex cursor-pointer items-start gap-3 text-sm text-cream/60">
        <span className="relative mt-0.5 grid size-[1.125rem] shrink-0 place-items-center">
          <input
            type="checkbox"
            name="consent"
            required
            aria-invalid={!!error}
            aria-describedby={error ? "consent-error" : undefined}
            className="peer absolute inset-0 cursor-pointer appearance-none rounded border border-cream/25 bg-ink transition checked:border-flame checked:bg-flame"
          />
          <Check className="pointer-events-none relative size-3 text-white opacity-0 peer-checked:opacity-100" strokeWidth={4} />
        </span>
        <span>{children}</span>
      </label>
      <FieldError id="consent-error" message={error} />
    </div>
  );
}

/** Hidden from people, irresistible to bots. Submissions that fill it are silently dropped. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

export function SubmitButton({ pending, children, className = "" }: { pending: boolean; children: ReactNode; className?: string }) {
  return (
    <button
      type="submit"
      disabled={pending}
      data-magnetic="0.2"
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-fire px-8 py-4 font-brand text-lg font-bold tracking-wider text-white shadow-xl shadow-ember-700/40 transition disabled:cursor-wait disabled:opacity-70 ${className}`}
    >
      {pending ? <LoaderCircle className="size-5 animate-spin" /> : null}
      {children}
    </button>
  );
}

export function FormAlert({ state }: { state: FormState }) {
  if (state.status !== "error" || !state.message) return null;
  return (
    <div role="alert" className="flex items-start gap-3 rounded-xl border border-ember-400/40 bg-ember-500/10 px-4 py-3 text-sm text-ember-300">
      <AlertCircle className="mt-0.5 size-4 shrink-0" />
      {state.message}
    </div>
  );
}

export function SuccessPanel({ title, message, action }: { title: string; message?: string; action?: ReactNode }) {
  return (
    <div role="status" className="panel grid min-h-[28rem] place-items-center p-10 text-center sm:p-12">
      <div className="animate-rise">
        <span className="relative mx-auto grid size-20 place-items-center rounded-full bg-fire">
          <span className="absolute inset-0 animate-ping-slow rounded-full bg-flame/40" />
          <Check className="relative size-9 text-white" strokeWidth={3} />
        </span>
        <h3 className="mt-8 font-display text-4xl font-bold">{title}</h3>
        {message && <p className="mx-auto mt-3 max-w-md text-cream/60">{message}</p>}
        {action && <div className="mt-8">{action}</div>}
      </div>
    </div>
  );
}
