"use client"
import { MessageCircle } from "lucide-react"
import { WA_GENERAL }    from "@/lib/constants"
import { useLanguage }   from "@/lib/i18n"

export function PortfolioCTA() {
  const { t, fontClass, language } = useLanguage()
  return (
    <section className="bg-navy py-16 text-center px-4">
      <h2 lang={language} className={`${fontClass} text-2xl font-bold text-white sm:text-3xl`}>
        {t("portfolio.cta.heading")}
      </h2>
      <a
        href={WA_GENERAL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-orange px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-hover"
      >
        <MessageCircle className="h-4 w-4" />
        <span lang={language} className={fontClass}>{t("portfolio.cta.button")}</span>
      </a>
    </section>
  )
}
