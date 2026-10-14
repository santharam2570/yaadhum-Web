"use client";

import Link from "next/link";
import { useRef, useState, type DragEvent } from "react";
import { FileText, Send, UploadCloud, X } from "lucide-react";
import { submitApplication } from "@/app/actions";
import { RESUME_EXTENSIONS, RESUME_MAX_BYTES, type FormState } from "@/lib/form-state";
import { ConsentField, FieldError, FormAlert, Honeypot, SelectField, SubmitButton, SuccessPanel, TextAreaField, TextField, useServerForm } from "../forms";

const experienceOptions = ["0–1 years", "1–3 years", "3–5 years", "5–8 years", "8+ years"];
const noticeOptions = ["Immediately", "15 days", "30 days", "60 days", "90 days"];

function formatBytes(n: number) {
  return n < 1024 * 1024 ? `${Math.max(1, Math.round(n / 1024))} KB` : `${(n / 1024 / 1024).toFixed(1)} MB`;
}

function checkFile(file: File) {
  const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
  if (!RESUME_EXTENSIONS.includes(ext)) return "Resume must be a PDF, DOC or DOCX file.";
  if (file.size > RESUME_MAX_BYTES) return "Resume must be 5 MB or smaller.";
  return "";
}

function ResumeDropzone({ serverError, response }: { serverError?: string; response: FormState }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  // A server error stays visible until the user picks a different file after that response.
  const [dismissedFor, setDismissedFor] = useState<FormState | null>(null);

  const accept = (f: File | null | undefined) => {
    const input = inputRef.current;
    if (!input) return;
    setDismissedFor(response);
    if (!f) {
      input.value = "";
      setFile(null);
      setError("");
      return;
    }
    const problem = checkFile(f);
    if (problem) {
      input.value = "";
      setFile(null);
      setError(problem);
      return;
    }
    if (input.files?.[0] !== f) {
      const dt = new DataTransfer();
      dt.items.add(f);
      input.files = dt.files;
    }
    setFile(f);
    setError("");
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    accept(e.dataTransfer.files[0]);
  };

  const shownError = error || (dismissedFor === response ? "" : serverError);

  return (
    <div>
      <p className="font-brand text-xs font-bold tracking-logo text-gold">RESUME / CV *</p>
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`mt-3 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-8 text-center transition ${
          dragging ? "border-flame bg-flame/10" : shownError ? "border-ember-400/60 bg-ember-500/5" : "border-cream/15 hover:border-cream/35"
        } ${file ? "hidden" : ""}`}
      >
        <input
          ref={inputRef}
          type="file"
          name="resume"
          required
          accept={RESUME_EXTENSIONS.join(",")}
          aria-describedby="resume-help resume-error"
          aria-invalid={!!shownError}
          className="sr-only"
          onChange={(e) => accept(e.target.files?.[0])}
        />
        <span className="grid size-14 place-items-center rounded-2xl bg-fire shadow-lg shadow-ember-700/40">
          <UploadCloud className="size-7 text-white" />
        </span>
        <span className="font-display text-lg font-bold">
          Drop your resume here or <span className="text-flame underline underline-offset-4">browse</span>
        </span>
        <span id="resume-help" className="text-sm text-cream/45">
          PDF, DOC or DOCX · max 5 MB
        </span>
      </label>
      {file && (
        <div className="mt-3 flex items-center gap-4 rounded-2xl border border-flame/40 bg-flame/10 p-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-fire">
            <FileText className="size-5 text-white" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate font-semibold text-cream">{file.name}</span>
            <span className="text-xs text-cream/55">{formatBytes(file.size)} · ready to upload</span>
          </span>
          <button
            type="button"
            onClick={() => accept(null)}
            aria-label="Remove file"
            className="grid size-9 shrink-0 place-items-center rounded-full border border-cream/20 transition hover:border-flame hover:text-flame"
          >
            <X className="size-4" />
          </button>
        </div>
      )}
      <FieldError id="resume-error" message={shownError} />
    </div>
  );
}

export function ApplicationForm({ job, roles = [] }: { job?: { slug: string; title: string }; roles?: string[] }) {
  const { state, pending, onSubmit } = useServerForm(submitApplication);
  const e = state.errors ?? {};

  if (state.status === "success") {
    return (
      <SuccessPanel
        title="Application received!"
        message={state.message}
        action={
          <Link href="/careers#openings" className="font-brand font-bold tracking-wider text-flame hover:text-gold">
            Browse other open roles →
          </Link>
        }
      />
    );
  }

  return (
    <form onSubmit={onSubmit} className="panel relative space-y-6 p-6 sm:p-10" encType="multipart/form-data">
      <Honeypot />
      {job && <input type="hidden" name="job" value={job.slug} />}

      <div>
        <p className="font-brand text-xs font-bold tracking-logo text-gold">{job ? "APPLYING FOR" : "GENERAL APPLICATION"}</p>
        <p className="mt-1 font-display text-2xl font-bold">{job ? job.title : "Tell us where you'd make an impact"}</p>
      </div>

      {!job && <SelectField name="role" label="Area of interest" options={roles} defaultValue="" />}

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField name="name" label="Full name" required autoComplete="name" error={e.name} />
        <TextField name="email" label="Email" type="email" required autoComplete="email" error={e.email} />
        <TextField name="phone" label="Phone (with country code)" type="tel" required autoComplete="tel" error={e.phone} />
        <TextField name="location" label="Current location" required autoComplete="address-level2" error={e.location} />
        <SelectField name="experience" label="Experience" options={experienceOptions} required error={e.experience} />
        <SelectField name="noticePeriod" label="Notice period" options={noticeOptions} />
        <TextField name="linkedin" label="LinkedIn profile URL" inputMode="url" error={e.linkedin} />
        <TextField name="portfolio" label="Portfolio / GitHub URL" inputMode="url" error={e.portfolio} />
      </div>

      <ResumeDropzone serverError={e.resume} response={state} />

      <TextAreaField name="coverLetter" label="Why are you interested in this role? (optional)" rows={5} maxLength={5000} />

      <ConsentField error={e.consent}>
        I consent to YAADHUM storing my application and resume for recruitment purposes for up to 12 months, as described in the{" "}
        <Link href="/privacy" className="text-flame underline-offset-2 hover:underline">
          privacy policy
        </Link>
        .
      </ConsentField>

      <FormAlert state={state} />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-cream/45">Every application is reviewed by a member of our talent team.</p>
        <SubmitButton pending={pending}>
          {pending ? "Submitting…" : "Submit application"}
          {!pending && <Send className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />}
        </SubmitButton>
      </div>
    </form>
  );
}
