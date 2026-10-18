import "server-only";
import { getSupabase } from "./supabase";
import { seedProducts, type BgKey, type Category, type Product, type Shape } from "./products";

type ProductRow = {
  id: string;
  name: string;
  category: Category;
  price: number;
  shape: Shape;
  color: string;
  bg: BgKey;
  description: string;
  active: boolean;
};

const fromRow = (r: ProductRow): Product => ({
  id: r.id,
  name: r.name,
  category: r.category,
  price: r.price,
  shape: r.shape,
  color: r.color,
  bg: r.bg,
  desc: r.description,
  active: r.active,
});

/** Daftar produk. Tanpa Supabase (atau saat error) dipakai data bawaan. */
export async function listProducts(opts: { all?: boolean } = {}): Promise<Product[]> {
  const sb = getSupabase();
  if (!sb) return seedProducts;

  let q = sb.from("products").select("*").order("sort", { ascending: true }).order("created_at", { ascending: true });
  if (!opts.all) q = q.eq("active", true);

  const { data, error } = await q;
  if (error) {
    console.error("[db] gagal membaca products:", error.message);
    return seedProducts;
  }
  return (data as ProductRow[]).map(fromRow);
}

export type MitraApp = {
  id: string;
  name: string;
  business: string;
  email: string;
  type: string;
  status: string;
  created_at: string;
};

export async function listMitra(): Promise<MitraApp[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb.from("mitra_applications").select("*").order("created_at", { ascending: false });
  if (error) {
    console.error("[db] gagal membaca mitra_applications:", error.message);
    return [];
  }
  return data as MitraApp[];
}
