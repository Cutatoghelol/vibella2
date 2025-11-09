"use client";

import { useState } from "react";

export default function CreatePost() {
  const [text, setText] = useState("");
  const [mood, setMood] = useState("😊");
  const [image, setImage] = useState<File | null>(null);

  return (
    <main className="mx-auto my-12 max-w-2xl px-6">
      <h2 className="mb-4 text-2xl font-semibold">Tạo bài mới</h2>

      <form className="flex flex-col gap-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          placeholder="Chia sẻ điều tốt hôm nay..."
          className="rounded border px-3 py-2"
        />

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2">
            Ảnh
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] ?? null)}
            />
          </label>

          <label className="flex items-center gap-2">
            Tâm trạng
            <select value={mood} onChange={(e) => setMood(e.target.value)} className="rounded border px-2 py-1">
              <option>😊</option>
              <option>😌</option>
              <option>💪</option>
              <option>😴</option>
              <option>😃</option>
            </select>
          </label>
        </div>

        <div className="flex gap-2">
          <button className="rounded bg-foreground px-4 py-2 text-background">Đăng</button>
          <button type="button" className="rounded border px-4 py-2">Xóa</button>
        </div>
      </form>
    </main>
  );
}
