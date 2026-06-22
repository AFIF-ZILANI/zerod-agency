import type { Metadata } from "next"
import { Hero }           from "@/components/hero"
import { ServiceCards }   from "@/components/service-cards"
import { Testimonials }   from "@/components/testimonials"
import { PricingSection } from "@/components/pricing-section"
import { HomeCTA }        from "@/components/home-cta"

export const metadata: Metadata = {
  title:       "Best Website Building Agency in Bangladesh — ZeroD Agency",
  description: "ZeroD Agency builds professional websites for Bangladeshi businesses. Based in Naogaon, Bangladesh. Starting from ৳15,000 with 7-day delivery, transparent pricing, and ongoing support.",
  keywords:    ["best website agency Bangladesh", "website design Bangladesh", "web development Bangladesh", "website Naogaon", "ZeroD Agency"],
  alternates:  { canonical: "https://zerodagency.com" },
  openGraph:   { url: "https://zerodagency.com", title: "Best Website Building Agency in Bangladesh — ZeroD Agency" },
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
