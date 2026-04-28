const steps = [
  {
    n: "01",
    t: "Import your roster",
    d: "Upload a CSV or Excel of 2,000+ names. We deduplicate, validate, and route each person to the right operator.",
    icon: "📋",
  },
  {
    n: "02",
    t: "Capture front + side",
    d: "On-screen ghost overlay guides posture and distance. Pose estimation confirms the frame before the shutter fires.",
    icon: "📸",
  },
  {
    n: "03",
    t: "AI extracts measurements",
    d: "Pose landmarks + contour detection convert pixels to centimetres using the subject's height as the calibration ruler.",
    icon: "📐",
  },
  {
    n: "04",
    t: "Review & cut",
    d: "Operator confirms or nudges any value. Tap submit, the next person loads. Export production-ready Excel any time.",
    icon: "✂️",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16 animate-fade-up">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-royal mb-4">— How it works</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight text-balance">
            From a folder of names <br /> to a <span className="brand-text">production-ready</span> spec sheet.
          </h2>
        </div>

        <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {steps.map((s, i) => (
            <li
              key={s.n}
              className="bg-card p-8 hover:bg-surface-elevated transition-colors group animate-fade-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="font-mono text-xs text-royal">STEP {s.n}</div>
                <span className="text-2xl grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all" aria-hidden>{s.icon}</span>
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">{s.t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              <div className="mt-8 h-px w-8 bg-foreground/30 group-hover:w-16 group-hover:bg-royal transition-all duration-500" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
