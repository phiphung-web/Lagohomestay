import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";

const stayScenarios = {
  vi: [
    {
      label: "Một gia đình",
      title: "Một cuối tuần không cần nhìn đồng hồ",
      text: "Buổi sáng bắt đầu bên bàn ăn, trẻ nhỏ có khoảng vườn để khám phá và người lớn có một hiên nhà đủ yên để ngồi lại lâu hơn.",
      href: "nha-rung"
    },
    {
      label: "Hai người",
      title: "Hai ngày chỉ để nghe nhau rõ hơn",
      text: "Một căn nhà vừa đủ riêng, một bồn tắm nhìn ra tán cây và buổi tối không có lịch trình nào ngoài việc cùng nhau ở đó.",
      href: "nha-may"
    },
    {
      label: "Một nhóm bạn",
      title: "Gặp lại nhau trong một ngôi nhà trọn vẹn",
      text: "Cùng nấu một bữa tối, chia sẻ khoảng hiên rộng và để những câu chuyện cũ tự nhiên nối dài đến khi trời tối.",
      href: "lago-house"
    }
  ],
  en: [
    {
      label: "A family",
      title: "A weekend without watching the clock",
      text: "Morning begins around the table, children have a garden to explore, and the veranda gives everyone permission to stay a little longer.",
      href: "nha-rung"
    },
    {
      label: "Two people",
      title: "Two days to hear each other more clearly",
      text: "A home with just enough privacy, a bath facing the canopy, and no evening plan beyond being there together.",
      href: "nha-may"
    },
    {
      label: "A group of friends",
      title: "Meeting again inside a home of your own",
      text: "Cook one dinner together, share the wide veranda and let familiar stories keep unfolding after the light fades.",
      href: "lago-house"
    }
  ]
} as const;

export function HomeGuestStories({
  basePath = "",
  locale = "vi"
}: {
  basePath?: string;
  locale?: ShowcaseLocale;
}) {
  const en = locale === "en";
  const scenarios = stayScenarios[locale] ?? stayScenarios.vi;

  return (
    <section
      id="cam-nhan"
      className="scroll-mt-20 overflow-hidden bg-[#f2ece2] px-5 py-24 text-[#16311c] sm:px-8 sm:py-32"
      aria-labelledby="stay-scenarios-heading"
    >
      <div className="mx-auto w-[min(1380px,100%)]">
        <div className="grid gap-8 border-b border-[#16311c]/14 pb-10 lg:grid-cols-[.42fr_1fr] lg:items-end">
          <div>
            <p className="text-[.62rem] font-bold uppercase tracking-[.22em] text-[#6b4f31]">
              {en ? "Three ways to stay" : "Ba cách ở LAKA"}
            </p>
            <p className="mt-5 max-w-sm text-sm leading-7 text-[#16311c]/62">
              {en
                ? "Not reviews, but three ways to imagine how time at LAKA could become your own."
                : "Không phải lời đánh giá, mà là ba cách để hình dung thời gian ở LAKA có thể thuộc về bạn như thế nào."}
            </p>
          </div>
          <h2
            id="stay-scenarios-heading"
            className="max-w-5xl font-serif text-[clamp(3.2rem,7vw,6.8rem)] font-medium leading-[.92] tracking-[-.055em]"
          >
            {en ? (
              <>
                The same landscape.
                <br />
                <i>Three different rhythms.</i>
              </>
            ) : (
              <>
                Cùng một cảnh quan.
                <br />
                <i>Ba nhịp nghỉ khác nhau.</i>
              </>
            )}
          </h2>
        </div>

        <div className="divide-y divide-[#16311c]/14 border-b border-[#16311c]/14">
          {scenarios.map((scenario, index) => (
            <Link
              key={scenario.title}
              href={`${basePath}/luu-tru/${scenario.href}`}
              className="focus-ring group grid gap-5 py-9 sm:grid-cols-[100px_1fr_auto] sm:items-start sm:gap-8 sm:py-12"
            >
              <p className="text-[11px] font-bold uppercase tracking-[.17em] text-[#6b4f31]">
                {String(index + 1).padStart(2, "0")} · {scenario.label}
              </p>
              <div className="max-w-3xl">
                <h3 className="font-serif text-3xl font-medium leading-[1.08] tracking-[-.035em] sm:text-4xl">
                  {scenario.title}
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#16311c]/64">{scenario.text}</p>
              </div>
              <span className="grid h-11 w-11 place-items-center rounded-full border border-[#16311c]/18 transition duration-300 group-hover:rotate-45 group-hover:bg-[#16311c] group-hover:text-white">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-6 max-w-3xl text-[13px] leading-6 text-[#16311c]/72">
          {en
            ? "Illustrative stay scenarios, not verified guest reviews. They will be replaced or supplemented by authentic feedback after LAKA opens."
            : "Nội dung minh họa cách sử dụng, không phải đánh giá của khách. Sau khi LAKA vận hành, khu vực này sẽ chỉ sử dụng phản hồi thực tế đã được xác minh."}
        </p>
      </div>
    </section>
  );
}
