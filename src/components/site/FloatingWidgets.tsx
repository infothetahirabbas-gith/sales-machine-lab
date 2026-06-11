import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";

const WHATSAPP_NUMBER = "923186230122";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi BeingEcom — I'd like to chat about growing my store.")}`;

type Cta = { label: string; href: string };
type Msg = { role: "bot" | "user"; text: string; ctas?: Cta[] };

const QUICK_REPLIES = [
  "How can I audit my store?",
  "Show me pricing",
  "What services do you offer?",
  "Show case studies",
  "Book a strategy call",
];

type Intent = {
  match: RegExp;
  reply: (q: string) => { text: string; ctas?: Cta[] };
};

const INTENTS: Intent[] = [
  {
    match: /(hi|hello|hey|salam|hola|good (morning|evening|afternoon))/i,
    reply: () => ({
      text: "Hey 👋 I'm the Being Ecom Assistant. I can help with:\n\n• Free store audit\n• Pricing & packages\n• Services (SEO, ads, CRO, email)\n• Case studies & results\n• Booking a strategy call\n\nWhat would you like to start with?",
    }),
  },
  {
    match: /(audit|analy[sz]e|review|scan|check.*store|store.*report)/i,
    reply: () => ({
      text: "Here's how the free Being Ecom Brain™ audit works:\n\n1. Open the audit page.\n2. Paste your store URL.\n3. Pick revenue, ad spend & country (optional).\n4. We scan 17 phases — SEO, ads, CRO, brand, leakage.\n5. You get scores, charts, issues & a 90-day plan.\n6. Export as PDF, Excel, CSV or JSON.\n\nFree, no signup, ~30 seconds.",
      ctas: [{ label: "Run free audit →", href: "/audit" }],
    }),
  },
  {
    match: /(price|pricing|cost|charge|fee|package|plan|how much|budget)/i,
    reply: () => ({
      text: "We have 3 engagement tiers:\n\n• CRO Sprint — quick conversion wins\n• Growth System — ads + CRO + SEO bundle\n• Full Partnership — fractional growth team\n\nFull details + what's included on the pricing page.",
      ctas: [{ label: "See pricing →", href: "/pricing" }, { label: "Book a call →", href: "/contact" }],
    }),
  },
  {
    match: /(seo|rank|google|organic|search engine)/i,
    reply: () => ({
      text: "Ecommerce SEO we ship:\n\n• Technical fixes (speed, schema, crawl)\n• Collection & PDP on-page\n• Content authority & internal links\n• Rich results (Product, FAQ, Review)\n\nWorks on Shopify & WooCommerce.",
      ctas: [{ label: "SEO service →", href: "/services/seo" }, { label: "Free SEO check →", href: "/audit" }],
    }),
  },
  {
    match: /(ads|meta|facebook|google ads|tiktok|paid|ppc|roas)/i,
    reply: () => ({
      text: "Paid ads, profit-led:\n\n• Meta, Google, TikTok\n• Creative testing system\n• Profit-aware ROAS targets\n• Avg 4.1× ROAS lift across 120+ stores",
      ctas: [{ label: "Paid ads service →", href: "/services/paid-ads" }, { label: "Book a call →", href: "/contact" }],
    }),
  },
  {
    match: /(cro|conversion|checkout|cart|abandon|a\/?b test)/i,
    reply: () => ({
      text: "CRO essentials we ship:\n\n• PDP & checkout audit + fixes\n• A/B testing roadmap (400+ tests run)\n• Trust, social proof, scarcity\n• Mobile UX & speed",
      ctas: [{ label: "CRO service →", href: "/services/cro" }],
    }),
  },
  {
    match: /(email|sms|klaviyo|flow|automation|newsletter)/i,
    reply: () => ({
      text: "Email & SMS retention:\n\n• Klaviyo / Postscript / Attentive setup\n• Welcome, browse, cart, post-purchase flows\n• Win-back & VIP segments\n• Typically 20–35% of revenue from flows",
      ctas: [{ label: "Email & SMS service →", href: "/services/email-sms" }],
    }),
  },
  {
    match: /(creative|video|ugc|content|design)/i,
    reply: () => ({
      text: "Creative production for ads:\n\n• UGC & static\n• Hook-first scripting\n• Iteration based on ad data",
      ctas: [{ label: "Creative service →", href: "/services/creative" }],
    }),
  },
  {
    match: /(analytics|tracking|ga4|pixel|attribution|data)/i,
    reply: () => ({
      text: "Analytics setup we do:\n\n• GA4, Meta CAPI, server-side tracking\n• Attribution modelling\n• Profit dashboards",
      ctas: [{ label: "Analytics service →", href: "/services/analytics" }],
    }),
  },
  {
    match: /(funnel|landing|page builder|advertorial)/i,
    reply: () => ({
      text: "Funnels we build:\n\n• Advertorials & landers\n• Quiz funnels\n• Upsell / downsell flows",
      ctas: [{ label: "Funnel service →", href: "/services/funnel" }],
    }),
  },
  {
    match: /(scal|7[- ]?figure|8[- ]?figure|grow.*fast)/i,
    reply: () => ({
      text: "Scaling stores past 7-figures:\n\n• Profit-led ad scaling\n• CRO + retention compounding\n• New market expansion",
      ctas: [{ label: "Scaling service →", href: "/services/scaling" }],
    }),
  },
  {
    match: /(store dev|build.*store|shopify dev|woo.*dev|theme|web dev)/i,
    reply: () => ({
      text: "Store development:\n\n• Shopify & WooCommerce builds\n• CRO-led theme customisation\n• Speed, mobile & checkout fixes",
      ctas: [{ label: "Store development →", href: "/services/store-development" }],
    }),
  },
  {
    match: /(service|what.*do|offer|capabilit)/i,
    reply: () => ({
      text: "Our services:\n\n• Paid Ads · SEO · CRO\n• Email & SMS · Creative\n• Analytics · Funnels · Scaling\n• Store Development\n\nAll built around one Growth System.",
      ctas: [{ label: "See all services →", href: "/services" }],
    }),
  },
  {
    match: /(case|result|portfolio|proof|client|win)/i,
    reply: () => ({
      text: "120+ stores scaled · $48M+ tracked revenue:\n\n• +312% revenue lifts\n• 4.1× avg ROAS lift\n• 400+ A/B tests\n• Clutch top-rated",
      ctas: [{ label: "See case studies →", href: "/case-studies" }],
    }),
  },
  {
    match: /(about|team|founder|who.*you|tahir)/i,
    reply: () => ({
      text: "BeingEcom is led by Tahir Abbas — founder & CEO. Specialist team across ads, SEO, CRO, creative and retention.",
      ctas: [{ label: "About us →", href: "/about" }],
    }),
  },
  {
    match: /(call|book|talk|consult|contact|meeting|demo|schedule)/i,
    reply: () => ({
      text: "Happy to chat. A 30-min strategy call covers:\n\n1. Current revenue & ad spend\n2. Where you're leaking money\n3. Top 3 quick wins\n4. A 90-day growth plan\n\nFree, no obligation.",
      ctas: [{ label: "Book strategy call →", href: "/contact" }],
    }),
  },
  {
    match: /(faq|question|help)/i,
    reply: () => ({
      text: "Common questions live on the contact page FAQ. For anything specific, ask me here or book a call.",
      ctas: [{ label: "Contact & FAQ →", href: "/contact" }],
    }),
  },
  {
    match: /(glossary|term|definition)/i,
    reply: () => ({
      text: "We have an ecommerce glossary explaining ROAS, AOV, LTV, CAC and more.",
      ctas: [{ label: "Open glossary →", href: "/glossary" }],
    }),
  },
  {
    match: /(thank|thanks|ty|appreciate)/i,
    reply: () => ({ text: "You're very welcome 🙏 Anything else I can help with — audit, pricing, or a call?" }),
  },
  {
    match: /(bye|goodbye|see ya|talk later)/i,
    reply: () => ({ text: "Take care! Whenever you're ready, the free audit is the fastest way to start. 👋", ctas: [{ label: "Run free audit →", href: "/audit" }] }),
  },
];

function getBotReply(input: string): Msg {
  const q = input.trim();
  for (const intent of INTENTS) {
    if (intent.match.test(q)) {
      const r = intent.reply(q);
      return { role: "bot", text: r.text, ctas: r.ctas };
    }
  }
  return {
    role: "bot",
    text: "Good question. The fastest way to get a clear answer for your store is a free audit — it shows scores, leaks and a 90-day plan in under a minute.\n\nOr ask me about: services, pricing, case studies, or booking a call.",
    ctas: [{ label: "Run free audit →", href: "/audit" }, { label: "See pricing →", href: "/pricing" }],
  };
}

export default function FloatingWidgets() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "bot", text: "Hi 👋 I'm the Being Ecom Assistant. How can I help — audit, pricing, or a quick call?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing, open]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Msg = { role: "user", text: text.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, getBotReply(text)]);
      setTyping(false);
    }, 700);
  };

  return (
    <>
      {/* WhatsApp — left side */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 left-6 z-50 group"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-ping" />
        <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-2xl shadow-[#25D366]/40 hover:scale-110 transition-transform duration-300">
          <svg viewBox="0 0 32 32" className="w-7 h-7" fill="currentColor" aria-hidden="true">
            <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.945 2.722.945.817 0 2.15-.515 2.478-1.318.13-.314.213-.66.213-1.005 0-.143-.04-.286-.07-.42-.116-.196-1.99-1.062-2.05-1.062zm-2.94 6.7c-5.405 0-9.79-4.385-9.79-9.79s4.385-9.79 9.79-9.79 9.79 4.385 9.79 9.79c0 5.405-4.385 9.79-9.79 9.79zm0-18.85c-5.005 0-9.06 4.054-9.06 9.06 0 1.745.502 3.405 1.376 4.825L6 26.085l5.305-1.392c1.36.75 2.913 1.175 4.866 1.175 5.006 0 9.062-4.055 9.062-9.06 0-5.007-4.056-9.062-9.062-9.062z"/>
          </svg>
        </span>
      </a>

      {/* Chatbot — right side */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open chat assistant"
          className="fixed bottom-6 right-6 z-50 group"
        >
          <span className="absolute inset-0 rounded-full bg-primary opacity-50 animate-ping" />
          <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-primary to-[oklch(0.6_0.18_245)] text-white shadow-2xl shadow-primary/40 hover:scale-110 transition-transform duration-300">
            <MessageCircle className="w-7 h-7" />
          </span>
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white animate-pulse" />
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[92vw] max-w-sm h-[560px] max-h-[80vh] rounded-2xl bg-white shadow-2xl border border-border flex flex-col overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 px-4 py-3 bg-gradient-to-br from-primary to-[oklch(0.6_0.18_245)] text-white">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white" />
              </div>
              <div className="min-w-0">
                <div className="font-bold text-sm leading-tight truncate">Being Ecom Assistant</div>
                <div className="text-[11px] text-white/80 leading-tight">Online · replies instantly</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close" className="p-1 rounded-md hover:bg-white/15 transition">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-secondary/30">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}>
                <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm whitespace-pre-line shadow-sm ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-white text-ink border border-border rounded-bl-sm"
                }`}>
                  {m.text}
                  {m.cta && (
                    <a href={m.cta.href} className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline">
                      {m.cta.label}
                    </a>
                  )}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-white border border-border rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Quick replies */}
          {messages.length <= 1 && (
            <div className="px-3 pb-2 flex flex-wrap gap-1.5 bg-secondary/30">
              {QUICK_REPLIES.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="text-[11px] px-2.5 py-1.5 rounded-full bg-white border border-border hover:border-primary hover:text-primary transition"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Composer */}
          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="flex items-center gap-2 p-3 border-t border-border bg-white"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question…"
              className="flex-1 px-3 py-2 rounded-full bg-secondary/60 border border-border text-sm outline-none focus:border-primary"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Send"
              className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-50 hover:scale-105 transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
