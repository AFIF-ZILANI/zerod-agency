import type { Metadata }     from "next"
import { PageHero }          from "@/components/page-hero"
import { MaintenanceContent } from "./maintenance-content"

export const metadata: Metadata = {
  title:       "Website Maintenance Service in Bangladesh",
  description: "Keep your website fast, secure, and up-to-date with ZeroD Agency's fully managed maintenance packages. Serving businesses across Bangladesh from ৳3,000/month.",
  keywords:    ["website maintenance Bangladesh", "website support Bangladesh", "managed website Bangladesh", "website upkeep Naogaon"],
  alternates:  { canonical: "https://zerodagency.com/services/maintenance" },
  openGraph:   { url: "https://zerodagency.com/services/maintenance", title: "Website Maintenance Service in Bangladesh | ZeroD Agency" },
}

export default function MaintenancePage() {
  return (
    <>
      <PageHero headingKey="maint.heading" subtitleKey="maint.subtitle" />
      <MaintenanceContent />
    </>
  )
}
