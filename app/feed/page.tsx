import Image from "next/image";
import Link from "next/link";
import PostCard from "../components/PostCard";

const MOCK_POSTS = [
  { id: 1, author: "Nguyễn Ánh", text: "Hôm nay mình hoàn thành 20 phút thiền, năng lượng nhẹ nhàng 😊 #meditation", likes: 12 },
  { id: 2, author: "Lê Minh", text: "Uống đủ nước hôm nay! Hãy cố gắng nhé mọi người 💧 #water", likes: 5 },
];

export default function FeedPage() {
  return (
    <main className="mx-auto my-12 max-w-3xl px-6">
      <h2 className="mb-6 text-2xl font-semibold">Bảng tin</h2>

      <section className="mb-8 rounded border p-4">
        <h3 className="mb-3 font-medium">Bộ lọc chủ đề</h3>
        <div className="flex flex-wrap gap-2">
          <button className="rounded border px-3 py-1">#meditation</button>
          <button className="rounded border px-3 py-1">#fitness</button>
          <button className="rounded border px-3 py-1">#selfcare</button>
          <button className="rounded border px-3 py-1">#sleep</button>
          <button className="rounded border px-3 py-1">#water</button>
        </div>
      </section>

      <section className="space-y-6">
        {MOCK_POSTS.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
      </section>
    </main>
  );
}
