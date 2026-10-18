"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { MitraApp } from "@/lib/db";

const STATUS = ["baru", "dihubungi", "diterima", "ditolak"];
const COLOR: Record<string, string> = { baru: "bg-suns", dihubungi: "bg-skys", diterima: "bg-mints", ditolak: "bg-pinks" };

export default function AdminMitra({ items, dbReady }: { items: MitraApp[]; dbReady: boolean }) {
  const router = useRouter();
  const [error, setError] = useState("");

  async function call(method: string, body?: unknown, query = "") {
    setError("");
    const res = await fetch("/api/admin/mitra" + query, { method, headers: { "Content-Type": "application/json" }, body: body ? JSON.stringify(body) : undefined });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return setError(data.error || "Terjadi kesalahan.");
    router.refresh();
  }

  return (
    <div className="fade-in">
      <h1 className="font-display text-3xl font-semibold">Pendaftar Mitra</h1>
      <p className="mb-4 text-sm text-muted">{items.length} pengajuan masuk dari formulir di halaman Mitra.</p>

      {!dbReady && <div className="mb-4 rounded-2xl bg-suns p-4 text-sm"><b>Mode demo.</b> Supabase belum dikonfigurasi, jadi pengajuan belum tersimpan.</div>}
      {error && <p role="alert" className="mb-3 rounded-2xl bg-pinks p-3 text-sm">{error}</p>}

      <div className="overflow-x-auto rounded-3xl border border-line bg-surface">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-line text-xs text-muted">
            <tr><th className="p-3">Pendaftar</th><th className="p-3">Usaha</th><th className="p-3">Jenis</th><th className="p-3">Tanggal</th><th className="p-3">Status</th><th className="p-3" /></tr>
          </thead>
          <tbody>
            {items.map((m) => (
              <tr key={m.id} className="border-b border-line last:border-0">
                <td className="p-3"><b className="block">{m.name}</b><a href={`mailto:${m.email}`} className="text-xs text-muted underline">{m.email}</a></td>
                <td className="p-3">{m.business}</td>
                <td className="p-3">{m.type}</td>
                <td className="p-3 whitespace-nowrap">{new Date(m.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</td>
                <td className="p-3">
                  <select value={m.status} onChange={(e) => call("PATCH", { id: m.id, status: e.target.value })} className={`rounded-full border-0 px-3 py-1 text-xs font-medium ${COLOR[m.status] ?? ""}`} aria-label={`Status ${m.name}`}>
                    {STATUS.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </td>
                <td className="p-3 text-right">
                  <button onClick={() => confirm(`Hapus pengajuan dari ${m.name}?`) && call("DELETE", undefined, `?id=${encodeURIComponent(m.id)}`)} className="rounded-full border border-line px-3 py-1 text-xs text-pink">Hapus</button>
                </td>
              </tr>
            ))}
            {items.length === 0 && <tr><td colSpan={6} className="p-6 text-center text-muted">Belum ada pendaftar.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
