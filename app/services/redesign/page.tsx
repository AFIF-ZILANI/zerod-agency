import type { Metadata }   from "next"
import { PageHero }        from "@/components/page-hero"
import { RedesignContent } from "./redesign-content"

export const metadata: Metadata = {
  title:       "Website Redesign",
  description: "Transform your outdated website into a modern, fast, conversion-focused digital presence. Starting from ৳15,000.",
}

export default function RedesignPage() {
  return (
    <>
      <PageHero headingKey="redesign.heading" subtitleKey="redesign.subtitle" />
      <RedesignContent />
    </>
  )
}
