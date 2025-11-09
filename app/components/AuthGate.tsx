"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import type { Session, AuthChangeEvent } from "@supabase/supabase-js";
import GuestLanding from "./GuestLanding";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    async function check() {
      try {
        // supabase.auth.getUser() returns { data }
        const { data } = await supabase.auth.getUser();
        if (!mounted) return;
        setUser(data?.user ?? null);
      } catch (e) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    check();

    const { data: listener } = supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
      if (!mounted) return;
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      mounted = false;
      listener?.subscription.unsubscribe?.();
    };
  }, []);

  // If we're on auth pages, just render children so login/signup works normally
  if (pathname?.startsWith("/auth")) return <>{children}</>;

  // If loading, render children but show subtle overlay to avoid blocking UI completely during check
  if (loading) return <>{children}</>;

  // If user exists, render normally
  if (user) return <>{children}</>;

  // Guest view: render a dedicated public landing page (no interactions)
  return <GuestLanding />;
}
