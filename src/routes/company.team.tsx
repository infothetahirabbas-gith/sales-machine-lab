import { createFileRoute, Link } from "@tanstack/react-router";
import CompanyPage, { companyHead } from "@/components/site/CompanyPage";
import { SITE_URL, TEAM, personJsonLd } from "@/lib/seo";
import founderImg from "@/assets/founder-ceo.jpg.asset.json";

const SLUG = "team";
const TITLE = "Ecommerce Experts UK | Senior Team | BeingEcom";
const DESC = "Meet the Ecommerce Experts UK behind BeingEcom senior Shopify, WooCommerce, SEO, paid ads, CRO and Klaviyo specialists working from one integrated pod.";

const membersWithImages = TEAM.map((m) => ({
  ...m,
  image: m.slug === "tahir-abbas" ? `${SITE_URL}${founderImg.url}` : undefined,
}));

const personLds = membersWithImages.map((m) => personJsonLd(m));

const itemListLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${SITE_URL}/company/team#leadership`,
  name: "BeingEcom leadership team",
  itemListElement: membersWithImages.map((m, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: { "@id": m.id, "@type": "Person", name: m.name, jobTitle: m.jobTitle },
  })),
};

function Avatar({ member }: { member: typeof membersWithImages[number] }) {
  if (member.image) {
    return (
      <img
        src={member.image}
        alt={`${member.name}, ${member.jobTitle} at BeingEcom`}
        width={320}
        height={320}
        loading="lazy"
        className="w-32 h-32 rounded-2xl object-cover border border-border shadow-md"
      />
    );
  }
  return (
    <div
      aria-label={`${member.name} image coming soon`}
      className="w-32 h-32 rounded-2xl border border-border bg-primary/10 flex items-center justify-center text-4xl font-bold text-primary shadow-md"
    >
      {member.initials}
    </div>
  );
}

export const Route = createFileRoute("/company/team")({
  head: () => companyHead({ slug: SLUG, title: TITLE, description: DESC, jsonLd: [itemListLd, ...personLds] }),
  component: () => (
    <CompanyPage
      slug={SLUG}
      h1="The team behind your growth"
      eyebrow="Our Team"
      intro="BeingEcom is deliberately small and deliberately senior. Every function on your account is led by someone who has actually operated a store not by a junior learning on your budget."
      extraJsonLd={[itemListLd, ...personLds]}
      sections={[
        {
          type: "custom",
          id: "leadership",
          heading: "Leadership",
          render: () => (
            <div className="grid gap-6">
              {membersWithImages.map((m) => (
                <article
                  key={m.slug}
                  id={m.slug}
                  className="card-surface rounded-2xl p-6 grid md:grid-cols-[128px_1fr] gap-6 items-start scroll-mt-28"
                >
                  <Avatar member={m} />
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold uppercase tracking-widest text-primary">{m.jobTitle}</div>
                    <h3 className="mt-1 text-2xl font-bold text-ink">{m.name}</h3>
                    <p className="mt-3 text-muted-foreground leading-relaxed">{m.bio}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {m.knowsAbout.slice(0, 6).map((k) => (
                        <span key={k} className="text-[11px] px-2.5 py-1 rounded-full bg-secondary/60 text-muted-foreground border border-border">{k}</span>
                      ))}
                    </div>
                    {m.slug === "tahir-abbas" && (
                      <Link to="/company/founder" className="mt-4 inline-flex text-sm font-semibold text-primary">
                        Read the founder story →
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ),
        },
        {
          type: "paragraph",
          id: "structure",
          heading: "How the team is structured",
          body: (
            <>
              <p>We run pods, not departments. Each client is served by a small cross-functional pod strategy lead, execution specialists, and a customer success owner that stays with your account from day one. This gives you a single accountable team, not a rotating cast of freelancers.</p>
              <p>Above every pod sits a leadership review cadence: weekly on numbers, monthly on strategy, and quarterly on roadmap. That's how a senior-only team can serve dozens of Shopify and WooCommerce brands at real depth.</p>
            </>
          ),
        },
        {
          type: "cards",
          id: "functions",
          heading: "Functions inside a pod",
          items: [
            { title: "Leadership (Tahir, Ali, Hasnain)", body: "Sets strategy, signs off on the 90-day plan, joins escalation calls, and owns the P&L view for every client." },
            { title: "SEO specialists", body: "Technical, on-page, off-page, local, international and AEO one lead per stream, coordinated by an SEO director.", to: "/services/seo" },
            { title: "Paid media team", body: "Meta, Google, TikTok and YouTube buyers who report against MER and contribution margin, not just platform ROAS.", to: "/services/performance-marketing" },
            { title: "Shopify + WooCommerce engineers", body: "Store architects who ship on Shopify, Shopify Plus, WooCommerce and headless stacks (Hydrogen, Next.js + Storefront API).", to: "/services/store-development" },
            { title: "CRO specialists", body: "Run structured experimentation hypothesis, sample size, guardrails not vibes-based A/B tests.", to: "/services/cro" },
            { title: "Developers & designers", body: "Front-end engineers, motion designers and creative producers focused entirely on ecommerce UX and ad creative." },
            { title: "AI automation engineers", body: "Build the internal automations that let a small team operate at scale reporting, creative testing, keyword research.", to: "/services/ai-automation" },
            { title: "Customer success", body: "Owns the weekly ritual: reporting, next-action list, blockers surfaced, and the client onboarding runway." },
          ],
        },
        {
          type: "table",
          id: "seniority",
          heading: "Seniority mix",
          intro: "We hire against a senior bar. No junior touches your account without a senior operator directly over them.",
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
            "Revenue-first. Every task should ladder up to a P&L line otherwise it doesn't go on the plan.",
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
              a reference call with two former colleagues. It's slow deliberately. See <Link to="/company/careers" className="text-primary underline">Careers</Link> for current openings.
            </p>
          ),
        },
      ]}
      faqs={[
        { q: "Who leads BeingEcom?", a: "The leadership team is Tahir Abbas (Founder & CEO), Ali Abbas (Chief Technology Officer) and Hasnain Abbas (Managing Director). All three are involved in client strategy at the leadership level." },
        { q: "Who is the CEO of BeingEcom?", a: "Tahir Abbas is the founder and CEO. See the /company/founder page for his full background." },
        { q: "Who is the CTO of BeingEcom?", a: "Ali Abbas is the CTO, leading engineering headless Shopify (Hydrogen), WooCommerce development, server-side tracking, GA4 and the AI automation pipelines used across every engagement." },
        { q: "Who is the Managing Director of BeingEcom?", a: "Hasnain Abbas is the Managing Director, running operations, delivery and client success across every account onboarding, pod assembly, weekly reporting rituals and quarterly strategic reviews." },
        { q: "Do juniors work on my account?", a: "No junior operates unsupervised on a client account. Specialists with less than four years of experience are always paired with a senior or lead operator who signs off on every deliverable." },
        { q: "How do you decide which pod is on my account?", a: "During onboarding we match your platform (Shopify vs WooCommerce), your primary channels and your growth stage to the pod best set up to serve you. You meet the whole pod on kickoff." },
        { q: "Can I speak to a specialist directly, without an account manager?", a: "Yes. That's the model the operator doing the work is the person you speak to. We don't have a layer of account handlers between you and execution." },
      ]}
    />
  ),
});
