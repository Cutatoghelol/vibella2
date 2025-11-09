import Image from "next/image";

export default function ProfilePage({ params }: { params: { id: string } }) {
  // placeholder profile
  return (
    <main className="mx-auto my-12 max-w-3xl px-6">
      <div className="flex items-center gap-4">
        <Image src="/vercel.svg" alt="avatar" width={80} height={80} />
        <div>
          <h2 className="text-2xl font-semibold">Trịnh Hoa</h2>
          <p className="text-sm text-zinc-600">Bio: Yêu bản thân và chia sẻ năng lượng tích cực</p>
          <p className="mt-2 text-sm">Mục tiêu: Thiền 20 phút/ngày</p>
        </div>
      </div>

      <section className="mt-6">
        <h3 className="mb-3 text-lg font-medium">Bài đăng</h3>
        <div className="space-y-4">
          <article className="rounded border p-4">Bài đăng 1</article>
          <article className="rounded border p-4">Bài đăng 2</article>
        </div>
      </section>
    </main>
  );
}
