import { createFileRoute } from "@tanstack/react-router";
import CompanyPage, { companyHead } from "@/components/site/CompanyPage";
import { SITE_URL } from "@/lib/seo";
import { INDUSTRIES } from "@/lib/locations-industries";

const SLUG = "industries";
const TITLE = "Industries We Serve | Ecommerce Agency UK | BeingEcom";
const DESC = "Ecommerce Agency UK serving fashion, beauty, wellness, supplements, jewellery, furniture, pets, food and more niche-specific Shopify and WooCommerce growth playbooks.";

const itemListLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${SITE_URL}/company/industries#list`,
  itemListElement: INDUSTRIES.map((ind, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: ind.name,
    url: `${SITE_URL}/industries/${ind.slug}`,
  })),
};

export const Route = createFileRoute("/company/industries")({
  head: () => companyHead({ slug: SLUG, title: TITLE, description: DESC, jsonLd: [itemListLd] }),
  component: () => (
    <CompanyPage
      slug={SLUG}
      h1="Industries we serve"
      eyebrow="Industries"
      intro="We operate deep not wide. These are the ecommerce verticals where BeingEcom has real operating experience, category expertise, and a proven playbook we can put to work on your account this month."
      extraJsonLd={[itemListLd]}
      sections={[
        {
          type: "paragraph",
          id: "why",
          heading: "Why category depth matters",
          body: (
            <p>
              A generalist agency will pitch you the same tactics they pitched a SaaS company last month. That's a bad match for ecommerce, where
              customer psychology, unit economics, creative style and channel efficiency all vary sharply by vertical. Every industry below has its own
              playbook inside our team refined against real client work and we won't take an engagement in a category we can't credibly serve.
            </p>
          ),
        },
        {
          type: "cards",
          id: "verticals",
          heading: "The 12 verticals",
          intro: "Click through for the full industry page, sub-categories and case studies.",
          items: INDUSTRIES.map((ind) => ({
            title: ind.name,
            body: `Growth playbook, channel priorities and category benchmarks for ${ind.name.toLowerCase()} brands on Shopify and WooCommerce.`,
            to: `/industries/${ind.slug}`,
          })),
        },
        {
          type: "list",
          id: "shared",
          heading: "What every industry playbook covers",
          items: [
            "Category-specific unit economics and margin structure.",
            "Channel mix priority (paid, SEO, email, affiliate) by margin contribution.",
            "Creative style guide for ads, landing pages and email.",
            "Category-specific SERP composition and content depth requirements.",
            "Retention benchmarks and repeat-purchase cadence.",
            "Compliance considerations (health claims, alcohol, financial services, etc.).",
          ],
        },
        {
          type: "paragraph",
          id: "not-listed",
          heading: "Not seeing your category?",
          body: (
            <p>
              We take on selected adjacent verticals when there's a clear operating fit. Reach out with your store URL and current
              monthly revenue and we'll tell you honestly whether we're the right partner or recommend someone who is.
            </p>
          ),
        },
      ]}
      faqs={[
        { q: "Do you only work in the listed industries?", a: "Almost. These twelve verticals are where we have deep operating experience. We occasionally take adjacent categories when a senior operator has the specific background required, but we won't take work we can't credibly deliver." },
        { q: "Which industry do you have the most experience with?", a: "Fashion, beauty, health & wellness and home & living account for the largest share of our operating history. Case studies for each are linked from the industry pages." },
        { q: "How is a fashion brand's playbook different from a supplements brand?", a: "Fashion emphasises creative velocity, seasonality and merchandising; supplements emphasises regulated claims, subscribe-and-save economics and stringent retention modelling. The 13-phase methodology stays constant; the tactics inside each phase differ." },
        { q: "Do you serve B2B ecommerce?", a: "Yes for B2B stores running on Shopify Plus or WooCommerce with a product-led motion. We're less suited to complex quote-to-cash enterprise B2B." },
      ]}
    />
  ),
});
