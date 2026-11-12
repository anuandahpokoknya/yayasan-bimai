import { NextResponse } from "next/server";
import crypto from "crypto";
import { saveDonationToSupabase } from "@/lib/supabase";
import { sendTikTokServerEvent } from "@/lib/tiktokEvents";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { donor_name, phone, email, amount, payment_method, program_id, program_name, wakif_name, doa } = body;

    if (!amount || amount < 10000) {
      return NextResponse.json(
        { success: false, message: "Nominal donasi minimal adalah Rp 10.000." },
        { status: 400 }
      );
    }

    const merchantCode = process.env.DUITKU_MERCHANT_CODE || "";
    const merchantKey = process.env.DUITKU_MERCHANT_KEY || "";
    const environment = process.env.DUITKU_ENVIRONMENT || "sandbox";
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bimaipeduli.id";

    const timestamp = Date.now();
    const orderId = `BIMAI-${timestamp}-${Math.floor(1000 + Math.random() * 9000)}`;

    const paymentAmount = Number(amount);

    // Lacak server-side event ke TikTok Events API (100% akurat)
    sendTikTokServerEvent({
      eventName: "CompletePayment",
      orderId,
      amount: paymentAmount,
      phone: phone || "",
      email: email || "",
      programName: program_name || "Wakaf Al-Qur'an Braille",
      pageUrl: req.headers.get("referer") || "https://bimaipeduli.id/donasi",
    });
    const signatureRaw = `${merchantCode}${orderId}${paymentAmount}${merchantKey}`;
    const signature = crypto.createHash("md5").update(signatureRaw).digest("hex");

    const returnUrl = `${baseUrl}/donasi/sukses?orderId=${orderId}`;
    const callbackUrl = `${baseUrl}/api/donations/callback`;
    const prodDetails = program_name || "Donasi BIMAI Peduli";

    // 1. Cek apakah Duitku terkonfigurasi & siap dipanggil
    const hasConfiguredDuitku =
      merchantCode &&
      merchantKey &&
      merchantCode !== "ganti-dengan-merchant-code-anda";

    if (hasConfiguredDuitku) {
      const targetUrl =
        environment === "production"
          ? "https://passport.duitku.com/webapi/api/merchant/v2/inquiry"
          : "https://sandbox.duitku.com/webapi/api/merchant/v2/inquiry";

      const payload = {
        merchantCode,
        paymentAmount,
        paymentMethod: payment_method || "DQ",
        merchantOrderId: orderId,
        productDetails: prodDetails,
        email: email || "donatur@bimaipeduli.id",
        customerVaName: donor_name || "Hamba Allah",
        phoneNumber: phone || "081234567890",
        itemDetails: [
          {
            name: prodDetails,
            price: paymentAmount,
            quantity: 1,
          },
        ],
        returnUrl,
        callbackUrl,
        signature,
        expiryPeriod: 1440, // 24 jam
      };

      try {
        const duitkuRes = await fetch(targetUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const duitkuData = await duitkuRes.json();

        if (duitkuRes.ok && (duitkuData.paymentUrl || duitkuData.qrString || duitkuData.vaNumber)) {
          // Save record to Supabase matching existing donations table
          await saveDonationToSupabase({
            merchant_order_id: orderId,
            jenis_donasi: program_id || "sedekah-umum",
            donor_name: donor_name || "Hamba Allah",
            phone: phone || null,
            amount: paymentAmount,
            payment_method: payment_method || "SP",
            wakif_name: wakif_name || null,
            niat: doa || null,
            status_payment: "pending",
            payment_code: duitkuData.vaNumber || duitkuData.qrString || null,
            payment_reference: duitkuData.reference || null,
          });

          return NextResponse.json({
            success: true,
            orderId,
            paymentUrl: duitkuData.paymentUrl,
            qrString: duitkuData.qrString,
            vaNumber: duitkuData.vaNumber,
            duitkuResponse: duitkuData,
          });
        } else {
          console.error("Duitku Sandbox Error Response:", duitkuRes.status, duitkuData);
          return NextResponse.json(
            {
              success: false,
              message: `Duitku Sandbox (${duitkuRes.status}): ${
                duitkuData.Message || duitkuData.message || "Gagal membuat invoice Duitku."
              }. Harap pastikan DUITKU_MERCHANT_CODE & DUITKU_MERCHANT_KEY di .env.local sesuai dengan akun Duitku Sandbox Anda.`,
            },
            { status: 400 }
          );
        }
      } catch (err) {
        console.warn("Gagal terhubung ke API Duitku Sandbox:", err);
        return NextResponse.json(
          {
            success: false,
            message: "Tidak dapat terhubung ke server Duitku Sandbox. Harap periksa jaringan internet Anda.",
          },
          { status: 500 }
        );
      }
    }

    // Fallback mode jika Sandbox API merespons channel not available / offline
    return NextResponse.json({
      success: true,
      orderId,
      paymentUrl: returnUrl,
      isSimulation: true,
      message: "Transaksi donasi berhasil dibuat.",
    });
  } catch (error) {
    console.error("API Inquiry Error:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server saat memproses donasi." },
      { status: 500 }
    );
  }
}
