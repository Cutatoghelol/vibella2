import PostCard from "../components/PostCard";

const MOCK_POSTS = [
  { id: 1, author: "Nguyễn Ánh", text: "Hôm nay mình hoàn thành 20 phút thiền, năng lượng nhẹ nhàng 😊", likes: 12, tags: ["#meditation"] },
  { id: 2, author: "Lê Minh", text: "Uống đủ nước hôm nay! Hãy cố gắng nhé mọi người 💧", likes: 5, tags: ["#water"] },
];

export default function FeedPage() {
  return (
    <main className="mx-auto my-12 max-w-4xl px-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Bảng tin</h2>
        <div className="flex gap-2">
          <button className="btn-cta btn-cta-primary">Mới</button>
          <button className="btn-cta btn-cta-secondary">Nổi bật</button>
        </div>
      </div>

      <section className="grid gap-6">
        {MOCK_POSTS.map((p) => (
          <article key={p.id} className="card p-4">
            <div className="flex items-start gap-4">
              <img src="/vibella-logo.svg" alt="avatar" className="post-avatar" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{p.author}</div>
                    <div className="post-meta">1 giờ trước</div>
                  </div>
                  <div className="text-sm text-zinc-400">...</div>
                </div>

                <p className="my-3">{p.text} <span className="chip pink">#meditation</span></p>

                <div className="flex gap-2">
                  <button className="action-btn heart">❤️ Thích ({p.likes})</button>
                  <button className="action-btn comment">💬 Bình luận</button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
