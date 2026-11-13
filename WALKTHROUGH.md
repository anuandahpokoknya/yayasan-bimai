# Walkthrough Perubahan & Dokumentasi Teknis — BIMAI Peduli (`yayasan-bimai`)

Dokumen ini merangkum seluruh perubahan kode, audit keamanan, kepatuhan regulasi (*Meta Business Verification*), penataan database Supabase, hingga ekstraksi repositori CRM (`crm-bimai`) secara mendetail per file.

---

## Ringkasan Pencapaian
* **Meta Business Verification:** **TERVERIFIKASI** (Email resmi `Meta for Business` diterima 13 November 2026 untuk entitas **YAYASAN BINA MASYARAKAT INDONESIA**).
* **Status Build Produksi (`npm run build`):** Sukses (Exit code `0`, seluruh 20 rute terkompilasi tanpa error).
* **Arsitektur Database:** Terpisah bersih antara database publik website (`ppfqnsjzcnapptceezed` via Vercel Integration) dan database internal CRM (`mvsluohpsfrcbnkozxtg`).

---

## 1. Kepatuhan Hukum & Privasi (Meta Compliance)

### `src/app/kebijakan-privasi/page.tsx` *(File Baru)*
* Membuat halaman Kebijakan Privasi resmi sesuai regulasi UU Perlindungan Data Pribadi (UU PDP No. 27 Tahun 2022) Indonesia.
* Mencakup transparansi pengumpulan data donatur, penggunaan Meta Pixel / cookie analitik, hak akses/penghapusan data (*User Data Deletion Instruction*), serta penyelarasan alamat sekretariat Ciputat dan kantor layanan Pamulang (`+62 889-0204-7766`).

### `src/app/syarat-ketentuan/page.tsx` *(File Baru)*
* Membuat halaman Syarat & Ketentuan resmi portal donasi dan wakaf **BIMAI Peduli**.
* Menjelaskan akad donasi/wakaf/infak/sedekah, kebijakan pengembalian dana (*refund policy*) jika terjadi kesalahan transfer, hak kekayaan intelektual, dan yurisdiksi hukum Indonesia.

---

## 2. Keamanan, Kredensial & Kebersihan Repositori

### `.gitignore` *(Diubah)*
* Menambahkan `re.md` agar catatan internal tidak ikut ter-track ke Git.
* Mengecualikan `.env.example` (`!.env.example`) sementara seluruh file `.env*` tetap diabaikan agar rahasia produksi tidak bocor.
* Menambahkan `/docs/` ke daftar ignore.

### `.env.example` *(File Baru)*
* Membuat template konfigurasi environment aman berisi:
  * `NEXT_PUBLIC_BASE_URL` & `NEXT_PUBLIC_NOMOR_WA_CS`
  * Variabel Supabase (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`)
  * Variabel opsional Duitku (`DUITKU_MERCHANT_CODE`, `DUITKU_MERCHANT_KEY`, `DUITKU_ENVIRONMENT`)
  * Variabel opsional TikTok Events API (`NEXT_PUBLIC_TIKTOK_PIXEL_ID`, `TIKTOK_PIXEL_ID`, `TIKTOK_ACCESS_TOKEN`).

### `re.md` *(Untracked dari Git)*
* Dihapus dari indeks pelacakan Git (`git rm --cached`) karena berisi catatan internal dan kredensial sensitif, tetapi tetap disimpan lokal di mesin Anda melalui `.gitignore`.

### `src/lib/tiktokEvents.ts` *(Diubah)*
* Menghapus *hardcoded* `TIKTOK_PIXEL_ID` dan `TIKTOK_ACCESS_TOKEN` milik akun iklan yang sudah tersuspend.
* Membaca nilai dari `process.env.TIKTOK_PIXEL_ID` dan `process.env.TIKTOK_ACCESS_TOKEN`.
* Menambahkan *guard* `if (!TIKTOK_PIXEL_ID || !TIKTOK_ACCESS_TOKEN) return null;` agar fungsi tidak memanggil TikTok Events API jika belum dikonfigurasi.

### `src/app/api/donations/callback/route.ts` *(Diubah)*
* Menghapus *hardcoded* `DUITKU_MERCHANT_KEY` dari kode sumber dan menggantinya dengan `process.env.DUITKU_MERCHANT_KEY`.
* Menambahkan pengaman status `500` apabila `DUITKU_MERCHANT_KEY` belum diset di environment, sembari mempertahankan verifikasi signature MD5 (`merchantCode + amount + merchantOrderId + merchantKey`) dan update status ke Supabase (`success` / `failed`).

---

## 3. Verifikasi Domain Meta & Pengaman Pixel Global

### `src/app/layout.tsx` *(Diubah)*
* Mengamankan inisialisasi script klien TikTok Pixel agar hanya dirender dan dijalankan apabila `process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID` memiliki nilai (mencegah skrip akun iklan tersuspend berjalan di produksi).
* Menambahkan metadata `verification.other["facebook-domain-verification"]` bernilai `"a6lq0w0ssk019ky853tjaqt11evhh7"` untuk verifikasi kepemilikan domain `bimaipeduli.id` di Meta Business Manager.

### `public/a6lq0w0ssk019ky853tjaqt11evhh7.html` *(File Baru)*
* Menambahkan file verifikasi HTML statis Meta di direktori `public/` (`https://bimaipeduli.id/a6lq0w0ssk019ky853tjaqt11evhh7.html`) sebagai lapisan verifikasi ganda bersama meta tag di `layout.tsx`.

---

## 4. Alur Donasi 3 Langkah & Integrasi WhatsApp CS

### `src/app/api/donations/inquiry/route.ts` *(Diubah)*
* Menghapus integrasi dan kunci *hardcoded* payment gateway Duitku yang belum aktif di produksi.
* Mempertahankan validasi minimal nominal (`>= 10000`), pembuatan ID transaksi unik berformat `BIMAI-<timestamp>-<4digit>`, serta pencatatan rekapitulasi donasi berstatus `"pending"` ke Supabase melalui `saveDonationToSupabase()`.

### `src/app/donasi/page.tsx` *(Diubah)*
* Menyederhanakan Langkah 3 menjadi halaman rangkuman transaksi + pilihan preferensi metode pembayaran resmi (**QRIS Resmi Yayasan** atau **Transfer Bank Rekening Yayasan**).
* Saat tombol submit ditekan (`handleProcessPayment`):
  1. Memanggil `/api/donations/inquiry` untuk memperoleh `orderId` dan menyimpan rekap ke Supabase.
  2. Membuka tab baru ke WhatsApp CS resmi (`https://wa.me/6288902047766?text=...`) dengan format pesan otomatis berisi program, nama donatur, nomor WhatsApp, nama wakif, nominal, niat/doa, preferensi bayar, dan `Order ID`.
  3. Mengarahkan halaman ke `/donasi/sukses` membawa parameter query transaksi (dilengkapi *fallback* langsung ke WhatsApp jika koneksi API gagal).

### `src/app/donasi/sukses/page.tsx` *(Diubah)*
* Memperbarui halaman konfirmasi pasca-submit untuk menampilkan `Order ID`, tombol **Salin** `Order ID`, program, nama donatur, atas nama wakif, nominal, doa/niat, serta metode pembayaran.
* Menambahkan tombol cadangan **"Buka Chat WhatsApp CS"** menuju `6288902047766` apabila tab WhatsApp otomatis terblokir pop-up atau tertutup oleh donatur.

### `src/app/donasi/layout.tsx` *(Diubah)*
* Memperbarui teks `description` metadata agar selaras dengan alur penyaluran donasi langsung melalui portal resmi yayasan (mengganti klaim "otomatis").

### `src/app/tata-cara-pembayaran/page.tsx` *(Diubah)*
* Menulis ulang panduan & SOP alur donasi dari sebelumnya berbasis *callback* Duitku menjadi alur konfirmasi personal melalui WhatsApp Customer Service resmi, QRIS, dan transfer rekening resmi atas nama **Yayasan Bina Masyarakat Indonesia**.
* Menyelaraskan kop dokumen dengan alamat Sekretariat (Ciputat), kantor layanan (Pamulang), dan hotline `+62 889-0204-7766`.

---

## 5. Penyelarasan Legalitas, Tahun Berdiri, Kontak & Media Sosial

### `src/components/home/Hero.tsx` *(Diubah)*
* Menyeragamkan label tahun berdiri yayasan pada badge hero menjadi `"Sejak 2017 • Yayasan Bina Masyarakat Indonesia"` agar identik dengan tahun SK Kemenkumham (`2017`).

### `src/app/tentang/page.tsx` *(Diubah)*
* Menyamakan narasi tahun pendirian menjadi `2017`.
* Memperbarui bagian legalitas dari 2 kartu menjadi **4 kartu legalitas resmi**:
  1. **SK Kemenkumham:** `AHU-0010921.AH.01.04.2017`
  2. **NIB Berbasis Risiko:** `2911220041043`
  3. **Tanda Daftar Dinsos (LKS):** `460/4170-27/Bid.Dayasos/2022`
  4. **SK Kesbangpol:** `220/845/Kesbangpol/2019`

### `src/app/transparansi/page.tsx` *(Diubah)*
* Mengganti tautan tombol mati (`href="#"`) pada kartu **Laporan Tahunan 2025 (Audited)** dan **Laporan Tahunan 2024 (Audited)** menjadi tautan **"Permohonan Salinan (PDF)"** ke WhatsApp CS resmi (`6288902047766`) dengan pesan permohonan yang sudah terisi otomatis.

### `src/components/Footer.tsx` *(Diubah)*
* Menambahkan navigasi tautan ke `/kebijakan-privasi` dan `/syarat-ketentuan` (syarat wajib audit Meta).
* Memperbarui nomor kontak resmi ke `+62 889-0204-7766`.
* Mencantumkan nomor SK Kemenkumham, NIB, Tanda Daftar Dinsos, dan SK Kesbangpol di kolom profil yayasan.
* Memisahkan alamat menjadi **Kantor Sekretariat (Legalitas)** di Jl. Sukamulya Raya No. 18, Serua Indah, Ciputat 15414 dan **Kantor Layanan & Operasional** di Jl. Villa Pamulang Blok CF 1 No. 5, Pondok Benda, Pamulang 15416.
* Memperbarui tautan media sosial resmi:
  * **Facebook Fanpage:** `https://www.facebook.com/share/1FUBWNKso6/`
  * **Instagram:** `https://instagram.com/binayatimmulia_almuqit`

### `src/app/kontak/page.tsx` *(Diubah)*
* Memperbarui nomor telepon/WhatsApp layanan menjadi `+62 889-0204-7766`.
* Memisahkan informasi alamat **Kantor Sekretariat (Legalitas)** di Ciputat (sesuai SK Kemenkumham & NIB `2911220041043`) dan **Kantor Layanan & Operasional** di Pamulang.

---

## 6. Database Website (`yayasan-bimai`) & Pemisahan CRM (`crm-bimai`)

### `supabase/schema.sql` *(File Baru)*
* Menyediakan skema SQL *idempotent* khusus database portal publik website (`yayasan-bimai`):
  * Fungsi `public.handle_updated_at()` untuk memperbarui kolom `updated_at` otomatis.
  * Tabel `public.donations` (kolom: `merchant_order_id`, `jenis_donasi`, `donor_name`, `phone`, `amount` min Rp 10.000, `payment_method`, `wakif_name`, `niat`, `status_payment`, `payment_code`, `payment_reference`, `created_at`, `updated_at`) beserta 4 indeks performa dan trigger `set_donations_updated_at`.
  * Mengaktifkan **Row Level Security (RLS)** pada `public.donations` agar data pribadi donatur terlindungi (API server Next.js memakai `SUPABASE_SERVICE_ROLE_KEY`).
* **Penerapan di Supabase:**
  * Project **`ppfqnsjzcnapptceezed`** (terhubung otomatis via Vercel Storage Integration): Dikhususkan untuk **Website `yayasan-bimai`** dan sudah dieksekusi `supabase/schema.sql`.
  * Project **`mvsluohpsfrcbnkozxtg`** (akun personal Supabase): Dikhususkan untuk **CRM `crm-bimai`**, sudah di-reset bersih dan berhasil menjalankan ke-6 file migrasi asli CRM (`20261107_01` s/d `20261109_03`).

### Ekstraksi Workspace CRM (`C:\Users\Payor\Documents\Custom Office Templates\P\crm-bimai`)
* Mengkloning *bare mirror repository* `crm-leads` menjadi folder working tree normal **`crm-bimai`** (sejajar dengan `yayasan-bimai`).
* Melepas remote `origin` lama yang merujuk ke bare repo berisi token PAT GitHub lama, memverifikasi kode bebas dari secret terekspos, dan menyelesaikan `npm install` (`442 packages`).

---

## 7. Riwayat Commit Terkait di `yayasan-bimai`
1. `9ea47bb` — `feat: tambahkan halaman kebijakan privasi, syarat ketentuan, dan update kontak`
2. `bdc47af` — `fix(security): remove hardcoded secrets, untrack internal notes, and add .env.example`
3. `f939a21` — `fix(compliance): synchronize founding year to 2017 and replace dead report links with CS request`
4. `f833b94` — `feat(donations): streamline 3-step donation flow with WhatsApp CS confirmation`
5. `0751c85` — `fix(docs): align payment guide page with WhatsApp CS donation flow`
6. `cd8f188` — `fix(footer): update official Facebook fanpage link`
7. `2e487cc` — `fix(compliance): harmonize legal secretariat and operational addresses with official NIB and SK`
8. `b446b5c` — `chore: link official Instagram handle binayatimmulia_almuqit and gitignore docs folder`
9. `46d275f` — `feat(seo): add Meta Facebook domain verification meta tag`
10. `dbe8507` — `feat(seo): add Meta domain verification html file`
11. `6fc74e7` — `fix(seo): update Meta verification code to official file a6lq0w0ssk019ky853tjaqt11evhh7`
12. `93a3b0c` — `chore(db): add Supabase donations schema for website`
