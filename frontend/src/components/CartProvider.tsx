"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/products";

type Items = Record<string, number>;

type CartCtx = {
  products: Product[];
  getProduct: (id: string) => Product | undefined;
  items: Items;
  count: number;
  total: number;
  open: boolean;
  toast: string;
  add: (id: string) => void;
  addMany: (ids: string[]) => void;
  remove: (id: string) => void;
  clear: () => void;
  setOpen: (v: boolean) => void;
  notify: (msg: string) => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "glowify:cart";

export function CartProvider({ children, products }: { children: React.ReactNode; products: Product[] }) {
  const getProduct = useCallback((id: string) => products.find((p) => p.id === id), [products]);
  const [items, setItems] = useState<Items>({});
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items, ready]);

  const notify = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 1800);
  }, []);

  const add = useCallback(
    (id: string) => {
      setItems((s) => ({ ...s, [id]: (s[id] || 0) + 1 }));
      notify(`${getProduct(id)?.name ?? "Produk"} ditambahkan 🛒`);
    },
    [notify, getProduct],
  );

  const addMany = useCallback(
    (ids: string[]) => {
      setItems((s) => {
        const n = { ...s };
        ids.forEach((id) => (n[id] = (n[id] || 0) + 1));
        return n;
      });
      notify(`${ids.length} produk ditambahkan 🛒`);
    },
    [notify],
  );

  const remove = useCallback((id: string) => {
    setItems((s) => {
      const n = { ...s };
      delete n[id];
      return n;
    });
  }, []);

  const clear = useCallback(() => setItems({}), []);

  const value = useMemo<CartCtx>(() => {
    const count = Object.entries(items).reduce((a, [id, q]) => a + (getProduct(id) ? q : 0), 0);
    const total = Object.entries(items).reduce((a, [id, q]) => a + (getProduct(id)?.price ?? 0) * q, 0);
    return { products, getProduct, items, count, total, open, toast, add, addMany, remove, clear, setOpen, notify };
  }, [products, getProduct, items, open, toast, add, addMany, remove, clear, notify]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart harus dipakai di dalam CartProvider");
  return c;
}
