"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function SuksesContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || `BIMAI-${Date.now()}`;
  
  const donorName = searchParams.get("donorName") || searchParams.get("donor_name") || "Hamba Allah";
  const phone = searchParams.get("phone") || searchParams.get("donorPhone") || "-";
  const wakifName = searchParams.get("wakifName") || searchParams.get("wakif_name") || "-";
  const rawAmount = searchParams.get("amount");
  const amount = rawAmount ? Number(rawAmount) : 0;
  const niat = searchParams.get("niat") || searchParams.get("doa") || "-";
  const rawMethod = searchParams.get("paymentMethod") || searchParams.get("payment_method") || "QRIS Resmi Yayasan";
  const programName = searchParams.get("programName") || "Wakaf & Donasi Kemanusiaan";

  const formattedAmount = amount > 0 ? `Rp ${amount.toLocaleString("id-ID")}` : "Rp 50.000";
  const nomorWaCS = "6288902047766";

  // Format pesan WhatsApp
  const textMessage = `Assalamu'alaikum Wr. Wb. Kak Admin BIMAI,\n\nSaya telah mengisi formulir donasi di website dengan rincian berikut:\n\n👉 *Program:* ${programName}\n👉 *Nama Donatur:* ${donorName}\n👉 *No. WhatsApp:* ${phone}\n👉 *Atas Nama Wakif:* ${wakifName && wakifName !== "-" ? wakifName : "-"}\n👉 *Nominal:* *${formattedAmount}*\n👉 *Niat/Doa:* ${niat && niat !== "-" ? `"${niat}"` : "-"}\n👉 *Preferensi Pembayaran:* ${rawMethod}\n👉 *Order ID:* ${orderId}\n\nMohon dibantu nomor rekening / kode QRIS resmi yayasan untuk penyelesaian donasi saya. Terima kasih.`;

  const waUrl = `https://wa.me/${nomorWaCS}?text=${encodeURIComponent(textMessage)}`;

  const [copied, setCopied] = useState(false);

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 md:p-12 border border-gray-100 rounded-3xl shadow-xl text-center space-y-6">
      {/* Icon Indicator */}
      <div className="flex justify-center">
        <div className="w-20 h-20 rounded-full flex items-center justify-center bg-emerald-50 text-emerald-600 border border-emerald-200">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold text-[var(--color-emas)] uppercase tracking-widest block">
          Jazakumullah Khairan Katsiran
        </span>
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-900">
          Data Donasi Telah Kami Terima
        </h1>
        <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
          Niat dan amanah kebaikan Anda telah kami catat. Silakan lanjutkan konfirmasi dengan Admin Layanan Donatur kami melalui WhatsApp di bawah untuk menerima kode QRIS atau rekening bank resmi yayasan.
        </p>
      </div>

      {/* Rincian Transaksi */}
      <div className="bg-[#fdfaf5] p-6 rounded-2xl border border-amber-200/60 text-left space-y-3 text-xs max-w-full overflow-hidden">
        <div className="flex flex-wrap justify-between items-center gap-2 pb-2 border-b border-gray-200">
          <span className="text-gray-500 font-semibold">Order ID Transaksi</span>
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-mono font-bold text-gray-900 break-all">{orderId}</span>
            <button
              type="button"
              onClick={handleCopyOrderId}
              className="text-[10px] bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded cursor-pointer"
            >
              {copied ? "Tersalin!" : "Salin"}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-between items-center gap-2 pb-2 border-b border-gray-200">
          <span className="text-gray-500 font-semibold">Program Penyaluran</span>
          <span className="font-bold text-gray-900 text-right">{programName}</span>
        </div>

        <div className="flex flex-wrap justify-between items-center gap-2 pb-2 border-b border-gray-200">
          <span className="text-gray-500 font-semibold">Nama Donatur</span>
          <span className="font-bold text-gray-900">{donorName}</span>
        </div>

        {wakifName && wakifName !== "-" && (
          <div className="flex flex-wrap justify-between items-center gap-2 pb-2 border-b border-gray-200">
            <span className="text-gray-500 font-semibold">Atas Nama Wakif</span>
            <span className="font-bold text-gray-900">{wakifName}</span>
          </div>
        )}

        <div className="flex justify-between items-center pb-2 border-b border-gray-200">
          <span className="text-gray-600 font-bold">Nominal Donasi</span>
          <span className="font-serif font-extrabold text-base text-[var(--color-hijau-tua)]">{formattedAmount}</span>
        </div>

        <div className="flex justify-between items-center pb-2 border-b border-gray-200">
          <span className="text-gray-500 font-semibold">Metode Pembayaran</span>
          <span className="font-bold text-gray-700">{rawMethod}</span>
        </div>

        {niat && niat !== "-" && (
          <div className="pt-1">
            <span className="text-gray-500 font-semibold block mb-0.5">Doa / Niat Kebaikan:</span>
            <p className="italic text-gray-700 bg-white p-2.5 rounded-lg border border-amber-100">&quot;{niat}&quot;</p>
          </div>
        )}
      </div>

      {/* Trust Notice */}
      <div className="bg-amber-50/60 border border-amber-200/50 p-4 rounded-xl text-xs text-gray-600 text-left space-y-1">
        <p className="font-bold text-gray-900">📌 Panduan Penyelesaian:</p>
        <p>
          Jika jendela WhatsApp belum terbuka otomatis, silakan klik tombol hijau di bawah untuk langsung menghubungi Admin CS kami. Anda akan menerima gambar QRIS resmi atau rekening bank atas nama <strong>Yayasan Bina Masyarakat Indonesia</strong>.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Link
          href="/"
          className="flex-1 py-4 border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors text-center block cursor-pointer"
        >
          &larr; Beranda
        </Link>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-2 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-extrabold tracking-wider uppercase rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Buka Chat WhatsApp CS
        </a>
      </div>
    </div>
  );
}

export default function SuksesPage() {
  return (
    <div className="bg-[#fdfaf5] min-h-screen py-24 px-6 md:py-32">
      <Suspense
        fallback={
          <div className="max-w-xl mx-auto bg-white p-8 border border-gray-100 rounded-3xl shadow-sm text-center">
            <p className="text-sm text-gray-500 animate-pulse">Memuat rincian konfirmasi donasi...</p>
          </div>
        }
      >
        <SuksesContent />
      </Suspense>
    </div>
  );
}
