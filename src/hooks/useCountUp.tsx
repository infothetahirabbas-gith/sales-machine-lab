import { useEffect, useRef, useState } from "react";

/**
 * Parses a metric string like "+192%", "1.9× → 3.6×", "$48M+", "4.8/5"
 * into { prefix, number, suffix } for animation.
 */
function parseValue(value: string): { prefix: string; num: number; suffix: string } | null {
  // For arrow values "1.9× → 3.6×" animate to the second number
  const arrowSplit = value.split(/→|->/);
  const target = arrowSplit[arrowSplit.length - 1].trim();
  const match = target.match(/^([^\d\-]*)(-?\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  const prefix = arrowSplit.length > 1 ? arrowSplit[0].trim() + " → " + (match[1] || "") : match[1] || "";
  return { prefix, num: parseFloat(match[2]), suffix: match[3] || "" };
}

export function useInView<T extends HTMLElement>(once = true) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);
  return { ref, inView };
}

export function CountUp({
  value,
  duration = 1600,
  className,
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const parsed = parseValue(value);
  const [display, setDisplay] = useState<string>(parsed ? `${parsed.prefix}0${parsed.suffix}` : value);

  useEffect(() => {
    if (!inView || !parsed) return;
    const start = performance.now();
    const isInt = Number.isInteger(parsed.num);
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = parsed.num * eased;
      const formatted = isInt
        ? Math.round(current).toLocaleString()
        : current.toFixed(1);
      setDisplay(`${parsed.prefix}${formatted}${parsed.suffix}`);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, parsed?.num, parsed?.prefix, parsed?.suffix, duration]);

  if (!parsed) return <span ref={ref} className={className}>{value}</span>;
  return <span ref={ref} className={className}>{display}</span>;
}
