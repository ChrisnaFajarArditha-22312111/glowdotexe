# Glowify

### Kenali kulitmu. Temukan Glow Terbaikmu..

GLOWIFY adalah website skincare yang membantu pengguna memahami kebutuhan kulit mereka. Melalui fitur konsultasi AI, pengguna dapat memperoleh rekomendasi produk dan rutinitas perawatan kulit yang sesuai. Glowify dibuat untuk mengetahui perawatan kulit menjadi lebih mudah, praktis, dan personal. Selain itu, Glowify menyediakan fitur Skin Quiz untuk membantu mengenali jenis dan permasalahan kulit pengguna. Pengguna juga dapat menjelajahi katalog produk, melihat harga, serta menambahkan produk ke keranjang belanja.

Proyek ini dikerjakan oleh tiga orang dengan fokus **frontend, backend, dan CMS**. Repository ini menjadi tempat pengembangan bersama sekaligus arsip dokumentasi pengerjaan setiap anggota.

## Produk

| Fitur | Kegunaan |
| --- | --- |
| Skin Quiz | Menjawab pertanyaan tentang kulit untuk mendapat saran rutinitas dan produk. |
| Glow AI | Bertanya tentang kandungan produk dan perawatan kulit sehari-hari. |
| Katalog & keranjang | Menelusuri produk berdasarkan kategori dan menyimpan produk pilihan. |
| Pendaftaran mitra | Mengirim pengajuan kerja sama untuk klinik, toko, atau reseller. |
| CMS | Mengelola katalog produk dan menindaklanjuti pengajuan mitra. |

Frontend dan backend akan dibangun oleh penanggung jawab masing-masing. CMS sudah memiliki proyek awal Next.js untuk memulai pengembangan.

## Tim & pembagian kerja

Setiap anggota bertanggung jawab atas satu bagian, termasuk implementasi, integrasi dengan bagian lain, dan dokumentasi hasil kerjanya.

| Bagian | Tanggung jawab | Folder kerja |
| --- | --- | --- |
| Frontend | Halaman pengguna, komponen UI, tampilan responsif, dan integrasi API. | `frontend/` |
| Backend | API, database, validasi data, autentikasi, dan integrasi layanan. | `backend/` |
| CMS | Halaman admin untuk mengelola produk dan pengajuan mitra. | `cms/` |

Nama dan NPM penanggung jawab dicantumkan pada dokumentasi masing-masing. Folder dokumentasi sudah disiapkan untuk Chrisna Fajar Arditha (22312111), Wijang Windhu Sn (22313015), dan Jois Romauli Simamarta (23312229).

## Struktur repository

```text
glowdotexe/
├── frontend/       # Area pengembangan frontend
├── backend/        # Area pengembangan backend
├── cms/            # Area pengembangan CMS
├── dokumentasi/    # Laporan PDF setiap anggota
├── LICENSE
└── README.md
```

**Kondisi kode saat ini:** `frontend/` dan `backend/` masing-masing hanya berisi `.gitkeep`. Setup dan implementasinya diserahkan kepada anggota yang bertanggung jawab. Proyek Next.js tersedia di `cms/`, berupa halaman awal pengembangan. Fitur produk di atas merupakan ruang lingkup yang akan dikerjakan tim.

## Mulai mengerjakan proyek

### Frontend

Mulai proyek di folder `frontend/`. Penanggung jawab frontend menentukan setup, membangun halaman pengguna, dan mengintegrasikan API. Setelah setup selesai, tambahkan dependensi, lockfile, serta panduan menjalankan proyek ke repository.

### Backend — API

Mulai proyek di folder `backend/`. Backend hanya menyediakan API. Penanggung jawab backend menentukan framework, database, autentikasi, dan port server. Sepakati format request dan response dengan frontend serta CMS, lalu dokumentasikan endpoint dan cara menjalankan server.

### CMS

Gunakan Node.js 22 atau 24 dan npm. Dari root repository:

```bash
cd cms
npm ci
npm run dev
```

Buka alamat pada baris **Local** yang muncul di terminal setelah `npm run dev`. Saat pengembangan, Next.js memilih port yang tersedia jika port default sedang digunakan, jadi alamat dapat berbeda sesuai proyek yang dijalankan lebih dulu. Mulai dari `cms/src/app/page.tsx` untuk halaman awal, `cms/src/app/layout.tsx` untuk layout, dan `cms/src/app/globals.css` untuk gaya global.

CMS saat ini baru memiliki halaman awal dan belum terhubung ke API. Pengembangan fitur pengelolaan produk, mitra, serta login admin dilakukan di proyek ini. Simpan konfigurasi lokal di `cms/.env.local`; file tersebut diabaikan Git.

Panduan selengkapnya tersedia di [cms/README.md](cms/README.md).

## Alur kerja tim

Semua anggota bekerja langsung di branch `main` dan push ke `main`, tanpa membuat branch baru atau pull request.

1. Jalankan `git switch main` dan `git pull --rebase origin main` sebelum mulai bekerja. Pastikan perubahan lokal sebelumnya sudah di-commit.
2. Kerjakan bagian masing-masing. Koordinasikan perubahan pada file bersama dan sepakati format request serta response sebelum integrasi.
3. Perbarui dokumentasi PDF saat ada hasil pengerjaan baru.
4. Periksa perubahan dengan `git diff`, lalu tambahkan hanya file yang dikerjakan menggunakan `git add <path-file>` dan buat commit dengan pesan yang menjelaskan perubahan.
5. Jalankan `git pull --rebase origin main` kembali sebelum `git push origin main` agar commit anggota lain ikut terbawa. Jika terjadi konflik, selesaikan lalu jalankan `git add <file-konflik>` dan `git rebase --continue` sebelum push.

Jika push ditolak karena ada commit baru dari anggota lain, ulangi pull dengan rebase lalu push kembali. Jangan gunakan force push ke `main`.

Untuk CMS, jalankan pemeriksaan berikut dari folder `cms/`. Script `lint` saat ini memeriksa tipe TypeScript:

```bash
npm run lint
npm run build
```

Untuk menjalankan hasil build produksi CMS, gunakan `npm run start` dari folder yang sama. Alamat server ditampilkan di terminal. Jika menjalankan beberapa server produksi bersamaan, tentukan port yang tersedia lewat `npm run start -- --port <nomor-port>`. Panduan pemeriksaan frontend dan backend ditambahkan oleh penanggung jawab setelah setup.

## Dokumentasi pengerjaan

Setiap anggota membuat folder sendiri di dalam `dokumentasi/` dengan format **`NamaLengkap_NPM`**. Simpan laporan pengerjaan dalam bentuk **PDF** di folder tersebut.

```text
dokumentasi/
├── ChrisnaFajarArditha_22312111/
│   └── .gitkeep
├── WijangWindhuSn_22313015/
│   └── .gitkeep
└── JoisRomauliSimamarta_23312229/
    └── .gitkeep
```

Gunakan nama file sesuai bagian yang dikerjakan: `dokumentasi_fe.pdf`, `dokumentasi_backend.pdf`, atau `dokumentasi_cms.pdf`.

Isi laporan mencakup identitas anggota, bagian yang menjadi tanggung jawabnya, fitur yang dikerjakan, langkah implementasi, tangkapan layar hasil, pengujian, serta kendala dan penyelesaiannya. Cantumkan tanggal atau periode pengerjaan agar progres dapat ditelusuri.

## Teknologi

CMS: Next.js 15 · React 19 · TypeScript. Teknologi frontend dan backend ditentukan oleh penanggung jawab masing-masing.

## Lisensi

Ketentuan penggunaan kode tersedia di [LICENSE](LICENSE).
