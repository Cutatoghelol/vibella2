import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center gap-8 py-16 px-6 bg-white dark:bg-black sm:items-start">
        <header className="flex w-full items-center justify-between">
          <div className="flex items-center gap-3">
            <Image className="dark:invert" src="/vibella-logo.svg" alt="Vibella" width={140} height={34} priority />
            <div>
              <h1 className="text-2xl font-bold">Vibella — Mạng xã hội lan tỏa năng lượng tích cực</h1>
              <p className="text-sm text-zinc-600">Kết nối, chia sẻ thói quen tốt và cùng nhau phát triển</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/auth/login" className="rounded bg-foreground px-4 py-2 text-background">Đăng nhập</Link>
            <Link href="/auth/signup" className="rounded border px-4 py-2">Đăng ký</Link>
          </div>
        </header>

        <section className="w-full rounded border p-6">
          <h2 className="text-xl font-semibold">Bắt đầu</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Link href="/feed" className="rounded border p-4 text-center">Bảng tin</Link>
            <Link href="/create" className="rounded border p-4 text-center">Tạo bài</Link>
            <Link href="/habits" className="rounded border p-4 text-center">Theo dõi thói quen</Link>
          </div>
        </section>

        <section className="w-full rounded border p-6">
          <h3 className="text-lg font-semibold">Tính năng nổi bật</h3>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-600">
            <li>Đăng bài, hình ảnh, tâm trạng</li>
            <li>Thích, bình luận và theo dõi</li>
            <li>Thử thách cộng đồng & huy hiệu</li>
            <li>Chatbot hỗ trợ sức khỏe tinh thần (AI)</li>
          </ul>
        </section>

        <footer className="w-full text-center text-sm text-zinc-500">© Vibella — lan tỏa năng lượng tích cực</footer>
      </main>
    </div>
  );
}
