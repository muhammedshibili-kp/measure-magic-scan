export function CTA() {
  return (
    <section id="cta" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg radial-fade opacity-50" aria-hidden />
      <div className="max-w-5xl mx-auto px-6 relative">
        <div className="relative rounded-3xl border border-royal/30 bg-card p-12 sm:p-16 text-center overflow-hidden shadow-royal animate-fade-up">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-royal/20 blur-3xl" aria-hidden />
          <div className="absolute -bottom-32 right-0 w-96 h-96 rounded-full bg-cyan-glow/20 blur-3xl" aria-hidden />
          <div className="absolute inset-x-0 top-0 h-1 brand-gradient" aria-hidden />
          <div className="absolute inset-x-0 bottom-0 h-2 tape-bg opacity-70" aria-hidden />
          <div className="relative">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-royal mb-6">— Pilot programme</p>
            <h2 className="font-display text-4xl sm:text-6xl font-bold leading-[1.05] tracking-tight text-balance">
              Measure your first <br /> 100 fittings. <span className="brand-text">Free.</span>
            </h2>
            <p className="mt-6 text-muted-foreground max-w-xl mx-auto">
              We'll set up your project, train two operators, and validate accuracy
              against your tape measurements — at no cost.
            </p>

            <form className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="you@atelier.com"
                className="flex-1 px-4 py-3.5 rounded-md bg-background border border-border text-sm focus:outline-none focus:border-royal focus:ring-2 focus:ring-royal/20 transition-all"
              />
              <button
                type="submit"
                className="brand-gradient text-white px-6 py-3.5 rounded-md font-semibold hover:opacity-90 hover:scale-[1.02] transition-all whitespace-nowrap shadow-md"
              >
                Request access →
              </button>
            </form>
            <p className="mt-4 text-xs text-muted-foreground font-mono">
              SOC 2 in progress · GDPR · DPDP · No credit card required
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
