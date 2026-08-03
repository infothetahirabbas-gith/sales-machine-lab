import { useEffect } from "react";
import { useRouter } from "@tanstack/react-router";

/**
 * After the page has fully loaded and the main thread is idle, warm the
 * router cache for the handful of routes users click most. This costs
 * nothing on the critical path (it never runs before `load`) but makes the
 * first navigation feel instant instead of waiting on a chunk fetch.
 */
const TOP_ROUTES = [
  "/services",
  "/pricing",
  "/contact",
  "/case-studies",
  "/blog",
] as const;

export function IdlePrefetch() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Respect users on slow or metered connections.
    const conn = (navigator as unknown as {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    if (conn?.saveData) return;
    if (conn?.effectiveType && /2g/.test(conn.effectiveType)) return;

    let cancelled = false;
    let idleId: number | undefined;
    let timeoutId: number | undefined;

    const warm = () => {
      let i = 0;
      const next = () => {
        if (cancelled || i >= TOP_ROUTES.length) return;
        const to = TOP_ROUTES[i++];
        void router.preloadRoute({ to }).catch(() => {}).finally(() => {
          timeoutId = window.setTimeout(next, 150);
        });
      };
      next();
    };

    const schedule = () => {
      const ric = (window as unknown as {
        requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      }).requestIdleCallback;
      if (ric) idleId = ric(warm, { timeout: 4000 });
      else timeoutId = window.setTimeout(warm, 2000);
    };

    let onLoad: (() => void) | null = null;
    if (document.readyState === "complete") schedule();
    else {
      onLoad = () => schedule();
      window.addEventListener("load", onLoad, { once: true });
    }

    return () => {
      cancelled = true;
      if (onLoad) window.removeEventListener("load", onLoad);
      if (timeoutId) window.clearTimeout(timeoutId);
      const cic = (window as unknown as {
        cancelIdleCallback?: (id: number) => void;
      }).cancelIdleCallback;
      if (idleId !== undefined && cic) cic(idleId);
    };
  }, [router]);

  return null;
}
