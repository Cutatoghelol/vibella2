export default function BlogsPage() {
  return (
    <main className="mx-auto my-12 max-w-3xl px-6">
      <h2 className="mb-4 text-2xl font-semibold">Bài viết chuyên gia</h2>

      <div className="space-y-4">
        <article className="rounded border p-4">
          <h3 className="font-medium">Lợi ích của thiền ngắn mỗi ngày</h3>
          <p className="text-sm text-zinc-600">Bởi: Dr. Minh — Tâm lý học</p>
        </article>

        <article className="rounded border p-4">
          <h3 className="font-medium">Nâng cao năng lượng tích cực</h3>
          <p className="text-sm text-zinc-600">Bởi: Chuyên gia sức khỏe</p>
        </article>
      </div>
    </main>
  );
}
