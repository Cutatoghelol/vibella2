export default function AchievementsPage() {
  return (
    <main className="mx-auto my-12 max-w-3xl px-6">
      <h2 className="mb-4 text-2xl font-semibold">Thành tựu</h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded border p-4 text-center">🏅 Người tích cực</div>
        <div className="rounded border p-4 text-center">🔥 7 ngày liên tiếp</div>
        <div className="rounded border p-4 text-center">💧 Uống đủ nước</div>
        <div className="rounded border p-4 text-center">😴 8 giờ ngủ</div>
      </div>
    </main>
  );
}
