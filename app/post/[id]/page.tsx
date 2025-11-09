import Image from "next/image";
import Link from "next/link";

export default function PostDetail({ params }: { params: { id: string } }) {
  // Placeholder post detail UI
  return (
    <main className="mx-auto my-12 max-w-3xl px-6">
      <article className="rounded border p-4">
        <div className="flex items-center gap-3">
          <Image src="/vibella-logo.svg" alt="avatar" width={48} height={48} />
          <div>
            <div className="font-semibold">Người dùng Ví dụ</div>
            <div className="text-sm text-zinc-500">2 giờ trước</div>
          </div>
        </div>

        <p className="my-4 text-lg">Hôm nay tôi hoàn thành mục tiêu thiền và cảm thấy nhẹ nhõm 😊 #meditation</p>

        <div className="my-4">
          <Image src="/file.svg" alt="post image" width={640} height={360} />
        </div>

        <div className="flex items-center gap-4 text-sm">
          <button className="rounded px-3 py-1 hover:bg-black/5">Thích (24)</button>
          <button className="rounded px-3 py-1 hover:bg-black/5">Bình luận (6)</button>
          <Link href="/profile/1" className="text-zinc-500">Xem hồ sơ</Link>
        </div>
      </article>

      <section className="mt-6">
        <h3 className="mb-3 text-lg font-medium">Bình luận</h3>
        <div className="space-y-3">
          <div className="rounded border p-3">Người A: Thật tuyệt vời!</div>
          <div className="rounded border p-3">Người B: Cứ tiếp tục nhé!</div>
        </div>

        <form className="mt-4 flex gap-2">
          <input className="flex-1 rounded border px-3 py-2" placeholder="Viết bình luận..." />
          <button className="rounded bg-foreground px-4 py-2 text-background">Gửi</button>
        </form>
      </section>
    </main>
  );
}
