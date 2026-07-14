import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

/**
 * Reveal-on-scroll: adds `.in` to the returned ref the first time it enters
 * the viewport. Retained for legacy CSS-based reveal utilities.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.12) {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || shown) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [threshold, shown]);

  return { ref, shown };
}

type RevealDirection = "up" | "down" | "left" | "right" | "zoom" | "fade";

/**
 * Framer Motion powered reveal. Accepts a `from` direction so different
 * sections can enter from up, down, left, right, zoom or plain fade.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
  from = "up",
  distance: _distance = 32,
}: {
  children: ReactNode;
  delay?: 0 | 1 | 2 | 3 | 4;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  from?: RevealDirection;
  distance?: number;
}) {
  const Element = Tag as React.ElementType;
  return (
    <Element
      className={className}
      data-reveal={from}
      style={{ "--reveal-delay": `${delay * 80}ms` } as CSSProperties}
    >
      {children}
    </Element>
  );
}

/**
 * Stagger a list of children on scroll. `pattern` cycles child directions
 * for a lively "some from left, some from right, some up" feel.
 */
export function StaggerGroup({
  children,
  className = "",
  stagger = 0.09,
  as: Tag = "div",
  from = "up",
  pattern,
  distance: _distance = 32,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: keyof React.JSX.IntrinsicElements;
  from?: RevealDirection;
  pattern?: RevealDirection[];
  distance?: number;
}) {
  const Element = Tag as React.ElementType;
  const cycle = pattern && pattern.length > 0 ? pattern : [from];
  return (
    <Element className={className}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <div
              key={i}
              data-reveal={cycle[i % cycle.length]}
              style={{ "--reveal-delay": `${Math.round((0.05 + i * stagger) * 1000)}ms` } as CSSProperties}
            >
              {child}
            </div>
          ))
        : children}
    </Element>
  );
}

/** Simple fade-in wrapper for entrance / mount animations. */
export function FadeIn({
  children,
  delay = 0,
  duration: _duration = 0.6,
  y: _y = 16,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
}) {
  return (
    <div
      className={className}
      data-reveal="up"
      style={{ "--reveal-delay": `${Math.round(delay * 1000)}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
