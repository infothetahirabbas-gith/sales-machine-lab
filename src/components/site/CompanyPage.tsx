import { type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Clock, Calendar, User, ArrowRight } from "lucide-react";
import PageLayout from "./PageLayout";
import { Section, CTA } from "./Section";
import AISummary from "./AISummary";
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
  /** Optional entity-first AI summary. Falls back to a derived sentence when omitted. */
  aiSummary?: ReactNode;
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
    aiSummary,
  } = props;

  const link = COMPANY_LINKS.find((c) => c.slug === slug);
  const path = link?.to ?? `/company/${slug}`;
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;
  const canonical = `${SITE_URL}${canonicalPath}`;
  const displayLastUpdated = lastUpdated ?? new Date().toISOString().slice(0, 10);
  const related = COMPANY_LINKS.filter((c) => c.slug !== slug && !c.external).slice(0, 6);

  // Shared EEAT / AEO / GEO sections auto-appended to every Company page
  // so every page reaches the 15+ section, keyword-rich depth the brief
  // requires without duplicating boilerplate across 14 route files.
  const sharedSections: CompanySectionBlock[] = [
    {
      type: "list",
      id: "aeo",
      heading: "Built to be read in 30 seconds, useful in 5 minutes",
      intro: "Every Company section is written to be scannable in 30 seconds and useful in 5 minutes whether you're a founder skimming or a team lead going deep.",
      items: [
        "Clear headings and sub-headings so you can jump straight to what matters.",
        "A short FAQ at the bottom answering the questions founders actually ask us.",
        "Consistent naming across services, industries and locations no jargon soup.",
        "Every claim is scoped and specific no vague superlatives or unfalsifiable promises.",
        "Updated dates so you know when we last reviewed the content.",
      ],
    },
    {
      type: "list",
      id: "geo",
      heading: "The editorial standard behind every word on this site",
      intro: "A quick note on the editorial standard we hold every Company section to before it ships:",
      items: [
        "Original perspective in every section written by operators, not rewritten from competitors.",
        "Clear relationships between our team, services and case studies so you can trace any claim.",
        "Deep links to related services, industries and case studies so you can go one level deeper.",
        "Same company details (name, address, contact) across the site no mixed messages.",
        "Direct links to our LinkedIn, X and Instagram so you can verify the humans behind it.",
      ],
    },
    {
      type: "cards",
      id: "principles",
      heading: "Operating principles behind everything we do",
      items: [
        { title: "Revenue-first", body: "If a task can't be tied to a specific P&L line within a defined window, it doesn't ship." },
        { title: "Senior-only", body: "No junior operates unsupervised on a client account. Every deliverable is signed off by a lead." },
        { title: "Ecommerce-only", body: "Shopify, Shopify Plus and WooCommerce. We say no to SaaS, lead-gen and marketplaces." },
        { title: "Weekly rhythm", body: "Weekly scorecard tied to your P&L, weekly ship review, monthly strategy, quarterly roadmap." },
      ],
    },
    {
      type: "table",
      id: "trust-signals",
      heading: "Everything you can verify before you hire us",
      intro: "What you should be able to verify before hiring any ecommerce agency including us.",
      columns: ["Signal", "Where to find it on our site"],
      rows: [
        ["Registered UK address", "Footer + /contact + Organization schema (Covent Garden, London)"],
        ["Named leadership team", "/company/founder and /company/team"],
        ["Methodology in the open", "/company/methodology"],
        ["Case studies with real scope", "/case-studies"],
        ["Certifications & partner status", "/company/certifications"],
        ["Public reviews", "/company/reviews"],
        ["Media & press", "/company/press"],
        ["Legal & policies index", "/company/legal"],
      ],
    },
    {
      type: "cards",
      id: "who-we-help",
      heading: "Brands and teams we partner with",
      items: [
        { title: "Ecommerce founders", body: "Owners of £250k–£25M/yr Shopify or WooCommerce brands who need a senior growth partner." },
        { title: "Heads of growth", body: "In-house leads who want a senior strategy layer over their existing executor team." },
        { title: "Marketing directors at DTC groups", body: "Multi-brand groups needing one accountable pod across paid, SEO, CRO and email." },
        { title: "Investor-backed brands", body: "Boards that need auditable reporting against MER, contribution margin and LTV not vanity ROAS." },
      ],
    },
    {
      type: "list",
      id: "how-we-work",
      heading: "How we work with clients",
      intro: "The 90-day engagement everyone starts with same shape whether you buy one service or the full stack.",
      items: [
        "Discovery: 30-minute qualifying call with the founder or a director.",
        "Diagnostic: 7-day deep dive across store, ads, SEO, email, analytics and creative.",
        "Plan: written 90-day plan with weekly milestones tied to P&L lines.",
        "Onboarding: pod assembly, tool access, tracking hardening 5–7 days.",
        "Execution: weekly ship review, weekly scorecard, monthly strategy call.",
        "Review: 90-day retrospective, then continue month-to-month.",
      ],
    },
    {
      type: "cards",
      id: "explore",
      heading: "Explore related work",
      intro: "Everything on this page ties into the wider BeingEcom system.",
      items: [
        { title: "Our services", body: "The full menu of ecommerce growth services SEO, paid, CRO, email, analytics, AI and more.", to: "/services" },
        { title: "Case studies", body: "Hand-picked engagements with real scope and numbers.", to: "/case-studies" },
        { title: "Industries we serve", body: "12 ecommerce verticals we've operated in beauty, fashion, health, home and more.", to: "/company/industries" },
        { title: "Free growth audit", body: "The Being Ecom Brain™ audit a free 90-second store scan across 17 growth phases.", to: "/audit" },
      ],
    },
    {
      type: "paragraph",
      id: "contact-info",
      heading: "Get in touch with BeingEcom",
      body: (
        <>
          <p>Every page in the Company section links back to a real, contactable business. BeingEcom is registered at {ORG_INFO.address.streetAddress}, {ORG_INFO.address.addressLocality} {ORG_INFO.address.postalCode}, {ORG_INFO.address.addressCountry}. Reach us at {ORG_INFO.email} or {ORG_INFO.telephone} on UK business hours (Mon–Fri, 09:00–18:00 GMT/BST).</p>
          <p>For a scoped conversation, book a 30-minute discovery call via the <Link to="/contact" className="text-primary underline">contact page</Link> or run the free <Link to="/audit" className="text-primary underline">Being Ecom Brain™ growth audit</Link> first and bring the report to the call.</p>
        </>
      ),
    },
  ];

  const allSections = [...sections, ...sharedSections];

  // Consolidated Knowledge Graph every Company page emits the same
  // Organization + Person nodes so search engines and LLMs treat the
  // entire site as one entity graph.
  const kgGraph = {
    "@context": "https://schema.org",
    "@graph": [
      organizationJsonLd(),
      ...TEAM.map((m) => ({
        "@type": "Person",
        "@id": m.id,
        name: m.name,
        jobTitle: m.jobTitle,
        worksFor: { "@id": ORG_ID },
        memberOf: { "@id": ORG_ID },
        knowsAbout: m.knowsAbout,
        sameAs: m.sameAs ?? [],
      })),
    ],
  };
  void ORG_KNOWS_ABOUT;

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

      {/* AI SUMMARY — entity-first answer block for AEO / AI search */}
      <AISummary>
        {aiSummary ?? <>BeingEcom is a UK ecommerce marketing agency helping Shopify and WooCommerce brands grow. This page covers <strong>{h1}</strong> — {typeof intro === "string" ? intro : "how we work and what to expect."}</>}
      </AISummary>

      {/* Body */}
      <section className="pb-8">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <article className="min-w-0 max-w-none space-y-16 md:space-y-20">

            {allSections.map((s, i) => {
              const id = s.id ?? `s-${i}`;
              const tint = i % 2 === 1;

              const SectionHead = s.heading ? (
                <header className="mb-6 md:mb-8">
                  <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-primary">Section</span>
                  </div>

                  <h2 className="mt-4 text-2xl md:text-3xl lg:text-4xl font-bold text-ink leading-[1.15] tracking-tight">
                    {s.heading}
                  </h2>
                  {"intro" in s && s.intro && (
                    <p className="mt-3 text-base text-muted-foreground max-w-3xl leading-relaxed">{s.intro}</p>
                  )}
                </header>
              ) : null;

              const wrapClass = tint
                ? "relative scroll-mt-28 rounded-2xl border border-border bg-gradient-to-br from-secondary/45 via-card to-card p-6 md:p-8 shadow-sm"
                : "relative scroll-mt-28 rounded-2xl border border-border/70 bg-background p-6 md:p-8 shadow-sm";

              return (
                <section key={id} id={id} className={wrapClass}>
                  {SectionHead}
                  {s.type === "paragraph" && (
                    <div className="prose-body text-foreground/85 leading-relaxed space-y-4 text-base md:text-[17px]">
                      {s.body}
                    </div>
                  )}
                  {s.type === "list" && (
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {s.items.map((it, k) => (
                        <li key={k} className="flex gap-3 items-start rounded-xl border border-border/70 bg-card/60 p-4 hover:border-primary/40 transition-colors">
                          <span className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-[10px] font-bold text-primary">
                            {String(k + 1).padStart(2, "0")}
                          </span>
                          <span className="text-sm text-foreground/90 leading-relaxed">{it}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {s.type === "cards" && (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {s.items.map((it, k) => {
                        const inner = (
                          <div className="group h-full rounded-2xl border border-border bg-card p-5 hover:border-primary/60 hover:shadow-lg transition-all relative overflow-hidden">
                            <span className="absolute top-0 left-0 h-1 w-12 bg-gradient-to-r from-primary to-primary/40 rounded-br-lg" />
                            <div className="flex items-baseline gap-2">
                              <span className="text-[10px] font-bold text-primary/70 tracking-widest">{String(k + 1).padStart(2, "0")}</span>
                              <h3 className="font-semibold text-ink text-[15px] leading-snug">{it.title}</h3>
                            </div>
                            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{it.body}</p>
                            {it.to && (
                              <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all">
                                Explore <ArrowRight className="size-3" />
                              </span>
                            )}
                          </div>
                        );
                        return it.to ? (
                          <Link key={k} to={it.to} className="block h-full">{inner}</Link>
                        ) : (
                          <div key={k} className="h-full">{inner}</div>
                        );
                      })}
                    </div>
                  )}
                  {s.type === "table" && (
                    <div className="overflow-x-auto rounded-2xl border border-border bg-card">
                      <table className="w-full text-sm">
                        <thead className="bg-gradient-to-r from-primary/10 via-secondary/40 to-transparent text-left">
                          <tr>
                            {s.columns.map((c) => (
                              <th key={c} className="px-4 py-3 font-semibold text-ink whitespace-nowrap text-[13px] uppercase tracking-wider">{c}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {s.rows.map((r, ri) => (
                            <tr key={ri} className="border-t border-border hover:bg-secondary/30 transition-colors">
                              {r.map((cell, ci) => (
                                <td key={ci} className="px-4 py-3 text-foreground/85 align-top">{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  {s.type === "custom" && s.render()}
                </section>
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
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(kgGraph) }}
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
