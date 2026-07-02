import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import {
  listAllCaseStudies,
  getMyAdminStatus,
  upsertCaseStudy,
  deleteCaseStudy,
  type DbCaseStudy,
} from "@/lib/case-studies.functions";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, LogOut, ExternalLink } from "lucide-react";
import CaseStudyForm from "@/components/admin/CaseStudyForm";

export const Route = createFileRoute("/admin/case-studies")({
  head: () => ({
    meta: [{ title: "Admin · Case Studies" }, { name: "robots", content: "noindex" }],
  }),
  component: AdminCaseStudies,
});

function AdminCaseStudies() {
  const navigate = useNavigate();
  const checkAdmin = useServerFn(getMyAdminStatus);
  const listAll = useServerFn(listAllCaseStudies);
  const upsert = useServerFn(upsertCaseStudy);
  const remove = useServerFn(deleteCaseStudy);

  const [status, setStatus] = useState<"checking" | "not-admin" | "ready">("checking");
  const [userId, setUserId] = useState<string | null>(null);
  const [studies, setStudies] = useState<DbCaseStudy[]>([]);
  const [editing, setEditing] = useState<DbCaseStudy | null>(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate({ to: "/admin/login" });
        return;
      }
      try {
        const me = await checkAdmin();
        setUserId(me.userId);
        if (!me.isAdmin) {
          setStatus("not-admin");
          return;
        }
        const list = await listAll();
        setStudies(list.studies);
        setStatus("ready");
      } catch (e: any) {
        toast.error(e.message);
        setStatus("not-admin");
      }
    };
    init();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate({ to: "/admin/login" });
    });
    return () => subscription.unsubscribe();
  }, []);

  const refresh = async () => {
    const list = await listAll();
    setStudies(list.studies);
  };

  const handleSave = async (payload: any) => {
    try {
      await upsert({ data: payload });
      toast.success("Saved");
      setEditing(null);
      setCreating(false);
      await refresh();
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this case study?")) return;
    try {
      await remove({ data: { id } });
      toast.success("Deleted");
      await refresh();
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login" });
  };

  if (status === "checking") {
    return (
      <div className="min-h-screen flex items-centre justify-centre text-muted-foreground">
        Checking access...
      </div>
    );
  }

  if (status === "not-admin") {
    return (
      <div className="min-h-screen flex items-centre justify-centre px-5">
        <div className="card-surface p-8 max-w-md text-centre">
          <h1 className="text-xl font-bold text-ink">Not an admin yet</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your account ID is:
          </p>
          <code className="mt-2 block text-xs bg-secondary/60 p-2 rounded break-all">
            {userId}
          </code>
          <p className="mt-4 text-sm text-muted-foreground">
            Ask the developer to run this in the database to grant admin access:
          </p>
          <pre className="mt-2 text-[11px] text-left bg-ink text-white p-3 rounded overflow-x-auto">
{`INSERT INTO public.user_roles (user_id, role)
VALUES ('${userId}', 'admin');`}
          </pre>
          <button onClick={handleSignOut} className="flex btn btn-outline mt-6">
            Sign out
          </button>
        </div>
      </div>
    );
  }

  if (creating || editing) {
    return (
      <div className="min-h-screen bg-secondary/30 py-8">
        <div className="mx-auto max-w-4xl px-5">
          <button
            onClick={() => {
              setCreating(false);
              setEditing(null);
            }}
            className="text-sm text-muted-foreground hover:text-primary mb-4"
          >
            ← Back to list
          </button>
          <CaseStudyForm
            initial={editing ?? undefined}
            onSubmit={handleSave}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="bg-white border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-4 flex items-centre justify-between">
          <div>
            <h1 className="text-xl font-bold text-ink">Case Studies CMS</h1>
            <p className="text-xs text-muted-foreground">
              {studies.length} entries · Public site shows published + seed entries
            </p>
          </div>
          <div className="flex items-centre gap-2">
            <Link to="/case-studies" className="flex btn btn-outline text-sm">
              <ExternalLink className="w-4 h-4" /> View live
            </Link>
            <button onClick={() => setCreating(true)} className="flex btn btn-primary text-sm">
              <Plus className="w-4 h-4" /> New
            </button>
            <button onClick={handleSignOut} className="flex btn btn-outline text-sm">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8">
        {studies.length === 0 ? (
          <div className="card-surface p-10 text-centre">
            <p className="text-muted-foreground">No case studies yet. Click <strong>New</strong> to add the first one.</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {studies.map((s) => (
              <div key={s.id} className="card-surface p-4 flex items-centre gap-4">
                {s.screenshot_url ? (
                  <img src={s.screenshot_url} alt="" loading="lazy" decoding="async" className="w-20 h-14 object-cover rounded border border-border" />
                ) : (
                  <div className="w-20 h-14 rounded bg-gradient-to-br from-primary/20 to-accent/30 flex items-centre justify-centre text-xs font-bold text-primary">
                    {s.category}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-centre gap-2">
                    <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${s.published ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                      {s.published ? "Live" : "Draft"}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground">{s.category}</span>
                    <span className="text-[10px] text-muted-foreground">/{s.slug}</span>
                  </div>
                  <h3 className="font-semibold text-ink text-sm truncate">{s.title}</h3>
                  <p className="text-xs text-muted-foreground">{s.brand} · {s.hero_metric} {s.hero_metric_label}</p>
                </div>
                <div className="flex items-centre gap-1">
                  <button onClick={() => setEditing(s)} className="p-2 rounded hover:bg-secondary text-ink/70" title="Edit">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(s.id)} className="p-2 rounded hover:bg-red-50 text-red-600" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
