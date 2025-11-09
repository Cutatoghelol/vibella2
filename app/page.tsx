import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center gap-8 py-16 px-6 bg-white dark:bg-black sm:items-start">
        <header className="flex w-full items-center justify-between card animate-slide-down">
          <div className="flex items-center gap-3 hero-wrapper">
            <div className="hero-content flex items-center gap-3">
              <Image className="dark:invert" src="/vibella-logo.svg" alt="Vibella" width={140} height={34} priority />
              <div>
                <h1 className="text-2xl font-bold">Vibella — Mạng xã hội lan tỏa năng lượng tích cực</h1>
                <p className="text-sm text-zinc-600">Kết nối, chia sẻ thói quen tốt và cùng nhau phát triển</p>
              </div>
            </div>

            {/* Decorative animated SVG hero graphic */}
            <div className="hero-graphic float-slow hidden sm:block" aria-hidden>
              <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="g1" x1="0" x2="1">
                    <stop offset="0%" stop-color="var(--accent-3)" />
                    <stop offset="100%" stop-color="var(--accent-2)" />
                  </linearGradient>
                </defs>
                <rect x="0" y="0" width="200" height="140" rx="16" fill="url(#g1)" opacity="0.12" />
                <g transform="translate(20,20)">
                  <circle cx="40" cy="40" r="26" fill="var(--accent-1)" opacity="0.9" />
                  <circle cx="110" cy="70" r="18" fill="var(--accent-3)" opacity="0.95" />
                  <path d="M10 110 Q60 40 140 100" stroke="#fff" stroke-width="2" fill="none" opacity="0.5" />
                </g>
              </svg>
            </div>
          </div>

          <div className="flex gap-3">
            <Link href="/auth/login" className="btn-primary">Đăng nhập</Link>
            <Link href="/auth/signup" className="btn-outline">Đăng ký</Link>
          </div>
        </header>

        <section className="w-full rounded border p-6 card animate-fade-in">
          <h2 className="text-xl font-semibold">Bắt đầu</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Link href="/feed" className="rounded border p-4 text-center card animate-pop">Bảng tin</Link>
            <Link href="/create" className="rounded border p-4 text-center card animate-pop">Tạo bài</Link>
            <Link href="/habits" className="rounded border p-4 text-center card animate-pop">Theo dõi thói quen</Link>
          </div>
        </section>

        <section className="w-full rounded border p-6 card animate-fade-in">
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
