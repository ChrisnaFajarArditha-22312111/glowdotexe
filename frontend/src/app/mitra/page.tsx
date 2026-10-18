import MitraForm from "@/components/MitraForm";

export const metadata = { title: "Mitra – Glowify" };

const partners = [
  { emoji: "🏥", name: "Klinik Kulit Cantika", desc: "Dokter kulit · Jakarta", bg: "bg-pinks" },
  { emoji: "🌿", name: "Herbal Nusantara", desc: "Pemasok bahan · Bandung", bg: "bg-lavs" },
  { emoji: "🏬", name: "Beauty Mart", desc: "Retail · Seluruh Indonesia", bg: "bg-mints" },
  { emoji: "🚚", name: "KurirKilat", desc: "Logistik · Nasional", bg: "bg-skys" },
];

const benefits = [
  "Akses ke ribuan pengguna aktif",
  "Dashboard penjualan dan laporan transparan",
  "Materi promosi dan pelatihan produk gratis",
  "Komisi kompetitif dan pembayaran tepat waktu",
];

export default function MitraPage() {
  return (
    <div className="fade-in">
      <h1 className="mb-1 font-display text-3xl font-semibold">Mitra Glowify</h1>
      <p className="mb-6 text-muted">Bersama mitra terpercaya, kami menghadirkan perawatan kulit yang aman dan mudah dijangkau.</p>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {partners.map((p) => (
          <div key={p.name} className={`${p.bg} rounded-3xl px-4 py-6 text-center`}>
            <div className="mx-auto mb-2.5 grid size-14 place-items-center rounded-2xl bg-surface text-3xl">{p.emoji}</div>
            <h3 className="font-display text-base font-semibold">{p.name}</h3>
            <p className="text-xs text-muted">{p.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid items-start gap-6 md:grid-cols-2">
        <div>
          <h2 className="mb-3 font-display text-2xl font-semibold">Kenapa jadi mitra Glowify?</h2>
          {benefits.map((b, i) => (
            <div key={b} className="my-2 flex items-center gap-2.5 text-sm">
              <b className="grid size-6 shrink-0 place-items-center rounded-full bg-pink text-xs text-white">{i + 1}</b>
              {b}
            </div>
          ))}
        </div>
        <div className="rounded-3xl border border-line bg-surface p-6">
          <h3 className="mb-3 font-display text-lg font-semibold">Daftar jadi mitra</h3>
          <MitraForm />
        </div>
      </div>
    </div>
  );
}
