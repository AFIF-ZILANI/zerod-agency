import type { Metadata } from "next"
import { PageHero }      from "@/components/page-hero"
import { ServicesContent } from "./services-content"

export const metadata: Metadata = {
  title:       "Web Design & Development Services in Bangladesh",
  description: "ZeroD Agency offers professional web design, website building, redesign, and maintenance services for businesses across Bangladesh. Free consultation available.",
  keywords:    ["web development services Bangladesh", "website services Naogaon", "web design Bangladesh", "website agency services"],
  alternates:  { canonical: "https://zerodagency.com/services" },
  openGraph:   { url: "https://zerodagency.com/services", title: "Web Design & Development Services in Bangladesh | ZeroD Agency" },
}

export default function ServicesPage() {
  return (
    <>
      <PageHero headingKey="svcp.heading" subtitleKey="svcp.subtitle" />
      <ServicesContent />
    </>
  )
}
