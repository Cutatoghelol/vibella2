"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (authError) throw authError;
      // On success, redirect to feed
      router.push("/feed");
    } catch (err: any) {
      console.error("Login error", err);
      setError(err.message ?? "Lỗi đăng nhập");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto my-12 max-w-2xl px-6">
      <h2 className="mb-4 text-2xl font-semibold">Đăng nhập</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
          {loading ? "Đang xử lý..." : "Đăng nhập"}
        </button>
      </form>
    </main>
  );
}
