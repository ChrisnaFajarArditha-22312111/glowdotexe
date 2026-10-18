import AdminProducts from "@/components/AdminProducts";
import { requireAdmin } from "@/lib/auth";
import { listProducts } from "@/lib/db";
import { supabaseConfigured } from "@/lib/supabase";

export const metadata = { title: "Admin – Glowify" };

export default async function AdminPage() {
  await requireAdmin();
  const products = await listProducts({ all: true });
  return <AdminProducts products={products} dbReady={supabaseConfigured()} />;
}
