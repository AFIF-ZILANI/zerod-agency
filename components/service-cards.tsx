"use client"
import Link from "next/link"
import { Globe, RefreshCw, Wrench, ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { SectionHeading } from "@/components/section-heading"

const SERVICES = [
  {
    icon:       Globe,
    titleKey:   "services.build.title",
    subKey:     "services.build.sub",
    descKey:    "services.build.desc",
    href:       "/services/website-build",
  },
  {
    icon:       RefreshCw,
    titleKey:   "services.redesign.title",
    subKey:     "services.redesign.sub",
    descKey:    "services.redesign.desc",
    href:       "/services/redesign",
  },
  {
    icon:       Wrench,
    titleKey:   "services.maint.title",
    subKey:     "services.maint.sub",
    descKey:    "services.maint.desc",
    href:       "/services/maintenance",
  },
]

export function ServiceCards() {
  const { t, fontClass, language } = useLanguage()
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading textKey="services.heading" className="mb-12" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {SERVICES.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group flex flex-col gap-4 rounded-xl border border-border bg-white p-7 transition-all hover:-translate-y-1 hover:border-orange/40 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange/10">
                <s.icon className="h-6 w-6 text-orange" />
              </div>
              <div>
                <p lang={language} className={`${fontClass} text-lg font-semibold text-navy`}>{t(s.titleKey)}</p>
                <p className="text-xs uppercase tracking-wider text-text-muted">{t(s.subKey)}</p>
              </div>
              <p lang={language} className={`${fontClass} text-sm leading-relaxed text-text-muted`}>{t(s.descKey)}</p>
              <span className="mt-auto flex items-center gap-1 text-sm font-medium text-orange group-hover:gap-2 transition-all">
                <span lang={language} className={fontClass}>{t("services.read_more")}</span>
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
