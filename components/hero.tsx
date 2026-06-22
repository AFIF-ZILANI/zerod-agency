"use client"
import { motion, type Variants, useReducedMotion } from "framer-motion"
import Link                  from "next/link"
import { MessageCircle, ArrowRight } from "lucide-react"
import { wa }                from "@/lib/constants"
import { useLanguage }       from "@/lib/i18n"

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

export function Hero() {
  const { t, fontClass, language } = useLanguage()
  const reduced = useReducedMotion()

  const motionProps = (delay: number) =>
    reduced
      ? {}
      : { variants: fadeUp, initial: "hidden", animate: "visible", custom: delay }

  return (
    <section className="relative overflow-hidden bg-navy py-32 sm:py-40">
      {/* Background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Orange blur — top right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-orange/10 blur-3xl"
      />
      {/* Orange blur — bottom left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 left-0 h-[400px] w-[400px] rounded-full bg-orange/6 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <motion.h1
          lang={language}
          {...motionProps(0)}
          className={`${fontClass} text-5xl font-bold leading-[1.15] text-white sm:text-6xl md:text-7xl`}
        >
          {t("hero.tagline")}
        </motion.h1>

        <motion.p
          {...motionProps(0.15)}
          className="mx-auto mt-6 max-w-2xl text-lg text-white/70"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.p
          {...motionProps(0.22)}
          className="mt-4 text-sm text-white/40 tracking-wide"
        >
          {t("hero.trust")}
        </motion.p>

        <motion.div
          {...motionProps(0.3)}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href={wa(t("wa.general"))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-orange px-7 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:bg-orange-hover hover:shadow-orange/30 hover:shadow-xl"
          >
            <MessageCircle className="h-5 w-5" />
            <span lang={language} className={fontClass}>{t("hero.cta_whatsapp")}</span>
          </a>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-7 py-3.5 text-base font-medium text-white transition-all hover:border-white/50 hover:bg-white/5"
          >
            <span lang={language} className={fontClass}>{t("hero.cta_portfolio")}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
