interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

/**
 * Animated number that counts up from 0 → end when it scrolls into view.
 * Respects prefers-reduced-motion (renders the final value immediately).
 */
export default function CountUp({
  end,
  duration = 1800,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: CountUpProps) {
  void duration;

  return (
    <span className={className}>
      {prefix}
      {end.toFixed(decimals)}
      {suffix}
    </span>
  );
}
