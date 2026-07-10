import { useRef, useState, useCallback, useEffect } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";

export default function BeforeAfter() {
  const [pos, setPos] = useState(42);
  const wrapRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const dragRect = useRef<{ left: number; width: number } | null>(null);

  const setFromClientX = useCallback((clientX: number) => {
    const rect = dragRect.current;
    if (!rect) return;
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(4, Math.min(96, p)));
  }, []);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (!dragging.current) return;
      setFromClientX(e.clientX);
    };
    const up = () => { dragging.current = false; dragRect.current = null; document.body.style.userSelect = ""; };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [setFromClientX]);

  return (
    <div
      ref={wrapRef}
      className="relative w-full rounded-3xl overflow-hidden border border-border bg-secondary/40 shadow-[0_30px_80px_-30px_oklch(0.65_0.18_245/0.35)] select-none cursor-ew-resize"
      onPointerDown={(e) => {
        const rect = wrapRef.current?.getBoundingClientRect();
        if (!rect) return;
        dragRect.current = { left: rect.left, width: rect.width };
        dragging.current = true;
        document.body.style.userSelect = "none";
        setFromClientX(e.clientX);
      }}
    >
      {/* AFTER (sets height) */}
      <Panel kind="after" absolute={false} />

      {/* BEFORE (clipped overlay) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Panel kind="before" absolute />
      </div>

      {/* Divider + handle */}
      <div
        className="absolute top-0 bottom-0 w-px bg-ink/60"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white border border-ink/20 shadow-lg flex items-center justify-center text-ink">
          <span className="text-[10px] font-bold tracking-tight">‹ ›</span>
        </div>
      </div>
    </div>
  );
}

function Panel({ kind, absolute = true }: { kind: "before" | "after"; absolute?: boolean }) {
  const isBefore = kind === "before";
  const bg = isBefore ? "bg-white" : "bg-gradient-to-br from-accent/40 via-white to-primary/15";
  const badge = isBefore
    ? { label: "BEFORE", sub: "leaky store", tone: "bg-destructive/15 text-destructive" }
    : { label: "AFTER", sub: "scaling system", tone: "bg-primary/15 text-primary" };

  const stats = isBefore
    ? [
        { v: "0.9%", l: "Conversion", Icon: TrendingDown, tone: "text-destructive bg-destructive/10" },
        { v: "1.5x", l: "ROAS", Icon: TrendingDown, tone: "text-destructive bg-destructive/10" },
      ]
    : [
        { v: "3.4%", l: "Conversion", Icon: TrendingUp, tone: "text-primary bg-primary/10" },
        { v: "5.2x", l: "ROAS", Icon: TrendingUp, tone: "text-primary bg-primary/10" },
      ];

  const linePath = isBefore
    ? "M20 90 L 100 88 L 180 92 L 260 91"
    : "M20 95 C 80 88, 140 78, 200 55 S 320 28, 380 18";

  return (
    <div className={`${absolute ? "absolute inset-0" : "relative"} p-5 md:p-7 ${bg}`}>
      <div className="flex items-center gap-2">
        <span className={`text-[10px] font-bold tracking-widest px-2 py-1 rounded-md ${badge.tone}`}>{badge.label}</span>
        <span className="text-xs text-muted-foreground">{badge.sub}</span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {stats.map((s) => (
          <div key={s.l} className="rounded-xl border border-border bg-white p-3 flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${s.tone}`}>
              <s.Icon className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-ink text-lg leading-none">{s.v}</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">{s.l}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-xl border border-border bg-white p-3">
        <svg viewBox="0 0 400 110" className="w-full h-16">
          <path d={linePath} fill="none" stroke="oklch(0.55 0.2 248)" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}
