import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { GitHubIcon, LinkedInIcon, XIcon } from "./icons";
import { LogoMark } from "./LogoMark";
import { NewsletterForm } from "./NewsletterForm";
import { WorldClocks } from "./WorldClocks";
import { company, officeAddress, offices, telHref } from "@/data/company";
import { products } from "@/data/products";
import { services } from "@/data/services";

const companyLinks = [
  { href: "/about", label: "About us" },
  { href: "/industries", label: "Industries" },
  { href: "/careers", label: "Careers" },
  { href: "/blog", label: "Insights & blog" },
  { href: "/contact", label: "Contact" },
];

const socials = [
  { href: company.social.linkedin, label: "LinkedIn", icon: LinkedInIcon },
  { href: company.social.x, label: "X (Twitter)", icon: XIcon },
  { href: company.social.github, label: "GitHub", icon: GitHubIcon },
];

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-ember-500/15 bg-coal">
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-ember-700/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 pt-16 lg:px-8">
        <div className="grid gap-8 border-b border-cream/8 pb-12 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p className="font-brand text-xs font-bold tracking-logo text-gold">THE YAADHUM BRIEFING</p>
            <h2 className="mt-3 max-w-md font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Practical insights on AI, cloud and automation. Monthly.
            </h2>
          </div>
          <NewsletterForm source="footer" />
        </div>

        <div className="flex flex-col justify-between gap-6 border-b border-cream/8 py-8 md:flex-row md:items-center">
          <p className="font-brand text-xs font-bold tracking-logo text-cream/40">SUPPORT ACROSS TIME ZONES</p>
          <WorldClocks variant="inline" />
        </div>

        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1fr_1.3fr]">
          <div>
            <div className="flex items-center gap-3">
              <LogoMark size={52} />
              <p className="font-brand text-lg leading-tight font-bold tracking-logo text-ember-500">
                YAADHUM
                <span className="block text-[11px] text-cream/60">INTERNATIONAL TECHNOLOGIES</span>
              </p>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/55">
              AI, cloud, software, automation and managed IT services for ambitious businesses around the world.
            </p>
            <ul className="mt-6 flex gap-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="grid size-10 place-items-center rounded-full border border-cream/15 text-cream/70 transition hover:border-flame hover:bg-fire hover:text-white"
                  >
                    <s.icon className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <FooterCol title="COMPANY" links={companyLinks} />
          <FooterCol title="SERVICES" links={services.map((s) => ({ href: `/services/${s.slug}`, label: s.label }))} />
          <FooterCol title="PRODUCTS" links={products.map((p) => ({ href: `/products/${p.slug}`, label: `YAADHUM ${p.name}` }))} />

          <div>
            <h3 className="font-brand text-sm font-bold tracking-logo text-gold">REACH US</h3>
            <ul className="mt-4 space-y-3 text-sm text-cream/60">
              <li className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-ember-500" />
                <a href={`mailto:${company.email}`} className="hover:text-flame">
                  {company.email}
                </a>
              </li>
              {offices.map((o) => (
                <li key={o.id} className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-ember-500" />
                  <span>
                    <span className="block font-semibold text-cream/85">{o.label}</span>
                    <span className="block leading-relaxed">{officeAddress(o)}</span>
                    <a href={telHref(o.phone)} className="mt-1 inline-flex items-center gap-1.5 hover:text-flame">
                      <Phone className="size-3.5 text-ember-500" /> {o.phone}
                    </a>
                  </span>
                </li>
              ))}
            </ul>
            <Link href="/contact" className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-ember-500/40 px-4 py-2 font-brand text-sm font-bold tracking-wider text-flame transition hover:bg-fire hover:text-white">
              Start a project <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>

      <div aria-hidden className="relative mx-auto max-w-7xl overflow-hidden px-5 lg:px-8">
        <p className="text-outline -mb-[0.2em] text-center font-brand text-[18vw] leading-none font-bold tracking-[0.06em] transition-colors duration-700 select-none hover:text-ember-500/15 lg:text-[15rem]">
          YAADHUM
        </p>
      </div>

      <div className="relative border-t border-ember-500/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-cream/40 sm:flex-row lg:px-8">
          <p>© {company.legalName}. All rights reserved.</p>
          <ul className="flex gap-5">
            <li>
              <Link href="/privacy" className="hover:text-cream">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-cream">
                Terms of Use
              </Link>
            </li>
            <li>
              <a href="/blog/rss.xml" className="hover:text-cream">
                RSS
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: readonly { href: string; label: string }[] }) {
  return (
    <div>
      <h3 className="font-brand text-sm font-bold tracking-logo text-gold">{title}</h3>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="group inline-flex items-center gap-1 text-cream/55 transition hover:text-cream">
              <span className="h-px w-0 bg-flame transition-all duration-300 group-hover:w-3" />
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
