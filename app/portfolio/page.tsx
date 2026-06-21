import type { Metadata } from "next"
import { PortfolioGrid } from "./portfolio-grid"

export const metadata: Metadata = {
  title:       "Portfolio",
  description: "See our real client work — websites built for local Bangladeshi businesses across Naogaon and Rajshahi division.",
}

export default function PortfolioPage() {
  return (
    <>
      <section className="bg-navy py-20 text-center px-4">
        <h1 lang="bn" className="font-bengali text-4xl font-bold text-white">আমাদের কাজ</h1>
        <p className="mt-3 text-white/70">Our Portfolio</p>
        <p lang="bn" className="font-bengali mt-4 text-white/60 text-sm max-w-lg mx-auto">
          Placeholder projects — real client screenshots আসছে শীঘ্রই
        </p>
      </section>
      <PortfolioGrid />
      <section className="bg-navy py-16 text-center px-4">
        <h2 lang="bn" className="font-bengali text-2xl font-bold text-white">
          আপনার জন্যও এমন একটি বানাই?
        </h2>
        <a
          href="https://wa.me/880XXXXXXXXXX?text=আমি%20আমার%20ব্যবসার%20জন্য%20website%20বানাতে%20চাই।"
          target="_blank" rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-orange px-7 py-3 text-sm font-semibold text-white hover:bg-orange-hover transition-colors"
        >
          WhatsApp করুন
        </a>
      </section>
    </>
  )
}
