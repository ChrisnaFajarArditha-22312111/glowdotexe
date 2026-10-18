import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(req: Request) {
  let b: Record<string, unknown>;
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ error: "Format permintaan tidak valid." }, { status: 400 });
  }

  const name = String(b.name ?? "").trim().slice(0, 100);
  const business = String(b.business ?? "").trim().slice(0, 150);
  const email = String(b.email ?? "").trim().slice(0, 150);
  const type = String(b.type ?? "").trim().slice(0, 60);

  if (!name || !business || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "Lengkapi nama, usaha, dan email yang valid." }, { status: 400 });
  }

  const sb = getSupabase();
  if (!sb) {
    // Mode demo: Supabase belum diatur, data hanya dicatat di log server.
    console.log("[mitra] pengajuan baru (mode demo, tidak disimpan):", { name, business, email, type });
    return NextResponse.json({ ok: true, mode: "demo" });
  }

  const { error } = await sb.from("mitra_applications").insert({ name, business, email, type });
  if (error) {
    console.error("[mitra] gagal menyimpan:", error.message);
    return NextResponse.json({ error: "Gagal menyimpan pengajuan. Coba lagi sebentar." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
