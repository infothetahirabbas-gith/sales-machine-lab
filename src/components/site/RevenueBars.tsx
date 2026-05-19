import { useEffect, useState } from "react";
import { Info } from "lucide-react";
import { useInView, usePrefersReducedMotion } from "../../hooks/useCountUp";

export type Bar = {
  label: string;
  before: number;
  after: number;
  unit?: string; // "%" | "×" | "$" | "k" | "$k"
  description?: string;
};

function formatBar(n: number, unit?: string): string {
  const u = unit ?? "";
  // Currency-style: prefix
  if (u.startsWith("$")) {
    const trail = u.slice(1); // e.g. "k"
    return `$${n}${trail}`;
  }
  // Default: number then unit
  return `${n}${u}`;
}

export default function RevenueBars({ bars }: { bars: Bar[] }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = usePrefersReducedMotion();
  const max = Math.max(...bars.flatMap((b) => [b.before, b.after])) * 1.1;

  return (
    <div ref={ref} className="space-y-5">
      {bars.map((b, i) => (
        <div key={b.label} className="group">
          <div className="flex items-baseline justify-between text-xs font-semibold mb-2 gap-3">
            <span className="text-ink uppercase tracking-wider inline-flex items-center gap-1.5">
              {b.label}
              {b.description && (
                <span className="relative inline-flex group/tip">
                  <Info className="w-3.5 h-3.5 text-muted-foreground/70 hover:text-primary cursor-help transition-colors" />
                  <span
                    role="tooltip"
                    className="pointer-events-none absolute left-1/2 bottom-full mb-2 -translate-x-1/2 z-20 w-56 rounded-lg bg-ink text-white text-[11px] font-medium leading-snug px-3 py-2 shadow-xl opacity-0 translate-y-1 group-hover/tip:opacity-100 group-hover/tip:translate-y-0 group-focus-within/tip:opacity-100 transition-all duration-200"
                  >
                    {b.description}
                    <span className="absolute left-1/2 top-full -translate-x-1/2 w-2 h-2 rotate-45 bg-ink -mt-1" />
                  </span>
                </span>
              )}
            </span>
            <span className="text-muted-foreground whitespace-nowrap">
              <span className="text-destructive/80 line-through decoration-destructive/40 mr-2">
                {formatBar(b.before, b.unit)}
              </span>
              <span className="text-emerald-600 font-bold">
                {formatBar(b.after, b.unit)}
              </span>
            </span>
          </div>
          <div
            className="relative h-7 rounded-full bg-secondary/60 overflow-hidden border border-border"
            title={b.description}
          >
            <BarFill
              percent={(b.before / max) * 100}
              inView={inView}
              reduced={reduced}
              delay={i * 120}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-destructive/30 to-destructive/15 rounded-full"
            />
            <BarFill
              percent={(b.after / max) * 100}
              inView={inView}
              reduced={reduced}
              delay={i * 120 + 250}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-[oklch(0.6_0.2_260)] to-accent rounded-full shadow-[0_0_18px_-2px_oklch(0.55_0.2_265/0.55)]"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function BarFill({
  percent,
  inView,
  reduced,
  delay,
  className,
}: {
  percent: number;
  inView: boolean;
  reduced: boolean;
  delay: number;
  className?: string;
}) {
  const [w, setW] = useState(reduced ? percent : 0);
  useEffect(() => {
    if (reduced) {
      setW(percent);
      return;
    }
    if (!inView) return;
    const t = setTimeout(() => setW(percent), delay);
    return () => clearTimeout(t);
  }, [inView, percent, delay, reduced]);
  return (
    <div
      className={className}
      style={{
        width: `${w}%`,
        transition: reduced ? "none" : "width 1200ms cubic-bezier(0.22,1,0.36,1)",
      }}
    />
  );
}
