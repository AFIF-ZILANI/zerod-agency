# ZeroD Agency Website v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Build a complete 9-page bilingual agency website for ZeroD Agency using Next.js 16 App Router, Tailwind v4, TypeScript strict mode, Framer Motion, and deploy-ready on Vercel.

**Architecture:** Next.js 16 App Router, Server Components by default, Client Components only where needed (Navbar mobile drawer, WhatsApp float, page transitions, contact form). Tailwind v4 — brand colors via CSS custom properties in `@theme inline`, not tailwind.config.ts (Tailwind v4 has no config file). Framer Motion for page transitions and subtle component animations.

**Tech Stack:** Next.js 16.2.9, React 19, Tailwind v4, TypeScript strict, Framer Motion, Hind Siliguri + Inter via next/font/google, lucide-react, nodemailer (contact form)

## Global Constraints

- Next.js 16 App Router — skim `node_modules/next/dist/docs/01-app/` before writing unfamiliar APIs
- Default to Server Components — `"use client"` only for useState/useEffect/browser events
- TypeScript strict mode — no `any`, no `// @ts-ignore`
- Tailwind v4 — no tailwind.config.ts; brand tokens go in `app/globals.css` under `@theme inline` and `:root`
- Brand colors EXACT: Primary `#0F172A` (navy), Accent `#F97316` (orange), Background `#FFFFFF`, Surface `#F8FAFC`, Text primary `#1E293B`, Text muted `#64748B`
- Bengali font: Hind Siliguri via `next/font/google`, variable `--font-bengali`
- English font: Inter via `next/font/google`, variable `--font-inter`
- WhatsApp number placeholder: `880XXXXXXXXXX` — WHATSAPP_URL = `https://wa.me/880XXXXXXXXXX`
- All WhatsApp CTAs open with pre-filled Bengali messages via `?text=` param (URL encoded)
- Mobile-first: every layout starts single-column, expands with `sm:` / `md:` / `lg:`
- No Lorem Ipsum — all copy is real Bengali/English as specified
- Bengali text: wrapped in element with `lang="bn"` attribute
- Package manager: `bun`
- Branch workflow: create `feat/<taskname>` branch → implement → verify `bun run build` → merge to main → delete branch
- Page transitions: Framer Motion `AnimatePresence` with subtle fade (opacity 0→1, y: 10→0, 0.3s)
- `bun run build` must pass before any merge

---

## File Map

```
lib/
  constants.ts              NEW — WHATSAPP_URL, site strings, pricing data

app/
  globals.css               MODIFY — brand CSS vars, @theme tokens, font vars
  layout.tsx                MODIFY — Inter+HindSiliguri fonts, metadata, providers
  page.tsx                  REPLACE — Homepage

  services/
    page.tsx                NEW — Services Overview
    website-build/
      page.tsx              NEW — Website Build detail (3 scenarios + business cards)
    redesign/
      page.tsx              NEW — Redesign service page
    maintenance/
      page.tsx              NEW — Maintenance service page

  portfolio/
    page.tsx                NEW — Portfolio showcase

  pricing/
    page.tsx                NEW — Full pricing tiers

  contact/
    page.tsx                NEW — Contact form

  api/
    contact/
      route.ts              NEW — POST handler (logs to console, ready for nodemailer)

components/
  navbar.tsx                NEW — sticky nav, mobile drawer, "use client"
  footer.tsx                NEW — full footer
  whatsapp-float.tsx        NEW — fixed pulse button, "use client"
  hero.tsx                  NEW — homepage hero with Framer Motion
  service-cards.tsx         NEW — 3 service cards with hover
  testimonials.tsx          NEW — 2-3 static testimonial cards
  pricing-section.tsx       NEW — 3-tier pricing section
  providers.tsx             NEW — Framer Motion AnimatePresence wrapper, "use client"
```

---

## Task 1: Foundation

**Branch:** `feat/foundation`

**Files:**
- Create: `lib/constants.ts`
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

**Interfaces:**
- Produces: `WHATSAPP_URL`, `WHATSAPP_MSG`, `wa` helper from `@/lib/constants`
- Produces: Tailwind utilities `bg-navy`, `bg-orange`, `text-navy`, `text-orange`, `bg-surface`, `text-muted`, `text-primary-text`, `font-bengali`, `font-inter`
- Produces: Root layout wrapping all pages with Inter font, Hind Siliguri font, metadata

**Dependencies:** none

- [ ] **Step 1: Create branch**
```bash
git checkout main && git pull
git checkout -b feat/foundation
```

- [ ] **Step 2: Install Framer Motion**
```bash
bun add framer-motion
```

- [ ] **Step 3: Create `lib/constants.ts`**
```ts
export const WHATSAPP_NUMBER = "880XXXXXXXXXX"
export const WHATSAPP_URL    = `https://wa.me/${WHATSAPP_NUMBER}`

export function wa(message: string): string {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`
}

export const WA_GENERAL     = wa("আমি ZeroD Agency-র সাথে কথা বলতে চাই।")
export const WA_BUILD_NEW   = wa("আমি নতুন ব্যবসার জন্য website বানাতে চাই।")
export const WA_BUILD_FB    = wa("আমি Facebook থেকে নিজের website নিতে চাই।")
export const WA_BUILD_EXIST = wa("আমার existing ecommerce site improve করতে চাই।")

export function waForBusiness(type: string): string {
  return wa(`আমি ${type} website সম্পর্কে জানতে চাই।`)
}

export const SITE_NAME    = "ZeroD Agency"
export const TAGLINE_BN   = "আপনার ব্যবসাকে অনলাইনে নিয়ে আসুন"
export const TAGLINE_EN   = "We build websites that work for Bangladeshi businesses"
export const EMAIL        = "hello@zerodagency.com"
export const PHONE        = "+880XXXXXXXXXX"
export const ADDRESS      = "Naogaon, Rajshahi Division, Bangladesh"
export const FACEBOOK_URL = "https://facebook.com/zerodagency"
```

- [ ] **Step 4: Update `app/globals.css`**

Replace the existing content with (preserve `@import "tailwindcss"` and `@import "tw-animate-css"` lines):

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  /* Brand colors */
  --color-navy:         #0F172A;
  --color-orange:       #F97316;
  --color-orange-hover: #EA6C0A;
  --color-surface:      #F8FAFC;
  --color-text-primary: #1E293B;
  --color-text-muted:   #64748B;
  --color-border:       #E2E8F0;

  /* Map shadcn tokens to brand */
  --color-background: #FFFFFF;
  --color-foreground: #1E293B;
  --color-primary:    #0F172A;
  --color-primary-foreground: #FFFFFF;
  --color-accent:     #F97316;
  --color-accent-foreground: #FFFFFF;
  --color-muted:      #F8FAFC;
  --color-muted-foreground: #64748B;
  --color-border:     #E2E8F0;
  --color-ring:       #F97316;

  /* Radius */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;

  /* Fonts */
  --font-inter:    var(--font-inter-var);
  --font-bengali:  var(--font-hind-siliguri);
  --font-sans:     var(--font-inter-var);
  --font-mono:     ui-monospace, monospace;
}

:root {
  --background: #FFFFFF;
  --foreground: #1E293B;
  --primary:    #0F172A;
  --primary-foreground: #FFFFFF;
  --secondary:  #F8FAFC;
  --secondary-foreground: #1E293B;
  --accent:     #F97316;
  --accent-foreground: #FFFFFF;
  --muted:      #F8FAFC;
  --muted-foreground: #64748B;
  --border:     #E2E8F0;
  --input:      #E2E8F0;
  --ring:       #F97316;
  --radius:     0.5rem;
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground font-sans;
  }
  html {
    scroll-behavior: smooth;
  }
}

@layer utilities {
  .font-bengali {
    font-family: var(--font-bengali), sans-serif;
  }
}
```

- [ ] **Step 5: Replace `app/layout.tsx`**
```tsx
import type { Metadata } from "next"
import { Inter, Hind_Siliguri } from "next/font/google"
import "./globals.css"
import { Navbar }        from "@/components/navbar"
import { Footer }        from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"

const inter = Inter({
  variable:  "--font-inter-var",
  subsets:   ["latin"],
  display:   "swap",
})

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets:  ["bengali"],
  weight:   ["400", "500", "600", "700"],
  display:  "swap",
})

export const metadata: Metadata = {
  title:       { default: "ZeroD Agency", template: "%s | ZeroD Agency" },
  description: "আপনার ব্যবসাকে অনলাইনে নিয়ে আসুন — Professional websites for Bangladeshi businesses. Based in Naogaon, Bangladesh.",
  keywords:    ["web development", "bangladesh", "naogaon", "website", "ecommerce", "ZeroD Agency"],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${hindSiliguri.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  )
}
```

- [ ] **Step 6: Create stub `components/navbar.tsx`** (full version in Task 2, stub needed for layout):
```tsx
export function Navbar() { return <nav /> }
```
Create stub `components/footer.tsx`:
```tsx
export function Footer() { return <footer /> }
```
Create stub `components/whatsapp-float.tsx`:
```tsx
export function WhatsAppFloat() { return null }
```

- [ ] **Step 7: Verify build**
```bash
bun run build
```
Expected: clean build, no TypeScript errors.

- [ ] **Step 8: Commit and merge**
```bash
git add -A
git commit -m "feat: project foundation — brand tokens, fonts, constants, layout"
git checkout main
git merge feat/foundation --no-ff -m "feat: project foundation"
git branch -d feat/foundation
```

---

## Task 2: Shared Components (Navbar, Footer, WhatsAppFloat)

**Branch:** `feat/shared-components`

**Files:**
- Replace: `components/navbar.tsx` (stub → full)
- Replace: `components/footer.tsx` (stub → full)
- Replace: `components/whatsapp-float.tsx` (stub → full)

**Interfaces:**
- Consumes: `WHATSAPP_URL`, `WA_GENERAL`, `SITE_NAME`, `TAGLINE_BN`, `EMAIL`, `PHONE`, `ADDRESS`, `FACEBOOK_URL` from `@/lib/constants`
- Produces: `<Navbar />` — sticky, mobile drawer, WhatsApp CTA button
- Produces: `<Footer />` — 3-column, dark navy bg
- Produces: `<WhatsAppFloat />` — fixed bottom-right, green, pulse animation

- [ ] **Step 1: Create branch**
```bash
git checkout main
git checkout -b feat/shared-components
```

- [ ] **Step 2: Replace `components/navbar.tsx`**
```tsx
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, MessageCircle } from "lucide-react"
import { WA_GENERAL, SITE_NAME } from "@/lib/constants"

const NAV_LINKS = [
  { label: "Services",  href: "/services"  },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing",   href: "/pricing"   },
  { label: "Contact",   href: "/contact"   },
]

export function Navbar() {
  const [open,     setOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white transition-shadow duration-200 ${
        scrolled ? "shadow-md" : "border-b border-border"
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
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href={WA_GENERAL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 md:flex"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>

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
          <nav className="flex flex-col gap-1 px-4 py-4">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-text-primary hover:bg-surface"
              >
                {l.label}
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
              WhatsApp করুন
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
```

- [ ] **Step 3: Replace `components/footer.tsx`**
```tsx
import Link from "next/link"
import { Facebook, Mail, Phone, MapPin } from "lucide-react"
import {
  SITE_NAME, TAGLINE_BN, EMAIL, PHONE, ADDRESS,
  FACEBOOK_URL, WA_GENERAL,
} from "@/lib/constants"

const SERVICE_LINKS = [
  { label: "Website Build",  href: "/services/website-build"  },
  { label: "Redesign",       href: "/services/redesign"       },
  { label: "Maintenance",    href: "/services/maintenance"    },
  { label: "All Services",   href: "/services"                },
]
const QUICK_LINKS = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing",   href: "/pricing"   },
  { label: "Contact",   href: "/contact"   },
]

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-1 text-xl font-bold">
              Zero<span className="text-orange">D</span>
              <span className="ml-0.5 h-1.5 w-1.5 rounded-full bg-orange" />
            </div>
            <p lang="bn" className="font-bengali mt-3 text-sm text-white/60 leading-relaxed">
              {TAGLINE_BN}
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">Services</h3>
            <ul className="flex flex-col gap-2">
              {SERVICE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/70 hover:text-orange transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">Quick Links</h3>
            <ul className="flex flex-col gap-2">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/70 hover:text-orange transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">Contact</h3>
            <ul className="flex flex-col gap-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                <a href={`tel:${PHONE}`} className="hover:text-white transition-colors">{PHONE}</a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                <a href={`mailto:${EMAIL}`} className="hover:text-white transition-colors">{EMAIL}</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                <span>{ADDRESS}</span>
              </li>
            </ul>
            <div className="mt-5 flex gap-3">
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-orange hover:text-white transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/30">
          © 2025 {SITE_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 4: Replace `components/whatsapp-float.tsx`**
```tsx
"use client"

import { MessageCircle } from "lucide-react"
import { WA_GENERAL } from "@/lib/constants"

export function WhatsAppFloat() {
  return (
    <a
      href={WA_GENERAL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg"
      style={{ animation: "whatsapp-pulse 2.5s ease-out infinite" }}
    >
      <MessageCircle className="h-7 w-7" />
      <style>{`
        @keyframes whatsapp-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(37,211,102,0.55); }
          70%  { box-shadow: 0 0 0 12px rgba(37,211,102,0); }
          100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); }
        }
      `}</style>
    </a>
  )
}
```

- [ ] **Step 5: Verify build**
```bash
bun run build
```
Expected: clean build. Start dev server visually:
```bash
bun run dev
```
Open `http://localhost:3000`. Verify: sticky navy-shadowed navbar, ZeroD logo with orange D and dot, mobile hamburger opens/closes, green WhatsApp float button pulses at bottom-right, dark footer visible.

- [ ] **Step 6: Commit and merge**
```bash
git add -A
git commit -m "feat: Navbar, Footer, WhatsAppFloat shared components"
git checkout main
git merge feat/shared-components --no-ff -m "feat: shared layout components"
git branch -d feat/shared-components
```

---

## Task 3: Homepage

**Branch:** `feat/homepage`

**Files:**
- Create: `components/hero.tsx`
- Create: `components/service-cards.tsx`
- Create: `components/testimonials.tsx`
- Create: `components/pricing-section.tsx`
- Create: `components/providers.tsx`
- Replace: `app/page.tsx`
- Modify: `app/layout.tsx` — wrap children with `<Providers>`

**Interfaces:**
- Consumes: `WA_GENERAL`, `TAGLINE_BN`, `TAGLINE_EN`, `wa` from `@/lib/constants`
- Produces: complete homepage with Hero, ServiceCards, Testimonials, PricingSection

- [ ] **Step 1: Create branch**
```bash
git checkout main
git checkout -b feat/homepage
```

- [ ] **Step 2: Create `components/providers.tsx`** (Framer Motion AnimatePresence):
```tsx
"use client"
import { AnimatePresence } from "framer-motion"

export function Providers({ children }: { children: React.ReactNode }) {
  return <AnimatePresence mode="wait">{children}</AnimatePresence>
}
```

- [ ] **Step 3: Create `components/hero.tsx`**
```tsx
"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { MessageCircle, ArrowRight } from "lucide-react"
import { WA_GENERAL, TAGLINE_BN, TAGLINE_EN } from "@/lib/constants"

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: (delay: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay, ease: "easeOut" },
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
```

- [ ] **Step 4: Create `components/service-cards.tsx`**
```tsx
import Link from "next/link"
import { Globe, RefreshCw, Wrench, ArrowRight } from "lucide-react"

const SERVICES = [
  {
    icon:     Globe,
    titleBn:  "ওয়েবসাইট বানান",
    titleEn:  "Build a Website",
    desc:     "আপনার business-এর জন্য professional website — ecommerce থেকে শুরু করে business profile পর্যন্ত।",
    href:     "/services/website-build",
  },
  {
    icon:     RefreshCw,
    titleBn:  "রিডিজাইন করুন",
    titleEn:  "Redesign",
    desc:     "পুরনো website-কে modern, fast, এবং conversion-friendly করে তুলুন।",
    href:     "/services/redesign",
  },
  {
    icon:     Wrench,
    titleBn:  "রক্ষণাবেক্ষণ",
    titleEn:  "Maintenance",
    desc:     "আপনার website সচল, secure, এবং up-to-date রাখার সম্পূর্ণ দায়িত্ব আমাদের।",
    href:     "/services/maintenance",
  },
]

export function ServiceCards() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold text-navy">আমাদের সেবা</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {SERVICES.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group flex flex-col gap-4 rounded-xl border border-border bg-white p-7 transition-all hover:-translate-y-1 hover:border-orange/40 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange/10">
                <s.icon className="h-6 w-6 text-orange" />
              </div>
              <div>
                <p lang="bn" className="font-bengali text-lg font-semibold text-navy">{s.titleBn}</p>
                <p className="text-xs uppercase tracking-wider text-text-muted">{s.titleEn}</p>
              </div>
              <p lang="bn" className="font-bengali text-sm leading-relaxed text-text-muted">{s.desc}</p>
              <span className="mt-auto flex items-center gap-1 text-sm font-medium text-orange group-hover:gap-2 transition-all">
                আরও জানুন <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Create `components/testimonials.tsx`**
```tsx
const TESTIMONIALS = [
  {
    quote:    "ZeroD Agency আমার restaurant-এর জন্য অসাধারণ website বানিয়েছে। Online order এখন অনেক বেড়ে গেছে।",
    name:     "রাহেলা বেগম",
    business: "রাহেলা'স কিচেন, নওগাঁ",
    initial:  "র",
  },
  {
    quote:    "Facebook-এ বিক্রি করতাম, এখন নিজের website থেকে করি। Customer-রা আরো বিশ্বাস করে।",
    name:     "করিম ভাই",
    business: "করিম ফ্যাশন হাউস, রাজশাহী",
    initial:  "ক",
  },
  {
    quote:    "সময়মতো কাজ শেষ, দাম পরিষ্কার, support excellent। Highly recommended!",
    name:     "আরিফ হোসেন",
    business: "আরিফ ট্রেডার্স, নওগাঁ",
    initial:  "আ",
  },
]

export function Testimonials() {
  return (
    <section className="bg-surface py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold text-navy">
          আমাদের client-রা যা বলেন
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="rounded-xl border border-border bg-white p-7">
              <p className="text-3xl text-orange leading-none">"</p>
              <p lang="bn" className="font-bengali mt-3 text-sm leading-relaxed text-text-primary">
                {t.quote}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
                  <span lang="bn" className="font-bengali">{t.initial}</span>
                </div>
                <div>
                  <p lang="bn" className="font-bengali font-semibold text-navy text-sm">{t.name}</p>
                  <p lang="bn" className="font-bengali text-xs text-text-muted">{t.business}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Create `components/pricing-section.tsx`**
```tsx
import { Check, MessageCircle } from "lucide-react"
import { WA_GENERAL } from "@/lib/constants"

const TIERS = [
  {
    nameEn:   "Starter",
    nameBn:   "স্টার্টার",
    price:    "৳15,000 – ৳25,000",
    tagline:  "শুরু করার জন্য সেরা",
    features: [
      "5 পেজ পর্যন্ত",
      "Contact form",
      "Basic SEO setup",
      "Mobile responsive",
      "WhatsApp integration",
      "1 মাস support",
    ],
    featured: false,
    cta:      "শুরু করুন",
  },
  {
    nameEn:   "Business",
    nameBn:   "বিজনেস",
    price:    "৳30,000 – ৳60,000",
    tagline:  "সবচেয়ে জনপ্রিয়",
    features: [
      "10 পেজ পর্যন্ত",
      "CMS integration",
      "WhatsApp order system",
      "Full SEO setup",
      "Google Analytics",
      "3 মাস support",
    ],
    featured: true,
    cta:      "আলোচনা করুন",
  },
  {
    nameEn:   "Custom",
    nameBn:   "কাস্টম",
    price:    "৳70,000+",
    tagline:  "সম্পূর্ণ সমাধান",
    features: [
      "Ecommerce + payment",
      "Booking system",
      "Custom features",
      "Advanced SEO",
      "Priority support",
      "6 মাস support",
    ],
    featured: false,
    cta:      "কথা বলুন",
  },
]

export function PricingSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-center text-3xl font-bold text-navy">প্যাকেজ ও মূল্য</h2>
        <p className="mb-12 text-center text-text-muted">
          সব প্যাকেজে mobile-responsive design এবং free domain consultation অন্তর্ভুক্ত।
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.nameEn}
              className={`relative flex flex-col rounded-xl border p-7 ${
                tier.featured
                  ? "border-2 border-orange shadow-xl shadow-orange/10"
                  : "border-border"
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-orange px-4 py-1 text-xs font-bold text-white">
                  সবচেয়ে জনপ্রিয়
                </div>
              )}
              <p lang="bn" className="font-bengali text-lg font-bold text-navy">{tier.nameBn}</p>
              <p lang="bn" className="font-bengali mt-0.5 text-xs text-text-muted">{tier.tagline}</p>
              <p className="mt-4 text-2xl font-bold text-navy">{tier.price}</p>
              <ul className="mt-6 flex flex-col gap-2.5">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-text-primary">
                    <Check className="h-4 w-4 shrink-0 text-orange" />
                    <span lang="bn" className="font-bengali">{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href={WA_GENERAL}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-all ${
                  tier.featured
                    ? "bg-orange text-white hover:bg-orange-hover"
                    : "border border-navy text-navy hover:bg-navy hover:text-white"
                }`}
              >
                <MessageCircle className="h-4 w-4" />
                <span lang="bn" className="font-bengali">{tier.cta}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 7: Replace `app/page.tsx`**
```tsx
import type { Metadata } from "next"
import { Hero }            from "@/components/hero"
import { ServiceCards }    from "@/components/service-cards"
import { Testimonials }    from "@/components/testimonials"
import { PricingSection }  from "@/components/pricing-section"
import { MessageCircle }   from "lucide-react"
import { WA_GENERAL }      from "@/lib/constants"

export const metadata: Metadata = {
  title:       "ZeroD Agency — আপনার ব্যবসাকে অনলাইনে নিয়ে আসুন",
  description: "Professional websites for Bangladeshi businesses. Based in Naogaon, Bangladesh. Transparent pricing, ongoing support.",
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServiceCards />
      <Testimonials />
      <PricingSection />
      {/* Final CTA */}
      <section className="bg-navy py-20 text-center px-4">
        <h2 lang="bn" className="font-bengali text-3xl font-bold text-white sm:text-4xl">
          আজই শুরু করুন
        </h2>
        <p lang="bn" className="font-bengali mt-3 text-white/70">
          বিনামূল্যে পরামর্শের জন্য WhatsApp করুন
        </p>
        <a
          href={WA_GENERAL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-orange px-8 py-4 text-base font-semibold text-white transition-all hover:bg-orange-hover"
        >
          <MessageCircle className="h-5 w-5" />
          <span lang="bn" className="font-bengali">WhatsApp করুন</span>
        </a>
      </section>
    </>
  )
}
```

- [ ] **Step 8: Verify build and visual check**
```bash
bun run build && bun run dev
```
Open `http://localhost:3000`. Verify at 375px width (mobile): Hero dark navy with grid pattern, Bengali headline renders, orange CTA button, 3 service cards stacked, 3 testimonial cards, 3 pricing tiers (Business highlighted in orange), CTA banner, footer.

- [ ] **Step 9: Commit and merge**
```bash
git add -A
git commit -m "feat: homepage — Hero, ServiceCards, Testimonials, PricingSection"
git checkout main
git merge feat/homepage --no-ff -m "feat: homepage complete"
git branch -d feat/homepage
```

---

## Task 4: Services Overview Page

**Branch:** `feat/services-overview`

**Files:**
- Create: `app/services/page.tsx`

- [ ] **Step 1: Create branch**
```bash
git checkout main
git checkout -b feat/services-overview
```

- [ ] **Step 2: Create `app/services/page.tsx`**
```tsx
import type { Metadata } from "next"
import Link from "next/link"
import { Globe, RefreshCw, Wrench, ArrowRight, MessageCircle } from "lucide-react"
import { WA_GENERAL } from "@/lib/constants"

export const metadata: Metadata = {
  title:       "Services",
  description: "Professional website services for Bangladeshi businesses — build, redesign, or maintain your online presence.",
}

const SERVICES = [
  {
    icon:      Globe,
    titleBn:   "ওয়েবসাইট বানান",
    titleEn:   "Build a Website",
    descBn:    "নতুন ব্যবসা হোক বা Facebook seller — আপনার জন্য সঠিক website solution আমাদের কাছে আছে।",
    href:      "/services/website-build",
    priceBn:   "৳25,000 থেকে শুরু",
  },
  {
    icon:      RefreshCw,
    titleBn:   "রিডিজাইন করুন",
    titleEn:   "Redesign",
    descBn:    "পুরনো বা slow website-কে modern, fast, এবং user-friendly করে তুলুন।",
    href:      "/services/redesign",
    priceBn:   "৳15,000 থেকে শুরু",
  },
  {
    icon:      Wrench,
    titleBn:   "রক্ষণাবেক্ষণ",
    titleEn:   "Maintenance",
    descBn:    "আপনার website সচল, secure, এবং আপডেট রাখার সম্পূর্ণ দায়িত্ব আমাদের।",
    href:      "/services/maintenance",
    priceBn:   "৳3,000/মাস থেকে",
  },
]

export default function ServicesPage() {
  return (
    <>
      <section className="bg-navy py-20 text-center px-4">
        <h1 lang="bn" className="font-bengali text-4xl font-bold text-white">আমাদের সেবাসমূহ</h1>
        <p className="mt-3 text-white/70">Our Services</p>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {SERVICES.map((s) => (
              <div key={s.href} className="rounded-xl border border-border bg-white p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange/10">
                  <s.icon className="h-7 w-7 text-orange" />
                </div>
                <p lang="bn" className="font-bengali mt-5 text-xl font-bold text-navy">{s.titleBn}</p>
                <p className="text-xs uppercase tracking-wider text-text-muted mt-0.5">{s.titleEn}</p>
                <p lang="bn" className="font-bengali mt-4 text-sm leading-relaxed text-text-muted">{s.descBn}</p>
                <p lang="bn" className="font-bengali mt-4 text-base font-bold text-orange">{s.priceBn}</p>
                <Link
                  href={s.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-navy hover:text-orange transition-colors"
                >
                  বিস্তারিত দেখুন <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-16 text-center px-4">
        <h2 lang="bn" className="font-bengali text-2xl font-bold text-white">কোন service লাগবে জানেন না?</h2>
        <p lang="bn" className="font-bengali mt-3 text-white/70">Free consultation-এর জন্য WhatsApp করুন</p>
        <a href={WA_GENERAL} target="_blank" rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-orange px-7 py-3 text-sm font-semibold text-white hover:bg-orange-hover transition-colors">
          <MessageCircle className="h-4 w-4" />
          <span lang="bn" className="font-bengali">WhatsApp করুন</span>
        </a>
      </section>
    </>
  )
}
```

- [ ] **Step 3: Build, verify, commit, merge**
```bash
bun run build
# open http://localhost:3000/services — verify 3 service cards, dark hero, CTA banner
git add -A
git commit -m "feat: Services Overview page"
git checkout main
git merge feat/services-overview --no-ff -m "feat: services overview page"
git branch -d feat/services-overview
```

---

## Task 5: Website Build Service Page

**Branch:** `feat/website-build-page`

**Files:**
- Create: `app/services/website-build/page.tsx`

**Key content — three scenarios exactly as spec:**
- Scenario 1 (নতুন ব্যবসা): price ৳50,000, `WA_BUILD_NEW`
- Scenario 2 (Facebook Seller): price ৳35,000, `WA_BUILD_FB`
- Scenario 3 (Existing Ecommerce): price ৳25,000, `WA_BUILD_EXIST`
- 6 business type cards: Business Profile, Online Shop, Clinic & Healthcare, Coaching & Education, Restaurant & Food, NGO / Foundation
- Each business card's WhatsApp pre-fills: `waForBusiness("<type>")`

- [ ] **Step 1: Create branch**
```bash
git checkout main
git checkout -b feat/website-build-page
```

- [ ] **Step 2: Create `app/services/website-build/page.tsx`**

```tsx
import type { Metadata } from "next"
import { Check, MessageCircle } from "lucide-react"
import { WA_BUILD_NEW, WA_BUILD_FB, WA_BUILD_EXIST, waForBusiness } from "@/lib/constants"

export const metadata: Metadata = {
  title:       "Website Build",
  description: "Build a professional website for your Bangladeshi business. Ecommerce, business profile, and more — starting from ৳25,000.",
}

const SCENARIOS = [
  {
    bg:          "bg-white",
    labelBn:     "নতুন ব্যবসা",
    headlineBn:  "নতুন ব্যবসা শুরু করছেন?",
    subtextBn:   "আপনার idea কে আমরা পূর্ণ online store এ রূপ দেবো",
    features:    [
      "Full store setup",
      "Payment gateway (bKash / Nagad / ShurjoPay)",
      "Product catalog",
      "Mobile-first design",
      "Order management",
    ],
    price:       "৳50,000",
    waUrl:       WA_BUILD_NEW,
  },
  {
    bg:          "bg-surface",
    labelBn:     "Facebook Seller",
    headlineBn:  "Facebook এ sell করেন? এবার নিজের website নিন",
    subtextBn:   "আরো professional, আরো বিশ্বস্ত — আপনার brand আপনার নিজের",
    features:    [
      "Professional store",
      "Product migration",
      "bKash integration",
      "Order system",
      "Facebook / Instagram connection",
    ],
    price:       "৳35,000",
    waUrl:       WA_BUILD_FB,
  },
  {
    bg:          "bg-white",
    labelBn:     "Existing Ecommerce",
    headlineBn:  "আপনার site এ visitor আসে কিন্তু buy করে না?",
    subtextBn:   "আমরা আপনার store কে conversion machine এ পরিণত করবো",
    features:    [
      "Speed optimization",
      "UX / conversion fix",
      "Payment upgrade",
      "Mobile experience",
      "Redesign option",
    ],
    price:       "৳25,000",
    waUrl:       WA_BUILD_EXIST,
  },
]

const BIZ_TYPES = [
  { nameBn: "বিজনেস প্রোফাইল সাইট",    nameEn: "Business Profile Site",  type: "Business Profile Site"  },
  { nameBn: "অনলাইন শপ / ই-কমার্স",    nameEn: "Online Shop / E-commerce", type: "Online Shop"           },
  { nameBn: "ক্লিনিক ও স্বাস্থ্যসেবা", nameEn: "Clinic & Healthcare",    type: "Clinic & Healthcare"    },
  { nameBn: "কোচিং ও শিক্ষা",           nameEn: "Coaching & Education",   type: "Coaching & Education"   },
  { nameBn: "রেস্তোরাঁ ও খাবার",        nameEn: "Restaurant & Food",      type: "Restaurant & Food"      },
  { nameBn: "এনজিও / ফাউন্ডেশন",       nameEn: "NGO / Foundation",       type: "NGO / Foundation"       },
]

export default function WebsiteBuildPage() {
  return (
    <>
      <section className="bg-navy py-20 text-center px-4">
        <h1 lang="bn" className="font-bengali text-4xl font-bold text-white">ওয়েবসাইট বানান</h1>
        <p className="mt-3 text-white/70">Build a Website</p>
      </section>

      {/* Three scenario sections */}
      {SCENARIOS.map((s, i) => (
        <section key={i} className={`${s.bg} py-20 px-4`}>
          <div className="mx-auto max-w-6xl sm:px-6 lg:px-8">
            <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-16">
              <div className="flex-1">
                <span lang="bn" className="font-bengali inline-block rounded-full bg-orange/10 px-3 py-1 text-xs font-semibold text-orange">
                  {s.labelBn}
                </span>
                <h2 lang="bn" className="font-bengali mt-4 text-2xl font-bold text-navy sm:text-3xl">
                  {s.headlineBn}
                </h2>
                <p lang="bn" className="font-bengali mt-3 text-text-muted leading-relaxed">
                  {s.subtextBn}
                </p>
                <ul className="mt-6 flex flex-col gap-2.5">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-text-primary">
                      <Check className="h-4 w-4 shrink-0 text-orange" />
                      {f}
                    </li>
                  ))}
                </ul>
                <p lang="bn" className="font-bengali mt-6 text-xl font-bold text-navy">
                  শুরু {s.price} থেকে
                </p>
                <a
                  href={s.waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-orange px-6 py-3 text-sm font-semibold text-white hover:bg-orange-hover transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span lang="bn" className="font-bengali">WhatsApp করুন</span>
                </a>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="h-52 w-full max-w-sm rounded-2xl bg-orange/5 border border-orange/10 flex items-center justify-center text-6xl">
                  {i === 0 ? "🚀" : i === 1 ? "📱" : "⚡"}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Business type cards */}
      <section className="bg-surface py-20 px-4">
        <div className="mx-auto max-w-6xl sm:px-6 lg:px-8">
          <h2 lang="bn" className="font-bengali mb-10 text-center text-2xl font-bold text-navy">
            আপনার ব্যবসার ধরন বেছে নিন
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BIZ_TYPES.map((b) => (
              <a
                key={b.type}
                href={waForBusiness(b.type)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-border bg-white p-5 transition-all hover:border-orange/40 hover:shadow-md group"
              >
                <div>
                  <p lang="bn" className="font-bengali font-semibold text-navy">{b.nameBn}</p>
                  <p className="text-xs text-text-muted">{b.nameEn}</p>
                </div>
                <MessageCircle className="h-5 w-5 text-text-muted group-hover:text-orange transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 3: Build, verify, commit, merge**
```bash
bun run build
# Verify /services/website-build — 3 alternating scenarios, 6 business type cards
git add -A
git commit -m "feat: Website Build service page with 3 scenarios and business type cards"
git checkout main
git merge feat/website-build-page --no-ff -m "feat: website build service page"
git branch -d feat/website-build-page
```

---

## Task 6: Redesign + Maintenance Pages

**Branch:** `feat/service-detail-pages`

**Files:**
- Create: `app/services/redesign/page.tsx`
- Create: `app/services/maintenance/page.tsx`

- [ ] **Step 1: Create branch**
```bash
git checkout main
git checkout -b feat/service-detail-pages
```

- [ ] **Step 2: Create `app/services/redesign/page.tsx`**
```tsx
import type { Metadata } from "next"
import { Check, MessageCircle } from "lucide-react"
import { wa } from "@/lib/constants"

export const metadata: Metadata = {
  title:       "Website Redesign",
  description: "Transform your outdated website into a modern, fast, conversion-focused digital presence. Starting from ৳15,000.",
}

const FEATURES = [
  "Full visual redesign",
  "Mobile-first responsive layout",
  "Page speed optimization (Core Web Vitals)",
  "Modern UI/UX with conversion focus",
  "SEO structure improvement",
  "Content migration",
  "3 months post-launch support",
]

const WA_REDESIGN = wa("আমার website redesign করতে চাই।")

export default function RedesignPage() {
  return (
    <>
      <section className="bg-navy py-20 text-center px-4">
        <h1 lang="bn" className="font-bengali text-4xl font-bold text-white">ওয়েবসাইট রিডিজাইন</h1>
        <p className="mt-3 text-white/70">Website Redesign</p>
      </section>

      <section className="bg-white py-20 px-4">
        <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
          <h2 lang="bn" className="font-bengali text-3xl font-bold text-navy">
            পুরনো website-কে নতুন জীবন দিন
          </h2>
          <p lang="bn" className="font-bengali mt-4 text-lg text-text-muted leading-relaxed">
            Outdated design, slow loading, বা mobile-unfriendly? আমরা আপনার existing site-কে modern,
            fast, এবং conversion-focused করে তুলি — content হারিয়ে না গিয়ে।
          </p>

          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm text-text-primary">
                <Check className="h-4 w-4 shrink-0 text-orange" />
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-xl border border-orange/20 bg-orange/5 p-6">
            <p className="text-sm font-semibold text-text-muted uppercase tracking-wider">Starting price</p>
            <p className="mt-1 text-3xl font-bold text-navy">৳15,000</p>
            <p className="mt-1 text-sm text-text-muted">Final price depends on site size and complexity</p>
          </div>

          <a
            href={WA_REDESIGN}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-orange px-7 py-3.5 text-sm font-semibold text-white hover:bg-orange-hover transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            <span lang="bn" className="font-bengali">Redesign নিয়ে আলোচনা করুন</span>
          </a>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 3: Create `app/services/maintenance/page.tsx`**
```tsx
import type { Metadata } from "next"
import { Check, MessageCircle } from "lucide-react"
import { wa } from "@/lib/constants"

export const metadata: Metadata = {
  title:       "Website Maintenance",
  description: "Keep your website fast, secure, and up-to-date with ZeroD Agency's maintenance packages. From ৳3,000/month.",
}

const PLANS = [
  {
    name:     "Basic",
    price:    "৳3,000/মাস",
    features: ["Monthly updates", "Security monitoring", "Uptime monitoring", "Email support"],
  },
  {
    name:     "Standard",
    price:    "৳5,000/মাস",
    features: ["Weekly updates", "Security + malware removal", "Speed optimization", "Priority support", "Monthly report"],
  },
  {
    name:     "Premium",
    price:    "৳9,000/মাস",
    features: ["Unlimited updates", "Daily backups", "Performance tuning", "24/7 support", "Content updates included"],
  },
]

const WA_MAINTENANCE = wa("আমার website maintenance দরকার।")

export default function MaintenancePage() {
  return (
    <>
      <section className="bg-navy py-20 text-center px-4">
        <h1 lang="bn" className="font-bengali text-4xl font-bold text-white">ওয়েবসাইট রক্ষণাবেক্ষণ</h1>
        <p className="mt-3 text-white/70">Website Maintenance</p>
      </section>

      <section className="bg-surface py-20 px-4">
        <div className="mx-auto max-w-6xl sm:px-6 lg:px-8">
          <h2 lang="bn" className="font-bengali mb-4 text-center text-3xl font-bold text-navy">
            চিন্তামুক্ত থাকুন — আমরা সামলাবো
          </h2>
          <p lang="bn" className="font-bengali mb-12 text-center text-text-muted">
            আপনি ব্যবসায় মনোযোগ দিন, website-এর দায়িত্ব আমাদের
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {PLANS.map((plan) => (
              <div key={plan.name} className="rounded-xl border border-border bg-white p-7">
                <p className="text-lg font-bold text-navy">{plan.name}</p>
                <p className="mt-1 text-2xl font-bold text-orange">{plan.price}</p>
                <ul className="mt-5 flex flex-col gap-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-text-primary">
                      <Check className="h-4 w-4 shrink-0 text-orange" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={WA_MAINTENANCE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-center justify-center gap-2 rounded-lg border border-navy py-2.5 text-sm font-semibold text-navy hover:bg-navy hover:text-white transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span lang="bn" className="font-bengali">শুরু করুন</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 4: Build, verify, commit, merge**
```bash
bun run build
# Verify /services/redesign and /services/maintenance
git add -A
git commit -m "feat: Redesign and Maintenance service pages"
git checkout main
git merge feat/service-detail-pages --no-ff -m "feat: redesign and maintenance pages"
git branch -d feat/service-detail-pages
```

---

## Task 7: Portfolio Page

**Branch:** `feat/portfolio`

**Files:**
- Create: `app/portfolio/page.tsx`
- Create: `app/portfolio/portfolio-grid.tsx` ("use client" for filter)

- [ ] **Step 1: Create branch and implement**
```bash
git checkout main
git checkout -b feat/portfolio
```

`app/portfolio/page.tsx`:
```tsx
import type { Metadata } from "next"
import { CTASection }   from "@/components/cta-section"
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
```

`app/portfolio/portfolio-grid.tsx`:
```tsx
"use client"
import { useState } from "react"
import { Badge }    from "@/components/ui/badge"

const CATS = ["All", "E-commerce", "Healthcare", "Business", "Education", "Restaurant"]
const PROJECTS = [
  { nameBn: "নওগাঁ রেস্তোরাঁ",                descBn: "Restaurant menu + online order site",     cat: "Restaurant", icon: "🍽️", bg: "bg-orange-50"  },
  { nameBn: "ডাক্তার চেম্বার অ্যাপয়েন্টমেন্ট", descBn: "Appointment booking for clinic",          cat: "Healthcare", icon: "🏥", bg: "bg-blue-50"   },
  { nameBn: "ফ্যাশন শপ",                       descBn: "Online fashion store with bKash",          cat: "E-commerce", icon: "👗", bg: "bg-purple-50" },
  { nameBn: "কোচিং সেন্টার",                   descBn: "Course info + online admission",           cat: "Education",  icon: "📚", bg: "bg-green-50"  },
  { nameBn: "গ্রোসারি মার্ট",                  descBn: "Online grocery with WhatsApp orders",      cat: "E-commerce", icon: "🛒", bg: "bg-yellow-50" },
  { nameBn: "ল' ফার্ম",                         descBn: "Professional legal services website",     cat: "Business",   icon: "⚖️", bg: "bg-slate-50"  },
]

export function PortfolioGrid() {
  const [active, setActive] = useState("All")
  const filtered = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.cat === active)
  return (
    <section className="bg-surface py-20 px-4">
      <div className="mx-auto max-w-6xl sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap gap-2">
          {CATS.map((c) => (
            <button key={c} onClick={() => setActive(c)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                active === c ? "bg-navy text-white" : "bg-white border border-border text-text-primary hover:border-navy"
              }`}>
              {c}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <div key={p.nameBn} className="overflow-hidden rounded-xl border border-border bg-white hover:shadow-md transition-shadow">
              <div className={`flex h-44 items-center justify-center ${p.bg}`}>
                <span className="text-6xl">{p.icon}</span>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <p lang="bn" className="font-bengali font-semibold text-navy">{p.nameBn}</p>
                  <Badge variant="secondary" className="text-xs shrink-0">{p.cat}</Badge>
                </div>
                <p className="mt-1.5 text-sm text-text-muted">{p.descBn}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Build, verify, commit, merge**
```bash
bun run build
# Verify /portfolio — filter tabs work, 6 cards
git add -A
git commit -m "feat: Portfolio page with category filter"
git checkout main
git merge feat/portfolio --no-ff -m "feat: portfolio page"
git branch -d feat/portfolio
```

---

## Task 8: Pricing Page

**Branch:** `feat/pricing-page`

**Files:**
- Create: `app/pricing/page.tsx`

- [ ] **Step 1: Create branch and implement**
```bash
git checkout main
git checkout -b feat/pricing-page
```

`app/pricing/page.tsx`:
```tsx
import type { Metadata } from "next"
import { Check, X, MessageCircle } from "lucide-react"
import { WA_GENERAL } from "@/lib/constants"

export const metadata: Metadata = {
  title:       "Pricing",
  description: "Transparent website pricing for Bangladeshi businesses. Starter from ৳15,000. Business from ৳30,000. Custom from ৳70,000.",
}

const YES = <Check className="mx-auto h-4 w-4 text-orange" />
const NO  = <X    className="mx-auto h-4 w-4 text-border"  />

const ROWS = [
  { label: "Pages",                starter: "5",        business: "10",        custom: "Unlimited"  },
  { label: "Mobile responsive",    starter: YES,        business: YES,         custom: YES          },
  { label: "WhatsApp integration", starter: YES,        business: YES,         custom: YES          },
  { label: "Contact form",         starter: YES,        business: YES,         custom: YES          },
  { label: "CMS",                  starter: NO,         business: YES,         custom: YES          },
  { label: "E-commerce",           starter: NO,         business: "Optional",  custom: YES          },
  { label: "Payment gateway",      starter: NO,         business: "Optional",  custom: YES          },
  { label: "SEO setup",            starter: "Basic",    business: "Full",      custom: "Advanced"   },
  { label: "Booking system",       starter: NO,         business: NO,          custom: YES          },
  { label: "Custom features",      starter: NO,         business: NO,          custom: YES          },
  { label: "Support",              starter: "1 month",  business: "3 months",  custom: "6 months"   },
  { label: "Delivery",             starter: "7 days",   business: "14 days",   custom: "21 days"    },
]

const FAQS = [
  { q: "কতদিনে website পাবো?",          a: "Starter 7 দিন, Business 14 দিন, Custom 21+ দিন। Simple project হলে আরো আগে।"                   },
  { q: "কি কি দরকার হবে?",              a: "ব্যবসার নাম, ঠিকানা, ফোন, ছবি, এবং কী চান — বাকি কাজ আমাদের।"                                   },
  { q: "Payment কিভাবে?",               a: "bKash, Nagad, বা bank transfer। 50% advance, 50% delivery-তে।"                                     },
  { q: "Launch-এর পরে কি support আছে?", a: "হ্যাঁ! প্রতিটি package-এ support period আছে। যেকোনো সমস্যায় WhatsApp করুন।"                    },
  { q: "Domain ও hosting লাগবে?",       a: "হ্যাঁ। আমরা সাহায্য করব সব সেটআপ করতে। খরচ package-এ include করা থাকে।"                         },
]

export default function PricingPage() {
  return (
    <>
      <section className="bg-navy py-20 text-center px-4">
        <h1 lang="bn" className="font-bengali text-4xl font-bold text-white">মূল্য তালিকা</h1>
        <p className="mt-3 text-white/70">Transparent Pricing</p>
      </section>

      {/* Comparison table */}
      <section className="bg-surface py-20 px-4">
        <div className="mx-auto max-w-6xl sm:px-6 lg:px-8">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr>
                  <th className="pb-8 text-left font-medium text-text-muted">Feature</th>
                  {[
                    { name: "Starter",  nameBn: "স্টার্টার",  price: "৳15,000–25,000", hot: false },
                    { name: "Business", nameBn: "বিজনেস",     price: "৳30,000–60,000", hot: true  },
                    { name: "Custom",   nameBn: "কাস্টম",     price: "৳70,000+",        hot: false },
                  ].map((t) => (
                    <th key={t.name} className="pb-8 text-center">
                      {t.hot && (
                        <span className="mb-2 block rounded-full bg-orange px-3 py-0.5 text-xs font-bold text-white">
                          জনপ্রিয়
                        </span>
                      )}
                      <p lang="bn" className="font-bengali block font-bold text-navy text-base">{t.nameBn}</p>
                      <p className="font-bold text-lg text-navy">{t.price}</p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r, i) => (
                  <tr key={r.label} className={i % 2 === 0 ? "bg-white" : "bg-surface"}>
                    <td className="py-3 pl-3 font-medium text-text-primary rounded-l-lg">{r.label}</td>
                    {[r.starter, r.business, r.custom].map((v, j) => (
                      <td key={j} className="py-3 text-center text-text-primary">
                        {typeof v === "string" ? v : v}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td />
                  {[false, true, false].map((hot, i) => (
                    <td key={i} className="pt-8 text-center">
                      <a href={WA_GENERAL} target="_blank" rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors ${
                          hot ? "bg-orange text-white hover:bg-orange-hover" : "border border-navy text-navy hover:bg-navy hover:text-white"
                        }`}>
                        <MessageCircle className="h-3.5 w-3.5" />
                        <span lang="bn" className="font-bengali">শুরু করুন</span>
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 px-4">
        <div className="mx-auto max-w-3xl sm:px-6">
          <h2 lang="bn" className="font-bengali mb-10 text-center text-2xl font-bold text-navy">
            সাধারণ প্রশ্ন
          </h2>
          <div className="flex flex-col gap-4">
            {FAQS.map((faq) => (
              <div key={faq.q} className="rounded-xl border border-border bg-surface p-6">
                <p lang="bn" className="font-bengali font-semibold text-navy">{faq.q}</p>
                <p lang="bn" className="font-bengali mt-2 text-sm text-text-muted leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Build, verify, commit, merge**
```bash
bun run build
# Verify /pricing — comparison table, Business column highlighted, FAQ section
git add -A
git commit -m "feat: Pricing page with comparison table and FAQ"
git checkout main
git merge feat/pricing-page --no-ff -m "feat: pricing page"
git branch -d feat/pricing-page
```

---

## Task 9: Contact Page + API Route

**Branch:** `feat/contact`

**Files:**
- Create: `app/contact/page.tsx`
- Create: `app/contact/contact-form.tsx` ("use client")
- Create: `app/api/contact/route.ts`

- [ ] **Step 1: Create branch**
```bash
git checkout main
git checkout -b feat/contact
```

- [ ] **Step 2: Create `app/api/contact/route.ts`**
```ts
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, businessName, businessType, budgetRange, message } = body

    // Validation
    if (!name || !message) {
      return NextResponse.json({ error: "Name and message are required" }, { status: 400 })
    }

    // Log submission (replace with nodemailer/resend before launch)
    console.log("[ZeroD Contact Form]", {
      name, businessName, businessType, budgetRange, message,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
```

- [ ] **Step 3: Create `app/contact/contact-form.tsx`**
```tsx
"use client"
import { useState, FormEvent } from "react"
import { MessageCircle, Send, CheckCircle } from "lucide-react"
import { WA_GENERAL } from "@/lib/constants"

const BUSINESS_TYPES = [
  "Restaurant & Food",
  "Online Shop / E-commerce",
  "Clinic & Healthcare",
  "Coaching & Education",
  "Business Profile Site",
  "NGO / Foundation",
  "Other",
]
const BUDGET_RANGES = [
  "Under ৳15,000",
  "৳15,000 – ৳50,000",
  "৳50,000 – ৳1,00,000",
  "৳1,00,000+",
  "Not sure yet",
]

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")
    const form   = e.currentTarget
    const data   = Object.fromEntries(new FormData(form))
    try {
      const res = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(data),
      })
      if (res.ok) {
        setStatus("success")
        form.reset()
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <CheckCircle className="h-12 w-12 text-orange" />
        <p lang="bn" className="font-bengali text-xl font-bold text-navy">আপনার message পাঠানো হয়েছে!</p>
        <p lang="bn" className="font-bengali text-text-muted">আমরা শীঘ্রই যোগাযোগ করবো।</p>
      </div>
    )
  }

  const inputCls = "w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/20"

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label lang="bn" htmlFor="name" className="font-bengali mb-1.5 block text-sm font-medium text-text-primary">
            আপনার নাম <span className="text-orange">*</span>
          </label>
          <input id="name" name="name" type="text" required placeholder="আপনার নাম" className={inputCls} />
        </div>
        <div>
          <label lang="bn" htmlFor="businessName" className="font-bengali mb-1.5 block text-sm font-medium text-text-primary">
            ব্যবসার নাম
          </label>
          <input id="businessName" name="businessName" type="text" placeholder="ব্যবসার নাম (optional)" className={inputCls} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label lang="bn" htmlFor="businessType" className="font-bengali mb-1.5 block text-sm font-medium text-text-primary">
            ব্যবসার ধরন
          </label>
          <select id="businessType" name="businessType" className={inputCls}>
            <option value="">Select type</option>
            {BUSINESS_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label lang="bn" htmlFor="budgetRange" className="font-bengali mb-1.5 block text-sm font-medium text-text-primary">
            বাজেট
          </label>
          <select id="budgetRange" name="budgetRange" className={inputCls}>
            <option value="">Select budget</option>
            {BUDGET_RANGES.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label lang="bn" htmlFor="message" className="font-bengali mb-1.5 block text-sm font-medium text-text-primary">
          বার্তা <span className="text-orange">*</span>
        </label>
        <textarea id="message" name="message" rows={4} required placeholder="আপনার website সম্পর্কে বলুন…" lang="bn"
          className={`${inputCls} resize-none`} />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">Something went wrong. Please try WhatsApp instead.</p>
      )}

      <button type="submit" disabled={status === "loading"}
        className="flex items-center justify-center gap-2 rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy/90 disabled:opacity-60">
        <Send className="h-4 w-4" />
        <span lang="bn" className="font-bengali">{status === "loading" ? "পাঠানো হচ্ছে…" : "পাঠান"}</span>
      </button>
    </form>
  )
}
```

- [ ] **Step 4: Create `app/contact/page.tsx`**
```tsx
import type { Metadata } from "next"
import { MessageCircle, Phone, Mail, MapPin } from "lucide-react"
import { ContactForm } from "./contact-form"
import { WA_GENERAL, PHONE, EMAIL, ADDRESS } from "@/lib/constants"

export const metadata: Metadata = {
  title:       "Contact",
  description: "Get in touch with ZeroD Agency. WhatsApp, email, or fill out the form for a free consultation.",
}

export default function ContactPage() {
  return (
    <>
      <section className="bg-navy py-20 text-center px-4">
        <h1 lang="bn" className="font-bengali text-4xl font-bold text-white">যোগাযোগ করুন</h1>
        <p className="mt-3 text-white/70">Contact Us</p>
      </section>

      <section className="bg-surface py-20 px-4">
        <div className="mx-auto max-w-6xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Form */}
            <div className="rounded-2xl border border-border bg-white p-8">
              <h2 lang="bn" className="font-bengali mb-6 text-xl font-bold text-navy">মেসেজ পাঠান</h2>
              <ContactForm />
            </div>

            {/* Info */}
            <div className="flex flex-col gap-6">
              <a href={WA_GENERAL} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-5 rounded-2xl bg-[#25D366] p-6 text-white transition-opacity hover:opacity-90">
                <MessageCircle className="h-8 w-8 shrink-0" />
                <div>
                  <p lang="bn" className="font-bengali text-lg font-bold">সরাসরি WhatsApp করুন</p>
                  <p className="text-sm text-white/80">{PHONE}</p>
                </div>
              </a>

              <div className="flex flex-col gap-5 rounded-2xl border border-border bg-white p-6">
                {[
                  { icon: Phone,  label: "Phone",   val: PHONE,   href: `tel:${PHONE}` },
                  { icon: Mail,   label: "Email",   val: EMAIL,   href: `mailto:${EMAIL}` },
                  { icon: MapPin, label: "Address", val: ADDRESS, href: undefined },
                ].map(({ icon: Icon, label, val, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-orange" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">{label}</p>
                      {href ? (
                        <a href={href} className="text-sm text-text-primary hover:text-orange transition-colors">{val}</a>
                      ) : (
                        <p className="text-sm text-text-primary">{val}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex h-36 items-center justify-center rounded-xl bg-surface border border-border text-text-muted text-sm">
                📍 Naogaon, Bangladesh — map embed coming soon
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 5: Build, verify, commit, merge**
```bash
bun run build
# Verify /contact — form renders, /api/contact returns 200 on valid POST
# curl -X POST http://localhost:3000/api/contact -H "Content-Type: application/json" -d '{"name":"Test","message":"Hello"}'
git add -A
git commit -m "feat: Contact page with form, API route POST handler"
git checkout main
git merge feat/contact --no-ff -m "feat: contact page and API route"
git branch -d feat/contact
```
