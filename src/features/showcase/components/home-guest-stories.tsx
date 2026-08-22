import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";

const feedbackGroups = [
  {
    title: { vi: "Khách Việt Nam", en: "Vietnamese guests" },
    text: {
      vi: "Không gian dành cho những phản hồi đã được xác minh từ khách Việt Nam.",
      en: "A dedicated space for verified feedback from Vietnamese guests."
    }
  },
  {
    title: { vi: "Khách nước ngoài", en: "International guests" },
    text: {
      vi: "Không gian dành cho những phản hồi đã được xác minh từ khách nước ngoài.",
      en: "A dedicated space for verified feedback from international guests."
    }
  }
] as const;

export function HomeGuestStories({ locale = "vi" }: { locale?: ShowcaseLocale }) {
  const en = locale === "en";

  return (
    <section id="feedback" className="scroll-mt-20 overflow-hidden bg-[#f2ece2] px-5 py-24 text-[#16311c] sm:px-8 sm:py-32" aria-labelledby="feedback-heading">
      <div className="mx-auto w-[min(1380px,100%)]">
        <header className="grid gap-8 border-b border-[#16311c]/14 pb-10 lg:grid-cols-[.42fr_1fr] lg:items-end">
          <div>
            <p className="text-[.62rem] font-bold uppercase tracking-[.22em] text-[#6b4f31]">Feedback</p>
            <p className="mt-5 max-w-sm text-[15px] leading-7 text-[#16311c]/68 sm:text-base sm:leading-8">
              {en ? "Guest stories, organised clearly by the journeys they made to LaKa." : "Những câu chuyện của khách được sắp xếp rõ ràng theo hành trình họ đến với LaKa."}
            </p>
          </div>
          <h2 id="feedback-heading" className="max-w-5xl font-serif text-[clamp(2.6rem,5.5vw,5.2rem)] font-medium leading-[.95] tracking-[-.045em]">
            {en ? <>Two points of view.<br /><i>One shared feeling.</i></> : <>Hai góc nhìn.<br /><i>Một cảm giác chung.</i></>}
          </h2>
        </header>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {feedbackGroups.map((group, groupIndex) => (
            <section key={group.title.vi} className="border border-[#16311c]/14 bg-[#eae1d2] p-6 sm:p-8">
              <div className="flex items-center justify-between gap-5 border-b border-[#16311c]/14 pb-6">
                <div>
                  <p className="text-[.58rem] font-bold tracking-[.16em] text-[#80613f]">0{groupIndex + 1}</p>
                  <h3 className="mt-3 font-serif text-[1.75rem] font-medium leading-tight sm:text-[2.25rem]">{group.title[locale]}</h3>
                </div>
                <span className="h-2.5 w-2.5 rounded-full bg-[#80613f]" aria-hidden="true" />
              </div>
              <p className="mt-6 max-w-xl text-[15px] leading-7 text-[#16311c]/68 sm:text-base sm:leading-8">{group.text[locale]}</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[1, 2].map((slot) => (
                  <div key={slot} className="grid min-h-44 place-items-center border border-dashed border-[#16311c]/24 p-6 text-center text-xs font-bold uppercase tracking-[.12em] text-[#16311c]/42">
                    {en ? `Feedback slot ${slot}` : `Vị trí feedback ${slot}`}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
