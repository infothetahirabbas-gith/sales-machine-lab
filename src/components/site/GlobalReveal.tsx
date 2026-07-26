import { useEffect } from "react";

/**
 * Global scroll reveal. Observes every section, heading, card, image,
 * button-pair, list item, etc. across the whole site and toggles
 * `data-inview="1"` when they enter the viewport. CSS in styles.css
 * only hides content once <html> has `.js-reveal`, so if this runtime
 * fails to load nothing is ever stuck invisible.
 */
const SELECTOR = [
  "section > *",
  "section h1, section h2, section h3, section h4",
  "section p",
  "section img",
  "section .card-surface",
  "section .card-premium",
  "section [class*='rounded-2xl']",
  "section [class*='rounded-3xl']",
  "section .btn-pair",
  "section ul > li",
  "section ol > li",
  "section .grid > *",
].join(",");

export function GlobalReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timeoutHandle: ReturnType<typeof globalThis.setTimeout> | undefined;

    // Safety net: guarantee everything becomes visible no matter what.
    const failSafe = window.setTimeout(() => {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]:not([data-inview='1'])")
        .forEach((n) => n.setAttribute("data-inview", "1"));
    }, 2500);

    if (reduced) {
      return () => window.clearTimeout(failSafe);
    }

    const observed = new WeakSet<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).setAttribute("data-inview", "1");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );

    const vh = () => window.innerHeight || document.documentElement.clientHeight;
    const revealPassedNodes = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-inview='1'])").forEach((n) => {
        const rect = n.getBoundingClientRect();
        if (rect.top < vh() + 160) {
          n.setAttribute("data-inview", "1");
        }
      });
    };

    const seed = (root: ParentNode) => {
      const nodes = root.querySelectorAll<HTMLElement>(SELECTOR);
      let idx = 0;
      nodes.forEach((n) => {
        if (observed.has(n)) return;
        if (n.hasAttribute("data-noreveal")) return;
        observed.add(n);
        // Mark already-visible elements as in-view BEFORE we flip on the
        // hiding class, so headings above the fold never flash out.
        const rect = n.getBoundingClientRect();
        const inView = rect.top < vh() + 160;
        if (inView) {
          n.setAttribute("data-inview", "1");
        }
        if (!n.hasAttribute("data-reveal")) {
          const dirs = ["up", "left", "right", "up", "zoom", "down"] as const;
          n.setAttribute("data-reveal", dirs[idx % dirs.length]);
        }
        if (!n.style.getPropertyValue("--reveal-delay")) {
          n.style.setProperty("--reveal-delay", `${(idx % 6) * 60}ms`);
        }
        idx++;
        if (!inView) {
          io.observe(n);
        }
      });
    };

    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node.nodeType === 1) seed(node as Element);
        }
      }
      revealPassedNodes();
    });

    // Seed after nested route chunks have had time to hydrate. Mutating
    // data-reveal/data-inview too early causes production hydration mismatches.
    const start = () => {
      seed(document);
      document.documentElement.classList.add("js-reveal");
      revealPassedNodes();
      mo.observe(document.body, { childList: true, subtree: true });
      window.addEventListener("scroll", revealPassedNodes, { passive: true });
      window.addEventListener("resize", revealPassedNodes);
    };

    timeoutHandle = globalThis.setTimeout(start, 1800);

    return () => {
      window.clearTimeout(failSafe);
      if (timeoutHandle !== undefined) {
        globalThis.clearTimeout(timeoutHandle);
      }
      window.removeEventListener("scroll", revealPassedNodes);
      window.removeEventListener("resize", revealPassedNodes);
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
