import type { Metadata }      from "next"
import { PageHero }           from "@/components/page-hero"
import { WebsiteBuildContent } from "./website-build-content"

export const metadata: Metadata = {
  title:       "Website Build",
  description: "Build a professional website for your Bangladeshi business. Ecommerce, business profile, and more — starting from ৳25,000.",
}

export default function WebsiteBuildPage() {
  return (
    <>
      <PageHero headingKey="build.heading" subtitleKey="build.subtitle" />
      <WebsiteBuildContent />
    </>
  )
}
