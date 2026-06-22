import type { Metadata }      from "next"
import { PageHero }           from "@/components/page-hero"
import { WebsiteBuildContent } from "./website-build-content"

export const metadata: Metadata = {
  title:       "Build a Professional Website in Bangladesh — From ৳15,000",
  description: "Get a professional website built for your Bangladeshi business by ZeroD Agency. Ecommerce, business profile, landing pages — delivered in 7 days from ৳15,000.",
  keywords:    ["build website Bangladesh", "affordable website Bangladesh", "professional website Bangladesh", "ecommerce website Bangladesh", "website development Naogaon"],
  alternates:  { canonical: "https://zerodagency.com/services/website-build" },
  openGraph:   { url: "https://zerodagency.com/services/website-build", title: "Build a Professional Website in Bangladesh — From ৳15,000 | ZeroD Agency" },
}

export default function WebsiteBuildPage() {
  return (
    <>
      <PageHero headingKey="build.heading" subtitleKey="build.subtitle" />
      <WebsiteBuildContent />
    </>
  )
}
