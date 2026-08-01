import { createMiddleware } from "@tanstack/react-start";

/**
 * Lazy replacement for the generated `attachSupabaseAuth` middleware.
 *
 * The generated version statically imports `@/integrations/supabase/client`,
 * which drags the whole `@supabase/supabase-js` + `@supabase/auth-js` graph
 * (~400 kB raw) into the client entry chunk that EVERY page downloads — even
 * though this marketing site only authenticates on `/admin/*`.
 *
 * Behaviour is identical; the Supabase client is imported on first server-fn
 * call instead of at boot, so it is code-split out of the critical path.
 */
export const attachSupabaseAuthLazy = createMiddleware({ type: "function" }).client(
  async ({ next }) => {
    try {
      const { supabase } = await import("@/integrations/supabase/client");
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      return next({
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
    } catch {
      return next({ headers: {} });
    }
  },
);
