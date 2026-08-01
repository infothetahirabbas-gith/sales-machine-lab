import { useEffect } from "react";
import { useHydrated, useRouterState } from "@tanstack/react-router";


/**
 * Lightweight scroll reveal. Uses IntersectionObserver only. Re-scans on
 * every route change so newly mounted sections get observed (SPA fix).
 * The first section on every page is intentionally excluded so the hero /
 * LCP element paints at its final position (no CLS, no render delay).
 */
const SELECTOR = [
  "section h2",
  "section h3",
  "section .card-surface",
  "section .card-premium",
  "section [class*='rounded-2xl']",
  "section [class*='rounded-3xl']",
  "section .btn-pair",
].join(",");

export function GlobalReveal() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  // Only true once React has finished hydrating the root. Scanning before that
  // rewrites nodes React is still hydrating and triggers attribute mismatches.
  const hydrated = useHydrated();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!hydrated) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;


    let io: IntersectionObserver | null = null;
    let failSafe: number | null = null;
    let rafId = 0;

    const run = () => {
      // Safety net: nothing ever stays invisible.
      failSafe = window.setTimeout(() => {
        document
          .querySelectorAll<HTMLElement>("[data-reveal]:not([data-inview='1'])")
          .forEach((n) => n.setAttribute("data-inview", "1"));
      }, 2500);

      if (reduced) {
        document
          .querySelectorAll<HTMLElement>("[data-reveal]")
          .forEach((n) => n.setAttribute("data-inview", "1"));
        return;
      }

      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              const el = e.target as HTMLElement;
              el.setAttribute("data-inview", "1");
              window.setTimeout(() => {
                el.style.willChange = "auto";
              }, 900);
              io!.unobserve(el);
            }
          }
        },
        { threshold: 0.05, rootMargin: "0px 0px -4% 0px" },
      );

      const firstSection = document.querySelector("main section");
      const isInHero = (el: Element) =>
        firstSection ? firstSection.contains(el) : false;

      const nodes = document.querySelectorAll<HTMLElement>(SELECTOR);
      let idx = 0;
      nodes.forEach((n) => {
        if (n.hasAttribute("data-noreveal")) return;
        if (n.getAttribute("data-inview") === "1") return;
        if (isInHero(n)) {
          n.setAttribute("data-inview", "1");
          return;
        }
        if (!n.hasAttribute("data-reveal")) {
          n.setAttribute("data-reveal", "up");
        }
        n.setAttribute("data-reveal-ready", "1");
        if (!n.style.getPropertyValue("--reveal-delay")) {
          n.style.setProperty("--reveal-delay", `${(idx % 4) * 50}ms`);
        }
        idx++;
        io!.observe(n);
      });

      document.documentElement.classList.add("js-reveal");
    };

    // Route components are lazy + Suspense-wrapped, so __root mounts (and this
    // effect fires) BEFORE React has hydrated the page body. Mutating those
    // nodes early produced "tree hydrated but some attributes ... didn't match"
    // errors. Wait for the document to finish loading, then two frames, so
    // hydration has committed before we touch any attributes.
    let rafId2 = 0;
    const schedule = () => {
      rafId = window.requestAnimationFrame(() => {
        rafId2 = window.requestAnimationFrame(run);
      });
    };

    let onLoad: (() => void) | null = null;
    if (document.readyState === "complete") {
      schedule();
    } else {
      onLoad = () => schedule();
      window.addEventListener("load", onLoad, { once: true });
    }

    return () => {
      if (onLoad) window.removeEventListener("load", onLoad);
      window.cancelAnimationFrame(rafId);
      window.cancelAnimationFrame(rafId2);
      if (failSafe) window.clearTimeout(failSafe);
      if (io) io.disconnect();
    };
  }, [pathname]);


  return null;
}
