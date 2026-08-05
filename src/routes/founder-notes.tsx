import { createFileRoute, Link } from "@tanstack/react-router";
import PageLayout from "@/components/site/PageLayout";
import { breadcrumbJsonLd, SITE_URL, PERSON_ID_FOUNDER } from "@/lib/seo";
import { ArrowRight, PenLine } from "lucide-react";

// Curated founder-authored essays. All slugs must exist under /blog/$slug.
const NOTES = [
  {
    slug: "uk-ecommerce-seo-playbook-shopify",
    kicker: "Playbook",
    title: "The UK Shopify SEO playbook I wish existed when I started",
    lens: "Ten years of ecommerce operating condensed into the technical, on-page and content moves that actually move revenue for UK Shopify brands.",
  },
  {
    slug: "uk-dtc-paid-media-playbook",
    kicker: "Paid media",
    title: "How I run paid media for UK DTC brands after £30M+ in spend",
    lens: "The account structure, creative testing rhythm and reporting cadence I've settled on across Meta, Google and TikTok - and the mistakes I stopped making.",
  },
  {
    slug: "mer-vs-roas-uk-dtc-founders",
    kicker: "Measurement",
    title: "Why I stopped optimising to ROAS (and what UK founders should track instead)",
    lens: "A candid breakdown of why blended MER, contribution margin and payback period tell the real story - and how to explain that to a board that only knows ROAS.",
  },
  {
    slug: "uk-ecommerce-cro-playbook-shopify",
    kicker: "CRO",
    title: "The 14 PDP tests that moved revenue on real UK Shopify stores",
    lens: "Every test came from a live client engagement. Some worked, some didn't - I've included both, with the reasoning behind each hypothesis.",
  },
  {
    slug: "shopify-plus-technical-seo-checklist",
    kicker: "Technical SEO",
    title: "The Shopify Plus technical SEO issues I find on almost every audit",
    lens: "After 100+ UK Shopify audits, the same six issues appear in roughly 80% of stores. Here's the list, the fix, and why Shopify's defaults create them.",
  },
  {
    slug: "ios17-attribution-uk-ecommerce",
    kicker: "Attribution",
    title: "What iOS 17+ actually did to UK ecommerce attribution",
    lens: "A practical guide to what changed, what didn't, and the measurement stack I now recommend to UK Shopify and WooCommerce brands doing £50k-£2M/month.",
  },
] as const;

export const Route = createFileRoute("/founder-notes")({
  head: () => ({
    meta: [
      { title: "Founder Notes | Tahir Abbas on UK Ecommerce Growth" },
      { name: "description", content: "First-person essays from Tahir Abbas, founder of BeingEcom, on UK ecommerce SEO, paid media, CRO and measurement - written from real client engagements, not agency theory." },
      { property: "og:title", content: "Founder Notes | Tahir Abbas on UK Ecommerce Growth" },
      { property: "og:description", content: "Essays from Tahir Abbas on UK ecommerce SEO, paid media, CRO and measurement - written from real client engagements." },
      { property: "og:url", content: `${SITE_URL}/founder-notes` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/founder-notes` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Founder Notes", path: "/founder-notes" },
          ])
        ),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": `${SITE_URL}/founder-notes#collection`,
          name: "Founder Notes by Tahir Abbas",
          url: `${SITE_URL}/founder-notes`,
          about: "First-person essays on UK ecommerce growth by Tahir Abbas, founder of BeingEcom.",
          author: { "@id": PERSON_ID_FOUNDER },
          publisher: { "@type": "Organization", name: "BeingEcom", url: SITE_URL },
        }),
      },
    ],
  }),
  component: FounderNotes,
});

function FounderNotes() {
  return (
    <PageLayout>
      <section className="bg-background text-foreground">
        <div className="mx-auto max-w-5xl px-5 lg:px-8 pt-24 pb-14 lg:pt-32 lg:pb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <PenLine className="w-3.5 h-3.5 text-primary" /> Founder Notes
          </div>
          <h1 className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            Essays on UK ecommerce growth by Tahir Abbas
          </h1>
          <p className="mt-6 text-lg md:text-xl text-foreground/85 max-w-3xl leading-relaxed">
            First-person notes from ten years of operating UK Shopify and WooCommerce brands - what I actually
            do inside client accounts, what I've stopped doing, and the reasoning behind each call. No agency
            fluff; every essay maps to a live engagement or an audit I ran myself.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <Link
              to="/about/tahir-abbas"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 font-medium hover:bg-accent transition-colors"
            >
              About the author <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 font-medium hover:bg-accent transition-colors"
            >
              All articles
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 lg:px-8 pb-24">
        <div className="grid gap-5">
          {NOTES.map((n) => (
            <Link
              key={n.slug}
              to="/blog/$slug"
              params={{ slug: n.slug }}
              className="group rounded-2xl border bg-card p-7 hover:border-primary/60 transition-colors"
            >
              <div className="text-xs font-semibold uppercase tracking-widest text-primary">{n.kicker}</div>
              <div className="mt-2 font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                {n.title}
              </div>
              <p className="mt-3 text-foreground/80 leading-relaxed">{n.lens}</p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Read the note <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-14 rounded-3xl border bg-card p-8 lg:p-10">
          <h2 className="font-display text-2xl lg:text-3xl font-bold tracking-tight">Why these are notes, not posts</h2>
          <p className="mt-4 text-foreground/85 leading-relaxed max-w-3xl">
            Every essay here is written by Tahir directly and reviewed against a live client engagement or a
            first-party audit before publishing. Where numbers appear, they come from anonymised aggregate
            data across BeingEcom clients or from the underlying research reports on{" "}
            <Link to="/research" className="text-primary underline underline-offset-2">/research</Link>. No
            hypothetical case studies, no borrowed benchmarks, no ghost-written takes.
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
