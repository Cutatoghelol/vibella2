"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import type { Session, AuthChangeEvent } from "@supabase/supabase-js";

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

  // Guest view: render children but block interaction with a prominent intro overlay
  return (
    <div className="relative">
      {children}

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">
        <div className="max-w-xl rounded-lg bg-white p-8 text-center shadow-lg card">
          <h2 className="mb-2 text-2xl font-semibold">Chào mừng đến với Vibella</h2>
          <p className="mb-4 text-sm text-zinc-600">Để truy cập đầy đủ tính năng (đăng bài, theo dõi, tham gia thử thách, sử dụng chatbot AI), vui lòng đăng nhập hoặc đăng ký tài khoản.</p>

          <div className="flex items-center justify-center gap-3">
            <Link href="/auth/login" className="btn-primary">Đăng nhập</Link>
            <Link href="/auth/signup" className="btn-outline">Đăng ký</Link>
          </div>

          <div className="mt-4 text-xs text-zinc-500">Bạn vẫn có thể xem một số phần công khai nhưng không thể tương tác cho đến khi đăng nhập.</div>
        </div>
      </div>

      {/* Block pointer events to underlying UI so guests cannot interact */}
      <div className="fixed inset-0 z-40 bg-transparent" aria-hidden />
    </div>
  );
}
