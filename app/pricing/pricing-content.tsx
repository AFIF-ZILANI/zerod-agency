"use client"
import { Check, X, MessageCircle } from "lucide-react"
import { wa } from "@/lib/constants"
import { useLanguage } from "@/lib/i18n"
import { SectionHeading } from "@/components/section-heading"

const YES = <Check className="mx-auto h-4 w-4 text-orange" />
const NO  = <X    className="mx-auto h-4 w-4 text-border"  />

const ROWS = [
  { label: "Pages",                starter: "5",           business: "10",        custom: "Unlimited"  },
  { label: "Mobile responsive",    starter: YES,           business: YES,         custom: YES          },
  { label: "WhatsApp integration", starter: YES,           business: YES,         custom: YES          },
  { label: "Contact form",         starter: YES,           business: YES,         custom: YES          },
  { label: "CMS",                  starter: NO,            business: YES,         custom: YES          },
  { label: "E-commerce",           starter: NO,            business: "Optional",  custom: YES          },
  { label: "Payment gateway",      starter: NO,            business: "Optional",  custom: YES          },
  { label: "SEO setup",            starter: "Basic",       business: "Full",      custom: "Advanced"   },
  { label: "Booking system",       starter: NO,            business: NO,          custom: YES          },
  { label: "Custom features",      starter: NO,            business: NO,          custom: YES          },
  { label: "Support",              starter: "1 month",     business: "3 months",  custom: "6 months"   },
  { label: "Delivery",             starter: "7 days",      business: "14 days",   custom: "21 days"    },
]

const PLANS = [
  { nameKey: "pricing.s.name", price: "৳15,000–25,000", ctaKey: "pricing.s.cta", hot: false },
  { nameKey: "pricing.b.name", price: "৳30,000–60,000", ctaKey: "pricing.b.cta", hot: true  },
  { nameKey: "pricing.c.name", price: "৳70,000+",        ctaKey: "pricing.c.cta", hot: false },
]

const FAQS = [
  { q: "কতদিনে website পাবো?",          a: "Starter 7 দিন, Business 14 দিন, Custom 21+ দিন। Simple project হলে আরো আগে।"                },
  { q: "কি কি দরকার হবে?",              a: "ব্যবসার নাম, ঠিকানা, ফোন, ছবি, এবং কী চান — বাকি কাজ আমাদের।"                              },
  { q: "Payment কিভাবে?",               a: "bKash, Nagad, বা bank transfer। 50% advance, 50% delivery-তে।"                              },
  { q: "Launch-এর পরে কি support আছে?", a: "হ্যাঁ! প্রতিটি package-এ support period আছে। যেকোনো সমস্যায় WhatsApp করুন।"               },
  { q: "Domain ও hosting লাগবে?",       a: "হ্যাঁ। আমরা সাহায্য করব সব সেটআপ করতে। খরচ package-এ include করা থাকে।"                    },
]

export function PricingContent() {
  const { t, fontClass, language } = useLanguage()
  return (
    <>
      {/* Comparison table */}
      <section className="bg-surface py-20 px-4">
        <div className="mx-auto max-w-6xl sm:px-6 lg:px-8">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr>
                  <th className="pb-8 text-left font-medium text-text-muted">Feature</th>
                  {PLANS.map((plan) => (
                    <th key={plan.nameKey} className="pb-8 text-center">
                      {plan.hot && (
                        <span lang={language} className={`${fontClass} mb-2 block rounded-full bg-orange px-3 py-0.5 text-xs font-bold text-white`}>
                          {t("pricing.popular")}
                        </span>
                      )}
                      <p lang={language} className={`${fontClass} block font-bold text-navy text-base`}>{t(plan.nameKey)}</p>
                      <p className="font-bold text-lg text-navy tabular-nums">{plan.price}</p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r, i) => (
                  <tr key={r.label} className={i % 2 === 0 ? "bg-white" : "bg-surface"}>
                    <td className="py-3 pl-3 font-medium text-text-primary rounded-l-lg">{r.label}</td>
                    {[r.starter, r.business, r.custom].map((v, j) => (
                      <td key={j} className="py-3 text-center text-text-primary">{v}</td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td />
                  {PLANS.map((plan, i) => (
                    <td key={i} className="pt-8 text-center">
                      <a
                        href={wa(t("wa.general"))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors ${
                          plan.hot
                            ? "bg-orange text-white hover:bg-orange-hover"
                            : "border border-navy text-navy hover:bg-navy hover:text-white"
                        }`}
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        <span lang={language} className={fontClass}>{t(plan.ctaKey)}</span>
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 px-4">
        <div className="mx-auto max-w-3xl sm:px-6">
          <SectionHeading textKey="pricing.faq_heading" className="mb-10" />
          <div className="flex flex-col gap-4">
            {FAQS.map((faq) => (
              <div key={faq.q} className="rounded-xl border border-border bg-surface p-6">
                <p lang="bn" className="font-bengali font-semibold text-navy">{faq.q}</p>
                <p lang="bn" className="font-bengali mt-2 text-sm text-text-muted leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
