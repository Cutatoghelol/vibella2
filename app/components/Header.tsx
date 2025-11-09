"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

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
          <div className="hidden sm:block">
            <Link href="/auth/signup" className="btn-cta btn-cta-primary mr-2">Đăng ký</Link>
            <Link href="/auth/login" className="btn-cta btn-cta-secondary">Đăng nhập</Link>
          </div>

          <button className="sm:hidden rounded border px-3 py-2" onClick={() => setOpen((v) => !v)} aria-label="Mở menu">
            ☰
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
            <Link href="/auth/signup" className="btn-cta btn-cta-primary w-full text-center">Đăng ký</Link>
            <Link href="/auth/login" className="btn-cta btn-cta-secondary w-full text-center">Đăng nhập</Link>
          </div>
        </div>
      )}
    </header>
  );
}
