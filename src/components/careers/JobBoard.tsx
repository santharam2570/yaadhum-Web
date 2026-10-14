"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import { ArrowUpRight, Briefcase, Clock, MapPin, Search, X } from "lucide-react";
import { formatDate } from "@/data/blog";
import { workModes, type Job } from "@/data/careers";

const ALL = "All";

function Pills({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2">
      {[ALL, ...options].map((o) => {
        const on = value === o;
        return (
          <button
            key={o}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(o)}
            className={`rounded-full border px-4 py-2 text-sm transition ${on ? "border-flame bg-flame/15 text-cream" : "border-cream/10 text-cream/60 hover:border-cream/30 hover:text-cream"}`}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

export function JobBoard({ jobs, departments }: { jobs: Job[]; departments: string[] }) {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState(ALL);
  const [mode, setMode] = useState(ALL);
  const deferredQuery = useDeferredValue(query);

  const results = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    return jobs.filter((j) => {
      if (department !== ALL && j.department !== department) return false;
      if (mode !== ALL && j.workMode !== mode) return false;
      if (!q) return true;
      return [j.title, j.department, j.location, j.summary, ...j.skills].join(" ").toLowerCase().includes(q);
    });
  }, [jobs, department, mode, deferredQuery]);

  const filtered = query || department !== ALL || mode !== ALL;
  const reset = () => {
    setQuery("");
    setDepartment(ALL);
    setMode(ALL);
  };

  return (
    <div>
      <div className="panel space-y-5 p-5 sm:p-7">
        <label className="relative block">
          <span className="sr-only">Search roles</span>
          <Search className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-cream/40" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by role, skill or location…"
            className="w-full rounded-full border border-cream/10 bg-ink/70 py-4 pr-5 pl-14 text-cream placeholder:text-cream/35 focus:border-flame focus:ring-4 focus:ring-flame/10 focus:outline-none"
          />
        </label>
        <div className="grid gap-4 lg:grid-cols-[auto_1fr] lg:items-center">
          <p className="font-brand text-xs font-bold tracking-logo text-gold">TEAM</p>
          <Pills label="Filter by team" options={departments} value={department} onChange={setDepartment} />
          <p className="font-brand text-xs font-bold tracking-logo text-gold">WORK MODE</p>
          <Pills label="Filter by work mode" options={workModes} value={mode} onChange={setMode} />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <p aria-live="polite" className="text-sm text-cream/55">
          Showing <span className="font-semibold text-cream">{results.length}</span> of {jobs.length} open roles
        </p>
        {filtered && (
          <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 text-sm font-semibold text-flame hover:text-gold">
            <X className="size-4" /> Clear filters
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <ul className="mt-4 space-y-3">
          {results.map((job) => (
            <li key={job.slug} className="animate-rise">
              <Link
                href={`/careers/${job.slug}`}
                className="panel spotlight group grid gap-4 p-6 transition sm:p-7 lg:grid-cols-[1.6fr_1fr_auto] lg:items-center"
              >
                <div>
                  <p className="font-brand text-xs font-bold tracking-logo text-gold">{job.department.toUpperCase()}</p>
                  <h3 className="mt-1.5 font-display text-2xl font-bold transition-colors group-hover:text-flame">{job.title}</h3>
                  <p className="mt-1.5 line-clamp-2 text-sm text-cream/55">{job.summary}</p>
                </div>
                <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-cream/65 lg:flex-col lg:gap-1.5">
                  <li className="flex items-center gap-2">
                    <MapPin className="size-4 text-flame" /> {job.location}
                  </li>
                  <li className="flex items-center gap-2">
                    <Briefcase className="size-4 text-flame" /> {job.type} · {job.workMode}
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="size-4 text-flame" /> {job.experience} · Posted {formatDate(job.postedAt)}
                  </li>
                </ul>
                <span className="inline-flex items-center gap-2 font-brand font-bold tracking-wider text-flame lg:justify-self-end">
                  View & apply
                  <span className="grid size-10 place-items-center rounded-full border border-cream/15 transition group-hover:border-flame group-hover:bg-fire group-hover:text-white">
                    <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-4 rounded-3xl border border-dashed border-cream/15 p-10 text-center">
          <p className="font-display text-2xl font-bold">No roles match those filters — yet.</p>
          <p className="mx-auto mt-2 max-w-md text-cream/55">Try a different search, or send us a general application and we&apos;ll be in touch when the right role opens.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={reset} className="rounded-full border border-cream/20 px-5 py-2.5 font-brand font-bold tracking-wider hover:border-flame hover:text-flame">
              Clear filters
            </button>
            <a href="#apply" className="rounded-full bg-fire px-5 py-2.5 font-brand font-bold tracking-wider text-white">
              General application
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
