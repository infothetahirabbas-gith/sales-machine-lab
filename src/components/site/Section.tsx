import { type ReactNode } from "react";
import { Reveal } from "../../hooks/useReveal";

/** Split a heading string into ink + brand halves. Use "||" in the string for
 *  an explicit split point, otherwise it splits at the midpoint word boundary.
 *  Non-string titles render unchanged. Pair with `.split-heading` wrapper. */
export function SplitHeading({ value, className = "" }: { value: ReactNode; className?: string }) {
  if (typeof value !== "string") return <>{value}</>;
  let head: string;
  let tail: string;
  if (value.includes("||")) {
    const [h, ...rest] = value.split("||");
    head = h;
    tail = rest.join("||");
  } else {
    const tokens = value.split(/(\s+)/);
    const wordIdx = tokens.map((t, i) => (/\S/.test(t) ? i : -1)).filter((i) => i >= 0);
    const splitAt = wordIdx[Math.floor(wordIdx.length / 2)] ?? tokens.length;
    head = tokens.slice(0, splitAt).join("");
    tail = tokens.slice(splitAt).join("");
  }
  return (
    <span className={`split-heading ${className}`}>
      <span className="split-ink">{head}</span>
      {tail && <span className="split-brand">{tail}</span>}
    </span>
  );
}

/** Body-copy variant of SplitHeading for in-section line emphasis. */
export function SplitLine({ value, className = "" }: { value: ReactNode; className?: string }) {
  if (typeof value !== "string") return <>{value}</>;
  return <SplitHeading value={value} className={`split-line ${className}`} />;
}

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = "",
  center = false,
  alt = false,
}: {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
  center?: boolean;
  alt?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative py-20 lg:py-28 section-hover ${alt ? "bg-secondary/40" : ""} ${className}`}
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {(eyebrow || title || intro) && (
          <div className={`max-w-3xl mb-12 ${center ? "mx-auto text-center" : "text-center lg:text-left"}`}>
            {eyebrow && (
              <Reveal>
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-4">
                  <span className="relative inline-block w-1.5 h-1.5 rounded-full bg-primary pulse-dot" />
                  {eyebrow}
                </div>
              </Reveal>
            )}
            {title && (
              <Reveal delay={1}>
                <h2 className="text-3xl md:text-5xl font-bold leading-[1.05] text-ink"><SplitHeading value={title} /></h2>
              </Reveal>
            )}
            {intro && (
              <Reveal delay={2}>
                <p className="mt-5 text-lg text-muted-foreground">{intro}</p>
              </Reveal>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`card-surface card-hover group p-6 ${className}`}>
      {children}
    </div>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium text-ink">
      {children}
    </span>
  );
}

export function NumberedList({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ol className="grid md:grid-cols-2 gap-4">
      {items.map((it, i) => (
        <Reveal key={i} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
          <li className="card-surface card-hover p-6 flex gap-4">
            <div className="shrink-0 w-12 h-12 rounded-2xl bg-primary/10 text-primary font-display font-bold flex items-center justify-center text-lg">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div>
              <h4 className="font-semibold text-ink">{it.title}</h4>
              <p className="text-sm text-muted-foreground mt-1">{it.body}</p>
            </div>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}

export function CTA({
  heading = "Let's Turn Your Store Into a Sales Machine",
  sub = "Get a free, no-fluff ecommerce growth audit. We'll show you exactly what's leaking revenue.",
}: { heading?: string; sub?: string }) {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 lg:p-16 text-center">
            <div className="absolute inset-0 grid-bg opacity-60" />
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl float" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-accent/30 blur-3xl float-slow" />
            <div className="relative">
              <h3 className="text-3xl md:text-5xl font-bold text-ink"><SplitHeading value={heading} /></h3>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">{sub}</p>
              <div className="mt-8 btn-pair mx-auto justify-center">
                <a href="/contact" className="btn btn-primary btn-shimmer">
                  Book Strategy Call <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
                <a href="/contact" className="btn btn-ghost">Book Strategy Call</a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
