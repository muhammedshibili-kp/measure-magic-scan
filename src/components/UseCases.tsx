const cases = [
  { tag: "Defense & cadets", title: "12,000 cadets, 3 days, zero spreadsheets", metric: "98.6%", label: "first-pass accuracy" },
  { tag: "Corporate uniforms", title: "Onboard a 5,000-person workforce in a week", metric: "4.2 days", label: "roster to delivery" },
  { tag: "School uniforms", title: "Annual fittings without pulling kids from class", metric: "32s", label: "average per student" },
  { tag: "Bespoke tailoring", title: "Remote measurements for distributed clients", metric: "0", label: "in-store visits required" },
];

export function UseCases() {
  return (
    <section id="use-cases" className="py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-lime mb-4">— Use cases</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight text-balance">
            Wherever someone needs to wear something that fits.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {cases.map((c) => (
            <article
              key={c.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-8 hover:border-lime/40 transition-colors"
            >
              <div className="absolute -right-20 -top-20 w-60 h-60 rounded-full bg-lime/5 group-hover:bg-lime/10 transition-colors blur-2xl" />
              <div className="relative">
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{c.tag}</span>
                <h3 className="font-display text-2xl font-semibold mt-3 mb-8 leading-snug">
                  {c.title}
                </h3>
                <div className="flex items-end gap-3 pt-6 border-t border-border">
                  <span className="font-display text-4xl font-bold text-lime">{c.metric}</span>
                  <span className="text-sm text-muted-foreground pb-1.5">{c.label}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
