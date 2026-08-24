"use client";

import { useState } from "react";
import { BookingModal } from "@/features/showcase/components/booking-modal";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";

export function TemplateBookingControl({ locale = "vi" }: { locale?: ShowcaseLocale }) {
  const [bookingOpen, setBookingOpen] = useState(false);

  return <>
    <button
      type="button"
      onClick={() => setBookingOpen(true)}
      className="rounded-full bg-[#16311c] px-3.5 py-2 text-[.6rem] font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-[#23482b] sm:px-4 sm:py-2.5 sm:text-xs xl:hidden"
    >
      {locale === "en" ? "Book now" : "Đặt ngay"}
    </button>
    <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} locale={locale} />
  </>;
}
