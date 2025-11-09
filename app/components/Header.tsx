"use client";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full border-b bg-white/60 backdrop-blur-sm dark:bg-black/60 card animate-slide-down">
      <div className="mx-auto flex max-w-4xl flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-4 px-6 py-3">
        <div className="flex items-center gap-3 min-w-0">
          <Image src="/vibella-logo.svg" alt="Vibella" width={140} height={34} className="dark:invert" />
          <div className="min-w-0">
            <h1 className="text-lg font-semibold truncate">Vibella — Mạng xã hội tích cực</h1>
          </div>
        </div>

        <nav className="flex items-center gap-3 flex-wrap mt-3 sm:mt-0 sm:justify-end w-full sm:w-auto overflow-x-auto">
          <Link className="px-3 py-2 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-link" href="/">Trang chủ</Link>
          <Link className="px-3 py-2 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-link" href="/feed">Bảng tin</Link>
          <Link className="px-3 py-2 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-link" href="/create">Tạo bài</Link>
          <Link className="px-3 py-2 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-link" href="/habits">Thói quen</Link>
          <Link className="px-3 py-2 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-link" href="/challenges">Thách đấu</Link>
          <Link className="px-3 py-2 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-link" href="/achievements">Thành tựu</Link>
          <Link className="px-3 py-2 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-link" href="/blogs">Chuyên gia</Link>
          <Link className="btn-primary flex-shrink-0" href="/auth/login">Đăng nhập</Link>
          <Link className="rounded border border-foreground px-3 py-2 flex-shrink-0" href="/auth/signup">Đăng ký</Link>
        </nav>
      </div>
    </header>
  );
}
