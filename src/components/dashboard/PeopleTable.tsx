import { useMemo, useState } from "react";
import { store, usePeople, type Person, type Status } from "@/lib/fitscan-store";
import { CaptureModal } from "./CaptureModal";
import { MeasurementEditor } from "./MeasurementEditor";

const STATUS_STYLES: Record<Status, string> = {
  pending: "bg-muted/30 text-muted-foreground border-border",
  scanning: "bg-lime/15 text-lime border-lime/40",
  review: "bg-amber-400/15 text-amber-300 border-amber-400/40",
  flagged: "bg-red-500/15 text-red-300 border-red-500/40",
  done: "bg-lime/20 text-lime border-lime/50",
};

const STATUS_LABEL: Record<Status, string> = {
  pending: "Pending",
  scanning: "Scanning…",
  review: "Review",
  flagged: "Re-take",
  done: "Done",
};

export function PeopleTable() {
  const people = usePeople();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Status | "all">("all");
  const [scanning, setScanning] = useState<Person | null>(null);
  const [editing, setEditing] = useState<Person | null>(null);

  const filtered = useMemo(() => {
    return people.filter((p) => {
      if (filter !== "all" && p.status !== filter) return false;
      if (!q) return true;
      const s = q.toLowerCase();
      return (
        p.name.toLowerCase().includes(s) ||
        p.employeeId.toLowerCase().includes(s) ||
        (p.department ?? "").toLowerCase().includes(s)
      );
    });
  }, [people, q, filter]);

  // Keep the modal in sync with store updates so edit-after-scan shows fresh data
  const liveScanning = scanning ? people.find((p) => p.id === scanning.id) ?? null : null;
  const liveEditing = editing ? people.find((p) => p.id === editing.id) ?? null : null;

  const counts: Record<Status | "all", number> = {
    all: people.length,
    pending: 0,
    scanning: 0,
    review: 0,
    flagged: 0,
    done: 0,
  };
  people.forEach((p) => {
    counts[p.status]++;
  });

  const FILTERS: (Status | "all")[] = ["all", "pending", "review", "flagged", "done"];

  return (
    <div className="rounded-xl border border-border bg-surface overflow-hidden">
      <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-border">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name, ID, department…"
          className="flex-1 min-w-[220px] bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-lime"
        />
        <div className="flex items-center gap-1 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs px-3 py-1.5 rounded-md border transition font-mono uppercase tracking-wider ${
                filter === f
                  ? "border-lime text-lime bg-lime/10"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {f} <span className="opacity-60">({counts[f]})</span>
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="px-5 py-16 text-center">
          <div className="font-mono text-xs text-muted-foreground mb-2">// QUEUE EMPTY</div>
          <p className="text-muted-foreground">
            Import a CSV roster or load samples to populate the operator queue.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-border bg-background/40 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3">Employee</th>
                <th className="px-3 py-3">Dept</th>
                <th className="px-3 py-3">H (cm)</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3">Conf.</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-border/60 hover:bg-surface-elevated/40">
                  <td className="px-5 py-3">
                    <div className="font-medium">{p.name}</div>
                    <div className="font-mono text-xs text-muted-foreground">{p.employeeId} · {p.gender}</div>
                  </td>
                  <td className="px-3 py-3 text-muted-foreground">{p.department ?? "—"}</td>
                  <td className="px-3 py-3 font-mono tabular-nums">{p.height}</td>
                  <td className="px-3 py-3">
                    <span className={`inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded border ${STATUS_STYLES[p.status]}`}>
                      {STATUS_LABEL[p.status]}
                    </span>
                  </td>
                  <td className="px-3 py-3 font-mono text-xs">
                    {p.confidence != null ? (
                      <span className={p.confidence >= 85 ? "text-lime" : p.confidence >= 75 ? "text-amber-300" : "text-red-400"}>
                        {p.confidence}%
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="inline-flex items-center gap-2">
                      {(p.status === "pending" || p.status === "flagged") && (
                        <button
                          onClick={() => setScanning(p)}
                          className="text-xs px-3 py-1.5 rounded-md bg-lime text-lime-foreground font-semibold hover:opacity-90 transition"
                        >
                          {p.status === "flagged" ? "Re-scan" : "Scan"}
                        </button>
                      )}
                      {(p.status === "review" || p.status === "done" || p.status === "flagged") && p.measurements && (
                        <button
                          onClick={() => setEditing(p)}
                          className="text-xs px-3 py-1.5 rounded-md border border-border hover:bg-surface-elevated transition"
                        >
                          {p.status === "done" ? "View" : "Review"}
                        </button>
                      )}
                      <button
                        onClick={() => store.remove(p.id)}
                        className="text-xs text-muted-foreground hover:text-red-400 transition px-1"
                        aria-label="Remove"
                      >
                        ✕
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {liveScanning && <CaptureModal person={liveScanning} onClose={() => setScanning(null)} />}
      {liveEditing && <MeasurementEditor person={liveEditing} onClose={() => setEditing(null)} />}
    </div>
  );
}
