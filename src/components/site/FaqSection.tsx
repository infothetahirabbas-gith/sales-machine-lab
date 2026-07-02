import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { type FAQ, faqSlug } from "@/lib/seo";

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
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-primary/10 blur-[140px] rounded-full" />
      <div className="absolute -bottom-32 -right-32 w-[420px] h-[420px] bg-accent/30 blur-[140px] rounded-full" />

      <div className="relative mx-auto max-w-3xl px-5 lg:px-8">
        <div className="text-centre mb-10">
          <div className="inline-flex items-centre gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary">
            {eyebrow}
          </div>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-ink leading-tight">
            {title} {highlight && <span className="text-gradient">{highlight}</span>}
          </h2>
          {intro && <p className="mt-3 text-muted-foreground">{intro}</p>}
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            const id = `faq-${faqSlug(f.q)}`;
            return (
              <div
                key={id}
                id={id}
                className={`card-surface rounded-2xl transition-all duration-300 ${
                  isOpen ? "shadow-xl ring-1 ring-primary/20" : "hover:shadow-md"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-centre justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`${id}-answer`}
                >
                  <span className="font-semibold text-ink text-sm md:text-base">{f.q}</span>
                  <span
                    className={`shrink-0 w-7 h-7 rounded-full flex items-centre justify-centre transition-colors ${
                      isOpen ? "bg-primary text-white" : "bg-primary/10 text-primary"
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>
                <div
                  id={`${id}-answer`}
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
