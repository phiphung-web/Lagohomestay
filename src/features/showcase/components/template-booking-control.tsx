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
      className="focus-ring inline-flex h-10 items-center justify-center rounded-lg bg-[#16311c] px-4 text-[.72rem] font-extrabold uppercase tracking-wider text-white shadow-sm transition hover:bg-[#23482b] active:scale-95 xl:hidden"
    >
      {locale === "en" ? "Book now" : "Đặt ngay"}
    </button>
    <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} locale={locale} />
  </>;
}
