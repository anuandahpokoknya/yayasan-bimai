"use client";

import Link from "next/link";

export default function TataCaraPembayaranPage() {
  const handlePrintPDF = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="bg-[#fafbfc] min-h-screen py-20 px-6 md:py-28">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm print:hidden">
          <div>
            <span className="text-xs font-bold text-[var(--color-emas)] uppercase tracking-widest block">
              Panduan & Standar Operasional Prosedur (SOP)
            </span>
            <h1 className="font-serif text-xl font-bold text-gray-900">
              Tata Cara Pembayaran & Konfirmasi Donasi (bimaipeduli.id)
            </h1>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handlePrintPDF}
              className="px-5 py-2.5 bg-[var(--color-hijau-tua)] hover:bg-[#123825] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow flex items-center gap-2 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Cetak / Simpan PDF
            </button>
            <Link
              href="/"
              className="px-5 py-2.5 border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors"
            >
              Kembali
            </Link>
          </div>
        </div>

        {/* Printable Content Sheet */}
        <div className="bg-white p-8 md:p-12 rounded-3xl border border-gray-200 shadow-xl space-y-10 print:shadow-none print:border-none print:p-0">
          {/* Document Header */}
          <div className="border-b-2 border-gray-900 pb-6 flex justify-between items-center">
            <div className="space-y-1">
              <h2 className="font-serif text-2xl font-bold text-gray-900 uppercase">
                Yayasan Bina Masyarakat Indonesia
              </h2>
              <p className="text-xs text-gray-600 font-medium">
                Penyelenggara Program Sosial, Pendidikan, & Wakaf Al-Qur&apos;an Braille
              </p>
              <p className="text-xs text-gray-500">
                Alamat: Jalan Villa Pamulang Blok CF 1 No. 5, RT 011/RW 017, Pamulang, Tangerang Selatan | Hotline: +62 889-0204-7766
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono font-bold text-gray-500 uppercase block">Dokumen Resmi</span>
              <span className="text-sm font-bold text-[var(--color-hijau-tua)]">SOP Alur Donasi</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-xl font-bold text-gray-900">
              SOP & Alur Tata Cara Pembayaran Donasi
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Dokumen ini memuat langkah-langkah resmi proses penggalangan dana dan pembayaran donasi pada portal resmi Yayasan Bina Masyarakat Indonesia (<span className="font-semibold text-gray-900">bimaipeduli.id</span>) yang dipandu secara personal oleh Customer Service Resmi melalui WhatsApp untuk menjaga ketepatan amanah dan transparansi akad.
            </p>
          </div>

          {/* Step By Step Guide */}
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="bg-[#fdfaf5] p-6 rounded-2xl border border-amber-200/60 space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[var(--color-hijau-tua)] text-white font-bold text-sm flex items-center justify-center">
                  1
                </span>
                <h4 className="font-serif font-bold text-base text-gray-900">
                  Pemilihan Program & Nominal Donasi (Tahap 1)
                </h4>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed pl-11">
                Pengunjung mengakses halaman program kampanye (seperti <span className="font-mono bg-white px-2 py-0.5 border rounded">/wakaf-quran-braille</span>) atau langsung menuju portal donasi di <span className="font-mono bg-white px-2 py-0.5 border rounded">/donasi</span>. Donatur memilih jenis pilar program kebaikan yang ingin dibantu serta memilih nominal donasi dalam mata uang Rupiah (IDR) melalui pilihan preset nominal atau memasukkan nominal kustom (minimal Rp 10.000).
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#fdfaf5] p-6 rounded-2xl border border-amber-200/60 space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[var(--color-hijau-tua)] text-white font-bold text-sm flex items-center justify-center">
                  2
                </span>
                <h4 className="font-serif font-bold text-base text-gray-900">
                  Pengisian Data Diri & Niat Wakif (Tahap 2)
                </h4>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed pl-11">
                Donatur melengkapi formulir data identitas mencakup Nama Lengkap (dapat memilih tetap anonim sebagai Hamba Allah), Nomor WhatsApp aktif untuk pengiriman bukti tanda terima, serta niat/doa kebaikan dan nama wakif yang diniatkan (misal: atas nama orang tua/keluarga tercinta).
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#fdfaf5] p-6 rounded-2xl border border-amber-200/60 space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[var(--color-hijau-tua)] text-white font-bold text-sm flex items-center justify-center">
                  3
                </span>
                <h4 className="font-serif font-bold text-base text-gray-900">
                  Pemilihan Kanal Pembayaran Resmi (Tahap 3)
                </h4>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed pl-11">
                Donatur memilih preferensi metode penyaluran resmi yang disediakan oleh yayasan:
              </p>
              <ul className="list-disc list-inside text-xs text-gray-600 pl-14 space-y-1">
                <li><span className="font-semibold">QRIS Resmi Yayasan:</span> Dapat dipindai instan dari seluruh aplikasi mobile banking (BCA Mobile, Livin Mandiri, BRImo, BSI Mobile) dan seluruh e-wallet (GoPay, OVO, DANA, ShopeePay, LinkAja).</li>
                <li><span className="font-semibold">Transfer Rekening Bank Yayasan:</span> Transfer langsung ke rekening bank resmi atas nama <strong>Yayasan Bina Masyarakat Indonesia</strong>.</li>
              </ul>
            </div>

            {/* Step 4 */}
            <div className="bg-[#fdfaf5] p-6 rounded-2xl border border-amber-200/60 space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[var(--color-hijau-tua)] text-white font-bold text-sm flex items-center justify-center">
                  4
                </span>
                <h4 className="font-serif font-bold text-base text-gray-900">
                  Konfirmasi WhatsApp CS & Penerbitan Bukti Transaksi Sah (Tahap 4)
                </h4>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed pl-11">
                Saat tombol <span className="font-bold text-gray-900">&quot;Konfirmasi via WhatsApp &amp; Bayar&quot;</span> ditekan, sistem otomatis men-generate nomor transaksi unik (<span className="font-mono bg-white px-1.5 py-0.5 border rounded">Order ID</span>) dan membuka WhatsApp resmi Layanan Donatur Yayasan (<span className="font-bold text-gray-900">+62 889-0204-7766</span>) dengan pesan rincian donasi yang sudah terformat rapi. Tim CS yayasan akan mengirimkan kode QRIS atau nomor rekening resmi, memvalidasi bukti transfer, serta menerbitkan bukti tanda terima resmi untuk laporan akuntabilitas donatur.
              </p>
            </div>
          </div>

          {/* Security & Authenticity Guarantee */}
          <div className="bg-amber-50/70 p-6 rounded-2xl border border-amber-200/60 space-y-2 text-xs text-gray-700">
            <h4 className="font-bold text-gray-900 flex items-center gap-1.5">
              <span>🛡️</span> Jaminan Keaslian Rekening Yayasan
            </h4>
            <p className="leading-relaxed">
              Yayasan Bina Masyarakat Indonesia tidak pernah meminta transfer dana donasi ke nomor rekening bank atas nama pribadi perorangan. Seluruh nomor rekening dan QRIS resmi beratasnamakan badan hukum <strong>Yayasan Bina Masyarakat Indonesia</strong>.
            </p>
          </div>

          {/* Footer Signatures for PDF */}
          <div className="pt-8 border-t border-gray-200 flex justify-between items-end text-xs text-gray-600">
            <div>
              <p className="font-bold text-gray-900">Disahkan Oleh:</p>
              <p className="mt-8 font-semibold">Pengurus Yayasan Bina Masyarakat Indonesia</p>
              <p>SK Kemenkumham: AHU-0010921.AH.01.04.Tahun 2017</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">Tangerang Selatan, Indonesia</p>
              <p className="text-gray-500">https://bimaipeduli.id</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
