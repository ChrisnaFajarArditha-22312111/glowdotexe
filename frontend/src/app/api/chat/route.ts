import { NextResponse } from "next/server";
import { fallbackReply } from "@/lib/fallbackReply";
import { listProducts } from "@/lib/db";

type Msg = { role: "user" | "assistant"; content: string };

const systemPrompt = (productNames: string) => `Kamu adalah Glow AI, asisten skincare dari website Glowify.
Aturan:
- Jawab dalam bahasa Indonesia yang ramah, singkat (maksimal sekitar 150 kata), dan mudah dipahami pemula.
- Bantu soal jenis kulit, urutan rutinitas pagi/malam, dan penjelasan kandungan (niacinamide, retinol, vitamin C, salicylic acid, ceramide, dll).
- Jangan mendiagnosis penyakit atau meresepkan obat. Jika ada gejala berat (luka, nanah, bengkak, gatal parah, iritasi yang tidak membaik), sarankan ke dokter kulit.
- Tanyakan jenis kulit atau keluhan utama jika belum jelas.
- Produk Glowify yang tersedia: ${productNames}.
- Tolak dengan sopan topik di luar perawatan kulit.`;

export async function POST(req: Request) {
  let body: { messages?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Format permintaan tidak valid." }, { status: 400 });
  }

  if (!Array.isArray(body.messages)) {
    return NextResponse.json({ error: "Field messages wajib berupa array." }, { status: 400 });
  }

  // Bersihkan & batasi pesan
  let messages: Msg[] = body.messages
    .filter(
      (m): m is Msg =>
        !!m &&
        typeof m === "object" &&
        ((m as Msg).role === "user" || (m as Msg).role === "assistant") &&
        typeof (m as Msg).content === "string" &&
        (m as Msg).content.trim().length > 0,
    )
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }))
    .slice(-20);

  // API mewajibkan percakapan diawali pesan user
  while (messages.length && messages[0].role !== "user") messages.shift();
  if (!messages.length) {
    return NextResponse.json({ error: "Tidak ada pesan pengguna." }, { status: 400 });
  }

  const lastUser = [...messages].reverse().find((m) => m.role === "user")!.content;
  const key = process.env.ANTHROPIC_API_KEY;

  // Mode demo: tanpa API key
  if (!key) {
    return NextResponse.json({ reply: fallbackReply(lastUser), mode: "demo" });
  }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || "claude-sonnet-5-5",
        max_tokens: 600,
        system: systemPrompt((await listProducts()).map((p) => p.name).join(", ")),
        messages,
      }),
    });

    if (!res.ok) throw new Error(`Anthropic API ${res.status}`);

    const data = (await res.json()) as { content?: { type: string; text?: string }[] };
    const reply = (data.content ?? [])
      .filter((b) => b.type === "text")
      .map((b) => b.text ?? "")
      .join("\n")
      .trim();

    if (!reply) throw new Error("Respons kosong");
    return NextResponse.json({ reply, mode: "ai" });
  } catch (err) {
    console.error("[chat] gagal memanggil AI:", err);
    return NextResponse.json({ reply: fallbackReply(lastUser), mode: "demo" });
  }
}
