import Image from "next/image";
import { conceptImages, stays } from "@/features/stays/data/demo-data";
import { SiteShell } from "@/shared/components/layout/site-shell";
import { PageHero } from "@/shared/components/page-hero";

const images = [conceptImages.hero, conceptImages.experience, ...stays.flatMap((stay) => [stay.image, ...stay.gallery.slice(0, 2)])];

export default function GalleryPage() {
  return <SiteShell><PageHero eyebrow="Thư viện" title="Một vài lát cắt của những ngày ở LAKA" description="Bộ ảnh concept định hình cảm xúc cho từng căn nhà. Hình ảnh thực tế sẽ được cập nhật trước khi LAKA chính thức đón khách." /><section className="section-pad"><div className="container-lago columns-1 gap-5 sm:columns-2 lg:columns-3">{images.map((src, index) => <div key={`${src}-${index}`} className={`image-zoom relative mb-5 break-inside-avoid overflow-hidden rounded-[24px] ${index % 3 === 0 ? "aspect-[3/4]" : "aspect-[4/3]"}`}><Image src={src} alt={`LAKA Homestay - ảnh concept ${index + 1}`} fill sizes="33vw" className="object-cover" /><span className="absolute bottom-3 left-3 rounded-full bg-white/85 px-2.5 py-1 text-[.58rem] font-bold uppercase tracking-wider">Concept</span></div>)}</div></section></SiteShell>;
}
