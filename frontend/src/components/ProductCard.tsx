"use client";

import type { Product } from "@/lib/products";
import { bgClass, rupiah } from "@/lib/products";
import { useCart } from "./CartProvider";

export default function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  const jar = p.shape === "jar";

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-surface transition hover:-translate-y-1">
      <div className={`relative pt-3 ${bgClass(p.bg)}`}>
        <span className="absolute left-3 top-3 rounded-full bg-surface px-2.5 py-0.5 text-[11px] font-semibold">{p.category}</span>
        <svg viewBox="0 0 100 190" className="block h-[170px] w-full" aria-hidden="true">
          <use
            href={`#${p.shape}`}
            x={jar ? -5 : 10}
            y={jar ? 60 : 5}
            width={jar ? 110 : 80}
            height={jar ? 74 : 170}
            style={{ color: p.color }}
          />
        </svg>
      </div>
      <div className="px-4 pb-5 pt-3.5">
        <h3 className="font-display text-base font-semibold">{p.name}</h3>
        <p className="text-xs text-muted">{p.desc}</p>
        <div className="mt-2.5 flex items-center justify-between">
          <span className="text-sm font-semibold">{rupiah(p.price)}</span>
          <button onClick={() => add(p.id)} className="rounded-full bg-linear-to-br from-pink to-lav px-4 py-2 text-xs font-medium text-white">
            + Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}
