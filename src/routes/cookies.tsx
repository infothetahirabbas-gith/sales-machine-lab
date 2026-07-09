import { createFileRoute } from "@tanstack/react-router";
import PageLayout from "../components/site/PageLayout";
import { Section } from "../components/site/Section";
import { breadcrumbJsonLd } from "../lib/seo";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — BeingEcom UK" },
      { name: "description", content: "Cookies we use on beingecom.com and how to manage them." },
      { property: "og:title", content: "Cookie Policy — BeingEcom UK" },
      { property: "og:description", content: "Cookies we use on beingecom.com and how to manage them." },
      { property: "og:url", content: "https://beingecom.com/cookies" },
    ],
    links: [{ rel: "canonical", href: "https://beingecom.com/cookies" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Cookies", path: "/cookies" }])) },
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
        <div className="prose prose-slate max-w-3xl">
          <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}</p>
          <h2>What we use</h2>
          <ul>
            <li><strong>Strictly necessary:</strong> session, security, load balancing. Always on.</li>
            <li><strong>Analytics (optional):</strong> Google Analytics 4 with IP anonymisation — set only after you accept.</li>
          </ul>
          <p>We do not use advertising or cross-site tracking cookies on this website.</p>
          <h2>Managing your consent</h2>
          <p>You’ll be asked on your first visit. You can change your choice at any time:</p>
          <button onClick={reset} className="rounded-full bg-primary text-primary-foreground px-5 py-2 font-semibold text-sm">Reset cookie preferences</button>
        </div>
      </Section>
    </PageLayout>
  );
}
