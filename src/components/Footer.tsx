import logo from "@/assets/metriva-logo.png";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border bg-surface/60 relative">
      <div className="absolute inset-x-0 top-0 h-1 tape-bg opacity-60" aria-hidden />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 mb-4">
              <img src={logo} alt="Metriva.ai logo" className="w-8 h-8 object-contain" />
              <span className="font-display font-bold text-lg">
                Metriva<span className="text-cyan-glow">.ai</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              The automated body measurement app for high-volume tailoring,
              uniforms, and corporate outfitting. Built for ateliers, deployed worldwide.
            </p>
          </div>

          {[
            { h: "Product", l: ["Mobile app", "Operator console", "Admin dashboard", "API docs"] },
            { h: "Company", l: ["About", "Customers", "Careers", "Press"] },
            { h: "Legal", l: ["Privacy", "Security", "DPA", "Terms"] },
          ].map((c) => (
            <div key={c.h} className="md:col-span-2">
              <h4 className="font-mono text-xs uppercase tracking-wider text-royal mb-4">{c.h}</h4>
              <ul className="space-y-2.5 text-sm">
                {c.l.map((i) => (
                  <li key={i}>
                    <a href="#" className="text-muted-foreground hover:text-royal transition-colors story-link">{i}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-border flex flex-col sm:flex-row justify-between gap-4 text-xs text-muted-foreground font-mono">
          <span>© 2026 Metriva.ai Technologies. All rights reserved.</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-royal animate-blink" />
            ALL SYSTEMS OPERATIONAL
          </span>
        </div>
      </div>
    </footer>
  );
}
