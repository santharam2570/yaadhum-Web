"use client";

import { useState } from "react";
import { Check, Link2, Mail } from "lucide-react";
import { LinkedInIcon, XIcon } from "./icons";

export function ShareButtons({ url, title, label = "Share" }: { url: string; title: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link", url);
    }
  };

  const btn = "grid size-10 place-items-center rounded-full border border-cream/15 text-cream/70 transition hover:border-flame hover:bg-flame/10 hover:text-cream";

  return (
    <div className="flex items-center gap-2">
      <span className="mr-1 font-brand text-xs font-bold tracking-logo text-cream/40">{label.toUpperCase()}</span>
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn" className={btn}>
        <LinkedInIcon className="size-4" />
      </a>
      <a href={`https://x.com/intent/post?url=${u}&text=${t}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X" className={btn}>
        <XIcon className="size-4" />
      </a>
      <a href={`mailto:?subject=${t}&body=${u}`} aria-label="Share by email" className={btn}>
        <Mail className="size-4" />
      </a>
      <button type="button" onClick={copy} aria-label={copied ? "Link copied" : "Copy link"} className={btn}>
        {copied ? <Check className="size-4 text-flame" strokeWidth={3} /> : <Link2 className="size-4" />}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? "Link copied to clipboard" : ""}
      </span>
    </div>
  );
}
