"use client";

import { useState } from "react";

export default function KontakPage() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    whatsapp: "",
    subjek: "",
    pesan: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStatus("success");
      setFormData({
        nama: "",
        email: "",
        whatsapp: "",
        subjek: "",
        pesan: "",
      });
      // Clear status after 5s
      setTimeout(() => setStatus("idle"), 5000);
    }, 1500);
  };

  return (
    <div className="bg-[#fdfaf5] min-h-screen">
      {/* Editorial Header */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <span className="h-px w-12 bg-emas" />
            <p className="text-xs font-bold tracking-[0.4em] text-emas uppercase">
              Hubungi Kami
            </p>
          </div>
          <h1 className="font-serif text-5xl md:text-8xl text-teks font-bold leading-[0.85] mb-12">
            Mari <br /> <span className="text-hijau-tua">Terhubung.</span>
          </h1>
          <p className="text-teks-sekunder text-lg md:text-xl leading-relaxed max-w-2xl border-l-2 border-hijau-tua pl-8">
            Punya pertanyaan mengenai program kami, ingin berkunjung ke kantor kami, atau berkolaborasi? Pintu komunikasi kami selalu terbuka lebar.
          </p>
        </div>
      </section>

      {/* Main Grid: Form and Contact Info */}
      <section className="max-w-6xl mx-auto px-6 py-12 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Contact Details (Left) */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <div className="bg-white p-8 border border-black/5 rounded-2xl shadow-sm space-y-8">
              <h2 className="font-serif text-2xl font-bold text-teks">Kantor Pusat</h2>
              
              <div className="space-y-6 text-sm text-teks-sekunder leading-relaxed">
                {/* Alamat */}
                <div className="flex gap-4 items-start">
                  <span className="text-xl text-emas mt-0.5">📍</span>
                  <div>
                    <h3 className="font-bold text-teks uppercase text-[10px] tracking-widest mb-1">Alamat Kantor</h3>
                    <p>Jalan Villa Pamulang Blok CF 1 No. 5, RT 011/RW 017, Pondok Benda, Pamulang, Tangerang Selatan, 15416</p>
                  </div>
                </div>

                {/* Telepon */}
                <div className="flex gap-4 items-start">
                  <span className="text-xl text-emas mt-0.5">📞</span>
                  <div>
                    <h3 className="font-bold text-teks uppercase text-[10px] tracking-widest mb-1">Telepon & WhatsApp</h3>
                    <a href="tel:+6288902047766" className="hover:text-[var(--color-hijau-tua)] transition-colors font-medium">
                      +62 889-0204-7766
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4 items-start">
                  <span className="text-xl text-emas mt-0.5">✉️</span>
                  <div>
                    <h3 className="font-bold text-teks uppercase text-[10px] tracking-widest mb-1">Email Resmi</h3>
                    <a href="mailto:info@bimaipeduli.id" className="hover:text-[var(--color-hijau-tua)] transition-colors font-medium">
                      info@bimaipeduli.id
                    </a>
                  </div>
                </div>

                {/* Jam Operasional */}
                <div className="flex gap-4 items-start">
                  <span className="text-xl text-emas mt-0.5">🕒</span>
                  <div>
                    <h3 className="font-bold text-teks uppercase text-[10px] tracking-widest mb-1">Jam Kerja</h3>
                    <p>Senin - Jumat: 08.00 - 17.00 WIB</p>
                    <p className="text-xs text-gray-400">Sabtu, Minggu & Hari Libur Nasional: Tutup</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Info Box */}
            <div className="bg-[var(--color-emas-muda)] border border-[var(--color-emas)]/20 p-8 rounded-2xl">
              <h3 className="font-serif text-lg font-bold text-[var(--color-teks)] mb-3">Ingin Kunjungan Lapangan?</h3>
              <p className="text-sm text-teks-sekunder leading-relaxed">
                Kami sangat senang menyambut para donatur yang ingin melihat langsung program belajar anak yatim/dhuafa atau proses distribusi. Silakan hubungi kami minimal 2 hari sebelumnya untuk reservasi jadwal kunjungan.
              </p>
            </div>
          </div>

          {/* Contact Form (Right) */}
          <div className="lg:col-span-7 bg-white p-8 md:p-12 border border-black/5 rounded-2xl shadow-sm">
            <h2 className="font-serif text-2xl font-bold text-teks mb-8">Kirim Pesan</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="nama" className="text-xs font-bold text-teks uppercase tracking-wider">Nama Lengkap</label>
                  <input
                    type="text"
                    id="nama"
                    required
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    className="w-full bg-[#fdfaf5] border border-gray-200 px-4 py-3 rounded text-sm text-teks focus:border-[var(--color-emas)] focus:outline-none"
                    placeholder="Masukkan nama Anda"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs font-bold text-teks uppercase tracking-wider">Alamat Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#fdfaf5] border border-gray-200 px-4 py-3 rounded text-sm text-teks focus:border-[var(--color-emas)] focus:outline-none"
                    placeholder="nama@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="whatsapp" className="text-xs font-bold text-teks uppercase tracking-wider">No. WhatsApp</label>
                  <input
                    type="tel"
                    id="whatsapp"
                    required
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full bg-[#fdfaf5] border border-gray-200 px-4 py-3 rounded text-sm text-teks focus:border-[var(--color-emas)] focus:outline-none"
                    placeholder="Contoh: 08123456789"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="subjek" className="text-xs font-bold text-teks uppercase tracking-wider">Subjek Pesan</label>
                  <input
                    type="text"
                    id="subjek"
                    required
                    value={formData.subjek}
                    onChange={(e) => setFormData({ ...formData, subjek: e.target.value })}
                    className="w-full bg-[#fdfaf5] border border-gray-200 px-4 py-3 rounded text-sm text-teks focus:border-[var(--color-emas)] focus:outline-none"
                    placeholder="Kerja Sama, Pengajuan Dana, dll."
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="pesan" className="text-xs font-bold text-teks uppercase tracking-wider">Isi Pesan</label>
                <textarea
                  id="pesan"
                  required
                  rows={5}
                  value={formData.pesan}
                  onChange={(e) => setFormData({ ...formData, pesan: e.target.value })}
                  className="w-full bg-[#fdfaf5] border border-gray-200 px-4 py-3 rounded text-sm text-teks focus:border-[var(--color-emas)] focus:outline-none resize-none"
                  placeholder="Tuliskan pesan Anda di sini secara detail..."
                />
              </div>

              {status === "success" && (
                <div className="bg-hijau-muda text-[var(--color-hijau-tua)] px-4 py-3 rounded text-sm font-semibold">
                  ✓ Pesan Anda berhasil dikirim! Kami akan menghubungi Anda kembali secepatnya.
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-teks text-white text-xs font-bold tracking-[0.2em] uppercase hover:bg-hijau-tua transition-colors disabled:opacity-50"
              >
                {loading ? "Mengirim..." : "Kirim Pesan Sekarang"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Embed Google Maps */}
      <section className="w-full h-96 bg-gray-200 border-t border-black/5 relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.3435133649557!2d106.71189441113063!3d-6.349605393613959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69e5af4b0e515d%3A0xc3f6055d233e144a!2sVilla%20Pamulang!5e0!3m2!1sid!2sid!4v1721272012345!5m2!1sid!2sid"
          width="100%"
          height="100%"
          style={{ border: 0, filter: "grayscale(1) contrast(1.1) opacity(0.85)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Lokasi Kantor Yayasan BIMAI"
        />
      </section>
    </div>
  );
}
