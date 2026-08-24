import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/server/security/rate-limit";
import { normalizePhone } from "@/shared/lib/format";
import { publicContact } from "@/shared/lib/public-contact";

export async function POST(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (!rateLimit(`inquiry:${forwarded}`, 6, 60_000).allowed) {
    return NextResponse.json(
      { message: "Bạn thao tác hơi nhanh. Vui lòng thử lại sau 1 phút." },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ message: "Dữ liệu không hợp lệ." }, { status: 400 });
  }

  const fullName = String(body.fullName ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const email = String(body.email ?? "").trim();
  const stayName = String(body.stayName ?? "").trim();
  const topic = String(body.topic ?? "").trim();
  const checkIn = String(body.checkIn ?? "").trim();
  const checkOut = String(body.checkOut ?? "").trim();
  const guests = String(body.guests ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!fullName || fullName.length < 2) {
    return NextResponse.json({ message: "Vui lòng nhập họ và tên hợp lệ." }, { status: 400 });
  }

  const normalized = normalizePhone(phone);
  if (!normalized || normalized.length < 9) {
    return NextResponse.json({ message: "Vui lòng nhập số điện thoại / Zalo hợp lệ." }, { status: 400 });
  }

  const inquiryLog = {
    timestamp: new Date().toISOString(),
    fullName,
    phone: normalized,
    email: email || undefined,
    stayName: stayName || undefined,
    topic: topic || undefined,
    checkIn: checkIn || undefined,
    checkOut: checkOut || undefined,
    guests: guests || undefined,
    message: message || undefined,
    targetEmail: process.env.NOTIFICATION_EMAIL || publicContact.email
  };

  console.log("[INQUIRY_RECEIVED]", inquiryLog);

  // Optional Webhook / Email Notification Dispatch
  if (process.env.INQUIRY_WEBHOOK_URL) {
    try {
      await fetch(process.env.INQUIRY_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inquiryLog)
      });
    } catch (error) {
      console.error("[INQUIRY_WEBHOOK_FAILED]", error);
    }
  }

  return NextResponse.json(
    {
      success: true,
      message: "Gửi thông tin tới LAKA thành công! Chúng mình sẽ liên hệ lại với bạn trong thời gian sớm nhất."
    },
    { status: 200 }
  );
}
