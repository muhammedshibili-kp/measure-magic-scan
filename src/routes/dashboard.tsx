import { createFileRoute, Link } from "@tanstack/react-router";
import { CsvUpload } from "@/components/dashboard/CsvUpload";
import { ExportBar } from "@/components/dashboard/ExportBar";
import { PeopleTable } from "@/components/dashboard/PeopleTable";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Operator dashboard — FitScan AI" },
      { name: "description", content: "Import rosters, run scans, review measurements, and export to Excel." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface/40 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative w-6 h-6">
              <div className="absolute inset-0 rounded-md border border-lime/60" />
              <div className="absolute inset-1 rounded-sm bg-lime" />
            </div>
            <span className="font-display font-bold tracking-tight">
              FitScan<span className="text-lime">.</span>AI
            </span>
            <span className="ml-2 text-xs font-mono text-muted-foreground border border-border rounded px-2 py-0.5">
              OPERATOR
            </span>
          </Link>
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground transition"
          >
            ← Back to site
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Operator dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Import a roster, run scans, review and export — all without leaving the browser.
          </p>
        </div>

        <CsvUpload />
        <ExportBar />
        <PeopleTable />
      </main>
    </div>
  );
}
