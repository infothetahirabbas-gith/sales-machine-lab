import { createFileRoute } from "@tanstack/react-router";
import ServicePage from "../components/site/ServicePage";
import { serviceJsonLd, breadcrumbJsonLd, faqJsonLd, type FAQ } from "../lib/seo";
import heroImg from "../assets/hero-seo-growth.jpg";

const FAQ_LIST: FAQ[] = [
  { q: "What is AEO?", a: "Answer Engine Optimisation — optimising your store to be cited by AI answer engines like Google AI Overviews, ChatGPT, Perplexity, Gemini and Claude." },
  { q: "How is AEO different from SEO?", a: "SEO wins the blue link. AEO wins the citation inside the AI answer. Different structure, different content, different measurement." },
  { q: "Can you actually rank in AI Overviews?", a: "Yes — with entity SEO, structured data, answer-first content, citation-worthy sources and topical authority. We measure it via SGE tracking tools." },
  { q: "What content structure works for AEO?", a: "Direct answer first (30–60 words), followed by supporting detail, structured lists, FAQs and schema. Answer, then explain." },
  { q: "Which AI engines matter for UK ecommerce?", a: "Google AI Overviews (biggest volume), ChatGPT Search, Perplexity, Gemini and Claude — in that order for most UK DTC brands." },
];

export const Route = createFileRoute("/services/seo/aeo")({
  head: () => ({
    meta: [
      { title: "AEO / GEO Agency UK — Answer Engine Optimisation for AI Search | BeingEcom" },
      { name: "description", content: "AEO and GEO services in the UK. Get cited in Google AI Overviews, ChatGPT, Perplexity, Gemini and Claude with entity SEO, schema and answer-first content." },
      { property: "og:title", content: "AEO / GEO Agency UK — Answer Engine Optimisation for AI Search | BeingEcom" },
      { property: "og:description", content: "AEO and GEO services in the UK. Get cited in Google AI Overviews, ChatGPT, Perplexity, Gemini and Claude with entity SEO, schema and answer-first content." },
      { property: "og:url", content: "https://beingecom.com/services/seo/aeo" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://beingecom.com/services/seo/aeo" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd({ slug: "seo/aeo", name: "Answer Engine Optimisation (AEO)", description: "AEO / GEO for AI search — Google AI Overviews, ChatGPT, Perplexity, Gemini, Claude." })) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Ecommerce SEO", path: "/services/seo" }, { name: "AEO", path: "/services/seo/aeo" }])) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(FAQ_LIST, "/services/seo/aeo")) },
    ],
  }),
  component: () => (
    <ServicePage cfg={{
      slug: "seo-aeo",
      eyebrow: "AEO / Generative Search Optimisation",
      heroImage: heroImg,
      heroTitle: "Get cited by ChatGPT, Perplexity and Google AI Overviews.",
      heroSub: "Answer Engine Optimisation for ecommerce — entity SEO, schema and answer-first content built for AI search.",
      problemTitle: "Why traditional SEO alone is losing traffic.",
      problemBullets: [
        "AI Overviews eating top-of-funnel blue-link clicks.",
        "ChatGPT and Perplexity citing competitors, not you.",
        "Content structured for humans, not answer engines.",
      ],
      whatIsTitle: "AEO is the next SEO — not a replacement.",
      whatIsBody: "Answer engines pull citations from a smaller pool of trusted, structured, entity-verified sources. AEO gets your brand into that pool so you appear inside the AI answer — the new zero-click winner.",
      systemTitle: "Our AEO system.",
      systemSteps: [
        { title: "Entity foundation", body: "Wikidata, brand knowledge panel, sameAs graph, Organization schema." },
        { title: "Query mining", body: "Real prompts users ask ChatGPT / Perplexity / Gemini about your niche." },
        { title: "Answer-first content", body: "Direct answers, structured lists, FAQs, citation-worthy stats." },
        { title: "SGE tracking", body: "Monitor AI Overview + AI-engine citations weekly." },
      ],
      pillarsTitle: "Pillars of AEO.",
      pillars: [
        { title: "Entities", body: "Brand as a known entity across the web graph." },
        { title: "Structure", body: "Answer, then explain. Lists, tables, FAQs." },
        { title: "Schema", body: "FAQ, HowTo, Product, Organization, Article." },
        { title: "Authority", body: "Cited sources, real data, expert bylines." },
      ],
      deepBlocks: [
        { title: "Entity SEO", body: "Wikidata, Knowledge Graph, sameAs, Organization + Person schema.", tags: ["Wikidata","Knowledge Graph","sameAs"] },
        { title: "AI prompt research", body: "Real prompts from ChatGPT, Perplexity, Gemini, Claude — mapped to your funnel.", tags: ["ChatGPT","Perplexity","Prompts"] },
        { title: "Answer-first content", body: "Direct 30–60 word answers up top, structured detail below.", tags: ["Answer","Structure","Lists"] },
        { title: "FAQ & HowTo schema", body: "Machine-readable answers AI engines love to cite.", tags: ["FAQ","HowTo","JSON-LD"] },
        { title: "Citation-worthy assets", body: "Original data, expert quotes, first-party research.", tags: ["Data","Quotes","Research"] },
        { title: "SGE / AI citation tracking", body: "Weekly monitoring across AI Overviews and answer engines.", tags: ["SGE","Overviews","Tracking"] },
      ],
      triggersTitle: "AI engines we optimise for.",
      triggers: ["Google AI Overviews","ChatGPT Search","Perplexity","Gemini","Claude","Meta AI","Bing Copilot","You.com"],
      beforeAfter: {
        before: ["Zero AI Overview citations","No Knowledge Graph presence","Long-form 'story' content","No FAQ schema"],
        after: ["Cited in 41 AI Overviews","Brand knowledge panel live","Answer-first + structured","FAQ schema across hub content"],
      },
      caseStudy: {
        title: "Beauty brand: 41 AI Overview citations in 120 days",
        problem: "Losing clicks to AI answers, cited nowhere.",
        strategy: "Entity setup, prompt research, 22 answer-first hubs, FAQ + HowTo schema.",
        result: "41 AI Overview citations, Perplexity + ChatGPT citations tracked, AI-referred sessions +180%.",
        metrics: [{ label: "AIO citations", value: "41" }, { label: "AI sessions", value: "+180%" }, { label: "Days", value: "120" }],
      },
      ctaTitle: "Own the AI answer — not just the blue link.",
      impactStats: [
        { value: "41", label: "AIO citations" },
        { value: "+180%", label: "AI-referred sessions" },
        { value: "5", label: "AI engines cited" },
      ],
      metricBars: [
        { label: "AI Overview citations", before: 0, after: 41, description: "Times your domain is cited in Google AI Overviews for tracked queries." },
        { label: "ChatGPT / Perplexity citations", before: 2, after: 58, description: "Domain citations tracked across ChatGPT Search + Perplexity." },
        { label: "Answer-first pages", before: 0, after: 22, description: "Hub pages restructured with 30–60 word direct answers." },
        { label: "AI-referred sessions", before: 100, after: 280, unit: "%", description: "Sessions from AI engines vs baseline." },
      ],
      faqs: FAQ_LIST,
    }} />
  ),
});
