import { createFileRoute } from "@tanstack/react-router";
import CompanyPage, { companyHead } from "@/components/site/CompanyPage";
import { ORG_INFO, SITE_URL } from "@/lib/seo";

const SLUG = "founder";
const TITLE = "Meet the Founder — Tahir Abbas | BeingEcom";
const DESC = "Tahir Abbas is the founder of BeingEcom, a UK ecommerce growth operator with a decade of experience scaling Shopify and WooCommerce brands.";

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/company/founder#person`,
  name: "Tahir Abbas",
  jobTitle: "Founder & Growth Lead",
  worksFor: { "@type": "Organization", name: ORG_INFO.name, url: ORG_INFO.url },
  url: `${SITE_URL}/company/founder`,
  sameAs: [
    "https://www.linkedin.com/in/tahirabbas",
    ORG_INFO.sameAs[0],
  ],
  knowsAbout: [
    "Ecommerce SEO", "Shopify", "WooCommerce", "Conversion Rate Optimisation",
    "Performance Marketing", "Google Ads", "Meta Ads", "Klaviyo", "AI automation",
    "Analytics", "GA4",
  ],
  description: DESC,
};

export const Route = createFileRoute("/company/founder")({
  head: () => companyHead({ slug: SLUG, title: TITLE, description: DESC, ogType: "profile", jsonLd: [personLd] }),
  component: () => (
    <CompanyPage
      slug={SLUG}
      h1="Meet the Founder — Tahir Abbas"
      eyebrow="Founder"
      intro="Tahir Abbas founded BeingEcom to give ambitious Shopify and WooCommerce brands the senior growth team they deserve — the one every founder wishes they could hire in-house."
      readingTime="9 min read"
      author="Tahir Abbas"
      extraJsonLd={[personLd]}
      sections={[
        {
          type: "paragraph",
          id: "story",
          heading: "The founder story",
          body: (
            <>
              <p>Tahir Abbas has spent more than a decade inside ecommerce — first as an operator scaling his own DTC stores, then leading paid media and SEO for high-growth Shopify brands, and now as the founder of BeingEcom. The through-line has always been the same: revenue-first thinking, senior execution, and refusing to hide behind vanity metrics.</p>
              <p>BeingEcom exists because most agencies are structured to sell hours, not outcomes. Tahir built a different model — small, senior, ecommerce-only — where every engagement is led by an operator who has actually scaled a store, and where the plan every week is tied to a revenue line the client can verify.</p>
            </>
          ),
        },
        {
          type: "table",
          id: "timeline",
          heading: "Career timeline",
          intro: "A decade of ecommerce operating experience, condensed.",
          columns: ["Period", "Role", "What was learned"],
          rows: [
            ["2013 – 2015", "DTC store operator", "Product-market fit, unit economics and paid acquisition on Facebook and Google."],
            ["2015 – 2017", "Growth lead, UK Shopify brand", "Scaled monthly revenue 6× through ads + email + landing pages."],
            ["2017 – 2019", "Head of Performance, DTC group", "Ran an eight-figure paid media P&L across four brands."],
            ["2019 – 2021", "Freelance growth partner", "Advised Shopify Plus brands on CRO, technical SEO and Klaviyo."],
            ["2021 – 2023", "Consultant — Shopify + WooCommerce", "Migrations, replatforming, headless architecture for scaling brands."],
            ["2023 – 2024", "AI-first ecommerce operator", "Built proprietary automations for reporting, forecasting and creative testing."],
            ["2024 – present", "Founder, BeingEcom", "Senior-only agency built around a single revenue-first playbook."],
          ],
        },
        {
          type: "cards",
          id: "expertise",
          heading: "Expertise",
          intro: "Where Tahir personally leads work inside every engagement.",
          items: [
            { title: "Ecommerce SEO", body: "Programmatic SEO, technical audits, entity building and international expansion for Shopify + WooCommerce.", to: "/services/seo" },
            { title: "Paid advertising", body: "Meta, Google, TikTok and YouTube as a single P&L — measured against MER and contribution margin, not platform ROAS.", to: "/services/performance-marketing" },
            { title: "Conversion optimisation", body: "Landing page architecture, checkout tuning, offer testing and post-purchase flow design.", to: "/services/cro" },
            { title: "AI automation", body: "Internal automations for reporting, creative production, keyword research and forecasting — never black-box, always auditable.", to: "/services/ai-automation" },
          ],
        },
        {
          type: "list",
          id: "publications",
          heading: "Publications, talks and interviews",
          intro: "Selected external references. Full media & press page linked in the related section.",
          items: [
            "Regular contributor to BeingEcom's editorial blog — long-form playbooks on SEO, CRO and paid.",
            "Interviewed on independent DTC podcasts about the shift from ROAS-first to margin-first thinking.",
            "Speaker at ecommerce founder meetups in London on AI-assisted growth workflows.",
            "Author of BeingEcom's internal 13-phase growth methodology used across every client engagement.",
          ],
        },
        {
          type: "paragraph",
          id: "philosophy",
          heading: "Operating philosophy",
          body: (
            <p>
              Every plan starts with the P&L. If a piece of work — an ad set, a landing page test, an SEO cluster —
              can't be tied to a specific revenue line within a defined window, it doesn't ship. Reports are honest,
              wins are attributed to their real cause, and losses are not hidden. That's the standard BeingEcom holds
              itself to, and Tahir personally signs off the strategy for every account before onboarding closes.
            </p>
          ),
        },
      ]}
      faqs={[
        { q: "Who is the founder of BeingEcom?", a: "BeingEcom was founded by Tahir Abbas, a UK-based ecommerce growth operator with over ten years of experience scaling Shopify and WooCommerce brands across paid media, SEO, CRO and AI automation." },
        { q: "Does the founder work directly on client accounts?", a: "Yes. Tahir personally leads the strategy phase for every engagement and stays involved on senior calls throughout the first 90 days. Execution is handled by senior specialists — no juniors are put on an account without a lead operator over them." },
        { q: "What is Tahir's professional background?", a: "He started as a DTC store operator, moved into growth-lead roles at UK Shopify brands, ran an eight-figure paid media P&L for a DTC group, then consulted independently before founding BeingEcom. He specialises in ecommerce SEO, paid media, CRO and AI automation." },
        { q: "Can I book a call with the founder?", a: "For qualified brands, yes. The initial 30-minute discovery call includes Tahir when the engagement fit is clear. Book via the contact page and note that you'd like the founder on the call." },
        { q: "What is Tahir's LinkedIn?", a: "The current professional profile is linked from the sameAs list in this page's structured data and from the footer social row. If the link is missing when you visit, contact us and we'll share it directly." },
        { q: "Does the founder speak at events?", a: "Yes — primarily at UK ecommerce founder meetups and closed-door growth roundtables. Public speaking engagements are listed on the Media & Press page as they're confirmed." },
      ]}
    />
  ),
});
