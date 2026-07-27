import Image from "next/image";
import { ShowcaseLink as Link } from "@/features/showcase/site/showcase-link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { TemplateExperienceLayer } from "@/features/showcase/components/template-experience-layer";
import { TemplateDocumentLocale } from "@/features/showcase/components/template-document-locale";
import { TemplateAtmosphereController } from "@/features/showcase/components/template-atmosphere-controller";
import { HomeLandscapeReveal } from "@/features/showcase/components/home-landscape-reveal";
import { experienceMoments } from "@/features/showcase/data/showcase-content";
import { conceptImages } from "@/features/stays/data/demo-data";
import { TemplateFooter, TemplateHeader, type CompleteTemplateConfig } from "@/features/showcase/site/complete-template-site";
import { SkipLink } from "@/shared/components/ui/skip-link";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";
import { englishExperienceMoments } from "@/features/showcase/i18n/showcase-copy";

const sensoryMoments = [
  {
    image: conceptImages.detail1,
    title: { vi: "Ánh sáng đi vào nhà", en: "Light enters the home" },
    text: {
      vi: "Không gian được mở vừa đủ để nắng, gió và màu xanh trở thành một phần của mỗi ngày.",
      en: "The space opens just enough for light, air and greenery to become part of every day."
    }
  },
  {
    image: conceptImages.forest,
    title: { vi: "Thiên nhiên ở thật gần", en: "Nature stays close" },
    text: {
      vi: "Không đứng ngoài để ngắm. Bạn bước vào, nghe tiếng lá và để nhịp thở tự chậm lại.",
      en: "Nature is not kept at a distance. You step in, hear the leaves and let your breathing slow."
    }
  },
  {
    image: conceptImages.dining,
    title: { vi: "Một chiếc bàn giữ mọi người ở lại", en: "A table that keeps everyone close" },
    text: {
      vi: "Bữa ăn không phải một dịch vụ phải hoàn thành, mà là khoảng thời gian để câu chuyện tiếp tục.",
      en: "A meal is not a service to complete, but a space in time for the conversation to continue."
    }
  }
] as const;

export function TinhLangHome({ config, locale = "vi" }: { config: CompleteTemplateConfig; locale?: ShowcaseLocale }) {
  const en = locale === "en";
  const localizedMoments = en
    ? experienceMoments.map((moment, index) => ({ ...moment, ...englishExperienceMoments[index] }))
    : experienceMoments;

  return <div className="showcase-root laka-theme-root min-h-screen bg-[#eae1d2] text-[#16311c]">
    <TemplateDocumentLocale locale={locale} />
    <SkipLink />
    <TemplateExperienceLayer mood="editorial" />
    <TemplateAtmosphereController locale={locale} />
    <TemplateHeader config={config} locale={locale} overlay storyMode />

    <main id="noi-dung-chinh" tabIndex={-1}>
      <section className="relative min-h-[100svh] overflow-hidden bg-[#10251d] text-white">
        <Image
          src={conceptImages.hero}
          alt={en ? "A quiet home held by nature — concept image" : "Một ngôi nhà tĩnh lặng giữa thiên nhiên — hình ảnh minh họa"}
          fill
          priority
          sizes="100vw"
          className="showcase-atmosphere-media object-cover object-[58%_center] scale-[1.01]"
        />
        <span aria-hidden="true" className="showcase-natural-light absolute inset-0" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,18,14,.28)_0%,rgba(5,18,14,.08)_32%,rgba(5,18,14,.82)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,18,14,.5)_0%,transparent_62%)]" />

        <div className="relative z-10 mx-auto flex min-h-[100svh] w-[min(1500px,calc(100%-32px))] flex-col justify-end pb-24 pt-32 sm:w-[min(1500px,calc(100%-56px))] sm:pb-14">
          <p className="text-[.62rem] font-bold uppercase tracking-[.25em] text-[#dfc6a5]">
            {en ? "LAKA journal · A place to feel" : "LAKA ký sự · Một nơi để cảm"}
          </p>
          <h1 className="mt-5 max-w-[1320px] font-serif text-[clamp(3.75rem,15vw,13rem)] font-medium leading-[.8] tracking-[-.07em] sm:leading-[.76] sm:tracking-[-.075em]">
            {en ? <>Come back<br /><i className="font-normal text-[#dfc6a5]">to what<br className="sm:hidden" /> matters.</i></> : <>Trở về<br /><i className="font-normal text-[#dfc6a5]">với điều<br className="sm:hidden" /> quan trọng.</i></>}
          </h1>
          <div className="mt-8 flex items-end justify-between gap-8 border-t border-white/22 pt-6 lg:mt-10">
            <p className="max-w-xl text-sm leading-7 text-white/72 sm:text-base sm:leading-8">
              {en ? "Not a place to rush through. A place to hear yourself, notice one another and let time feel generous again." : "Không phải một nơi để đi cho kịp. Là nơi ta nghe lại mình, nhìn thấy nhau và để thời gian trở nên rộng rãi."}
            </p>
            <a href="#cau-chuyen" aria-label={en ? "Enter the LAKA story" : "Bước vào câu chuyện LAKA"} className="group hidden items-center gap-3 text-[.6rem] font-bold uppercase tracking-[.18em] text-white/65 sm:flex">
              {en ? "Enter slowly" : "Bước vào thật chậm"}
              <span className="grid h-12 w-12 place-items-center rounded-full border border-white/30 transition group-hover:translate-y-1 group-hover:bg-white group-hover:text-[#16311c]"><ArrowDown className="h-4 w-4" /></span>
            </a>
          </div>
        </div>
        <span className="absolute right-4 top-24 z-10 rounded-full border border-white/25 bg-black/12 px-3 py-1.5 text-[.55rem] font-bold uppercase tracking-widest text-white/72 backdrop-blur">
          {en ? "Concept image" : "Hình ảnh minh họa"}
        </span>
      </section>

      <section id="cau-chuyen" className="laka-theme-body relative scroll-mt-20 overflow-hidden px-5 py-24 sm:px-8 sm:py-36 lg:py-44">
        <div className="mx-auto grid w-[min(1380px,100%)] gap-14 lg:grid-cols-[.26fr_1fr]">
          <aside className="lg:pt-4">
            <p className="text-[.62rem] font-bold uppercase tracking-[.22em] text-[#80613f]">{en ? "Why LAKA exists" : "Vì sao LAKA hiện diện"}</p>
            <p className="mt-5 max-w-[230px] text-sm leading-7 text-[#16311c]/55">
              {en ? "Beauty may catch the eye. A meaningful place changes the way we are with ourselves and with one another." : "Cái đẹp có thể giữ ánh nhìn. Một nơi chốn có ý nghĩa sẽ thay đổi cách ta ở bên mình và bên nhau."}
            </p>
          </aside>
          <div>
            <h2 className="max-w-6xl font-serif text-[clamp(3.5rem,8.7vw,8.4rem)] font-medium leading-[.93] tracking-[-.065em]">
              {en ? <>We did not begin<br />with a room.<br /><i className="text-[#9a7550]">We began with a feeling.</i></> : <>Không bắt đầu<br />từ một căn phòng.<br /><i className="text-[#9a7550]">Bắt đầu từ một cảm giác.</i></>}
            </h2>
            <div className="mt-12 grid gap-8 border-t border-[#16311c]/18 pt-8 sm:grid-cols-2 lg:mt-16">
              <p className="max-w-lg text-base leading-8 text-[#16311c]/68">
                {en ? "The feeling of opening a door and hearing the trees before your notifications. Of a morning without a deadline." : "Cảm giác khi mở cửa và nghe tiếng cây trước tiếng thông báo. Khi buổi sáng không có một hạn chót phải đuổi theo."}
              </p>
              <p className="max-w-lg text-base leading-8 text-[#16311c]/68">
                {en ? "A home quiet enough for everyone to put down the noise and notice the people who came with them." : "Một ngôi nhà đủ yên để mỗi người đặt tiếng ồn xuống và thực sự chú ý đến những người đã cùng mình đến đây."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="khong-gian" className="laka-theme-body laka-theme-muted scroll-mt-20 border-y border-[#16311c]/12 bg-[#e3d8c9] px-4 py-24 sm:px-7 sm:py-36">
        <div className="mx-auto w-[min(1420px,100%)]">
          <div className="grid gap-8 lg:grid-cols-[1fr_.42fr] lg:items-end">
            <div>
              <p className="text-[.62rem] font-bold uppercase tracking-[.22em] text-[#80613f]">{en ? "Space is a language" : "Không gian cũng biết kể chuyện"}</p>
              <h2 className="mt-5 max-w-5xl font-serif text-[clamp(3.6rem,8vw,7.8rem)] font-medium leading-[.9] tracking-[-.065em]">
                {en ? <>Designed less.<br /><i>Felt more.</i></> : <>Ít sắp đặt hơn.<br /><i>Nhiều cảm nhận hơn.</i></>}
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-[#16311c]/58">
              {en ? "At LAKA, space does not ask to be admired. It quietly guides where you pause, gather, look out and breathe." : "Ở LAKA, không gian không đòi hỏi được ngắm nhìn. Nó lặng lẽ dẫn ta đến nơi muốn dừng, ngồi gần nhau, nhìn ra xa và thở sâu hơn."}
            </p>
          </div>

          <div className="mt-14 grid gap-4 lg:grid-cols-12">
            {sensoryMoments.map((moment, index) => <article key={moment.title.vi} className={`${index === 1 ? "lg:col-span-5 lg:translate-y-16" : index === 0 ? "lg:col-span-4" : "lg:col-span-3"} group`}>
              <div className={`relative overflow-hidden ${index === 1 ? "aspect-[4/5] rounded-t-[180px]" : "aspect-[4/5]"}`}>
                <Image src={moment.image} alt={`${en ? moment.title.en : moment.title.vi} — ${en ? "concept image" : "hình ảnh minh họa"}`} fill sizes="(max-width:1024px) 100vw, 40vw" className="object-cover transition duration-[1200ms] group-hover:scale-[1.025]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10251d]/55 via-transparent to-transparent" />
                <span className="absolute left-5 top-5 text-[.58rem] font-bold uppercase tracking-[.18em] text-white/75">0{index + 1}</span>
              </div>
              <h3 className="mt-6 font-serif text-3xl font-medium">{en ? moment.title.en : moment.title.vi}</h3>
              <p className="mt-3 max-w-sm text-sm leading-7 text-[#16311c]/58">{en ? moment.text.en : moment.text.vi}</p>
            </article>)}
          </div>
        </div>
      </section>

      <HomeLandscapeReveal locale={locale} />

      <section id="nhip-song" className="scroll-mt-20 overflow-hidden bg-[#10251d] px-5 py-24 text-white sm:px-8 sm:py-36">
        <div className="mx-auto grid w-[min(1380px,100%)] gap-14 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="text-[.62rem] font-bold uppercase tracking-[.22em] text-[#dfc6a5]">{en ? "The rhythm of a day" : "Nhịp của một ngày"}</p>
            <h2 className="mt-6 font-serif text-[clamp(3.5rem,7vw,6.8rem)] font-medium leading-[.9] tracking-[-.06em]">
              {en ? <>Nothing to finish.<br /><i>Everything to feel.</i></> : <>Không cần hoàn thành.<br /><i>Chỉ cần cảm nhận.</i></>}
            </h2>
            <div className="relative mt-10 aspect-[4/5] overflow-hidden rounded-t-[180px] sm:rounded-t-[260px]">
              <Image src={conceptImages.experience} alt={en ? "A slow day close to nature — concept image" : "Một ngày chậm gần thiên nhiên — hình ảnh minh họa"} fill sizes="(max-width:1024px) 100vw, 44vw" className="object-cover" />
            </div>
          </div>
          <div className="border-t border-white/18">
            {localizedMoments.map(({ time, title, text }, index) => <article key={time} className="grid gap-5 border-b border-white/18 py-8 sm:grid-cols-[90px_1fr] sm:py-10">
              <div><span className="text-[.58rem] font-bold uppercase tracking-[.18em] text-[#dfc6a5]">0{index + 1}</span><p className="mt-2 font-serif text-2xl">{time}</p></div>
              <div><h3 className="font-serif text-3xl font-medium sm:text-4xl">{title}</h3><p className="mt-3 max-w-xl text-sm leading-7 text-white/52">{text}</p></div>
            </article>)}
          </div>
        </div>
      </section>

      <section id="du-am" className="laka-theme-body scroll-mt-20 px-5 py-24 sm:px-8 sm:py-40">
        <div className="mx-auto grid w-[min(1380px,100%)] gap-14 lg:grid-cols-[.38fr_1fr]">
          <div>
            <p className="text-[.62rem] font-bold uppercase tracking-[.22em] text-[#80613f]">{en ? "What remains" : "Điều còn ở lại"}</p>
            <p className="mt-6 max-w-xs text-sm leading-7 text-[#16311c]/58">
              {en ? "LAKA does not want to fill your schedule. We want to leave room for what often gets missed." : "LAKA không muốn lấp đầy lịch trình của bạn. Chúng mình muốn để trống chỗ cho những điều ta thường bỏ lỡ."}
            </p>
          </div>
          <div>
            <h2 className="font-serif text-[clamp(3.5rem,8vw,8rem)] font-medium leading-[.92] tracking-[-.06em]">
              {en ? <>You may forget<br />the shape of the room.<br /><i className="text-[#9a7550]">Not how you felt inside it.</i></> : <>Có thể ta quên<br />hình dáng căn phòng.<br /><i className="text-[#9a7550]">Nhưng không quên cảm giác ở bên trong.</i></>}
            </h2>
            <div className="mt-12 border-t border-[#16311c]/18 pt-8">
              <p className="max-w-2xl text-base leading-8 text-[#16311c]/68">
                {en ? "A longer breakfast. A conversation that finally found its time. The quiet certainty that, for a little while, you were fully present." : "Một bữa sáng dài hơn. Một câu chuyện cuối cùng cũng có thời gian để kể. Và cảm giác chắc chắn rằng, trong một khoảng ngắn, ta đã thực sự hiện diện."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative min-h-[86svh] overflow-hidden bg-[#10251d] text-white">
        <Image src={conceptImages.cloud} alt={en ? "A home beneath the clouds — concept image" : "Một ngôi nhà dưới tầng mây — hình ảnh minh họa"} fill sizes="100vw" className="object-cover opacity-62" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,25,19,.9),rgba(7,25,19,.32))]" />
        <div className="relative z-10 mx-auto flex min-h-[86svh] w-[min(1380px,calc(100%-40px))] flex-col justify-center py-24">
          <p className="text-[.62rem] font-bold uppercase tracking-[.24em] text-[#dfc6a5]">{en ? "This is LAKA" : "Đây là LAKA"}</p>
          <h2 className="mt-6 max-w-5xl font-serif text-[clamp(3.8rem,9vw,8.5rem)] font-medium leading-[.88] tracking-[-.065em]">
            {en ? <>A place to return.<br /><i>First, to yourself.</i></> : <>Một nơi để trở về.<br /><i>Trước hết, với chính mình.</i></>}
          </h2>
          <p className="mt-8 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
            {en ? "Stay with the story a little longer, and discover the beliefs behind every space LAKA is creating." : "Ở lại với câu chuyện thêm một chút, để hiểu những niềm tin đứng sau từng không gian LAKA đang tạo nên."}
          </p>
          <Link href={`${config.basePath}/ve-lago`} className="mt-8 inline-flex w-fit items-center gap-3 border-b border-white/35 pb-2 text-xs font-bold uppercase tracking-[.14em] text-white/82">
            {en ? "Read the LAKA story" : "Đọc câu chuyện LAKA"} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>

    <TemplateFooter config={config} locale={locale} storyMode />
  </div>;
}
