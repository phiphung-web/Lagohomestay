"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";
import { publicContact } from "@/shared/lib/public-contact";

export function ContactInquiryForm({ locale = "vi" }: { locale?: ShowcaseLocale }) {
  const [opened, setOpened] = useState(false);
  const en = locale === "en";

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = en ? "Contact request from LAKA website" : "Yêu cầu liên hệ từ website LAKA";
    const body = [
      `${en ? "Name" : "Họ tên"}: ${data.get("fullName")}`,
      `${en ? "Phone / Zalo" : "Điện thoại / Zalo"}: ${data.get("phone")}`,
      `${en ? "Email" : "Email"}: ${data.get("email") || "—"}`,
      `${en ? "Topic" : "Nhu cầu"}: ${data.get("topic")}`,
      "",
      String(data.get("message") ?? "")
    ].join("\n");

    window.location.href = `${publicContact.emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  };

  return <section className="border-t border-[#16311c]/12 bg-[#fbfaf6] py-20 text-[#16311c] sm:py-28">
    <div className="mx-auto grid w-[min(1180px,calc(100%-40px))] gap-12 lg:grid-cols-[.7fr_1fr] lg:items-start">
      <header className="lg:sticky lg:top-32">
        <p className="laka-eyebrow text-[#80613f]">{en ? "Send a request" : "Gửi lời nhắn"}</p>
        <h2 className="laka-heading-section mt-5">{en ? "Tell LAKA what you need." : "Cho LAKA biết điều bạn đang cần."}</h2>
        <p className="laka-body-muted mt-6 max-w-md">{en ? "Leave your contact details and a short message. The form will open your email app with everything filled in for review before sending." : "Để lại thông tin và lời nhắn ngắn. Form sẽ mở ứng dụng email với nội dung đã điền để bạn kiểm tra trước khi gửi."}</p>
      </header>

      <form onSubmit={submit} className="grid gap-5 border border-[#16311c]/12 bg-[#eae1d2] p-6 sm:grid-cols-2 sm:p-9">
        <label className="text-sm font-bold sm:col-span-2">{en ? "Full name *" : "Họ và tên *"}<input required name="fullName" maxLength={100} autoComplete="name" className="input mt-2" placeholder={en ? "Alex Nguyen" : "Nguyễn Minh Anh"} /></label>
        <label className="text-sm font-bold">{en ? "Phone / Zalo *" : "Điện thoại / Zalo *"}<input required name="phone" type="tel" inputMode="tel" maxLength={20} autoComplete="tel" className="input mt-2" placeholder="090 123 4567" /></label>
        <label className="text-sm font-bold">Email<input name="email" type="email" inputMode="email" autoComplete="email" className="input mt-2" placeholder="you@email.com" /></label>
        <label className="text-sm font-bold sm:col-span-2">{en ? "What can we help with?" : "Bạn cần LAKA hỗ trợ gì?"}<select name="topic" className="input mt-2" defaultValue={en ? "Stay advice" : "Tư vấn lưu trú"}><option>{en ? "Stay advice" : "Tư vấn lưu trú"}</option><option>{en ? "Dining and experiences" : "Ẩm thực và trải nghiệm"}</option><option>{en ? "Groups and events" : "Đoàn và sự kiện"}</option><option>{en ? "Other" : "Nội dung khác"}</option></select></label>
        <label className="text-sm font-bold sm:col-span-2">{en ? "Message *" : "Lời nhắn *"}<textarea required name="message" maxLength={1000} className="input mt-2 min-h-36 py-3" placeholder={en ? "Expected dates, group size or anything LAKA should know…" : "Ngày dự kiến, số người hoặc điều LAKA cần biết…"} /></label>
        <label className="flex items-start gap-3 text-sm leading-6 sm:col-span-2"><input required name="consent" type="checkbox" className="mt-1 h-4 w-4 shrink-0" />{en ? "I agree that LAKA may use these details to respond to my request." : "Tôi đồng ý để LAKA sử dụng thông tin này nhằm phản hồi yêu cầu của tôi."}</label>
        {opened && <p role="status" className="flex items-center gap-2 text-sm font-bold text-emerald-800 sm:col-span-2"><CheckCircle2 className="h-5 w-5" />{en ? "Your email app has been opened. Review and send the message there." : "Ứng dụng email đã được mở. Hãy kiểm tra và gửi thư tại đó."}</p>}
        <button type="submit" className="focus-ring flex min-h-14 items-center justify-between rounded-full bg-[#16311c] px-6 text-sm font-bold text-white sm:col-span-2">{en ? "Continue to email" : "Tiếp tục gửi qua email"}<ArrowRight className="h-4 w-4" /></button>
      </form>
    </div>
  </section>;
}
