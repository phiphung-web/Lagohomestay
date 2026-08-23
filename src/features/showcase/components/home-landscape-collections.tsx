import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { conceptImages } from "@/features/stays/data/demo-data";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";

const stayGroups = [
  {
    title: { vi: "Nhà Bên Hồ - Khoảng Nghỉ Ven Hồ", en: "Lakeside House - A Pause by the Water" },
    image: conceptImages.hero,
    stays: [
      {
        title: { vi: "Guest House", en: "Guest House" },
        details: {
          vi: "35m2 | 5 giường vừa (max 10 người) | WC khép kín, tủ quần áo, điều hòa, quạt, ấm siêu tốc, máy sấy tóc.",
          en: "35m2 | 5 medium beds (max 10 guests) | En-suite bathroom, wardrobe, air conditioning, fan, kettle and hair dryer."
        },
        href: "nha-ben-ho"
      },
      {
        title: { vi: "Bungalow", en: "Bungalow" },
        details: {
          vi: "15m2 (2 tầng - 1 gác xép) | 2 giường lớn (5–7 người) | Bàn trang điểm, giá treo đồ, WC khép kín, thiết bị cơ bản.",
          en: "15m2 (2 levels - 1 loft) | 2 large beds (5–7 guests) | Vanity, clothes rack, en-suite bathroom and essential equipment."
        },
        href: "bungalow-ben-ho"
      }
    ]
  },
  {
    title: { vi: "Lake Cabin - Cabin Bên Hồ", en: "Lake Cabin" },
    image: conceptImages.cloud,
    stays: [
      {
        title: { vi: "Cabin An Trú (2 Cabin) [Lake Suite]", en: "An Tru Cabin (2 Cabins) [Lake Suite]" },
        details: {
          vi: "25m2 | 1 giường lớn | Bàn ghế ngoài trời, bàn trang điểm, WC khép kín.",
          en: "25m2 | 1 large bed | Outdoor seating, vanity and en-suite bathroom."
        },
        breakfast: true,
        href: "cabin-an-tru"
      },
      {
        title: { vi: "Cabin Khoảng Trời (6 Cabin) [Forest Lake Suite]", en: "Khoang Troi Cabin (6 Cabins) [Forest Lake Suite]" },
        details: {
          vi: "25m2 | Mặt kính lớn ngắm toàn cảnh | 1 giường lớn, bàn ghế ngoài trời, WC khép kín.",
          en: "25m2 | Panoramic glazing | 1 large bed, outdoor seating and en-suite bathroom."
        },
        breakfast: true,
        href: "cabin-khoang-troi"
      },
      {
        title: { vi: "Cabin Sum Vầy (2 Cabin) [Cabin Group]", en: "Sum Vay Cabin (2 Cabins) [Cabin Group]" },
        details: {
          vi: "30m2 | 7 giường tầng (max 14 người) | 4 ô kính view rừng thông, WC khép kín.",
          en: "30m2 | 7 bunk beds (max 14 guests) | 4 windows facing the pine forest and an en-suite bathroom."
        },
        href: "cabin-sum-vay"
      },
      {
        title: { vi: "Cabin Vô Cực (4 Cabin) [Forest Lake Bathtub Suite]", en: "Vo Cuc Cabin (4 Cabins) [Forest Lake Bathtub Suite]" },
        details: {
          vi: "25m2 | Kính góc 180 độ | Bồn tắm ngâm mình riêng tư, giường lớn, bàn ghế ngoài trời.",
          en: "25m2 | 180-degree corner glazing | Private soaking tub, large bed and outdoor seating."
        },
        breakfast: true,
        href: "cabin-vo-cuc"
      }
    ]
  },
  {
    title: { vi: "Nhà Trên Đồi - Tụ Họp Giữa Lưng Đồi", en: "Hill House - Gathering on the Hillside" },
    image: conceptImages.hill,
    stays: [
      {
        title: { vi: "Villa Top Hill (1 Nhà)", en: "Villa Top Hill (1 House)" },
        details: {
          vi: "35m2 (1 ngủ + 1 khách) | 5 giường vừa (15–20 người) | Sofa, tivi, sân lớn ngoài trời, WC khép kín.",
          en: "35m2 (1 bedroom + 1 living room) | 5 medium beds (15–20 guests) | Sofa, TV, large outdoor yard and en-suite bathroom."
        },
        href: "nha-tren-doi"
      }
    ]
  }
] as const;

const sharedBenefits = [
  {
    title: { vi: "Miễn phí", en: "Complimentary" },
    text: {
      vi: "Bể bơi Bốn Mùa công nghệ tự nhiên, trà/cà phê/nước suối tại phòng, Wi-Fi, truyền hình cáp.",
      en: "Natural-technology Four-season Pool, in-room tea, coffee and water, Wi-Fi and cable TV."
    }
  },
  {
    title: { vi: "Hoạt động miễn phí", en: "Complimentary activities" },
    text: {
      vi: "Xe đạp tham quan, bi-a, bóng bàn, bi lắc, boardgame, sân team building (100m2), sân khấu ngoài trời (100m2).",
      en: "Bicycles, billiards, table tennis, foosball, board games, a 100m2 team-building ground and a 100m2 outdoor stage."
    }
  }
] as const;

export function HomeLandscapeCollections({ basePath, locale = "vi" }: { basePath: string; locale?: ShowcaseLocale }) {
  const en = locale === "en";

  return (
    <section id="luu-tru" className="laka-section-normal scroll-mt-20 border-y border-[#16311c]/12 bg-[#e3d8c9] px-5 sm:px-8">
      <div className="mx-auto w-[min(1480px,100%)]">
        <header className="grid gap-8 border-b border-[#16311c]/15 pb-12 lg:grid-cols-[.35fr_1fr] lg:items-end">
          <div>
            <p className="laka-eyebrow text-[#80613f]">
              {en ? "Stay at LaKa" : "Lưu trú tại LaKa"}
            </p>
            <p className="laka-body-muted mt-5 max-w-sm">
              {en ? "Seven ways to stay, gathered in one place for a clear comparison." : "Bảy lựa chọn lưu trú được gom trong một không gian để bạn dễ dàng tìm đúng nhịp nghỉ."}
            </p>
          </div>
          <h2 className="laka-heading-section max-w-5xl">
            {en ? <>One green retreat,<br /><i>one rhythm of your own.</i></> : <>Một khoảng xanh,<br /><i>một nhịp riêng.</i></>}
          </h2>
        </header>

        <div className="divide-y divide-[#16311c]/15">
          {stayGroups.map((group, groupIndex) => (
            <article key={group.title.vi} className="grid gap-8 py-12 lg:grid-cols-[.36fr_1fr] lg:gap-14 lg:py-20">
              <div>
                <div className="laka-media-frame relative aspect-[16/10] overflow-hidden bg-[#10251d]">
                  <Image src={group.image} alt={`${group.title[locale]} — ${en ? "concept image" : "hình ảnh minh họa"}`} fill sizes="(max-width:1024px) 100vw, 36vw" className="object-cover" />
                  <span className="absolute left-4 top-4 rounded-full bg-[#07150f]/62 px-3 py-1.5 text-[.55rem] font-bold uppercase tracking-[.15em] text-white backdrop-blur">
                    0{groupIndex + 1}
                  </span>
                </div>
                <h3 className="laka-heading-card mt-6">{group.title[locale]}</h3>
              </div>

              <div className="divide-y divide-[#16311c]/15 border-y border-[#16311c]/15">
                {group.stays.map((stay, stayIndex) => (
                  <Link key={stay.title.vi} href={`${basePath}/luu-tru/${stay.href}`} className="focus-ring group grid gap-4 py-7 sm:grid-cols-[52px_1fr_auto] sm:items-start sm:gap-6">
                    <span className="text-[.62rem] font-bold tracking-[.16em] text-[#80613f]">{String(stayIndex + 1).padStart(2, "0")}</span>
                    <div>
                      <h4 className="font-serif text-xl font-medium leading-tight sm:text-2xl">{stay.title[locale]}</h4>
                      <p className="laka-body-muted mt-3 max-w-3xl">{stay.details[locale]}</p>
                      {"breakfast" in stay && stay.breakfast ? (
                        <p className="mt-3 text-xs font-bold uppercase tracking-[.1em] text-[#80613f]">{en ? "Includes 1 breakfast" : "Gồm 1 bữa sáng"}</p>
                      ) : null}
                    </div>
                    <ArrowRight className="mt-1 hidden h-4 w-4 transition group-hover:translate-x-1 sm:block" />
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>

        <aside className="grid gap-8 bg-[#10251d] p-7 text-white sm:p-10 lg:grid-cols-[.35fr_1fr] lg:p-14">
          <div>
            <p className="text-[.62rem] font-bold uppercase tracking-[.22em] text-[#dfc6a5]">{en ? "Every stay includes" : "Tiện ích chung · Tất cả các phòng"}</p>
            <h3 className="mt-5 font-serif text-[2rem] font-medium leading-tight sm:text-[2.5rem]">{en ? "More room to enjoy together." : "Thêm nhiều khoảng vui chung."}</h3>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {sharedBenefits.map((benefit) => (
              <section key={benefit.title.vi} className="border border-white/16 p-6">
                <Check className="h-5 w-5 text-[#dfc6a5]" />
                <h4 className="mt-5 text-sm font-bold uppercase tracking-[.12em]">{benefit.title[locale]}</h4>
                <p className="laka-body mt-4 text-white/68">{benefit.text[locale]}</p>
              </section>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
