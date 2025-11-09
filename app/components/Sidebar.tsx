"use client";

import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <aside className={`transition-all duration-300 ${open ? "w-64" : "w-16"} h-[calc(100vh-64px)] border-r bg-white/40 dark:bg-black/40 p-4`}>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Animated decorative heart */}
          <svg
            role="img"
            aria-hidden="true"
            viewBox="0 0 24 24"
            width="28"
            height="28"
            className="animate-heartbeat"
          >
            <path fill="var(--foreground)" d="M12 21s-7-4.35-9-6.35C1.5 12.65 1 10.5 2 9.25 3 7.9 4.5 7.5 6 8.5c1.2.8 2.2 1.9 3 3 .8-1.1 1.8-2.2 3-3 1.5-1 3-0.6 4-1.25 1-1.25.5-3.4-1-5.4C19 2 16 3 14 5c-1 1.1-2 2.3-2 2.3S11 3.9 9 2C7-0 4 1 3 3c-1 2 0 4 1 6 1 1.7 6 10 8 10z" />
          </svg>

          <button onClick={() => setOpen((v) => !v)} className="rounded px-2 py-1 border">
            {open ? "Thu gọn" : "Mở"}
          </button>
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        <Link href="/feed" className="rounded px-3 py-2 hover:bg-black/5">Bảng tin</Link>
        <Link href="/create" className="rounded px-3 py-2 hover:bg-black/5">Tạo bài</Link>
        <Link href="/habits" className="rounded px-3 py-2 hover:bg-black/5">Thói quen</Link>
        <Link href="/challenges" className="rounded px-3 py-2 hover:bg-black/5">Thách đấu</Link>
        <Link href="/leaderboard" className="rounded px-3 py-2 hover:bg-black/5">Bảng xếp hạng</Link>
        <Link href="/blogs" className="rounded px-3 py-2 hover:bg-black/5">Chuyên gia</Link>
      </nav>
    </aside>
  );
}
