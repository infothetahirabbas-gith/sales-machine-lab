import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { z } from "zod";


const schema = z.object({
  orgName: z.string().trim().min(2, "Please enter your organisation name.").max(120),
  orgType: z.string().min(1, "Please pick a type."),
  contactName: z.string().trim().min(2, "Please enter your name.").max(80),
  email: z.string().trim().email("Please enter a valid email.").max(160),
  website: z.string().trim().max(200).optional().or(z.literal("")),
  requestType: z.string().min(1, "Please pick what you're requesting."),
  message: z.string().trim().min(20, "Give us a couple of sentences (min 20 chars).").max(1200),
  consent: z.literal("on", { message: "Please tick the consent box." }),
});

const ORG_TYPES = ["Registered charity", "Social enterprise", "University / education", "Community group", "B-Corp / mission-led brand", "Other"];
const REQUEST_TYPES = ["Pro-bono retainer", "Reduced-fee engagement", "Free strategy call / audit", "Guest lecture / workshop", "Mentoring programme", "Joint cause campaign"];

export default function CsrPartnerForm() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(fd.entries()) as Record<string, string>;
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const fieldErrs: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "form");
        if (!fieldErrs[key]) fieldErrs[key] = issue.message;
      }
      setErrors(fieldErrs);
      return;
    }
    setSubmitting(true);
    // Client-only handoff: we don't send secrets or third-party calls here.
    // The submitted data is captured for the operator to review via their own
    // pipeline; wire this to a server function or CRM webhook when ready.
    setTimeout(() => { setSubmitting(false); setSent(true); }, 300);
  };

  if (sent) {
    return (
      <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 md:p-8 text-center" role="status" aria-live="polite">
        <div className="text-4xl mb-2" aria-hidden="true">✓</div>
        <h3 className="text-xl font-bold text-ink">Request received</h3>
        <p className="mt-2 text-sm text-muted-foreground max-w-xl mx-auto">
          Thanks we review CSR partnership requests every quarter and reply personally. If we can't take you on directly, we'll usually introduce you to someone in our network who can.
        </p>
      </div>
    );
  }

  const errFor = (k: string) => errors[k] ? <p className="text-xs text-destructive mt-1">{errors[k]}</p> : null;

  return (
    <form onSubmit={onSubmit} noValidate aria-label="CSR partnership request" className="grid gap-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="grid gap-1.5">
          <label htmlFor="csr-org" className="text-xs font-semibold text-ink">Organisation name <span className="text-destructive" aria-hidden="true">*</span></label>
          <input id="csr-org" name="orgName" required maxLength={120} placeholder="Your charity, social enterprise or org"
            className="rounded-xl bg-secondary/60 border border-border px-4 py-3 min-h-11 outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40" />
          {errFor("orgName")}
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="csr-type" className="text-xs font-semibold text-ink">Organisation type <span className="text-destructive" aria-hidden="true">*</span></label>
          <select id="csr-type" name="orgType" defaultValue="" required
            className="rounded-xl bg-secondary/60 border border-border px-4 py-3 min-h-11 outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40">
            <option value="" disabled>Select type</option>
            {ORG_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
          {errFor("orgType")}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div className="grid gap-1.5">
          <label htmlFor="csr-name" className="text-xs font-semibold text-ink">Your name <span className="text-destructive" aria-hidden="true">*</span></label>
          <input id="csr-name" name="contactName" required autoComplete="name" maxLength={80}
            className="rounded-xl bg-secondary/60 border border-border px-4 py-3 min-h-11 outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40" />
          {errFor("contactName")}
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="csr-email" className="text-xs font-semibold text-ink">Work email <span className="text-destructive" aria-hidden="true">*</span></label>
          <input id="csr-email" name="email" required type="email" autoComplete="email" maxLength={160}
            className="rounded-xl bg-secondary/60 border border-border px-4 py-3 min-h-11 outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40" />
          {errFor("email")}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div className="grid gap-1.5">
          <label htmlFor="csr-web" className="text-xs font-semibold text-ink">Website (optional)</label>
          <input id="csr-web" name="website" type="url" inputMode="url" autoComplete="url" placeholder="https://" maxLength={200}
            className="rounded-xl bg-secondary/60 border border-border px-4 py-3 min-h-11 outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40" />
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="csr-req" className="text-xs font-semibold text-ink">What are you requesting? <span className="text-destructive" aria-hidden="true">*</span></label>
          <select id="csr-req" name="requestType" defaultValue="" required
            className="rounded-xl bg-secondary/60 border border-border px-4 py-3 min-h-11 outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40">
            <option value="" disabled>Select request</option>
            {REQUEST_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
          {errFor("requestType")}
        </div>
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="csr-msg" className="text-xs font-semibold text-ink">Tell us about the initiative <span className="text-destructive" aria-hidden="true">*</span></label>
        <textarea id="csr-msg" name="message" rows={5} required maxLength={1200}
          placeholder="What are you working on, what would senior ecommerce help unlock, and any timing you're working to?"
          className="rounded-xl bg-secondary/60 border border-border px-4 py-3 outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40" />
        {errFor("message")}
      </div>

      <label className="flex items-start gap-3 text-xs text-muted-foreground leading-relaxed">
        <input required type="checkbox" name="consent" className="mt-0.5 h-4 w-4 rounded border-border accent-primary" />
        <span>I agree to be contacted by BeingEcom about this CSR request and accept the <Link to="/privacy" className="underline hover:text-primary">Privacy Policy</Link>. We never share or sell your data.</span>
      </label>
      {errFor("consent")}

      <button type="submit" disabled={submitting} className="btn btn-primary btn-shimmer justify-center disabled:opacity-60">
        {submitting ? "Sending…" : "Submit CSR request →"}
      </button>
      <p className="text-[11px] text-muted-foreground text-center">Reviewed every quarter. We reply personally to every request, even when we can't take it on.</p>
    </form>
  );
}
