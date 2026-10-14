"use server";

import { headers } from "next/headers";
import { getJob } from "@/data/careers";
import { RESUME_EXTENSIONS, RESUME_MAX_BYTES, type FormState } from "@/lib/form-state";
import { hasSubscriber, saveSubmission } from "@/lib/storage";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

async function rateLimited(kind: string) {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "local";
  const key = `${kind}:${ip}`;
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > MAX_PER_WINDOW;
}

function text(fd: FormData, key: string, max = 200) {
  const v = fd.get(key);
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function optionalUrl(value: string) {
  if (!value) return "";
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    const u = new URL(withProtocol);
    return u.hostname.includes(".") ? u.toString() : null;
  } catch {
    return null;
  }
}

const isSpam = (fd: FormData) => text(fd, "website").length > 0;

const fail = (errors: Record<string, string>, message = "Please fix the highlighted fields and try again."): FormState => ({
  status: "error",
  message,
  errors,
});

/* -------------------------------- Enquiries -------------------------------- */

export async function submitEnquiry(_prev: FormState, fd: FormData): Promise<FormState> {
  if (isSpam(fd)) return { status: "success" };

  const data = {
    name: text(fd, "name", 120),
    email: text(fd, "email", 160).toLowerCase(),
    company: text(fd, "company", 160),
    phone: text(fd, "phone", 40),
    country: text(fd, "country", 80),
    topic: text(fd, "topic", 60),
    services: fd.getAll("services").filter((s): s is string => typeof s === "string").slice(0, 10),
    budget: text(fd, "budget", 60),
    timeline: text(fd, "timeline", 60),
    message: text(fd, "message", 5000),
    consent: fd.get("consent") === "on",
  };

  const errors: Record<string, string> = {};
  if (data.name.length < 2) errors.name = "Please enter your full name.";
  if (!EMAIL.test(data.email)) errors.email = "Please enter a valid email address.";
  if (data.message.length < 10) errors.message = "Please tell us a little more (at least 10 characters).";
  if (!data.consent) errors.consent = "Please agree to our privacy policy so we can respond.";
  if (Object.keys(errors).length) return fail(errors);

  if (await rateLimited("enquiry")) {
    return { status: "error", message: "Too many submissions from your network. Please try again in a few minutes or email us directly." };
  }

  try {
    await saveSubmission("enquiries", data);
  } catch (err) {
    console.error("[enquiry] failed to save", err);
    return { status: "error", message: "Something went wrong on our side. Please email us directly and we'll respond quickly." };
  }
  return { status: "success", message: `Thank you, ${data.name.split(" ")[0]}. Our team will respond within one business day.` };
}

/* ------------------------------ Job applications ----------------------------- */

const SIGNATURES: Record<string, number[][]> = {
  ".pdf": [[0x25, 0x50, 0x44, 0x46]],
  ".docx": [[0x50, 0x4b, 0x03, 0x04]],
  ".doc": [[0xd0, 0xcf, 0x11, 0xe0]],
};

async function validResumeContent(file: File, ext: string) {
  const head = new Uint8Array(await file.slice(0, 8).arrayBuffer());
  return (SIGNATURES[ext] ?? []).some((sig) => sig.every((b, i) => head[i] === b));
}

export async function submitApplication(_prev: FormState, fd: FormData): Promise<FormState> {
  if (isSpam(fd)) return { status: "success" };

  const jobSlug = text(fd, "job", 120);
  const job = jobSlug ? getJob(jobSlug) : undefined;
  if (jobSlug && !job) return { status: "error", message: "This position is no longer open. Please submit a general application instead." };

  const linkedin = optionalUrl(text(fd, "linkedin", 300));
  const portfolio = optionalUrl(text(fd, "portfolio", 300));

  const data = {
    jobSlug: job?.slug ?? "general",
    jobTitle: job?.title ?? (text(fd, "role", 120) || "General application"),
    name: text(fd, "name", 120),
    email: text(fd, "email", 160).toLowerCase(),
    phone: text(fd, "phone", 40),
    location: text(fd, "location", 120),
    experience: text(fd, "experience", 40),
    noticePeriod: text(fd, "noticePeriod", 40),
    linkedin: linkedin ?? "",
    portfolio: portfolio ?? "",
    coverLetter: text(fd, "coverLetter", 5000),
    consent: fd.get("consent") === "on",
  };
  const errors: Record<string, string> = {};
  if (data.name.length < 2) errors.name = "Please enter your full name.";
  if (!EMAIL.test(data.email)) errors.email = "Please enter a valid email address.";
  if (data.phone.replace(/\D/g, "").length < 7) errors.phone = "Please enter a valid phone number with country code.";
  if (data.location.length < 2) errors.location = "Please tell us where you are based.";
  if (!data.experience) errors.experience = "Please select your experience.";
  if (linkedin === null) errors.linkedin = "Please enter a valid LinkedIn URL.";
  if (portfolio === null) errors.portfolio = "Please enter a valid URL.";
  if (!data.consent) errors.consent = "Please agree to our privacy policy to continue.";

  const resume = fd.get("resume");
  const file = resume instanceof File && resume.size > 0 ? resume : null;
  if (!file) {
    errors.resume = "Please attach your resume.";
  } else {
    const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
    if (!RESUME_EXTENSIONS.includes(ext)) errors.resume = "Resume must be a PDF, DOC or DOCX file.";
    else if (file.size > RESUME_MAX_BYTES) errors.resume = "Resume must be 5 MB or smaller.";
    else if (!(await validResumeContent(file, ext))) errors.resume = "This file doesn't look like a valid document. Please re-export and try again.";
  }
  if (Object.keys(errors).length || !file) return fail(errors);

  if (await rateLimited("application")) {
    return { status: "error", message: "Too many applications from your network. Please try again in a few minutes." };
  }

  try {
    await saveSubmission("applications", data, file);
  } catch (err) {
    console.error("[application] failed to save", err);
    return { status: "error", message: "We couldn't save your application. Please try again or email your resume to our careers team." };
  }
  return {
    status: "success",
    message: `Thanks, ${data.name.split(" ")[0]}! Your application for ${data.jobTitle} has been received. Our talent team reviews every application and will be in touch within 10 working days.`,
  };
}

/* --------------------------------- Newsletter -------------------------------- */

export async function subscribe(_prev: FormState, fd: FormData): Promise<FormState> {
  if (isSpam(fd)) return { status: "success" };
  const email = text(fd, "email", 160).toLowerCase();
  if (!EMAIL.test(email)) return fail({ email: "Please enter a valid email address." }, "Please enter a valid email address.");
  if (await rateLimited("subscribe")) return { status: "error", message: "Please try again in a few minutes." };

  try {
    if (!(await hasSubscriber(email))) await saveSubmission("subscribers", { email, source: text(fd, "source", 120) });
  } catch (err) {
    console.error("[subscribe] failed to save", err);
    return { status: "error", message: "Something went wrong. Please try again." };
  }
  return { status: "success", message: "You're subscribed. Look out for the next YAADHUM briefing." };
}
