# Glowify CMS

Proyek Next.js untuk pengembangan antarmuka pengelola produk dan pengajuan mitra. Saat ini tersedia halaman awal untuk memulai pengembangan. Frontend dan backend akan dibuat oleh penanggung jawab masing-masing.

## Mulai

Gunakan Node.js 22 atau 24. Dari root repository:

```bash
cd cms
npm ci
npm run dev
```

Buka http://localhost:3002. Ubah `src/app/page.tsx` untuk halaman awal, `src/app/layout.tsx` untuk layout, dan `src/app/globals.css` untuk gaya global. Tambahkan halaman pengelolaan di `src/app/` sesuai kebutuhan.

## Integrasi

Setup dan alamat backend akan ditentukan oleh penanggung jawab backend. Proyek CMS ini belum terhubung ke API bisnis. Sepakati endpoint, autentikasi, dan pengaturan CORS atau proxy dengan anggota backend sebelum integrasi. Simpan konfigurasi lokal di `.env.local`; kredensial server tidak boleh dikirim ke browser.

## Pemeriksaan dan produksi

```bash
npm run lint
npm run build
npm run start
```

`lint` memeriksa tipe TypeScript. Server produksi memakai port 3002. Dokumentasikan hasil kerja sebagai PDF dalam folder `dokumentasi/NamaLengkap_NPM/`. Semua anggota commit dan push langsung ke `main` sesuai [panduan tim](../README.md#alur-kerja-tim).
