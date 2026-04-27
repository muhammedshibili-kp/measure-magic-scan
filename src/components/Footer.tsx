export function Footer() {
  return (
    <footer id="contact" className="border-t border-border bg-surface/40">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-md bg-lime" />
              <span className="font-display font-bold text-lg">FitScan<span className="text-lime">.</span>AI</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Automated body measurement for high-volume tailoring, uniforms, and
              corporate outfitting. Built in Bangalore, deployed worldwide.
            </p>
          </div>

          {[
            { h: "Product", l: ["Mobile app", "Operator console", "Admin dashboard", "API docs"] },
            { h: "Company", l: ["About", "Customers", "Careers", "Press"] },
            { h: "Legal", l: ["Privacy", "Security", "DPA", "Terms"] },
          ].map((c) => (
            <div key={c.h} className="md:col-span-2">
              <h4 className="font-mono text-xs uppercase tracking-wider text-lime mb-4">{c.h}</h4>
              <ul className="space-y-2.5 text-sm">
                {c.l.map((i) => (
                  <li key={i}>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">{i}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-border flex flex-col sm:flex-row justify-between gap-4 text-xs text-muted-foreground font-mono">
          <span>© 2026 FitScan AI Technologies. All rights reserved.</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-lime animate-blink" />
            ALL SYSTEMS OPERATIONAL
          </span>
        </div>
      </div>
    </footer>
  );
}
