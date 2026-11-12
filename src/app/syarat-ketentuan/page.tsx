import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan - BIMAI Peduli",
  description:
    "Syarat dan Ketentuan Donasi serta Layanan Yayasan Bina Masyarakat Indonesia (BIMAI Peduli).",
};

export default function SyaratKetentuanPage() {
  const lastUpdated = "11 November 2026";

  return (
    <div className="bg-[#fdfaf5] min-h-screen">
      {/* Editorial Header */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden border-b border-black/5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-12 bg-emas" />
            <p className="text-xs font-bold tracking-[0.4em] text-emas uppercase">
              Ketentuan Layanan
            </p>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl text-teks font-bold leading-tight mb-6">
            Syarat & Ketentuan
          </h1>
          <p className="text-sm text-teks-sekunder">
            Terakhir diperbarui: <span className="font-semibold text-teks">{lastUpdated}</span>
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-teks-sekunder leading-relaxed space-y-12 text-sm md:text-base">
        {/* Intro */}
        <div className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm space-y-4">
          <p>
            Syarat dan Ketentuan ini mengatur penggunaan situs web <strong>BIMAI Peduli</strong> (
            <Link href="/" className="text-hijau-tua underline font-medium">
              https://bimaipeduli.id
            </Link>
            ) yang dikelola oleh <strong>Yayasan Bina Masyarakat Indonesia</strong>, badan hukum nirlaba yang sah berdasarkan Keputusan Menteri Hukum dan Hak Asasi Manusia Republik Indonesia Nomor <strong>AHU-0010921.AH.01.04.Tahun 2017</strong>.
          </p>
          <p>
            Dengan mengakses situs web ini, berdonasi, atau menggunakan fitur-fitur yang disediakan, Anda menyatakan telah membaca, memahami, dan menyetujui seluruh ketentuan yang tercantum di bawah ini.
          </p>
        </div>

        {/* Section 1 */}
        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-teks">1. Ketentuan Umum & Keabsahan Donatur</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Donatur adalah perseorangan, lembaga, atau korporasi yang secara sukarela menyalurkan dana infaq, sedekah, wakaf, atau donasi kemanusiaan melalui platform BIMAI Peduli.
            </li>
            <li>
              Donatur menyatakan bahwa dana yang disalurkan bersumber dari perolehan yang halal, sah menurut hukum Negara Kesatuan Republik Indonesia, serta bebas dari tindak pidana pencucian uang (*money laundering*) atau pendanaan terorisme.
            </li>
            <li>
              Donatur bertanggung jawab penuh atas kebenaran data identitas, nomor kontak, serta bukti transfer yang diisikan ke dalam formulir donasi.
            </li>
          </ul>
        </div>

        {/* Section 2 */}
        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-teks">2. Penyaluran Program Donasi & Wakaf</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Yayasan Bina Masyarakat Indonesia bertindak sebagai pengelola (*nazhir* / amil) amanah donasi dari para donatur untuk disalurkan sesuai akad dan program yang dipilih (contoh: Wakaf Al-Qur&apos;an Braille, Rumah Belajar Anak Yatim, Jum&apos;at Berkah, atau bantuan kemanusiaan darurat).
            </li>
            <li>
              Apabila target dana suatu program telah tercapai atau kebutuhan di lapangan telah terpenuhi, Yayasan berhak mengalokasikan kelebihan dana tersebut untuk program kemanusiaan serupa yang lebih mendesak demi kemaslahatan penerima manfaat, dengan tetap menjaga asas akuntabilitas.
            </li>
            <li>
              Yayasan memotong biaya operasional pengelolaan program secara wajar sesuai dengan kaidah syariah dan regulasi perundang-undangan filantropi di Indonesia (maksimal 10% untuk operasional dan pelaporan, sebagaimana tercantum pada halaman{" "}
              <Link href="/transparansi" className="text-hijau-tua underline font-medium">
                Transparansi
              </Link>
              ).
            </li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-teks">3. Mekanisme Pembayaran & Konfirmasi Donasi</h2>
          <p>
            Untuk menjaga kenyamanan, ketepatan penyaluran, dan keamanan donatur, alur transaksi donasi dan wakaf saat ini dilayani secara personal melalui konfirmasi Tim Layanan Donatur (Customer Service):
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Pemilihan Program & Kontak CS:</strong> Donatur memilih program kebaikan yang ingin dibantu melalui situs web, kemudian melakukan konfirmasi kepada Customer Service resmi yayasan melalui WhatsApp di{" "}
              <a href="https://wa.me/6288902047766" className="text-hijau-tua underline font-medium">
                +62 889-0204-7766
              </a>.
            </li>
            <li>
              <strong>Penerbitan Kode QRIS & Rekening Resmi:</strong> Tim CS akan mengirimkan kode <strong>QRIS resmi Yayasan</strong> (dapat dipindai menggunakan seluruh aplikasi mobile banking atau e-wallet seperti GoPay, OVO, Dana, ShopeePay, LinkAja) atau nomor rekening bank resmi atas nama <strong>Yayasan Bina Masyarakat Indonesia</strong>.
            </li>
            <li>
              <strong>Verifikasi & Tanda Terima:</strong> Setelah melakukan pembayaran, donatur mengirimkan bukti transfer/pembayaran ke WhatsApp CS. Tim yayasan akan melakukan verifikasi dan menerbitkan bukti tanda terima donasi yang sah serta mencatatnya dalam sistem akuntabilitas yayasan.
            </li>
            <li>
              <strong>Pencegahan Penipuan:</strong> Yayasan Bina Masyarakat Indonesia tidak pernah meminta transfer donasi ke nomor rekening pribadi pengurus. Seluruh rekening resmi dan QRIS beratasnamakan <em>Yayasan Bina Masyarakat Indonesia</em>.
            </li>
          </ul>
        </div>

        {/* Section 4 - Refund Policy */}
        <div className="bg-white p-6 rounded-xl border border-black/5 space-y-3">
          <h2 className="font-serif text-xl font-bold text-teks">4. Kebijakan Pembatalan & Pengembalian Dana (Refund Policy)</h2>
          <p>
            Mengingat sifat donasi dan wakaf adalah pemberian sukarela yang langsung dialokasikan untuk kebutuhan penerima manfaat, maka <strong>donasi yang telah berhasil dibayarkan tidak dapat dibatalkan, ditarik kembali, atau dikembalikan (*non-refundable*)</strong>.
          </p>
          <p>
            Pengecualian pengembalian dana hanya dapat dipertimbangkan dalam kondisi berikut:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li>Terjadi kesalahan teknis pemotongan ganda (*double debit / double charge*) pada sistem pembayaran perbankan untuk satu pesanan yang sama.</li>
            <li>Nominal transfer mengalami kelebihan akibat kesalahan ketik (*human error* yang signifikan) dan dilaporkan dalam kurun waktu maksimal <strong>1 x 24 jam</strong> sejak transaksi dilakukan dengan melampirkan mutasi rekening resmi.</li>
          </ul>
          <p className="text-xs text-gray-500">
            Untuk pengajuan koreksi transaksi akibat kesalahan teknis, donatur dapat melapor ke email <a href="mailto:info@bimaipeduli.id" className="text-hijau-tua underline">info@bimaipeduli.id</a> atau WhatsApp +62 889-0204-7766.
          </p>
        </div>

        {/* Section 5 */}
        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-teks">5. Transparansi & Laporan Akuntabilitas</h2>
          <p>
            Yayasan berkomitmen untuk menyajikan laporan realisasi donasi secara berkala, transparan, dan dapat diakses publik melalui halaman{" "}
            <Link href="/transparansi" className="text-hijau-tua underline font-medium">
              Transparansi Keuangan
            </Link>{" "}
            maupun laporan tahunan (*Annual Report*) yang telah diaudit.
          </p>
        </div>

        {/* Section 6 */}
        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-teks">6. Hak Kekayaan Intelektual</h2>
          <p>
            Seluruh konten, materi visual, logo BIMAI Peduli, teks artikel, dokumentasi kegiatan, dan materi grafis di situs ini merupakan hak cipta milik Yayasan Bina Masyarakat Indonesia. Dilarang keras menyalin, menyebarluaskan, atau memodifikasi konten situs ini untuk kepentingan komersial tanpa izin tertulis dari pihak yayasan.
          </p>
        </div>

        {/* Section 7 */}
        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-teks">7. Hukum yang Berlaku & Penyelesaian Sengketa</h2>
          <p>
            Syarat dan Ketentuan ini diatur dan ditafsirkan sesuai dengan hukum yang berlaku di <strong>Negara Kesatuan Republik Indonesia</strong>. Segala perselisihan yang timbul akan diselesaikan terlebih dahulu melalui musyawarah untuk mencapai mufakat.
          </p>
        </div>

        {/* Section 8 */}
        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-teks">8. Kontak & Pengaduan</h2>
          <p>
            Jika Anda memiliki pertanyaan seputar Syarat & Ketentuan ini atau memerlukan bantuan teknis, silakan hubungi kami:
          </p>
          <div className="bg-white p-6 rounded-xl border border-black/5 text-sm space-y-2">
            <p className="font-bold text-teks">Yayasan Bina Masyarakat Indonesia (BIMAI Peduli)</p>
            <p>Alamat Legalitas (Sekretariat): Jl. Sukamulya Raya No. 18, RT 001/RW 007, Kel. Serua Indah, Kec. Ciputat, Kota Tangerang Selatan, Banten 15414</p>
            <p>Alamat Layanan & Operasional: Jalan Villa Pamulang Blok CF 1 No. 5, RT 011/RW 017, Pondok Benda, Pamulang, Tangerang Selatan, Banten 15416</p>
            <p>WhatsApp Layanan: +62 889-0204-7766</p>
            <p>Email: info@bimaipeduli.id</p>
          </div>
        </div>
      </section>
    </div>
  );
}
