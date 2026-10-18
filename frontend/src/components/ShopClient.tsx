"use client";

import { useState } from "react";
import { CATEGORIES, type Product } from "@/lib/products";
import ProductCard from "./ProductCard";

export default function ShopClient({ products, initial = "Semua" }: { products: Product[]; initial?: string }) {
  const [filter, setFilter] = useState(initial);
  const list = filter === "Semua" ? products : products.filter((p) => p.category === filter);

  return (
    <>
      <div className="mb-6 flex flex-wrap gap-2">
        {["Semua", ...CATEGORIES].map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`rounded-full border-[1.5px] px-4 py-2 text-sm font-medium ${
              c === filter ? "border-ink bg-ink text-bg" : "border-line bg-surface"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      {list.length === 0 ? (
        <p className="rounded-2xl bg-pinks p-6 text-sm text-muted">Belum ada produk di kategori ini.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      )}
    </>
  );
}
