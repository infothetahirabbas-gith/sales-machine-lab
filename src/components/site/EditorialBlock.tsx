// Long-form editorial renderer used by the index / hub pages
// (/blog, /compare, /cookies, /hub, /industries, /locations).
//
// Each page supplies a unique `IndexEditorial` object from
// src/lib/index-editorial.tsx. This component renders the AEO/GEO
// furniture around it: quick answer, key takeaways, table of contents,
// H2/H3 body, comparison tables and an internal-link block.

import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, ListTree, Quote, Sparkles } from "lucide-react";

export type EditorialBlockNode =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "h3"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "table"; head: string[]; rows: string[][] };

export type EditorialSection = {
  id: string;
  h2: string;
  nodes: EditorialBlockNode[];
};

export type EditorialLink = { label: string; href: string };

export type IndexEditorial = {
  /** Featured-snippet / AI Overview answer, ≤ 60 words. */
  quickAnswer: string;
  /** Voice-search friendly one-liner. */
  voiceAnswer: string;
  keyTakeaways: string[];
  sections: EditorialSection[];
  /** Internal linking strategy rendered as a real link grid. */
  linkGroups: { title: string; links: EditorialLink[] }[];
};

function Nodes({ nodes }: { nodes: EditorialBlockNode[] }) {
  return (
    <>
      {nodes.map((n, i) => {
        switch (n.type) {
          case "p":
            return (
              <p key={i} className="mt-4 text-[15px] md:text-base leading-relaxed text-muted-foreground">
                {n.text}
              </p>
            );
          case "h3":
            return (
              <h3 key={i} className="mt-8 text-xl md:text-2xl font-bold text-ink">
                {n.text}
              </h3>
            );
          case "list":
            return (
              <ul key={i} className="mt-4 space-y-2.5">
                {n.items.map((it, j) => (
                  <li key={j} className="flex gap-2.5 text-[15px] leading-relaxed text-muted-foreground">
                    <CheckCircle2 className="mt-1 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="mt-4 space-y-2.5 list-decimal pl-5 marker:font-bold marker:text-primary">
                {n.items.map((it, j) => (
                  <li key={j} className="pl-1 text-[15px] leading-relaxed text-muted-foreground">
                    {it}
                  </li>
                ))}
              </ol>
            );
          case "quote":
            return (
              <figure
                key={i}
                className="mt-6 rounded-2xl border border-primary/20 bg-primary/[0.04] p-5 md:p-6"
              >
                <Quote className="size-4 text-primary" aria-hidden="true" />
                <blockquote className="mt-2 text-[15px] md:text-base leading-relaxed text-ink">{n.text}</blockquote>
                {n.cite && (
                  <figcaption className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                    {n.cite}
                  </figcaption>
                )}
              </figure>
            );
          case "table":
            return (
              <div key={i} className="mt-6 overflow-x-auto rounded-2xl border border-border">
                <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                  <thead className="bg-secondary/60">
                    <tr>
                      {n.head.map((h, j) => (
                        <th key={j} scope="col" className="px-4 py-3 font-semibold text-ink">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {n.rows.map((r, j) => (
                      <tr key={j} className="border-t border-border align-top">
                        {r.map((c, k) => (
                          <td key={k} className="px-4 py-3 text-muted-foreground">
                            {c}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </>
  );
}

export default function EditorialBlock({ editorial }: { editorial: IndexEditorial }) {
  const { quickAnswer, voiceAnswer, keyTakeaways, sections, linkGroups } = editorial;

  return (
    <div className="mx-auto max-w-4xl px-5 lg:px-8 py-14 lg:py-20">
      {/* Featured snippet / AI Overview answer */}
      <section aria-label="Quick answer" data-ai-answer className="scroll-mt-28" id="quick-answer">
        <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-accent/10 p-5 md:p-6">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
            <Sparkles className="size-3.5" aria-hidden="true" /> Quick answer
          </div>
          <p className="mt-2 text-base md:text-lg leading-relaxed text-ink">{quickAnswer}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            <strong className="text-ink">Asked out loud:</strong> {voiceAnswer}
          </p>
        </div>
      </section>

      {/* Key takeaways */}
      <section aria-label="Key takeaways" className="mt-8">
        <h2 className="text-xl font-bold text-ink">Key takeaways</h2>
        <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
          {keyTakeaways.map((t, i) => (
            <li key={i} className="flex gap-2.5 rounded-xl border border-border bg-card p-3.5 text-sm leading-relaxed text-muted-foreground">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Table of contents */}
      <nav aria-label="Table of contents" className="mt-8 rounded-2xl border border-border bg-secondary/40 p-5">
        <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
          <ListTree className="size-3.5" aria-hidden="true" /> On this page
        </div>
        <ol className="mt-3 grid gap-1.5 sm:grid-cols-2 list-decimal pl-5 marker:text-primary marker:font-semibold">
          {sections.map((s) => (
            <li key={s.id} className="pl-1">
              <a href={`#${s.id}`} className="text-sm text-muted-foreground hover:text-primary">
                {s.h2}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* Body */}
      {sections.map((s) => (
        <section key={s.id} id={s.id} className="mt-12 scroll-mt-28">
          <h2 className="text-2xl md:text-3xl font-bold leading-tight text-ink">{s.h2}</h2>
          <Nodes nodes={s.nodes} />
        </section>
      ))}

      {/* Internal linking */}
      <section aria-label="Related pages" className="mt-14">
        <h2 className="text-2xl md:text-3xl font-bold text-ink">Where to go next</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {linkGroups.map((g) => (
            <div key={g.title} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-primary">{g.title}</h3>
              <ul className="mt-3 space-y-2">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      to={l.href as unknown as "/"}
                      className="group inline-flex items-start gap-1.5 text-sm text-muted-foreground hover:text-primary"
                    >
                      <ArrowRight className="mt-1 size-3.5 shrink-0 text-primary transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                      <span>{l.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
