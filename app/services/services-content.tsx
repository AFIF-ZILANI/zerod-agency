"use client"
import Link        from "next/link"
import { Globe, RefreshCw, Wrench, ArrowRight, MessageCircle } from "lucide-react"
import { wa } from "@/lib/constants"
import { useLanguage } from "@/lib/i18n"

const SERVICES = [
  { icon: Globe,     titleKey: "services.build.title",    subKey: "services.build.sub",    descKey: "services.build.desc",    priceBn: "৳25,000",     priceSuffix: "svcp.from", href: "/services/website-build" },
  { icon: RefreshCw, titleKey: "services.redesign.title", subKey: "services.redesign.sub", descKey: "services.redesign.desc", priceBn: "৳15,000",     priceSuffix: "svcp.from", href: "/services/redesign"       },
  { icon: Wrench,    titleKey: "services.maint.title",    subKey: "services.maint.sub",    descKey: "services.maint.desc",    priceBn: "৳3,000/মাস", priceSuffix: "svcp.from", href: "/services/maintenance"    },
]

export function ServicesContent() {
  const { t, fontClass, language } = useLanguage()
  return (
    <>
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {SERVICES.map((s) => (
              <div key={s.href} className="rounded-xl border border-slate-100 bg-white p-8 shadow-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-navy/6">
                  <s.icon className="h-7 w-7 text-navy" />
                </div>
                <p lang={language} className={`${fontClass} mt-5 text-xl font-bold text-navy`}>{t(s.titleKey)}</p>
                <p className="mt-0.5 text-xs uppercase tracking-widest text-text-muted">{t(s.subKey)}</p>
                <p lang={language} className={`${fontClass} mt-4 text-sm leading-7 text-text-muted`}>{t(s.descKey)}</p>
                <p lang={language} className={`${fontClass} mt-4 text-base font-bold text-orange`}>
                  {s.priceBn} {t(s.priceSuffix)}
                </p>
                <Link
                  href={s.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-navy transition-colors hover:text-orange"
                >
                  <span lang={language} className={fontClass}>{t("svcp.details")}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-16 text-center px-4">
        <h2 lang={language} className={`${fontClass} text-2xl font-bold text-white`}>{t("svcp.cta.heading")}</h2>
        <p lang={language} className={`${fontClass} mt-3 text-white/70`}>{t("svcp.cta.sub")}</p>
        <a
          href={wa(t("wa.general"))}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-orange px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-hover"
        >
          <MessageCircle className="h-4 w-4" />
          <span lang={language} className={fontClass}>{t("svcp.cta.button")}</span>
        </a>
      </section>
    </>
  )
}
