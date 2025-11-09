// Create a server-side Supabase client using the service role key.
// This file is only used on the server (API routes). It throws early if env is missing.
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

if (!url || !serviceRole) {
  throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL for server Supabase client.");
}

export const supabaseServer = createClient(url, serviceRole, {
  auth: { persistSession: false },
});
