import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

const WHATSAPP_NUMBER = "923186230122";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi BeingEcom — I'd like to chat about growing my store.")}`;

const QUICK_REPLIES = [
  "I have a Shopify store",
  "I'm planning to launch",
  "I need more traffic & sales",
  "Book a consultation",
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
      {/* WhatsApp */}
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
            <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.945 2.722.945.817 0 2.15-.515 2.478-1.318.13-.314.213-.66.213-1.005 0-.143-.04-.286-.07-.42-.116-.196-1.99-1.062-2.05-1.062zm-2.94 6.7c-5.405 0-9.79-4.385-9.79-9.79s4.385-9.79 9.79-9.79 9.79 4.385 9.79 9.79c0 5.405-4.385 9.79-9.79 9.79zm0-18.85c-5.005 0-9.06 4.054-9.06 9.06 0 1.745.502 3.405 1.376 4.825L6 26.085l5.305-1.392c1.36.75 2.913 1.175 4.866 1.175 5.006 0 9.062-4.055 9.062-9.06 0-5.007-4.056-9.062-9.062-9.062z" />
          </svg>
        </span>
      </a>

      {/* Chatbot */}
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
        <div className="fixed bottom-6 right-6 z-50 w-[92vw] max-w-sm h-[560px] max-h-[80vh] rounded-2xl bg-white shadow-2xl border border-border flex flex-col overflow-hidden animate-scale-in">
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
                Something went wrong. Please try again or contact us on WhatsApp.
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
              className="flex-1 px-3 py-2 rounded-full bg-secondary/60 border border-border text-sm outline-none focus:border-primary"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
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
