"use client";

import { useState } from "react";

export default function ChatbotPage() {
  const [messages, setMessages] = useState<{ from: "user" | "bot"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!input.trim()) return;
    const text = input.trim();
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    setLoading(true);
    // Placeholder: call server route that proxies to OpenAI
    await new Promise((r) => setTimeout(r, 800));
    setMessages((m) => [...m, { from: "bot", text: "Mình ở đây để lắng nghe. Hãy kể cho mình biết cảm xúc của bạn." }]);
    setLoading(false);
  }

  return (
    <main className="mx-auto my-12 max-w-2xl px-6">
      <h2 className="mb-4 text-2xl font-semibold">Trợ lý tinh thần (AI)</h2>

      <div className="mb-4 rounded border p-4">
        {messages.length === 0 && <div className="text-zinc-500">Bắt đầu cuộc trò chuyện</div>}
        <div className="space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={m.from === "user" ? "text-right" : "text-left"}>
              <div className={m.from === "user" ? "inline-block rounded bg-foreground px-3 py-2 text-background" : "inline-block rounded bg-zinc-100 px-3 py-2"}>
                {m.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 rounded border px-3 py-2" placeholder="Hãy nhập..." />
        <button onClick={send} disabled={loading} className="rounded bg-foreground px-4 py-2 text-background">{loading ? "Đang gửi..." : "Gửi"}</button>
      </div>
    </main>
  );
}
