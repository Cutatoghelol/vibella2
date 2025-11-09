export default function ChallengesPage() {
  return (
    <main className="mx-auto my-12 max-w-3xl px-6">
      <h2 className="mb-4 text-2xl font-semibold">Thử thách cộng đồng</h2>

      <div className="space-y-4">
        <div className="rounded border p-4">
          <h3 className="font-medium">7 ngày thiền</h3>
          <p className="text-sm text-zinc-600">Thiền ít nhất 10 phút mỗi ngày trong 7 ngày.</p>
          <button className="mt-3 rounded bg-foreground px-3 py-1 text-background">Tham gia</button>
        </div>

        <div className="rounded border p-4">
          <h3 className="font-medium">Uống đủ nước 14 ngày</h3>
          <p className="text-sm text-zinc-600">Đặt mục tiêu và theo dõi lượng nước mỗi ngày.</p>
          <button className="mt-3 rounded bg-foreground px-3 py-1 text-background">Tham gia</button>
        </div>
      </div>
    </main>
  );
}
