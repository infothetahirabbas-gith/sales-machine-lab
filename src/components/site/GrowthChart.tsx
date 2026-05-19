type Variant = {
  path: string;
  area: string;
  points: [number, number][];
};

const variants: Record<string, Variant> = {
  revenue: {
    path: "M0 220 C 60 200, 120 210, 180 180 S 300 100, 360 90 S 480 60, 600 30",
    area: "M0 220 C 60 200, 120 210, 180 180 S 300 100, 360 90 S 480 60, 600 30 L 600 280 L 0 280 Z",
    points: [[60, 200], [180, 180], [360, 90], [480, 55], [580, 32]],
  },
  seo: {
    path: "M0 240 C 80 235, 160 225, 240 200 S 380 130, 460 95 S 560 55, 600 40",
    area: "M0 240 C 80 235, 160 225, 240 200 S 380 130, 460 95 S 560 55, 600 40 L 600 280 L 0 280 Z",
    points: [[80, 235], [240, 200], [380, 130], [460, 95], [580, 42]],
  },
  ads: {
    path: "M0 200 C 80 230, 140 150, 220 170 S 340 70, 420 110 S 520 50, 600 25",
    area: "M0 200 C 80 230, 140 150, 220 170 S 340 70, 420 110 S 520 50, 600 25 L 600 280 L 0 280 Z",
    points: [[80, 220], [220, 170], [340, 90], [420, 110], [580, 28]],
  },
  email: {
    path: "M0 230 C 90 225, 180 190, 260 175 S 400 110, 480 80 S 560 50, 600 35",
    area: "M0 230 C 90 225, 180 190, 260 175 S 400 110, 480 80 S 560 50, 600 35 L 600 280 L 0 280 Z",
    points: [[90, 225], [260, 175], [400, 110], [480, 80], [580, 38]],
  },
  cro: {
    path: "M0 245 C 80 240, 160 220, 240 190 S 360 130, 440 100 S 560 45, 600 30",
    area: "M0 245 C 80 240, 160 220, 240 190 S 360 130, 440 100 S 560 45, 600 30 L 600 280 L 0 280 Z",
    points: [[80, 240], [240, 190], [360, 130], [440, 100], [580, 32]],
  },
};

export default function GrowthChart({ className = "", variant = "revenue" }: { className?: string; variant?: keyof typeof variants }) {
  const v = variants[variant] ?? variants.revenue;
  return (
    <svg viewBox="0 0 600 280" className={className} role="img" aria-label="Performance chart">
      <defs>
        <linearGradient id="gFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.65 0.18 245)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="oklch(0.65 0.18 245)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="gStroke" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="oklch(0.82 0.12 235)" />
          <stop offset="100%" stopColor="oklch(0.55 0.2 248)" />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1="0" x2="600" y1={40 + i * 50} y2={40 + i * 50}
              stroke="oklch(0.16 0.02 250)" strokeOpacity="0.06" />
      ))}
      <path key={`a-${variant}`} d={v.area} fill="url(#gFill)" style={{ animation: "rise 0.7s cubic-bezier(0.16,1,0.3,1) both" }} />
      <path
        key={`p-${variant}`}
        d={v.path}
        stroke="url(#gStroke)"
        strokeWidth="3"
        fill="none"
        className="draw-line"
      />
      {v.points.map(([x, y], i) => (
        <circle key={`${variant}-${i}`} cx={x} cy={y} r="4.5" fill="oklch(0.55 0.2 248)">
          <animate attributeName="r" values="4.5;7;4.5" dur="2.4s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}
