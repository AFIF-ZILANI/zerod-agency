"use client"
import { useLanguage } from "@/lib/i18n"
import { SectionHeading } from "@/components/section-heading"

const TESTIMONIALS = [
  {
    quote:    "ZeroD Agency আমার restaurant-এর জন্য অসাধারণ website বানিয়েছে। Online order এখন অনেক বেড়ে গেছে।",
    name:     "রাহেলা বেগম",
    business: "রাহেলা'স কিচেন, নওগাঁ",
    initial:  "র",
  },
  {
    quote:    "Facebook-এ বিক্রি করতাম, এখন নিজের website থেকে করি। Customer-রা আরো বিশ্বাস করে।",
    name:     "করিম ভাই",
    business: "করিম ফ্যাশন হাউস, রাজশাহী",
    initial:  "ক",
  },
  {
    quote:    "সময়মতো কাজ শেষ, দাম পরিষ্কার, support excellent। Highly recommended!",
    name:     "আরিফ হোসেন",
    business: "আরিফ ট্রেডার্স, নওগাঁ",
    initial:  "আ",
  },
]

export function Testimonials() {
  const { t } = useLanguage()
  return (
    <section className="bg-surface py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading textKey="testimonials.heading" className="mb-12" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <div key={item.name} className="rounded-xl border border-border bg-white p-7">
              <p className="text-3xl text-orange leading-none">&ldquo;</p>
              <p lang="bn" className="font-bengali mt-3 text-sm leading-relaxed text-text-primary">
                {item.quote}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
                  <span lang="bn" className="font-bengali">{item.initial}</span>
                </div>
                <div>
                  <p lang="bn" className="font-bengali font-semibold text-navy text-sm">{item.name}</p>
                  <p lang="bn" className="font-bengali text-xs text-text-muted">{item.business}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
