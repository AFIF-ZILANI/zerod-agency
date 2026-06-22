"use client"
import { motion, type Variants } from "framer-motion"
import Link from "next/link"
import { MessageCircle, ArrowRight } from "lucide-react"
import { WA_GENERAL, TAGLINE_BN, TAGLINE_EN } from "@/lib/constants"

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy py-24 sm:py-32">
      {/* Subtle background grid pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Orange accent circle */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-orange/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          lang="bn"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="font-bengali text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl"
        >
          {TAGLINE_BN}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.15}
          className="mx-auto mt-6 max-w-2xl text-lg text-white/70"
        >
          {TAGLINE_EN}
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.3}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href={WA_GENERAL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-orange px-7 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:bg-orange-hover hover:shadow-orange/30 hover:shadow-xl"
          >
            <MessageCircle className="h-5 w-5" />
            WhatsApp করুন
          </a>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-7 py-3.5 text-base font-medium text-white transition-all hover:border-white/50 hover:bg-white/5"
          >
            আমাদের কাজ দেখুন
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
