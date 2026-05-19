export default function GrowthChart({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 280" className={className} role="img" aria-label="Revenue growth chart">
      <defs>
        <linearGradient id="gFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--neon)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="var(--neon)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="gStroke" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="var(--cyan)" />
          <stop offset="100%" stopColor="var(--neon)" />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1="0" x2="600" y1={40 + i * 50} y2={40 + i * 50} stroke="white" strokeOpacity="0.06" />
      ))}
      <path
        d="M0 220 C 60 200, 120 210, 180 180 S 300 100, 360 90 S 480 60, 600 30 L 600 280 L 0 280 Z"
        fill="url(#gFill)"
      />
      <path
        d="M0 220 C 60 200, 120 210, 180 180 S 300 100, 360 90 S 480 60, 600 30"
        stroke="url(#gStroke)"
        strokeWidth="3"
        fill="none"
        className="draw-line"
      />
      {[
        [60, 200], [180, 180], [360, 90], [480, 55], [580, 32],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill="var(--neon)" />
      ))}
    </svg>
  );
}
