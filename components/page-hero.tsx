"use client"
import { useLanguage } from "@/lib/i18n"

interface PageHeroProps {
  headingKey:  string
  subtitleKey: string
  subtextKey?: string
}

export function PageHero({ headingKey, subtitleKey, subtextKey }: PageHeroProps) {
  const { t, fontClass, language } = useLanguage()
  return (
    <section className="bg-navy py-24 text-center px-4">
      <h1
        lang={language}
        className={`${fontClass} text-4xl font-bold text-white sm:text-5xl leading-tight`}
      >
        {t(headingKey)}
      </h1>
      <p lang={language} className={`${fontClass} mt-3 text-xs font-semibold uppercase tracking-widest text-white/50`}>
        {t(subtitleKey)}
      </p>
      {subtextKey && (
        <p
          lang={language}
          className={`${fontClass} mx-auto mt-4 max-w-lg text-sm text-white/50`}
        >
          {t(subtextKey)}
        </p>
      )}
    </section>
  )
}
