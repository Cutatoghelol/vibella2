import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { prompt } = body;
  if (!prompt) return NextResponse.json({ error: "Missing prompt" }, { status: 400 });

  // NOTE: This is a placeholder. You must set OPENAI_API_KEY in Vercel env and implement server-side call.
  return NextResponse.json({ reply: "(Trả lời mẫu) Mình luôn ở đây để lắng nghe." });
}
