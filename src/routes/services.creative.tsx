import { createFileRoute } from "@tanstack/react-router";
import ServicePage from "../../components/site/ServicePage";

export const Route = createFileRoute("/services/creative")({
  component: () => (
    <ServicePage cfg={{
      slug: "creative",
      eyebrow: "Creative & Ad Content Production",
      heroTitle: "High-converting creatives that sell products.",
      heroSub: "Hooks, scripts, UGC, statics, and videos engineered to stop the scroll and move units.",
      problemTitle: "Bad creatives are why your ads are dying.",
      problemBullets: [
        "Same 2 ads running for 6 months.",
        "Generic 'lifestyle' content that says nothing.",
        "No hooks, no angles, no testing pipeline.",
      ],
      whatIsTitle: "Creative carries 80% of ad performance.",
      whatIsBody: "Modern paid media is a creative game. Targeting is automated. The brands that win are the ones shipping more hooks and angles every week.",
      systemTitle: "Our creative system.",
      systemSteps: [
        { title: "Angle research", body: "Mine reviews, competitors, founder, customer language." },
        { title: "Hook bank", body: "30+ hooks ready before any shoot or design." },
        { title: "Production sprint", body: "Weekly batch: UGC + static + founder cuts." },
        { title: "Test & iterate", body: "Daily creative reads, winners get variations." },
      ],
      pillarsTitle: "What we produce.",
      pillars: [
        { title: "Video ads", body: "Native, UGC, founder, demo, comparison." },
        { title: "Static ads", body: "Carousels, posters, before/after, testimonials." },
        { title: "Photography", body: "Product, lifestyle, in-context shoots." },
        { title: "Copy", body: "Hooks, scripts, captions, primary text." },
      ],
      deepBlocks: [
        { title: "Video ad creation", body: "Hook-driven scripts, native edits, captions, multiple aspect ratios.", tags: ["Hooks","Scripts","9:16","Captions"] },
        { title: "Static ad design", body: "Carousels, comparison, list, social proof formats.", tags: ["Carousel","Compare","List"] },
        { title: "Product photography direction", body: "Shot list, mood board, model + flat lay + in-context.", tags: ["Shot list","Mood","Flat lay"] },
        { title: "Hook writing strategy", body: "Curiosity, contrarian, problem, listicle, social proof formats.", tags: ["Curiosity","Listicle","POV"] },
        { title: "Ad copywriting system", body: "Primary text frameworks, story-led structures, CTA testing.", tags: ["Primary","Story","CTA"] },
        { title: "UGC ad production", body: "Creator briefs, native review style, founder-style cuts.", tags: ["Creator","Native","Founder"] },
      ],
      triggersTitle: "Winning ad formula.",
      triggers: ["Strong hook in 1.5s","Problem stated clearly","Product solution shown","Social proof injection","Specific outcome","CTA repeated 2×","Caption mirrors audio","Native UGC feel"],
      beforeAfter: {
        before: ["2 creatives in rotation","No hook system","CTR 0.6%","CPM rising weekly"],
        after: ["12+ creatives, batched weekly","30+ hook bank","CTR 1.9%","CPM stable, ROAS climbing"],
      },
      caseStudy: {
        title: "Beauty brand: UGC angle stack → 4.1× ROAS",
        problem: "Flat creatives, scaling killed ROAS.",
        strategy: "10 UGC angles in 3 weeks, daily reads, winners iterated.",
        result: "ROAS 1.8× → 4.1×, CPM dropped 22%, spend 3×.",
        metrics: [{ label: "ROAS", value: "1.8× → 4.1×" }, { label: "Spend", value: "3×" }, { label: "CPM", value: "-22%" }],
      },
      ctaTitle: "Need creatives that actually print revenue?",
    }} />
  ),
});
