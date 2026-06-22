import type { Metadata } from "next"
import { PortfolioGrid } from "./portfolio-grid"
import { PageHero }      from "@/components/page-hero"
import { PortfolioCTA }  from "./portfolio-cta"

export const metadata: Metadata = {
  title:       "Portfolio — Websites Built for Bangladeshi Businesses",
  description: "See real websites built by ZeroD Agency for Bangladeshi businesses across Naogaon and Rajshahi division. Ecommerce, business profiles, landing pages, and more.",
  keywords:    ["web design portfolio Bangladesh", "ZeroD Agency work", "website examples Bangladesh", "Naogaon web design"],
  alternates:  { canonical: "https://zerodagency.com/portfolio" },
  openGraph:   { url: "https://zerodagency.com/portfolio", title: "Portfolio — Websites Built for Bangladeshi Businesses | ZeroD Agency" },
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
