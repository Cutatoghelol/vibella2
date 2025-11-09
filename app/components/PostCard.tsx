"use client";

import Link from "next/link";
import { useState } from "react";

export default function PostCard({ post }: { post?: any }) {
  const [liked, setLiked] = useState<boolean>(Boolean(post?.liked ?? false));
  const [likes, setLikes] = useState<number>(() => Number(post?.likes ?? 0));

  function toggleLike() {
    const newLiked = !liked;
    setLiked(newLiked);
    setLikes((l) => (newLiked ? l + 1 : Math.max(0, l - 1)));
  }

  return (
    <article className="card p-4 rounded-2xl">
      <div className="flex items-start gap-4">
        <img src="/vibella-logo.svg" alt="avatar" className="post-avatar" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">{post?.author ?? "Người dùng"}</div>
              <div className="post-meta">{post?.time ?? "Vừa xong"}</div>
            </div>
            <div className="text-sm text-zinc-400">...</div>
          </div>

          <p className="my-3">{post?.text ?? "Một ngày tuyệt vời để yêu bản thân ❤️"}</p>

          <div className="flex gap-2 mb-3">
            {(post?.tags ?? []).map((t: string) => (
              <span key={t} className={`chip ${t.includes("meditation") ? "pink" : "mint"}`}>{t}</span>
            ))}
          </div>

          <div className="flex gap-2">
            <button onClick={toggleLike} className={`action-btn heart`}>{liked ? "💖 Đã thích" : "❤️ Thích"} ({likes})</button>
            <Link href={`/post/${post?.id ?? 0}`} className="action-btn comment">💬 Bình luận</Link>
          </div>
        </div>
      </div>
    </article>
  );
}
