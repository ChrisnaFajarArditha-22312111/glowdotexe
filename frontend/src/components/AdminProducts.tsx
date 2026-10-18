"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { BG_KEYS, CATEGORIES, SHAPES, bgClass, rupiah, type Product } from "@/lib/products";

type Form = { id?: string; name: string; category: string; price: string; shape: string; color: string; bg: string; desc: string; active: boolean };

const EMPTY: Form = { name: "", category: "Serum", price: "", shape: "serum", color: "#e56b8a", bg: "pinks", desc: "", active: true };
const input = "mt-1 w-full rounded-2xl border-[1.5px] border-line bg-bg px-4 py-2 text-sm outline-none focus:border-pink";

export default function AdminProducts({ products, dbReady }: { products: Product[]; dbReady: boolean }) {
  const router = useRouter();
  const [form, setForm] = useState<Form | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function call(method: string, body?: unknown, query = "") {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/products" + query, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Terjadi kesalahan.");
        return false;
      }
      router.refresh();
      return true;
    } finally {
      setBusy(false);
    }
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    const ok = await call(form.id ? "PUT" : "POST", { ...form, price: Number(form.price) });
    if (ok) setForm(null);
  }

  const edit = (p: Product) => setForm({ id: p.id, name: p.name, category: p.category, price: String(p.price), shape: p.shape, color: p.color, bg: p.bg, desc: p.desc, active: p.active });
  const toggle = (p: Product) => call("PUT", { ...p, active: !p.active });
  const remove = (p: Product) => confirm(`Hapus produk "${p.name}"?`) && call("DELETE", undefined, `?id=${encodeURIComponent(p.id)}`);
  const set = (k: keyof Form, v: string | boolean) => setForm((f) => (f ? { ...f, [k]: v } : f));

  return (
    <div className="fade-in">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold">Kelola Produk</h1>
          <p className="text-sm text-muted">{products.length} produk · perubahan langsung tampil di website.</p>
        </div>
        <button
          disabled={!dbReady}
          onClick={() => { setError(""); setForm({ ...EMPTY }); }}
          className="rounded-full bg-linear-to-br from-pink to-lav px-5 py-2.5 text-sm font-medium text-white disabled:opacity-50"
        >
          + Tambah produk
        </button>
      </div>

      {!dbReady && (
        <div className="mb-4 rounded-2xl bg-suns p-4 text-sm">
          <b>Mode demo.</b> Supabase belum dikonfigurasi, jadi daftar di bawah hanya data bawaan dan tidak bisa diubah.
          Isi <code>SUPABASE_URL</code> dan <code>SUPABASE_SERVICE_ROLE_KEY</code> di <code>.env.local</code> (lihat README).
        </div>
      )}
      {error && !form && <p role="alert" className="mb-3 rounded-2xl bg-pinks p-3 text-sm">{error}</p>}

      {form && (
        <form onSubmit={save} className="mb-6 grid gap-3 rounded-3xl border border-line bg-surface p-6 md:grid-cols-2">
          <h2 className="font-display text-xl font-semibold md:col-span-2">{form.id ? "Ubah produk" : "Produk baru"}</h2>
          <label className="text-sm font-medium">Nama produk<input required value={form.name} onChange={(e) => set("name", e.target.value)} className={input} /></label>
          <label className="text-sm font-medium">Harga (Rp)<input required type="number" min={0} value={form.price} onChange={(e) => set("price", e.target.value)} className={input} /></label>
          <label className="text-sm font-medium">Kategori
            <select value={form.category} onChange={(e) => set("category", e.target.value)} className={input}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select>
          </label>
          <label className="text-sm font-medium">Bentuk botol
            <select value={form.shape} onChange={(e) => set("shape", e.target.value)} className={input}>{SHAPES.map((c) => <option key={c}>{c}</option>)}</select>
          </label>
          <label className="text-sm font-medium">Warna botol<input type="color" value={form.color} onChange={(e) => set("color", e.target.value)} className={`${input} h-11 p-1`} /></label>
          <label className="text-sm font-medium">Warna latar kartu
            <select value={form.bg} onChange={(e) => set("bg", e.target.value)} className={input}>{BG_KEYS.map((c) => <option key={c}>{c}</option>)}</select>
          </label>
          <label className="text-sm font-medium md:col-span-2">Deskripsi singkat<input value={form.desc} maxLength={120} onChange={(e) => set("desc", e.target.value)} placeholder="Contoh: Berminyak & kombinasi · 50 ml" className={input} /></label>
          <label className="flex items-center gap-2 text-sm font-medium md:col-span-2">
            <input type="checkbox" checked={form.active} onChange={(e) => set("active", e.target.checked)} /> Tampilkan di website
          </label>
          {error && <p role="alert" className="text-sm text-pink md:col-span-2">{error}</p>}
          <div className="flex gap-2 md:col-span-2">
            <button disabled={busy} className="rounded-full bg-linear-to-br from-pink to-lav px-6 py-2.5 text-sm font-medium text-white disabled:opacity-60">{busy ? "Menyimpan…" : "Simpan"}</button>
            <button type="button" onClick={() => setForm(null)} className="rounded-full border-2 border-line px-6 py-2.5 text-sm font-medium">Batal</button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto rounded-3xl border border-line bg-surface">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-line text-xs text-muted">
            <tr><th className="p-3">Produk</th><th className="p-3">Kategori</th><th className="p-3">Harga</th><th className="p-3">Status</th><th className="p-3 text-right">Aksi</th></tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-line last:border-0">
                <td className="p-3">
                  <span className="flex items-center gap-2.5">
                    <span className={`size-8 rounded-lg ${bgClass(p.bg)}`}><span className="m-2 block size-4 rounded-full" style={{ background: p.color }} /></span>
                    <span><b className="block">{p.name}</b><span className="text-xs text-muted">{p.desc}</span></span>
                  </span>
                </td>
                <td className="p-3">{p.category}</td>
                <td className="p-3">{rupiah(p.price)}</td>
                <td className="p-3">
                  <button disabled={!dbReady || busy} onClick={() => toggle(p)} className={`rounded-full px-3 py-1 text-xs font-medium ${p.active ? "bg-mints" : "bg-line"}`}>
                    {p.active ? "Tampil" : "Disembunyikan"}
                  </button>
                </td>
                <td className="p-3 text-right">
                  <button disabled={!dbReady} onClick={() => edit(p)} className="mr-2 rounded-full border border-line px-3 py-1 text-xs disabled:opacity-40">Ubah</button>
                  <button disabled={!dbReady || busy} onClick={() => remove(p)} className="rounded-full border border-line px-3 py-1 text-xs text-pink disabled:opacity-40">Hapus</button>
                </td>
              </tr>
            ))}
            {products.length === 0 && <tr><td colSpan={5} className="p-6 text-center text-muted">Belum ada produk. Klik “Tambah produk”.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
