import { Plus } from "lucide-react";
import { Reveal } from "./Reveal";

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-cream/10 border-y border-cream/10">
      {items.map((f, i) => (
        <Reveal key={f.q} delay={i * 60}>
          <details name="faq" className="group py-2">
            <summary className="flex items-center justify-between gap-6 py-5">
              <span className="font-display text-lg font-bold transition-colors group-hover:text-flame sm:text-xl">{f.q}</span>
              <span className="faq-icon grid size-10 shrink-0 place-items-center rounded-full border border-cream/15 transition-transform duration-300 group-open:border-flame group-open:bg-fire">
                <Plus className="size-4" />
              </span>
            </summary>
            <p className="max-w-3xl pr-16 pb-6 leading-relaxed text-cream/60">{f.a}</p>
          </details>
        </Reveal>
      ))}
    </div>
  );
}
