export function Logos() {
  const items = [
    "RAYMOND ATELIER",
    "UNIFORMA",
    "SAVILE & CO.",
    "CADET HOUSE",
    "ATELIER 9",
    "FORMA STUDIO",
  ];
  return (
    <section className="border-y border-border bg-surface/60 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-1 tape-bg opacity-60" aria-hidden />
      <div className="max-w-7xl mx-auto px-6 py-10">
        <p className="text-center text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-6">
          Trusted by ateliers and manufacturers fitting 100,000+ garments a year
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-6 items-center">
          {items.map((l, i) => (
            <div
              key={l}
              className="font-display text-base lg:text-lg font-semibold text-muted-foreground/80 text-center tracking-wider hover:text-royal transition-colors animate-fade-in"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {l}
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1 tape-bg opacity-60" aria-hidden />
    </section>
  );
}
