"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, type LucideIcon } from "lucide-react";
import { LogoMark } from "./LogoMark";
import { productIcons, serviceIcons } from "./icons";
import { company, navLinks } from "@/data/company";
import { products } from "@/data/products";
import { services } from "@/data/services";

type MenuItem = { href: string; title: string; text: string; icon: LucideIcon };

const menus: Record<string, { items: MenuItem[]; cta: { eyebrow: string; title: string; href: string } }> = {
  "/services": {
    items: services.map((s) => ({ href: `/services/${s.slug}`, title: s.title, text: s.short, icon: serviceIcons[s.slug] })),
    cta: { eyebrow: "NOT SURE YET?", title: "Book a free discovery call", href: "/contact" },
  },
  "/products": {
    items: products.map((p) => ({ href: `/products/${p.slug}`, title: p.name, text: p.short, icon: productIcons[p.slug] })),
    cta: { eyebrow: "SEE IT LIVE", title: "Request a personalised product demo", href: "/contact?topic=demo" },
  },
};

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname.startsWith(href);
  const close = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50" style={{ viewTransitionName: "site-header" }}>
      <span ref={progressRef} className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-gold via-flame to-ember-500" />

      <div className="relative z-10 mx-auto max-w-7xl px-3 pt-3 sm:px-5 lg:px-8">
        <nav
          aria-label="Main"
          className={`flex h-16 items-center justify-between rounded-full border pr-2 pl-2 transition-all duration-500 ${
            scrolled && !open ? "border-cream/10 bg-ink/85 shadow-2xl shadow-black/40 backdrop-blur-xl" : "border-transparent"
          }`}
        >
          <Link href="/" className="flex items-center gap-3 rounded-full pr-3" onClick={close} aria-label={`${company.short} home`}>
            <LogoMark size={44} priority />
            <span className="leading-none">
              <span className="block font-brand text-xl font-bold tracking-logo text-ember-500">YAADHUM</span>
              <span className="block font-brand text-[9px] font-semibold tracking-logo text-cream/55">INTERNATIONAL TECHNOLOGIES</span>
            </span>
          </Link>

          <ul className="relative hidden items-center xl:flex" onMouseLeave={() => setPill(null)}>
            <span
              aria-hidden
              className="absolute top-1/2 h-10 -translate-y-1/2 rounded-full bg-cream/[0.07] transition-all duration-300 ease-out"
              style={{ left: pill?.left ?? 0, width: pill?.width ?? 0, opacity: pill ? 1 : 0 }}
            />
            {navLinks.map((link) => {
              const menu = menus[link.href];
              return (
                <li
                  key={link.href}
                  className="group relative"
                  onMouseEnter={(e) => setPill({ left: e.currentTarget.offsetLeft, width: e.currentTarget.offsetWidth })}
                >
                  <Link
                    href={link.href}
                    className={`relative flex items-center gap-1 rounded-full px-4 py-2.5 font-brand text-[15px] font-semibold tracking-wider transition-colors ${
                      isActive(link.href) ? "text-cream" : "text-cream/60 hover:text-cream"
                    }`}
                  >
                    {link.label}
                    {menu && <ChevronDown className="size-3.5 transition-transform duration-300 group-hover:rotate-180" />}
                    {isActive(link.href) && <span className="absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-flame shadow-[0_0_8px_2px] shadow-flame/70" />}
                  </Link>

                  {menu && (
                    <div className="invisible absolute top-full left-1/2 w-[50rem] -translate-x-1/2 translate-y-2 pt-4 opacity-0 transition-all duration-300 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="grid grid-cols-[1fr_1fr_0.8fr] gap-2 rounded-3xl border border-cream/10 bg-coal/95 p-3 shadow-2xl shadow-black/60 backdrop-blur-xl">
                        <div className="col-span-2 grid grid-cols-2 gap-1">
                          {menu.items.map((item) => (
                            <Link key={item.href} href={item.href} className="group/item flex gap-3 rounded-2xl p-3 transition hover:bg-cream/5">
                              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-ember-500/15 transition group-hover/item:bg-fire">
                                <item.icon className="size-5 text-flame transition group-hover/item:text-white" />
                              </span>
                              <span>
                                <span className="block font-display text-[15px] leading-tight font-bold text-cream">{item.title}</span>
                                <span className="mt-1 line-clamp-2 block text-xs leading-snug text-cream/50">{item.text}</span>
                              </span>
                            </Link>
                          ))}
                        </div>
                        <Link href={menu.cta.href} className="relative flex flex-col justify-end overflow-hidden rounded-2xl bg-fire p-5">
                          <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(255,243,223,0.45),transparent_55%)]" />
                          <span className="relative font-brand text-[10px] font-bold tracking-logo text-white/80">{menu.cta.eyebrow}</span>
                          <span className="relative mt-1 font-display text-lg leading-tight font-bold text-white">{menu.cta.title}</span>
                          <ArrowUpRight className="relative mt-3 size-5 text-white" />
                        </Link>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              data-magnetic="0.2"
              className="hidden items-center gap-1.5 rounded-full bg-fire px-5 py-2.5 font-brand text-sm font-bold tracking-wider text-white shadow-lg shadow-ember-700/40 sm:inline-flex"
            >
              Contact Us <ArrowUpRight className="size-4" />
            </Link>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="relative grid size-12 place-items-center rounded-full border border-cream/15 bg-ink/60 backdrop-blur xl:hidden"
            >
              <span className={`absolute h-0.5 w-5 rounded-full bg-cream transition-all duration-300 ${open ? "rotate-45" : "-translate-y-1"}`} />
              <span className={`absolute h-0.5 w-5 rounded-full bg-cream transition-all duration-300 ${open ? "-rotate-45" : "translate-y-1"}`} />
            </button>
          </div>
        </nav>
      </div>

      <div
        id="mobile-menu"
        className={`fixed inset-0 flex flex-col overflow-y-auto bg-ink/98 px-6 pt-28 pb-10 backdrop-blur-2xl transition-[opacity,visibility] duration-500 xl:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="pointer-events-none absolute -top-20 -right-20 size-80 rounded-full bg-ember-600/30 blur-[100px]" />
        {open && (
          <>
            <ul className="relative space-y-1">
              {[{ href: "/", label: "Home" }, ...navLinks, { href: "/contact", label: "Contact" }].map((l, i) => (
                <li key={l.href} className="animate-rise" style={{ animationDelay: `${i * 50}ms` }}>
                  <Link
                    href={l.href}
                    onClick={close}
                    className={`flex items-baseline gap-4 py-1.5 font-display text-4xl font-bold sm:text-5xl ${
                      (l.href === "/" ? pathname === "/" : isActive(l.href)) ? "text-fire" : "text-cream"
                    }`}
                  >
                    <span className="font-brand text-sm text-cream/30">0{i + 1}</span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="relative mt-10 animate-rise font-brand text-xs font-bold tracking-logo text-gold [animation-delay:400ms]">SERVICES</p>
            <div className="relative mt-3 grid animate-rise grid-cols-1 gap-2 [animation-delay:450ms] sm:grid-cols-2">
              {services.map((s) => {
                const Icon = serviceIcons[s.slug];
                return (
                  <Link key={s.slug} href={`/services/${s.slug}`} onClick={close} className="flex items-center gap-2.5 rounded-2xl border border-cream/10 p-3 text-sm text-cream/80">
                    <Icon className="size-4 shrink-0 text-flame" /> {s.title}
                  </Link>
                );
              })}
            </div>
            <div className="relative mt-auto animate-rise pt-10 [animation-delay:500ms]">
              <a href={`mailto:${company.email}`} className="font-display text-xl font-bold text-cream">
                {company.email}
              </a>
              <p className="mt-2 text-sm text-cream/50">{company.tagline}</p>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
