import { Building2, Clock, MapPin, Navigation, Phone } from "lucide-react";
import { mapUrl, offices, officeAddress, telHref, type Office } from "@/data/company";

export function OfficeCard({ office }: { office: Office }) {
  const isHq = office.id === "head-office";
  return (
    <article className="panel spotlight flex h-full flex-col p-6">
      <div className="flex items-center justify-between gap-3">
        <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 font-brand text-[11px] font-bold tracking-logo ${isHq ? "bg-fire text-white" : "bg-ember-500/15 text-gold"}`}>
          <Building2 className="size-3.5" /> {office.label.toUpperCase()}
        </span>
        <span className="text-xs text-cream/45">{office.country}</span>
      </div>
      <h3 className="mt-5 font-display text-2xl font-bold">
        {office.city}
        {office.city !== office.region && <span className="text-cream/45">, {office.region}</span>}
      </h3>
      <address className="mt-3 flex gap-3 text-sm leading-relaxed text-cream/70 not-italic">
        <MapPin className="mt-0.5 size-4 shrink-0 text-flame" />
        <span>{officeAddress(office)}</span>
      </address>
      <ul className="mt-4 space-y-2.5 text-sm">
        <li className="flex items-center gap-3">
          <Phone className="size-4 shrink-0 text-flame" />
          <a href={telHref(office.phone)} className="font-semibold text-cream transition hover:text-flame">
            {office.phone}
          </a>
        </li>
        <li className="flex items-center gap-3 text-cream/60">
          <Clock className="size-4 shrink-0 text-flame" /> {office.hours}
        </li>
      </ul>
      <a
        href={mapUrl(office)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex items-center gap-2 self-start pt-6 font-brand text-sm font-bold tracking-wider text-flame transition hover:text-gold"
      >
        <Navigation className="size-4" /> Get directions
      </a>
    </article>
  );
}

export function OfficeList() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {offices.map((o) => (
        <OfficeCard key={o.id} office={o} />
      ))}
    </div>
  );
}
