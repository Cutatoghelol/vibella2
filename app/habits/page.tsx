"use client";

import { useState } from "react";

export default function HabitsPage() {
  const [habits, setHabits] = useState([
    { id: "sleep", name: "Ngủ đủ", value: 0 },
    { id: "water", name: "Uống nước (ml)", value: 0 },
    { id: "steps", name: "Bước chân", value: 0 },
    { id: "meditation", name: "Thiền (phút)", value: 0 },
  ]);

  return (
    <main className="mx-auto my-12 max-w-3xl px-6">
      <h2 className="mb-4 text-2xl font-semibold">Trình theo dõi thói quen</h2>

      <div className="space-y-4">
        {habits.map((h) => (
          <div key={h.id} className="flex items-center justify-between rounded border px-4 py-3">
            <div>
              <div className="font-medium">{h.name}</div>
              <div className="text-sm text-zinc-500">Giá trị: {h.value}</div>
            </div>
            <div className="flex gap-2">
              <button className="rounded border px-3 py-1">-</button>
              <button className="rounded bg-foreground px-3 py-1 text-background">+</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
