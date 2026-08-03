import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
const WHATSAPP_NUMBER = "447882743592";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi BeingEcom - I'd like to talk about growing my store.")}`;

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

const QUICK_REPLIES = [
  "Book a Free Audit",
  "Explore Our Services",
  "View Case Studies",
  "Talk to an Expert",
];

const transport = new DefaultChatTransport({ api: "/api/chat" });

export default function FloatingWidgets() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    transport,
    messages: [
      {
        id: "welcome",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "Hello and welcome to Being Ecom 👋\n\nI'm your Ecommerce Growth Assistant. How can I help you today?\n\nDo you currently have an ecommerce store, or are you planning to launch one?",
          },
        ],
      },
    ],
  });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, open]);

  useEffect(() => {
    if (open && !isLoading) inputRef.current?.focus();
  }, [open, isLoading, messages.length]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t || isLoading) return;
    setInput("");
    void sendMessage({ text: t });
  };

  const renderText = (m: (typeof messages)[number]) =>
    m.parts.map((p, i) => (p.type === "text" ? <span key={i}>{p.text}</span> : null));

  return (
    <>
      {/* WhatsApp - bottom-left */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with BeingEcom on WhatsApp"
        className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 group wa-float"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-ping" />
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-pulse" />
        <span className="relative flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white shadow-2xl shadow-[#25D366]/50 group-hover:scale-110 group-hover:shadow-[#25D366]/70 transition-all duration-300 wa-wiggle">
          <svg viewBox="0 0 32 32" className="w-6 h-6 sm:w-8 sm:h-8 drop-shadow-sm" fill="currentColor" aria-hidden="true">
            <path d="M19.11 17.28c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.09 4.49.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35zM16.03 5.33c-5.9 0-10.68 4.78-10.68 10.68 0 1.88.49 3.72 1.43 5.34l-1.52 5.55 5.69-1.49a10.66 10.66 0 0 0 5.08 1.29h.01c5.89 0 10.67-4.78 10.67-10.68 0-2.85-1.11-5.53-3.13-7.55a10.63 10.63 0 0 0-7.55-3.14zm0 19.37h-.01a8.87 8.87 0 0 1-4.52-1.24l-.32-.19-3.37.88.9-3.29-.21-.34a8.85 8.85 0 0 1-1.36-4.72c0-4.9 3.99-8.88 8.9-8.88 2.38 0 4.61.93 6.29 2.61a8.83 8.83 0 0 1 2.61 6.29c0 4.9-3.99 8.88-8.9 8.88z"/>
          </svg>
        </span>
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white animate-pulse" />
        {/* Tooltip label */}
        <span className="wa-label pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-ink text-white text-xs font-semibold px-3 py-1.5 shadow-lg opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 hidden sm:block">
          Chat on WhatsApp
          <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-ink" />
        </span>
      </a>

      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open chat assistant"
          className="fixed bottom-6 right-6 z-50 group"
        >
          <span className="absolute inset-0 rounded-full bg-primary opacity-50 animate-ping" />
          <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-primary text-white shadow-2xl shadow-primary/40 hover:scale-110 transition-transform duration-300">
            <MessageCircle className="w-7 h-7" />
          </span>
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white animate-pulse" />
        </button>
      )}

      {open && (
        <div className="fixed bottom-4 right-3 left-3 sm:left-auto sm:right-6 sm:bottom-6 z-50 sm:w-[92vw] sm:max-w-sm h-[560px] max-h-[80vh] rounded-2xl bg-white shadow-2xl border border-border flex flex-col overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 px-4 py-3 bg-primary text-white">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white" />
              </div>
              <div className="min-w-0">
                <div className="font-bold text-sm leading-tight truncate">Being Ecom Assistant</div>
                <div className="text-[11px] text-white/80 leading-tight">Online · AI-powered</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close" className="p-1 rounded-md hover:bg-white/15 transition">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-secondary/30">
            {messages.map((m) => {
              const isUser = (m.role as string) === "user";
              return (
                <div key={m.id} className={`flex ${isUser ? "justify-end" : "justify-start"} animate-fade-in`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm whitespace-pre-line shadow-sm ${
                      isUser
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-white text-ink border border-border rounded-bl-sm"
                    }`}
                  >
                    {renderText(m)}
                  </div>
                </div>
              );
            })}
            {isLoading && (
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
            {error && (
              <div className="text-xs text-destructive bg-destructive/10 border border-destructive/30 rounded-lg px-3 py-2">
                Something went wrong. Please try again in a moment.
              </div>
            )}
            <SmartCTAs messages={messages} isLoading={isLoading} />
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
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 p-3 border-t border-border bg-white"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question…"
              className="flex-1 min-w-0 px-3 py-2 rounded-full bg-secondary/60 border border-border text-sm outline-none focus:border-primary"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              aria-label="Send"
              className="shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-md disabled:opacity-50 hover:scale-105 active:scale-95 transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

type Msg = { id: string; role: string; parts: { type: string; text?: string }[] };

function SmartCTAs({ messages, isLoading }: { messages: Msg[]; isLoading: boolean }) {
  if (isLoading || messages.length < 2) return null;
  const last = [...messages].reverse().find((m) => m.role === "user" || m.role === "assistant");
  if (!last) return null;

  // Look at the most recent user message (drives intent)
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  const text = (lastUser?.parts || []).map((p) => p.text || "").join(" ").toLowerCase();
  if (!text) return null;

  const ctas: { label: string; href: string; external?: boolean }[] = [];
  const push = (c: { label: string; href: string; external?: boolean }) => {
    if (!ctas.some((x) => x.href === c.href)) ctas.push(c);
  };

  if (/(audit|review|scan|check.*store|analy[sz]e)/.test(text)) push({ label: "Run free audit", href: "/audit" });
  if (/(price|pricing|cost|budget|how much|fee|rates?)/.test(text)) push({ label: "See pricing", href: "/pricing" });
  if (/(book|call|consult|meeting|demo|talk|strategy)/.test(text)) push({ label: "Book a call", href: "https://beingecom.com/contact-us/", external: true });
  if (/(seo|rank|google|organic)/.test(text)) push({ label: "SEO services", href: "/services/seo" });
  if (/(ads?|meta|facebook|google ads|tiktok|roas|paid)/.test(text)) push({ label: "Paid Ads", href: "/services/performance-marketing" });
  if (/(cro|conversion|checkout|pdp|cart)/.test(text)) push({ label: "CRO services", href: "/services/cro" });
  if (/(email|klaviyo|sms|flow)/.test(text)) push({ label: "Email & SMS", href: "/services/email-sms" });
  if (/(case stud|results|wins|portfolio|examples)/.test(text)) push({ label: "Case studies", href: "/case-studies" });
  if (/(whatsapp|chat now|message)/.test(text)) push({ label: "WhatsApp us", href: WHATSAPP_URL, external: true });

  // Default fallback after 2+ exchanges
  if (ctas.length === 0 && messages.length >= 4) {
    push({ label: "Run free audit", href: "/audit" });
    push({ label: "Book a call", href: "https://beingecom.com/contact-us/", external: true });
  }
  if (ctas.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5 px-1 pt-1 animate-fade-in">
      {ctas.slice(0, 3).map((c) => (
        <a
          key={c.href}
          href={c.href}
          target={c.external ? "_blank" : undefined}
          rel={c.external ? "noopener noreferrer" : undefined}
          className="text-[11px] font-semibold px-2.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-white transition"
        >
          {c.label} →
        </a>
      ))}
    </div>
  );
}
