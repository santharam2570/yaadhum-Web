import Link from "next/link";
import { ButtonLink, Swirl } from "@/components/ui";

const quickLinks = [
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/careers", label: "Careers" },
  { href: "/blog", label: "Insights" },
];

export default function NotFound() {
  return (
    <section className="relative grid min-h-[100svh] place-items-center overflow-hidden px-5 pt-24 text-center">
      <div className="pointer-events-none absolute inset-0 grid-lines" />
      <Swirl className="pointer-events-none absolute top-1/2 left-1/2 w-[40rem] -translate-x-1/2 -translate-y-1/2 animate-spin-slow opacity-15" />
      <div className="relative animate-rise">
        <p className="font-display text-[9rem] leading-none font-extrabold text-fire sm:text-[14rem]">404</p>
        <h1 className="mt-4 font-display text-3xl font-bold sm:text-5xl">
          This page isn&apos;t on our map — <span className="font-serif font-normal text-gold italic">yet.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-md text-cream/60">The page you&apos;re looking for has moved or never existed. Let&apos;s get you somewhere useful.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/contact" variant="ghost">
            Contact us
          </ButtonLink>
        </div>
        <nav aria-label="Popular pages" className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-cream/50">
          {quickLinks.map((l) => (
            <Link key={l.href} href={l.href} className="transition hover:text-flame">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
