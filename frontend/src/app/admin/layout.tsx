import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import { isAdmin } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const loggedIn = await isAdmin();
  return (
    <div>
      {loggedIn && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-surface px-5 py-3">
          <div className="flex items-center gap-4 text-sm font-medium">
            <span className="font-display text-lg font-semibold">Admin</span>
            <Link href="/admin" className="hover:text-pink">Produk</Link>
            <Link href="/admin/mitra" className="hover:text-pink">Pendaftar mitra</Link>
          </div>
          <LogoutButton />
        </div>
      )}
      {children}
    </div>
  );
}
