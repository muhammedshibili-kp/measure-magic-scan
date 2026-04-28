import { Link } from "@tanstack/react-router";
import logo from "@/assets/metriva-logo.png";

export function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border animate-fade-in">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <img
            src={logo}
            alt="Metriva.ai logo"
            className="w-9 h-9 object-contain transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-110"
          />
          <span className="font-display font-bold tracking-tight text-lg">
            Metriva<span className="text-cyan-glow">.ai</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#how" className="hover:text-foreground transition-colors story-link">How it works</a>
          <a href="#features" className="hover:text-foreground transition-colors story-link">Features</a>
          <a href="#use-cases" className="hover:text-foreground transition-colors story-link">Use cases</a>
          <a href="#accuracy" className="hover:text-foreground transition-colors story-link">Accuracy</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="hidden sm:inline text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Dashboard
          </Link>
          <a
            href="#cta"
            className="inline-flex items-center gap-1.5 brand-gradient text-white px-4 py-2 rounded-md text-sm font-semibold hover:opacity-90 hover:gap-2.5 transition-all shadow-sm"
          >
            Book a fitting
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </header>
  );
}
