import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { getSupabase } from "@/lib/supabase";
import { BG_KEYS, CATEGORIES, SHAPES } from "@/lib/products";

const NO_DB = "Supabase belum dikonfigurasi. Isi SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY di .env.local.";

const slug = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "produk";

function parse(b: Record<string, unknown>) {
  const name = String(b.name ?? "").trim();
  const category = String(b.category ?? "");
  const shape = String(b.shape ?? "");
  const bg = String(b.bg ?? "");
  const color = String(b.color ?? "");
  const description = String(b.desc ?? "").trim();
  const price = Number(b.price);

  if (!name || name.length > 80) return { error: "Nama produk wajib diisi (maks. 80 karakter)." };
  if (!(CATEGORIES as readonly string[]).includes(category)) return { error: "Kategori tidak valid." };
  if (!(SHAPES as readonly string[]).includes(shape)) return { error: "Bentuk botol tidak valid." };
  if (!(BG_KEYS as readonly string[]).includes(bg)) return { error: "Warna latar tidak valid." };
  if (!/^#[0-9a-fA-F]{6}$/.test(color)) return { error: "Warna botol harus berformat hex, contoh #e56b8a." };
  if (!Number.isInteger(price) || price < 0 || price > 100_000_000) return { error: "Harga harus berupa bilangan bulat ≥ 0." };
  if (description.length > 120) return { error: "Deskripsi maksimal 120 karakter." };

  return { row: { name, category, shape, bg, color, description, price, active: b.active !== false } };
}

async function guard() {
  if (!(await isAdmin())) return { res: NextResponse.json({ error: "Tidak berwenang. Silakan login." }, { status: 401 }) };
  const sb = getSupabase();
  if (!sb) return { res: NextResponse.json({ error: NO_DB }, { status: 503 }) };
  return { sb };
}

export async function POST(req: Request) {
  const g = await guard();
  if (!g.sb) return g.res;
  const body = await req.json().catch(() => ({}));
  const p = parse(body);
  if (!p.row) return NextResponse.json({ error: p.error }, { status: 400 });

  const { error } = await g.sb.from("products").insert({ id: slug(p.row.name), ...p.row });
  if (error) {
    const dup = error.code === "23505";
    return NextResponse.json({ error: dup ? "Produk dengan nama itu sudah ada. Gunakan nama lain." : error.message }, { status: dup ? 409 : 500 });
  }
  return NextResponse.json({ ok: true });
}

export async function PUT(req: Request) {
  const g = await guard();
  if (!g.sb) return g.res;
  const body = await req.json().catch(() => ({}));
  const id = String(body.id ?? "");
  if (!id) return NextResponse.json({ error: "ID produk wajib ada." }, { status: 400 });
  const p = parse(body);
  if (!p.row) return NextResponse.json({ error: p.error }, { status: 400 });

  const { error } = await g.sb.from("products").update(p.row).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const g = await guard();
  if (!g.sb) return g.res;
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID produk wajib ada." }, { status: 400 });

  const { error } = await g.sb.from("products").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
