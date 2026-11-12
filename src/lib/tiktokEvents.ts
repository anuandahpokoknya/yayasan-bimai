import crypto from "crypto";

const TIKTOK_PIXEL_ID = process.env.TIKTOK_PIXEL_ID || "";
const TIKTOK_ACCESS_TOKEN = process.env.TIKTOK_ACCESS_TOKEN || "";

export interface TikTokServerEventParams {
  eventName: "PageView" | "ViewContent" | "InitiateCheckout" | "CompletePayment" | "Purchase";
  orderId?: string;
  amount?: number;
  phone?: string;
  email?: string;
  pageUrl?: string;
  programName?: string;
}

/**
 * Send server-side TikTok Events API payload
 */
export async function sendTikTokServerEvent({
  eventName,
  orderId,
  amount = 0,
  phone = "",
  email = "",
  pageUrl = "https://bimaipeduli.id/donasi",
  programName = "Wakaf Al-Qur'an Braille",
}: TikTokServerEventParams) {
  // Jika token atau pixel tidak dikonfigurasi di environment, abaikan
  if (!TIKTOK_PIXEL_ID || !TIKTOK_ACCESS_TOKEN) {
    return null;
  }

  try {
    const cleanPhone = phone ? phone.replace(/[^0-9]/g, "") : "";
    const cleanEmail = email && email.includes("@") ? email.trim().toLowerCase() : (cleanPhone ? `${cleanPhone}@bimaipeduli.id` : "");

    const hashedPhone = cleanPhone ? crypto.createHash("sha256").update(cleanPhone).digest("hex") : undefined;
    const hashedEmail = cleanEmail ? crypto.createHash("sha256").update(cleanEmail).digest("hex") : undefined;

    const payload = {
      event_source: "web",
      event_source_id: TIKTOK_PIXEL_ID,
      data: [
        {
          event: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: orderId || `EVT-${Date.now()}`,
          user: {
            phone_number: hashedPhone,
            email: hashedEmail,
          },
          properties: {
            currency: "IDR",
            value: Number(amount) || 0,
            content_name: programName,
            content_type: "product",
            content_id: "donasi-bimai",
          },
          page: {
            url: pageUrl,
          },
        },
      ],
    };

    const res = await fetch("https://business-api.tiktok.com/open_api/v1.3/event/track/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Token": TIKTOK_ACCESS_TOKEN,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log(`[TikTok Server Events API] ${eventName} response:`, data);
    return data;
  } catch (err) {
    console.error(`[TikTok Server Events API Error] ${eventName}:`, err);
    return null;
  }
}
