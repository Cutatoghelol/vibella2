import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// Only create a real client in the browser and when the URL is provided.
let _supabase: any = null;
if (typeof window !== "undefined" && url) {
  _supabase = createClient(url, anon, {
    auth: { persistSession: true },
  });
}

// Export a safe supabase object: real client in browser, lightweight stub on server/build.
export const supabase =
  _supabase ?? {
    // minimal auth stubs used by client components during SSR/build
    auth: {
      async getUser() {
        return { data: { user: null } };
      },
      onAuthStateChange(_callback: any) {
        return { data: { subscription: { unsubscribe() {} } } };
      },
      // allow signIn/signUp calls to fail clearly if invoked on server
      async signIn() {
        throw new Error("Supabase client not available on server. Call auth methods from browser.");
      },
    },
  };
