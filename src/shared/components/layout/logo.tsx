import Link from "next/link";
import { BrandLogo } from "@/shared/components/brand/brand-logo";

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className={`focus-ring inline-flex rounded-md ${inverse ? "text-[#eae1d2]" : "text-[#16311c]"}`} aria-label="LAKA Homestay - Trang chủ">
      <BrandLogo variant="homestay" decorative className="w-[152px]" />
    </Link>
  );
}
