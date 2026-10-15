import { useState } from "react";
import { Plus } from "lucide-react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { type FAQ, faqSlug } from "@/lib/seo";
import { Reveal, StaggerGroup } from "@/hooks/useReveal";

export default function FaqSection({
  faqs,
  eyebrow = "Frequently asked",
  title,
  highlight,
  intro,
}: {
  faqs: FAQ[];
  eyebrow?: string;
  title: string;
  highlight?: string;
  intro?: string;
}) {
  const [open, setOpen] = useState(0);

  return (
    <LazyMotion features={domAnimation} strict>
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <m.div
          aria-hidden
          className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-primary/10 blur-[140px] rounded-full"
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <m.div
          aria-hidden
          className="absolute -bottom-32 -right-32 w-[420px] h-[420px] bg-accent/30 blur-[140px] rounded-full"
          animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative mx-auto max-w-3xl px-5 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary">
                {eyebrow}
              </div>
              <h2 className="mt-4 text-3xl md:text-5xl font-bold text-ink leading-tight">
                {title} {highlight && <span className="text-gradient">{highlight}</span>}
              </h2>
              {intro && <p className="mt-3 text-muted-foreground">{intro}</p>}
            </div>
          </Reveal>

          <StaggerGroup className="space-y-3" stagger={0.06} pattern={["left", "right", "up", "right", "left"]}>
            {faqs.map((f, i) => {
              const isOpen = open === i;
              const id = `faq-${faqSlug(f.q)}`;
              return (
                <m.div
                  key={id}
                  id={id}
                  layout
                  transition={{ layout: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
                  className={`card-premium rounded-2xl overflow-hidden ${
                    isOpen ? "shadow-premium-lg border-primary/40" : "hover-lift"
                  }`}
                  whileHover={{ y: -2 }}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left group"
                    aria-expanded={isOpen}
                    aria-controls={`${id}-answer`}
                  >
                    <span className="font-semibold text-ink text-sm md:text-base transition-colors group-hover:text-primary">{f.q}</span>
                    <m.span
                      className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                        isOpen ? "bg-primary text-white" : "bg-primary/10 text-primary group-hover:bg-primary/20"
                      }`}
                      animate={{ rotate: isOpen ? 135 : 0 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    >
                      <Plus className="w-4 h-4" />
                    </m.span>
                  </button>
                  {/* Answers stay in the DOM when collapsed (SEO fix 2026-10-15):
                      previously closed answers were unmounted, so crawlers only
                      saw the first answer while FAQPage schema listed them all. */}
                  <m.div
                    id={`${id}-answer`}
                    role="region"
                    initial={false}
                    animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                    aria-hidden={!isOpen}
                  >
                    <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                  </m.div>
                </m.div>
              );
            })}
          </StaggerGroup>
        </div>
      </section>
    </LazyMotion>
  );
}
