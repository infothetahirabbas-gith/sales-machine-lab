import { createFileRoute } from "@tanstack/react-router";
import CompanyPage, { companyHead } from "@/components/site/CompanyPage";

const SLUG = "community";
const TITLE = "Community & Events — Workshops, Webinars, Meetups | BeingEcom";
const DESC = "Where the BeingEcom team meets the ecommerce community — workshops, live webinars, meetups, roundtables and educational sessions for Shopify and WooCommerce operators.";

export const Route = createFileRoute("/company/community")({
  head: () => companyHead({ slug: SLUG, title: TITLE, description: DESC }),
  component: () => (
    <CompanyPage
      slug={SLUG}
      h1="Community & events"
      eyebrow="Community"
      intro="We run and take part in a small number of events every year — always operator-to-operator, always focused on real growth work, never a rebranded sales pitch."
      sections={[
        {
          type: "paragraph",
          id: "why",
          heading: "Why we invest in community",
          body: (
            <p>
              The best growth thinking still happens in rooms with other operators — comparing failures, sharing dashboards, arguing about
              attribution. We host and attend selected events because they keep our thinking honest and give us patterns we couldn't get from client work alone.
            </p>
          ),
        },
        {
          type: "cards",
          id: "formats",
          heading: "What we run",
          items: [
            { title: "Founder roundtables", body: "Small, invite-only sessions for founders at similar stages. No slides, no pitches, structured operator discussion." },
            { title: "Live webinars", body: "Occasional public webinars on a specific playbook (paid restructure, technical SEO, Klaviyo rebuild). Recordings archived on the blog." },
            { title: "Workshops", body: "Half-day working sessions delivered in-person for partner brands or communities." },
            { title: "Meetups", body: "Informal UK-based meetups when we're travelling — announced via our email list." },
          ],
        },
        {
          type: "list",
          id: "community-initiatives",
          heading: "Community initiatives",
          items: [
            "Free technical audits during selected community events.",
            "Open-source posts and templates published on the blog and glossary.",
            "Mentoring for early-career ecommerce operators via founder introductions.",
          ],
        },
        {
          type: "paragraph",
          id: "upcoming",
          heading: "Upcoming events",
          body: (
            <p>
              Confirmed events are listed on this page and announced to our email list first. If you'd like to be invited to a founder
              roundtable, contact us with your store URL and current monthly revenue and we'll add you to the shortlist for the next
              suitable session.
            </p>
          ),
        },
      ]}
      faqs={[
        { q: "How do I get invited to a founder roundtable?", a: "Contact us with your store URL and monthly revenue. Sessions are matched by stage and vertical, so we run several per year rather than one large event." },
        { q: "Are the webinars recorded?", a: "Yes — recordings and slides are archived on the blog after each session." },
        { q: "Do you speak at other people's events?", a: "Yes, selectively. See the Media & Press page for confirmed talks and interview appearances." },
        { q: "Is there a cost to attend?", a: "Webinars and roundtables are free. In-person workshops delivered for partner brands are commercial engagements." },
      ]}
    />
  ),
});
