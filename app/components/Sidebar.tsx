"use client";

import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <aside className={`transition-all duration-300 ${open ? "w-64" : "w-16"} h-[calc(100vh-64px)] border-r bg-white/40 dark:bg-black/40 p-4`}> 
      <button onClick={() => setOpen((v) => !v)} className="mb-4 rounded px-2 py-1 border">
        {open ? "Thu gọn" : "Mở"}
      </button>

      <nav className="flex flex-col gap-2">
        <Link href="/feed" className="rounded px-3 py-2 hover:bg-black/5">Bảng tin</Link>
        <Link href="/create" className="rounded px-3 py-2 hover:bg-black/5">Tạo bài</Link>
        <Link href="/habits" className="rounded px-3 py-2 hover:bg-black/5">Thói quen</Link>
        <Link href="/challenges" className="rounded px-3 py-2 hover:bg-black/5">Thách đấu</Link>
        <Link href="/leaderboard" className="rounded px-3 py-2 hover:bg-black/5">Bảng xếp hạng</Link>
        <Link href="/blogs" className="rounded px-3 py-2 hover:bg-black/5">Chuyên gia</Link>
      </nav>
    </aside>
