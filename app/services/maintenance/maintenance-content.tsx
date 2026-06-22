"use client"
import { Check, MessageCircle } from "lucide-react"
import { wa }          from "@/lib/constants"
import { useLanguage } from "@/lib/i18n"
import { SectionHeading } from "@/components/section-heading"

const WA_MAINTENANCE = wa("আমার website maintenance দরকার।")

const PLANS = [
  { name: "Basic",    price: "৳3,000/মাস", features: ["Monthly updates", "Security monitoring", "Uptime monitoring", "Email support"] },
  { name: "Standard", price: "৳5,000/মাস", features: ["Weekly updates", "Security + malware removal", "Speed optimization", "Priority support", "Monthly report"] },
  { name: "Premium",  price: "৳9,000/মাস", features: ["Unlimited updates", "Daily backups", "Performance tuning", "24/7 support", "Content updates included"] },
]

export function MaintenanceContent() {
  const { t, fontClass, language } = useLanguage()
  return (
    <section className="bg-surface py-24 px-4">
      <div className="mx-auto max-w-6xl sm:px-6 lg:px-8">
        <SectionHeading textKey="maint.h2" className="mb-4" />
        <p lang={language} className={`${fontClass} mb-12 text-center text-text-muted`}>
          {t("maint.sub")}
        </p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {PLANS.map((plan) => (
            <div key={plan.name} className="rounded-xl border border-slate-100 bg-white p-7 shadow-sm">
              <p className="text-lg font-bold text-navy">{plan.name}</p>
              <p className="mt-1 text-2xl font-bold tabular-nums text-orange">{plan.price}</p>
              <ul className="mt-5 flex flex-col gap-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-text-primary">
                    <Check className="h-4 w-4 shrink-0 text-orange" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={WA_MAINTENANCE}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-center gap-2 rounded-lg border border-navy py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
              >
                <MessageCircle className="h-4 w-4" />
                <span lang={language} className={fontClass}>{t("maint.start")}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
