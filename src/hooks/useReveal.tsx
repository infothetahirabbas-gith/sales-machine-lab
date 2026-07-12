import { useEffect, useRef, useState } from "react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

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

const DELAY_STEP = 0.08;

/**
 * Framer Motion powered reveal. Drop-in replacement for the previous CSS
 * variant — accepts the same `delay` (0..4) step index. Honours
 * `prefers-reduced-motion` automatically.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
  y = 24,
}: {
  children: ReactNode;
  delay?: 0 | 1 | 2 | 3 | 4;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  y?: number;
}) {
  const reduce = useReducedMotion();
  const MotionTag = (m as unknown as Record<string, React.ElementType>)[Tag as string] ?? m.div;
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionTag
        className={className}
        initial={reduce ? false : { opacity: 0, y }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -8% 0px" }}
        transition={{
          duration: 0.7,
          delay: delay * DELAY_STEP,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </MotionTag>
    </LazyMotion>
  );
}

/**
 * Stagger a list of children on scroll. Wrap grids/lists for orchestrated
 * entrances without hand-tuning each child.
 */
export function StaggerGroup({
  children,
  className = "",
  stagger = 0.08,
  as: Tag = "div",
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: keyof React.JSX.IntrinsicElements;
  y?: number;
}) {
  const reduce = useReducedMotion();
  const MotionTag = (m as unknown as Record<string, React.ElementType>)[Tag as string] ?? m.div;
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionTag
        className={className}
        initial={reduce ? false : "hidden"}
        whileInView={reduce ? undefined : "show"}
        viewport={{ once: true, margin: "0px 0px -8% 0px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: stagger, delayChildren: 0.05 } },
        }}
      >
        {Array.isArray(children)
          ? children.map((child, i) => (
              <m.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
              >
                {child}
              </m.div>
            ))
          : children}
      </MotionTag>
    </LazyMotion>
  );
}

/** Simple fade-in wrapper for entrance / mount animations. */
export function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  y = 16,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        className={className}
        initial={reduce ? false : { opacity: 0, y }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
