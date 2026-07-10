import { createFileRoute, Link } from "@tanstack/react-router";
import PageLayout from "@/components/site/PageLayout";
import { breadcrumbJsonLd, SITE_URL, ORG_ID } from "@/lib/seo";
import { ArrowRight, Users, ShieldCheck } from "lucide-react";

// Industry categories BeingEcom serves. Named client logos are intentionally
// omitted until we ship real, permission-cleared assets — anonymised
// industry cards keep the page honest and NDA-safe.
const INDUSTRIES = [
  { name: "Beauty & Skincare", count: "18 brands", note: "Shopify Plus and Shopify — subscription + DTC" },
  { name: "Fashion & Apparel", count: "22 brands", note: "Shopify, headless (Hydrogen)" },
  { name: "Health & Supplements", count: "14 brands", note: "Shopify, WooCommerce — high retention economics" },
  { name: "Home & Living", count: "12 brands", note: "WooCommerce, Shopify — high-AOV categories" },
  { name: "Food & Drink", count: "9 brands", note: "Shopify — subscription + one-off" },
  { name: "Jewellery & Accessories", count: "8 brands", note: "Shopify — high margin, gifting-led" },
  { name: "Pet Care", count: "6 brands", note: "Shopify, subscription commerce" },
  { name: "Sports & Outdoor", count: "7 brands", note: "Shopify, WooCommerce" },
  { name: "Lifestyle & Wellness", count: "10 brands", note: "Shopify — DTC + content-led" },
  { name: "Kids & Baby", count: "5 brands", note: "Shopify" },
  { name: "Electronics & Gadgets", count: "4 brands", note: "WooCommerce, high-consideration purchase" },
  { name: "B2B & Trade Ecommerce", count: "5 brands", note: "WooCommerce + Shopify Plus B2B" },
];

const CANONICAL = `${SITE_URL}/clients`;
const TITLE = "Clients & Industries — Who BeingEcom Works With | UK Ecommerce Agency";
const DESC =
  "BeingEcom serves Shopify and WooCommerce brands across 12 ecommerce categories in the UK, US, IE and AU — beauty, fashion, health, home, food, jewellery, pet, sports and more.";

const jsonLd = [
  breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Clients", path: "/clients" },
  ]),
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${CANONICAL}#collection`,
    url: CANONICAL,
    name: TITLE,
    description: DESC,
    about: "Ecommerce industries and client categories served by BeingEcom",
    publisher: { "@id": ORG_ID },
    hasPart: INDUSTRIES.map((i) => ({
      "@type": "Thing",
      name: `${i.name} — ${i.count}`,
      description: i.note,
    })),
  },
];

export const Route = createFileRoute("/clients")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: CANONICAL },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: jsonLd.map((obj) => ({ type: "application/ld+json", children: JSON.stringify(obj) })),
  }),
  component: ClientsPage,
});

function ClientsPage() {
  return (
    <PageLayout>
      <section className="bg-background text-foreground">
        <div className="mx-auto max-w-5xl px-5 lg:px-8 pt-24 pb-14 lg:pt-32 lg:pb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <Users className="w-3.5 h-3.5 text-primary" /> Clients & industries
          </div>
          <h1 className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            The brands we grow
          </h1>
          <p className="mt-6 text-lg md:text-xl text-foreground/85 max-w-3xl leading-relaxed">
            BeingEcom serves Shopify and WooCommerce brands across 12 ecommerce categories in the UK,
            US, Ireland and Australia. Client names and screenshots are intentionally not published
            until each brand has signed off on a public case study — the categories below reflect the
            full mix of work currently running inside the operator pods.
          </p>
        </div>
      </section>

      {/* Industries grid */}
      <section className="mx-auto max-w-5xl px-5 lg:px-8 pb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {INDUSTRIES.map((i) => (
            <div key={i.name} className="rounded-2xl border bg-card p-6">
              <div className="text-xs font-bold uppercase tracking-widest text-primary">
                {i.count}
              </div>
              <div className="mt-2 font-display text-xl font-bold tracking-tight text-foreground">
                {i.name}
              </div>
              <p className="mt-2 text-sm text-foreground/75 leading-relaxed">{i.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NDA / transparency note */}
      <section className="border-t bg-muted/30">
        <div className="mx-auto max-w-3xl px-5 lg:px-8 py-14 text-center">
          <ShieldCheck className="w-6 h-6 text-primary mx-auto" />
          <h2 className="mt-3 font-display text-2xl md:text-3xl font-bold tracking-tight">
            Why we don't publish a wall of client logos
          </h2>
          <p className="mt-4 text-foreground/80 leading-relaxed">
            Most ecommerce operators sign an NDA before a first strategy call. That means we cannot
            publish a client logo or a live dashboard screenshot until the brand has explicitly
            approved the case study, the numbers and the visuals. When you see a logo on this site,
            it means we shipped the work AND the client signed off — nothing else counts as proof.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              See case studies <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/company/reviews"
              className="inline-flex items-center gap-2 rounded-full border bg-background px-5 py-2.5 text-sm font-semibold hover:border-primary transition-colors"
            >
              Read reviews
            </Link>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="border-t">
        <div className="mx-auto max-w-5xl px-5 lg:px-8 py-14">
          <div className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Related</div>
          <div className="flex flex-wrap gap-3">
            <Link to="/company/industries" className="rounded-full border bg-card px-5 py-2.5 text-sm font-semibold hover:border-primary hover:text-primary transition-colors">Industries we serve</Link>
            <Link to="/company/success-stories" className="rounded-full border bg-card px-5 py-2.5 text-sm font-semibold hover:border-primary hover:text-primary transition-colors">Success stories</Link>
            <Link to="/company/why-us" className="rounded-full border bg-card px-5 py-2.5 text-sm font-semibold hover:border-primary hover:text-primary transition-colors">Why BeingEcom</Link>
            <Link to="/company/founder" className="rounded-full border bg-card px-5 py-2.5 text-sm font-semibold hover:border-primary hover:text-primary transition-colors">Meet the founder</Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
