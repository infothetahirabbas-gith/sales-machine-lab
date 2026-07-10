import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import PageLayout from "@/components/site/PageLayout";
import { breadcrumbJsonLd, faqJsonLd, SITE_URL } from "@/lib/seo";
import { getComparison } from "@/lib/compare-content";
import { ArrowRight, CheckCircle2, XCircle, Trophy } from "lucide-react";

export const Route = createFileRoute("/compare/$slug")({
  loader: ({ params }) => {
    const entry = getComparison(params.slug);
    if (!entry) throw notFound();
    return { entry };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Comparison not found | BeingEcom" }, { name: "robots", content: "noindex" }] };
    }
    const { entry } = loaderData;
    const url = `${SITE_URL}/compare/${entry.slug}`;
    return {
      meta: [
        { title: entry.meta.title },
        { name: "description", content: entry.meta.description },
        { property: "og:title", content: entry.meta.title },
        { property: "og:description", content: entry.meta.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Comparisons", path: "/compare" },
              { name: `${entry.a} vs ${entry.b}`, path: `/compare/${entry.slug}` },
            ])
          ),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(faqJsonLd(entry.faqs, `/compare/${entry.slug}`)),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "@id": `${url}#article`,
            headline: entry.h1,
            description: entry.verdict,
            about: `${entry.a} vs ${entry.b}`,
            author: { "@type": "Organization", name: "BeingEcom", url: SITE_URL },
            publisher: {
              "@type": "Organization",
              name: "BeingEcom",
              logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.png` },
            },
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            datePublished: "2026-01-15",
            dateModified: new Date().toISOString().slice(0, 10),
          }),
        },
      ],
    };
  },
  notFoundComponent: NotFound,
  component: ComparePage,
});

function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-32 text-center">
      <h1 className="font-display text-4xl font-bold">Comparison not found</h1>
      <p className="mt-4 text-muted-foreground">
        Head back to <Link to="/compare" className="text-primary underline">all comparisons</Link>.
      </p>
    </div>
  );
}

function ComparePage() {
  const { entry } = Route.useLoaderData();
  return (
    <PageLayout>
      <section className="bg-background text-foreground">
        <div className="mx-auto max-w-4xl px-5 lg:px-8 pt-24 pb-10 lg:pt-32">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">{entry.eyebrow}</div>
          <h1 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            {entry.h1}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-foreground/85 leading-relaxed">{entry.verdict}</p>
        </div>
      </section>

      {/* Best-for cards */}
      <section className="mx-auto max-w-4xl px-5 lg:px-8 py-10">
        <div className="grid md:grid-cols-2 gap-5">
          {(["a", "b"] as const).map((side) => (
            <div key={side} className="rounded-2xl border bg-card p-6">
              <div className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
                {side === "a" ? entry.a : entry.b} · best for
              </div>
              <p className="text-foreground/85 leading-relaxed">
                {side === "a" ? entry.bestFor.a : entry.bestFor.b}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section className="mx-auto max-w-4xl px-5 lg:px-8 py-10">
        <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-tight mb-6">
          Side-by-side
        </h2>
        <div className="overflow-x-auto rounded-2xl border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="text-left px-5 py-3 font-semibold">Criterion</th>
                <th className="text-left px-5 py-3 font-semibold">{entry.a}</th>
                <th className="text-left px-5 py-3 font-semibold">{entry.b}</th>
              </tr>
            </thead>
            <tbody>
              {entry.rows.map((r) => (
                <tr key={r.criterion} className="border-t">
                  <td className="px-5 py-3 font-medium text-foreground">{r.criterion}</td>
                  <td className={`px-5 py-3 ${r.winner === "a" ? "text-primary font-semibold" : "text-foreground/80"}`}>
                    <span className="inline-flex items-center gap-1.5">
                      {r.winner === "a" && <Trophy className="w-3.5 h-3.5" />}
                      {r.a}
                    </span>
                  </td>
                  <td className={`px-5 py-3 ${r.winner === "b" ? "text-primary font-semibold" : "text-foreground/80"}`}>
                    <span className="inline-flex items-center gap-1.5">
                      {r.winner === "b" && <Trophy className="w-3.5 h-3.5" />}
                      {r.b}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Pros / Cons */}
      <section className="mx-auto max-w-4xl px-5 lg:px-8 py-10 grid md:grid-cols-2 gap-6">
        {(["a", "b"] as const).map((side) => (
          <div key={side} className="rounded-2xl border bg-card p-6">
            <div className="font-display text-2xl font-bold mb-4">
              {side === "a" ? entry.a : entry.b}
            </div>
            <div className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Pros</div>
            <ul className="space-y-2 mb-5">
              {(side === "a" ? entry.pros.a : entry.pros.b).map((p) => (
                <li key={p} className="flex gap-2 text-foreground/85 text-[15px]">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 text-primary flex-none" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Cons</div>
            <ul className="space-y-2">
              {(side === "a" ? entry.cons.a : entry.cons.b).map((p) => (
                <li key={p} className="flex gap-2 text-foreground/75 text-[15px]">
                  <XCircle className="w-4 h-4 mt-0.5 text-muted-foreground flex-none" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* When to choose */}
      <section className="border-t bg-muted/20">
        <div className="mx-auto max-w-4xl px-5 lg:px-8 py-14 grid md:grid-cols-2 gap-6">
          {(["a", "b"] as const).map((side) => (
            <div key={side}>
              <div className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
                Choose {side === "a" ? entry.a : entry.b} when
              </div>
              <p className="text-foreground/85 leading-relaxed">
                {side === "a" ? entry.when.a : entry.when.b}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom line */}
      <section className="mx-auto max-w-3xl px-5 lg:px-8 py-14 lg:py-20">
        <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-tight mb-6">The bottom line</h2>
        <div className="space-y-5 text-[16px] leading-relaxed text-foreground/85">{entry.bottomLine}</div>
      </section>

      {/* FAQ */}
      <section className="border-t">
        <div className="mx-auto max-w-3xl px-5 lg:px-8 py-14 lg:py-20">
          <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-tight mb-8">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {entry.faqs.map((f) => (
              <details key={f.q} className="rounded-2xl border bg-card p-5">
                <summary className="font-semibold cursor-pointer text-foreground">{f.q}</summary>
                <p className="mt-3 text-foreground/80 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related services */}
      <section className="border-t bg-muted/20">
        <div className="mx-auto max-w-4xl px-5 lg:px-8 py-12">
          <div className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Related services</div>
          <div className="flex flex-wrap gap-3">
            {entry.relatedServices.map((r) => (
              <Link
                key={r.to}
                to={r.to}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                <CheckCircle2 className="w-4 h-4 text-primary" /> {r.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
