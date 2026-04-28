import heroImg from "@/assets/hero-scan.jpg";
import logo from "@/assets/metriva-logo.png";

export function Hero() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      <div className="absolute inset-0 grid-bg radial-fade" aria-hidden />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-royal/10 blur-3xl" aria-hidden />
      <div className="absolute top-40 right-0 w-[500px] h-[500px] rounded-full bg-cyan-glow/15 blur-3xl animate-float" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface-elevated/80 backdrop-blur text-xs font-mono text-muted-foreground mb-6 animate-fade-up">
            <img src={logo} alt="" className="w-4 h-4 object-contain" />
            METRIVA v2.0 — POSE ENGINE LIVE
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight text-balance animate-fade-up" style={{ animationDelay: "60ms" }}>
            The tape measure, <br className="hidden sm:block" />
            <span className="brand-text">reinvented</span> for <br className="hidden sm:block" />
            the smartphone era.
          </h1>

          <p className="mt-8 text-lg text-muted-foreground max-w-xl leading-relaxed animate-fade-up" style={{ animationDelay: "140ms" }}>
            Metriva.ai turns a front-and-side photo into shoulder, chest, waist, hip,
            sleeve and inseam — accurate to ±1 cm, ready for the cutting table in
            under five seconds per fitting.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4 animate-fade-up" style={{ animationDelay: "220ms" }}>
            <a
              href="#cta"
              className="group inline-flex items-center gap-2 brand-gradient text-white px-6 py-3.5 rounded-md font-semibold hover:gap-3 transition-all shadow-royal"
            >
              Start a pilot
              <span aria-hidden>→</span>
            </a>
            <a
              href="#how"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md border border-border hover:bg-surface hover:border-royal/40 transition-all text-sm font-medium"
            >
              <span className="w-7 h-7 rounded-full brand-gradient grid place-items-center text-white text-xs">▶</span>
              Watch 90s demo
            </a>
          </div>

          <dl className="mt-14 grid grid-cols-3 gap-6 max-w-lg animate-fade-up" style={{ animationDelay: "300ms" }}>
            {[
              { v: "±1 cm", l: "Accuracy" },
              { v: "40s", l: "Per fitting" },
              { v: "80%", l: "Time saved" },
            ].map((s) => (
              <div key={s.l} className="border-l-2 border-royal/60 pl-4">
                <dt className="font-display text-3xl font-bold brand-text">{s.v}</dt>
                <dd className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-5 relative animate-fade-up" style={{ animationDelay: "180ms" }}>
          <div className="relative rounded-2xl overflow-hidden border border-border bg-surface-elevated shadow-royal">
            <img
              src={heroImg}
              alt="Metriva scanning a body silhouette with measurement annotations for chest, waist, hip, and sleeve"
              width={1024}
              height={1024}
              className="w-full h-auto"
            />
            {/* Scanning beam */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 scan-line opacity-70 animate-scan" aria-hidden />
            {/* HUD corners */}
            {[
              "top-3 left-3 border-t-2 border-l-2",
              "top-3 right-3 border-t-2 border-r-2",
              "bottom-3 left-3 border-b-2 border-l-2",
              "bottom-3 right-3 border-b-2 border-r-2",
            ].map((c) => (
              <div key={c} className={`absolute w-6 h-6 border-cyan-glow ${c}`} aria-hidden />
            ))}
            {/* Animated stitch line down the center */}
            <svg className="absolute inset-y-4 left-1/2 -translate-x-1/2 h-[calc(100%-2rem)] w-2 pointer-events-none" viewBox="0 0 4 400" preserveAspectRatio="none" aria-hidden>
              <line x1="2" y1="0" x2="2" y2="400" stroke="var(--cyan-glow)" strokeWidth="1.5" className="animate-stitch" />
            </svg>
            {/* Tape ruler at bottom */}
            <div className="absolute bottom-0 inset-x-0 h-4 tape-bg opacity-80" aria-hidden />
            {/* Floating data card */}
            <div className="absolute bottom-8 left-5 right-5 backdrop-blur-md bg-background/85 border border-border rounded-lg px-4 py-3 font-mono text-xs">
              <div className="flex items-center justify-between text-muted-foreground mb-2">
                <span>FITTING #4821</span>
                <span className="text-royal flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-royal animate-blink" />
                  LIVE
                </span>
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
                    <span className="text-royal font-semibold">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating badge */}
          <div className="absolute -left-6 top-10 hidden lg:flex animate-float bg-card border border-border rounded-xl px-4 py-3 shadow-soft items-center gap-3">
            <div className="w-9 h-9 rounded-full brand-gradient grid place-items-center text-white text-lg animate-pulse-ring">✓</div>
            <div>
              <div className="text-sm font-semibold">Pose verified</div>
              <div className="text-xs text-muted-foreground font-mono">FRONT · 96% conf.</div>
            </div>
          </div>

          {/* Floating tape badge */}
          <div className="absolute -right-4 bottom-20 hidden lg:flex animate-float bg-card border border-border rounded-xl px-4 py-3 shadow-soft items-center gap-3" style={{ animationDelay: "1s" }}>
            <svg className="w-9 h-9 text-royal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="9" />
              <circle cx="12" cy="12" r="3" />
              <path d="M12 3v2M12 19v2M3 12h2M19 12h2" />
            </svg>
            <div>
              <div className="text-sm font-semibold">Tape-grade</div>
              <div className="text-xs text-muted-foreground font-mono">±1.0 cm</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
