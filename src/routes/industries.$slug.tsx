import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Layers, CheckCircle2 } from "lucide-react";
import PageLayout from "../components/site/PageLayout";
import { Section, SplitHeading } from "../components/site/Section";
import { INDUSTRIES } from "../lib/locations-industries";

export const Route = createFileRoute("/industries/$slug")({
  loader: ({ params }) => {
    const ind = INDUSTRIES.find((l) => l.slug === params.slug);
    if (!ind) throw notFound();
    return { ind };
  },
  head: ({ loaderData }) => {
    const ind = loaderData?.ind;
    const title = ind
      ? `${ind.name} Ecommerce Agency | Being Ecom`
      : "Industry — Being Ecom";
    const desc = ind
      ? `${ind.name} ecommerce growth agency in the UK. Performance marketing, CRO and retention built for ${ind.name.toLowerCase()} brands.`
      : "UK ecommerce agency by industry.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: IndustryPage,
  notFoundComponent: () => (
    <PageLayout>
      <Section title="Industry not found" intro="We couldn't find that vertical. Browse the other industries we serve.">
        <Link to="/industries" className="text-primary underline">View all industries</Link>
      </Section>
    </PageLayout>
  ),
});

function IndustryPage() {
  const { ind } = Route.useLoaderData();
  return (
    <PageLayout>
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8 relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
            <Layers className="size-3.5" /> Industry
          </div>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-[1.05] text-ink max-w-4xl">
            <SplitHeading value={`${ind.name} Growth Agency`} />
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">{ind.intro}</p>
          <div className="mt-8 btn-pair">
            <Link to="/contact" className="btn btn-primary">Book Strategy Call <ArrowRight className="w-4 h-4" /></Link>
            <Link to="/case-studies" className="btn btn-ghost border border-border">See Case Studies</Link>
          </div>
        </div>
      </section>

      <Section eyebrow={`Built for ${ind.name}`} title="What we execute" alt>
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl">
          {ind.highlights.map((h: string) => (
            <div key={h} className="flex items-start gap-3 rounded-xl border border-border bg-white p-4">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span className="text-ink font-medium">{h}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Ready to scale" title={`Grow your ${ind.name.toLowerCase()} brand`} center>
        <div className="btn-pair justify-center">
          <Link to="/contact" className="btn btn-primary">Book Strategy Call <ArrowRight className="w-4 h-4" /></Link>
          <Link to="/audit" className="btn btn-ghost border border-border">Free Store Audit</Link>
        </div>
      </Section>
    </PageLayout>
  );
}
