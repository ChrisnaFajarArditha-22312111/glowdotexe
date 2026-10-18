import Link from "next/link";
import Image from "next/image";

const features = [
  { href: "/quiz", emoji: "🧴", title: "Skin Quiz", text: "3 pertanyaan singkat untuk tahu jenis kulit dan rutinitasmu.", cta: "Mulai quiz", bg: "bg-pinks" },
  { href: "/chat", emoji: "💬", title: "Konsultasi AI", text: "Tanya soal jerawat, kusam, atau kandungan produk kapan saja.", cta: "Mulai chat", bg: "bg-lavs" },
  { href: "/produk", emoji: "🛍️", title: "Katalog Produk", text: "Filter berdasarkan kategori dan tambahkan ke keranjang.", cta: "Lihat produk", bg: "bg-mints" },
  { href: "/mitra", emoji: "🤝", title: "Jadi Mitra", text: "Klinik, toko, dan reseller dapat bergabung bersama Glowify.", cta: "Daftar mitra", bg: "bg-skys" },
  { href: "/produk", emoji: "☀️", title: "Wajib: Sunscreen", text: "Langkah terpenting setiap pagi untuk kulit yang sehat.", cta: "Lihat sunscreen", bg: "bg-suns" },
  { href: "/chat", emoji: "📋", title: "Urutan Skincare", text: "Panduan dasar langkah pagi dan malam untuk pemula.", cta: "Tanya AI", bg: "bg-pinks" },
];

const highlights = [
  { icon: "✦", l1: "Rekomendasi", l2: "Personal" },
  { icon: "✓", l1: "Produk", l2: "Terpercaya" },
  { icon: "⌕", l1: "Mudah &", l2: "Praktis" },
  { icon: "♥", l1: "Kulit Sehat,", l2: "Percaya Diri" },
];

const trust = ["🧪 Bahan terverifikasi", "🐰 Cruelty-free", "🚚 Kirim ke seluruh Indonesia", "🔒 Privasi terjaga"];

export default function Home() {
  return (
    <div className="fade-in">
      <section className="grid items-end gap-2 overflow-hidden rounded-[34px] bg-linear-to-br from-pinks via-lavs to-skys pt-8 md:grid-cols-2 md:pl-11 md:pt-11">
        <div className="px-6 pb-8 md:px-0 md:pb-10 md:self-center">
          <span className="mb-4 inline-block rounded-full border border-line bg-surface px-4 py-1 text-xs font-semibold text-pink">✨ Solusi perawatan kulit berbasis AI</span>
          <h1 className="mb-3.5 font-display text-4xl font-bold leading-[1.12] md:text-5xl">
            Solusi Perawatan Kulit<br />
            <em className="bg-linear-to-r from-pink to-lav bg-clip-text text-transparent">dalam Genggaman!</em>
          </h1>
          <p className="mb-6 max-w-[46ch] text-muted">
            Glowify hadir sebagai aplikasi mobile &amp; web yang membantu kamu menemukan produk skincare terbaik, sesuai kebutuhan kulitmu.
          </p>
          <div className="mb-7 flex flex-wrap gap-2.5">
            <Link href="/quiz" className="rounded-full bg-linear-to-br from-pink to-lav px-6 py-3 text-sm font-medium text-white">Mulai Skin Quiz</Link>
            <Link href="/chat" className="rounded-full border-[1.5px] border-line bg-surface px-6 py-3 text-sm font-medium">Tanya Glow AI</Link>
          </div>
          <div className="grid max-w-md grid-cols-2 gap-3.5">
            {highlights.map((h, i) => (
              <div key={h.l1} className="flex items-center gap-2.5 text-[13px] font-medium leading-tight">
                <span className={`grid size-10 shrink-0 place-items-center rounded-full text-base text-white ${i % 2 ? "bg-linear-to-br from-[#c0a9ff] to-lav" : "bg-linear-to-br from-[#ff7fb0] to-[#d93a8b]"}`}>{h.icon}</span>
                <span>{h.l1}<br />{h.l2}</span>
              </div>
            ))}
          </div>
        </div>
        <Image src="/logo/glowify-hero-devices.png" alt="Tampilan Glowify di ponsel dan laptop" width={1000} height={702} priority className="block h-auto w-full" />
      </section>

      <div className="my-6 flex flex-wrap gap-2.5">
        {trust.map((t) => (
          <span key={t} className="rounded-full border border-line bg-surface px-4 py-2 text-sm">{t}</span>
        ))}
      </div>

      <h2 className="mb-1 font-display text-3xl font-semibold">Mau mulai dari mana?</h2>
      <p className="mb-6 text-muted">Klik kartu untuk membuka fitur.</p>
      <div className="grid gap-4 md:grid-cols-3">
        {features.map((f) => (
          <Link key={f.title} href={f.href} className={`${f.bg} rounded-3xl p-6 transition hover:-translate-y-1`}>
            <span className="mb-2 block text-3xl">{f.emoji}</span>
            <h3 className="mb-1 font-display text-xl font-semibold">{f.title}</h3>
            <p className="text-sm text-muted">{f.text}</p>
            <span className="mt-3 block text-sm font-semibold">{f.cta} →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
