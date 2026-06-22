import type { Metadata } from "next"
import { PageHero }       from "@/components/page-hero"
import { PricingContent } from "./pricing-content"

export const metadata: Metadata = {
  title:       "Pricing",
  description: "Transparent website pricing for Bangladeshi businesses. Starter from ৳15,000. Business from ৳30,000. Custom from ৳70,000.",
}

export default function PricingPage() {
  return (
    <>
      <PageHero headingKey="pricing.page_heading" subtitleKey="pricing.page_subtitle" />
      <PricingContent />
    </>
  )
}
