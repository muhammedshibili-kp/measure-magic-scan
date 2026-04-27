export function Logos() {
  const items = ["UNIFORMA", "TAILORED.CO", "STITCHWORKS", "CADET HOUSE", "ATELIER 9", "FORMA STUDIO"];
  return (
    <section className="border-y border-border bg-surface/40">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <p className="text-center text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-6">
          Trusted by manufacturers fitting 100,000+ uniforms a year
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-6 items-center">
          {items.map((l) => (
            <div key={l} className="font-display text-lg font-semibold text-muted-foreground/70 text-center tracking-wider">
              {l}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
