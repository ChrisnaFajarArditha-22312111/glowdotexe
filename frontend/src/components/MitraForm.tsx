"use client";

import { useState } from "react";

const TYPES = ["Klinik / dokter kulit", "Reseller / toko", "Pemasok produk", "Logistik"];

export default function MitraForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const f = new FormData(e.currentTarget);
    setStatus("loading");
    try {
      const res = await fetch("/api/mitra", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(f)),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal mengirim pengajuan.");
      setStatus("ok");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
      setStatus("idle");
    }
  }

  if (status === "ok")
    return <div className="rounded-2xl bg-mints p-4 text-sm">✅ Terima kasih! Pengajuanmu sudah kami terima. Tim kami akan menghubungi lewat email.</div>;

  const field = "mt-1 w-full rounded-2xl border-[1.5px] border-line bg-bg px-4 py-2.5 text-sm outline-none focus:border-pink";

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <label className="text-sm font-medium">Nama lengkap<input name="name" required placeholder="Nama Anda" className={field} /></label>
      <label className="text-sm font-medium">Nama usaha<input name="business" required placeholder="Klinik / toko / brand" className={field} /></label>
      <label className="text-sm font-medium">Email<input name="email" type="email" required placeholder="email@contoh.com" className={field} /></label>
      <label className="text-sm font-medium">Jenis kemitraan
        <select name="type" className={field}>{TYPES.map((t) => <option key={t}>{t}</option>)}</select>
      </label>
      {error && <p role="alert" className="text-sm text-pink">{error}</p>}
      <button disabled={status === "loading"} className="rounded-full bg-linear-to-br from-pink to-lav px-6 py-3 text-sm font-medium text-white disabled:opacity-60">
        {status === "loading" ? "Mengirim…" : "Kirim pengajuan"}
      </button>
    </form>
  );
}
