import { Footer } from "./footer";
import { Header } from "./header";
import { MobileBookingCta } from "./mobile-booking-cta";
import { SkipLink } from "@/shared/components/ui/skip-link";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return <><SkipLink/><Header/><main id="noi-dung-chinh" tabIndex={-1}>{children}</main><Footer/><MobileBookingCta/></>;
}
