import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { getSupabase } from "@/lib/supabase";

const STATUS = ["baru", "dihubungi", "diterima", "ditolak"];

async function guard() {
  if (!(await isAdmin())) return { res: NextResponse.json({ error: "Tidak berwenang. Silakan login." }, { status: 401 }) };
  const sb = getSupabase();
  if (!sb) return { res: NextResponse.json({ error: "Supabase belum dikonfigurasi." }, { status: 503 }) };
  return { sb };
}

export async function PATCH(req: Request) {
  const g = await guard();
  if (!g.sb) return g.res;
  const { id, status } = await req.json().catch(() => ({}));
  if (typeof id !== "string" || !STATUS.includes(status)) return NextResponse.json({ error: "Data tidak valid." }, { status: 400 });
  const { error } = await g.sb.from("mitra_applications").update({ status }).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const g = await guard();
  if (!g.sb) return g.res;
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID wajib ada." }, { status: 400 });
  const { error } = await g.sb.from("mitra_applications").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
