import { useRef, useState } from "react";
import Papa from "papaparse";
import { store, type Person } from "@/lib/fitscan-store";

type Row = Record<string, string>;

function pick(row: Row, keys: string[]): string {
  for (const k of keys) {
    const found = Object.keys(row).find((rk) => rk.toLowerCase().trim() === k);
    if (found && row[found]) return row[found].trim();
  }
  return "";
}

export function CsvUpload() {
  const ref = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function loadSample() {
    const sample: Omit<Person, "id" | "status">[] = [
      { employeeId: "EMP-1042", name: "Aarav Sharma", gender: "M", height: 178, department: "Operations" },
      { employeeId: "EMP-1043", name: "Priya Iyer", gender: "F", height: 162, department: "HR" },
      { employeeId: "EMP-1044", name: "Rohan Mehta", gender: "M", height: 184, department: "Logistics" },
      { employeeId: "EMP-1045", name: "Neha Kapoor", gender: "F", height: 168, department: "Operations" },
      { employeeId: "EMP-1046", name: "Vikram Rao", gender: "M", height: 172, department: "Security" },
      { employeeId: "EMP-1047", name: "Ishita Banerjee", gender: "F", height: 159, department: "HR" },
      { employeeId: "EMP-1048", name: "Karthik Nair", gender: "M", height: 176, department: "Logistics" },
      { employeeId: "EMP-1049", name: "Sana Khan", gender: "F", height: 165, department: "Operations" },
    ];
    const n = store.add(sample);
    setMsg(`Loaded ${n} sample employees.`);
    setError(null);
  }

  function handleFile(file: File) {
    setError(null);
    setMsg(null);
    Papa.parse<Row>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (res) => {
        try {
          const rows: Omit<Person, "id" | "status">[] = [];
          for (const r of res.data) {
            const name = pick(r, ["name", "full name", "employee name"]);
            const employeeId = pick(r, ["id", "employee id", "emp id", "employeeid"]);
            const heightStr = pick(r, ["height", "height (cm)", "height_cm"]);
            const genderRaw = pick(r, ["gender", "sex"]).toUpperCase();
            const department = pick(r, ["department", "dept", "team"]);
            const height = parseFloat(heightStr);
            if (!name || !employeeId || isNaN(height)) continue;
            const gender: Person["gender"] =
              genderRaw.startsWith("M") ? "M" : genderRaw.startsWith("F") ? "F" : "U";
            const row: Omit<Person, "id" | "status"> = { name, employeeId, height, gender };
            if (department) row.department = department;
            rows.push(row);
          }

          if (rows.length === 0) {
            setError("No valid rows. Required columns: name, employee id, height, gender.");
            return;
          }
          const n = store.add(rows);
          setMsg(`Imported ${n} people.`);
        } catch (e) {
          setError("Failed to parse CSV.");
        }
      },
      error: () => setError("Failed to read file."),
    });
  }

  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h3 className="font-display text-lg font-semibold">Import roster</h3>
          <p className="text-sm text-muted-foreground mt-1">
            CSV with columns: <span className="font-mono text-xs">name, employee id, gender, height</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={loadSample}
            className="text-sm px-3 py-2 rounded-md border border-border hover:bg-surface-elevated transition"
          >
            Load sample
          </button>
          <button
            onClick={() => ref.current?.click()}
            className="text-sm px-4 py-2 rounded-md bg-lime text-lime-foreground font-semibold hover:opacity-90 transition"
          >
            Upload CSV
          </button>
          <input
            ref={ref}
            type="file"
            accept=".csv,text/csv"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
              e.target.value = "";
            }}
          />
        </div>
      </div>
      {msg && <div className="mt-3 text-sm text-lime">{msg}</div>}
      {error && <div className="mt-3 text-sm text-red-400">{error}</div>}
    </div>
  );
}
