import type { Category, Product } from "./products";

export type Option = { emoji: string; label: string; bg: string };
export type Question = { id: "skin" | "concern" | "budget"; title: string; options: Option[] };

export const questions: Question[] = [
  {
    id: "skin",
    title: "Bagaimana jenis kulitmu?",
    options: [
      { emoji: "💧", label: "Berminyak", bg: "bg-pinks" },
      { emoji: "🏜️", label: "Kering", bg: "bg-skys" },
      { emoji: "🌓", label: "Kombinasi", bg: "bg-mints" },
      { emoji: "🌸", label: "Sensitif", bg: "bg-lavs" },
    ],
  },
  {
    id: "concern",
    title: "Apa masalah utama kulitmu?",
    options: [
      { emoji: "🔴", label: "Jerawat", bg: "bg-pinks" },
      { emoji: "😶‍🌫️", label: "Kusam", bg: "bg-suns" },
      { emoji: "🌡️", label: "Kemerahan", bg: "bg-lavs" },
      { emoji: "⏳", label: "Penuaan", bg: "bg-mints" },
    ],
  },
  {
    id: "budget",
    title: "Berapa budget bulananmu?",
    options: [
      { emoji: "💰", label: "Di bawah Rp 250 rb", bg: "bg-mints" },
      { emoji: "💎", label: "Rp 250–400 rb", bg: "bg-skys" },
      { emoji: "👑", label: "Di atas Rp 400 rb", bg: "bg-suns" },
      { emoji: "🤷", label: "Fleksibel", bg: "bg-pinks" },
    ],
  },
];

export const skinAdvice: Record<string, string> = {
  Berminyak: "Pembersih gel, pelembap ringan, dan sunscreen non-komedogenik.",
  Kering: "Pembersih lembut berbasis susu dan pelembap kaya ceramide.",
  Kombinasi: "Gel ringan di area T dan krim tipis di pipi.",
  Sensitif: "Produk tanpa pewangi, kenalkan satu per satu.",
};

/**
 * Memilih 4 produk (cleanser, serum, pelembap, sunscreen) dari daftar produk yang tersedia.
 * Jika produk pilihan tidak ada (misalnya dihapus admin), dipakai produk pertama di kategori yang sama.
 */
export function recommend(skin: string, concern: string, products: Product[]): Product[] {
  const wanted: [string, Category][] = [
    [skin === "Kering" || skin === "Sensitif" ? "hydra-milk" : "foam-wash", "Cleanser"],
    [concern === "Kusam" || concern === "Penuaan" ? "vit-c" : concern === "Kemerahan" ? "cica" : "niacinamide", "Serum"],
    [skin === "Berminyak" || skin === "Kombinasi" ? "gel" : "barrier", "Moisturizer"],
    ["spf50", "Sunscreen"],
  ];
  const out: Product[] = [];
  for (const [id, cat] of wanted) {
    const p = products.find((x) => x.id === id) ?? products.find((x) => x.category === cat);
    if (p) out.push(p);
  }
  return out;
}
