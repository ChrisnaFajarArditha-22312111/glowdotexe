const rules: [RegExp, string][] = [
  [/jerawat|berminyak|minyak/, "Untuk kulit berminyak & berjerawat:\n☀️ Pagi: cleanser lembut → niacinamide → pelembap gel → sunscreen\n🌙 Malam: cleanser → salicylic acid (2–3x seminggu) → pelembap\n\nJangan terlalu sering eksfoliasi ya."],
  [/kusam|cerah|flek/, "Untuk kulit kusam:\n• Vitamin C di pagi hari\n• Eksfoliasi lembut 1–2x seminggu\n• Sunscreen setiap hari (wajib!)\n\nHasil biasanya terlihat dalam 4–8 minggu."],
  [/sensitif|perih|merah|iritasi/, "Kulit sensitif butuh rutinitas simpel:\n• Pembersih tanpa pewangi\n• Pelembap dengan ceramide\n• Kenalkan produk baru satu per satu\n\nJika iritasi berlanjut, periksa ke dokter kulit."],
  [/urutan|langkah|rutinitas|routine/, "Urutan dasar skincare:\n1️⃣ Cleanser\n2️⃣ Toner (opsional)\n3️⃣ Serum\n4️⃣ Pelembap\n5️⃣ Sunscreen (pagi)\n\nMulai dari 3 langkah dulu: cleanser, pelembap, sunscreen."],
];

export function fallbackReply(text: string): string {
  const t = text.toLowerCase();
  for (const [re, reply] of rules) if (re.test(t)) return reply;
  return "Terima kasih sudah cerita! Boleh kasih tahu jenis kulitmu (berminyak, kering, kombinasi, atau sensitif) dan keluhan utamanya? Biar saranku lebih tepat 🌸";
}
