import { Link } from "@tanstack/react-router";

export function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative w-7 h-7">
            <div className="absolute inset-0 rounded-md border border-lime/60" />
            <div className="absolute inset-1 rounded-sm bg-lime" />
            <div className="absolute inset-0 rounded-md border border-lime animate-blink" />
          </div>
          <span className="font-display font-bold tracking-tight text-lg">
            FitScan<span className="text-lime">.</span>AI
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#how" className="hover:text-foreground transition-colors">How it works</a>
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#use-cases" className="hover:text-foreground transition-colors">Use cases</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
        </nav>

        <div className="flex items-center gap-3">
          <a href="#contact" className="hidden sm:inline text-sm text-muted-foreground hover:text-foreground transition-colors">
            Sign in
          </a>
          <a
            href="#cta"
            className="inline-flex items-center gap-1.5 bg-lime text-lime-foreground px-4 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Book demo
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </header>
  );
}
