import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { conceptImages, stays } from "@/lib/demo-data";
const images=[conceptImages.hero,stays[0].image,conceptImages.detail1,stays[1].image,conceptImages.experience,conceptImages.detail2,stays[2].image,conceptImages.detail3];
export default function GalleryPage(){return <SiteShell><PageHero eyebrow="Thư viện" title="Một vài lát cắt của những ngày ở Lago" description="Bộ ảnh concept định hình cảm xúc ban đầu. Hình ảnh thực tế sẽ được cập nhật trước khi Lago chính thức đón khách."/><section className="section-pad"><div className="container-lago columns-1 gap-5 sm:columns-2 lg:columns-3">{images.map((src,i)=><div key={`${src}-${i}`} className={`relative mb-5 break-inside-avoid overflow-hidden rounded-[24px] ${i%3===0?"aspect-[3/4]":"aspect-[4/3]"}`}><Image src={src} alt={`Lago Homestay - ảnh concept ${i+1}`} fill sizes="33vw" className="object-cover"/><span className="absolute bottom-3 left-3 rounded-full bg-white/85 px-2.5 py-1 text-[.58rem] font-bold uppercase tracking-wider">Concept</span></div>)}</div></section></SiteShell>}
