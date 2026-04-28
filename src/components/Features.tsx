const features = [
  {
    title: "Guided ghost overlay",
    desc: "A translucent silhouette tells your operator exactly where the subject should stand. No more retakes.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M12 3a4 4 0 0 1 4 4v2a4 4 0 1 1-8 0V7a4 4 0 0 1 4-4Z" />
        <path d="M5 21v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2" />
      </svg>
    ),
  },
  {
    title: "Auto-calibration",
    desc: "Camera focal length × subject height = millimeter-grade scaling. No reference card required.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M3 7h18M3 12h18M3 17h18" />
        <path d="M7 4v3M12 4v3M17 4v3M7 17v3M12 17v3M17 17v3" />
      </svg>
    ),
  },
  {
    title: "Offline-first",
    desc: "Capture in basements, warehouses, military bases. The app queues scans and syncs the moment Wi-Fi returns.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M12 20a8 8 0 0 0 8-8c0-4-3-7-7-8" />
        <path d="M12 20a8 8 0 0 1-8-8c0-4 3-7 7-8" />
        <path d="M3 3l18 18" />
      </svg>
    ),
  },
  {
    title: "Operator override",
    desc: "Loose garment? AI uncertain? Adjust any value with a slider. Every edit is logged with confidence delta.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M4 7h10M4 12h16M4 17h7" />
        <circle cx="18" cy="7" r="2" />
        <circle cx="14" cy="17" r="2" />
      </svg>
    ),
  },
  {
    title: "Encrypted by default",
    desc: "Images processed on-device when possible. Cloud copies AES-256 encrypted at rest. GDPR & DPDP ready.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <rect x="4" y="11" width="16" height="10" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      </svg>
    ),
  },
  {
    title: "One-tap export",
    desc: "Excel, CSV, or direct API to your CAD/CAM. Map columns once, push thousands of fits to production.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M12 3v12m0 0l-4-4m4 4l4-4" />
        <path d="M5 21h14" />
      </svg>
    ),
  },
];

export function Features() {
  return (
    <section id="features" className="py-28 bg-surface/40 border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 animate-fade-up">
          <div className="max-w-2xl">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-royal mb-4">— What's inside</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight text-balance">
              Built for the field. <br /> Engineered for the <span className="brand-text">cutting table</span>.
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm">
            Six measurements, six guarantees. Every feature exists to remove a step
            between the subject and the cutting table.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {features.map((f, i) => (
            <article
              key={f.title}
              className="bg-card p-8 hover:bg-surface-elevated transition-all group animate-fade-up"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="w-11 h-11 rounded-lg brand-gradient grid place-items-center text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                {f.icon}
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-royal transition-colors">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
