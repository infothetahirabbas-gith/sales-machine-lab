import { useEffect, useRef, useState } from "react";

/**
 * Parses values like "+192%", "1.9× → 3.6×", "$48M+", "4.8/5", "120+", "$48,200"
 * into { prefix, num, suffix, decimals } for animated formatting.
 * For arrow values ("a → b") we animate to the final number and preserve the "a → " prefix.
 */
function parseValue(value: string): {
  prefix: string;
  num: number;
  suffix: string;
  decimals: number;
} | null {
  const arrowSplit = value.split(/→|->/);
  const target = arrowSplit[arrowSplit.length - 1].trim();
  // Allow currency / sign prefix, then digits with optional commas + decimals
  const match = target.match(/^([^\d\-]*)(-?\d[\d,]*(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  const rawNum = match[2].replace(/,/g, "");
  const num = parseFloat(rawNum);
  if (!Number.isFinite(num)) return null;
  const decimalsMatch = rawNum.split(".")[1];
  const decimals = decimalsMatch ? decimalsMatch.length : 0;
  const prefix =
    arrowSplit.length > 1
      ? `${arrowSplit[0].trim()} → ${match[1] || ""}`
      : match[1] || "";
  return { prefix, num, suffix: match[3] || "", decimals };
}

function formatNumber(n: number, decimals: number): string {
  if (decimals > 0) {
    return n.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }
  return Math.round(n).toLocaleString();
}

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);
  return reduced;
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
  const reduced = usePrefersReducedMotion();
  const parsed = parseValue(value);

  // When motion is reduced, render the final formatted value immediately.
  const finalDisplay = parsed
    ? `${parsed.prefix}${formatNumber(parsed.num, parsed.decimals)}${parsed.suffix}`
    : value;

  // Always SSR the final formatted value so raw HTML (and non-JS crawlers
  // like ChatGPT / Perplexity / Claude) see the real numbers, never "0".
  // After mount, if motion is allowed and the element scrolls into view,
  // reset to 0 and animate up.
  const [display, setDisplay] = useState<string>(finalDisplay);

  useEffect(() => {
    if (!parsed) {
      setDisplay(value);
      return;
    }
    if (reduced) {
      setDisplay(finalDisplay);
      return;
    }
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    // Kick the animation off from 0 now that we're client-side and visible.
    setDisplay(`${parsed.prefix}${formatNumber(0, parsed.decimals)}${parsed.suffix}`);
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = parsed.num * eased;
      setDisplay(`${parsed.prefix}${formatNumber(current, parsed.decimals)}${parsed.suffix}`);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, parsed?.num, parsed?.prefix, parsed?.suffix, parsed?.decimals, duration, finalDisplay, value]);

  if (!parsed) return <span ref={ref} className={className}>{value}</span>;
  return (
    <span ref={ref} className={className} aria-label={finalDisplay}>
      {display}
    </span>
  );
}
