import heroImg from "@/assets/hero-scan.jpg";

export function Hero() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      <div className="absolute inset-0 grid-bg radial-fade" aria-hidden />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-lime/10 blur-3xl" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface/60 backdrop-blur text-xs font-mono text-muted-foreground mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-lime animate-blink" />
            v2.0 — POSE ESTIMATION ENGINE LIVE
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight text-balance">
            Measure 2,000 people <br className="hidden sm:block" />
            in the time it takes <br className="hidden sm:block" />
            to measure <span className="relative inline-block">
              <span className="text-lime">one.</span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                <path d="M2 5 Q 100 1, 198 5" stroke="currentColor" strokeWidth="2" className="text-lime" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="mt-8 text-lg text-muted-foreground max-w-xl leading-relaxed">
            FitScan AI replaces the tape with your phone camera. Capture a front and side
            photo — get shoulder, chest, waist, hip, sleeve and inseam in 5 seconds, accurate
            to ±1 cm.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#cta"
              className="group inline-flex items-center gap-2 bg-lime text-lime-foreground px-6 py-3.5 rounded-md font-semibold hover:opacity-90 transition-all hover:gap-3"
            >
              Start a pilot
              <span aria-hidden>→</span>
            </a>
            <a
              href="#how"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md border border-border hover:bg-surface transition-colors text-sm font-medium"
            >
              <span className="w-7 h-7 rounded-full bg-surface border border-border grid place-items-center text-lime">▶</span>
              Watch 90s demo
            </a>
          </div>

          <dl className="mt-14 grid grid-cols-3 gap-6 max-w-lg">
            {[
              { v: "±1 cm", l: "Accuracy" },
              { v: "40s", l: "Per person" },
              { v: "80%", l: "Time saved" },
            ].map((s) => (
              <div key={s.l} className="border-l-2 border-lime/50 pl-4">
                <dt className="font-display text-3xl font-bold">{s.v}</dt>
                <dd className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="relative rounded-2xl overflow-hidden border border-border bg-surface shadow-soft">
            <img
              src={heroImg}
              alt="AI scanning a body silhouette with measurement annotations for chest, waist, hip, and sleeve"
              width={1024}
              height={1024}
              className="w-full h-auto"
            />
            {/* Scanning beam */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 scan-line opacity-60 animate-scan" aria-hidden />
            {/* HUD corners */}
            {[
              "top-3 left-3 border-t-2 border-l-2",
              "top-3 right-3 border-t-2 border-r-2",
              "bottom-3 left-3 border-b-2 border-l-2",
              "bottom-3 right-3 border-b-2 border-r-2",
            ].map((c) => (
              <div key={c} className={`absolute w-6 h-6 border-lime ${c}`} aria-hidden />
            ))}
            {/* Floating data card */}
            <div className="absolute bottom-5 left-5 right-5 backdrop-blur-md bg-background/70 border border-border rounded-lg px-4 py-3 font-mono text-xs">
              <div className="flex items-center justify-between text-muted-foreground mb-2">
                <span>SCAN_ID #4821</span>
                <span className="text-lime">● LIVE</span>
              </div>
              <div className="grid grid-cols-3 gap-x-4 gap-y-1">
                {[
                  ["CHEST", "98.2"],
                  ["WAIST", "82.4"],
                  ["HIP", "101.1"],
                  ["SHLDR", "44.8"],
                  ["SLEEV", "62.3"],
                  ["INSEM", "78.9"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="text-lime">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating badge */}
          <div className="absolute -left-6 top-10 hidden lg:flex animate-float bg-surface-elevated border border-border rounded-xl px-4 py-3 shadow-soft items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-lime/15 border border-lime/40 grid place-items-center text-lime text-lg">✓</div>
            <div>
              <div className="text-sm font-semibold">Pose verified</div>
              <div className="text-xs text-muted-foreground font-mono">FRONT · 96% conf.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
