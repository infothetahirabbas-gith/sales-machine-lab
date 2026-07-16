// Entity-first "TL;DR" answer block designed for AEO / GEO / AI-search
// extractability. Rendered directly under the hero on every service,
// company, location and industry page so LLMs and answer engines get
// a self-contained, definitional paragraph before the marketing copy.
//
// The block is intentionally plain-language and entity-first
// ("BeingEcom is a UK ecommerce marketing agency that…") - that's the
// pattern ChatGPT / Perplexity / Gemini / Google AI Overviews reward.

import { Sparkles } from "lucide-react";

export type AISummaryProps = {
  /** Optional eyebrow. Defaults to "Summary". */
  eyebrow?: string;
  /**
   * The definitional sentence(s). Should lead with the entity
   * ("BeingEcom is …") and stay ≤ ~60 words for extractability.
   */
  children: React.ReactNode;
};

export default function AISummary({ eyebrow = "Summary", children }: AISummaryProps) {
  return (
    <section
      aria-label="Page summary"
      data-ai-summary
      className="mx-auto max-w-7xl px-5 lg:px-8 -mt-8 lg:-mt-12 mb-6 lg:mb-10"
    >
      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-white to-accent/10 p-5 md:p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <div
            aria-hidden="true"
            className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
          >
            <Sparkles className="size-4" />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
              {eyebrow}
            </div>
            <p className="mt-1.5 text-[15px] md:text-base leading-relaxed text-ink">
              {children}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
