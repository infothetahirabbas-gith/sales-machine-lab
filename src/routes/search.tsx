import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import PageLayout from "../components/site/PageLayout";
import { Section, Card } from "../components/site/Section";
import { SITE_INDEX, searchSite, type SiteIndexEntry } from "../lib/site-index";
import { breadcrumbJsonLd, SITE_URL } from "../lib/seo";

type SearchParams = { q?: string };

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    q: typeof search.q === "string" ? search.q.slice(0, 120) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Search BeingEcom - Ecommerce Growth Resources" },
      {
        name: "description",
        content:
          "Search every BeingEcom service, guide, calculator, case study and location page for UK Shopify and WooCommerce growth.",
      },
      { property: "og:title", content: "Search BeingEcom" },
      { property: "og:description", content: "Search every BeingEcom service, guide, calculator and location page." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/search` },
      { name: "twitter:card", content: "summary_large_image" },
      // Search result pages are classic thin/duplicate URLs - keep them out of the index
      // but let crawlers follow the links they surface.
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/search` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Search", path: "/search" },
          ]),
        ),
      },
    ],
  }),
  component: SearchPage,
});

function groupBySection(entries: SiteIndexEntry[]) {
  const groups = new Map<string, SiteIndexEntry[]>();
  for (const entry of entries) {
    const list = groups.get(entry.section) ?? [];
    list.push(entry);
    groups.set(entry.section, list);
  }
  return [...groups.entries()];
}

const POPULAR = [
  "Shopify SEO",
  "Google Ads",
  "CRO",
  "Klaviyo",
  "Pricing",
  "Manchester",
  "ROAS calculator",
];

function SearchPage() {
  const { q } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [value, setValue] = useState(q ?? "");

  const query = q ?? "";
  const results = query ? searchSite(query) : [];
  const grouped = groupBySection(results);

  return (
    <PageLayout>
      <Section
        eyebrow="Search"
        title="Search BeingEcom"
        intro={`Search ${SITE_INDEX.length}+ services, guides, calculators, case studies and location pages.`}
      >
        <h1 className="sr-only">Search BeingEcom</h1>
        <form
          role="search"
          className="flex flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ search: { q: value.trim() || undefined } });
          }}
        >
          <label htmlFor="site-search" className="sr-only">
            Search the site
          </label>
          <input
            id="site-search"
            name="q"
            type="search"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Try 'Shopify SEO', 'CAC calculator' or 'Leeds'"
            className="w-full rounded-md border border-input bg-background px-4 py-3 text-base text-foreground outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Search
          </button>
        </form>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-muted-foreground">Popular:</span>
          {POPULAR.map((term) => (
            <Link
              key={term}
              to="/search"
              search={{ q: term }}
              onClick={() => setValue(term)}
              className="rounded-full border border-border px-3 py-1 text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {term}
            </Link>
          ))}
        </div>

        {query ? (
          <p className="mt-8 text-sm text-muted-foreground" aria-live="polite">
            {results.length} result{results.length === 1 ? "" : "s"} for “{query}”
          </p>
        ) : null}

        {query && results.length === 0 ? (
          <Card className="mt-6">
            <p className="text-sm text-muted-foreground">
              Nothing matched that search. Try a broader term, or start from{" "}
              <Link to="/services" className="font-semibold text-primary">
                our services
              </Link>
              ,{" "}
              <Link to="/blog" className="font-semibold text-primary">
                the blog
              </Link>{" "}
              or{" "}
              <Link to="/contact" className="font-semibold text-primary">
                contact us
              </Link>{" "}
              and we'll point you to the right page.
            </p>
          </Card>
        ) : null}

        <div className="mt-8 space-y-10">
          {grouped.map(([section, entries]) => (
            <div key={section}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                {section}
              </h2>
              <ul className="mt-4 grid gap-4 md:grid-cols-2">
                {entries.map((entry) => (
                  <li key={entry.to}>
                    <Link to={entry.to} className="group block h-full">
                      <Card className="h-full">
                        <h3 className="text-lg font-bold text-ink transition group-hover:text-primary">
                          {entry.title}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground">{entry.description}</p>
                        <span className="mt-3 inline-block text-xs text-muted-foreground">
                          beingecom.com{entry.to}
                        </span>
                      </Card>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </PageLayout>
  );
}
