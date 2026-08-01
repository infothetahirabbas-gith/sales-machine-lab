import { createFileRoute } from "@tanstack/react-router";
import PageLayout from "../components/site/PageLayout";
import { Section, CTA } from "../components/site/Section";
import EditorialBlock from "../components/site/EditorialBlock";
import FaqSection from "../components/site/FaqSection";
import { breadcrumbJsonLd, faqJsonLd, SITE_URL, ORG_INFO } from "../lib/seo";
import { COOKIES_EDITORIAL, COOKIES_FAQS } from "../lib/index-editorial";

const URL = `${SITE_URL}/cookies`;

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Policy | How BeingEcom Uses Cookies (UK)" },
      {
        name: "description",
        content:
          "BeingEcom's cookie policy: the essential and optional analytics cookies we use on beingecom.com, our UK GDPR and PECR basis, and how to change consent.",
      },
      { name: "robots", content: "index, follow, max-snippet:-1" },
      { property: "og:title", content: "Cookie Policy | How BeingEcom Uses Cookies (UK)" },
      {
        property: "og:description",
        content:
          "The cookies we use on beingecom.com, why we use them, how long they last and how to withdraw consent at any time.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Cookie Policy", path: "/cookies" },
          ]),
        ),
      },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(COOKIES_FAQS, "/cookies")) },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${URL}#webpage`,
          name: "Cookie Policy",
          url: URL,
          description:
            "How BeingEcom uses cookies and similar technologies on beingecom.com, under UK GDPR and PECR.",
          inLanguage: "en-GB",
          isPartOf: { "@type": "WebSite", name: ORG_INFO.name, url: SITE_URL },
          publisher: { "@type": "Organization", name: ORG_INFO.name, url: ORG_INFO.url },
        }),
      },
    ],
  }),
  component: Cookies,
});

function Cookies() {
  const reset = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("cookie-consent");
      window.location.reload();
    }
  };

  return (
    <PageLayout>
      <Section eyebrow="Legal" title="Cookie Policy">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold text-ink">
            Cookie policy for beingecom.com
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Last reviewed:{" "}
            {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}
          </p>
          <p className="mt-5 text-[15px] md:text-base leading-relaxed text-muted-foreground">
            This page explains exactly which cookies BeingEcom sets on this website, why each one exists, how long it
            lasts and how you can change your mind at any time. It is written to be read by a person rather than a
            lawyer, and it reflects what our site actually does - not a generic template.
          </p>
          <div className="mt-6">
            <button
              onClick={reset}
              className="rounded-full bg-primary text-primary-foreground px-5 py-2.5 font-semibold text-sm"
            >
              Reset cookie preferences
            </button>
          </div>
        </div>
      </Section>

      <EditorialBlock editorial={COOKIES_EDITORIAL} />

      <FaqSection
        faqs={COOKIES_FAQS}
        title="Cookie policy"
        highlight="FAQs"
        intro="Straight answers on consent, tracking, retention and your rights under UK law."
      />

      <CTA
        heading="Consent banner wrecking your analytics?"
        sub="We rebuild tracking so it stays compliant and still gives your team usable numbers. Book a free audit."
      />
    </PageLayout>
  );
}
