import { createFileRoute } from "@tanstack/react-router";
import CompanyPage, { companyHead } from "@/components/site/CompanyPage";
import { SITE_URL } from "@/lib/seo";

const SLUG = "technology";
const TITLE = "Technology Stack | Ecommerce Agency UK | BeingEcom";
const DESC = "The technology stack behind BeingEcom, an Ecommerce Marketing Agency UK Shopify, WooCommerce, Klaviyo, GA4, Triple Whale and the tools that scale profitably.";

const STACK = [
  { group: "Ecommerce platforms",  items: [
    { name: "Shopify",       why: "Primary platform for DTC brands scaling from 6 to 8 figures." },
    { name: "Shopify Plus",  why: "Multi-store, wholesale, headless, checkout extensibility for scale-ups." },
    { name: "WooCommerce",   why: "For brands wanting deeper CMS control or already invested in WordPress." },
  ]},
  { group: "Analytics",            items: [
    { name: "Google Analytics 4",  why: "Baseline behavioural analytics for every account." },
    { name: "Google Tag Manager",  why: "Central tag layer event integrity is a non-negotiable." },
    { name: "Microsoft Clarity",   why: "Session replay + heatmaps at no cost." },
    { name: "Hotjar",              why: "Deeper CRO qualitative when scoped." },
  ]},
  { group: "Paid media",           items: [
    { name: "Google Ads",   why: "Search, Shopping, PMax planned against margin, not blended ROAS." },
    { name: "Meta Ads",     why: "Facebook + Instagram creative velocity engine." },
    { name: "TikTok Ads",   why: "Where category demand supports it and creative can keep pace." },
    { name: "YouTube Ads",  why: "Awareness + retargeting layer for scaled brands." },
  ]},
  { group: "Email & retention",    items: [
    { name: "Klaviyo",       why: "Our default email + SMS platform deep segmentation and flows." },
    { name: "Postscript",    why: "SMS layer for US-heavy audiences." },
    { name: "Recharge",      why: "Subscription programme engineering." },
  ]},
  { group: "SEO tooling",          items: [
    { name: "Ahrefs",           why: "Backlink profile, keyword universe, content-gap analysis." },
    { name: "Semrush",          why: "SERP volatility, PPC/organic cross-analysis, position tracking." },
    { name: "Screaming Frog",   why: "Technical crawls, log-file analysis, structured data QA." },
    { name: "Google Search Console", why: "Truth-source for indexation and organic performance." },
  ]},
  { group: "AI & automation",      items: [
    { name: "OpenAI (GPT)",  why: "Content briefs, keyword clustering, ad-copy variant generation." },
    { name: "Anthropic Claude", why: "Long-context editorial review and technical audit summarisation." },
    { name: "Google Gemini", why: "Multimodal creative review and structured-data validation." },
    { name: "n8n",           why: "Self-hosted workflow automation reporting, alerts, data joins." },
    { name: "Make",          why: "No-code integrations where n8n is overkill." },
    { name: "Zapier",        why: "Lightweight triggers between SaaS tools." },
  ]},
];

const itemListLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${SITE_URL}/company/technology#stack`,
  itemListElement: STACK.flatMap((g) => g.items).map((it, i) => ({
    "@type": "ListItem", position: i + 1, name: it.name,
  })),
};

export const Route = createFileRoute("/company/technology")({
  head: () => companyHead({ slug: SLUG, title: TITLE, description: DESC, jsonLd: [itemListLd], noindex: true }),
  component: () => (
    <CompanyPage
      slug={SLUG}
      h1="Our technology stack"
      eyebrow="Stack"
      intro="Every BeingEcom engagement runs on the same core stack. We're tool-opinionated so we don't waste your first quarter debating platforms and so our reporting is consistent across every account we operate."
      extraJsonLd={[itemListLd]}
      sections={[
        {
          type: "paragraph",
          id: "philosophy",
          heading: "Stack philosophy",
          body: (
            <p>
              We pick tools that give us data integrity, not the tools with the shiniest dashboard. Every platform below has a defined
              role in the 13-phase methodology, and we own the setup end-to-end so nothing gets configured "for the pitch deck" and then
              left half-wired. All logos and marks below are property of their respective owners; listing them does not imply endorsement
              by those companies unless explicitly stated on our Certifications & Partnerships page.
            </p>
          ),
        },
        ...STACK.map((g) => ({
          type: "cards" as const,
          id: g.group.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          heading: g.group,
          items: g.items.map((i) => ({ title: i.name, body: i.why })),
        })),
      ]}
      faqs={[
        { q: "Are you locked into these tools?", a: "No the stack listed is our default. If you're already invested in a comparable tool that meets our data-integrity bar (e.g. Omnisend instead of Klaviyo), we'll adopt it. If it doesn't, we'll say so honestly." },
        { q: "Do you use AI to write client content?", a: "AI is used as leverage inside the workflow clustering, briefing, first-draft variants never as the final voice. Everything shipped to a client is reviewed by a senior operator." },
        { q: "Do we need to pay for these tools separately?", a: "For account-level tools (GA4, Klaviyo, Shopify) yes those live in your name. For our operating tools (Ahrefs, Semrush, n8n) we pay; the cost is built into our fee." },
        { q: "Can you migrate us from Klaviyo to something else, or vice versa?", a: "Yes we've done Klaviyo↔Omnisend and Shopify↔WooCommerce migrations. Scope depends on flow count and data volume; we'll cost it in the plan." },
        { q: "Is the AI tooling private and secure?", a: "We use team/enterprise accounts with data-training disabled, and we never send raw customer PII to any third-party model." },
      ]}
    />
  ),
});
