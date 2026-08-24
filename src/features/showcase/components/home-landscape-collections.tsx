import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { conceptImages } from "@/features/stays/data/demo-data";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";

const stayGroups = [
  {
    title: { vi: "Nhà Bên Hồ", en: "Lakeside House" },
    subtitle: { vi: "Khoảng Nghỉ Ven Hồ", en: "A Pause by the Water" },
    count: { vi: "02 lựa chọn", en: "02 stay types" },
    image: conceptImages.hero,
    stays: [
      { vi: "Guest House", en: "Guest House" },
      { vi: "Bungalow", en: "Bungalow" }
    ]
  },
  {
    title: { vi: "Lake Cabin", en: "Lake Cabin" },
    subtitle: { vi: "Cabin Bên Hồ", en: "Cabins by the Lake" },
    count: { vi: "04 lựa chọn", en: "04 stay types" },
    image: conceptImages.cloud,
    stays: [
      { vi: "Cabin An Trú", en: "An Tru Cabin" },
      { vi: "Cabin Khoảng Trời", en: "Khoang Troi Cabin" },
      { vi: "Cabin Sum Vầy", en: "Sum Vay Cabin" },
      { vi: "Cabin Vô Cực", en: "Vo Cuc Cabin" }
    ]
  },
  {
    title: { vi: "Nhà Trên Đồi", en: "Hill House" },
    subtitle: { vi: "Tụ Họp Giữa Lưng Đồi", en: "Gathering on the Hillside" },
    count: { vi: "01 lựa chọn", en: "01 stay type" },
    image: conceptImages.hill,
    stays: [
      { vi: "Villa Top Hill", en: "Villa Top Hill" }
    ]
  }
] as const;

const sharedBenefits = [
  {
    title: { vi: "Tiện nghi trong kỳ nghỉ", en: "In-stay comforts" },
    text: {
      vi: "Bể bơi Bốn Mùa, trà, cà phê, nước suối tại phòng, Wi-Fi và truyền hình cáp.",
      en: "Four-season Pool, in-room tea, coffee and water, Wi-Fi and cable TV."
    }
  },
  {
    title: { vi: "Khoảng vui dùng chung", en: "Shared activities" },
    text: {
      vi: "Xe đạp, bi-a, bóng bàn, bi lắc, boardgame, sân team building và sân khấu ngoài trời.",
      en: "Bicycles, billiards, table tennis, foosball, board games, a team-building ground and an outdoor stage."
    }
  }
] as const;

export function HomeLandscapeCollections({ basePath, locale = "vi" }: { basePath: string; locale?: ShowcaseLocale }) {
  const en = locale === "en";

  return (
    <section id="luu-tru" className="laka-section-normal scroll-mt-20 border-y border-[#16311c]/12 bg-[#e3d8c9] px-5 sm:px-8">
      <div className="mx-auto w-[min(1380px,100%)]">
        <header className="grid gap-8 border-b border-[#16311c]/15 pb-10 lg:grid-cols-[.38fr_1fr] lg:items-end lg:pb-12">
          <div>
            <p className="laka-eyebrow text-[#80613f]">
              {en ? "Stay at LaKa" : "Lưu trú tại LaKa"}
            </p>
            <p className="laka-body-muted mt-5 max-w-sm">
              {en
                ? "Three landscapes offer a quick way to find the rhythm that suits your journey."
                : "Ba nhóm không gian giúp bạn hình dung nhanh nhịp nghỉ phù hợp cho chuyến đi."}
            </p>
          </div>
          <h2 className="laka-heading-section max-w-5xl">
            {en ? <>One green retreat,<br /><i>one rhythm of your own.</i></> : <>Một khoảng xanh,<br /><i>một nhịp riêng.</i></>}
          </h2>
        </header>

        <div className="showcase-snap-rail mt-10 lg:grid-cols-3 lg:gap-5" aria-label={en ? "LAKA stay groups" : "Ba nhóm lưu trú tại LAKA"}>
          {stayGroups.map((group, groupIndex) => (
            <article key={group.title.vi} className="showcase-snap-card group flex h-full flex-col border border-[#16311c]/14 bg-[#eadfce]">
              <div className="laka-media-frame relative aspect-[16/11] overflow-hidden bg-[#10251d]">
                <Image
                  src={group.image}
                  alt={group.title[locale] + " — " + (en ? "concept image" : "hình ảnh minh họa")}
                  fill
                  sizes="(max-width:1024px) 82vw, 33vw"
                  className="object-cover transition duration-1000 ease-out group-hover:scale-[1.025]"
                />
                <span className="absolute left-4 top-4 rounded-full bg-[#07150f]/68 px-3 py-1.5 text-[.55rem] font-bold uppercase tracking-[.15em] text-white backdrop-blur">
                  0{groupIndex + 1}
                </span>
                <span className="absolute bottom-4 right-4 rounded-full bg-[#f2ece2]/92 px-3 py-1.5 text-[.54rem] font-bold uppercase tracking-[.13em] text-[#16311c] backdrop-blur">
                  {group.count[locale]}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <p className="text-[.58rem] font-bold uppercase tracking-[.16em] text-[#80613f]">{group.subtitle[locale]}</p>
                <h3 className="laka-heading-card mt-3">{group.title[locale]}</h3>
                <ul className="mt-7 border-t border-[#16311c]/14 pt-5" aria-label={(en ? "Stay types in " : "Các lựa chọn thuộc ") + group.title[locale]}>
                  {group.stays.map((stay, stayIndex) => (
                    <li key={stay.vi} className="flex items-center gap-3 py-1.5 text-sm text-[#16311c]/72">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-[#80613f]" aria-hidden="true" />
                      <span>{stay[locale]}</span>
                      <span className="ml-auto text-[.55rem] font-bold tracking-[.14em] text-[#80613f]">{String(stayIndex + 1).padStart(2, "0")}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-9 flex flex-col items-start justify-between gap-5 border-t border-[#16311c]/15 pt-7 sm:flex-row sm:items-center">
          <p className="laka-body-muted max-w-2xl">
            {en
              ? "Compare every stay type, capacity and confirmed amenity on the full accommodation page."
              : "Xem đầy đủ từng dòng căn, sức chứa và tiện nghi đã xác nhận tại trang Lưu trú."}
          </p>
          <Link href={basePath + "/luu-tru"} className="focus-ring group inline-flex min-h-12 shrink-0 items-center gap-3 border-b border-[#16311c]/35 text-xs font-bold uppercase tracking-[.12em]">
            {en ? "Explore all stays" : "Khám phá toàn bộ lưu trú"}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </div>

        <aside className="mt-10 grid gap-8 bg-[#10251d] p-7 text-white sm:p-9 lg:grid-cols-[.38fr_1fr] lg:items-start lg:p-10">
          <div>
            <p className="text-[.62rem] font-bold uppercase tracking-[.22em] text-[#dfc6a5]">{en ? "Across every stay" : "Đi cùng mỗi khoảng nghỉ"}</p>
            <h3 className="mt-4 max-w-sm font-serif text-[1.8rem] font-medium leading-tight sm:text-[2.15rem]">
              {en ? "More ways to enjoy the valley together." : "Thêm những khoảng vui bên nhau."}
            </h3>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {sharedBenefits.map((benefit) => (
              <section key={benefit.title.vi} className="border-t border-white/18 pt-5">
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 shrink-0 text-[#dfc6a5]" />
                  <h4 className="text-xs font-bold uppercase tracking-[.12em]">{benefit.title[locale]}</h4>
                </div>
                <p className="mt-3 text-sm leading-7 text-white/68">{benefit.text[locale]}</p>
              </section>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
