import { createFileRoute, Link } from "@tanstack/react-router";
import PageLayout from "@/components/site/PageLayout";
import { CTA } from "@/components/site/Section";
import { SITE_URL, ORG_INFO } from "@/lib/seo";

const TITLE = "Accessibility Statement | BeingEcom";
const DESC = "BeingEcom's commitment to web accessibility on beingecom.com — WCAG 2.2 AA target, known limitations and how to report a barrier.";
const URL = `${SITE_URL}/accessibility`;

export const Route = createFileRoute("/accessibility")({
  head: () => ({
    meta: [
      { title: TITLE }, { name: "description", content: DESC },
      { property: "og:title", content: TITLE }, { property: "og:description", content: DESC },
      { property: "og:url", content: URL }, { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: AccessibilityPage,
});

function AccessibilityPage() {
  return (
    <PageLayout>
      <section className="pt-16 pb-10">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <p className="text-xs text-muted-foreground"><Link to="/">Home</Link> · <Link to="/company/legal">Legal</Link> · Accessibility</p>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-ink">Accessibility statement</h1>
          <p className="mt-4 text-muted-foreground">This statement is maintained by {ORG_INFO.name} and applies to <strong>beingecom.com</strong>. Last updated {new Date().toISOString().slice(0, 10)}.</p>
          <div className="prose-body mt-8 space-y-5 text-muted-foreground leading-relaxed">
            <h2 className="text-xl font-bold text-ink">Our commitment</h2>
            <p>We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA across every public page of this website. Accessibility is treated as part of the definition-of-done for any change we ship — not as an afterthought.</p>
            <h2 className="text-xl font-bold text-ink">What that means in practice</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Semantic HTML, meaningful heading order and skip links where relevant.</li>
              <li>Keyboard navigable menus, forms and interactive components.</li>
              <li>Colour contrast ratios verified against WCAG AA thresholds.</li>
              <li>Alt text on informative images; decorative images marked as such.</li>
              <li>Form fields with visible labels, error text and programmatic associations.</li>
              <li>Motion respects the <code>prefers-reduced-motion</code> user setting.</li>
            </ul>
            <h2 className="text-xl font-bold text-ink">Known limitations</h2>
            <p>We publish honestly: some third-party embeds (chat widgets, embedded video, translation widgets) may not meet the same standard as pages we author directly. We continually audit these and replace or wrap them where possible.</p>
            <h2 className="text-xl font-bold text-ink">Report a barrier</h2>
            <p>If you hit an accessibility barrier on this site, email <a className="text-primary underline" href={`mailto:${ORG_INFO.email}?subject=Accessibility%20barrier`}>{ORG_INFO.email}</a> with the page URL and a short description. We aim to respond within 5 working days and fix within 30 days where feasible.</p>
            <h2 className="text-xl font-bold text-ink">Enforcement</h2>
            <p>In the UK, the Equality and Human Rights Commission (EHRC) is responsible for enforcing the Public Sector Bodies (Websites and Mobile Applications) Accessibility Regulations 2018. We are a private organisation but hold ourselves to the same standard.</p>
          </div>
        </div>
      </section>
      <CTA heading="Questions about accessibility?" sub="Email us — we take reports seriously and reply personally." />
    </PageLayout>
  );
}
