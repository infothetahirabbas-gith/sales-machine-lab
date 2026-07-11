import { createFileRoute } from "@tanstack/react-router";
import CompanyPage, { companyHead } from "@/components/site/CompanyPage";
import { ORG_INFO, SITE_URL } from "@/lib/seo";

const SLUG = "careers";
const TITLE = "Careers | Ecommerce Marketing Jobs UK | BeingEcom";
const DESC = "Join BeingEcom Ecommerce Marketing careers UK for senior SEOs, media buyers, CRO strategists, Klaviyo specialists and Shopify developers.";

// No fabricated live openings; we surface an empty state + talent pool CTA when there are no active roles.
const OPEN_ROLES: { title: string; type: string; location: string; summary: string }[] = [];

const jobPostingLd = OPEN_ROLES.map((r) => ({
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: r.title,
  employmentType: r.type,
  hiringOrganization: { "@type": "Organization", name: ORG_INFO.name, sameAs: ORG_INFO.url },
  jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", ...ORG_INFO.address } },
  description: r.summary,
  datePosted: new Date().toISOString().slice(0, 10),
}));

export const Route = createFileRoute("/company/careers")({
  head: () => companyHead({ slug: SLUG, title: TITLE, description: DESC, jsonLd: jobPostingLd }),
  component: () => (
    <CompanyPage
      slug={SLUG}
      h1="Careers at BeingEcom"
      eyebrow="Careers"
      intro="Build the growth stack for the next generation of Shopify and WooCommerce brands. We hire seniors, we pay above market, and we keep the team small on purpose."
      extraJsonLd={jobPostingLd}
      sections={[
        {
          type: "paragraph",
          id: "why",
          heading: "Why work at BeingEcom",
          body: (
            <>
              <p>We're the agency you'd want to hire if you were the client. Small, senior, ecommerce-only, and structured so that operators do operator work not account management theatre.</p>
              <p>If you're bored of shipping decks that never get executed, of being the most senior person on your team by a decade, or of watching juniors run accounts they shouldn't be running, this is a place to reset.</p>
            </>
          ),
        },
        {
          type: "cards",
          id: "benefits",
          heading: "Employee benefits",
          items: [
            { title: "Above-market pay", body: "Compensation benchmarked against senior in-house DTC roles, not agency averages." },
            { title: "Remote-first, UK-based team", body: "Work from wherever. Quarterly team gatherings for planning, roadmaps and roast dinners." },
            { title: "Learning budget", body: "£1,500/year for courses, conferences and tooling of your choice." },
            { title: "Ownership of your discipline", body: "You own the playbook for your function SEO, paid, CRO, or AI and shape how the agency executes it." },
            { title: "Real time off", body: "28 days plus bank holidays, plus a full week between Christmas and New Year that isn't counted." },
            { title: "Tooling paid for", body: "Ahrefs, Semrush, Klaviyo, GA4 360, Figma, ChatGPT/Claude Team everything you need." },
          ],
        },
        {
          type: "list",
          id: "learning",
          heading: "Learning opportunities",
          items: [
            "Weekly internal deep-dives one operator presents a live case study to the team.",
            "Access to Tahir's private ecommerce operator network.",
            "Sponsored external speaking: we cover travel + prep time for approved conferences.",
            "Written playbook contributions become the recognised author of the agency's stance on your specialism.",
          ],
        },
        {
          type: "paragraph",
          id: "internship",
          heading: "Internship programme",
          body: (
            <p>
              We run a small, paid internship for early-career operators once or twice a year. Interns pair 1:1 with a senior specialist, work on real client tasks with full oversight, and leave with a portfolio of shipped work. Applications open when there's a slot; watch this page or contact us to be added to the notification list.
            </p>
          ),
        },
        {
          type: "custom",
          id: "openings",
          heading: "Open positions",
          render: () =>
            OPEN_ROLES.length === 0 ? (
              <div className="card-surface rounded-2xl p-6 border-dashed">
                <h3 className="font-semibold text-ink">No active openings right now</h3>
                <p className="text-sm text-muted-foreground mt-1.5">
                  We hire against real client capacity, so we don't run permanent open reqs. If you'd be a strong senior fit for
                  ecommerce SEO, paid media, CRO, Shopify/WooCommerce engineering or AI automation, send a note and a link to work
                  you're proud of.
                </p>
                <a href={`mailto:${ORG_INFO.email}?subject=Talent%20pool%20-%20BeingEcom`} className="mt-4 inline-flex items-center rounded-full bg-primary text-primary-foreground text-sm font-semibold px-4 py-2">
                  Introduce yourself
                </a>
              </div>
            ) : (
              <div className="grid gap-3">
                {OPEN_ROLES.map((r) => (
                  <div key={r.title} className="card-surface rounded-2xl p-5">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-semibold text-ink">{r.title}</h3>
                      <span className="text-xs text-muted-foreground">{r.type} · {r.location}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{r.summary}</p>
                  </div>
                ))}
              </div>
            ),
        },
        {
          type: "table",
          id: "process",
          heading: "Hiring process",
          columns: ["Stage", "Who you meet", "What it involves"],
          rows: [
            ["1. Application", "Talent team", "Send a short note + link to work you're proud of. Reply within 5 working days."],
            ["2. Craft screen", "A senior in your discipline", "45 minutes on your operating philosophy and past decisions."],
            ["3. Paid work sample", "You + your future lead", "A real, anonymised task with a defined brief. Paid at senior day rate."],
            ["4. Strategy conversation", "A director", "How you'd operate a client scenario end-to-end."],
            ["5. References", "Two former colleagues", "Backchannel calls; we tell you what we heard."],
            ["6. Offer", "Founder", "Written offer within 3 working days of stage 5."],
          ],
        },
      ]}
      faqs={[
        { q: "Are you hiring right now?", a: "We only run open roles when a real client engagement is ready to place a new hire into. If the openings section above is empty, we're not actively hiring but we always keep a shortlist and will reach out when a role opens." },
        { q: "Do you take on juniors?", a: "Yes, through a structured paid internship. We don't hire juniors into standalone specialist roles; that's part of the senior-only promise we make to clients." },
        { q: "Is BeingEcom remote or office-based?", a: "Remote-first with a UK-based team. We meet in person quarterly for planning offsites and pod dinners." },
        { q: "How long does the process take?", a: "Around 3 to 5 weeks end to end. The paid work sample is the longest stage because we want it to reflect real client work, not a whiteboard trivia round." },
        { q: "What about freelancers?", a: "We keep a small vetted freelance bench for surge capacity in specialist niches. Send an introduction with rates and recent client references." },
      ]}
    />
  ),
});
