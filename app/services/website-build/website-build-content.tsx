"use client"
import { Check, MessageCircle } from "lucide-react"
import { WA_BUILD_NEW, WA_BUILD_FB, WA_BUILD_EXIST, waForBusiness } from "@/lib/constants"
import { useLanguage } from "@/lib/i18n"
import { SectionHeading } from "@/components/section-heading"

const SCENARIOS = [
  { bg: "bg-white",   labelBn: "নতুন ব্যবসা",        headlineBn: "নতুন ব্যবসা শুরু করছেন?",                       subtextBn: "আপনার idea কে আমরা পূর্ণ online store এ রূপ দেবো",               features: ["Full store setup", "Payment gateway (bKash / Nagad / ShurjoPay)", "Product catalog", "Mobile-first design", "Order management"],                   price: "৳50,000", waUrl: WA_BUILD_NEW  },
  { bg: "bg-surface", labelBn: "Facebook Seller",    headlineBn: "Facebook এ sell করেন? এবার নিজের website নিন", subtextBn: "আরো professional, আরো বিশ্বস্ত — আপনার brand আপনার নিজের",       features: ["Professional store", "Product migration", "bKash integration", "Order system", "Facebook / Instagram connection"],                             price: "৳35,000", waUrl: WA_BUILD_FB   },
  { bg: "bg-white",   labelBn: "Existing Ecommerce", headlineBn: "আপনার site এ visitor আসে কিন্তু buy করে না?",  subtextBn: "আমরা আপনার store কে conversion machine এ পরিণত করবো",           features: ["Speed optimization", "UX / conversion fix", "Payment upgrade", "Mobile experience", "Redesign option"],                                       price: "৳25,000", waUrl: WA_BUILD_EXIST },
]

const BIZ_TYPES = [
  { nameBn: "বিজনেস প্রোফাইল সাইট",    nameEn: "Business Profile Site",   type: "Business Profile Site"  },
  { nameBn: "অনলাইন শপ / ই-কমার্স",    nameEn: "Online Shop / E-commerce", type: "Online Shop"           },
  { nameBn: "ক্লিনিক ও স্বাস্থ্যসেবা", nameEn: "Clinic & Healthcare",     type: "Clinic & Healthcare"    },
  { nameBn: "কোচিং ও শিক্ষা",           nameEn: "Coaching & Education",    type: "Coaching & Education"   },
  { nameBn: "রেস্তোরাঁ ও খাবার",        nameEn: "Restaurant & Food",       type: "Restaurant & Food"      },
  { nameBn: "এনজিও / ফাউন্ডেশন",       nameEn: "NGO / Foundation",        type: "NGO / Foundation"       },
]

export function WebsiteBuildContent() {
  const { t, fontClass, language } = useLanguage()
  return (
    <>
      {SCENARIOS.map((s, i) => (
        <section key={i} className={`${s.bg} py-24 px-4`}>
          <div className="mx-auto max-w-6xl sm:px-6 lg:px-8">
            <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-16">
              <div className="flex-1">
                <span lang="bn" className="font-bengali inline-block rounded-full bg-orange/10 px-3 py-1 text-xs font-semibold text-orange">
                  {s.labelBn}
                </span>
                <h2 lang="bn" className="font-bengali mt-4 text-2xl font-bold text-navy sm:text-3xl">
                  {s.headlineBn}
                </h2>
                <p lang="bn" className="font-bengali mt-3 leading-7 text-text-muted">{s.subtextBn}</p>
                <ul className="mt-6 flex flex-col gap-2.5">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-text-primary">
                      <Check className="h-4 w-4 shrink-0 text-orange" />
                      {f}
                    </li>
                  ))}
                </ul>
                <p lang="bn" className="font-bengali mt-6 text-xl font-bold text-navy">
                  {t("build.from")} {s.price} থেকে
                </p>
                <a href={s.waUrl} target="_blank" rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-hover">
                  <MessageCircle className="h-4 w-4" />
                  <span lang={language} className={fontClass}>{t("build.wa")}</span>
                </a>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="flex aspect-video w-full max-w-sm items-center justify-center rounded-2xl border border-orange/10 bg-orange/5 text-6xl">
                  {i === 0 ? "🚀" : i === 1 ? "📱" : "⚡"}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="bg-surface py-24 px-4">
        <div className="mx-auto max-w-6xl sm:px-6 lg:px-8">
          <SectionHeading textKey="build.biz_heading" className="mb-10" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BIZ_TYPES.map((b) => (
              <a
                key={b.type}
                href={waForBusiness(b.type)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border border-border bg-white p-5 transition-all hover:border-orange/40 hover:shadow-md"
              >
                <div>
                  <p lang="bn" className="font-bengali font-semibold text-navy">{b.nameBn}</p>
                  <p className="text-xs text-text-muted">{b.nameEn}</p>
                </div>
                <MessageCircle className="h-5 w-5 text-text-muted transition-colors group-hover:text-orange" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
