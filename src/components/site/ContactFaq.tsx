import { useState } from "react";
import { z } from "zod";
import { Mail, Phone, MapPin, Plus, Minus, Send } from "lucide-react";
import { toast } from "sonner";
import { faqs } from "./faqs-data";

export { faqs } from "./faqs-data";
export { faqJsonLd } from "@/lib/seo";


const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  store: z.string().trim().max(255).optional().or(z.literal("")),
  message: z.string().trim().min(5, "Tell us a bit more").max(1000),
});

export default function ContactFaq() {
  const [open, setOpen] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const parsed = schema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      store: fd.get("store"),
      message: fd.get("message"),
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      setStatus("error");
      return;
    }
    setSubmitting(true);
    setStatus("idle");
    setTimeout(() => {
      setSubmitting(false);
      setStatus("success");
      toast.success("Thanks! We'll reply within 24h.");
      form.reset();
    }, 700);
  }

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-primary/10 blur-[140px] rounded-full" />
      <div className="absolute -bottom-32 -right-32 w-[420px] h-[420px] bg-accent/30 blur-[140px] rounded-full" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-left md:text-center max-w-2xl md:mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
            Let's Talk
          </div>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-ink leading-tight">
            Get in touch & <span className="text-gradient">get answers</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Send us your store details - or scroll the most common questions founders ask before booking.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* LEFT - CONTACT FORM */}
          <div className="order-2 lg:order-1 card-surface p-6 md:p-8 rounded-3xl shadow-xl">
            {status === "success" ? (
              <div className="text-center py-6">
                <div className="mx-auto w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center text-2xl">✓</div>
                <h3 className="mt-4 text-xl font-bold text-ink">Thanks — we'll be in touch within 24 hours (weekdays only).</h3>
                <p className="mt-2 text-sm text-muted-foreground">In the meantime, reply directly to <a className="text-primary font-semibold" href="mailto:info@beingecom.com">info@beingecom.com</a> if it's urgent.</p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-ink">Tell us about your store</h3>
                <p className="text-sm text-muted-foreground mt-1">We reply within 24 hours, every weekday.</p>

                <form onSubmit={onSubmit} className="mt-6 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-ink/70 uppercase tracking-wide">Full Name</label>
                      <input
                        name="name"
                        required
                        maxLength={100}
                        placeholder="Jane Doe"
                        className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-ink/70 uppercase tracking-wide">Email</label>
                      <input
                        type="email"
                        name="email"
                        required
                        maxLength={255}
                        placeholder="jane@brand.com"
                        className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-ink/70 uppercase tracking-wide">Store URL</label>
                    <input
                      name="store"
                      maxLength={255}
                      placeholder="https://yourstore.com"
                      className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-ink/70 uppercase tracking-wide">What do you need help with?</label>
                    <textarea
                      name="message"
                      required
                      maxLength={1000}
                      rows={4}
                      placeholder="Monthly revenue, current ad spend, biggest bottleneck..."
                      className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex btn btn-primary btn-shimmer w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Sending..." : (<>Send Message <Send className="w-4 h-4" /></>)}
                  </button>

                  {status === "error" && (
                    <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
                      Something went wrong. Please email us directly at <a className="underline" href="mailto:info@beingecom.com">info@beingecom.com</a>
                    </div>
                  )}
                </form>

                <div className="mt-6 pt-6 border-t border-border grid sm:grid-cols-2 gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /><span>info@beingecom.com</span></div>
                  <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /><span>London HQ · Remote team</span></div>
                </div>
              </>
            )}
          </div>

          {/* RIGHT - FAQ */}
          <div className="order-1 lg:order-2">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary">
              Common Questions
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-ink leading-tight">
              The things founders <span className="text-sky-gradient">always ask us</span>
            </h3>

            <div className="mt-6 space-y-3">
              {faqs.map((f, i) => {
                const isOpen = open === i;
                return (
                  <div
                    key={f.q}
                    className={`card-surface rounded-2xl transition-all duration-300 ${isOpen ? "shadow-xl ring-1 ring-primary/20" : "hover:shadow-md"}`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="font-semibold text-ink text-sm md:text-base">{f.q}</span>
                      <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${isOpen ? "bg-primary text-white" : "bg-primary/10 text-primary"}`}>
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </span>
                    </button>
                    <div
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
        </div>
      </div>
    </section>
  );
}
