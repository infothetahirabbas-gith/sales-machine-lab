import { createFileRoute } from "@tanstack/react-router";
import ServicePage from "../components/site/ServicePage";
import { serviceJsonLd, breadcrumbJsonLd, faqJsonLd, type FAQ } from "../lib/seo";

const FAQ_LIST: FAQ[] = [
  {
    "q": "How much extra revenue should email and SMS drive?",
    "a": "A properly built Klaviyo account contributes 25–35% of total store revenue within 90 days."
  },
  {
    "q": "What flows do you build first?",
    "a": "Welcome, abandoned cart, browse abandonment, post-purchase, winback, replenishment and VIP — in that order."
  },
  {
    "q": "Do you write the copy and design the templates?",
    "a": "Yes — copy, design, segmentation, A/B subject lines and deliverability monitoring."
  },
  {
    "q": "Klaviyo or Mailchimp?",
    "a": "Klaviyo for ecommerce, every time. Mailchimp lacks the segmentation, flows and Shopify-native data Klaviyo gives you."
  },
  {
    "q": "What about SMS?",
    "a": "We run SMS through Klaviyo, Attentive or Postscript — fully compliant with UK GDPR and PECR, double opt-in by default."
  }
];

export const Route = createFileRoute("/services/email-sms")({
  head: () => ({
    meta: [
      { title: "Klaviyo Email & SMS Marketing Agency UK | BeingEcom" },
      { name: "description", content: "Klaviyo email & SMS flows that recover lost sales and multiply repeat customers for UK Shopify & WooCommerce brands — retention-first, not just campaigns." },
      { property: "og:title", content: "Klaviyo Email & SMS Marketing Agency UK | BeingEcom" },
      { property: "og:description", content: "Klaviyo email and SMS marketing agency in the UK. Lifecycle flows, campaign calendars and segmentation that add 20–35% owned revenue for Shopify brands." },
      { property: "og:url", content: "https://beingecom.com/services/email-sms" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://beingecom.com/services/email-sms" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd({ slug: "email-sms", name: "Email & SMS Marketing", description: "Klaviyo email and SMS flows that recover lost sales and add 25-35% revenue for Shopify and WooCommerce." })) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Email & SMS Marketing", path: "/services/email-sms" }])) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(FAQ_LIST, "/services/email-sms")) },
    ],
  }),
  component: () => (
    <ServicePage cfg={{
      slug: "email-sms",
      eyebrow: "Email Marketing Automation",
      heroTitle: "Recover lost sales and multiply repeat customers.",
      heroSub: "Klaviyo email flows that quietly add 25-35% of revenue without lifting ad spend.",
      problemTitle: "Most stores leave money on the table after the visit.",
      problemBullets: [
        "Abandoned carts? Just one generic email.",
        "No welcome flow, no post-purchase, no winback.",
        "No segmentation - every subscriber gets the same message.",
      ],
      whatIsTitle: "Retention is where ecommerce gets profitable.",
      whatIsBody: "Acquisition gets you a customer. Email marketing turns them into repeat buyers, raises LTV, and lets you actually scale paid acquisition profitably.",
      systemTitle: "Our lifecycle system.",
      systemSteps: [
        { title: "Audit & strategy", body: "Map flows, segments, and revenue gaps in current setup." },
        { title: "Foundational flows", body: "Welcome, abandoned cart, abandoned checkout, browse abandon." },
        { title: "Lifecycle flows", body: "Post-purchase, winback, replenishment, VIP." },
        { title: "Campaign cadence", body: "Weekly campaigns by segment + AB-tested subjects." },
      ],
      pillarsTitle: "Lifecycle pillars.",
      pillars: [
        { title: "Flows", body: "Always-on revenue, fully automated." },
        { title: "Campaigns", body: "Weekly nudges to engaged segments." },
        { title: "Segmentation", body: "Behavioral + RFM-based, not demographic." },
        { title: "Deliverability", body: "Inbox placement, warm-up, and reputation protection." },
      ],
      deepBlocks: [
        { title: "Abandoned cart recovery", body: "3-4 email sequence, timing-optimised, discount strategy tiered.", tags: ["Email","Timing","Discount tier"] },
        { title: "Welcome flow", body: "Brand story, hero product, social proof, soft offer.", tags: ["Brand","Hero","Offer"] },
        { title: "Post-purchase flow", body: "Thank you, education, cross-sell, review request, subscription nudge.", tags: ["Thank you","Cross-sell","Reviews"] },
        { title: "Winback campaigns", body: "Lapsed buyer segment, offer ladder, sunset rules.", tags: ["Winback","Sunset"] },
        { title: "Campaign calendar", body: "Weekly broadcast plan, themed drops, seasonal pushes, AB-tested subjects.", tags: ["Calendar","AB test","Subject lines"] },
        { title: "Segmentation strategy", body: "Engaged, VIP, lapsed, browsers, subscribers - each gets different content.", tags: ["RFM","Engaged","VIP"] },
      ],
      beforeAfter: {
        before: ["6% of revenue from email","One generic abandoned cart","No segmentation","Poor inbox placement"],
        after: ["32% of revenue from email","Tiered cart + checkout flows","8 active segments","Top-of-inbox deliverability"],
      },
      caseStudy: {
        title: "Skincare brand: email to 34% of revenue",
        problem: "Heavy reliance on paid acquisition, low LTV.",
        strategy: "9 flows + weekly campaign cadence + segmented welcome.",
        result: "Email share went from 6% to 34% in 90 days.",
        metrics: [{ label: "Email share", value: "34%" }, { label: "LTV", value: "2.4×" }, { label: "CAC", value: "-31%" }],
      },
      ctaTitle: "Stop letting carts and customers die quietly.",
      impactStats: [
        { value: "32%", label: "Revenue from email" },
        { value: "+58%", label: "Repeat purchase rate" },
        { value: "12×", label: "LTV vs one-time buyers" },
      ],
      metricBars: [
        { label: "Email revenue share", before: 6, after: 32, unit: "%", description: "Percentage of total store revenue generated by Klaviyo flows + campaigns." },
        { label: "Abandoned-cart recovery", before: 3, after: 18, unit: "%", description: "Recovered cart value as a share of abandonments — top benchmark is 10–20%." },
        { label: "Repeat purchase rate", before: 16, after: 47, unit: "%", description: "Customers buying a second time within 90 days." },
        { label: "Customer LTV", before: 68, after: 184, unit: "£", description: "Lifetime value per customer over a 12-month window." },
        { label: "Revenue per recipient", before: 0.18, after: 0.92, unit: "£", description: "Average revenue earned per email recipient — the truest email health metric." },
      ],
      faqs: FAQ_LIST,
    }} />
  ),
});
