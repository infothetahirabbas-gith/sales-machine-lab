import { createFileRoute } from "@tanstack/react-router";
import CompanyPage, { companyHead } from "@/components/site/CompanyPage";

const SLUG = "press";
const TITLE = "Press | Ecommerce Agency UK Coverage | BeingEcom";
const DESC = "BeingEcom press coverage, features and thought leadership — an Ecommerce Marketing Agency UK cited across ecommerce, Shopify and DTC media.";

export const Route = createFileRoute("/company/press")({
  head: () => companyHead({ slug: SLUG, title: TITLE, description: DESC }),
  component: () => (
    <CompanyPage
      slug={SLUG}
      h1="Media & press"
      eyebrow="Press"
      intro="External coverage, guest appearances and interviews featuring the BeingEcom team. We only list appearances that have actually shipped — no 'coming soon' placeholders."
      sections={[
        {
          type: "paragraph",
          id: "for-journalists",
          heading: "For journalists and podcasters",
          body: (
            <p>
              We're happy to talk on record about ecommerce growth, paid media efficiency post-iOS, AI in agency workflows,
              Shopify vs WooCommerce for scaling brands, and honest reporting practices in agency-client relationships. For
              media enquiries, email <a href="mailto:info@beingecom.com" className="text-primary underline">info@beingecom.com</a> with
              your outlet, deadline and angle.
            </p>
          ),
        },
        {
          type: "list",
          id: "publications",
          heading: "Guest articles & publications",
          intro: "External written work by the BeingEcom team.",
          items: [
            "In-house long-form playbooks on the BeingEcom blog (updated monthly).",
            "Guest bylines placed on ecommerce operator publications by invitation — new pieces linked here as they publish.",
          ],
        },
        {
          type: "list",
          id: "podcasts",
          heading: "Podcast appearances",
          items: [
            "Independent DTC and Shopify-focused podcasts covering paid media, CRO and agency operations.",
            "Recording links added here once episodes are live on the host platform.",
          ],
        },
        {
          type: "list",
          id: "talks",
          heading: "Speaking engagements",
          items: [
            "UK ecommerce founder meetups — closed-door roundtables on AI-assisted growth workflows.",
            "Occasional workshop appearances at partner-hosted conferences.",
            "Upcoming confirmed dates will be listed here with links.",
          ],
        },
        {
          type: "paragraph",
          id: "assets",
          heading: "Brand assets & press kit",
          body: (
            <p>
              For approved logos, brand colours, founder bio and headshots, email us and we'll send an up-to-date press pack.
              Please do not screenshot the site for editorial use — the assets in the pack are print-quality and colour-correct.
            </p>
          ),
        },
      ]}
      faqs={[
        { q: "Where has BeingEcom been featured?", a: "External appearances are listed on this page as they publish. We deliberately don't pre-announce coverage that isn't live — we'd rather under-promise here." },
        { q: "Can I invite the founder onto my podcast?", a: "Yes — email us with the show, typical guest profile, and target recording window. We reply within a few working days." },
        { q: "Do you have a press kit?", a: "Yes — logos, colours, founder bio and headshots. Available on request via the media email above." },
        { q: "Can I quote content from the BeingEcom blog?", a: "Yes with attribution and a link back. For extended excerpts (over 200 words) please email first." },
      ]}
    />
  ),
});
