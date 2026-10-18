# Glowify

### Kenali kulitmu. Temukan Glow Terbaikmu..

Glowify membantu pengguna memilih perawatan kulit lewat kuis singkat, katalog produk, dan percakapan dengan Glow AI. Pengguna bisa menjelajahi produk sesuai kebutuhan, menyimpan pilihan ke keranjang, atau mendaftar sebagai mitra.

Proyek ini dikerjakan oleh tiga orang dengan fokus **frontend, backend, dan CMS**. Repository ini menjadi tempat pengembangan bersama sekaligus arsip dokumentasi pengerjaan setiap anggota.

## Produk

| Fitur | Kegunaan |
| --- | --- |
| Skin Quiz | Menjawab pertanyaan tentang kulit untuk mendapat saran rutinitas dan produk. |
| Glow AI | Bertanya tentang kandungan produk dan perawatan kulit sehari-hari. |
| Katalog & keranjang | Menelusuri produk berdasarkan kategori dan menyimpan produk pilihan. |
| Pendaftaran mitra | Mengirim pengajuan kerja sama untuk klinik, toko, atau reseller. |
| CMS | Mengelola katalog produk dan menindaklanjuti pengajuan mitra. |

Saat ini aplikasi dapat dijalankan dalam mode demo. Katalog memakai data bawaan dan chat memakai respons berbasis kata kunci jika layanan eksternal belum dikonfigurasi. Database menggunakan Supabase; chat AI terhubung ke Anthropic saat API key tersedia.

## Tim & pembagian kerja

Setiap anggota bertanggung jawab atas satu bagian, termasuk implementasi, integrasi dengan bagian lain, dan dokumentasi hasil kerjanya.

| Bagian | Tanggung jawab | Folder kerja |
| --- | --- | --- |
| Frontend | Halaman pengguna, komponen UI, tampilan responsif, dan integrasi API. | `frontend/` |
| Backend | API, database, validasi data, autentikasi, dan integrasi layanan. | `backend/` |
| CMS | Halaman admin untuk mengelola produk dan pengajuan mitra. | `cms/` |

Nama dan NPM penanggung jawab dicantumkan pada dokumentasi masing-masing. Arsip yang sudah tersedia: [Chrisna Fajar Arditha · 22312111](dokumentasi/ChrisnaFajarArditha_22312111/dokumentasi_fe.pdf).

## Struktur repository

```text
glowdotexe/
├── frontend/       # Aplikasi Next.js dan antarmuka pengguna
├── backend/        # Area pengembangan backend
├── cms/            # Area pengembangan CMS
├── dokumentasi/    # Laporan PDF setiap anggota
├── LICENSE
└── README.md
```

**Kondisi kode saat ini:** API, akses database, dan panel admin masih berada di aplikasi Next.js dalam `frontend/`. Route API ada di `frontend/src/app/api/`, panel admin di `frontend/src/app/admin/`, dan skema database di `frontend/supabase/schema.sql`. Folder `backend/` dan `cms/` saat ini berisi placeholder untuk pengembangan tim.

## Jalankan lokal

Siapkan Node.js dan npm, lalu jalankan dari root repository:

```bash
cd frontend
npm ci
npm run dev
```

Buka [localhost:3000](http://localhost:3000). Mode demo dapat dicoba tanpa konfigurasi tambahan.

Untuk mengaktifkan database, CMS, dan layanan AI, buat `frontend/.env.local` lalu isi sesuai layanan yang digunakan:

```dotenv
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_PASSWORD=
ADMIN_SECRET=
ANTHROPIC_API_KEY=
```

Jalankan skema di `frontend/supabase/schema.sql` melalui SQL Editor Supabase. Untuk login CMS, isi `ADMIN_PASSWORD` dan `ADMIN_SECRET` dengan teks acak minimal 16 karakter untuk secret, lalu buka `/admin/login`. Restart server setelah mengubah environment variable. Simpan kredensial di `.env.local`; file tersebut sudah dikecualikan dari Git.

Panduan teknis aplikasi tersedia di [frontend/README.md](frontend/README.md).

## Alur kerja tim

Semua anggota bekerja langsung di branch `main` dan push ke `main`, tanpa membuat branch baru atau pull request.

1. Jalankan `git switch main` dan `git pull --rebase origin main` sebelum mulai bekerja. Pastikan perubahan lokal sebelumnya sudah di-commit.
2. Kerjakan bagian masing-masing. Koordinasikan perubahan pada file bersama dan sepakati format request serta response sebelum integrasi.
3. Perbarui dokumentasi PDF saat ada hasil pengerjaan baru.
4. Periksa perubahan dengan `git diff`, lalu tambahkan hanya file yang dikerjakan menggunakan `git add <path-file>` dan buat commit dengan pesan yang menjelaskan perubahan.
5. Jalankan `git pull --rebase origin main` kembali sebelum `git push origin main` agar commit anggota lain ikut terbawa. Jika terjadi konflik, selesaikan lalu jalankan `git add <file-konflik>` dan `git rebase --continue` sebelum push.

Jika push ditolak karena ada commit baru dari anggota lain, ulangi pull dengan rebase lalu push kembali. Jangan gunakan force push ke `main`.

Pemeriksaan aplikasi dijalankan dari folder `frontend/`:

```bash
npm run lint
npm run build
```

## Dokumentasi pengerjaan

Setiap anggota membuat folder sendiri di dalam `dokumentasi/` dengan format **`NamaLengkap_NPM`**. Simpan laporan pengerjaan dalam bentuk **PDF** di folder tersebut.

```text
dokumentasi/
├── ChrisnaFajarArditha_22312111/
│   └── dokumentasi_fe.pdf
└── NamaLengkap_NPM/
    └── dokumentasi_backend.pdf
```

Gunakan nama file sesuai bagian yang dikerjakan: `dokumentasi_fe.pdf`, `dokumentasi_backend.pdf`, atau `dokumentasi_cms.pdf`.

Isi laporan mencakup identitas anggota, bagian yang menjadi tanggung jawabnya, fitur yang dikerjakan, langkah implementasi, tangkapan layar hasil, pengujian, serta kendala dan penyelesaiannya. Cantumkan tanggal atau periode pengerjaan agar progres dapat ditelusuri.

## Teknologi

Next.js 15 · React 19 · TypeScript · Tailwind CSS 4 · Supabase PostgreSQL · Anthropic API

## Lisensi

Ketentuan penggunaan kode tersedia di [LICENSE](LICENSE).
