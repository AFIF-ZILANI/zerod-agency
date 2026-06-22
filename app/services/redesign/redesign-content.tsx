"use client"
import { Check, MessageCircle } from "lucide-react"
import { wa }          from "@/lib/constants"
import { useLanguage } from "@/lib/i18n"

const WA_REDESIGN = wa("আমার website redesign করতে চাই।")

const FEATURES = [
  "Full visual redesign", "Mobile-first responsive layout",
  "Page speed optimization (Core Web Vitals)", "Modern UI/UX with conversion focus",
  "SEO structure improvement", "Content migration", "3 months post-launch support",
]

export function RedesignContent() {
  const { t, fontClass, language } = useLanguage()
  return (
    <section className="bg-white py-24 px-4">
      <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
        <h2 lang={language} className={`${fontClass} text-3xl font-bold text-navy sm:text-4xl`}>
          {t("redesign.h2")}
        </h2>
        <p lang="bn" className="font-bengali mt-4 text-lg leading-7 text-text-muted">
          Outdated design, slow loading, বা mobile-unfriendly? আমরা আপনার existing site-কে modern,
          fast, এবং conversion-focused করে তুলি — content হারিয়ে না গিয়ে।
        </p>

        <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <li key={f} className="flex items-center gap-3 text-sm text-text-primary">
              <Check className="h-4 w-4 shrink-0 text-orange" />
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-10 rounded-xl border border-orange/20 bg-orange/5 p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">Starting price</p>
          <p className="mt-1 text-3xl font-bold tabular-nums text-navy">৳15,000</p>
          <p className="mt-1 text-sm text-text-muted">Final price depends on site size and complexity</p>
        </div>

        <a
          href={WA_REDESIGN}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-orange px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-orange-hover"
        >
          <MessageCircle className="h-4 w-4" />
          <span lang={language} className={fontClass}>{t("redesign.cta")}</span>
        </a>
      </div>
    </section>
  )
}
