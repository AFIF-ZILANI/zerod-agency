"use client"
import { MessageCircle } from "lucide-react"
import { wa }            from "@/lib/constants"
import { useLanguage }   from "@/lib/i18n"

export function HomeCTA() {
  const { t, fontClass, language } = useLanguage()
  return (
    <section className="bg-navy py-24 text-center px-4">
      <h2
        lang={language}
        className={`${fontClass} text-3xl font-bold text-white sm:text-4xl`}
      >
        {t("home.cta.heading")}
      </h2>
      <p
        lang={language}
        className={`${fontClass} mt-3 text-white/60`}
      >
        {t("home.cta.sub")}
      </p>
      <a
        href={wa(t("wa.general"))}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-orange px-8 py-4 text-base font-semibold text-white transition-all hover:bg-orange-hover"
      >
        <MessageCircle className="h-5 w-5" />
        <span lang={language} className={fontClass}>{t("home.cta.button")}</span>
      </a>
    </section>
  )
}
