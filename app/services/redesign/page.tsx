import type { Metadata }   from "next"
import { PageHero }        from "@/components/page-hero"
import { RedesignContent } from "./redesign-content"

export const metadata: Metadata = {
  title:       "Website Redesign Service in Bangladesh",
  description: "Transform your outdated website into a modern, fast, and conversion-focused digital presence. ZeroD Agency offers professional website redesign for Bangladeshi businesses.",
  keywords:    ["website redesign Bangladesh", "modernize website Bangladesh", "web redesign Naogaon", "old website update Bangladesh"],
  alternates:  { canonical: "https://zerodagency.com/services/redesign" },
  openGraph:   { url: "https://zerodagency.com/services/redesign", title: "Website Redesign Service in Bangladesh | ZeroD Agency" },
}

export default function RedesignPage() {
  return (
    <>
      <PageHero headingKey="redesign.heading" subtitleKey="redesign.subtitle" />
      <RedesignContent />
    </>
  )
}
