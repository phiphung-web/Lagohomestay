export function PageHero({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <section className="bg-lago-cream py-20 sm:py-28"><div className="container-lago"><p className="eyebrow text-lago-clay">{eyebrow}</p><h1 className="display mt-4 max-w-4xl text-5xl font-semibold leading-[1.02] sm:text-7xl">{title}</h1><p className="mt-6 max-w-2xl text-base leading-7 text-lago-ink/65 sm:text-lg">{description}</p></div></section>;
}
