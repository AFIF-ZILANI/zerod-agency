"use client"
import { Check, MessageCircle } from "lucide-react"
import { WA_GENERAL }     from "@/lib/constants"
import { useLanguage }    from "@/lib/i18n"
import { SectionHeading } from "@/components/section-heading"

const TIERS = [
  {
    nameKey:    "pricing.s.name",
    taglineKey: "pricing.s.tagline",
    price:      "৳15,000 – ৳25,000",
    features:   ["5 পেজ পর্যন্ত", "Contact form", "Basic SEO setup", "Mobile responsive", "WhatsApp integration", "1 মাস support"],
    featured:   false,
    ctaKey:     "pricing.s.cta",
  },
  {
    nameKey:    "pricing.b.name",
    taglineKey: "pricing.b.tagline",
    price:      "৳30,000 – ৳60,000",
    features:   ["10 পেজ পর্যন্ত", "CMS integration", "WhatsApp order system", "Full SEO setup", "Google Analytics", "3 মাস support"],
    featured:   true,
    ctaKey:     "pricing.b.cta",
  },
  {
    nameKey:    "pricing.c.name",
    taglineKey: "pricing.c.tagline",
    price:      "৳70,000+",
    features:   ["Ecommerce + payment", "Booking system", "Custom features", "Advanced SEO", "Priority support", "6 মাস support"],
    featured:   false,
    ctaKey:     "pricing.c.cta",
  },
]

export function PricingSection() {
  const { t, fontClass, language } = useLanguage()
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading textKey="pricing.heading" className="mb-4" />
        <p
          lang={language}
          className={`${fontClass} mb-12 mt-4 text-center text-text-muted`}
        >
          {t("pricing.subtitle")}
        </p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.nameKey}
              className={`relative flex flex-col rounded-xl border p-7 ${
                tier.featured
                  ? "border-2 border-orange shadow-2xl shadow-orange/15"
                  : "border-border bg-surface"
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-orange to-orange-hover px-4 py-1 text-xs font-bold text-white">
                  {t("pricing.popular")}
                </div>
              )}
              <p lang={language} className={`${fontClass} text-lg font-bold text-navy`}>
                {t(tier.nameKey)}
              </p>
              <p lang={language} className={`${fontClass} mt-0.5 text-xs text-text-muted`}>
                {t(tier.taglineKey)}
              </p>
              <p className="mt-4 text-2xl font-bold tabular-nums text-navy">{tier.price}</p>
              <ul className="mt-6 flex flex-col gap-2.5">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-text-primary">
                    <Check className="h-4 w-4 shrink-0 text-orange" />
                    <span lang="bn" className="font-bengali">{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href={WA_GENERAL}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-all ${
                  tier.featured
                    ? "bg-orange text-white hover:bg-orange-hover"
                    : "border border-navy text-navy hover:bg-navy hover:text-white"
                }`}
              >
                <MessageCircle className="h-4 w-4" />
                <span lang={language} className={fontClass}>{t(tier.ctaKey)}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
