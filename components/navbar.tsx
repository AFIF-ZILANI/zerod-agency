"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, MessageCircle } from "lucide-react"
import { WA_GENERAL }   from "@/lib/constants"
import { useLanguage }  from "@/lib/i18n"
import type { Language } from "@/lib/translations"

function LanguageToggle({ className = "" }: { className?: string }) {
  const { t, language, setLanguage } = useLanguage()
  const next: Language = language === "bn" ? "en" : "bn"
  return (
    <button
      onClick={() => setLanguage(next)}
      aria-label={t("nav.toggle_label")}
      className={`flex items-center rounded-full border border-border px-3 py-1 text-xs font-semibold text-text-primary transition-colors hover:border-navy hover:text-navy ${className}`}
    >
      <span className={language === "bn" ? "text-orange" : "text-text-muted"}>বাং</span>
      <span className="mx-1 text-text-muted/40">|</span>
      <span className={language === "en" ? "text-orange" : "text-text-muted"}>EN</span>
    </button>
  )
}

export function Navbar() {
  const [open,     setOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const NAV_LINKS = [
    { key: "nav.services",  href: "/services"  },
    { key: "nav.portfolio", href: "/portfolio" },
    { key: "nav.pricing",   href: "/pricing"   },
    { key: "nav.contact",   href: "/contact"   },
  ]

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? "bg-white/90 shadow-md backdrop-blur-md"
          : "border-b border-border bg-white"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 text-xl font-bold text-navy">
          Zero<span className="text-orange">D</span>
          <span className="ml-0.5 h-1.5 w-1.5 rounded-full bg-orange" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-text-primary transition-colors hover:text-orange"
            >
              {t(l.key)}
            </Link>
          ))}
        </nav>

        {/* Desktop right: toggle + WhatsApp */}
        <div className="hidden items-center gap-3 md:flex">
          <LanguageToggle />
          <a
            href={WA_GENERAL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            <MessageCircle className="h-4 w-4" />
            {t("nav.whatsapp")}
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-md text-navy md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-border bg-white md:hidden">
          <div className="px-4 pt-4 pb-2">
            <LanguageToggle className="w-full justify-center" />
          </div>
          <nav className="flex flex-col gap-1 px-4 pb-4">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-text-primary hover:bg-surface"
              >
                {t(l.key)}
              </Link>
            ))}
            <a
              href={WA_GENERAL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white"
            >
              <MessageCircle className="h-4 w-4" />
              {t("nav.whatsapp")}
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
