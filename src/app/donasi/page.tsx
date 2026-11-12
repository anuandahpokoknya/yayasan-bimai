"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import CustomAlert, { AlertType } from "@/components/CustomAlert";

const availablePrograms = [
  { id: "wakaf-quran-braille", nama: "Wakaf Al-Qur'an Braille", desc: "Fasilitasi mushaf Al-Qur'an Braille untuk sahabat tunanetra mengaji & hafal Al-Qur'an.", badge: "Utama", icon: "📖" },
  { id: "umum", nama: "Sedekah Umum / Operasional", desc: "Dukungan operasional & keberlangsungan dakwah serta bantuan dhuafa.", badge: "Rutin", icon: "💚" },
  { id: "wakaf-quran", nama: "Wakaf Al-Qur'an Standar", desc: "Penyaluran mushaf Al-Qur'an ke TPQ & masjid di pelosok negeri.", badge: "Syiar", icon: "📚" },
  { id: "sedekah-subuh", nama: "Sedekah Subuh Berkah", desc: "Amalan pembuka pintu rezeki & ketenangan jiwa di waktu subuh.", badge: "Subuh", icon: "🌅" },
  { id: "jumat-berkah", nama: "Jum'at Berkah Makanan Yatim", desc: "Santunan & paket makanan sehat bergizi untuk santri & anak yatim.", badge: "Berbagi", icon: "🍲" },
];

const nominalPresets = [50000, 100000, 250000, 375000, 500000, 1500000];

function DonasiFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const programParam = searchParams.get("program");
  const amountParam = searchParams.get("amount");

  // Step state (3 langkah)
  const [step, setStep] = useState(1);

  // Form states
  const [selectedProgram, setSelectedProgram] = useState("wakaf-quran-braille");
  const [amount, setAmount] = useState<number | "">(50000);
  const [customAmountActive, setCustomAmountActive] = useState(false);

  const [donatorName, setDonatorName] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [wakifName, setWakifName] = useState("");
  const [doa, setDoa] = useState("");

  // Payment preference (QRIS atau Transfer Bank Yayasan)
  const [paymentMethod, setPaymentMethod] = useState("QRIS");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [alertConfig, setAlertConfig] = useState<{
    isOpen: boolean;
    message: string;
    type: AlertType;
  }>({
    isOpen: false,
    message: "",
    type: "info",
  });

  const showAlert = (message: string, type: AlertType = "info") => {
    setAlertConfig({ isOpen: true, message, type });
  };

  useEffect(() => {
    if (programParam && availablePrograms.some((p) => p.id === programParam)) {
      setSelectedProgram(programParam);
    }
    if (amountParam) {
      const parsed = parseInt(amountParam, 10);
      if (!isNaN(parsed) && parsed >= 10000) {
        setAmount(parsed);
      }
    }
  }, [programParam, amountParam]);

  const handlePresetSelect = (val: number) => {
    setAmount(val);
    setCustomAmountActive(false);
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    setAmount(val === "" ? "" : parseInt(val, 10));
    setCustomAmountActive(true);
  };

  const getProgramName = () => {
    return availablePrograms.find((p) => p.id === selectedProgram)?.nama || "Wakaf Al-Qur'an Braille";
  };

  // Submit Handler: Rekap ke Supabase dan Buka WhatsApp CS
  const handleProcessPayment = async () => {
    if (!amount || amount < 10000) {
      setErrorMessage("Nominal donasi minimal adalah Rp 10.000");
      showAlert("Nominal donasi minimal adalah Rp 10.000", "warning");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // 1. Simpan rekapitulasi data donasi ke backend/Supabase
      const res = await fetch("/api/donations/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donor_name: donatorName || "Hamba Allah",
          phone: emailOrPhone,
          amount: Number(amount),
          payment_method: paymentMethod,
          program_id: selectedProgram,
          program_name: getProgramName(),
          wakif_name: wakifName || null,
          doa: doa || null,
        }),
      });

      const data = await res.json();
      const orderId = data.orderId || `BIMAI-${Date.now()}`;

      // 2. Susun format pesan WhatsApp untuk Customer Service Yayasan
      const formattedAmount = `Rp ${Number(amount).toLocaleString("id-ID")}`;
      const friendlyMethod = paymentMethod === "QRIS" ? "QRIS Resmi Yayasan (Semua Bank & E-Wallet)" : "Transfer Bank Rekening Yayasan";
      const nomorWaCS = "6288902047766";

      const textMessage = `Assalamu'alaikum Wr. Wb. Kak Admin BIMAI,\n\nSaya telah mengisi formulir donasi di website dengan rincian berikut:\n\n👉 *Program:* ${getProgramName()}\n👉 *Nama Donatur:* ${donatorName || "Hamba Allah"}\n👉 *No. WhatsApp:* ${emailOrPhone || "-"}\n👉 *Atas Nama Wakif:* ${wakifName && wakifName !== "-" ? wakifName : "-"}\n👉 *Nominal:* *${formattedAmount}*\n👉 *Niat/Doa:* ${doa ? `"${doa}"` : "-"}\n👉 *Preferensi Pembayaran:* ${friendlyMethod}\n👉 *Order ID:* ${orderId}\n\nMohon dibantu nomor rekening / kode QRIS resmi yayasan untuk penyelesaian donasi saya. Terima kasih.`;

      const waUrl = `https://wa.me/${nomorWaCS}?text=${encodeURIComponent(textMessage)}`;

      // 3. Buka WhatsApp di tab baru
      if (typeof window !== "undefined") {
        window.open(waUrl, "_blank");
      }

      // 4. Arahkan layar ke halaman konfirmasi sukses
      const query = new URLSearchParams({
        orderId,
        donorName: donatorName || "Hamba Allah",
        phone: emailOrPhone || "-",
        wakifName: wakifName || "-",
        amount: String(amount),
        niat: doa || "-",
        paymentMethod: friendlyMethod,
        programName: getProgramName(),
      });

      router.push(`/donasi/sukses?${query.toString()}`);
    } catch (err) {
      console.error("Error submitting donation:", err);
      // Fallback: Jika koneksi API gagal, tetap arahkan donatur ke WhatsApp
      const formattedAmount = `Rp ${Number(amount).toLocaleString("id-ID")}`;
      const textMessage = `Assalamu'alaikum Wr. Wb. Kak Admin BIMAI, saya ingin berdonasi untuk program *${getProgramName()}* sebesar *${formattedAmount}*. Mohon dibantu instruksi transfernya. Terima kasih.`;
      const fallbackUrl = `https://wa.me/6288902047766?text=${encodeURIComponent(textMessage)}`;
      window.open(fallbackUrl, "_blank");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 md:p-10 border border-gray-100 rounded-3xl shadow-xl">
      {/* Header Info */}
      <div className="text-center pb-6 border-b border-gray-100 mb-8">
        <span className="text-xs font-bold text-[var(--color-emas)] uppercase tracking-widest block mb-1">
          Formulir Wakaf & Donasi Resmi
        </span>
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-900">
          Yayasan Bina Masyarakat Indonesia
        </h1>
      </div>

      {/* Step Indicators (3 Steps) */}
      <div className="flex items-center justify-between mb-8">
        {[
          { num: 1, label: "Program" },
          { num: 2, label: "Data Donatur" },
          { num: 3, label: "Konfirmasi & Bayar" },
        ].map((s) => (
          <div key={s.num} className="flex items-center flex-1 last:flex-initial">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step >= s.num
                    ? "bg-[var(--color-hijau-tua)] text-white shadow-md scale-105"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {s.num}
              </div>
              <span className={`text-[10px] sm:text-xs font-bold ${step >= s.num ? "text-[var(--color-hijau-tua)]" : "text-gray-400"}`}>
                {s.label}
              </span>
            </div>
            {s.num < 3 && (
              <div
                className={`h-0.5 flex-1 mx-2 sm:mx-4 mb-4 transition-colors ${
                  step > s.num ? "bg-[var(--color-hijau-tua)]" : "bg-gray-100"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* STEP 1: Program & Nominal */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h2 className="font-serif text-xl font-bold text-gray-900 mb-1">1. Pilih Program Kebaikan</h2>
            <p className="text-xs text-gray-500">Tentukan program penyaluran infak / wakaf Anda.</p>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Pilihan Program Kebaikan</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {availablePrograms.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedProgram(p.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-2 ${
                    selectedProgram === p.id
                      ? "border-[var(--color-emas)] bg-amber-50/70 ring-2 ring-[var(--color-emas)]/40 shadow-sm"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{p.icon}</span>
                      <span className="font-bold text-xs md:text-sm text-gray-900 leading-snug">{p.nama}</span>
                    </div>
                    <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 bg-amber-100 text-amber-900 rounded shrink-0">
                      {p.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-normal">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Pilih Nominal Donasi (Rp)</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {nominalPresets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handlePresetSelect(preset)}
                  className={`py-3.5 px-3 rounded-xl font-bold transition-all text-xs border cursor-pointer ${
                    amount === preset && !customAmountActive
                      ? "border-[var(--color-emas)] bg-amber-50 text-[var(--color-hijau-tua)] ring-2 ring-[var(--color-emas)]/30 font-extrabold shadow-sm"
                      : "border-gray-200 hover:border-gray-400 bg-white text-gray-700"
                  }`}
                >
                  Rp {preset.toLocaleString("id-ID")}
                </button>
              ))}
            </div>

            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-bold text-gray-600">Atau Nominal Kustom (Rp)</label>
              <input
                type="text"
                placeholder="Masukkan nominal donasi lain (min Rp 10.000)..."
                value={amount === "" ? "" : amount}
                onChange={handleCustomAmountChange}
                className={`w-full bg-[#fdfaf5] border px-4 py-3.5 rounded-xl text-sm font-bold text-gray-900 focus:outline-none ${
                  customAmountActive
                    ? "border-[var(--color-emas)] ring-2 ring-[var(--color-emas)]/30 text-[var(--color-hijau-tua)]"
                    : "border-gray-200"
                }`}
              />
            </div>
          </div>

          <button
            type="button"
            disabled={!amount || amount < 10000}
            onClick={() => setStep(2)}
            className="w-full py-4 bg-[var(--color-hijau-tua)] hover:bg-[#123825] text-white text-xs font-extrabold tracking-[0.2em] uppercase rounded-xl shadow-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            Lanjutkan ke Data Donatur &rarr;
          </button>
          {amount !== "" && amount < 10000 && (
            <p className="text-xs text-red-500 text-center font-semibold mt-2">Minimal donasi adalah Rp 10.000</p>
          )}
        </div>
      )}

      {/* STEP 2: Donatur Info */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h2 className="font-serif text-xl font-bold text-gray-900 mb-1">2. Lengkapi Data Donatur</h2>
            <p className="text-xs text-gray-500">Informasi ini digunakan untuk pencatatan & laporan akad donasi.</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Nama Donatur</label>
              <input
                type="text"
                placeholder="Nama lengkap donatur (kosongkan jika anonim)..."
                value={donatorName}
                onChange={(e) => setDonatorName(e.target.value)}
                className="w-full bg-[#fdfaf5] border border-gray-200 px-4 py-3.5 rounded-xl text-sm font-medium text-gray-900 focus:border-[var(--color-emas)] focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">No. WhatsApp / Kontak</label>
              <input
                type="text"
                placeholder="Contoh: 081234567890 (untuk penerimaan tanda terima)..."
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                className="w-full bg-[#fdfaf5] border border-gray-200 px-4 py-3.5 rounded-xl text-sm font-medium text-gray-900 focus:border-[var(--color-emas)] focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                Atas Nama Wakif <span className="text-gray-400 font-normal text-[11px]">(Opsional - misal: Orang Tua / Almarhum)</span>
              </label>
              <input
                type="text"
                placeholder="Niatkan wakaf atas nama..."
                value={wakifName}
                onChange={(e) => setWakifName(e.target.value)}
                className="w-full bg-[#fdfaf5] border border-gray-200 px-4 py-3.5 rounded-xl text-sm font-medium text-gray-900 focus:border-[var(--color-emas)] focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                Doa / Niat Kebaikan <span className="text-gray-400 font-normal text-[11px]">(Opsional)</span>
              </label>
              <textarea
                placeholder="Tuliskan niat atau doa khusus Anda agar diaminkan penerima manfaat..."
                rows={3}
                value={doa}
                onChange={(e) => setDoa(e.target.value)}
                className="w-full bg-[#fdfaf5] border border-gray-200 px-4 py-3 rounded-xl text-sm font-medium text-gray-900 focus:border-[var(--color-emas)] focus:outline-none resize-none"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-1/3 py-4 border border-gray-200 text-gray-600 text-xs font-bold tracking-wider uppercase rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
            >
              &larr; Kembali
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="w-2/3 py-4 bg-[var(--color-hijau-tua)] hover:bg-[#123825] text-white text-xs font-extrabold tracking-[0.2em] uppercase rounded-xl shadow-lg transition-colors cursor-pointer"
            >
              Lanjutkan Konfirmasi &rarr;
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Rangkuman & Pilihan Metode Donasi Resmi */}
      {step === 3 && (
        <div className="space-y-6">
          <div>
            <h2 className="font-serif text-xl font-bold text-gray-900 mb-1">3. Konfirmasi & Pembayaran</h2>
            <p className="text-xs text-gray-500">Periksa kembali data donasi Anda sebelum menyelesaikan transaksi.</p>
          </div>

          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-semibold p-4 rounded-xl">
              {errorMessage}
            </div>
          )}

          {/* Rangkuman Rincian Donasi */}
          <div className="bg-[#fdfaf5] p-5 rounded-2xl border border-amber-200/60 space-y-3 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <span className="text-gray-500 font-semibold">Program Pilihan</span>
              <span className="font-bold text-gray-900 text-right">{getProgramName()}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <span className="text-gray-500 font-semibold">Nama Donatur</span>
              <span className="font-bold text-gray-900">{donatorName || "Hamba Allah"}</span>
            </div>
            {wakifName && (
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="text-gray-500 font-semibold">Atas Nama Wakif</span>
                <span className="font-bold text-gray-900">{wakifName}</span>
              </div>
            )}
            <div className="flex justify-between items-center pt-1">
              <span className="text-gray-600 font-bold">Total Donasi</span>
              <span className="font-serif font-extrabold text-lg text-[var(--color-hijau-tua)]">
                Rp {amount ? amount.toLocaleString("id-ID") : "0"}
              </span>
            </div>
          </div>

          {/* Pilihan Preferensi Pembayaran Resmi */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
              Pilih Preferensi Kanal Pembayaran Resmi
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Pilihan 1: QRIS */}
              <div
                onClick={() => setPaymentMethod("QRIS")}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-2 ${
                  paymentMethod === "QRIS"
                    ? "border-[var(--color-emas)] bg-amber-50/70 ring-2 ring-[var(--color-emas)]/40 shadow-sm"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">📱</span>
                    <span className="font-bold text-sm text-gray-900">QRIS Resmi Yayasan</span>
                  </div>
                  <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                    Instan
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  Bisa di-scan dari seluruh mobile banking (BCA, Livin Mandiri, BRImo, BSI) & e-wallet (GoPay, OVO, DANA, ShopeePay).
                </p>
              </div>

              {/* Pilihan 2: Transfer Bank */}
              <div
                onClick={() => setPaymentMethod("TRANSFER_BANK")}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-2 ${
                  paymentMethod === "TRANSFER_BANK"
                    ? "border-[var(--color-emas)] bg-amber-50/70 ring-2 ring-[var(--color-emas)]/40 shadow-sm"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🏦</span>
                    <span className="font-bold text-sm text-gray-900">Transfer Rekening Bank</span>
                  </div>
                  <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 bg-blue-100 text-blue-800 rounded">
                    Bank
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  Transfer langsung antar bank ke rekening resmi atas nama <strong>Yayasan Bina Masyarakat Indonesia</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Trust Badge & Jaminan Keamanan */}
          <div className="bg-[#fdfaf5] border border-amber-200/60 p-4 rounded-xl text-xs text-gray-600 space-y-1.5">
            <p className="font-bold text-gray-900 flex items-center gap-1.5">
              <span>🔒</span> Rekening Resmi Yayasan (Bukan Pribadi)
            </p>
            <p className="leading-relaxed">
              Setelah mengklik tombol di bawah, Anda akan terhubung ke <strong>WhatsApp Layanan Donatur Resmi Yayasan (+62 889-0204-7766)</strong> untuk menerima kode QRIS atau nomor rekening resmi serta konfirmasi penerimaan akad.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-2">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => setStep(2)}
              className="w-1/3 py-4 border border-gray-200 text-gray-600 text-xs font-bold tracking-wider uppercase rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              &larr; Kembali
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleProcessPayment}
              className="w-2/3 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-extrabold tracking-wider uppercase rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>{isSubmitting ? "Menyiapkan WhatsApp..." : "Konfirmasi via WhatsApp & Bayar →"}</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Custom Toast Alert */}
      <CustomAlert
        isOpen={alertConfig.isOpen}
        message={alertConfig.message}
        type={alertConfig.type}
        onClose={() => setAlertConfig((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}

export default function DonasiPage() {
  return (
    <div className="bg-[#fdfaf5] min-h-screen py-24 px-6 md:py-32">
      <Suspense
        fallback={
          <div className="max-w-2xl mx-auto bg-white p-8 border border-gray-100 rounded-3xl shadow-sm text-center">
            <p className="text-sm text-gray-500 animate-pulse">Memuat formulir donasi...</p>
          </div>
        }
      >
        <DonasiFormContent />
      </Suspense>
    </div>
  );
}
