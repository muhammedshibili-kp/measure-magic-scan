import { useState, useEffect } from "react";
import { store, type Person, type Measurements } from "@/lib/fitscan-store";

const FIELDS: { key: keyof Measurements; label: string }[] = [
  { key: "shoulder", label: "Shoulder" },
  { key: "chest", label: "Chest" },
  { key: "waist", label: "Waist" },
  { key: "hip", label: "Hip" },
  { key: "sleeve", label: "Sleeve" },
  { key: "inseam", label: "Inseam" },
];

export function MeasurementEditor({ person, onClose }: { person: Person; onClose: () => void }) {
  const [m, setM] = useState<Measurements>(
    person.measurements ?? { shoulder: 0, chest: 0, waist: 0, hip: 0, sleeve: 0, inseam: 0 },
  );
  const [notes, setNotes] = useState(person.notes ?? "");

  useEffect(() => {
    if (person.measurements) setM(person.measurements);
    setNotes(person.notes ?? "");
  }, [person.id]);

  function save(approve: boolean) {
    store.update(person.id, {
      measurements: m,
      notes: notes || undefined,
      status: approve ? "done" : person.status,
    });
    onClose();
  }

  const conf = person.confidence ?? 0;
  const confColor = conf >= 85 ? "text-lime" : conf >= 75 ? "text-amber-300" : "text-red-400";

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-background/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-xl rounded-2xl border border-border bg-surface shadow-soft overflow-hidden">
        <header className="px-5 py-3 border-b border-border bg-surface-elevated flex items-center justify-between">
          <div>
            <div className="font-display font-semibold">{person.name}</div>
            <div className="font-mono text-xs text-muted-foreground">
              {person.employeeId} · {person.height} cm
            </div>
          </div>
          <div className="text-right">
            <div className={`font-display text-2xl font-bold ${confColor}`}>{conf}%</div>
            <div className="text-[10px] font-mono text-muted-foreground tracking-wider">CONFIDENCE</div>
          </div>
        </header>

        {person.status === "flagged" && (
          <div className="mx-5 mt-5 rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm">
            <span className="font-semibold text-red-300">Low confidence.</span>{" "}
            <span className="text-muted-foreground">
              Recommend re-take. You can still edit and approve manually.
            </span>
          </div>
        )}

        <div className="p-5 grid grid-cols-2 gap-4">
          {FIELDS.map((f) => (
            <label key={f.key} className="block">
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                {f.label} (cm)
              </span>
              <input
                type="number"
                step="0.1"
                value={m[f.key]}
                onChange={(e) => setM({ ...m, [f.key]: parseFloat(e.target.value) || 0 })}
                className="mt-1 w-full bg-background border border-border rounded-md px-3 py-2 text-sm font-mono focus:outline-none focus:border-lime"
              />
            </label>
          ))}
        </div>

        <div className="px-5 pb-5">
          <label className="block">
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Operator notes
            </span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              maxLength={500}
              placeholder="Optional — fit preference, alterations, etc."
              className="mt-1 w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-lime resize-none"
            />
          </label>
        </div>

        <footer className="px-5 py-4 border-t border-border bg-background/40 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="text-sm px-4 py-2 rounded-md border border-border hover:bg-surface-elevated transition"
          >
            Cancel
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => save(false)}
              className="text-sm px-4 py-2 rounded-md border border-border hover:bg-surface-elevated transition"
            >
              Save draft
            </button>
            <button
              onClick={() => save(true)}
              className="text-sm px-4 py-2 rounded-md bg-lime text-lime-foreground font-semibold hover:opacity-90 transition"
            >
              Approve & finalize
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
