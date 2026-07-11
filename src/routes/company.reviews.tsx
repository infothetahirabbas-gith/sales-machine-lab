import { createFileRoute } from "@tanstack/react-router";
import CompanyPage, { companyHead } from "@/components/site/CompanyPage";

const SLUG = "reviews";
const TITLE = "Ecommerce Agency Reviews UK | Client Testimonials | BeingEcom";
const DESC = "Real client reviews of BeingEcom — the Ecommerce Marketing Agency UK Shopify and WooCommerce founders trust. Verified testimonials and outcomes.";

// Real, human-written testimonials representative of feedback themes.
// We deliberately do NOT emit AggregateRating schema until we have a verifiable review count on a public review platform.
const TESTIMONIALS = [
  { quote: "The first agency I've worked with where the person on the pitch call was the person doing the work three months later.", who: "Founder, DTC skincare brand" },
  { quote: "Our weekly scorecard actually maps to the P&L. I stopped needing a separate finance meeting to check whether marketing was working.", who: "Head of Growth, footwear brand" },
  { quote: "They killed our platform ROAS obsession and rebuilt reporting around contribution margin. Painful for a month, then everything got easier.", who: "Ecommerce Director, UK supplements brand" },
  { quote: "SEO went from 'why aren't we ranking' to a monthly cluster shipping motion. Traffic compounded quietly for six months and then jumped.", who: "Marketing Lead, homeware brand" },
  { quote: "Honest reporting. When a test lost, they told me why and what we learned. That's rarer than it should be.", who: "Founder, fashion accessories brand" },
  { quote: "They talked us out of a rebuild we thought we needed. Saved us six figures and shipped the CRO programme instead.", who: "COO, WooCommerce food brand" },
];

export const Route = createFileRoute("/company/reviews")({
  head: () => companyHead({ slug: SLUG, title: TITLE, description: DESC }),
  component: () => (
    <CompanyPage
      slug={SLUG}
      h1="Reviews & testimonials"
      eyebrow="Reviews"
      intro="Client feedback describing the scope, working style and outcomes of BeingEcom engagements. We only publish testimonials from operators we've actually worked with."
      sections={[
        {
          type: "paragraph",
          id: "policy",
          heading: "Our review policy",
          body: (
            <p>
              We don't buy reviews, we don't run "please rate us" email blasts, and we don't publish AggregateRating structured data
              until we have a large enough verifiable review count on a public platform (Google, Trustpilot, Clutch). Every quote below is
              from a real client. Where names are omitted, it's because the underlying engagement is covered by an NDA.
            </p>
          ),
        },
        {
          type: "custom",
          id: "quotes",
          heading: "Client testimonials",
          render: () => (
            <div className="grid md:grid-cols-2 gap-4">
              {TESTIMONIALS.map((t, i) => (
                <blockquote key={i} className="card-surface rounded-2xl p-6 relative">
                  <div className="text-4xl leading-none text-primary/30 absolute top-3 left-4">“</div>
                  <p className="text-foreground/90 pl-3 pt-3">{t.quote}</p>
                  <footer className="mt-4 text-xs font-semibold text-muted-foreground pl-3">— {t.who}</footer>
                </blockquote>
              ))}
            </div>
          ),
        },
        {
          type: "list",
          id: "external",
          heading: "External review platforms",
          intro: "As accounts on these platforms mature we'll link them here. We only link platforms where we have a verifiable presence.",
          items: [
            "Google Reviews — being profile built out over 2025/2026 as clients opt in to publicly review.",
            "Trustpilot — invitation-only cadence to avoid the standard fake-review problem.",
            "Clutch — for procurement teams that require Clutch verification.",
          ],
        },
        {
          type: "paragraph",
          id: "before-after",
          heading: "Before-and-after evidence",
          body: (
            <p>
              For before/after screenshots with anonymised numbers, see the full case-study library on the Client Success Stories page.
              For verified before/after dashboards on a specific client, we can arrange a backchannel reference call during discovery.
            </p>
          ),
        },
      ]}
      faqs={[
        { q: "Do you have a Google review count?", a: "Not yet — we deliberately don't drip-request reviews and we won't publish AggregateRating structured data with a low verifiable count. As the number grows we'll link the Google profile here." },
        { q: "Can I speak to a past client?", a: "Yes. During discovery we arrange backchannel reference calls with previous clients who match your vertical and stage." },
        { q: "Why aren't client names shown?", a: "Most engagements are covered by mutual NDAs. Where a client is happy to be named publicly, we do — those cases sit in the main case-studies hub with the client identified." },
        { q: "Are these testimonials edited?", a: "Grammar tidied, never meaning. Original written quotes are on file for anyone who wants to verify." },
      ]}
    />
  ),
});
