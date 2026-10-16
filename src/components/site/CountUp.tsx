interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

/**
 * Renders the final number directly so the server HTML (what Google, AI answers
 * and no-JS visitors see) never shows placeholder zeros like "0.0/5" or "£0M+".
 * SEO audit 2026-10-16.
 */
export default function CountUp({
  end,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: CountUpProps) {
  const formatted = decimals > 0 ? end.toFixed(decimals) : Math.round(end).toLocaleString("en-GB");
  return (
    <span className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
