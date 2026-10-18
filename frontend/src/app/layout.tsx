import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import SvgDefs from "@/components/SvgDefs";
import { CartProvider } from "@/components/CartProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { listProducts } from "@/lib/db";

// Produk diambil dari database, jadi halaman dirender pada setiap permintaan.
export const dynamic = "force-dynamic";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-poppins" });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Glowify – Your Skin, Your Glow",
  description: "Platform perawatan kulit dengan Skin Quiz, konsultasi AI, dan katalog produk skincare.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const products = await listProducts();
  return (
    <html lang="id">
      <body className={`${poppins.variable} ${playfair.variable}`}>
        <SvgDefs />
        <CartProvider products={products}>
          <Navbar />
          <main className="mx-auto max-w-6xl px-5 py-8 md:pb-14">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
