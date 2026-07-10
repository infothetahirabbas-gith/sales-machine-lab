import { createFileRoute, Link } from "@tanstack/react-router";
import CompanyPage, { companyHead } from "@/components/site/CompanyPage";
import { ORG_ID, SITE_URL, TEAM, personJsonLd } from "@/lib/seo";
import founderImg from "@/assets/founder-ceo.jpg.asset.json";

const SLUG = "founder";
const TITLE = "Meet the Founder — Tahir Abbas | BeingEcom CEO";
const DESC = "Tahir Abbas is the founder and CEO of BeingEcom — a UK ecommerce growth operator with a decade of experience scaling Shopify and WooCommerce brands across SEO, paid, CRO and AI automation.";

const founderPerson = TEAM.find((m) => m.slug === "tahir-abbas")!;
const personLd = {
  ...personJsonLd({ ...founderPerson, image: `${SITE_URL}${founderImg.url}` }),
  alumniOf: "Independent ecommerce operator, UK",
  award: [
    "Scaled multiple Shopify brands past £1M ARR",
    "Built BeingEcom's proprietary 13-phase growth methodology",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Ecommerce Growth Operator",
    occupationLocation: { "@type": "Country", name: "United Kingdom" },
    skills: founderPerson.knowsAbout.join(", "),
  },
};

export const Route = createFileRoute("/company/founder")({
  head: () => companyHead({ slug: SLUG, title: TITLE, description: DESC, ogType: "profile", jsonLd: [personLd] }),
  component: () => (
    <CompanyPage
      slug={SLUG}
      h1="Meet the Founder — Tahir Abbas"
      eyebrow="Founder & CEO"
      intro="Tahir Abbas founded BeingEcom to give ambitious Shopify and WooCommerce brands the senior growth team they deserve — the one every founder wishes they could hire in-house."
      readingTime="10 min read"
      author="Tahir Abbas"
      extraJsonLd={[personLd, { "@context": "https://schema.org", "@type": "OrganizationRole", roleName: "Founder & CEO", "member": { "@id": founderPerson.id }, "worksFor": { "@id": ORG_ID } }]}
      sections={[
        {
          type: "custom",
          id: "portrait",
          render: () => (
            <div className="grid md:grid-cols-[280px_1fr] gap-8 items-start">
              <div className="relative mx-auto md:mx-0">
                <div className="absolute -inset-4 bg-primary/15 blur-3xl rounded-full" />
                <div className="relative rounded-[2rem] overflow-hidden border border-border shadow-2xl bg-card w-64 h-72 md:w-[17rem] md:h-[20rem]">
                  <img
                    src={founderImg.url}
                    alt="Tahir Abbas, Founder & CEO of BeingEcom"
                    width={560}
                    height={680}
                    loading="eager"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-2 card-surface px-4 py-2.5 shadow-xl rounded-xl">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Founder &amp; CEO</div>
                  <div className="font-bold text-ink text-sm">Tahir Abbas</div>
                </div>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p className="text-lg text-ink font-medium">"Ecommerce isn't hacks or hype. It's a system where every click, every pound of ad spend and every customer compounds into profitable growth."</p>
                <p>Ten years operating Shopify and WooCommerce brands taught me one thing above all: <span className="text-ink font-semibold">senior time on the account is the only lever that actually moves the P&amp;L</span>. Everything BeingEcom does — pod structure, weekly rituals, revenue-tied plans — comes back to that principle.</p>
              </div>
            </div>
          ),
        },
        {
          type: "paragraph",
          id: "story",
          heading: "The founder story",
          body: (
            <>
              <p>Tahir Abbas has spent more than a decade inside ecommerce — first as an operator scaling his own DTC stores, then leading paid media and SEO for high-growth Shopify brands, and now as the founder and CEO of BeingEcom. The through-line has always been the same: revenue-first thinking, senior execution, and refusing to hide behind vanity metrics.</p>
              <p>BeingEcom exists because most agencies are structured to sell hours, not outcomes. Tahir built a different model — small, senior, ecommerce-only — where every engagement is led by an operator who has actually scaled a store, and where the plan every week is tied to a revenue line the client can verify.</p>
              <p>Today the business is run alongside <Link to="/company/team#ali-abbas" className="text-primary underline">Ali Abbas (CTO)</Link> and <Link to="/company/team#hasnain-abbas" className="text-primary underline">Hasnain Abbas (Managing Director)</Link>, with a senior-only pod team serving Shopify and WooCommerce brands across the UK, US, Ireland and Australia.</p>
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
            ["2024 – present", "Founder & CEO, BeingEcom", "Senior-only agency built around a single revenue-first playbook."],
          ],
        },
        {
          type: "cards",
          id: "expertise",
          heading: "Where the founder personally leads",
          intro: "The disciplines Tahir signs off on inside every engagement — before onboarding closes.",
          items: [
            { title: "Ecommerce SEO", body: "Programmatic SEO, technical audits, entity building, AEO/GEO and international expansion for Shopify + WooCommerce.", to: "/services/seo" },
            { title: "Paid advertising", body: "Meta, Google, TikTok and YouTube as a single P&L — measured against MER and contribution margin, not platform ROAS.", to: "/services/performance-marketing" },
            { title: "Conversion optimisation", body: "Landing page architecture, checkout tuning, offer testing and post-purchase flow design.", to: "/services/cro" },
            { title: "AI automation", body: "Internal automations for reporting, creative production, keyword research and forecasting — never black-box, always auditable.", to: "/services/ai-automation" },
          ],
        },
        {
          type: "list",
          id: "beliefs",
          heading: "What the founder believes about ecommerce",
          intro: "The operating principles behind every plan.",
          items: [
            "MER over ROAS. Platform ROAS is a subset; MER is the truth.",
            "Contribution margin is the only honest scoreboard for a growth team.",
            "AI is leverage on senior judgement — never a substitute for it.",
            "Every experiment should have a written hypothesis, sample size and guardrail before it runs.",
            "The best client relationships are month-to-month by choice, not by contract.",
          ],
        },
        {
          type: "list",
          id: "publications",
          heading: "Publications, talks and interviews",
          intro: "Selected external references. Full list on Media & Press.",
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
              Every plan starts with the P&amp;L. If a piece of work — an ad set, a landing page test, an SEO cluster —
              can't be tied to a specific revenue line within a defined window, it doesn't ship. Reports are honest,
              wins are attributed to their real cause, and losses are not hidden. That's the standard BeingEcom holds
              itself to, and Tahir personally signs off the strategy for every account before onboarding closes.
            </p>
          ),
        },
      ]}
      faqs={[
        { q: "Who is the founder of BeingEcom?", a: "BeingEcom was founded by Tahir Abbas, a UK-based ecommerce growth operator with over ten years of experience scaling Shopify and WooCommerce brands across paid media, SEO, CRO and AI automation." },
        { q: "What is Tahir Abbas's job title?", a: "Founder and Chief Executive Officer of BeingEcom." },
        { q: "Does the founder work directly on client accounts?", a: "Yes. Tahir personally leads the strategy phase for every engagement and stays involved on senior calls throughout the first 90 days. Execution is handled by senior specialists — no juniors are put on an account without a lead operator over them." },
        { q: "What is Tahir's professional background?", a: "He started as a DTC store operator, moved into growth-lead roles at UK Shopify brands, ran an eight-figure paid media P&L for a DTC group, then consulted independently before founding BeingEcom in 2024." },
        { q: "Can I book a call with the founder?", a: "For qualified brands, yes. The initial 30-minute discovery call includes Tahir when the engagement fit is clear. Book via the contact page and note that you'd like the founder on the call." },
        { q: "What is Tahir's LinkedIn?", a: "The current professional profile is linked from the sameAs list in this page's Person structured data. If the link is missing when you visit, contact us and we'll share it directly." },
        { q: "Does the founder speak at events?", a: "Yes — primarily at UK ecommerce founder meetups and closed-door growth roundtables. Public speaking engagements are listed on the Media & Press page as they're confirmed." },
      ]}
    />
  ),
});
