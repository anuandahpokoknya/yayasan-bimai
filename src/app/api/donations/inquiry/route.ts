import { NextResponse } from "next/server";
import { saveDonationToSupabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { donor_name, phone, amount, payment_method, program_id, wakif_name, doa } = body;

    if (!amount || amount < 10000) {
      return NextResponse.json(
        { success: false, message: "Nominal donasi minimal adalah Rp 10.000." },
        { status: 400 }
      );
    }

    const timestamp = Date.now();
    const orderId = `BIMAI-${timestamp}-${Math.floor(1000 + Math.random() * 9000)}`;
    const paymentAmount = Number(amount);

    // Simpan data donasi ke Supabase untuk pencatatan rekapitulasi internal yayasan
    await saveDonationToSupabase({
      merchant_order_id: orderId,
      jenis_donasi: program_id || "sedekah-umum",
      donor_name: donor_name || "Hamba Allah",
      phone: phone || null,
      amount: paymentAmount,
      payment_method: payment_method || "QRIS",
      wakif_name: wakif_name || null,
      niat: doa || null,
      status_payment: "pending",
      payment_code: null,
      payment_reference: null,
    });

    return NextResponse.json({
      success: true,
      orderId,
      message: "Data donasi berhasil dicatat.",
    });
  } catch (error) {
    console.error("API Inquiry Error:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server saat memproses donasi." },
      { status: 500 }
    );
  }
}
