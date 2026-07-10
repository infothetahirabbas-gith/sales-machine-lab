import { createFileRoute } from "@tanstack/react-router";
import CompanyPage, { companyHead } from "@/components/site/CompanyPage";

const SLUG = "certifications";
const TITLE = "Certifications & Partnerships | BeingEcom";
const DESC = "Certifications, training and platform partnerships held by the BeingEcom team — Google, Meta, Shopify, WooCommerce, HubSpot and professional memberships.";

export const Route = createFileRoute("/company/certifications")({
  head: () => companyHead({ slug: SLUG, title: TITLE, description: DESC }),
  component: () => (
    <CompanyPage
      slug={SLUG}
      h1="Certifications & partnerships"
      eyebrow="Certifications"
      intro="We list only certifications and partnership statuses we currently hold — no expired badges, no stock-photo logos. Verifiable references available on request."
      sections={[
        {
          type: "paragraph",
          id: "trust",
          heading: "How to read this page",
          body: (
            <p>
              Certifications shift constantly (Google rebrands, Meta rescopes, Shopify tiers change). Rather than plaster a wall of badges, we list current
              training our senior operators hold and the partnership statuses BeingEcom or team members maintain. If you need proof for procurement, we'll share the
              raw credential IDs in your onboarding pack. Logos and marks referenced belong to their respective owners.
            </p>
          ),
        },
        {
          type: "cards",
          id: "google",
          heading: "Google",
          items: [
            { title: "Google Ads Search Certification",     body: "Held by senior paid media operators." },
            { title: "Google Ads Display Certification",    body: "For display and PMax placements." },
            { title: "Google Ads Shopping Certification",   body: "Merchant Center, feed hygiene, Shopping campaign structure." },
            { title: "Google Ads Video Certification",      body: "YouTube TrueView, in-stream and Shorts campaigns." },
            { title: "GA4 Certification",                   body: "Event modelling, conversion setup, exploration reports." },
            { title: "Google Partner status",               body: "Maintained via active spend, certifications and performance thresholds." },
          ],
        },
        {
          type: "cards",
          id: "meta",
          heading: "Meta",
          items: [
            { title: "Meta Blueprint — Media Buying",       body: "Advantage+ campaigns, budget structure and creative testing." },
            { title: "Meta Blueprint — Creative Strategy",  body: "Creative for feed, Reels and Stories at scale." },
            { title: "Conversions API implementation",      body: "Server-side event tracking best-practices." },
          ],
        },
        {
          type: "cards",
          id: "platforms",
          heading: "Ecommerce platforms",
          items: [
            { title: "Shopify Partner",                    body: "Access to Partner tooling, staging stores and roadmap previews." },
            { title: "Shopify Plus experience",            body: "Multi-store, checkout extensibility, B2B, wholesale." },
            { title: "WooCommerce partner ecosystem",      body: "Certified developers on the team; long-standing WooCommerce & WordPress engineering." },
            { title: "Klaviyo Partner",                    body: "Klaviyo Certified Product Experts inside the retention pod." },
          ],
        },
        {
          type: "cards",
          id: "other",
          heading: "Other training",
          items: [
            { title: "HubSpot Marketing Software",         body: "For the small number of hybrid content + marketing-ops engagements." },
            { title: "CXL Institute — CRO / analytics",    body: "Rigorous experimentation and measurement training." },
            { title: "Ahrefs & Semrush Academy",           body: "Ongoing SEO tooling proficiency across the SEO pod." },
          ],
        },
        {
          type: "list",
          id: "memberships",
          heading: "Professional memberships & communities",
          items: [
            "Independent DTC operator communities (private, invite-only).",
            "UK ecommerce founder meetup networks.",
            "Shopify partner ecosystem regional events.",
          ],
        },
      ]}
      faqs={[
        { q: "Are you a Google Premier Partner?", a: "We maintain Google Partner status. Premier Partner status is tier-gated by monthly spend across our managed accounts; when we cross the threshold consistently we'll list Premier here. We do not pre-claim it." },
        { q: "Are you a Shopify Plus Partner?", a: "We operate on Shopify Plus, hold Shopify Partner access and staff certified Plus specialists. Formal Plus Partner listing is application-based and we update this page when status changes." },
        { q: "Can I see the actual certification IDs?", a: "Yes — for procurement and RFP purposes we share credential IDs in the onboarding pack. Ask during discovery and we'll include them." },
        { q: "Do you use partner status for kickbacks?", a: "No. Partner statuses give us tooling and roadmap access; they do not influence which platform we recommend for your business. Platform selection is always based on your operating fit." },
      ]}
    />
  ),
});
