import Link from "next/link"
import { Globe, RefreshCw, Wrench, ArrowRight } from "lucide-react"

const SERVICES = [
  {
    icon:     Globe,
    titleBn:  "ওয়েবসাইট বানান",
    titleEn:  "Build a Website",
    desc:     "আপনার business-এর জন্য professional website — ecommerce থেকে শুরু করে business profile পর্যন্ত।",
    href:     "/services/website-build",
  },
  {
    icon:     RefreshCw,
    titleBn:  "রিডিজাইন করুন",
    titleEn:  "Redesign",
    desc:     "পুরনো website-কে modern, fast, এবং conversion-friendly করে তুলুন।",
    href:     "/services/redesign",
  },
  {
    icon:     Wrench,
    titleBn:  "রক্ষণাবেক্ষণ",
    titleEn:  "Maintenance",
    desc:     "আপনার website সচল, secure, এবং up-to-date রাখার সম্পূর্ণ দায়িত্ব আমাদের।",
    href:     "/services/maintenance",
  },
]

export function ServiceCards() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold text-navy">আমাদের সেবা</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {SERVICES.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group flex flex-col gap-4 rounded-xl border border-border bg-white p-7 transition-all hover:-translate-y-1 hover:border-orange/40 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange/10">
                <s.icon className="h-6 w-6 text-orange" />
              </div>
              <div>
                <p lang="bn" className="font-bengali text-lg font-semibold text-navy">{s.titleBn}</p>
                <p className="text-xs uppercase tracking-wider text-text-muted">{s.titleEn}</p>
              </div>
              <p lang="bn" className="font-bengali text-sm leading-relaxed text-text-muted">{s.desc}</p>
              <span className="mt-auto flex items-center gap-1 text-sm font-medium text-orange group-hover:gap-2 transition-all">
                আরও জানুন <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
