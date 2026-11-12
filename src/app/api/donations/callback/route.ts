import { NextResponse } from "next/server";
import crypto from "crypto";
import { updateDonationStatusInSupabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const merchantCode = formData.get("merchantCode")?.toString() || "";
    const amount = formData.get("amount")?.toString() || "";
    const merchantOrderId = formData.get("merchantOrderId")?.toString() || "";
    const signature = formData.get("signature")?.toString() || "";
    const resultCode = formData.get("resultCode")?.toString() || "";

    const merchantKey = process.env.DUITKU_MERCHANT_KEY || "";

    if (!merchantKey) {
      console.warn("Callback Duitku: DUITKU_MERCHANT_KEY belum dikonfigurasi di environment!");
      return NextResponse.json({ status: "error", message: "Server misconfiguration" }, { status: 500 });
    }

    // Verifikasi Signature Duitku MD5(merchantCode + amount + merchantOrderId + merchantKey)
    const calcSignatureRaw = `${merchantCode}${amount}${merchantOrderId}${merchantKey}`;
    const calcSignature = crypto.createHash("md5").update(calcSignatureRaw).digest("hex");

    if (calcSignature !== signature) {
      console.warn("Callback Duitku: Signature MD5 tidak valid!");
      return NextResponse.json({ status: "error", message: "Invalid Signature" }, { status: 400 });
    }

    if (resultCode === "00") {
      console.log(`Callback Duitku SUKSES: Order ${merchantOrderId} sebesar Rp ${amount}`);
      await updateDonationStatusInSupabase(merchantOrderId, "success");
    } else {
      console.log(`Callback Duitku GAGAL: Order ${merchantOrderId} dengan resultCode ${resultCode}`);
      await updateDonationStatusInSupabase(merchantOrderId, "failed");
    }

    // Duitku mengharapkan status 200 OK
    return NextResponse.json({ status: "success", resultCode: "00" });
  } catch (error) {
    console.error("Callback API Error:", error);
    return NextResponse.json({ status: "error", message: "Internal Error" }, { status: 500 });
  }
}
