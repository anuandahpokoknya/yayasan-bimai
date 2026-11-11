import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kebijakan Privasi - BIMAI Peduli",
  description:
    "Kebijakan Privasi dan Perlindungan Data Pribadi Yayasan Bina Masyarakat Indonesia (BIMAI Peduli).",
};

export default function KebijakanPrivasiPage() {
  const lastUpdated = "11 November 2026";

  return (
    <div className="bg-[#fdfaf5] min-h-screen">
      {/* Editorial Header */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden border-b border-black/5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-12 bg-emas" />
            <p className="text-xs font-bold tracking-[0.4em] text-emas uppercase">
              Legal & Kepatuhan
            </p>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl text-teks font-bold leading-tight mb-6">
            Kebijakan Privasi
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
            Selamat datang di situs resmi <strong>Yayasan Bina Masyarakat Indonesia (BIMAI Peduli)</strong> (
            <Link href="/" className="text-hijau-tua underline font-medium">
              https://bimaipeduli.id
            </Link>
            ). Kami menghargai dan berkomitmen untuk melindungi privasi serta keamanan data pribadi donatur, relawan, mitra, dan pengunjung situs kami.
          </p>
          <p>
            Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, memproses, dan melindungi informasi pribadi Anda sesuai dengan peraturan perundang-undangan Republik Indonesia, termasuk <strong>Undang-Undang Nomor 27 Tahun 2022 tentang Perlindungan Data Pribadi (UU PDP)</strong> serta standar kepatuhan mitra teknologi global kami (termasuk Meta Platforms, Inc. dan penyedia payment gateway).
          </p>
        </div>

        {/* Section 1 */}
        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-teks">1. Informasi yang Kami Kumpulkan</h2>
          <p>Kami mengumpulkan beberapa jenis data untuk melayani transaksi donasi dan interaksi Anda di situs kami:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Data Identitas Pribadi:</strong> Nama lengkap, alamat email, dan nomor telepon / WhatsApp yang Anda berikan saat mengisi formulir donasi atau formulir kontak.
            </li>
            <li>
              <strong>Data Transaksi Donasi:</strong> Nominal donasi, program pilihan (misal: Wakaf Al-Qur&apos;an Braille, Sedekah Subuh), metode pembayaran yang dipilih, nama wakif (jika diisi), niat/doa, dan status pembayaran. Kami <em>tidak</em> menyimpan data sensitif perbankan seperti nomor kartu kredit atau PIN Anda.
            </li>
            <li>
              <strong>Data Teknis & Perangkat:</strong> Alamat Protokol Internet (IP address), tipe peramban (browser), sistem operasi, waktu akses, serta riwayat interaksi halaman melalui cookies dan teknologi pelacakan.
            </li>
          </ul>
        </div>

        {/* Section 2 */}
        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-teks">2. Tujuan Penggunaan Informasi</h2>
          <p>Data pribadi yang dikumpulkan digunakan semata-mata untuk:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Memproses, mencatat, dan memvalidasi transaksi donasi atau wakaf yang dikonfirmasikan melalui layanan resmi yayasan.</li>
            <li>Mengirimkan tanda terima pembayaran resmi, bukti transfer, dan laporan berkala terkait penyaluran program kebaikan.</li>
            <li>Menghubungi Anda terkait konfirmasi transaksi donasi atau menjawab pertanyaan yang Anda sampaikan melalui formulir kontak.</li>
            <li>Menganalisis performa situs dan meningkatkan kualitas layanan publik serta kampanye sosial kemanusiaan.</li>
            <li>Memenuhi kewajiban pelaporan hukum, audit keuangan, dan kepatuhan perizinan filantropi di Indonesia.</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-teks">3. Penggunaan Cookie, Meta Pixel, dan Alat Analisis</h2>
          <p>
            Situs kami menggunakan teknologi <strong>Cookies</strong> serta alat analitik pihak ketiga terpercaya, termasuk <strong>Meta Pixel (Facebook Pixel)</strong> dan analitik periklanan sosial lainnya.
          </p>
          <p>
            Alat ini berfungsi untuk mengukur efektivitas kampanye kemanusiaan, memahami cara pengunjung berinteraksi dengan situs, serta menampilkan informasi donasi yang relevan kepada audiens yang tepat di platform Meta (Facebook dan Instagram). Data yang dihimpun oleh pelacak ini dienkripsi dan tidak digunakan untuk mengidentifikasi Anda secara pribadi di luar konteks pelaporan analitik.
          </p>
          <p>
            Anda dapat mengatur peramban Anda untuk menolak semua atau sebagian cookies melalui pengaturan browser Anda kapan saja.
          </p>
        </div>

        {/* Section 4 */}
        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-teks">4. Berbagi Informasi dengan Pihak Ketiga</h2>
          <p>
            Yayasan Bina Masyarakat Indonesia <strong>tidak pernah menjual, menyewakan, atau memperdagangkan data pribadi donatur</strong> kepada pihak ketiga manapun untuk tujuan komersial. Kami hanya membagikan data kepada mitra terpercaya dalam batas kebutuhan operasional:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Lembaga Perbankan & Penyelenggara Jasa Pembayaran Resmi:</strong> Rekening bank dan penerbit QRIS resmi atas nama Yayasan Bina Masyarakat Indonesia yang berizin dan diawasi oleh Bank Indonesia untuk penerimaan dana donasi secara aman.
            </li>
            <li>
              <strong>Otoritas Hukum Berwenang:</strong> Jika diwajibkan oleh proses hukum, pengadilan, atau perintah resmi dari otoritas pemerintah Republik Indonesia yang sah.
            </li>
          </ul>
        </div>

        {/* Section 5 */}
        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-teks">5. Penyimpanan & Keamanan Data</h2>
          <p>
            Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang ketat, termasuk enkripsi Secure Socket Layer (SSL/HTTPS), kontrol akses terbatas, dan penyimpanan database aman untuk melindungi data pribadi Anda dari akses tidak sah, pengubahan, pengungkapan, atau pemusnahan yang melanggar hukum.
          </p>
        </div>

        {/* Section 6 - Data Deletion Instructions (Crucial for Meta) */}
        <div className="bg-emas/5 border-l-4 border-emas p-6 rounded-r-xl space-y-3">
          <h2 className="font-serif text-xl font-bold text-teks">6. Hak Anda & Instruksi Penghapusan Data (Data Deletion Request)</h2>
          <p>
            Sebagai pemilik data pribadi, Anda memiliki hak penuh untuk mengakses, memperbarui, membatasi pemrosesan, atau meminta <strong>penghapusan data pribadi Anda</strong> dari database kami sewaktu-waktu sesuai dengan ketentuan UU PDP dan standar Meta.
          </p>
          <p>
            Untuk mengajukan permohonan penghapusan data atau salinan data Anda, silakan hubungi kami dengan menyertakan nama dan alamat email/nomor telepon yang terdaftar melalui:
          </p>
          <ul className="list-none space-y-1 font-medium text-teks">
            <li>📧 Email: <a href="mailto:info@bimaipeduli.id" className="text-hijau-tua underline">info@bimaipeduli.id</a> (Subjek: &quot;Permohonan Penghapusan Data&quot;)</li>
            <li>💬 WhatsApp Resmi: <a href="https://wa.me/6288902047766" className="text-hijau-tua underline">+62 889-0204-7766</a></li>
          </ul>
          <p className="text-xs text-gray-500">
            Tim kami akan memproses dan mengonfirmasi penghapusan data Anda dalam waktu maksimal 3x24 jam kerja setelah verifikasi identitas.
          </p>
        </div>

        {/* Section 7 */}
        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-teks">7. Hubungi Kami</h2>
          <p>
            Apabila Anda memiliki pertanyaan, saran, atau kekhawatiran terkait Kebijakan Privasi ini, silakan hubungi sekretariat kami:
          </p>
          <div className="bg-white p-6 rounded-xl border border-black/5 text-sm space-y-2">
            <p className="font-bold text-teks">Yayasan Bina Masyarakat Indonesia (BIMAI Peduli)</p>
            <p>SK Kemenkumham: AHU-0010921.AH.01.04.Tahun 2017</p>
            <p>Alamat: Jalan Villa Pamulang Blok CF 1 No. 5, RT 011/RW 017, Pondok Benda, Pamulang, Kota Tangerang Selatan, Banten 15416</p>
            <p>Email: info@bimaipeduli.id</p>
            <p>Telepon / WhatsApp: +62 889-0204-7766</p>
          </div>
        </div>
      </section>
    </div>
  );
}
