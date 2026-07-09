import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * Top-loading bar + subtle fade wrapper for route transitions.
 * Never blocks paint - the previous page stays visible while the next
 * one loads, so the user never sees a blank screen.
 */
export function RouteProgressBar() {
  const status = useRouterState({ select: (s) => s.status });
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf: number | undefined;
    let timeout: number | undefined;
    if (status === "pending") {
      setVisible(true);
      setProgress(10);
      const tick = () => {
        setProgress((p) => (p < 85 ? p + (85 - p) * 0.08 : p));
        raf = window.requestAnimationFrame(tick);
      };
      raf = window.requestAnimationFrame(tick);
    } else {
      setProgress(100);
      timeout = window.setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 250);
    }
    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (timeout) clearTimeout(timeout);
    };
  }, [status]);

  return (
    <div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[100] h-[2px] pointer-events-none"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 200ms ease" }}
    >
      <div
        className="h-full bg-gradient-to-r from-primary via-accent to-primary shadow-[0_0_10px_rgba(59,130,246,0.6)]"
        style={{
          width: `${progress}%`,
          transition: "width 200ms ease-out",
        }}
      />
    </div>
  );
}
