import type { Metadata } from "next"
import Link from "next/link"
import { Globe, RefreshCw, Wrench, ArrowRight, MessageCircle } from "lucide-react"
import { WA_GENERAL } from "@/lib/constants"

export const metadata: Metadata = {
  title:       "Services",
  description: "Professional website services for Bangladeshi businesses — build, redesign, or maintain your online presence.",
}

const SERVICES = [
  {
    icon:      Globe,
    titleBn:   "ওয়েবসাইট বানান",
    titleEn:   "Build a Website",
    descBn:    "নতুন ব্যবসা হোক বা Facebook seller — আপনার জন্য সঠিক website solution আমাদের কাছে আছে।",
    href:      "/services/website-build",
    priceBn:   "৳25,000 থেকে শুরু",
  },
  {
    icon:      RefreshCw,
    titleBn:   "রিডিজাইন করুন",
    titleEn:   "Redesign",
    descBn:    "পুরনো বা slow website-কে modern, fast, এবং user-friendly করে তুলুন।",
    href:      "/services/redesign",
    priceBn:   "৳15,000 থেকে শুরু",
  },
  {
    icon:      Wrench,
    titleBn:   "রক্ষণাবেক্ষণ",
    titleEn:   "Maintenance",
    descBn:    "আপনার website সচল, secure, এবং আপডেট রাখার সম্পূর্ণ দায়িত্ব আমাদের।",
    href:      "/services/maintenance",
    priceBn:   "৳3,000/মাস থেকে",
  },
]

export default function ServicesPage() {
  return (
    <>
      <section className="bg-navy py-20 text-center px-4">
        <h1 lang="bn" className="font-bengali text-4xl font-bold text-white">আমাদের সেবাসমূহ</h1>
        <p className="mt-3 text-white/70">Our Services</p>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {SERVICES.map((s) => (
              <div key={s.href} className="rounded-xl border border-border bg-white p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange/10">
                  <s.icon className="h-7 w-7 text-orange" />
                </div>
                <p lang="bn" className="font-bengali mt-5 text-xl font-bold text-navy">{s.titleBn}</p>
                <p className="text-xs uppercase tracking-wider text-text-muted mt-0.5">{s.titleEn}</p>
                <p lang="bn" className="font-bengali mt-4 text-sm leading-relaxed text-text-muted">{s.descBn}</p>
                <p lang="bn" className="font-bengali mt-4 text-base font-bold text-orange">{s.priceBn}</p>
                <Link
                  href={s.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-navy hover:text-orange transition-colors"
                >
                  বিস্তারিত দেখুন <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-16 text-center px-4">
        <h2 lang="bn" className="font-bengali text-2xl font-bold text-white">কোন service লাগবে জানেন না?</h2>
        <p lang="bn" className="font-bengali mt-3 text-white/70">Free consultation-এর জন্য WhatsApp করুন</p>
        <a href={WA_GENERAL} target="_blank" rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-orange px-7 py-3 text-sm font-semibold text-white hover:bg-orange-hover transition-colors">
          <MessageCircle className="h-4 w-4" />
          <span lang="bn" className="font-bengali">WhatsApp করুন</span>
        </a>
      </section>
    </>
  )
}
