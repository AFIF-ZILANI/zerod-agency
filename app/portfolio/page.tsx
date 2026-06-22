import type { Metadata } from "next"
import { PortfolioGrid } from "./portfolio-grid"
import { PageHero }      from "@/components/page-hero"
import { PortfolioCTA }  from "./portfolio-cta"

export const metadata: Metadata = {
  title:       "Portfolio",
  description: "See our real client work — websites built for local Bangladeshi businesses across Naogaon and Rajshahi division.",
}

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        headingKey="portfolio.heading"
        subtitleKey="portfolio.subtitle"
        subtextKey="portfolio.placeholder"
      />
      <PortfolioGrid />
      <PortfolioCTA />
    </>
  )
}
