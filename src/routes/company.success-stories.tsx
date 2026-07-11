import { createFileRoute, Link } from "@tanstack/react-router";
import CompanyPage, { companyHead } from "@/components/site/CompanyPage";
import { SITE_URL } from "@/lib/seo";

const SLUG = "success-stories";
const TITLE = "Shopify Success Stories UK | Growth Case Studies | BeingEcom";
const DESC = "Shopify success stories UK — real Shopify and WooCommerce brands scaled by BeingEcom with SEO, paid ads, CRO and Klaviyo email. Numbers and playbooks inside.";

const collectionLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE_URL}/company/success-stories#collection`,
  url: `${SITE_URL}/company/success-stories`,
  name: "Client Success Stories",
  description: DESC,
  isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}#website` },
};

export const Route = createFileRoute("/company/success-stories")({
  head: () => companyHead({ slug: SLUG, title: TITLE, description: DESC, jsonLd: [collectionLd] }),
  component: () => (
    <CompanyPage
      slug={SLUG}
      h1="Client success stories"
      eyebrow="Success stories"
      intro="Anonymised case studies from real Shopify and WooCommerce engagements. Every card links through to the full story — scope, strategy, KPIs, screenshots and lessons."
      extraJsonLd={[collectionLd]}
      sections={[
        {
          type: "paragraph",
          id: "honest",
          heading: "How we publish results",
          body: (
            <p>
              Every case study on the main <Link to="/case-studies" className="text-primary underline">case studies</Link> hub is drawn from a real engagement.
              Brand names, screenshots and dashboard figures are anonymised for NDA reasons, but the scope, strategy and outcome ranges are accurate.
              For verified numbers against a specific vertical or stage we're happy to backchannel-reference on a call.
            </p>
          ),
        },
        {
          type: "cards",
          id: "playbooks",
          heading: "Featured playbooks",
          intro: "Representative categories — click through to filter the case studies hub.",
          items: [
            { title: "Website rebuilds", body: "Shopify + WooCommerce rebuilds targeting conversion rate and Core Web Vitals.", to: "/case-studies?category=website" },
            { title: "Paid ads scale-up", body: "MER-led paid restructures with creative velocity and account rebuilds.",             to: "/case-studies?category=ads" },
            { title: "SEO growth",        body: "Programmatic SEO, technical rebuilds and international expansion.",                    to: "/case-studies?category=seo" },
            { title: "CRO uplift",        body: "Structured experimentation programmes across PDP, cart and checkout.",                 to: "/case-studies?category=cro" },
          ],
        },
        {
          type: "list",
          id: "what-you-see",
          heading: "What every case study contains",
          items: [
            "Client overview — vertical, stage, platform.",
            "Challenges — the actual constraint we were hired to solve.",
            "Strategy — the plan we ran, phase by phase.",
            "Implementation — what shipped, in what order.",
            "Results — headline KPIs with the window they cover.",
            "Screenshots — anonymised platform snapshots where NDA allows.",
            "Testimonials — direct quotes from the operator we worked with.",
            "Services delivered — which of our services made up the engagement.",
            "Related case studies — pattern matches in the same category or vertical.",
          ],
        },
        {
          type: "custom",
          id: "browse",
          heading: "Browse the full library",
          render: () => (
            <div className="card-surface rounded-2xl p-6 text-center">
              <p className="text-muted-foreground">Explore every published case study — filter by category, vertical or service.</p>
              <Link to="/case-studies" className="mt-4 inline-flex items-center rounded-full bg-primary text-primary-foreground text-sm font-semibold px-4 py-2">
                View all case studies →
              </Link>
            </div>
          ),
        },
      ]}
      faqs={[
        { q: "Are the case studies real?", a: "Yes — every case study is drawn from a real engagement. Brand names and screenshots are anonymised where NDA requires it, and headline numbers are represented as realistic outcome ranges rather than a single client's live dashboard where anonymity is needed." },
        { q: "Can I see verified numbers for a specific client?", a: "Yes. After a discovery call we share verified references, and where the client agrees, we can walk you through their real dashboards for a brand at your stage or in your vertical." },
        { q: "What's the typical time-to-result?", a: "CRO and email lift in 2–4 weeks, paid ads stabilise in 30–60 days, SEO compounds over 3–6 months. Full timing is described in each case study." },
        { q: "Do results predict my outcome?", a: "No — past client results are never a prediction of future outcomes. What we commit to is senior operators on your account, weekly execution against a revenue-tied plan, and full transparency on the numbers." },
      ]}
    />
  ),
});
