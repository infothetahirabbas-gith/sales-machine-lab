import { createFileRoute, Link } from "@tanstack/react-router";
import { Layers, ArrowRight } from "lucide-react";
import PageLayout from "../components/site/PageLayout";
import { Section, SplitHeading } from "../components/site/Section";
import { INDUSTRIES } from "../lib/locations-industries";

export const Route = createFileRoute("/industries/")({
  head: () => ({
    meta: [
      { title: "Ecommerce Industries We Scale | Being Ecom UK" },
      { name: "description", content: "UK ecommerce agency serving fashion, beauty, health, home, electronics, food, jewellery and pet brands with growth systems built per vertical." },
      { property: "og:title", content: "Ecommerce Industries We Scale | Being Ecom UK" },
      { property: "og:description", content: "Industry-specific ecommerce growth for UK DTC brands." },
    ],
  }),
  component: IndustriesIndex,
});

function IndustriesIndex() {
  return (
    <PageLayout>
      <section className="relative pt-24 pb-16 lg:pt-32 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8 relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
            <Layers className="size-3.5" /> Verticals
          </div>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-[1.05] text-ink max-w-3xl">
            <SplitHeading value="Industries we scale in the UK" />
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            Our system adapts to your vertical — creative, CRO, media buying and retention all tuned to how your customers actually buy.
          </p>
        </div>
      </section>

      <Section title="Pick your industry" alt>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {INDUSTRIES.map((i) => (
            <Link key={i.slug} to="/industries/$slug" params={{ slug: i.slug }} className="group card-surface card-hover p-5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Layers className="size-5" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-ink">{i.name}</h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{i.intro}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-sm text-primary font-semibold">
                Explore <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </PageLayout>
  );
}
