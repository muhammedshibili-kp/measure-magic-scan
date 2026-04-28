import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Logos } from "@/components/Logos";
import { HowItWorks } from "@/components/HowItWorks";
import { Features } from "@/components/Features";
import { AccuracyValidation } from "@/components/AccuracyValidation";
import { UseCases } from "@/components/UseCases";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FitScan AI — Automated body measurement from a phone camera" },
      {
        name: "description",
        content:
          "Measure 2,000+ people in minutes. FitScan AI converts a front and side photo into shoulder, chest, waist, hip, sleeve and inseam — accurate to ±1 cm.",
      },
      { property: "og:title", content: "FitScan AI — Body measurement, automated" },
      {
        property: "og:description",
        content:
          "Replace the tape with a phone. Six measurements in five seconds, ±1 cm accurate. Built for uniforms, tailoring and corporate outfitting.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero />
        <Logos />
        <HowItWorks />
        <Features />
        <AccuracyValidation />
        <UseCases />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
