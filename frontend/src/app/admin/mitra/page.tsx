import AdminMitra from "@/components/AdminMitra";
import { requireAdmin } from "@/lib/auth";
import { listMitra } from "@/lib/db";
import { supabaseConfigured } from "@/lib/supabase";

export const metadata = { title: "Pendaftar Mitra – Glowify" };

export default async function AdminMitraPage() {
  await requireAdmin();
  return <AdminMitra items={await listMitra()} dbReady={supabaseConfigured()} />;
}
