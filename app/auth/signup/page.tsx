"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // TODO: wire up Supabase auth; create profile
    try {
      await new Promise((r) => setTimeout(r, 700));
      router.push("/feed");
    } catch (err) {
      setError("Lỗi đăng ký");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto my-12 max-w-2xl px-6">
      <h2 className="mb-4 text-2xl font-semibold">Đăng ký</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Tên hiển thị"
          className="rounded border px-3 py-2"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          className="rounded border px-3 py-2"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mật khẩu"
          type="password"
          className="rounded border px-3 py-2"
        />
        {error && <div className="text-red-600">{error}</div>}
        <button disabled={loading} className="rounded bg-foreground px-4 py-2 text-background">
          {loading ? "Đang xử lý..." : "Tạo tài khoản"}
        </button>
      </form>
    </main>
  );
}
