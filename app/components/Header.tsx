"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FiMenu, FiLogOut } from "react-icons/fi";
import { supabase } from "@/lib/supabaseClient";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    async function init() {
      try {
        const { data } = await supabase.auth.getUser();
        if (!mounted) return;
        setUser(data?.user ?? null);
      } catch (e) {
        setUser(null);
      }
    }
    init();

    const { data: listener } = supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
      if (!mounted) return;
      setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      listener?.subscription.unsubscribe?.();
    };
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    // page reload will reflect signed-out state via AuthGate
    window.location.href = "/";
  }

  return (
    <header className="navbar w-full px-4 py-3 shadow-soft">
      <div className="mx-auto max-w-5xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image src="/vibella-logo.svg" alt="Vibella" width={140} height={34} />
          <nav className="hidden sm:flex items-center gap-4">
            <Link href="/" className="underline-anim">Trang chủ</Link>
            <Link href="/feed" className="underline-anim">Bảng tin</Link>
            <Link href="/habits" className="underline-anim">Thói quen</Link>
            <Link href="/challenges" className="underline-anim">Thách đấu</Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <Link href="/create" className="btn-cta btn-cta-primary mr-2">Tạo</Link>
              <button onClick={handleSignOut} className="btn-cta btn-cta-secondary flex items-center gap-2">
                <FiLogOut size={14} /> Đăng xuất
              </button>
            </div>
          ) : (
            <div className="hidden sm:block">
              <Link href="/auth/signup" className="btn-cta btn-cta-primary mr-2">Đăng ký</Link>
              <Link href="/auth/login" className="btn-cta btn-cta-secondary">Đăng nhập</Link>
            </div>
          )}

          <button className="sm:hidden rounded border px-3 py-2" onClick={() => setOpen((v) => !v)} aria-label="Mở menu">
            <FiMenu size={18} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden mt-3 mx-4 flex flex-col gap-2">
          <Link href="/" className="underline-anim">Trang chủ</Link>
          <Link href="/feed" className="underline-anim">Bảng tin</Link>
          <Link href="/habits" className="underline-anim">Thói quen</Link>
          <Link href="/challenges" className="underline-anim">Thách đấu</Link>
          <div className="flex gap-2 pt-2">
            {user ? (
              <>
                <Link href="/create" className="btn-cta btn-cta-primary w-full text-center">Tạo</Link>
                <button onClick={handleSignOut} className="btn-cta btn-cta-secondary w-full">Đăng xuất</button>
              </>
            ) : (
              <>
                <Link href="/auth/signup" className="btn-cta btn-cta-primary w-full text-center">Đăng ký</Link>
                <Link href="/auth/login" className="btn-cta btn-cta-secondary w-full text-center">Đăng nhập</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
