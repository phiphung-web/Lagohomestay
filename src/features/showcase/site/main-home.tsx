import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { GalleryLightbox } from "@/features/showcase/components/gallery-lightbox";
import { HomeDayJourney } from "@/features/showcase/components/home-day-journey";
import { HomeLandscapeCollections } from "@/features/showcase/components/home-landscape-collections";
import { TemplateExperienceLayer } from "@/features/showcase/components/template-experience-layer";
import { TemplateDocumentLocale } from "@/features/showcase/components/template-document-locale";
import { specialMoments } from "@/features/showcase/data/laka-demo-content";
import { conceptImages } from "@/features/stays/data/demo-data";
import { TemplateFooter, TemplateHeader, type CompleteTemplateConfig } from "@/features/showcase/site/complete-template-site";
import { SkipLink } from "@/shared/components/ui/skip-link";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";

const memoryImages = [
  conceptImages.detail1,
  conceptImages.breakfast,
  conceptImages.forest,
  conceptImages.dining,
  conceptImages.hill,
  conceptImages.detail3
];

export function MainHome({ config, locale = "vi" }: { config: CompleteTemplateConfig; locale?: ShowcaseLocale }) {
  const en = locale === "en";

  return <div className="showcase-root min-h-screen bg-[#eae1d2] text-[#16311c]">
    <TemplateDocumentLocale locale={locale} />
    <SkipLink />
    <TemplateExperienceLayer mood="editorial" />
    <TemplateHeader config={config} locale={locale} overlay />

    <main id="noi-dung-chinh" tabIndex={-1}>
      <section className="relative min-h-[100svh] overflow-hidden bg-[#10251d] text-white">
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

        <div className="relative z-10 mx-auto flex min-h-[100svh] w-[min(1500px,calc(100%-32px))] flex-col justify-end pb-16 pt-36 sm:w-[min(1500px,calc(100%-56px))] sm:pb-20">
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
            <Link href={`${config.basePath}/ve-lago`} className="focus-ring group mt-9 inline-flex min-h-12 items-center gap-3 border-b border-[#16311c]/35 text-xs font-bold uppercase tracking-[.12em]">
              {en ? "Read the LAKA story" : "Đọc câu chuyện của LAKA"}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <HomeDayJourney locale={locale} />
      <HomeLandscapeCollections basePath={config.basePath} locale={locale} />

      <section id="dau-moc" className="border-b border-[#16311c]/12 bg-[#eae1d2] px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto grid w-[min(1380px,100%)] gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
          <div>
            <div className="lg:sticky lg:top-32">
              <p className="text-[.62rem] font-bold uppercase tracking-[.22em] text-[#80613f]">{en ? "Moments worth marking" : "Những dịp đáng ghi nhớ"}</p>
              <h2 className="mt-5 max-w-xl font-serif text-[clamp(3.2rem,6vw,6rem)] font-medium leading-[.92] tracking-[-.055em]">
                {en ? <>The place is quiet.<br /><i>The memory does not have to be.</i></> : <>Không gian thật yên.<br /><i>Kỷ niệm thì không cần nhỏ.</i></>}
              </h2>
              <div className="relative mt-10 min-h-[48svh] overflow-hidden rounded-t-[160px] sm:rounded-t-[220px]">
                <Image src={conceptImages.dining} alt={en ? "A private celebration at LAKA — concept image" : "Một dịp riêng tư tại LAKA — hình ảnh minh họa"} fill sizes="(max-width:1024px) 100vw, 44vw" className="object-cover transition duration-700 hover:scale-[1.02]" />
              </div>
            </div>
          </div>

          <div className="border-t border-[#16311c]/14">
            {specialMoments.map((moment, index) => {
              const Icon = moment.icon;
              return (
                <article key={moment.title.vi} className="grid gap-5 border-b border-[#16311c]/14 py-8 sm:grid-cols-[56px_1fr] sm:py-10">
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-[#16311c]/16 text-[#80613f]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="flex items-baseline justify-between gap-6">
                      <h3 className="font-serif text-3xl font-medium sm:text-4xl">{en ? moment.title.en : moment.title.vi}</h3>
                      <span className="text-[.58rem] font-bold tracking-[.14em] text-[#80613f]">{String(index + 1).padStart(2, "0")}</span>
                    </div>
                    <p className="mt-4 max-w-xl text-sm leading-7 text-[#16311c]/58">{en ? moment.text.en : moment.text.vi}</p>
                  </div>
                </article>
              );
            })}
            <Link href={`${config.basePath}/dich-vu`} className="focus-ring group mt-9 inline-flex min-h-12 items-center gap-3 border-b border-[#16311c]/35 text-xs font-bold uppercase tracking-[.12em]">
              {en ? "Discover thoughtful services" : "Khám phá dịch vụ được chuẩn bị riêng"}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <section id="ky-uc" className="bg-[#f2ece2] px-5 pt-24 sm:px-8 sm:pt-32">
        <div className="mx-auto grid w-[min(1380px,100%)] gap-8 lg:grid-cols-[1fr_.45fr] lg:items-end">
          <div>
            <p className="text-[.62rem] font-bold uppercase tracking-[.22em] text-[#80613f]">{en ? "A short memory gallery" : "Một thư viện ký ức vừa đủ"}</p>
            <h2 className="mt-5 max-w-5xl font-serif text-[clamp(3.2rem,7vw,6.6rem)] font-medium leading-[.92] tracking-[-.055em]">
              {en ? <>Images do not prove the stay.<br /><i>They help you imagine it.</i></> : <>Hình ảnh không kể thay kỳ nghỉ.<br /><i>Chỉ mở ra một cách để hình dung.</i></>}
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-[#16311c]/58">
            {en ? "A curated set of frames, intentionally shorter than an endless gallery." : "Một số khung hình được chọn lọc, vừa đủ để gợi cảm giác mà không biến trang thành một thư viện kéo dài bất tận."}
          </p>
        </div>
        <GalleryLightbox images={memoryImages} mood="editorial" locale={locale} />
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
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href={`${config.basePath}/luu-tru`} className="focus-ring group inline-flex min-h-12 items-center gap-3 rounded-full bg-[#eae1d2] px-6 text-sm font-bold text-[#16311c]">
                {en ? "Explore the homes" : "Khám phá các căn nhà"}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
              <Link href={`${config.basePath}/thong-tin`} className="focus-ring inline-flex min-h-12 items-center rounded-full border border-white/28 px-6 text-sm font-bold text-white/78 transition hover:bg-white/10 hover:text-white">
                {en ? "Good to know" : "Thông tin cần biết"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>

    <TemplateFooter config={config} locale={locale} homeMode />
  </div>;
}
