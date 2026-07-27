import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { TemplateExperienceLayer } from "@/features/showcase/components/template-experience-layer";
import { TemplateDocumentLocale } from "@/features/showcase/components/template-document-locale";
import { conceptImages } from "@/features/stays/data/demo-data";
import { TemplateFooter, TemplateHeader, type CompleteTemplateConfig } from "@/features/showcase/site/complete-template-site";
import { SkipLink } from "@/shared/components/ui/skip-link";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";

const homePaths = [
  {
    href: "trai-nghiem",
    image: conceptImages.experience,
    eyebrow: { vi: "Nhịp sống", en: "The rhythm" },
    title: { vi: "Một ngày không cần vội", en: "A day with nowhere to rush" },
    text: {
      vi: "Từ ánh sáng đầu ngày đến một buổi tối thật yên, hãy cảm nhận cách thời gian trôi ở LAKA.",
      en: "From the first light to a genuinely quiet evening, feel how time moves at LAKA."
    }
  },
  {
    href: "am-thuc",
    image: conceptImages.dining,
    eyebrow: { vi: "Bên bàn ăn", en: "Around the table" },
    title: { vi: "Nơi câu chuyện dài hơn", en: "Where conversations last longer" },
    text: {
      vi: "Những bữa ăn giản dị, đủ gần gũi để mọi người ngồi lại với nhau thêm một chút.",
      en: "Simple meals, intimate enough to keep everyone at the table a little longer."
    }
  },
  {
    href: "ve-lago",
    image: conceptImages.forest,
    eyebrow: { vi: "Về LAKA", en: "About LAKA" },
    title: { vi: "Một nơi được tạo nên từ cảm giác", en: "A place shaped by a feeling" },
    text: {
      vi: "Hiểu thêm về niềm tin, cách nghĩ và những điều LAKA muốn gìn giữ trong từng không gian.",
      en: "Discover the beliefs, thinking and values LAKA wants every space to hold."
    }
  }
] as const;

export function MainHome({ config, locale = "vi" }: { config: CompleteTemplateConfig; locale?: ShowcaseLocale }) {
  const en = locale === "en";

  return <div className="showcase-root min-h-screen bg-[#eae1d2] text-[#16311c]">
    <TemplateDocumentLocale locale={locale} />
    <SkipLink />
    <TemplateExperienceLayer mood="editorial" />
    <TemplateHeader config={config} locale={locale} overlay />

    <main id="noi-dung-chinh" tabIndex={-1}>
      <section className="relative min-h-[88svh] overflow-hidden bg-[#10251d] text-white">
        <Image
          src={conceptImages.hero}
          alt={en ? "A quiet home surrounded by nature — concept image" : "Một ngôi nhà tĩnh lặng giữa thiên nhiên — hình ảnh minh họa"}
          fill
          priority
          sizes="100vw"
          className="showcase-visual-media object-cover object-[58%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,18,14,.24),rgba(5,18,14,.08)_38%,rgba(5,18,14,.8))]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,18,14,.5),transparent_64%)]" />

        <div className="relative z-10 mx-auto flex min-h-[88svh] w-[min(1500px,calc(100%-32px))] flex-col justify-end pb-16 pt-36 sm:w-[min(1500px,calc(100%-56px))] sm:pb-20">
          <p className="text-[.62rem] font-bold uppercase tracking-[.24em] text-[#dfc6a5]">
            {en ? "LAKA · Close to nature, close to one another" : "LAKA · Gần thiên nhiên, gần nhau hơn"}
          </p>
          <h1 className="mt-5 max-w-6xl font-serif text-[clamp(3.6rem,11vw,9rem)] font-medium leading-[.85] tracking-[-.065em]">
            {en ? <>Come back<br /><i className="font-normal text-[#dfc6a5]">to what matters.</i></> : <>Trở về với<br /><i className="font-normal text-[#dfc6a5]">điều quan trọng.</i></>}
          </h1>
          <div className="mt-8 flex items-end justify-between gap-8 border-t border-white/22 pt-6">
            <p className="max-w-xl text-sm leading-7 text-white/72 sm:text-base sm:leading-8">
              {en ? "A place where mornings begin gently, conversations last longer and time feels like your own again." : "Một nơi buổi sáng bắt đầu thật khẽ, những cuộc trò chuyện dài hơn và thời gian lại thuộc về mình."}
            </p>
            <a href="#gioi-thieu" className="group hidden items-center gap-3 text-[.6rem] font-bold uppercase tracking-[.18em] text-white/65 sm:flex">
              {en ? "Discover LAKA" : "Khám phá LAKA"}
              <span className="grid h-11 w-11 place-items-center rounded-full border border-white/30 transition group-hover:translate-y-1 group-hover:bg-white group-hover:text-[#16311c]"><ArrowDown className="h-4 w-4" /></span>
            </a>
          </div>
        </div>
      </section>

      <section id="gioi-thieu" className="scroll-mt-20 px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto grid w-[min(1320px,100%)] gap-12 lg:grid-cols-[.34fr_1fr]">
          <div>
            <p className="text-[.62rem] font-bold uppercase tracking-[.22em] text-[#80613f]">{en ? "The LAKA spirit" : "Tinh thần LAKA"}</p>
            <p className="mt-5 max-w-xs text-sm leading-7 text-[#16311c]/58">
              {en ? "More than a beautiful place, LAKA is a way of being present." : "Không chỉ là một nơi đẹp, LAKA là một cách để ta thực sự hiện diện."}
            </p>
          </div>
          <div>
            <h2 className="max-w-5xl font-serif text-[clamp(3.2rem,7vw,6.8rem)] font-medium leading-[.94] tracking-[-.055em]">
              {en ? <>We create space<br />for people to <i className="text-[#9a7550]">notice one another.</i></> : <>Chúng mình tạo khoảng trống<br />để mọi người <i className="text-[#9a7550]">nhìn thấy nhau.</i></>}
            </h2>
            <div className="mt-10 grid gap-7 border-t border-[#16311c]/16 pt-7 sm:grid-cols-2">
              <p className="text-base leading-8 text-[#16311c]/68">
                {en ? "To hear the trees before the notifications. To let breakfast end whenever the conversation does." : "Để nghe tiếng cây trước tiếng thông báo. Để bữa sáng chỉ kết thúc khi câu chuyện đã vơi."}
              </p>
              <p className="text-base leading-8 text-[#16311c]/68">
                {en ? "To have a place beautiful enough to remember, yet quiet enough for the people inside it to matter most." : "Để có một nơi đủ đẹp mà nhớ, nhưng đủ yên để những người ở bên trong mới là điều đáng nhớ nhất."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#16311c]/12 bg-[#e3d8c9] px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto grid w-[min(1380px,100%)] gap-5 lg:grid-cols-[1.15fr_.85fr]">
          <div className="relative min-h-[64svh] overflow-hidden rounded-t-[180px] sm:rounded-t-[280px]">
            <Image src={conceptImages.detail1} alt={en ? "Natural light inside a LAKA space — concept image" : "Ánh sáng tự nhiên trong không gian LAKA — hình ảnh minh họa"} fill sizes="(max-width:1024px) 100vw, 58vw" className="object-cover" />
          </div>
          <div className="flex flex-col justify-between gap-12 border border-[#16311c]/12 p-7 sm:p-10 lg:p-12">
            <div>
              <p className="text-[.62rem] font-bold uppercase tracking-[.22em] text-[#80613f]">{en ? "Space with a purpose" : "Không gian có chủ ý"}</p>
              <h2 className="mt-5 font-serif text-5xl font-medium leading-[.95] tracking-[-.05em] sm:text-6xl">
                {en ? <>Quiet enough<br /><i>to feel more.</i></> : <>Đủ tĩnh lặng<br /><i>để cảm nhiều hơn.</i></>}
              </h2>
            </div>
            <div>
              <p className="max-w-md text-sm leading-7 text-[#16311c]/62">
                {en ? "Light, air, greenery and the distance between things are considered together — not to impress, but to make every moment feel natural." : "Ánh sáng, gió, màu xanh và khoảng cách giữa mọi vật được cân nhắc cùng nhau — không để phô diễn, mà để mỗi khoảnh khắc diễn ra thật tự nhiên."}
              </p>
              <Link href={`${config.basePath}/ve-lago`} className="mt-6 inline-flex items-center gap-2 border-b border-[#16311c]/35 pb-2 text-xs font-bold uppercase tracking-[.12em]">
                {en ? "Our approach to space" : "Cách LAKA tạo nên không gian"} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto w-[min(1380px,100%)]">
          <div className="grid gap-8 lg:grid-cols-[1fr_.4fr] lg:items-end">
            <div>
              <p className="text-[.62rem] font-bold uppercase tracking-[.22em] text-[#80613f]">{en ? "Explore LAKA" : "Khám phá LAKA"}</p>
              <h2 className="mt-5 max-w-5xl font-serif text-[clamp(3.2rem,7vw,6.6rem)] font-medium leading-[.94] tracking-[-.055em]">
                {en ? <>Choose what you<br /><i>want to understand.</i></> : <>Chọn điều bạn<br /><i>muốn hiểu thêm.</i></>}
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-[#16311c]/58">
              {en ? "There is no prescribed route. Begin with a day, a table or the story behind the place." : "Không có lộ trình bắt buộc. Bạn có thể bắt đầu từ một ngày, một bàn ăn hoặc câu chuyện phía sau nơi chốn."}
            </p>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {homePaths.map((item) => <Link key={item.href} href={`${config.basePath}/${item.href}`} className="group border border-[#16311c]/12 bg-[#e7ded1] p-3 transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(22,49,28,.1)]">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={item.image} alt={`${en ? item.title.en : item.title.vi} — ${en ? "concept image" : "hình ảnh minh họa"}`} fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-[1.025]" />
              </div>
              <div className="p-4 pb-5 pt-6">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-[.58rem] font-bold uppercase tracking-[.18em] text-[#80613f]">{en ? item.eyebrow.en : item.eyebrow.vi}</p>
                    <h3 className="mt-3 font-serif text-3xl font-medium leading-tight">{en ? item.title.en : item.title.vi}</h3>
                  </div>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#16311c]/18 transition group-hover:bg-[#16311c] group-hover:text-white"><ArrowRight className="h-4 w-4" /></span>
                </div>
                <p className="mt-4 text-sm leading-7 text-[#16311c]/58">{en ? item.text.en : item.text.vi}</p>
              </div>
            </Link>)}
          </div>
        </div>
      </section>

      <section className="relative min-h-[68svh] overflow-hidden bg-[#10251d] text-white">
        <Image src={conceptImages.cloud} alt={en ? "A quiet place beneath the clouds — concept image" : "Một nơi tĩnh lặng dưới tầng mây — hình ảnh minh họa"} fill sizes="100vw" className="object-cover opacity-58" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#10251d]/92 via-[#10251d]/55 to-transparent" />
        <div className="relative z-10 mx-auto flex min-h-[68svh] w-[min(1380px,calc(100%-40px))] items-center py-20">
          <div className="max-w-4xl">
            <p className="text-[.62rem] font-bold uppercase tracking-[.24em] text-[#dfc6a5]">{en ? "A place to return" : "Một nơi để trở về"}</p>
            <h2 className="mt-6 font-serif text-[clamp(3.6rem,8vw,7.5rem)] font-medium leading-[.9] tracking-[-.06em]">
              {en ? <>Not to escape life.<br /><i>To return to it differently.</i></> : <>Không phải để trốn khỏi cuộc sống.<br /><i>Mà để trở lại theo một cách khác.</i></>}
            </h2>
          </div>
        </div>
      </section>
    </main>

    <TemplateFooter config={config} locale={locale} homeMode />
  </div>;
}
