"use client";

import { useCart } from "./CartProvider";
import { rupiah } from "@/lib/products";

export default function CartDrawer() {
  const { items, total, open, setOpen, remove, clear, toast, notify, getProduct } = useCart();
  const entries = Object.entries(items);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/45 p-5"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div role="dialog" aria-label="Keranjang" className="max-h-[80vh] w-full max-w-md overflow-auto rounded-3xl bg-surface p-6">
            <h3 className="mb-3 font-display text-xl font-semibold">🛒 Keranjang</h3>

            {entries.length === 0 && <p className="text-sm text-muted">Keranjang masih kosong. Yuk pilih produk dulu.</p>}

            {entries.map(([id, q]) => {
              const p = getProduct(id);
              if (!p) return null;
              return (
                <div key={id} className="flex items-center justify-between gap-3 border-b border-line py-2 text-sm">
                  <span>{p.name} × {q}</span>
                  <span className="flex items-center gap-2">
                    {rupiah(p.price * q)}
                    <button onClick={() => remove(id)} aria-label={`Hapus ${p.name}`} className="rounded-full border border-line px-2 py-0.5 text-xs">✕</button>
                  </span>
                </div>
              );
            })}

            <div className="mt-4 flex justify-between font-semibold">
              <span>Total</span>
              <span>{rupiah(total)}</span>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                className="rounded-full bg-linear-to-br from-pink to-lav px-6 py-3 text-sm font-medium text-white"
                onClick={() => {
                  if (!entries.length) return notify("Keranjang masih kosong");
                  clear();
                  setOpen(false);
                  notify("✅ Pesanan demo diterima, terima kasih!");
                }}
              >
                Checkout
              </button>
              <button className="rounded-full border-2 border-line px-6 py-3 text-sm font-medium" onClick={() => setOpen(false)}>Tutup</button>
            </div>
          </div>
        </div>
      )}

      <div
        role="status"
        className={`pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#2d2326] px-6 py-3 text-sm text-white transition-opacity duration-300 ${toast ? "opacity-100" : "opacity-0"}`}
      >
        {toast}
      </div>
    </>
  );
}
