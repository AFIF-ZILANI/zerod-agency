"use client"
import { useLanguage }    from "@/lib/i18n"
import { SectionHeading } from "@/components/section-heading"
import { motion, useReducedMotion } from "framer-motion"

const TESTIMONIALS = [
  { quote: "ZeroD Agency আমার restaurant-এর জন্য অসাধারণ website বানিয়েছে। Online order এখন অনেক বেড়ে গেছে।", name: "রাহেলা বেগম",  business: "রাহেলা'স কিচেন, নওগাঁ",          initial: "র" },
  { quote: "Facebook-এ বিক্রি করতাম, এখন নিজের website থেকে করি। Customer-রা আরো বিশ্বাস করে।",              name: "করিম ভাই",    business: "করিম ফ্যাশন হাউস, রাজশাহী",      initial: "ক" },
  { quote: "সময়মতো কাজ শেষ, দাম পরিষ্কার, support excellent। Highly recommended!",                         name: "আরিফ হোসেন", business: "আরিফ ট্রেডার্স, নওগাঁ",           initial: "আ" },
]

export function Testimonials() {
  const { language } = useLanguage()
  const reduced = useReducedMotion()

  const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }
  const item = reduced
    ? {}
    : { variants: { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } } }

  return (
    <section className="bg-surface-alt py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading textKey="testimonials.heading" className="mb-12" />
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {TESTIMONIALS.map((t) => (
            <motion.div
              key={t.name}
              {...item}
              className="relative overflow-hidden rounded-xl border border-border bg-white p-7"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-3 -left-1 font-serif text-8xl leading-none text-orange/8 select-none"
              >
                &ldquo;
              </span>
              <div className="relative">
                <div className="flex gap-0.5 text-orange" aria-label="5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-sm">★</span>
                  ))}
                </div>
                <p lang="bn" className="font-bengali mt-3 text-sm leading-7 text-text-primary">
                  {t.quote}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
                    <span lang="bn" className="font-bengali">{t.initial}</span>
                  </div>
                  <div>
                    <p lang="bn" className="font-bengali text-sm font-semibold text-navy">{t.name}</p>
                    <p lang="bn" className="font-bengali text-xs text-text-muted">{t.business}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
