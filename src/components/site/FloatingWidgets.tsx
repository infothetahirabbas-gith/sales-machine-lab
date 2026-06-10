import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";

const WHATSAPP_NUMBER = "923186230122";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi BeingEcom — I'd like to chat about growing my store.")}`;

type Msg = { role: "bot" | "user"; text: string; cta?: { label: string; href: string } };

const QUICK_REPLIES = [
  "How can I audit my store?",
  "What do you charge?",
  "Do you do Shopify SEO?",
  "Book a strategy call",
];

function getBotReply(input: string): Msg {
  const q = input.toLowerCase();
  if (/(audit|analy|review|check.*store|scan)/.test(q)) {
    return {
      role: "bot",
      text: "Sure — here's how our free audit works:\n\n1. Paste your store URL.\n2. Our Being Ecom Brain™ scans 17 phases (SEO, ads, CRO, brand, leakage).\n3. You get scores, issues, and a 90-day plan.\n4. Export as PDF/Excel/CSV.\n5. Free, no signup.",
      cta: { label: "Run free audit →", href: "/audit" },
    };
  }
  if (/(price|pricing|cost|charge|fee|package)/.test(q)) {
    return {
      role: "bot",
      text: "We have 3 engagement tiers:\n\n• CRO Sprint — quick wins\n• Growth System — full ads + CRO + SEO\n• Full Partnership — fractional growth team",
      cta: { label: "See pricing →", href: "/pricing" },
    };
  }
  if (/(seo|rank|google|organic)/.test(q)) {
    return {
      role: "bot",
      text: "Yes — we do ecommerce SEO for Shopify & WooCommerce:\n\n• Technical fixes\n• Collection/product on-page\n• Content authority\n• Schema & rich results",
      cta: { label: "SEO service →", href: "/services/seo" },
    };
  }
  if (/(ads|meta|facebook|google ads|tiktok|paid)/.test(q)) {
    return {
      role: "bot",
      text: "Paid ads done right:\n\n• Meta, Google, TikTok\n• Creative testing\n• Profit-led ROAS\n• Avg 4.1× lift",
      cta: { label: "Paid ads service →", href: "/services/paid-ads" },
    };
  }
  if (/(cro|conversion|checkout|cart)/.test(q)) {
    return {
      role: "bot",
      text: "CRO essentials we ship:\n\n• PDP & checkout fixes\n• A/B tests\n• Trust & social proof\n• Mobile UX",
      cta: { label: "CRO service →", href: "/services/cro" },
    };
  }
  if (/(call|book|talk|consult|contact|meeting|demo)/.test(q)) {
    return {
      role: "bot",
      text: "Happy to chat. A strategy call covers:\n\n• Your current revenue & spend\n• Where you're leaking money\n• A 90-day plan\n• Free, 30 mins",
      cta: { label: "Book strategy call →", href: "/contact" },
    };
  }
  if (/(case|result|proof|portfolio)/.test(q)) {
    return {
      role: "bot",
      text: "120+ stores scaled, $48M+ tracked. A few wins:\n\n• +312% revenue\n• 4.1× ROAS lift\n• 400+ A/B tests",
      cta: { label: "See case studies →", href: "/case-studies" },
    };
  }
  if (/(hi|hello|hey|salam|hola)/.test(q)) {
    return { role: "bot", text: "Hey 👋 I'm the Being Ecom Assistant. Ask me about audits, pricing, SEO, ads, or book a call." };
  }
  return {
    role: "bot",
    text: "Got it. The fastest way to get a clear answer is a free audit — it shows scores, leaks, and a 90-day plan.",
    cta: { label: "Run free audit →", href: "/audit" },
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
