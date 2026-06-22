import type { Metadata } from "next"
import { PageHero }      from "@/components/page-hero"
import { ServicesContent } from "./services-content"

export const metadata: Metadata = {
  title:       "Services",
  description: "Professional website services for Bangladeshi businesses — build, redesign, or maintain your online presence.",
}

export default function ServicesPage() {
  return (
    <>
      <PageHero headingKey="svcp.heading" subtitleKey="svcp.subtitle" />
      <ServicesContent />
    </>
  )
}
