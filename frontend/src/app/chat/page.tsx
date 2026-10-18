import Link from "next/link";
import ChatBox from "@/components/ChatBox";

export const metadata = { title: "Konsultasi AI – Glowify" };

export default function ChatPage() {
  return (
    <div className="fade-in">
      <h1 className="mb-1 font-display text-3xl font-semibold">Konsultasi dengan Glow AI</h1>
      <p className="mb-6 text-muted">Ceritakan keluhan kulitmu atau pilih topik cepat.</p>
      <div className="grid items-start gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="grid gap-4">
          <div className="rounded-3xl bg-lavs p-6">
            <h3 className="mb-1 font-display text-lg font-semibold">🌸 Tips cepat</h3>
            <p className="text-sm text-muted">Mulai dengan 3 langkah: cleanser, pelembap, sunscreen. Tambah serum setelah kulit terbiasa.</p>
          </div>
          <div className="rounded-3xl bg-mints p-6">
            <h3 className="mb-1 font-display text-lg font-semibold">🧴 Belum tahu jenis kulit?</h3>
            <p className="mb-3 text-sm text-muted">Ikuti quiz dulu supaya saran lebih tepat.</p>
            <Link href="/quiz" className="inline-block rounded-full bg-linear-to-br from-pink to-lav px-4 py-2 text-sm font-medium text-white">Ke Skin Quiz</Link>
          </div>
          <div className="rounded-3xl bg-suns p-6">
            <h3 className="mb-1 font-display text-lg font-semibold">⚠️ Catatan</h3>
            <p className="text-sm text-muted">Saran AI bukan pengganti dokter kulit. Konsultasikan jika iritasi berlanjut.</p>
          </div>
        </div>
        <ChatBox />
      </div>
    </div>
  );
}
