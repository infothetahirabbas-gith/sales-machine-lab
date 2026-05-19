import { useEffect, useState } from "react";
import { useInView } from "../../hooks/useCountUp";

/**
 * Animated comparative bar chart that fills on scroll into view.
 * Shows Before vs After across a few metrics typical for ecommerce growth.
 */
export default function RevenueBars({
  bars,
}: {
  bars: { label: string; before: number; after: number; unit?: string }[];
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const max = Math.max(...bars.flatMap((b) => [b.before, b.after])) * 1.1;

  return (
    <div ref={ref} className="space-y-5">
      {bars.map((b, i) => (
        <div key={b.label} className="group">
          <div className="flex items-baseline justify-between text-xs font-semibold mb-2">
            <span className="text-ink uppercase tracking-wider">{b.label}</span>
            <span className="text-muted-foreground">
              <span className="text-destructive/80 line-through decoration-destructive/40 mr-2">
                {b.before}
                {b.unit}
              </span>
              <span className="text-emerald-600 font-bold">
                {b.after}
                {b.unit}
              </span>
            </span>
          </div>
          <div className="relative h-7 rounded-full bg-secondary/60 overflow-hidden border border-border">
            <BarFill
              percent={(b.before / max) * 100}
              inView={inView}
              delay={i * 120}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-destructive/30 to-destructive/15 rounded-full"
            />
            <BarFill
              percent={(b.after / max) * 100}
              inView={inView}
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
  delay,
  className,
}: {
  percent: number;
  inView: boolean;
  delay: number;
  className?: string;
}) {
  const [w, setW] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setW(percent), delay);
    return () => clearTimeout(t);
  }, [inView, percent, delay]);
  return (
    <div
      className={className}
      style={{
        width: `${w}%`,
        transition: "width 1200ms cubic-bezier(0.22,1,0.36,1)",
      }}
    />
  );
}
