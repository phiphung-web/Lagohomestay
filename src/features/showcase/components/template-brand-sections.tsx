import Image from "next/image";
import { ArrowRight, Instagram, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { conceptImages } from "@/features/stays/data/demo-data";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";
import { publicContact } from "@/shared/lib/public-contact";

type Mood = "editorial" | "cinematic" | "organic";

const contactChannels = [
  { icon: Phone, label: { vi: "Điện thoại", en: "Phone" }, value: publicContact.phoneDisplay, href: publicContact.phoneHref },
  { icon: Phone, label: { vi: "Zalo", en: "Zalo" }, value: publicContact.phoneDisplay, href: publicContact.zaloHref },
  { icon: Mail, label: { vi: "Email", en: "Email" }, value: publicContact.email, href: publicContact.emailHref },
  { icon: MapPin, label: { vi: "Địa chỉ", en: "Address" }, value: publicContact.address, href: null }
] as const;

const quote = "Một kỳ nghỉ tốt không cần quá nhiều thứ để làm. Chỉ cần đúng người, đúng không gian và đủ thời gian.";

const brandValues = {
  vi: [
    ["Tôn trọng Tự nhiên", "Trân trọng vẻ nguyên sơ của thung lũng, LAKA chọn cách hiện diện thật nhẹ nhàng giữa thiên nhiên. Từ thiết kế, vật liệu đến từng hoạt động, mọi lựa chọn đều được cân nhắc để giảm tác động lên môi trường và gìn giữ cảnh quan nơi đây bền vững theo thời gian."],
    ["Chữa lành Nguyên bản", "Một chốn an trú giữa thiên nhiên, nơi từng mảng xanh và mỗi khung kính đều mở ra khoảng lặng vừa đủ để những ngổn ngang dần lắng xuống, tâm trí được thảnh thơi và trở về với vẻ tinh khôi vốn có."],
    ["Kết nối Chân thật", "Kiến tạo những trải nghiệm đa dạng giữa thiên nhiên để thung lũng trở thành nơi kết nối mọi người, gọi về tiếng cười và lưu giữ những kỷ niệm đáng nhớ."],
    ["Chăm sóc Tận tâm", "Mỗi hành trình đều bắt đầu từ một mong muốn khác nhau. LAKA luôn lắng nghe để chuẩn bị những tiện ích, chương trình và cách đón tiếp vừa vặn, giúp mỗi người đều cảm thấy được thấu hiểu và chăm sóc."]
  ],
  en: [
    ["Respect for Nature", "LAKA values the valley's untouched beauty and chooses to exist gently within nature. Every decision, from design and materials to activities, is considered to reduce environmental impact and preserve the landscape over time."],
    ["Restoration to Self", "A refuge in nature where every patch of green and framed view creates enough stillness for a busy mind to settle, breathe and return to its clearest state."],
    ["Genuine Connection", "Experiences in nature are created to bring people closer, call laughter back and hold space for memories worth keeping."],
    ["Attentive Care", "Every journey begins with a different wish. LAKA listens, then prepares the right amenities, programme and welcome so each guest feels understood and cared for."]
  ]
} as const;

export function TemplateAboutStory({ mood, locale = "vi" }: { mood: Mood; locale?: ShowcaseLocale }) {
  if (mood === "cinematic") return <section className="reveal-section mx-auto w-[min(1500px,calc(100%-40px))] py-20 sm:py-28"><div className="grid gap-0 border-y border-white/12 lg:grid-cols-[1.08fr_.92fr]"><div className="relative min-h-[620px] overflow-hidden"><Image src={conceptImages.detail2} alt="Câu chuyện LAKA - ảnh minh họa" fill sizes="(max-width:1024px) 100vw, 58vw" className="object-cover opacity-72 transition duration-1000 hover:scale-[1.02] hover:opacity-100" /><div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/20" /><span className="absolute bottom-5 left-5 bg-black/55 px-3 py-1.5 text-[.58rem] font-bold uppercase tracking-wider text-white backdrop-blur">Frame 01 · minh họa</span></div><div className="flex flex-col justify-center border-t border-white/12 px-7 py-14 lg:border-l lg:border-t-0 lg:px-12"><p className="text-[.62rem] font-bold uppercase tracking-[.24em] text-[#c7a882]">Manifesto · LAKA</p><blockquote className="mt-8 font-serif text-4xl font-medium leading-[1.14] tracking-[-.035em] sm:text-5xl">“{quote}”</blockquote><div className="mt-10 space-y-5 border-t border-white/12 pt-8 text-sm leading-7 text-white/52"><p>Mỗi căn được hình dung như một ngôi nhà thực sự: có bếp để nấu, hiên để ngồi và những khoảng trống vừa đủ để tâm trí được thảnh thơi.</p><p>LAKA ưu tiên sự riêng tư, vật liệu gần gũi và dịch vụ vừa đủ. Đội ngũ xuất hiện khi khách cần, rồi trả lại không gian cho kỳ nghỉ.</p></div></div></div><div className="grid border-b border-white/12 sm:grid-cols-3">{["Nhà nguyên căn", "Thiên nhiên thật gần", "Chăm sóc vừa đủ"].map((item, index) => <div key={item} className="border-b border-white/12 px-6 py-7 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"><span className="text-[.58rem] font-bold text-[#c7a882]">0{index + 1}</span><p className="mt-6 font-serif text-xl">{item}</p></div>)}</div></section>;

  if (mood === "organic") return <section className="reveal-section mx-auto w-[min(1380px,calc(100%-28px))] py-20 sm:py-28"><div className="grid gap-4 lg:grid-cols-12"><div className="relative min-h-[600px] overflow-hidden rounded-[44px] lg:col-span-7"><Image src={conceptImages.detail2} alt="Câu chuyện LAKA - ảnh minh họa" fill sizes="(max-width:1024px) 100vw, 58vw" className="object-cover transition duration-1000 hover:scale-[1.025]" /><span className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-[.6rem] font-extrabold uppercase tracking-wider">Câu chuyện bằng hình · minh họa</span></div><div className="flex min-h-[360px] flex-col justify-between rounded-[44px] bg-[#f7cf58] p-8 lg:col-span-5"><Sparkles className="h-8 w-8" /><blockquote className="mt-16 text-3xl font-extrabold leading-[1.16] tracking-[-.035em] sm:text-4xl">“{quote}”</blockquote></div><article className="rounded-[38px] bg-white p-8 shadow-[0_18px_55px_rgba(33,72,61,.07)] lg:col-span-5"><p className="text-[.6rem] font-extrabold uppercase tracking-[.14em] text-[#e66e4c]">Một ngôi nhà thực sự</p><p className="mt-6 text-sm font-medium leading-7 text-[#16311c]/78">Có bếp để nấu, hiên để ngồi và những khoảng trống vừa đủ để mọi người sống cùng nhau mà không thấy chật.</p></article><article className="rounded-[38px] bg-[#16311c] p-8 text-white lg:col-span-7"><p className="text-[.6rem] font-extrabold uppercase tracking-[.14em] text-[#f7cf58]">Dịch vụ vừa đủ tinh tế</p><p className="mt-6 max-w-2xl text-sm font-medium leading-7 text-white/58">Đội ngũ LAKA xuất hiện khi khách cần, rồi trả lại không gian cho cây, gió và những người đang ở cạnh nhau.</p></article></div></section>;

  const localizedQuote = locale === "en" ? "Choose a cabin. Hold the whole valley." : "“Chọn” Cabin, “Trọn” Thung Lũng";
  const chapters = locale === "en" ? [
    {
      kicker: "01 · The LAKA mark",
      title: "A symbol drawn from what appears beyond the window.",
      text: ["The LAKA logo is inspired by mountains, pine forest, cabins and a window frame.", "It is not an abstract symbol. It reflects the landscape guests will meet when they wake, draw the curtain and open the door: mountain ridges in cloud, pine trees moving in the wind and simple cabins reflected on the lake."],
      image: conceptImages.detail2
    },
    {
      kicker: "02 · The colours of the valley",
      title: "A palette gathered directly from nature.",
      text: ["LAKA's colours come from pine forest, tree-covered mountains and the natural lake.", "They carry a promise of sustainable, nature-aligned tourism and a lasting connection between people and the landscape."],
      image: conceptImages.forest
    },
    {
      kicker: "03 · Mission",
      title: "Preserve untouched beauty through every frame.",
      text: ["LAKA seeks to become a place where the truest connections can begin.", "Choose an open space. Hold every moment of connection."],
      image: conceptImages.table
    }
  ] : [
    {
      kicker: "01 · Dấu ấn LAKA",
      title: "Một biểu tượng được nhìn thấy qua khung cửa.",
      text: ["Logo của LAKA được lấy cảm hứng từ ngọn núi, rừng thông, cabin và khung cửa.", "Đó không chỉ là một biểu tượng được vẽ ra. Đó là khung cảnh bạn sẽ nhìn thấy khi thức dậy và mở cánh cửa: xa xa là những triền núi nối nhau trong mây, trước mắt là hàng thông xanh reo trong gió, bên dưới là những cabin mộc mạc phản chiếu trên mặt hồ."],
      image: conceptImages.detail2
    },
    {
      kicker: "02 · Màu của thung lũng",
      title: "Gam màu được gom nhặt từ chính thiên nhiên.",
      text: ["Là màu của rừng thông, của những dãy núi phủ kín cây và của hồ nước tự nhiên — món quà của tạo hóa.", "Hơn hết, đó là lời hứa về sự phát triển du lịch bền vững, thuận tự nhiên; về sự gắn kết bền chặt của con người và thiên nhiên."],
      image: conceptImages.forest
    },
    {
      kicker: "03 · Sứ mệnh",
      title: "Lưu giữ vẻ đẹp nguyên sơ qua từng khung kính.",
      text: ["Nơi khởi nguồn cho những kết nối chân thật nhất.", "LAKA — Chọn một không gian mở, Trọn phút giây gắn kết."],
      image: conceptImages.table
    }
  ];
  const localizedValues = brandValues[locale];

  const journalImages = [conceptImages.hero, conceptImages.hill, conceptImages.breakfast, conceptImages.cloud] as const;

  return (
    <section className="reveal-section py-20 sm:py-28">
      <div className="mx-auto grid w-[min(1260px,calc(100%-40px))] gap-12 border-b border-[#16311c]/15 pb-20 lg:grid-cols-[.4fr_1fr] lg:items-end">
        <p className="text-[.62rem] font-bold uppercase tracking-[.2em] text-[#80613f]">{locale === "en" ? "Preface" : "Lời tựa"}</p>
        <blockquote className="font-serif text-4xl font-medium leading-[1.12] tracking-[-.04em] sm:text-6xl">{localizedQuote}</blockquote>
      </div>

      <div className="mx-auto w-[min(1380px,calc(100%-40px))]">
        {chapters.map((chapter, index) => (
          <article key={chapter.kicker} className="grid border-b border-[#16311c]/15 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
            <div className={`group relative min-h-[58svh] overflow-hidden bg-[#d8cdbd] lg:min-h-[700px] ${index % 2 === 1 ? "lg:order-2" : ""}`}>
              <Image src={chapter.image} alt={`${chapter.title} — ${locale === "en" ? "concept image" : "hình ảnh minh họa"}`} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover transition duration-1000 ease-out group-hover:scale-[1.025]" />
              <span className="absolute bottom-4 left-4 bg-[#16311c]/72 px-3 py-1.5 text-[.52rem] font-bold uppercase tracking-wider text-white backdrop-blur">{locale === "en" ? "Concept image" : "Hình ảnh minh họa"}</span>
            </div>
            <div className={`py-10 lg:px-16 lg:py-12 xl:px-24 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
              <p className="text-[.62rem] font-bold uppercase tracking-[.2em] text-[#80613f]">{chapter.kicker}</p>
              <h2 className="mt-6 font-serif text-4xl font-medium leading-[1.02] tracking-[-.045em] sm:text-6xl">{chapter.title}</h2>
              <div className="mt-8 space-y-5 border-l border-[#80613f]/45 pl-6 text-sm leading-7 text-[#16311c]/68">
                {chapter.text.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mx-auto mt-24 w-[min(1260px,calc(100%-40px))] border-y border-[#16311c]/15 py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[.42fr_1fr] lg:items-end">
          <p className="text-[.62rem] font-bold uppercase tracking-[.2em] text-[#80613f]">{locale === "en" ? "04 · Core values" : "04 · Giá trị cốt lõi"}</p>
          <h2 className="font-serif text-4xl font-medium leading-[1.05] tracking-[-.04em] sm:text-6xl">{locale === "en" ? "Four promises that shape how LAKA grows." : "Bốn lời hứa định hình cách LAKA lớn lên."}</h2>
        </div>
        <div className="mt-14 grid border-t border-[#16311c]/15 md:grid-cols-2">
          {localizedValues.map(([title, text], index) => (
            <article key={title} className="border-b border-[#16311c]/15 py-9 md:px-8 md:[&:nth-child(odd)]:border-r lg:px-10">
              <span className="text-[.6rem] font-bold text-[#80613f]">0{index + 1}</span>
              <h3 className="mt-6 font-serif text-3xl font-medium tracking-[-.025em]">{title}</h3>
              <p className="mt-5 max-w-xl text-sm leading-7 text-[#16311c]/68">{text}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-16 grid w-[min(1420px,calc(100%-40px))] grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {journalImages.map((image, index) => (
          <figure key={image} className={`relative overflow-hidden bg-[#d8cdbd] ${index % 2 === 0 ? "aspect-[3/4]" : "aspect-[3/4] lg:mt-20"}`}>
            <Image src={image} alt={`${locale === "en" ? "LAKA visual journal" : "Ký sự hình ảnh LAKA"} ${index + 1} — ${locale === "en" ? "concept" : "minh họa"}`} fill sizes="(max-width:640px) 50vw, 25vw" className="object-cover" />
          </figure>
        ))}
      </div>
    </section>
  );
}

function ChannelContent({ icon: Icon, label, value }: { icon: typeof Phone; label: string; value: string }) {
  return <><Icon className="h-6 w-6" /><p className="mt-10 text-[.62rem] font-bold uppercase tracking-[.16em] text-[#16311c]/72">{label}</p><p className="mt-2 text-lg font-bold">{value}</p><ArrowRight aria-hidden="true" className="mt-7 h-5 w-5 opacity-35 transition group-hover:translate-x-1 group-hover:opacity-100" /></>;
}

export function TemplateContactChannels({ mood, locale = "vi" }: { mood: Mood; locale?: ShowcaseLocale }) {
  const localizedChannels = contactChannels.map((channel) => ({ ...channel, label: channel.label[locale] }));
  if (mood === "cinematic") return <section className="reveal-section mx-auto w-[min(1380px,calc(100%-40px))] py-20 sm:py-28"><div className="border-t border-white/12">{localizedChannels.map(({ icon, label, value, href }, index) => { const content = <div className="group grid items-center gap-5 border-b border-white/12 py-7 transition hover:bg-white/[.025] sm:grid-cols-[70px_1fr_auto]"><span className="text-[.6rem] font-bold text-[#c7a882]">0{index + 1}</span><div className="flex items-center gap-5">{(() => { const Icon = icon; return <Icon className="h-6 w-6 text-[#c7a882]" />; })()}<div><p className="text-[.58rem] font-bold uppercase tracking-[.2em] text-white/48">{label}</p><p className="mt-2 font-serif text-3xl font-medium sm:text-4xl">{value}</p></div></div><ArrowRight className="h-5 w-5 text-[#c7a882] transition group-hover:translate-x-1" /></div>; return href ? <a href={href} key={label}>{content}</a> : <div key={label}>{content}</div>; })}</div><div className="mt-10 flex items-center gap-3 text-xs text-white/48"><Instagram className="h-4 w-4 text-[#c7a882]" />{locale === "en" ? "Follow the visual journal at @lagohomestay" : "Theo dõi nhật ký hình ảnh tại @lagohomestay"}</div></section>;

  if (mood === "organic") {
    const colors = ["bg-white", "bg-[#f7cf58]", "bg-[#f18b68]", "bg-[#d9e5cf]"];
    return <section className="reveal-section mx-auto w-[min(1280px,calc(100%-28px))] py-20 sm:py-28"><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{localizedChannels.map(({ icon, label, value, href }, index) => { const Icon = icon; const content = <div className={`group min-h-[300px] rounded-[38px] p-7 shadow-[0_18px_55px_rgba(33,72,61,.08)] transition duration-500 hover:-translate-y-2 ${colors[index]} text-[#16311c]`}><span className="grid h-12 w-12 place-items-center rounded-full bg-[#16311c] text-white"><Icon className="h-5 w-5" /></span><p className="mt-14 text-[.6rem] font-extrabold uppercase tracking-[.14em] opacity-80">{label}</p><p className="mt-3 break-words text-xl font-extrabold">{value}</p><ArrowRight className="mt-8 h-5 w-5 transition group-hover:translate-x-1" /></div>; return href ? <a href={href} key={label}>{content}</a> : <div key={label}>{content}</div>; })}</div></section>;
  }

  return <section className="reveal-section mx-auto w-[min(1280px,calc(100%-40px))] py-20 sm:py-28"><div className="grid border-y border-[#16311c]/15 md:grid-cols-2 lg:grid-cols-4">{localizedChannels.map(({ icon, label, value, href }, index) => { const content = <div className={`group min-h-[300px] border-b border-[#16311c]/15 p-7 last:border-b-0 md:border-r md:[&:nth-child(2n)]:border-r-0 lg:border-b-0 lg:border-r lg:[&:nth-child(2n)]:border-r lg:last:border-r-0 ${index === 0 ? "rounded-t-[120px] pt-20" : "pt-12"}`}><ChannelContent icon={icon} label={label} value={value} /></div>; return href ? <a href={href} key={label}>{content}</a> : <div key={label}>{content}</div>; })}</div></section>;
}
