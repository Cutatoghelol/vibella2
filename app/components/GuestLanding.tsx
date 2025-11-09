"use client";

import Image from "next/image";
import Link from "next/link";
import PostCard from "./PostCard";

export default function GuestLanding() {
  const MOCK_POSTS = [
    { id: 1, author: "Nguyễn Ánh", text: "Hôm nay mình hoàn thành 20 phút thiền, cảm thấy nhẹ nhàng 😊 #meditation", likes: 34, tags: ["#meditation"] },
    { id: 2, author: "Lê Minh", text: "Uống đủ nước hôm nay! Hãy cố gắng nhé mọi người 💧 #water", likes: 12, tags: ["#water"] },
  ];

  return (
    <main className="mx-auto my-12 max-w-4xl px-6">
      <section className="mb-8 flex flex-col-reverse items-center gap-6 sm:flex-row sm:items-center">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">Chào mừng đến với Vibella</h1>
          <p className="text-lg text-zinc-600 mb-4">Nơi lan tỏa năng lượng tích cực: theo dõi thói quen, tham gia thử thách và nhận trợ giúp tinh thần khi cần.</p>

          <div className="flex gap-3">
            <Link className="btn-cta btn-cta-primary rounded-2xl" href="/auth/signup">Đăng ký ngay</Link>
            <Link className="btn-cta btn-cta-secondary rounded-2xl" href="/auth/login">Đăng nhập</Link>
          </div>

          <ul className="mt-6 list-disc pl-5 text-sm text-zinc-600">
            <li>Khám phá bài viết công khai và nội dung chuyên gia</li>
            <li>Tham gia thách thức cộng đồng</li>
            <li>Ghi lại và cải thiện thói quen hàng ngày</li>
          </ul>
        </div>

        <div className="w-56 h-36 hero-graphic">
          <Image src="/vibella-logo.svg" alt="Vibella" width={220} height={140} className="float-medium" />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Bài viết nổi bật</h2>
        <div className="space-y-4">
          {MOCK_POSTS.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
        <div className="mt-4 text-sm text-zinc-500">Đăng nhập để tương tác với bài viết và xem nhiều hơn.</div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Thử thách cộng đồng</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="card p-4 rounded-2xl">7 ngày thiền — Tham gia để nhận huy hiệu</div>
          <div className="card p-4 rounded-2xl">Uống đủ nước 14 ngày — Theo dõi tiến độ</div>
        </div>
      </section>

      <footer className="mt-12 text-center text-sm text-zinc-500 footer">© Vibella — Lan tỏa năng lượng tích cực</footer>
    </main>
  );
}
