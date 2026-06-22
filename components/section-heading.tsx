"use client"
import { useLanguage } from "@/lib/i18n"

interface SectionHeadingProps {
  textKey:   string
  className?: string
}

export function SectionHeading({ textKey, className = "" }: SectionHeadingProps) {
  const { t, fontClass, language } = useLanguage()
  return (
    <div className={`text-center ${className}`}>
      <h2
        lang={language}
        className={`${fontClass} text-3xl font-bold text-navy sm:text-4xl`}
      >
        {t(textKey)}
      </h2>
      <div className="mx-auto mt-3 h-[3px] w-10 rounded-full bg-orange" />
    </div>
  )
}
