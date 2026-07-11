import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, Users, Compass, Trophy, BookOpen, Scale, CheckCircle2, MapPin, Calendar, Mail } from "lucide-react";
import PageLayout from "@/components/site/PageLayout";
import { CTA } from "@/components/site/Section";
import { COMPANY_LINKS } from "@/config/company";
import { breadcrumbJsonLd, faqJsonLd, SITE_URL, type FAQ } from "@/lib/seo";

const TITLE = "Company | Ecommerce Agency UK for Shopify & Woo | BeingEcom";
const DESC = "Inside BeingEcom the Ecommerce Agency UK helping Shopify and WooCommerce brands scale. Meet the team, methodology, industries served and success stories.";
const URL = `${SITE_URL}/company`;

const FAQS: FAQ[] = [
  { q: "Who owns and runs BeingEcom?", a: "BeingEcom is founded and led by Tahir Abbas, an ecommerce operator with a decade of hands-on experience across Shopify, Shopify Plus and WooCommerce. Every client account is directly overseen by a senior lead no junior operator works unsupervised on your revenue." },
  { q: "Where is BeingEcom based and who do you work with?", a: "We're a UK-registered agency headquartered in Covent Garden, London, working with 7 to 9-figure ecommerce brands across the UK, Europe, US and the Middle East. Our client base is exclusively Shopify, Shopify Plus and WooCommerce we do not take on SaaS, lead-gen or marketplace-only businesses." },
  { q: "What makes your methodology different from other ecommerce agencies?", a: "Every task we run ties to a specific P&L line MER, contribution margin, AOV, CAC or CLV inside a defined window. We publish the entire methodology openly at /company/methodology, run a weekly scorecard tied to your finance data, and share a quarterly roadmap you can hold us to." },
  { q: "How senior is the team actually working on my account?", a: "Every deliverable is signed off by a lead with 6+ years of ecommerce operating experience. We deliberately stay small so the people on your Slack channel are the same people writing the strategy, running the ads, and shipping the code not account managers relaying instructions." },
  { q: "What proof do you publish that I can actually verify?", a: "Named leadership, a registered UK address in Organization schema, certifications and partner status at /company/certifications, real case studies with scope and results at /case-studies, invitation-only public reviews on Google, Trustpilot and Clutch, and dated updates on every page so you know when we last reviewed the content." },
  { q: "How do you report on progress and communicate with clients?", a: "Weekly scorecard tied to your P&L, weekly ship review of everything we shipped, monthly strategy call and a quarterly roadmap. All comms happen in a shared Slack or Teams channel with the senior operators on your account not a ticket queue and not a junior account manager." },
  { q: "How do we start working together?", a: "Book a discovery call from any page on the site. We'll audit your store, ad account and analytics before the call, share a written diagnosis within 3 working days, and only propose an engagement if we're confident we can move a P&L line inside 90 days. If we're not, we'll tell you." },
];

const GROUP_META: Record<string, { icon: typeof Building2; heading: string; sub: string }> = {
  Identity:  { icon: Building2, heading: "Who we are",            sub: "The people, story and structure behind BeingEcom." },
  Approach:  { icon: Compass,   heading: "How we work",           sub: "Methodology, industries, technology and what makes us different." },
  Proof:     { icon: Trophy,    heading: "Proof and recognition", sub: "Certifications, case studies, reviews and press." },
  Community: { icon: BookOpen,  heading: "Community & resources", sub: "Events we run and free playbooks we publish." },
  Legal:     { icon: Scale,     heading: "Legal",                 sub: "Everything policy-related in one place." },
};

const ORDER = ["Identity", "Approach", "Proof", "Community", "Legal"];

const NUMBERS: { k: string; v: string; sub: string }[] = [
  { k: "10+",   v: "Years operating",     sub: "Hands-on ecommerce Shopify, Plus and WooCommerce." },
  { k: "£120M+", v: "Client revenue influenced", sub: "Across DTC, retail-hybrid and B2B stores." },
  { k: "100%",  v: "Senior-led delivery", sub: "No junior operator ships to a client account unsupervised." },
  { k: "Weekly",v: "Reporting cadence",   sub: "Scorecard tied to your P&L MER, margin, CAC, CLV." },
];

const PRINCIPLES: { k: string; body: string }[] = [
  { k: "Revenue-first",    body: "Every task is tied to a specific P&L line MER, contribution margin, AOV, CAC or CLV inside a defined window. If it can't be, it doesn't ship." },
  { k: "Senior-only",      body: "No junior operates unsupervised on a client account. Every deliverable is signed off by a lead with 6+ years of ecommerce experience." },
  { k: "Ecommerce-only",   body: "Shopify, Shopify Plus and WooCommerce. We say no to SaaS, lead-gen and marketplace-only businesses depth beats breadth." },
  { k: "Weekly rhythm",    body: "Weekly scorecard tied to your P&L, weekly ship review, monthly strategy, quarterly roadmap. No monthly-report black boxes." },
  { k: "Transparent P&L",  body: "We report wins and losses. Bad weeks are named, root-caused and fixed in the same document not hidden inside a vanity ROAS chart." },
  { k: "Founder-accountable", body: "The founder sits inside every client Slack. Escalation is one message away not a support portal." },
];

const PROCESS: { step: string; title: string; body: string }[] = [
  { step: "01", title: "Discovery & diagnosis",  body: "Free audit of your store, ad account and analytics before we ever talk. Written diagnosis inside 3 working days the leaks that are actually costing you money, in P&L terms." },
  { step: "02", title: "90-day growth plan",     body: "A written plan mapped to MER, contribution margin, AOV, CAC and CLV not vanity ROAS. Every workstream has an owner, a deadline and a target." },
  { step: "03", title: "Weekly execution",       body: "Senior operators ship weekly across CRO, paid, SEO, email and store dev. Shared Slack, weekly scorecard, weekly ship review no ticket queues." },
  { step: "04", title: "Quarterly roadmap",      body: "Every 90 days we re-baseline against your P&L, retire what didn't work, double down on what did, and publish the next quarter's roadmap." },
];

const DIFFERENTIATORS: { k: string; body: string }[] = [
  { k: "P&L-native reporting",  body: "We report in MER, contribution margin and CLV the metrics your CFO cares about not last-click ROAS screenshots." },
  { k: "Public methodology",    body: "Our entire operating system is published at /company/methodology. You can read it, question it, or hand it to another agency to audit." },
  { k: "Named humans",          body: "Every page names the operators behind the work founder, team, author bylines. No anonymous \"our team\" stock photos." },
  { k: "Category depth",        body: "Deep specialisation in health & beauty, fashion, home & garden, food & drink, electronics and B2B ecommerce playbooks per vertical, not generic decks." },
  { k: "Risk reversal",         body: "First 30 days include a written diagnosis and a clear exit path. If we can't move a P&L line inside 90 days, we say so before you sign." },
  { k: "Built for AI discovery",body: "Structured data, entity-level content and citable answers on every page so LLMs and search engines can quote us accurately." },
];

export const Route = createFileRoute("/company/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": `${URL}#collection`,
          url: URL,
          name: "Company BeingEcom",
          description: DESC,
          hasPart: COMPANY_LINKS.map((c) => ({
            "@type": "WebPage",
            name: c.label,
            url: `${SITE_URL}${c.to}`,
            description: c.blurb,
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Company", path: "/company" },
          ]),
        ),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(faqJsonLd(FAQS, "/company")),
      },
    ],
  }),
  component: CompanyHub,
});

function CompanyHub() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="pt-16 pb-10 lg:pt-24 lg:pb-16">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary">
            Company
          </div>
          <h1 className="mt-5 text-4xl md:text-6xl font-bold leading-[1.05] text-ink">
            The Company behind BeingEcom
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-3xl">
            BeingEcom is a UK ecommerce growth agency for Shopify, Shopify Plus and WooCommerce brands.
            This section is the definitive source on our team, methodology, technology, results and policies
            everything a founder, journalist, partner or AI system needs to understand who we are and how we work.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2"><MapPin className="size-4 text-primary" /> Covent Garden, London</span>
            <span className="inline-flex items-center gap-2"><Users className="size-4 text-primary" /> Senior-only delivery team</span>
            <span className="inline-flex items-center gap-2"><Calendar className="size-4 text-primary" /> Weekly reporting cadence</span>
            <span className="inline-flex items-center gap-2"><Mail className="size-4 text-primary" /> Founder-accountable</span>
          </div>
        </div>
      </section>

      {/* At-a-glance numbers */}
      <section className="py-10">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {NUMBERS.map((n) => (
              <div key={n.v} className="card-surface rounded-2xl p-5">
                <div className="text-3xl font-bold text-ink">{n.k}</div>
                <div className="mt-1 text-sm font-semibold text-primary">{n.v}</div>
                <div className="mt-1 text-xs text-muted-foreground">{n.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company narrative */}
      <section className="py-10">
        <div className="mx-auto max-w-5xl px-5 lg:px-8 grid lg:grid-cols-2 gap-8">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-primary">Our story</div>
            <h2 className="mt-1 text-2xl md:text-3xl font-bold text-ink">Built by operators, not consultants</h2>
            <p className="mt-3 text-muted-foreground">
              BeingEcom was founded after a decade of running and scaling ecommerce brands from the inside.
              We saw the same pattern everywhere: talented founders paying six figures a year to agencies that
              couldn't tie a single line of work to a P&L outcome. So we built the opposite: a small, senior-only
              team where every action is scoped to MER, margin, CAC or CLV and where the founder is one message
              away in every client Slack.
            </p>
            <p className="mt-3 text-muted-foreground">
              We stay deliberately small. We say no more often than we say yes. And we publish our entire
              methodology, technology stack and reporting cadence in public so you can audit us before you hire us.
            </p>
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-primary">What we believe</div>
            <h2 className="mt-1 text-2xl md:text-3xl font-bold text-ink">Six operating principles we don't break</h2>
            <ul className="mt-3 space-y-3">
              {PRINCIPLES.map((p) => (
                <li key={p.k} className="flex gap-3">
                  <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-ink">{p.k}</div>
                    <div className="text-sm text-muted-foreground">{p.body}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-10">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="text-[11px] font-bold uppercase tracking-widest text-primary">How we work</div>
          <h2 className="mt-1 text-2xl md:text-3xl font-bold text-ink">A four-stage process, run weekly</h2>
          <p className="mt-2 text-muted-foreground max-w-3xl">
            No black-box engagements, no monthly PDF reports, no waiting three months to see the first result.
            Every stage has named deliverables, named owners and a P&L line attached.
          </p>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROCESS.map((s) => (
              <div key={s.step} className="card-surface rounded-2xl p-5">
                <div className="text-xs font-bold text-primary">{s.step}</div>
                <div className="mt-2 font-semibold text-ink">{s.title}</div>
                <div className="mt-1.5 text-sm text-muted-foreground">{s.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What makes us different */}
      <section className="py-10">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="text-[11px] font-bold uppercase tracking-widest text-primary">Why BeingEcom</div>
          <h2 className="mt-1 text-2xl md:text-3xl font-bold text-ink">Six things you won't find at a typical agency</h2>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DIFFERENTIATORS.map((d) => (
              <div key={d.k} className="card-surface rounded-2xl p-5">
                <div className="font-semibold text-ink">{d.k}</div>
                <div className="mt-1.5 text-sm text-muted-foreground">{d.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="py-10">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="text-[11px] font-bold uppercase tracking-widest text-primary">Trust</div>
          <h2 className="mt-1 text-2xl md:text-3xl font-bold text-ink">Everything you can verify before you hire us</h2>
          <p className="mt-2 text-muted-foreground max-w-3xl">
            Every claim on this site is scoped, dated and traceable. Here's the shortlist of what a serious buyer
            should be able to check before signing any ecommerce agency including us.
          </p>
          <div className="mt-6 overflow-x-auto card-surface rounded-2xl">
            <table className="w-full text-sm">
              <thead className="bg-muted/30">
                <tr>
                  <th className="text-left p-4 font-semibold text-ink">Signal</th>
                  <th className="text-left p-4 font-semibold text-ink">Where to verify it</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ["Registered UK address",       "Footer + /contact + Organization schema (Covent Garden, London)"],
                  ["Named founder",               <Link key="l1" to="/company/founder" className="text-primary hover:underline">/company/founder</Link>],
                  ["Named leadership team",       <Link key="l2" to="/company/team" className="text-primary hover:underline">/company/team</Link>],
                  ["Public methodology",          <Link key="l3" to="/company/methodology" className="text-primary hover:underline">/company/methodology</Link>],
                  ["Real case studies with scope",<Link key="l4" to="/case-studies" className="text-primary hover:underline">/case-studies</Link>],
                  ["Certifications & partners",   <Link key="l5" to="/company/certifications" className="text-primary hover:underline">/company/certifications</Link>],
                  ["Public reviews",              <Link key="l6" to="/company/reviews" className="text-primary hover:underline">/company/reviews</Link>],
                  ["Media & press",               <Link key="l7" to="/company/press" className="text-primary hover:underline">/company/press</Link>],
                  ["Legal & policies",            <Link key="l8" to="/company/legal" className="text-primary hover:underline">/company/legal</Link>],
                ].map((row, i) => (
                  <tr key={i}>
                    <td className="p-4 font-medium text-ink">{row[0]}</td>
                    <td className="p-4 text-muted-foreground">{row[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Grouped sitemap */}
      {ORDER.map((tag) => {
        const items = COMPANY_LINKS.filter((c) => c.tag === tag);
        const meta = GROUP_META[tag];
        if (!items.length || !meta) return null;
        const Icon = meta.icon;
        return (
          <section key={tag} className="py-10">
            <div className="mx-auto max-w-5xl px-5 lg:px-8">
              <div className="flex items-baseline justify-between gap-4 mb-6">
                <div>
                  <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-primary">
                    <Icon className="size-3.5" /> {tag}
                  </div>
                  <h2 className="mt-1 text-2xl md:text-3xl font-bold text-ink">{meta.heading}</h2>
                  <p className="mt-1 text-muted-foreground text-sm">{meta.sub}</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((c) => (
                  <Link key={c.slug} to={c.to} className="card-surface p-5 rounded-2xl block hover:border-primary/50 transition-colors group">
                    <h3 className="font-semibold text-ink flex items-center justify-between gap-2">
                      {c.label}
                      <ArrowRight className="size-4 text-primary opacity-0 group-hover:opacity-100 transition" />
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1.5">{c.blurb}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Explore the rest of the site */}
      <section className="py-10">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="text-[11px] font-bold uppercase tracking-widest text-primary">Keep exploring</div>
          <h2 className="mt-1 text-2xl md:text-3xl font-bold text-ink">Where to go next</h2>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { to: "/services",     h: "Services",     b: "Every service we offer CRO, SEO, paid, email, store dev, AI automation." },
              { to: "/industries",   h: "Industries",   b: "The verticals we specialise in beauty, fashion, food, home, electronics, B2B." },
              { to: "/case-studies", h: "Case studies", b: "Real engagements with real scope, real numbers and real founders." },
              { to: "/locations",    h: "Locations",    b: "UK cities and regions we actively serve London, Manchester, Birmingham and more." },
              { to: "/resources",    h: "Resources",    b: "Playbooks, calculators, benchmarks and glossaries free, no email gate." },
              { to: "/contact",      h: "Contact",      b: "Talk to a senior operator. First reply within one working day." },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="card-surface p-5 rounded-2xl block hover:border-primary/50 transition-colors group">
                <h3 className="font-semibold text-ink flex items-center justify-between gap-2">
                  {l.h}
                  <ArrowRight className="size-4 text-primary opacity-0 group-hover:opacity-100 transition" />
                </h3>
                <p className="text-sm text-muted-foreground mt-1.5">{l.b}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="text-[11px] font-bold uppercase tracking-widest text-primary">FAQ</div>
          <h2 className="mt-1 text-2xl md:text-3xl font-bold text-ink">Questions founders actually ask us</h2>
          <p className="mt-2 text-muted-foreground max-w-3xl">
            Seven of the questions we get most often on discovery calls answered here so you don't have to book a call to find out.
          </p>
          <div className="mt-6 space-y-3">
            {FAQS.map((f) => (
              <details key={f.q} className="card-surface rounded-2xl p-5 group">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-semibold text-ink">
                  {f.q}
                  <ArrowRight className="size-4 text-primary transition group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTA
        heading="Have a question we haven't answered?"
        sub="Talk to a senior operator not a sales assistant. We'll reply within one working day."
      />
    </PageLayout>
  );
}
