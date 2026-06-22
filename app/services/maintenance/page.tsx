import type { Metadata }     from "next"
import { PageHero }          from "@/components/page-hero"
import { MaintenanceContent } from "./maintenance-content"

export const metadata: Metadata = {
  title:       "Website Maintenance",
  description: "Keep your website fast, secure, and up-to-date with ZeroD Agency's maintenance packages. From ৳3,000/month.",
}

export default function MaintenancePage() {
  return (
    <>
      <PageHero headingKey="maint.heading" subtitleKey="maint.subtitle" />
      <MaintenanceContent />
    </>
  )
}
