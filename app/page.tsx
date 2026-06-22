import type { Metadata } from "next"
import { Hero }           from "@/components/hero"
import { ServiceCards }   from "@/components/service-cards"
import { Testimonials }   from "@/components/testimonials"
import { PricingSection } from "@/components/pricing-section"
import { HomeCTA }        from "@/components/home-cta"

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
      <HomeCTA />
    </>
  )
}
