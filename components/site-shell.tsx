import { Footer } from "./footer";
import { Header } from "./header";
import { MobileBookingCta } from "./mobile-booking-cta";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return <><Header/><main>{children}</main><Footer/><MobileBookingCta/></>;
}
