type Status = "pass" | "warn" | "fail";

const checks: { label: string; detail: string; value: string; status: Status }[] = [
  { label: "Pose alignment", detail: "Shoulders level, arms at 15° A-pose", value: "98%", status: "pass" },
  { label: "Full body in frame", detail: "Head crown to ankle visible", value: "OK", status: "pass" },
  { label: "Lighting uniformity", detail: "No harsh shadows on torso edge", value: "92%", status: "pass" },
  { label: "Background contrast", detail: "Silhouette separable from backdrop", value: "74%", status: "warn" },
  { label: "Calibration marker", detail: "A4 sheet detected at feet — 21.0 cm", value: "Locked", status: "pass" },
  { label: "Camera tilt", detail: "Phone gyroscope vs. vertical", value: "4.2°", status: "warn" },
  { label: "Clothing fit", detail: "Loose fabric detected near waistline", value: "Re-take", status: "fail" },
];

const dot: Record<Status, string> = {
  pass: "bg-lime",
  warn: "bg-amber-400",
  fail: "bg-red-500",
};

const tag: Record<Status, string> = {
  pass: "text-lime border-lime/40 bg-lime/10",
  warn: "text-amber-300 border-amber-400/40 bg-amber-400/10",
  fail: "text-red-300 border-red-500/40 bg-red-500/10",
};

const tagLabel: Record<Status, string> = {
  pass: "PASS",
  warn: "REVIEW",
  fail: "RE-TAKE",
};

export function AccuracyValidation() {
  return (
    <section id="accuracy" className="relative py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-14">
          <div className="font-mono text-xs text-lime mb-4">// 04 — VALIDATION LAYER</div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-balance">
            Every scan, second-guessed by the model itself.
          </h2>
          <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
            Before a measurement leaves the device, FitScan runs seven independent quality checks.
            If anything looks off — bad pose, glare, baggy fabric — the operator gets a clear flag
            and a one-tap re-take, not a silently wrong number.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Checks panel */}
          <div className="lg:col-span-7 rounded-2xl border border-border bg-surface overflow-hidden shadow-soft">
            <header className="flex items-center justify-between px-5 py-3 border-b border-border bg-surface-elevated">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-lime/70" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">scan_4821 · validation.log</span>
              </div>
              <span className="font-mono text-xs text-muted-foreground">7 checks · 1.2s</span>
            </header>

            <ul className="divide-y divide-border">
              {checks.map((c) => (
                <li key={c.label} className="flex items-center gap-4 px-5 py-4">
                  <span className={`relative w-2.5 h-2.5 rounded-full ${dot[c.status]} shrink-0`}>
                    {c.status !== "pass" && (
                      <span className={`absolute inset-0 rounded-full ${dot[c.status]} animate-ping opacity-60`} />
                    )}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{c.label}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{c.detail}</div>
                  </div>
                  <div className="font-mono text-xs text-muted-foreground tabular-nums w-14 text-right">{c.value}</div>
                  <span className={`font-mono text-[10px] tracking-wider px-2 py-1 rounded border ${tag[c.status]}`}>
                    {tagLabel[c.status]}
                  </span>
                </li>
              ))}
            </ul>

            <footer className="flex items-center justify-between px-5 py-4 border-t border-border bg-background/40">
              <div className="text-sm">
                <span className="text-muted-foreground">Overall confidence </span>
                <span className="font-display text-lg font-bold text-amber-300">81%</span>
              </div>
              <button className="inline-flex items-center gap-2 bg-lime text-lime-foreground px-4 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition">
                Re-take side photo →
              </button>
            </footer>
          </div>

          {/* Side: what we flag */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl border border-amber-400/30 bg-amber-400/5 p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="font-mono text-xs text-amber-300 tracking-wider">REVIEW THRESHOLD · 70–90%</span>
              </div>
              <h3 className="font-display text-xl font-semibold">Soft flags</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Measurement is exported but tagged for supervisor review. Common causes: low contrast
                background, mild camera tilt, partial occlusion of one wrist.
              </p>
            </div>

            <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span className="font-mono text-xs text-red-300 tracking-wider">HARD FLAG · BELOW 70%</span>
              </div>
              <h3 className="font-display text-xl font-semibold">Auto re-take</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Scan is rejected before it touches the database. Operator sees the failing check
                with a plain-English fix: <span className="text-foreground">"Ask subject to tuck in shirt and stand straight."</span>
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6">
              <h3 className="font-display text-xl font-semibold">What we never trust</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {[
                  "Single-photo scans without a calibration reference",
                  "Subjects in jackets, hoodies or layered clothing",
                  "Pose confidence below 85% on any major landmark",
                  "Frames where the gyroscope reports >6° of tilt",
                ].map((t) => (
                  <li key={t} className="flex gap-2">
                    <span className="text-lime mt-1.5 w-1 h-1 rounded-full bg-lime shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
