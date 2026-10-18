export const CATEGORIES = ["Cleanser", "Serum", "Moisturizer", "Sunscreen"] as const;
export type Category = (typeof CATEGORIES)[number];

export const SHAPES = ["tube", "serum", "jar", "pump"] as const;
export type Shape = (typeof SHAPES)[number];

export const BG_KEYS = ["pinks", "lavs", "mints", "skys", "suns"] as const;
export type BgKey = (typeof BG_KEYS)[number];

// Nama kelas ditulis lengkap agar terbaca oleh Tailwind.
export const BG_CLASS: Record<BgKey, string> = {
  pinks: "bg-pinks",
  lavs: "bg-lavs",
  mints: "bg-mints",
  skys: "bg-skys",
  suns: "bg-suns",
};
export const bgClass = (k: string) => BG_CLASS[k as BgKey] ?? "bg-pinks";

export type Product = {
  id: string;
  name: string;
  category: Category;
  price: number;
  shape: Shape;
  color: string; // warna botol (hex)
  bg: BgKey; // warna latar kartu
  desc: string;
  active: boolean;
};

/** Data bawaan. Dipakai sebagai cadangan bila Supabase belum dikonfigurasi. */
export const seedProducts: Product[] = [
  { id: "foam-wash", name: "Gentle Foam Wash", category: "Cleanser", price: 65000, shape: "tube", color: "#e56b8a", bg: "pinks", desc: "Semua jenis kulit · 100 ml", active: true },
  { id: "hydra-milk", name: "Hydra Milk Cleanser", category: "Cleanser", price: 72000, shape: "tube", color: "#8b74f0", bg: "lavs", desc: "Kering & sensitif · 100 ml", active: true },
  { id: "niacinamide", name: "Niacinamide 10%", category: "Serum", price: 89000, shape: "serum", color: "#e56b8a", bg: "pinks", desc: "Jerawat & pori · 30 ml", active: true },
  { id: "vit-c", name: "Vitamin C Bright", category: "Serum", price: 99000, shape: "serum", color: "#f5a524", bg: "suns", desc: "Kusam & penuaan · 30 ml", active: true },
  { id: "cica", name: "Calm Cica Serum", category: "Serum", price: 92000, shape: "serum", color: "#1fb894", bg: "mints", desc: "Kemerahan & iritasi · 30 ml", active: true },
  { id: "barrier", name: "Barrier Repair Cream", category: "Moisturizer", price: 79000, shape: "jar", color: "#8b74f0", bg: "lavs", desc: "Kering & sensitif · 50 ml", active: true },
  { id: "gel", name: "Oil-Free Gel", category: "Moisturizer", price: 69000, shape: "jar", color: "#3d9cf5", bg: "skys", desc: "Berminyak & kombinasi · 50 ml", active: true },
  { id: "spf50", name: "Daily Shield SPF 50", category: "Sunscreen", price: 95000, shape: "pump", color: "#f5a524", bg: "suns", desc: "PA++++ · tanpa white cast", active: true },
];

export const rupiah = (n: number) => "Rp " + n.toLocaleString("id-ID");
