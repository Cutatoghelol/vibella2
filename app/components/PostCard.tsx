"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function PostCard({ post }: { post?: any }) {
  const [liked, setLiked] = useState<boolean>(Boolean(post?.liked ?? false));
  const [likes, setLikes] = useState<number>(() => Number(post?.likes ?? 0));

  function toggleLike() {
    const newLiked = !liked;
    setLiked(newLiked);
    setLikes((l) => (newLiked ? l + 1 : Math.max(0, l - 1)));
    // TODO: call API to persist like
  }

  return (
    <article className="rounded border p-4">
      <div className="flex items-center gap-3">
        <Image src="/vibella-logo.svg" alt="avatar" width={40} height={40} />
        <div>
          <div className="font-semibold">{post?.author ?? "Người dùng"}</div>
          <div className="text-sm text-zinc-500">{post?.time ?? "Vừa xong"}</div>
        </div>
      </div>

      <p className="my-3">{post?.text ?? "Một ngày tuyệt vời để yêu bản thân ❤️"}</p>

      {post?.image && (
        <div className="my-3">
          {/* If image is an absolute URL and not configured in next.config, use native img to avoid build/runtime errors */}
          {typeof post.image === "string" && /^(https?:)?\/\//.test(post.image) ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.image} alt="post" className="max-w-full rounded" />
          ) : (
            <Image src={post.image as string} alt="post" width={640} height={360} />
          )}
        </div>
      )}

      <div className="mt-2 flex items-center gap-4 text-sm">
        <button onClick={toggleLike} className="rounded px-2 py-1 hover:bg-black/5">
          {liked ? "Đã thích" : "Thích"} ({likes})
        </button>
        <Link href={`/post/${post?.id ?? 0}`} className="rounded px-2 py-1 hover:bg-black/5">Bình luận</Link>
        <Link href={`/profile/${post?.authorId ?? 1}`} className="text-zinc-500">Hồ sơ</Link>
      </div>
    </article>
  );
}
