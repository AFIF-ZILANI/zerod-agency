"use client"
import Link from "next/link"
import { Globe, RefreshCw, Wrench, ArrowRight } from "lucide-react"
import { useLanguage }     from "@/lib/i18n"
import { SectionHeading } from "@/components/section-heading"
import { motion, useReducedMotion } from "framer-motion"

const SERVICES = [
  { icon: Globe,     titleKey: "services.build.title",    subKey: "services.build.sub",    descKey: "services.build.desc",    href: "/services/website-build" },
  { icon: RefreshCw, titleKey: "services.redesign.title", subKey: "services.redesign.sub", descKey: "services.redesign.desc", href: "/services/redesign"       },
  { icon: Wrench,    titleKey: "services.maint.title",    subKey: "services.maint.sub",    descKey: "services.maint.desc",    href: "/services/maintenance"    },
]

export function ServiceCards() {
  const { t, fontClass, language } = useLanguage()
  const reduced = useReducedMotion()

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  }
  const item = reduced
    ? {}
    : { variants: { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } } }

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading textKey="services.heading" className="mb-12" />
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {SERVICES.map((s) => (
            <motion.div key={s.href} {...item}>
              <Link
                href={s.href}
                className="group flex h-full flex-col gap-4 rounded-xl border border-slate-100 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-slate-200 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy/6">
                  <s.icon className="h-6 w-6 text-navy" />
                </div>
                <div>
                  <p lang={language} className={`${fontClass} text-lg font-semibold text-navy`}>
                    {t(s.titleKey)}
                  </p>
                  <p className="text-xs uppercase tracking-widest text-text-muted">
                    {t(s.subKey)}
                  </p>
                </div>
                <p lang={language} className={`${fontClass} text-sm leading-7 text-text-muted`}>
                  {t(s.descKey)}
                </p>
                <span className="mt-auto flex items-center gap-1 text-sm font-medium text-orange transition-all group-hover:gap-2">
                  <span lang={language} className={fontClass}>{t("services.read_more")}</span>
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
