import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

const KEY = "cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(KEY)) setVisible(true);
    } catch {}
  }, []);

  const set = (v: "accepted" | "rejected") => {
    try { window.localStorage.setItem(KEY, v); } catch {}
    setVisible(false);
  };

  if (!visible) return null;
  return (
    <div className="fixed inset-x-3 bottom-3 z-[60] sm:inset-x-auto sm:left-6 sm:right-6 sm:max-w-md">
      <div className="rounded-2xl bg-white border border-border shadow-2xl p-4 text-sm">
        <p className="text-ink font-semibold">We use cookies</p>
        <p className="mt-1 text-muted-foreground text-xs leading-relaxed">
          Strictly-necessary cookies keep the site working. Analytics cookies are optional and only set if you accept.
          Read our <Link to="/cookies" className="underline text-primary">Cookie Policy</Link>.
        </p>
        <div className="mt-3 flex gap-2">
          <button onClick={() => set("accepted")} className="flex-1 rounded-full bg-primary text-primary-foreground px-4 py-2 font-semibold text-xs">Accept all</button>
          <button onClick={() => set("rejected")} className="flex-1 rounded-full border border-border px-4 py-2 font-semibold text-xs text-ink hover:border-primary">Reject non-essential</button>
        </div>
      </div>
    </div>
  );
}
