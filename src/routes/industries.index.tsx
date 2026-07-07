import { createFileRoute, Link } from "@tanstack/react-router";
import { Layers, ArrowRight, Sparkles } from "lucide-react";
import PageLayout from "../components/site/PageLayout";
import { Section, SplitHeading, CTA } from "../components/site/Section";
import { Reveal } from "../hooks/useReveal";
import { SafeImg } from "../components/SafeImg";
import { INDUSTRIES } from "../lib/locations-industries";
import { industryContentFor } from "../lib/industry-content";

export const Route = createFileRoute("/industries/")({
  head: () => ({
    meta: [
      { title: "Ecommerce Industries We Scale in the UK | Being Ecom" },
      { name: "description", content: "UK ecommerce agency serving fashion, beauty, health, home, electronics, food, jewellery, pets and more. Growth systems built per vertical." },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large" },
      { property: "og:title", content: "Ecommerce Industries We Scale in the UK | Being Ecom" },
      { property: "og:description", content: "Industry-specific ecommerce growth for UK DTC brands — creative, media, CRO and retention." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: IndustriesIndex,
});

function IndustriesIndex() {
  return (
    <PageLayout>
      <section className="relative pt-24 pb-16 lg:pt-32 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-[520px] h-[520px] bg-primary/10 blur-[160px] rounded-full float" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8 relative">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
              <Layers className="size-3.5" /> Verticals
            </div>
          </Reveal>
          <Reveal delay={1}>
            <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-[1.05] text-ink max-w-3xl">
              <SplitHeading value="Industries we scale in the UK" />
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              Our system adapts to your vertical — creative, CRO, media buying and retention all tuned to how your customers actually buy.
            </p>
          </Reveal>
        </div>
      </section>

      <Section eyebrow="Pick your industry" title="12 verticals, one growth engine" alt>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {INDUSTRIES.map((i, idx) => {
            const C = industryContentFor(i.slug, i.name);
            return (
              <Reveal key={i.slug} delay={Math.min(idx % 3, 3) as 0 | 1 | 2 | 3}>
                <Link to="/industries/$slug" params={{ slug: i.slug }} className="group card-surface card-hover overflow-hidden block">
                  <div className="relative h-48 overflow-hidden">
                    <SafeImg
                      src={C.images.hero}
                      alt={`${i.name} ecommerce growth`}
                      width={800}
                      height={500}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      skeleton
                      brandOverlay
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary">
                        <Sparkles className="size-3" /> {i.name}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-ink">{i.name}</h3>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{i.intro}</p>
                    <div className="mt-4 inline-flex items-center gap-1 text-sm text-primary font-semibold">
                      Explore <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <CTA heading="Not sure which vertical fits?" sub="Book a strategy call — we'll map your growth engine live on the call." />
    </PageLayout>
  );
}
