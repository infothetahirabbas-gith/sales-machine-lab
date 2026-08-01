import { createStart, createMiddleware } from "@tanstack/react-start";
// Intentionally replaces the generated `attachSupabaseAuth`: same bearer-token
// behaviour, but the Supabase client is dynamically imported so it stays out of
// the sitewide client entry chunk. Do not re-add the generated attacher.
import { attachSupabaseAuthLazy } from "@/lib/supabase-auth-attacher";


import { renderErrorPage } from "./lib/error-page";

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

export const startInstance = createStart(() => ({
  requestMiddleware: [errorMiddleware],
  functionMiddleware: [attachSupabaseAuth],
}));
