import { type ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = "",
  center = false,
}: {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
  center?: boolean;
}) {
  return (
    <section id={id} className={`relative py-20 lg:py-28 ${className}`}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {(eyebrow || title || intro) && (
          <div className={`max-w-3xl mb-12 ${center ? "mx-auto text-center" : ""}`}>
            {eyebrow && (
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="text-3xl md:text-5xl font-bold leading-[1.05]">{title}</h2>
            )}
            {intro && <p className="mt-5 text-lg text-muted-foreground">{intro}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`group relative rounded-2xl border border-border bg-card/60 backdrop-blur p-6 transition hover:border-primary/40 hover:-translate-y-1 hover:shadow-[0_20px_60px_-30px_var(--neon)] ${className}`}>
      {children}
    </div>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium">
      {children}
    </span>
  );
}

export function NumberedList({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ol className="grid md:grid-cols-2 gap-4">
      {items.map((it, i) => (
        <li key={i} className="rounded-2xl border border-border bg-card/60 p-6 flex gap-4">
          <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/15 text-primary font-display font-bold flex items-center justify-center">
            {String(i + 1).padStart(2, "0")}
          </div>
          <div>
            <h4 className="font-semibold">{it.title}</h4>
            <p className="text-sm text-muted-foreground mt-1">{it.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function CTA({ heading = "Let's Turn Your Store Into a Sales Machine", sub = "Get a free, no-fluff ecommerce growth audit. We'll show you exactly what's leaking revenue." }: { heading?: string; sub?: string }) {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-accent/10 p-10 lg:p-16 text-center">
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="relative">
            <h3 className="text-3xl md:text-5xl font-bold">{heading}</h3>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">{sub}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="/contact" className="rounded-full bg-primary text-primary-foreground px-6 py-3 font-semibold hover:opacity-90">
                Book Strategy Call →
              </a>
              <a href="/contact" className="rounded-full border border-border bg-card/60 px-6 py-3 font-semibold hover:bg-card">
                Get Free Audit
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
