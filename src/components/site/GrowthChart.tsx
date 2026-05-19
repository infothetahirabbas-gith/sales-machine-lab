type Variant = {
  label: string;
  primary: string;
  primaryLight: string;
  secondary: string;
  // Line series (main metric)
  line: number[]; // 12 points, 0-100
  // Bar series (sessions / impressions / opens etc.)
  bars: number[]; // 12 points
  xLabels: string[];
  yLabel: string;
};

const variants: Record<string, Variant> = {
  revenue: {
    label: "Revenue",
    primary: "oklch(0.55 0.2 248)",
    primaryLight: "oklch(0.82 0.12 235)",
    secondary: "oklch(0.55 0.2 248 / 0.15)",
    line: [18, 22, 28, 26, 35, 42, 48, 55, 62, 70, 78, 88],
    bars: [30, 38, 45, 42, 55, 62, 68, 72, 78, 82, 88, 95],
    xLabels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12"],
    yLabel: "$K",
  },
  seo: {
    label: "Organic clicks",
    primary: "oklch(0.62 0.18 165)",
    primaryLight: "oklch(0.8 0.14 165)",
    secondary: "oklch(0.62 0.18 165 / 0.15)",
    line: [8, 10, 14, 18, 22, 28, 36, 44, 54, 66, 78, 92],
    bars: [15, 20, 26, 32, 38, 45, 52, 60, 68, 76, 85, 94],
    xLabels: ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "M9", "M10", "M11", "M12"],
    yLabel: "K",
  },
  ads: {
    label: "ROAS",
    primary: "oklch(0.7 0.2 35)",
    primaryLight: "oklch(0.82 0.16 50)",
    secondary: "oklch(0.7 0.2 35 / 0.15)",
    line: [25, 38, 32, 48, 42, 58, 55, 68, 72, 78, 85, 92],
    bars: [40, 45, 42, 55, 50, 62, 60, 70, 75, 80, 86, 92],
    xLabels: ["D1", "D3", "D5", "D7", "D9", "D11", "D13", "D15", "D17", "D19", "D21", "D23"],
    yLabel: "×",
  },
  email: {
    label: "Email revenue",
    primary: "oklch(0.62 0.22 305)",
    primaryLight: "oklch(0.78 0.18 305)",
    secondary: "oklch(0.62 0.22 305 / 0.15)",
    line: [12, 18, 24, 30, 36, 44, 50, 56, 64, 72, 80, 88],
    bars: [20, 28, 35, 40, 48, 55, 62, 68, 74, 80, 86, 92],
    xLabels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12"],
    yLabel: "$K",
  },
  cro: {
    label: "Conv rate",
    primary: "oklch(0.6 0.2 200)",
    primaryLight: "oklch(0.8 0.15 200)",
    secondary: "oklch(0.6 0.2 200 / 0.15)",
    line: [15, 20, 25, 32, 40, 48, 54, 62, 70, 76, 84, 92],
    bars: [25, 32, 38, 45, 52, 58, 64, 70, 76, 82, 88, 94],
    xLabels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12"],
    yLabel: "%",
  },
};

const W = 600;
const H = 280;
const PAD_L = 36;
const PAD_R = 16;
const PAD_T = 20;
const PAD_B = 30;
const CHART_W = W - PAD_L - PAD_R;
const CHART_H = H - PAD_T - PAD_B;

function buildLine(values: number[]) {
  const step = CHART_W / (values.length - 1);
  return values.map((v, i) => ({
    x: PAD_L + i * step,
    y: PAD_T + CHART_H - (v / 100) * CHART_H,
  }));
}

function smoothPath(pts: { x: number; y: number }[]) {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i];
    const p1 = pts[i + 1];
    const cx = (p0.x + p1.x) / 2;
    d += ` C ${cx} ${p0.y}, ${cx} ${p1.y}, ${p1.x} ${p1.y}`;
  }
  return d;
}

export default function GrowthChart({ className = "", variant = "revenue" }: { className?: string; variant?: keyof typeof variants }) {
  const v = variants[variant] ?? variants.revenue;
  const linePts = buildLine(v.line);
  const linePath = smoothPath(linePts);
  const areaPath = `${linePath} L ${linePts[linePts.length - 1].x} ${PAD_T + CHART_H} L ${linePts[0].x} ${PAD_T + CHART_H} Z`;
  const barW = (CHART_W / v.bars.length) * 0.55;
  const barStep = CHART_W / v.bars.length;
  const last = linePts[linePts.length - 1];
  const yTicks = [100, 75, 50, 25, 0];
  const gradId = `gFill-${variant}`;
  const strokeId = `gStroke-${variant}`;
  const barGradId = `gBar-${variant}`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} role="img" aria-label={`${v.label} chart`}>
      <defs>
        <linearGradient id={gradId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={v.primary} stopOpacity="0.45" />
          <stop offset="60%" stopColor={v.primary} stopOpacity="0.1" />
          <stop offset="100%" stopColor={v.primary} stopOpacity="0" />
        </linearGradient>
        <linearGradient id={strokeId} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor={v.primaryLight} />
          <stop offset="100%" stopColor={v.primary} />
        </linearGradient>
        <linearGradient id={barGradId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={v.primary} stopOpacity="0.35" />
          <stop offset="100%" stopColor={v.primary} stopOpacity="0.05" />
        </linearGradient>
        <filter id={`glow-${variant}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Y-axis grid + labels */}
      {yTicks.map((t) => {
        const y = PAD_T + CHART_H - (t / 100) * CHART_H;
        return (
          <g key={t}>
            <line x1={PAD_L} x2={W - PAD_R} y1={y} y2={y} stroke="oklch(0.16 0.02 250)" strokeOpacity="0.07" strokeDasharray={t === 0 ? "0" : "3 4"} />
            <text x={PAD_L - 8} y={y + 3} fontSize="9" fill="oklch(0.5 0.02 250)" textAnchor="end" fontFamily="ui-sans-serif, system-ui">
              {t}{v.yLabel}
            </text>
          </g>
        );
      })}

      {/* Bars (secondary metric) */}
      {v.bars.map((val, i) => {
        const x = PAD_L + i * barStep + (barStep - barW) / 2;
        const h = (val / 100) * CHART_H * 0.7;
        const y = PAD_T + CHART_H - h;
        return (
          <rect
            key={`bar-${variant}-${i}`}
            x={x}
            y={y}
            width={barW}
            height={h}
            rx="2"
            fill={`url(#${barGradId})`}
          />
        );
      })}

      {/* Area fill */}
      <path key={`area-${variant}`} d={areaPath} fill={`url(#${gradId})`} style={{ animation: "rise 0.7s cubic-bezier(0.16,1,0.3,1) both" }} />

      {/* Line */}
      <path
        key={`line-${variant}`}
        d={linePath}
        stroke={`url(#${strokeId})`}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="draw-line"
        filter={`url(#glow-${variant})`}
      />

      {/* Data points */}
      {linePts.map((p, i) => {
        const isLast = i === linePts.length - 1;
        return (
          <g key={`pt-${variant}-${i}`}>
            {isLast && (
              <circle cx={p.x} cy={p.y} r="12" fill={v.primary} fillOpacity="0.2">
                <animate attributeName="r" values="10;16;10" dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="fill-opacity" values="0.3;0.05;0.3" dur="1.8s" repeatCount="indefinite" />
              </circle>
            )}
            <circle cx={p.x} cy={p.y} r={isLast ? 5 : 3.5} fill="white" stroke={v.primary} strokeWidth={isLast ? 2.5 : 2} />
          </g>
        );
      })}

      {/* Last value badge */}
      <g>
        <rect x={last.x - 38} y={last.y - 30} width="36" height="18" rx="4" fill={v.primary} />
        <text x={last.x - 20} y={last.y - 18} fontSize="10" fontWeight="700" fill="white" textAnchor="middle" fontFamily="ui-sans-serif, system-ui">
          {v.line[v.line.length - 1]}{v.yLabel}
        </text>
      </g>

      {/* X-axis labels (every other) */}
      {v.xLabels.map((lab, i) => {
        if (i % 2 !== 0) return null;
        const x = PAD_L + i * (CHART_W / (v.xLabels.length - 1));
        return (
          <text key={`x-${i}`} x={x} y={H - 10} fontSize="9" fill="oklch(0.5 0.02 250)" textAnchor="middle" fontFamily="ui-sans-serif, system-ui">
            {lab}
          </text>
        );
      })}
    </svg>
  );
}
