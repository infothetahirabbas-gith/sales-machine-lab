import { createFileRoute, Link } from "@tanstack/react-router";
import CompanyPage, { companyHead } from "@/components/site/CompanyPage";

const SLUG = "resources";
const TITLE = "Resources | Ecommerce Growth Guides UK | BeingEcom";
const DESC = "Free ecommerce growth resources UK — Shopify, WooCommerce, SEO, paid ads, CRO and Klaviyo email playbooks from senior operators at BeingEcom.";

export const Route = createFileRoute("/company/resources")({
  head: () => companyHead({ slug: SLUG, title: TITLE, description: DESC }),
  component: () => (
    <CompanyPage
      slug={SLUG}
      h1="Resources & downloads"
      eyebrow="Resources"
      intro="Practical, no-fluff growth resources for ecommerce operators. Everything here is free to use in your own store — attribution appreciated but not required."
      sections={[
        {
          type: "paragraph",
          id: "philosophy",
          heading: "How we publish resources",
          body: (
            <p>
              Every resource on this page is a distilled version of something we actually use with clients. We don't publish "10 tips" filler — if it hasn't earned its place in a live engagement, it doesn't ship here.
              Some assets ship as blog posts, some as downloadable templates, some as glossary entries.
            </p>
          ),
        },
        {
          type: "cards",
          id: "guides",
          heading: "Ecommerce guides",
          intro: "Long-form playbooks on the blog.",
          items: [
            { title: "Shopify vs WooCommerce (UK)",   body: "Which platform actually fits your growth stage, and the honest trade-offs.",  to: "/blog/shopify-vs-woocommerce-uk" },
            { title: "Shopify Plus migration guide",  body: "A step-by-step migration playbook for UK brands upgrading to Plus.",           to: "/blog/shopify-plus-migration-uk" },
            { title: "All blog posts",                body: "Complete editorial archive — updated regularly.",                              to: "/blog" },
          ],
        },
        {
          type: "cards",
          id: "reference",
          heading: "Reference materials",
          items: [
            { title: "SEO glossary",  body: "Plain-English definitions of every SEO term we use in reporting — updated as vocabulary shifts.", to: "/glossary" },
            { title: "Store audit",   body: "Free automated audit of your Shopify or WooCommerce store — 17-phase scan.",                       to: "/audit" },
            { title: "Case studies",  body: "Full library of anonymised client case studies.",                                                   to: "/case-studies" },
          ],
        },
        {
          type: "list",
          id: "coming",
          heading: "Templates, checklists and playbooks",
          intro: "We're rolling these out as downloadable assets through 2026. Ask us on the contact form for early access to any of the below and we'll send them directly.",
          items: [
            "Klaviyo flow map — welcome, browse abandon, cart abandon, post-purchase, win-back.",
            "Meta ads account structure template with naming conventions.",
            "Technical SEO audit checklist for Shopify and WooCommerce.",
            "GA4 event blueprint for ecommerce (Purchase, AddToCart, Checkout events, custom dimensions).",
            "Product page teardown template with scored criteria.",
            "Weekly ecommerce scorecard template mapped to a P&L.",
            "Creative testing brief template for paid social.",
            "Contribution-margin calculator for DTC.",
          ],
        },
        {
          type: "custom",
          id: "request",
          heading: "Request a specific playbook",
          render: () => (
            <div className="card-surface rounded-2xl p-6 border-dashed">
              <p className="text-muted-foreground">Working on a specific problem and want the equivalent internal SOP? Ask.</p>
              <Link to="/contact" className="mt-4 inline-flex items-center rounded-full bg-primary text-primary-foreground text-sm font-semibold px-4 py-2">
                Request a resource →
              </Link>
            </div>
          ),
        },
      ]}
      faqs={[
        { q: "Are all the resources really free?", a: "Yes. No email wall, no sales call required. Some downloadable templates are shipping through 2026 — request them via the contact form until they're linked here directly." },
        { q: "Can I use these in my own store?", a: "Yes, free to use commercially. Attribution appreciated but not required. Please don't relabel and resell them as your own product." },
        { q: "Do you build custom playbooks?", a: "Custom playbooks are part of paid engagements — the free resources here are the abstracted versions. Book a discovery call if you want the tailored version." },
        { q: "How often is new content published?", a: "New blog posts monthly, glossary updates quarterly, and templates rolled out as they're ready. Subscribe via the site to be notified." },
      ]}
    />
  ),
});
