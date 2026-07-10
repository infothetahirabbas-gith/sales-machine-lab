import { useRef, useState } from "react";

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
  return true;
}

export function useInView<T extends HTMLElement>(once = true) {
  const ref = useRef<T | null>(null);
  void once;
  return { ref, inView: true };
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

  void duration;
  void inView;
  void reduced;

  if (!parsed) return <span ref={ref} className={className}>{value}</span>;
  return (
    <span ref={ref} className={className} aria-label={finalDisplay}>
      {finalDisplay}
    </span>
  );
}
