import type { Metadata } from "next"
import { Hero }           from "@/components/hero"
import { ServiceCards }   from "@/components/service-cards"
import { Testimonials }   from "@/components/testimonials"
import { PricingSection } from "@/components/pricing-section"
import { MessageCircle }  from "lucide-react"
import { WA_GENERAL }     from "@/lib/constants"

export const metadata: Metadata = {
  title:       "ZeroD Agency — আপনার ব্যবসাকে অনলাইনে নিয়ে আসুন",
  description: "Professional websites for Bangladeshi businesses. Based in Naogaon, Bangladesh. Transparent pricing, ongoing support.",
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServiceCards />
      <Testimonials />
      <PricingSection />
      {/* Final CTA */}
      <section className="bg-navy py-20 text-center px-4">
        <h2 lang="bn" className="font-bengali text-3xl font-bold text-white sm:text-4xl">
          আজই শুরু করুন
        </h2>
        <p lang="bn" className="font-bengali mt-3 text-white/70">
          বিনামূল্যে পরামর্শের জন্য WhatsApp করুন
        </p>
        <a
          href={WA_GENERAL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-orange px-8 py-4 text-base font-semibold text-white transition-all hover:bg-[#EA6C0A]"
        >
          <MessageCircle className="h-5 w-5" />
          <span lang="bn" className="font-bengali">WhatsApp করুন</span>
        </a>
      </section>
    </>
  )
}
