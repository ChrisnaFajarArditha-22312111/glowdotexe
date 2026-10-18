import ShopClient from "@/components/ShopClient";
import { listProducts } from "@/lib/db";

export const metadata = { title: "Produk – Glowify" };

export default async function ProdukPage() {
  const products = await listProducts();
  return (
    <div className="fade-in">
      <h1 className="mb-1 font-display text-3xl font-semibold">Katalog Produk</h1>
      <p className="mb-6 text-muted">Pilih kategori lalu tambahkan ke keranjang.</p>
      <ShopClient products={products} />
    </div>
  );
}
