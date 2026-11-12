import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transparansi Keuangan - BIMAI Peduli",
  description:
    "Laporan penggunaan dana donasi Yayasan Bina Masyarakat Indonesia yang transparan, akuntabel, dan tepercaya.",
};

const alokasiDana = [
  {
    kategori: "Pendidikan & Anak Yatim",
    persentase: 40,
    warna: "bg-[var(--color-hijau-tua)]",
    keterangan: "Beasiswa, perlengkapan sekolah, dan operasional Rumah Belajar BIMAI.",
  },
  {
    kategori: "Wakaf & Sarana Keagamaan",
    persentase: 35,
    warna: "bg-[var(--color-emas)]",
    keterangan: "Distribusi Al-Qur'an baru, Al-Qur'an Braille, dan renovasi sarana ibadah.",
  },
  {
    kategori: "Sosial & Kemanusiaan",
    persentase: 15,
    warna: "bg-[var(--color-teks-sekunder)]",
    keterangan: "Sembako Jum'at Berkah, bantuan darurat kebencanaan, dan santunan dhuafa.",
  },
  {
    kategori: "Operasional Yayasan",
    persentase: 10,
    warna: "bg-gray-400",
    keterangan: "Biaya administrasi, pengelolaan program, dan pelaporan akuntabilitas.",
  },
];

const logPenyaluran = [
  {
    tanggal: "Juni 2026",
    program: "Jum'at Berkah & Sembako Dhuafa",
    nominal: 8000000,
    status: "Tersalurkan",
  },
  {
    tanggal: "Mei 2026",
    program: "Penyaluran 500 Mushaf Al-Qur'an Baru",
    nominal: 18500000,
    status: "Tersalurkan",
  },
  {
    tanggal: "April 2026",
    program: "Wakaf 50 Al-Qur'an Braille Tunanetra",
    nominal: 12400000,
    status: "Tersalurkan",
  },
  {
    tanggal: "Maret 2026",
    program: "Beasiswa Pendidikan Yatim & Dhuafa Semester II",
    nominal: 15000000,
    status: "Tersalurkan",
  },
];

const annualReports = [
  {
    tahun: "Laporan Tahunan 2025 (Audited)",
    ukuran: "4.2 MB",
    deskripsi: "Laporan aktivitas program lengkap dan posisi keuangan per Desember 2025.",
  },
  {
    tahun: "Laporan Tahunan 2024 (Audited)",
    ukuran: "3.8 MB",
    deskripsi: "Laporan penggunaan dana publik dan pencapaian dampak sosial tahun 2024.",
  },
];

export default function TransparansiPage() {
  return (
    <div className="bg-[#fdfaf5] min-h-screen">
      {/* Editorial Header */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <span className="h-px w-12 bg-emas" />
            <p className="text-xs font-bold tracking-[0.4em] text-emas uppercase">
              Amanah & Akuntabilitas
            </p>
          </div>
          <h1 className="font-serif text-5xl md:text-8xl text-teks font-bold leading-[0.85] mb-12">
            Transparansi <br /> <span className="text-hijau-tua">Mutlak.</span>
          </h1>
          <p className="text-teks-sekunder text-lg md:text-xl leading-relaxed max-w-2xl border-l-2 border-hijau-tua pl-8">
            Kami percaya bahwa keterbukaan adalah kunci utama menjaga kepercayaan umat. Setiap rupiah yang diamanahkan dikelola secara profesional dan dilaporkan secara periodik.
          </p>
        </div>
      </section>

      {/* Financial Summary */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 border border-black/5 rounded-2xl shadow-sm">
            <span className="text-xs font-bold text-teks-sekunder tracking-wider uppercase block mb-2">Total Penerimaan 2025/2026</span>
            <span className="font-serif text-3xl font-bold text-hijau-tua">Rp 120.500.000</span>
            <span className="text-[10px] text-gray-400 block mt-2">Akumulasi donasi terhitung s.d. Juni 2026</span>
          </div>
          <div className="bg-white p-8 border border-black/5 rounded-2xl shadow-sm">
            <span className="text-xs font-bold text-teks-sekunder tracking-wider uppercase block mb-2">Total Penyaluran Program</span>
            <span className="font-serif text-3xl font-bold text-emas">Rp 108.450.000</span>
            <span className="text-[10px] text-gray-400 block mt-2">Telah disalurkan ke berbagai pilar kebaikan</span>
          </div>
          <div className="bg-white p-8 border border-black/5 rounded-2xl shadow-sm">
            <span className="text-xs font-bold text-teks-sekunder tracking-wider uppercase block mb-2">Persentase Penyaluran</span>
            <span className="font-serif text-3xl font-bold text-teks">90%</span>
            <span className="text-[10px] text-gray-400 block mt-2">Rasio efektivitas penyaluran dana sosial</span>
          </div>
        </div>
      </section>

      {/* Allocation Diagram */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-white p-8 md:p-12 border border-black/5 rounded-2xl shadow-sm">
          <h2 className="font-serif text-3xl text-teks font-bold mb-10 text-center md:text-left">Alokasi Penyaluran Dana</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="flex flex-col gap-6 justify-center">
              {alokasiDana.map((item) => (
                <div key={item.kategori} className="space-y-2">
                  <div className="flex justify-between font-bold text-sm">
                    <span className="text-teks">{item.kategori}</span>
                    <span className="text-hijau-tua">{item.persentase}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                    <div className={`${item.warna} h-full rounded-full`} style={{ width: `${item.persentase}%` }} />
                  </div>
                  <p className="text-xs text-teks-sekunder leading-relaxed">{item.keterangan}</p>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col justify-center bg-[#fdfaf5] p-8 border border-emas/10 rounded-2xl">
              <h3 className="font-serif text-xl font-bold text-teks mb-4">Metodologi Akuntansi</h3>
              <p className="text-sm text-teks-sekunder leading-relaxed mb-6">
                Yayasan Bina Masyarakat Indonesia menggunakan metode pembukuan yang berstandar nasional PSAK 109 untuk akuntansi Zakat, Infak, dan Sedekah.
              </p>
              <ul className="space-y-3 text-sm text-teks-sekunder">
                <li className="flex gap-3 items-start">
                  <span className="text-emas">✓</span>
                  <span>Diaudit oleh Kantor Akuntan Publik secara berkala.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-emas">✓</span>
                  <span>Pemisahan rekening antara dana zakat, wakaf, sedekah, dan operasional.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-emas">✓</span>
                  <span>Laporan dampak sosial yang terbit setiap semester.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Monthly Log */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white p-8 border border-black/5 rounded-2xl shadow-sm">
          <h2 className="font-serif text-3xl text-teks font-bold mb-8">Penyaluran Terakhir (2026)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-teks-sekunder font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-4 px-2">Bulan/Periode</th>
                  <th className="py-4 px-2">Program Penyaluran</th>
                  <th className="py-4 px-2 text-right">Nominal</th>
                  <th className="py-4 px-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-teks">
                {logPenyaluran.map((log, index) => (
                  <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-2 font-medium">{log.tanggal}</td>
                    <td className="py-4 px-2 text-teks-sekunder">{log.program}</td>
                    <td className="py-4 px-2 text-right font-mono font-semibold text-hijau-tua">
                      Rp {log.nominal.toLocaleString("id-ID")}
                    </td>
                    <td className="py-4 px-2 text-center">
                      <span className="inline-block bg-hijau-muda text-[var(--color-hijau-tua)] px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider">
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Annual Reports Downloads */}
      <section className="max-w-6xl mx-auto px-6 py-16 mb-20">
        <h2 className="font-serif text-3xl text-teks font-bold mb-8 text-center">Dokumen Annual Report</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {annualReports.map((report, index) => (
            <div key={index} className="bg-white p-8 border border-black/5 rounded-2xl shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl">📁</span>
                  <span className="text-[10px] bg-gray-100 px-2 py-1 rounded font-mono text-gray-500 font-bold">
                    {report.ukuran}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-teks mb-2">{report.tahun}</h3>
                <p className="text-sm text-teks-sekunder leading-relaxed mb-8">{report.deskripsi}</p>
              </div>
              <a 
                href={`https://wa.me/6288902047766?text=${encodeURIComponent(`Assalamu'alaikum Admin BIMAI, saya ingin mengajukan permohonan salinan dokumen resmi ${report.tahun}. Terima kasih.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-[#fdfaf5] hover:bg-teks hover:text-white border border-teks text-xs font-bold tracking-widest uppercase transition-colors text-center block"
              >
                Permohonan Salinan (PDF) &rarr;
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
