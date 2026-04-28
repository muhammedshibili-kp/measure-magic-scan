import * as XLSX from "xlsx";
import { store, usePeople } from "@/lib/fitscan-store";

export function ExportBar() {
  const people = usePeople();
  const done = people.filter((p) => p.status === "done");
  const review = people.filter((p) => p.status === "review");
  const flagged = people.filter((p) => p.status === "flagged");
  const pending = people.filter((p) => p.status === "pending");

  function exportXlsx(scope: "done" | "all") {
    const rows = (scope === "done" ? done : people).map((p) => ({
      "Employee ID": p.employeeId,
      Name: p.name,
      Gender: p.gender,
      Department: p.department ?? "",
      "Height (cm)": p.height,
      Status: p.status,
      "Confidence (%)": p.confidence ?? "",
      "Shoulder (cm)": p.measurements?.shoulder ?? "",
      "Chest (cm)": p.measurements?.chest ?? "",
      "Waist (cm)": p.measurements?.waist ?? "",
      "Hip (cm)": p.measurements?.hip ?? "",
      "Sleeve (cm)": p.measurements?.sleeve ?? "",
      "Inseam (cm)": p.measurements?.inseam ?? "",
      "Scanned At": p.scannedAt ?? "",
      Notes: p.notes ?? "",
    }));

    if (rows.length === 0) return;
    const ws = XLSX.utils.json_to_sheet(rows);
    ws["!cols"] = Object.keys(rows[0]).map((k) => ({ wch: Math.max(12, k.length + 2) }));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Measurements");
    const stamp = new Date().toISOString().slice(0, 10);
    XLSX.writeFile(wb, `fitscan-${scope}-${stamp}.xlsx`);
  }

  const stats = [
    { label: "Total", value: people.length, color: "text-foreground" },
    { label: "Pending", value: pending.length, color: "text-muted-foreground" },
    { label: "Review", value: review.length, color: "text-amber-300" },
    { label: "Re-take", value: flagged.length, color: "text-red-400" },
    { label: "Done", value: done.length, color: "text-lime" },
  ];

  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="grid grid-cols-5 gap-6">
          {stats.map((s) => (
            <div key={s.label}>
              <div className={`font-display text-2xl font-bold tabular-nums ${s.color}`}>{s.value}</div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mt-0.5">
                {s.label}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {people.length > 0 && (
            <button
              onClick={() => {
                if (confirm("Clear the entire roster? This cannot be undone.")) store.clear();
              }}
              className="text-xs px-3 py-2 rounded-md border border-border text-muted-foreground hover:text-red-400 hover:border-red-500/50 transition"
            >
              Clear roster
            </button>
          )}
          <button
            onClick={() => exportXlsx("all")}
            disabled={people.length === 0}
            className="text-sm px-4 py-2 rounded-md border border-border hover:bg-surface-elevated transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Export all
          </button>
          <button
            onClick={() => exportXlsx("done")}
            disabled={done.length === 0}
            className="text-sm px-4 py-2 rounded-md bg-lime text-lime-foreground font-semibold hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Export approved (.xlsx)
          </button>
        </div>
      </div>
    </div>
  );
}
