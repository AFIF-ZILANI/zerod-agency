import type { Metadata } from "next"
import { PageHero }       from "@/components/page-hero"
import { PricingContent } from "./pricing-content"

export const metadata: Metadata = {
  title:       "Website Pricing in Bangladesh — Transparent Packages",
  description: "Transparent website pricing for Bangladeshi businesses. Starter from ৳15,000 · Business from ৳30,000 · Custom from ৳70,000. All packages include mobile-responsive design and free domain consultation.",
  keywords:    ["website cost Bangladesh", "website price Bangladesh", "web design pricing Bangladesh", "how much website Bangladesh", "affordable web design Bangladesh"],
  alternates:  { canonical: "https://zerodagency.com/pricing" },
  openGraph:   { url: "https://zerodagency.com/pricing", title: "Website Pricing in Bangladesh — Transparent Packages | ZeroD Agency" },
}

export default function PricingPage() {
  return (
    <>
      <PageHero headingKey="pricing.page_heading" subtitleKey="pricing.page_subtitle" />
      <PricingContent />
    </>
  )
}
