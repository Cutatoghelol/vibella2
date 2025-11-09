"use client";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full border-b bg-white/60 backdrop-blur-sm dark:bg-black/60">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-6 py-3">
        <div className="flex items-center gap-3">
          <Image src="/vibella-logo.svg" alt="Vibella" width={140} height={34} className="dark:invert" />
          <h1 className="text-lg font-semibold">Vibella — Mạng xã hội tích cực</h1>
        </div>

        <nav className="flex items-center gap-3">
          <Link className="px-3 py-2 rounded hover:bg-black/5 dark:hover:bg-white/5" href="/">Trang chủ</Link>
          <Link className="px-3 py-2 rounded hover:bg-black/5 dark:hover:bg-white/5" href="/feed">Bảng tin</Link>
          <Link className="px-3 py-2 rounded hover:bg-black/5 dark:hover:bg-white/5" href="/create">Tạo bài</Link>
          <Link className="px-3 py-2 rounded hover:bg-black/5 dark:hover:bg-white/5" href="/habits">Thói quen</Link>
          <Link className="px-3 py-2 rounded hover:bg-black/5 dark:hover:bg-white/5" href="/challenges">Thách đấu</Link>
          <Link className="px-3 py-2 rounded hover:bg-black/5 dark:hover:bg-white/5" href="/achievements">Thành tựu</Link>
          <Link className="px-3 py-2 rounded hover:bg-black/5 dark:hover:bg-white/5" href="/blogs">Chuyên gia</Link>
          <Link className="px-3 py-2 rounded bg-foreground text-background" href="/auth/login">Đăng nhập</Link>
          <Link className="px-3 py-2 rounded border" href="/auth/signup">Đăng ký</Link>
        </nav>
      </div>
    </header>
  );
}
