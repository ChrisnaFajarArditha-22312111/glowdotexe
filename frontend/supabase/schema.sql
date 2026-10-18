-- Jalankan seluruh isi file ini di Supabase: SQL Editor -> New query -> Run

create table if not exists products (
  id          text primary key,
  name        text not null,
  category    text not null check (category in ('Cleanser','Serum','Moisturizer','Sunscreen')),
  price       integer not null check (price >= 0),
  shape       text not null check (shape in ('tube','serum','jar','pump')),
  color       text not null default '#e56b8a',
  bg          text not null default 'pinks' check (bg in ('pinks','lavs','mints','skys','suns')),
  description text not null default '',
  active      boolean not null default true,
  sort        integer not null default 100,
  created_at  timestamptz not null default now()
);

create table if not exists mitra_applications (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  business   text not null,
  email      text not null,
  type       text not null default '',
  status     text not null default 'baru' check (status in ('baru','dihubungi','diterima','ditolak')),
  created_at timestamptz not null default now()
);

-- Keamanan: aktifkan RLS tanpa policy -> hanya server (service role key) yang bisa membaca/menulis.
alter table products enable row level security;
alter table mitra_applications enable row level security;

-- Data awal produk
insert into products (id, name, category, price, shape, color, bg, description, sort) values
 ('foam-wash',   'Gentle Foam Wash',     'Cleanser',    65000, 'tube',  '#e56b8a', 'pinks', 'Semua jenis kulit · 100 ml', 1),
 ('hydra-milk',  'Hydra Milk Cleanser',  'Cleanser',    72000, 'tube',  '#8b74f0', 'lavs',  'Kering & sensitif · 100 ml', 2),
 ('niacinamide', 'Niacinamide 10%',      'Serum',       89000, 'serum', '#e56b8a', 'pinks', 'Jerawat & pori · 30 ml', 3),
 ('vit-c',       'Vitamin C Bright',     'Serum',       99000, 'serum', '#f5a524', 'suns',  'Kusam & penuaan · 30 ml', 4),
 ('cica',        'Calm Cica Serum',      'Serum',       92000, 'serum', '#1fb894', 'mints', 'Kemerahan & iritasi · 30 ml', 5),
 ('barrier',     'Barrier Repair Cream', 'Moisturizer', 79000, 'jar',   '#8b74f0', 'lavs',  'Kering & sensitif · 50 ml', 6),
 ('gel',         'Oil-Free Gel',         'Moisturizer', 69000, 'jar',   '#3d9cf5', 'skys',  'Berminyak & kombinasi · 50 ml', 7),
 ('spf50',       'Daily Shield SPF 50',  'Sunscreen',   95000, 'pump',  '#f5a524', 'suns',  'PA++++ · tanpa white cast', 8)
on conflict (id) do nothing;
