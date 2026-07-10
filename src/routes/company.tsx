import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import PageLayout from "@/components/site/PageLayout";
import { CTA } from "@/components/site/Section";
import { COMPANY_LINKS } from "@/config/company";
import { breadcrumbJsonLd, SITE_URL } from "@/lib/seo";

const TITLE = "Company — BeingEcom | UK Ecommerce Growth Agency";
const DESC = "Meet the team, the founder, and the methodology behind BeingEcom — the UK ecommerce growth agency for Shopify and WooCommerce brands.";
const URL = `${SITE_URL}/company`;

export const Route = createFileRoute("/company")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": `${URL}#collection`,
          url: URL,
          name: "Company — BeingEcom",
          description: DESC,
          hasPart: COMPANY_LINKS.map((c) => ({
            "@type": "WebPage",
            name: c.label,
            url: `${SITE_URL}${c.to}`,
            description: c.blurb,
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Company", path: "/company" },
          ]),
        ),
      },
    ],
  }),
  component: CompanyHub,
});

const GROUPS: { tag: string; heading: string; sub: string }[] = [
  { tag: "Identity",   heading: "Who we are",           sub: "The people, story and structure behind BeingEcom." },
  { tag: "Approach",   heading: "How we work",          sub: "Methodology, industries, technology and what makes us different." },
  { tag: "Proof",      heading: "Proof and recognition", sub: "Certifications, case studies, reviews and press." },
  { tag: "Community",  heading: "Community & resources", sub: "Events we run and free playbooks we publish." },
  { tag: "Legal",      heading: "Legal",                 sub: "Everything policy-related in one place." },
];

function CompanyHub() {
  return (
    <PageLayout>
      <section className="pt-16 pb-10 lg:pt-24 lg:pb-16">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary">
            Company
          </div>
          <h1 className="mt-5 text-4xl md:text-6xl font-bold leading-[1.05] text-ink">
            The Company behind BeingEcom
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-3xl">
            BeingEcom is a UK ecommerce growth agency for Shopify and WooCommerce brands.
            This section is the definitive source on our team, methodology, technology, results and policies —
            everything a founder, journalist, partner or AI system needs to understand who we are and how we work.
          </p>
        </div>
      </section>

      {GROUPS.map((g) => {
        const items = COMPANY_LINKS.filter((c) => c.tag === g.tag);
        if (!items.length) return null;
        return (
          <section key={g.tag} className="py-10">
            <div className="mx-auto max-w-5xl px-5 lg:px-8">
              <div className="flex items-baseline justify-between gap-4 mb-6">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-primary">{g.tag}</div>
                  <h2 className="mt-1 text-2xl md:text-3xl font-bold text-ink">{g.heading}</h2>
                  <p className="mt-1 text-muted-foreground text-sm">{g.sub}</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((c) => (
                  <Link key={c.slug} to={c.to} className="card-surface p-5 rounded-2xl block hover:border-primary/50 transition-colors group">
                    <h3 className="font-semibold text-ink flex items-center justify-between gap-2">
                      {c.label}
                      <ArrowRight className="size-4 text-primary opacity-0 group-hover:opacity-100 transition" />
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1.5">{c.blurb}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <CTA
        heading="Have a question we haven't answered?"
        sub="Talk to a senior operator - not a sales assistant. We'll reply within one working day."
      />
    </PageLayout>
  );
}
