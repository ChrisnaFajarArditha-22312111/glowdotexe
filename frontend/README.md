# Glowify

Website perawatan kulit dengan **Skin Quiz**, **konsultasi AI (Glow AI)**, **katalog produk + keranjang**, **halaman mitra**, dan **panel admin (CMS)**.
Dibangun dengan **Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4**, dan **Supabase (PostgreSQL)**.

| Bagian | Isi |
|---|---|
| **Frontend** | Halaman dan komponen React/Tailwind di `src/app` dan `src/components` |
| **Backend** | API Route Next.js di `src/app/api` + akses database di `src/lib` |
| **Database** | Supabase PostgreSQL (`supabase/schema.sql`) |
| **CMS** | Panel `/admin`: kelola produk dan pendaftar mitra tanpa mengedit kode |

## Cara menjalankan

Pastikan Node.js 18.18+ sudah terpasang, lalu di terminal VS Code:

```bash
npm install
cp .env.example .env.local   # opsional, untuk mengaktifkan AI sungguhan
npm run dev
```

Buka http://localhost:3000

> Semua pengaturan di `.env.local` bersifat opsional. Tanpa itu web tetap jalan dalam **mode demo**:
> produk memakai data bawaan, Glow AI memakai jawaban kata kunci, dan admin belum aktif.

## Menyambungkan Supabase (database + CMS)

1. Buat akun dan proyek baru di https://supabase.com (gratis).
2. Buka **SQL Editor → New query**, tempel seluruh isi `supabase/schema.sql`, lalu klik **Run**.
   Ini membuat tabel `products` dan `mitra_applications` beserta 8 produk awal.
3. Buka **Project Settings → API**, lalu salin:
   - **Project URL** ke `SUPABASE_URL`
   - **service_role key** ke `SUPABASE_SERVICE_ROLE_KEY` (rahasia, hanya dipakai di server)
4. Isi password admin di `.env.local`:
   ```env
   ADMIN_PASSWORD=password-pilihan-anda
   ADMIN_SECRET=teks-acak-minimal-16-karakter
   ```
5. Restart `npm run dev`, lalu buka http://localhost:3000/admin/login.

### Fitur panel admin
- **/admin**: tambah, ubah, hapus produk; atur harga, kategori, warna botol, dan sembunyikan/tampilkan produk. Perubahan langsung tampil di `/produk`, di Skin Quiz, dan dikenali Glow AI.
- **/admin/mitra**: lihat pendaftar mitra dari formulir, ubah status (baru, dihubungi, diterima, ditolak), dan hapus.

### Keamanan
- Tabel memakai Row Level Security tanpa policy, jadi hanya server yang bisa membaca atau menulis lewat service role key.
- Login admin memakai password dan cookie bertanda tangan HMAC (httpOnly, kedaluwarsa 8 jam). Semua API admin memeriksa cookie ini.
- Jangan pernah meng-commit `.env.local` atau memakai prefix `NEXT_PUBLIC_` untuk key rahasia.

## Struktur folder

```
src/
├─ app/
│  ├─ layout.tsx          # layout global: font, navbar, footer, keranjang
│  ├─ globals.css         # Tailwind + warna tema (light/dark)
│  ├─ page.tsx            # Beranda
│  ├─ quiz/page.tsx       # Skin Quiz
│  ├─ chat/page.tsx       # Konsultasi AI
│  ├─ produk/page.tsx     # Katalog produk
│  ├─ mitra/page.tsx      # Halaman mitra
│  ├─ admin/              # CMS: login, kelola produk, pendaftar mitra
│  └─ api/
│     ├─ chat/route.ts    # API chat -> Anthropic API (fallback: mode demo)
│     ├─ mitra/route.ts   # API pendaftaran mitra -> tabel mitra_applications
│     └─ admin/           # API login, logout, CRUD produk, kelola mitra
├─ components/            # Navbar, Footer, ChatBox, Quiz, ProductCard, AdminProducts, dll
supabase/schema.sql     # skema tabel + data awal (jalankan di SQL Editor Supabase)
└─ lib/
   ├─ products.ts         # tipe produk + data bawaan (cadangan bila Supabase belum diatur)
   ├─ db.ts               # membaca produk & mitra dari Supabase
   ├─ supabase.ts         # klien Supabase (server-only)
   ├─ auth.ts             # login admin (cookie bertanda tangan)
   ├─ quiz.ts             # pertanyaan quiz & logika rekomendasi
   └─ fallbackReply.ts    # jawaban demo Glow AI
```

## Logo

File logo ada di `public/logo/` (ikon, logo horizontal, versi latar gelap, versi tumpuk, dan banner promosi `glowify-banner.png`). Favicon ada di `src/app/icon.svg`.

## Yang bisa Anda kembangkan

- **Ganti ilustrasi dengan foto produk asli**: taruh gambar di `public/images/`, lalu pakai `next/image` di `ProductCard.tsx`.
- **Tambah produk**: lewat panel `/admin` (atau ubah `seedProducts` di `src/lib/products.ts` untuk data bawaan).
- **Ubah karakter Glow AI**: edit `SYSTEM` di `src/app/api/chat/route.ts`.
- **Ubah warna**: edit variabel di `src/app/globals.css`.
- **Deploy**: push ke GitHub lalu impor ke [Vercel](https://vercel.com). Jangan lupa isi `ANTHROPIC_API_KEY` di Environment Variables.

> Keamanan: API key hanya dipakai di server (`route.ts`). Jangan pernah menaruhnya di komponen client atau meng-commit `.env.local`.
