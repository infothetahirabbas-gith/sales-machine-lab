import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Loader2, Mail } from "lucide-react";
import { saveAuditLead } from "../../lib/store-audit.functions";
import { Button } from "../ui/button";

export default function AuditLeadForm({ website, overallScore }: { website: string; overallScore: number }) {
  const submitLead = useServerFn(saveAuditLead);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [goal, setGoal] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (done) {
    return (
      <div className="card-surface p-6 border-emerald-500/30 bg-emerald-500/5 flex items-start gap-3">
        <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
        <div>
          <h3 className="font-bold text-ink">Thanks {name.split(" ")[0]} - your report is on its way</h3>
          <p className="text-sm text-muted-foreground mt-1">
            A senior strategist will review this audit and email you the annotated version, usually within one working day.
          </p>
        </div>
      </div>
    );
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setError(null);
    try {
      await submitLead({ data: { name, email, company: company || null, website, goal: goal || null, overallScore } });
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="card-surface p-6 lg:p-8 border-primary/30 bg-gradient-to-br from-primary/5 via-card to-card">
      <div className="flex items-center gap-2.5 mb-1">
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center"><Mail className="w-4.5 h-4.5 text-primary" /></div>
        <h3 className="text-lg font-bold text-ink">Email me this report, annotated by a strategist</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        We will send the full audit as a PDF plus the three fixes we would prioritise for your store. No obligation.
      </p>
      <div className="grid sm:grid-cols-2 gap-3">
        <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name"
          className="px-4 py-3 rounded-lg bg-secondary/50 border border-border focus:border-primary outline-none text-sm" />
        <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Work email"
          className="px-4 py-3 rounded-lg bg-secondary/50 border border-border focus:border-primary outline-none text-sm" />
        <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company (optional)"
          className="px-4 py-3 rounded-lg bg-secondary/50 border border-border focus:border-primary outline-none text-sm" />
        <select value={goal} onChange={(e) => setGoal(e.target.value)}
          className="px-4 py-3 rounded-lg bg-secondary/50 border border-border focus:border-primary outline-none text-sm">
          <option value="">Main goal (optional)</option>
          <option value="More organic traffic">More organic traffic</option>
          <option value="Better paid ads ROAS">Better paid ads ROAS</option>
          <option value="Higher conversion rate">Higher conversion rate</option>
          <option value="Retention and repeat purchase">Retention and repeat purchase</option>
          <option value="Full growth partner">Full growth partner</option>
        </select>
      </div>
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
      <Button type="submit" size="lg" className="mt-4 w-full sm:w-auto" disabled={busy}>
        {busy ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : "Send me the annotated report"}
      </Button>
      <p className="mt-3 text-[11px] text-muted-foreground">
        We store your details securely and only use them to send this report and follow up once. Audited site: {website}
      </p>
    </form>
  );
}
