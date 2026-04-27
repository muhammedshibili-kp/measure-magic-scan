const steps = [
  {
    n: "01",
    t: "Import your roster",
    d: "Upload a CSV or Excel of 2,000+ names. We deduplicate, validate, and route each person to the right operator.",
  },
  {
    n: "02",
    t: "Capture front + side",
    d: "On-screen ghost overlay guides posture and distance. Pose estimation confirms the frame before the shutter fires.",
  },
  {
    n: "03",
    t: "AI extracts measurements",
    d: "MediaPipe landmarks + contour detection convert pixels to cm using the person's height and the camera's focal length.",
  },
  {
    n: "04",
    t: "Review & export",
    d: "Operator confirms or nudges any value. Tap submit, the next person loads. Export production-ready Excel any time.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-lime mb-4">— How it works</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight text-balance">
            From a folder of names <br /> to a production-ready spec sheet.
          </h2>
        </div>

        <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {steps.map((s) => (
            <li key={s.n} className="bg-background p-8 hover:bg-surface transition-colors group">
              <div className="font-mono text-xs text-lime mb-8">STEP {s.n}</div>
              <h3 className="font-display text-xl font-semibold mb-3">{s.t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              <div className="mt-8 h-px w-8 bg-foreground/30 group-hover:w-16 group-hover:bg-lime transition-all" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
