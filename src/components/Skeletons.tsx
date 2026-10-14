/** Shown only if a detail page's params haven't resolved yet (e.g. a slug that wasn't prerendered). */
export function DetailSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading" className="mx-auto max-w-7xl animate-pulse px-5 pt-40 pb-24 lg:px-8">
      <div className="h-4 w-40 rounded-full bg-cream/10" />
      <div className="mt-10 h-14 w-3/4 rounded-2xl bg-cream/10" />
      <div className="mt-4 h-14 w-1/2 rounded-2xl bg-cream/10" />
      <div className="mt-8 h-5 w-2/3 rounded-full bg-cream/5" />
      <div className="mt-3 h-5 w-1/2 rounded-full bg-cream/5" />
      <div className="mt-16 grid gap-4 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-40 rounded-3xl bg-cream/5" />
        ))}
      </div>
    </div>
  );
}
