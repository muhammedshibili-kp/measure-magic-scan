import { useEffect, useState } from "react";
import { store, generateMockScan, type Person } from "@/lib/fitscan-store";

const STEPS = [
  { label: "Initializing camera", ms: 350 },
  { label: "Detecting pose landmarks", ms: 600 },
  { label: "Capturing front frame", ms: 500 },
  { label: "Capturing side frame", ms: 500 },
  { label: "Calibrating with reference", ms: 450 },
  { label: "Computing measurements", ms: 600 },
];

export function CaptureModal({ person, onClose }: { person: Person; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    store.update(person.id, { status: "scanning" });
    let cancelled = false;
    let i = 0;

    function next() {
      if (cancelled) return;
      if (i >= STEPS.length) {
        const result = generateMockScan(person);
        const status = result.confidence < 75 ? "flagged" : "review";
        store.update(person.id, {
          ...result,
          status,
          scannedAt: new Date().toISOString(),
        });
        setDone(true);
        return;
      }
      setStep(i);
      const wait = STEPS[i].ms;
      i++;
      setTimeout(next, wait);
    }
    next();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [person.id]);

  const pct = done ? 100 : Math.round(((step + 0.5) / STEPS.length) * 100);

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-background/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-surface shadow-soft overflow-hidden">
        <header className="px-5 py-3 border-b border-border bg-surface-elevated flex items-center justify-between">
          <div className="font-mono text-xs text-muted-foreground">
            scan_session · {person.employeeId}
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground text-sm"
            aria-label="Close"
          >
            ✕
          </button>
        </header>

        <div className="p-6">
          <div className="text-xs font-mono text-lime mb-2">// SUBJECT</div>
          <div className="font-display text-xl font-semibold">{person.name}</div>
          <div className="text-sm text-muted-foreground">
            {person.gender} · {person.height} cm{person.department ? ` · ${person.department}` : ""}
          </div>

          {/* Faux camera viewport */}
          <div className="mt-5 relative aspect-[4/3] rounded-lg border border-border bg-background overflow-hidden grid-bg">
            <div className="absolute inset-0 grid place-items-center">
              <svg viewBox="0 0 60 120" className="h-3/4 text-lime/70" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="30" cy="12" r="7" />
                <path d="M30 19 V70 M18 30 H42 M22 70 L18 110 M38 70 L42 110" strokeLinecap="round" />
              </svg>
            </div>
            {!done && (
              <div className="pointer-events-none absolute inset-x-0 top-0 h-16 scan-line opacity-70 animate-scan" />
            )}
            {["top-2 left-2 border-t-2 border-l-2", "top-2 right-2 border-t-2 border-r-2", "bottom-2 left-2 border-b-2 border-l-2", "bottom-2 right-2 border-b-2 border-r-2"].map((c) => (
              <div key={c} className={`absolute w-5 h-5 border-lime ${c}`} />
            ))}
            <div className="absolute bottom-2 left-2 right-2 font-mono text-[10px] text-lime flex justify-between">
              <span>● REC</span>
              <span>{pct}%</span>
            </div>
          </div>

          {!done ? (
            <div className="mt-5">
              <div className="h-1.5 rounded-full bg-background overflow-hidden">
                <div
                  className="h-full bg-lime transition-all duration-300"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="mt-3 text-sm font-mono text-muted-foreground">
                <span className="text-lime">→</span> {STEPS[step].label}…
              </div>
            </div>
          ) : (
            <div className="mt-5">
              <div className="flex items-center gap-2 text-lime text-sm font-semibold">
                <span className="w-2 h-2 rounded-full bg-lime" /> Scan complete
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Measurements extracted. Review and confirm in the queue.
              </p>
              <button
                onClick={onClose}
                className="mt-4 w-full bg-lime text-lime-foreground py-2.5 rounded-md font-semibold hover:opacity-90 transition"
              >
                Back to queue
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
