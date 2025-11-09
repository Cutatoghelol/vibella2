"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const user = { name: "Bạn", handle: "@ban", avatar: "/vibella-logo.svg" };
  const trending = ["#meditation", "#fitness", "#selfcare", "#water"];
  const challenges = [
    { id: "c1", title: "7 ngày thiền" },
    { id: "c2", title: "Uống đủ nước 14 ngày" },
  ];

  return (
    <aside
      className={`transition-all duration-300 ${open ? "w-64" : "w-16"} h-[calc(100vh-64px)] border-r bg-white/40 dark:bg-black/40 p-4 flex flex-col justify-between`}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <Image src={user.avatar} alt="avatar" width={open ? 48 : 32} height={open ? 48 : 32} />
            {open && (
              <div className="min-w-0">
                <div className="font-semibold truncate">{user.name}</div>
                <div className="text-xs text-zinc-500 truncate">{user.handle}</div>
              </div>
            )}
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Thu gọn sidebar" : "Mở sidebar"}
            className="ml-2 rounded px-2 py-1 border"
          >
            {open ? "‹" : ">"}
          </button>
        </div>

        <nav className="flex flex-col gap-2 mb-4">
          <Link href="/feed" className={`rounded px-3 py-2 hover:bg-black/5 ${open ? "" : "text-center"}`}>
            {open ? "Bảng tin" : "🏠"}
          </Link>
          <Link href="/create" className={`rounded px-3 py-2 hover:bg-black/5 ${open ? "" : "text-center"}`}>
            {open ? "Tạo bài" : "✚"}
          </Link>
          <Link href="/habits" className={`rounded px-3 py-2 hover:bg-black/5 ${open ? "" : "text-center"}`}>
            {open ? "Thói quen" : "📋"}
          </Link>
          <Link href="/challenges" className={`rounded px-3 py-2 hover:bg-black/5 ${open ? "" : "text-center"}`}>
            {open ? "Thách đấu" : "🏆"}
          </Link>
        </nav>

        {/* Quick actions widget */}
        <div className="mb-4">
          <h4 className={`text-sm font-medium mb-2 ${open ? "" : "sr-only"}`}>Hành động nhanh</h4>
          <div className="flex flex-col gap-2">
            <Link href="/create" className={`btn-secondary ${open ? "w-full text-sm" : "w-full text-center"}`}>
              {open ? "Tạo bài mới" : "✚"}
            </Link>
            <Link href="/habits" className={`btn-outline ${open ? "w-full text-sm" : "w-full text-center"}`}>
              {open ? "Ghi thói quen" : "📋"}
            </Link>
          </div>
        </div>

        {/* Trending topics widget */}
        <div className="mb-4">
          <h4 className={`text-sm font-medium mb-2 ${open ? "" : "sr-only"}`}>Xu hướng</h4>
          <div className="flex flex-wrap gap-2">
            {trending.map((t) => (
              <Link key={t} href={`/feed?tag=${encodeURIComponent(t)}`} className={`topic-badge ${open ? "" : "sr-only"}`}>
                {t}
              </Link>
            ))}
          </div>
        </div>

        {/* Community challenges preview */}
        <div className="mb-4">
          <h4 className={`text-sm font-medium mb-2 ${open ? "" : "sr-only"}`}>Thử thách</h4>
          <div className="flex flex-col gap-2">
            {challenges.map((c) => (
              <div key={c.id} className="flex items-center justify-between rounded px-3 py-2 bg-white/20">
                <div className="text-sm truncate">{open ? c.title : "🏅"}</div>
                {open && <button className="btn-outline text-xs">Tham gia</button>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chatbot quick access */}
      <div className="mt-4">
        <Link href="/ai/chatbot" className="flex items-center gap-2 btn-primary">
          <span>💬</span>
          {open && <span>Trợ lý AI</span>}
        </Link>
      </div>
    </aside>
  );
}
