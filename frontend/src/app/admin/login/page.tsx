import { redirect } from "next/navigation";
import LoginForm from "@/components/LoginForm";
import { adminConfigured, isAdmin } from "@/lib/auth";

export const metadata = { title: "Login Admin – Glowify" };

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");

  return (
    <div className="fade-in mx-auto max-w-sm rounded-3xl border border-line bg-surface p-7">
      <h1 className="mb-1 font-display text-2xl font-semibold">Login Admin</h1>
      <p className="mb-5 text-sm text-muted">Masuk untuk mengelola produk dan pendaftar mitra.</p>
      {!adminConfigured() && (
        <p className="mb-4 rounded-2xl bg-suns p-3 text-xs">
          Admin belum aktif. Isi <code>ADMIN_PASSWORD</code> dan <code>ADMIN_SECRET</code> (min. 16 karakter) di <code>.env.local</code>, lalu restart server.
        </p>
      )}
      <LoginForm />
    </div>
  );
}
