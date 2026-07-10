import { type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Clock, Calendar, User, ArrowRight } from "lucide-react";
import PageLayout from "./PageLayout";
import { Section, Card, CTA } from "./Section";
import FaqSection from "./FaqSection";
import { breadcrumbJsonLd, faqJsonLd, organizationJsonLd, SITE_URL, ORG_ID, ORG_INFO, ORG_KNOWS_ABOUT, TEAM, type FAQ } from "@/lib/seo";
import { COMPANY_LINKS } from "@/config/company";

export type CompanySectionBlock =
  | { type: "paragraph"; id?: string; heading?: string; body: ReactNode }
  | { type: "list"; id?: string; heading?: string; intro?: ReactNode; items: string[] }
  | { type: "cards"; id?: string; heading?: string; intro?: ReactNode; items: { title: string; body: string; to?: string }[] }
  | { type: "table"; id?: string; heading?: string; intro?: ReactNode; columns: string[]; rows: string[][] }
  | { type: "custom"; id?: string; heading?: string; render: () => ReactNode };

export type CompanyPageProps = {
  /** slug from COMPANY_LINKS (used for canonical + breadcrumbs + related strip filter) */
  slug: string;
  /** H1 shown in the hero */
  h1: string;
  /** Small tag rendered above the H1 */
  eyebrow?: string;
  /** Intro paragraph under the H1 */
  intro: ReactNode;
  /** e.g. "10 min read" */
  readingTime?: string;
  /** ISO date - "2025-11-01" */
  lastUpdated?: string;
  /** Author byline */
  author?: string;
  /** Long-form body */
  sections: CompanySectionBlock[];
  /** 5-8 FAQs; also emitted as FAQPage JSON-LD */
  faqs: FAQ[];
  /** Extra schema.org objects for this specific page (Person, Article, ItemList, etc.) */
  extraJsonLd?: object[];
};

export default function CompanyPage(props: CompanyPageProps) {
  const {
    slug,
    h1,
    eyebrow = "Company",
    intro,
    readingTime = "8 min read",
    lastUpdated,
    author = "BeingEcom Editorial",
    sections,
    faqs,
    extraJsonLd = [],
  } = props;

  const link = COMPANY_LINKS.find((c) => c.slug === slug);
  const path = link?.to ?? `/company/${slug}`;
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;
  const canonical = `${SITE_URL}${canonicalPath}`;
  const displayLastUpdated = lastUpdated ?? new Date().toISOString().slice(0, 10);
  const related = COMPANY_LINKS.filter((c) => c.slug !== slug && !c.external).slice(0, 6);

  return (
    <PageLayout>
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="pt-6 pb-2">
        <ol className="mx-auto max-w-5xl px-5 lg:px-8 flex items-center gap-1.5 text-xs text-muted-foreground">
          <li><Link to="/" className="hover:text-foreground">Home</Link></li>
          <li><ChevronRight className="size-3" /></li>
          <li><Link to="/company" className="hover:text-foreground">Company</Link></li>
          <li><ChevronRight className="size-3" /></li>
          <li aria-current="page" className="text-foreground font-medium">{link?.short ?? h1}</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="pt-4 pb-10 lg:pt-8 lg:pb-16">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary">
            {eyebrow}
          </div>
          <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] text-ink">{h1}</h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-3xl">{intro}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><User className="size-3.5" /> {author}</span>
            <span className="inline-flex items-center gap-1.5"><Calendar className="size-3.5" /> Updated {displayLastUpdated}</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="size-3.5" /> {readingTime}</span>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="pb-8">
        <div className="mx-auto max-w-5xl px-5 lg:px-8 grid lg:grid-cols-[220px_1fr] gap-10">
          {/* Sticky TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">On this page</div>
              <ul className="space-y-2 text-sm">
                {sections.filter((s) => s.heading).map((s, i) => {
                  const id = s.id ?? `s-${i}`;
                  return (
                    <li key={id}>
                      <a href={`#${id}`} className="text-muted-foreground hover:text-foreground transition-colors">{s.heading}</a>
                    </li>
                  );
                })}
                <li><a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">FAQs</a></li>
              </ul>
            </div>
          </aside>

          <article className="min-w-0 max-w-none space-y-14">
            {sections.map((s, i) => {
              const id = s.id ?? `s-${i}`;
              if (s.type === "paragraph") {
                return (
                  <div key={id} id={id}>
                    {s.heading && <h2 className="text-2xl md:text-3xl font-bold text-ink mb-4">{s.heading}</h2>}
                    <div className="prose-body text-muted-foreground leading-relaxed space-y-4 text-base">{s.body}</div>
                  </div>
                );
              }
              if (s.type === "list") {
                return (
                  <div key={id} id={id}>
                    {s.heading && <h2 className="text-2xl md:text-3xl font-bold text-ink mb-4">{s.heading}</h2>}
                    {s.intro && <p className="text-muted-foreground mb-5">{s.intro}</p>}
                    <ul className="grid gap-3">
                      {s.items.map((it, k) => (
                        <li key={k} className="flex gap-3 items-start">
                          <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-primary" />
                          <span className="text-foreground/90">{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }
              if (s.type === "cards") {
                return (
                  <div key={id} id={id}>
                    {s.heading && <h2 className="text-2xl md:text-3xl font-bold text-ink mb-4">{s.heading}</h2>}
                    {s.intro && <p className="text-muted-foreground mb-6">{s.intro}</p>}
                    <div className="grid sm:grid-cols-2 gap-4">
                      {s.items.map((it, k) => {
                        const inner = (
                          <>
                            <h3 className="font-semibold text-ink">{it.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{it.body}</p>
                            {it.to && (
                              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                                Explore <ArrowRight className="size-3" />
                              </span>
                            )}
                          </>
                        );
                        return it.to ? (
                          <Link key={k} to={it.to} className="card-surface p-5 rounded-2xl block hover:border-primary/50 transition-colors">{inner}</Link>
                        ) : (
                          <Card key={k} className="rounded-2xl">{inner}</Card>
                        );
                      })}
                    </div>
                  </div>
                );
              }
              if (s.type === "table") {
                return (
                  <div key={id} id={id}>
                    {s.heading && <h2 className="text-2xl md:text-3xl font-bold text-ink mb-4">{s.heading}</h2>}
                    {s.intro && <p className="text-muted-foreground mb-5">{s.intro}</p>}
                    <div className="overflow-x-auto rounded-2xl border border-border">
                      <table className="w-full text-sm">
                        <thead className="bg-secondary/50 text-left">
                          <tr>
                            {s.columns.map((c) => (
                              <th key={c} className="px-4 py-3 font-semibold text-ink whitespace-nowrap">{c}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {s.rows.map((r, ri) => (
                            <tr key={ri} className="border-t border-border">
                              {r.map((cell, ci) => (
                                <td key={ci} className="px-4 py-3 text-muted-foreground align-top">{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              }
              // custom
              return (
                <div key={id} id={id}>
                  {s.heading && <h2 className="text-2xl md:text-3xl font-bold text-ink mb-4">{s.heading}</h2>}
                  {s.render()}
                </div>
              );
            })}
          </article>
        </div>
      </section>

      {/* FAQ */}
      <div id="faq">
        <FaqSection faqs={faqs} title={`Questions about ${link?.short ?? "BeingEcom"}`} highlight="answered" />
      </div>

      {/* Related Company pages */}
      <Section eyebrow="More from Company" title="Continue exploring" alt>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {related.map((r) => (
            <Link key={r.slug} to={r.to} className="card-surface p-5 rounded-2xl block hover:border-primary/50 transition-colors">
              <div className="text-[10px] font-bold uppercase tracking-widest text-primary">{r.tag}</div>
              <h3 className="mt-2 font-semibold text-ink">{r.label}</h3>
              <p className="text-xs text-muted-foreground mt-1.5">{r.blurb}</p>
            </Link>
          ))}
        </div>
      </Section>

      <CTA />

      {/* Head-level JSON-LD is emitted from each route's head(); we also
          inline the same page-scoped schemas here as a belt-and-braces so
          the schemas ship even if a route forgets to wire them into head. */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${canonical}#webpage`,
            url: canonical,
            name: h1,
            description: typeof intro === "string" ? intro : undefined,
            isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}#website` },
            dateModified: displayLastUpdated,
            breadcrumb: breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Company", path: "/company" },
              { name: link?.short ?? h1, path: canonicalPath },
            ]),
            mainEntity: faqJsonLd(faqs, canonicalPath),
          }),
        }}
      />
      {extraJsonLd.map((obj, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
        />
      ))}
    </PageLayout>
  );
}

/** Helper for route head() - emits a consistent meta+links block for every Company page. */
export function companyHead(opts: {
  slug: string;
  title: string;
  description: string;
  ogType?: "website" | "article" | "profile";
  jsonLd?: object[];
}) {
  const link = COMPANY_LINKS.find((c) => c.slug === opts.slug);
  const path = link?.to ?? `/company/${opts.slug}`;
  const url = `${SITE_URL}${path}`;
  return {
    meta: [
      { title: opts.title },
      { name: "description", content: opts.description },
      { property: "og:title", content: opts.title },
      { property: "og:description", content: opts.description },
      { property: "og:type", content: opts.ogType ?? "website" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: opts.title },
      { name: "twitter:description", content: opts.description },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: (opts.jsonLd ?? []).map((obj) => ({
      type: "application/ld+json",
      children: JSON.stringify(obj),
    })),
  };
}
