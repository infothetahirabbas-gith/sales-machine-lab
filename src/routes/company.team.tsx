import { createFileRoute } from "@tanstack/react-router";
import CompanyPage, { companyHead } from "@/components/site/CompanyPage";
import { SITE_URL } from "@/lib/seo";

const SLUG = "team";
const TITLE = "Our Team — Senior Ecommerce Operators | BeingEcom";
const DESC = "The senior operators, specialists and engineers behind every BeingEcom engagement — SEO, paid, Shopify, WooCommerce, CRO, creative, AI and customer success.";

const itemListLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${SITE_URL}/company/team#roles`,
  name: "BeingEcom team roles",
  itemListElement: [
    "Leadership", "SEO Specialists", "Paid Media Team", "Shopify Experts",
    "WooCommerce Experts", "CRO Specialists", "Developers", "Designers",
    "AI Automation Engineers", "Customer Success",
  ].map((n, i) => ({ "@type": "ListItem", position: i + 1, name: n })),
};

export const Route = createFileRoute("/company/team")({
  head: () => companyHead({ slug: SLUG, title: TITLE, description: DESC, jsonLd: [itemListLd] }),
  component: () => (
    <CompanyPage
      slug={SLUG}
      h1="The team behind your growth"
      eyebrow="Our Team"
      intro="BeingEcom is deliberately small and deliberately senior. Every function on your account is led by someone who has actually operated a store — not by a junior learning on your budget."
      extraJsonLd={[itemListLd]}
      sections={[
        {
          type: "paragraph",
          id: "structure",
          heading: "How the team is structured",
          body: (
            <>
              <p>We run pods, not departments. Each client is served by a small cross-functional pod — strategy lead, execution specialists, and a customer success owner — that stays with your account from day one. This gives you a single accountable team, not a rotating cast of freelancers.</p>
              <p>Above every pod sits a leadership review cadence: weekly on numbers, monthly on strategy, and quarterly on roadmap. That's how a senior-only team of ~15 operators can serve dozens of stores at real depth.</p>
            </>
          ),
        },
        {
          type: "cards",
          id: "functions",
          heading: "Functions inside a pod",
          items: [
            { title: "Leadership", body: "Sets strategy, signs off on the 90-day plan, joins escalation calls, and owns the P&L view for every client." },
            { title: "SEO specialists", body: "Technical, on-page, off-page, local, international and AEO — one lead per stream, coordinated by an SEO director.", to: "/services/seo" },
            { title: "Paid media team", body: "Meta, Google, TikTok and YouTube buyers who report against MER and contribution margin, not just platform ROAS.", to: "/services/performance-marketing" },
            { title: "Shopify + WooCommerce experts", body: "Store architects who ship on Shopify, Shopify Plus, WooCommerce and headless stacks (Hydrogen, Next.js + Storefront API).", to: "/services/store-development" },
            { title: "CRO specialists", body: "Run structured experimentation — hypothesis, sample size, guardrails — not vibes-based A/B tests.", to: "/services/cro" },
            { title: "Developers & designers", body: "Front-end engineers, motion designers and creative producers focused entirely on ecommerce UX and ad creative." },
            { title: "AI automation engineers", body: "Build the internal automations that let a small team operate at scale — reporting, creative testing, keyword research.", to: "/services/ai-automation" },
            { title: "Customer success", body: "Owns the weekly ritual: reporting, next-action list, blockers surfaced, and the client onboarding runway." },
          ],
        },
        {
          type: "table",
          id: "seniority",
          heading: "Seniority mix",
          intro: "We hire against a senior bar. Our public claim is that no junior touches your account without a senior operator directly over them, and this table shows what that means in practice.",
          columns: ["Role level", "Minimum experience", "Where they show up"],
          rows: [
            ["Director", "10+ years ecommerce", "Strategy, escalations, quarterly reviews."],
            ["Lead", "6+ years in the discipline", "Day-to-day account leadership; signs off on all work that ships."],
            ["Senior specialist", "4+ years in the discipline", "Executes the work; owns the deliverable end-to-end."],
            ["Specialist", "2+ years, always paired", "Never solo on client work; paired with a senior or lead."],
          ],
        },
        {
          type: "list",
          id: "culture",
          heading: "Culture pillars",
          items: [
            "Revenue-first. Every task should ladder up to a P&L line — otherwise it doesn't go on the plan.",
            "Honest reporting. Losses are named. Wins are attributed to their real cause, not to whoever shouts loudest.",
            "Small, senior, ecommerce-only. We say no to work outside our scope.",
            "AI as leverage. We automate our own workflows so our people can spend time on judgement, not repetition.",
            "Client-in-the-room. Founders get direct access to the operator running their account, not a middle-manager account handler.",
          ],
        },
        {
          type: "paragraph",
          id: "hiring",
          heading: "How we hire",
          body: (
            <p>
              We only run open roles when we already have the client capacity to place a new person into a real account within 30 days.
              Every candidate goes through a paid work sample using anonymised real data, a strategy conversation with a director, and
              a reference call with two former colleagues. It's slow — deliberately. See <a className="text-primary underline" href="/company/careers">Careers</a>
              {" "}for current openings.
            </p>
          ),
        },
      ]}
      faqs={[
        { q: "How big is the BeingEcom team?", a: "We're deliberately small — a senior-only team of ecommerce operators, specialists and engineers organised into cross-functional pods. This lets us stay hands-on across every account instead of hiding behind account managers." },
        { q: "Who will I actually work with day to day?", a: "Your dedicated pod: a strategy lead, the specialists for the disciplines you're using (SEO, paid, CRO, email, etc.), and a customer success owner. All senior. All ecommerce-only." },
        { q: "Do juniors work on my account?", a: "No junior operates unsupervised on a client account. Specialists with less than four years of experience are always paired with a senior or lead operator who signs off on every deliverable." },
        { q: "How do you decide which pod is on my account?", a: "During onboarding we match your platform (Shopify vs WooCommerce), your primary channels, and your growth stage to the pod best set up to serve you. You meet the whole pod on kickoff." },
        { q: "Can I speak to a specialist directly, without an account manager?", a: "Yes. That's the model — the operator doing the work is the person you speak to. We don't have a layer of account handlers between you and execution." },
      ]}
    />
  ),
});
