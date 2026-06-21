# ZeroD Agency Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 6-page bilingual (Bengali/English) marketing website for ZeroD Agency, a Naogaon-based web development agency targeting local Bangladeshi small and mid-level businesses.

**Architecture:** Next.js 16 App Router, Server Components by default. Each page is its own route. Client components (`"use client"`) are isolated to: Navbar mobile drawer, Portfolio filter tabs, FAQ accordion, and the floating WhatsApp button. All styling via Tailwind v4 + CSS custom properties. No external test framework — TypeScript compilation + `bun run build` is the quality gate; visual browser verification confirms correctness.

**Tech Stack:** Next.js 16, React 19, Tailwind v4, shadcn/ui (radix-nova style), Hind Siliguri via `next/font/google`, Geist Sans (already installed), lucide-react, radix-ui, class-variance-authority

## Global Constraints

- Next.js 16 App Router — skim `node_modules/next/dist/docs/01-app/` for any unfamiliar API before writing code
- Default to Server Components — only add `"use client"` when using `useState`/`useEffect`/browser events
- Bengali text: wrap in `<span className="font-bengali" lang="bn">` inline, or set `lang="bn"` on block elements
- WhatsApp placeholder: `8801XXXXXXXXX` — hardcoded in `lib/constants.ts`; never inline elsewhere
- Mobile-first: every layout starts single-column, expands with `sm:` / `md:` / `lg:` prefixes
- No dark mode in v1
- Hero section animations only (CSS keyframes) — no animations elsewhere
- Package manager: `bun` — use `bun add`, `bunx`, `bun run` throughout
- shadcn CLI: `bunx shadcn@latest add <component>`
- No placeholder `// TODO` comments — every task ships working code

---

## File Map

```
lib/
  constants.ts                     NEW — site-wide strings and URLs

app/
  globals.css                      MODIFY — brand CSS variables, @theme tokens, keyframes
  layout.tsx                       MODIFY — Hind Siliguri font, Navbar/Footer/FloatingWhatsApp, metadata
  page.tsx                         REPLACE — Homepage (imports home/* components)
  services/
    page.tsx                       NEW — Services Overview
    website-build/
      page.tsx                     NEW — Website Build detailed page
  portfolio/
    page.tsx                       NEW — Portfolio with client-side filter
  pricing/
    page.tsx                       NEW — Pricing table + FAQ accordion
  contact/
    page.tsx                       NEW — Contact form with Server Action

components/
  logo.tsx                         NEW — HTML/CSS text mark, dark/light variant
  section-wrapper.tsx              NEW — max-width centred layout container
  floating-whatsapp.tsx            NEW — fixed WhatsApp button, "use client"
  navbar.tsx                       NEW — sticky nav + mobile drawer, "use client"
  footer.tsx                       NEW — dark-green 3-column footer
  cta-banner.tsx                   NEW — dark-green CTA banner, reused on every page
  home/
    hero.tsx                       NEW — full-viewport hero with CSS animations
    service-cards.tsx              NEW — 3-card services preview
    why-zerod.tsx                  NEW — 4-tile trust signals
    portfolio-preview.tsx          NEW — 3 placeholder project cards
    testimonials.tsx               NEW — 2 client quote cards
    pricing-preview.tsx            NEW — 3-tier pricing cards preview
  ui/
    card.tsx                       ADD via shadcn
    badge.tsx                      ADD via shadcn
    accordion.tsx                  ADD via shadcn
```

---

## Task 1: Foundation — constants, CSS brand tokens, keyframes

**Files:**
- Create: `lib/constants.ts`
- Modify: `app/globals.css`

**Interfaces:**
- Produces: `WHATSAPP_URL`, `EMAIL`, `PHONE`, `ADDRESS`, `SITE_NAME`, `TAGLINE_BN`, `TAGLINE_EN` — all imported as named exports from `@/lib/constants`
- Produces: Tailwind utilities `bg-brand-primary`, `bg-brand-surface`, `bg-brand-accent`, `text-brand-primary`, `text-brand-surface`, `text-brand-accent`, `font-bengali`
- Produces: CSS animation classes `animate-fade-up`, `animate-breathe`, `animate-float`, `animate-pulse-glow`, `animation-delay-150`, `animation-delay-300`, `animation-delay-450`, `animation-delay-600`

- [ ] **Step 1: Create `lib/constants.ts`**

```ts
export const WHATSAPP_NUMBER = "8801XXXXXXXXX"
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`
export const WHATSAPP_MESSAGE = encodeURIComponent("আমি ZeroD Agency-র সাথে কথা বলতে চাই।")
export const WHATSAPP_URL_WITH_MSG = `${WHATSAPP_URL}?text=${WHATSAPP_MESSAGE}`

export const SITE_NAME = "ZeroD Agency"
export const TAGLINE_BN = "আপনার ব্যবসাকে অনলাইনে নিয়ে আসুন"
export const TAGLINE_EN = "Bring your business online"
export const EMAIL = "zerodagency@gmail.com"
export const PHONE = "+8801XXXXXXXXX"
export const ADDRESS = "Naogaon, Rajshahi Division, Bangladesh"
export const FACEBOOK_URL = "https://facebook.com/zerodagency"
```

- [ ] **Step 2: Add brand tokens to `app/globals.css`**

Open `app/globals.css`. After the existing `@theme inline { ... }` block and before `:root { ... }`, add the brand extension to `@theme inline`:

```css
/* Add these lines INSIDE the existing @theme inline { } block, after the last existing line */
  --color-brand-primary: var(--brand-primary);
  --color-brand-surface: var(--brand-surface);
  --color-brand-accent: var(--brand-accent);
  --color-brand-accent-hover: var(--brand-accent-hover);
  --font-bengali: var(--font-hind-siliguri);
```

Then add these brand variables INSIDE the existing `:root { }` block, after the last `--sidebar-ring` line:

```css
  /* Brand tokens */
  --brand-primary: #1A4731;
  --brand-surface: #0D2818;
  --brand-accent: #F59E0B;
  --brand-accent-hover: #D97706;
  --font-hind-siliguri: 'Hind Siliguri', sans-serif;
```

- [ ] **Step 3: Add hero keyframes and animation utilities to `app/globals.css`**

Append to the end of `app/globals.css`:

```css
/* ── Hero animation keyframes ── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0);    }
}

@keyframes breathe {
  0%, 100% { opacity: 0.4; }
  50%       { opacity: 0.9; }
}

@keyframes float {
  0%, 100% { transform: translateY(0px);   }
  50%       { transform: translateY(-20px); }
}

@keyframes pulseGlow {
  0%   { box-shadow: 0 0 0 0   rgba(245, 158, 11, 0.55); }
  100% { box-shadow: 0 0 0 14px rgba(245, 158, 11, 0);   }
}

@layer utilities {
  .animate-fade-up    { animation: fadeUp    0.6s ease-out both; }
  .animate-breathe    { animation: breathe   8s   ease-in-out infinite; }
  .animate-float      { animation: float     12s  ease-in-out infinite; }
  .animate-pulse-glow { animation: pulseGlow 2.5s ease-out   infinite; }

  .animation-delay-150 { animation-delay: 150ms; }
  .animation-delay-300 { animation-delay: 300ms; }
  .animation-delay-450 { animation-delay: 450ms; }
  .animation-delay-600 { animation-delay: 600ms; }
}
```

- [ ] **Step 4: Verify no build errors**

```bash
bun run build
```

Expected: build succeeds. If TypeScript errors appear in `constants.ts`, fix them (all exports are `string` — no complex types here).

- [ ] **Step 5: Commit**

```bash
git checkout -b feat/zerod-agency-website
git add lib/constants.ts app/globals.css
git commit -m "feat: add brand tokens, keyframes, and site constants"
```

---

## Task 2: Install shadcn UI components

**Files:**
- Add: `components/ui/card.tsx`
- Add: `components/ui/badge.tsx`
- Add: `components/ui/accordion.tsx`

**Interfaces:**
- Produces: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` from `@/components/ui/card`
- Produces: `Badge` from `@/components/ui/badge`
- Produces: `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` from `@/components/ui/accordion`

- [ ] **Step 1: Add the three components via shadcn CLI**

```bash
bunx shadcn@latest add card badge accordion
```

When prompted to overwrite existing files, accept (there are none for these three). This writes `components/ui/card.tsx`, `components/ui/badge.tsx`, and `components/ui/accordion.tsx`.

- [ ] **Step 2: Verify files were created**

```bash
ls components/ui/
```

Expected output includes: `accordion.tsx  badge.tsx  button.tsx  card.tsx`

- [ ] **Step 3: Verify build passes**

```bash
bun run build
```

Expected: clean build.

- [ ] **Step 4: Commit**

```bash
git add components/ui/card.tsx components/ui/badge.tsx components/ui/accordion.tsx
git commit -m "feat: add shadcn card, badge, and accordion components"
```

---

## Task 3: Shared layout components

**Files:**
- Create: `components/logo.tsx`
- Create: `components/section-wrapper.tsx`
- Create: `components/floating-whatsapp.tsx`
- Create: `components/navbar.tsx`
- Create: `components/footer.tsx`
- Create: `components/cta-banner.tsx`

**Interfaces:**
- Produces: `<Logo variant="dark"|"light" className? />` — inline HTML/CSS text mark
- Produces: `<SectionWrapper className? />` — div with max-w-[1200px] + horizontal padding
- Produces: `<FloatingWhatsApp />` — fixed bottom-right WhatsApp button (client)
- Produces: `<Navbar />` — sticky nav (client)
- Produces: `<Footer />` — dark-green footer
- Produces: `<CTABanner heading? subtext? />` — reusable dark-green CTA section

- [ ] **Step 1: Create `components/logo.tsx`**

```tsx
import { cn } from "@/lib/utils"

interface LogoProps {
  variant?: "dark" | "light"
  className?: string
}

export function Logo({ variant = "dark", className }: LogoProps) {
  const color = variant === "dark" ? "text-[#0D2818]" : "text-white"
  const ring  = variant === "dark" ? "border-[#F59E0B]" : "border-[#F59E0B]"

  return (
    <div className={cn("flex flex-col leading-none select-none", className)}>
      <div className="flex items-center">
        <span className={cn("font-sans text-2xl font-bold tracking-tight", color)}>
          Zero
        </span>
        <span className="relative flex items-center justify-center mx-0.5">
          <span className={cn("font-sans text-2xl font-bold tracking-tight relative z-10", color)}>
            D
          </span>
          <span
            className={cn(
              "absolute inset-[-5px] rounded-full border-[1.5px] pointer-events-none",
              ring
            )}
          />
        </span>
      </div>
      <span
        className={cn(
          "text-[8px] font-normal tracking-[0.35em] uppercase mt-[-2px] pl-0.5",
          color,
          "opacity-60"
        )}
      >
        Agency
      </span>
    </div>
  )
}
```

- [ ] **Step 2: Create `components/section-wrapper.tsx`**

```tsx
import { cn } from "@/lib/utils"

export function SectionWrapper({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  )
}
```

- [ ] **Step 3: Create `components/floating-whatsapp.tsx`**

```tsx
"use client"

import { WHATSAPP_URL_WITH_MSG } from "@/lib/constants"

export function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL_WITH_MSG}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand-accent shadow-lg transition-transform hover:scale-110 hover:shadow-xl"
    >
      {/* WhatsApp SVG icon */}
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-7 w-7 text-[#1A4731]"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  )
}
```

- [ ] **Step 4: Create `components/navbar.tsx`**

```tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, MessageCircle } from "lucide-react"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { WHATSAPP_URL_WITH_MSG } from "@/lib/constants"

const NAV_LINKS = [
  { label: "Home",      href: "/"                   },
  { label: "Services",  href: "/services"            },
  { label: "Portfolio", href: "/portfolio"           },
  { label: "Pricing",   href: "/pricing"             },
  { label: "Contact",   href: "/contact"             },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E5E7EB] bg-white">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" aria-label="ZeroD Agency home">
          <Logo variant="dark" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#0F1C15] transition-colors hover:text-brand-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href={WHATSAPP_URL_WITH_MSG}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 rounded-lg bg-brand-accent px-4 py-2 text-sm font-semibold text-[#0F1C15] transition-colors hover:bg-brand-accent-hover md:flex"
        >
          <MessageCircle className="h-4 w-4 text-[#1A4731]" />
          WhatsApp করুন
        </a>

        {/* Mobile hamburger */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-md md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-[#E5E7EB] bg-white md:hidden">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-[#0F1C15] hover:bg-gray-100"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={WHATSAPP_URL_WITH_MSG}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-brand-accent px-4 py-2.5 text-sm font-semibold text-[#0F1C15]"
            >
              <MessageCircle className="h-4 w-4 text-[#1A4731]" />
              WhatsApp করুন
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
```

- [ ] **Step 5: Create `components/footer.tsx`**

```tsx
import Link from "next/link"
import { Logo } from "@/components/logo"
import {
  TAGLINE_BN,
  EMAIL,
  PHONE,
  ADDRESS,
  FACEBOOK_URL,
  WHATSAPP_URL_WITH_MSG,
} from "@/lib/constants"

const FOOTER_LINKS = [
  { label: "Services",  href: "/services"   },
  { label: "Portfolio", href: "/portfolio"  },
  { label: "Pricing",   href: "/pricing"    },
  { label: "Contact",   href: "/contact"    },
]

export function Footer() {
  return (
    <footer className="bg-[#0D2818] text-white">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Column 1: Logo + tagline */}
          <div className="flex flex-col gap-4">
            <Logo variant="light" />
            <p lang="bn" className="font-bengali text-sm text-white/70 leading-relaxed">
              {TAGLINE_BN}
            </p>
          </div>

          {/* Column 2: Quick links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white/50">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white/50">
              Contact
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-white/70">
              <li>
                <a href={`tel:${PHONE}`} className="hover:text-white transition-colors">
                  {PHONE}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="hover:text-white transition-colors">
                  {EMAIL}
                </a>
              </li>
              <li>{ADDRESS}</li>
              <li className="flex gap-3 pt-2">
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors text-xs uppercase tracking-wider"
                >
                  Facebook
                </a>
                <a
                  href={WHATSAPP_URL_WITH_MSG}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors text-xs uppercase tracking-wider"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} ZeroD Agency. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 6: Create `components/cta-banner.tsx`**

```tsx
import { MessageCircle } from "lucide-react"
import { WHATSAPP_URL_WITH_MSG } from "@/lib/constants"

interface CTABannerProps {
  heading?: string
  subtext?: string
}

export function CTABanner({
  heading = "আজই শুরু করুন",
  subtext = "WhatsApp করুন — বিনামূল্যে পরামর্শ নিন",
}: CTABannerProps) {
  return (
    <section className="bg-[#0D2818] py-20 px-4 text-center">
      <h2 lang="bn" className="font-bengali text-3xl font-bold text-white sm:text-4xl">
        {heading}
      </h2>
      <p lang="bn" className="font-bengali mt-3 text-base text-white/70">
        {subtext}
      </p>
      <a
        href={WHATSAPP_URL_WITH_MSG}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-accent px-8 py-3.5 text-base font-semibold text-[#0F1C15] transition-colors hover:bg-brand-accent-hover"
      >
        <MessageCircle className="h-5 w-5 text-[#1A4731]" />
        <span lang="bn" className="font-bengali">WhatsApp করুন</span>
      </a>
      <p className="mt-4 text-sm text-white/40">+8801XXXXXXXXX</p>
    </section>
  )
}
```

- [ ] **Step 7: Verify TypeScript compiles**

```bash
bun run build
```

Expected: clean build — all new components type-check correctly.

- [ ] **Step 8: Commit**

```bash
git add components/logo.tsx components/section-wrapper.tsx components/floating-whatsapp.tsx components/navbar.tsx components/footer.tsx components/cta-banner.tsx
git commit -m "feat: add shared layout components (logo, navbar, footer, floating WhatsApp, CTA banner)"
```

---

## Task 4: Update root layout

**Files:**
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `<Navbar />`, `<Footer />`, `<FloatingWhatsApp />` from Task 3
- Consumes: `Hind_Siliguri` from `next/font/google`
- Produces: every page is wrapped with Navbar + Footer, floating WhatsApp is always visible, `--font-hind-siliguri` CSS variable is available globally

- [ ] **Step 1: Replace `app/layout.tsx`**

```tsx
import type { Metadata } from "next"
import { Geist, Geist_Mono, Hind_Siliguri } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali"],
  weight: ["400", "600", "700"],
})

export const metadata: Metadata = {
  title: "ZeroD Agency — আপনার ব্যবসাকে অনলাইনে নিয়ে আসুন",
  description:
    "ZeroD Agency builds professional websites for local Bangladeshi businesses. Based in Naogaon, Bangladesh. Transparent pricing. Ongoing support.",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${hindSiliguri.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FAFAFA] text-[#0F1C15]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
bun run build
```

Expected: clean build. If `Hind_Siliguri` import fails, check that `next/font/google` supports it — in Next.js 16 it is supported as `Hind_Siliguri`.

- [ ] **Step 3: Start dev server and visually verify**

```bash
bun run dev
```

Open `http://localhost:3000`. Expected:
- Navbar with logo, links, WhatsApp button visible at top
- Dark-green footer at bottom
- Gold floating WhatsApp button bottom-right
- Existing page content unchanged (placeholder page.tsx still visible)

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: update root layout with Hind Siliguri font, Navbar, Footer, and floating WhatsApp"
```

---

## Task 5: Homepage

**Files:**
- Create: `components/home/hero.tsx`
- Create: `components/home/service-cards.tsx`
- Create: `components/home/why-zerod.tsx`
- Create: `components/home/portfolio-preview.tsx`
- Create: `components/home/testimonials.tsx`
- Create: `components/home/pricing-preview.tsx`
- Replace: `app/page.tsx`

**Interfaces:**
- Consumes: `CTABanner` from Task 3, `SectionWrapper` from Task 3
- Consumes: `Card`, `Badge` from Task 2
- Consumes: `WHATSAPP_URL_WITH_MSG` from Task 1

- [ ] **Step 1: Create `components/home/hero.tsx`**

```tsx
import Link from "next/link"
import { MessageCircle } from "lucide-react"
import { Logo } from "@/components/logo"
import { WHATSAPP_URL_WITH_MSG, TAGLINE_BN } from "@/lib/constants"

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-[#0D2818] px-4 text-center">
      {/* Breathing radial glow */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="animate-breathe h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.10)_0%,transparent_70%)]" />
      </div>

      {/* Floating decorative ring */}
      <div
        className="animate-float pointer-events-none absolute bottom-[-80px] right-[-80px] h-[420px] w-[420px] rounded-full border-[1.5px] border-[rgba(245,158,11,0.14)]"
        aria-hidden="true"
      />
      <div
        className="animate-float animation-delay-300 pointer-events-none absolute top-[-60px] left-[-60px] h-[280px] w-[280px] rounded-full border-[1.5px] border-[rgba(245,158,11,0.08)]"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 max-w-3xl">
        {/* Logo */}
        <div className="animate-fade-up">
          <Logo variant="light" className="scale-110" />
        </div>

        {/* Bengali headline */}
        <h1
          lang="bn"
          className="animate-fade-up animation-delay-150 font-bengali text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl"
        >
          {TAGLINE_BN}
        </h1>

        {/* English subheadline */}
        <p className="animate-fade-up animation-delay-300 max-w-xl text-base text-white/70 sm:text-lg">
          Professional websites for Bangladeshi businesses — built fast, priced fairly.
        </p>

        {/* CTAs */}
        <div className="animate-fade-up animation-delay-450 flex flex-col items-center gap-3 sm:flex-row">
          <a
            href={WHATSAPP_URL_WITH_MSG}
            target="_blank"
            rel="noopener noreferrer"
            className="animate-pulse-glow inline-flex items-center gap-2 rounded-lg bg-brand-accent px-6 py-3 text-base font-semibold text-[#0F1C15] transition-colors hover:bg-brand-accent-hover"
          >
            <MessageCircle className="h-5 w-5 text-[#1A4731]" />
            <span lang="bn" className="font-bengali">WhatsApp করুন 💬</span>
          </a>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1 rounded-lg border border-white/30 px-6 py-3 text-base font-medium text-white transition-colors hover:border-white/60 hover:bg-white/5"
          >
            <span lang="bn" className="font-bengali">আমাদের কাজ দেখুন</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create `components/home/service-cards.tsx`**

```tsx
import Link from "next/link"
import { Globe, RefreshCw, Wrench } from "lucide-react"
import { SectionWrapper } from "@/components/section-wrapper"
import { Card, CardContent } from "@/components/ui/card"

const SERVICES = [
  {
    icon: Globe,
    titleBn: "ওয়েবসাইট বানান",
    titleEn: "Build a Website",
    description: "আপনার ব্যবসার জন্য প্রফেশনাল ওয়েবসাইট",
    href: "/services/website-build",
  },
  {
    icon: RefreshCw,
    titleBn: "রিডিজাইন করুন",
    titleEn: "Redesign",
    description: "পুরনো সাইটকে নতুন রূপ দিন",
    href: "/services",
  },
  {
    icon: Wrench,
    titleBn: "রক্ষণাবেক্ষণ",
    titleEn: "Maintenance",
    description: "ওয়েবসাইট সচল ও আপডেট রাখুন",
    href: "/services",
  },
]

export function ServiceCards() {
  return (
    <section className="bg-[#FAFAFA] py-20">
      <SectionWrapper>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {SERVICES.map((s) => (
            <Link key={s.href + s.titleEn} href={s.href} className="group">
              <Card className="h-full border-[#E5E7EB] transition-shadow hover:shadow-md">
                <CardContent className="flex flex-col gap-4 p-6">
                  <s.icon className="h-8 w-8 text-brand-primary" />
                  <div>
                    <p lang="bn" className="font-bengali text-lg font-semibold text-[#0F1C15]">
                      {s.titleBn}
                    </p>
                    <p className="text-xs text-[#6B7280] uppercase tracking-wider">
                      {s.titleEn}
                    </p>
                  </div>
                  <p lang="bn" className="font-bengali text-sm text-[#6B7280] leading-relaxed">
                    {s.description}
                  </p>
                  <span className="mt-auto text-sm font-medium text-brand-primary group-hover:underline">
                    আরও জানুন →
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </SectionWrapper>
    </section>
  )
}
```

- [ ] **Step 3: Create `components/home/why-zerod.tsx`**

```tsx
import { SectionWrapper } from "@/components/section-wrapper"

const SIGNALS = [
  { icon: "🏠", titleBn: "স্থানীয় দল",   body: "Naogaon-based team, always reachable by phone or WhatsApp." },
  { icon: "✅", titleBn: "বাস্তব প্রজেক্ট", body: "We show real client work — no stock photos or fake demos."    },
  { icon: "💰", titleBn: "স্বচ্ছ মূল্য",  body: "Fixed pricing, no hidden costs. You know what you pay."      },
  { icon: "🤝", titleBn: "চলমান সাপোর্ট", body: "We stay after launch — updates, fixes, and guidance included."  },
]

export function WhyZeroD() {
  return (
    <section className="bg-brand-primary py-20">
      <SectionWrapper>
        <h2 className="mb-12 text-center text-2xl font-bold text-white sm:text-3xl">
          কেন ZeroD Agency?
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SIGNALS.map((s) => (
            <div
              key={s.titleBn}
              className="flex flex-col gap-3 rounded-xl bg-white/10 p-6 text-white"
            >
              <span className="text-3xl" aria-hidden="true">{s.icon}</span>
              <p lang="bn" className="font-bengali text-base font-semibold">{s.titleBn}</p>
              <p className="text-sm text-white/70 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </section>
  )
}
```

- [ ] **Step 4: Create `components/home/portfolio-preview.tsx`**

```tsx
import Link from "next/link"
import { SectionWrapper } from "@/components/section-wrapper"
import { Badge } from "@/components/ui/badge"

const PROJECTS = [
  { nameBn: "নওগাঁ রেস্তোরাঁ",            category: "Restaurant", color: "bg-orange-100",   icon: "🍽️" },
  { nameBn: "ডাক্তার চেম্বার",             category: "Healthcare", color: "bg-blue-100",     icon: "🏥" },
  { nameBn: "ফ্যাশন শপ",                   category: "E-commerce", color: "bg-purple-100",   icon: "👗" },
]

export function PortfolioPreview() {
  return (
    <section className="bg-white py-20">
      <SectionWrapper>
        <div className="mb-10 flex items-end justify-between">
          <h2 lang="bn" className="font-bengali text-2xl font-bold text-[#0F1C15] sm:text-3xl">
            আমাদের কাজ
          </h2>
          <Link
            href="/portfolio"
            className="text-sm font-medium text-brand-primary hover:underline"
          >
            সব কাজ দেখুন →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {PROJECTS.map((p) => (
            <Link key={p.nameBn} href="/portfolio" className="group">
              <div className="overflow-hidden rounded-xl border border-[#E5E7EB] transition-shadow hover:shadow-md">
                {/* Placeholder image area */}
                <div className={`flex h-44 items-center justify-center ${p.color}`}>
                  <span className="text-5xl">{p.icon}</span>
                </div>
                <div className="flex items-center justify-between p-4">
                  <p lang="bn" className="font-bengali font-semibold text-[#0F1C15]">
                    {p.nameBn}
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    {p.category}
                  </Badge>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </SectionWrapper>
    </section>
  )
}
```

- [ ] **Step 5: Create `components/home/testimonials.tsx`**

```tsx
import { SectionWrapper } from "@/components/section-wrapper"

const TESTIMONIALS = [
  {
    quote: "ZeroD Agency আমার ব্যবসার জন্য অসাধারণ ওয়েবসাইট বানিয়েছে। এখন অনেক নতুন কাস্টমার পাচ্ছি।",
    name:  "রাহেলা বেগম",
    biz:   "সবজি মার্ট, নওগাঁ",
  },
  {
    quote: "দাম একদম ঠিকঠাক, কাজ সময়মতো শেষ। খুব ভালো সার্ভিস।",
    name:  "করিম ভাই",
    biz:   "করিম ট্রেডার্স, রাজশাহী",
  },
]

export function Testimonials() {
  return (
    <section className="bg-[#FAFAFA] py-20">
      <SectionWrapper>
        <h2 className="mb-10 text-center text-2xl font-bold text-[#0F1C15] sm:text-3xl">
          আমাদের ক্লায়েন্টরা যা বলেন
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="rounded-xl border border-[#E5E7EB] bg-white p-8"
            >
              <span className="text-3xl text-brand-accent" aria-hidden="true">"</span>
              <p lang="bn" className="font-bengali mt-2 text-base leading-relaxed text-[#374151]">
                {t.quote}
              </p>
              <div className="mt-6">
                <p lang="bn" className="font-bengali font-semibold text-[#0F1C15]">{t.name}</p>
                <p lang="bn" className="font-bengali text-sm text-[#6B7280]">{t.biz}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </section>
  )
}
```

- [ ] **Step 6: Create `components/home/pricing-preview.tsx`**

```tsx
import Link from "next/link"
import { MessageCircle, Check } from "lucide-react"
import { SectionWrapper } from "@/components/section-wrapper"
import { Badge } from "@/components/ui/badge"
import { WHATSAPP_URL_WITH_MSG } from "@/lib/constants"

const TIERS = [
  {
    nameBn:    "স্টার্টার",
    nameEn:    "Starter",
    price:     "৳8,000",
    taglineBn: "শুরু করুন",
    features:  ["Business profile site", "Up to 5 pages", "WhatsApp integration", "1 month support"],
    featured:  false,
  },
  {
    nameBn:    "গ্রোথ",
    nameEn:    "Growth",
    price:     "৳18,000",
    taglineBn: "সবচেয়ে জনপ্রিয়",
    features:  ["Everything in Starter", "E-commerce + payment", "Up to 10 pages", "3 months support"],
    featured:  true,
  },
  {
    nameBn:    "প্রো",
    nameEn:    "Pro",
    price:     "৳35,000",
    taglineBn: "সম্পূর্ণ সমাধান",
    features:  ["Everything in Growth", "Custom features", "Advanced SEO", "6 months support"],
    featured:  false,
  },
]

export function PricingPreview() {
  return (
    <section className="bg-white py-20">
      <SectionWrapper>
        <h2 lang="bn" className="font-bengali mb-10 text-center text-2xl font-bold text-[#0F1C15] sm:text-3xl">
          প্যাকেজ দেখুন
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.nameEn}
              className={`relative flex flex-col rounded-xl border p-6 ${
                tier.featured
                  ? "border-2 border-brand-accent shadow-lg"
                  : "border-[#E5E7EB]"
              }`}
            >
              {tier.featured && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-accent text-[#0F1C15] font-semibold">
                  জনপ্রিয়
                </Badge>
              )}
              <p lang="bn" className="font-bengali text-lg font-bold text-[#0F1C15]">{tier.nameBn}</p>
              <p lang="bn" className="font-bengali mt-0.5 text-xs text-[#6B7280]">{tier.taglineBn}</p>
              <p className="mt-4 text-3xl font-bold text-[#0F1C15]">{tier.price}</p>
              <ul className="mt-6 flex flex-col gap-2">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-[#374151]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={WHATSAPP_URL_WITH_MSG}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-6 flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                  tier.featured
                    ? "bg-brand-accent text-[#0F1C15] hover:bg-brand-accent-hover"
                    : "border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
                }`}
              >
                <MessageCircle className="h-4 w-4" />
                <span lang="bn" className="font-bengali">WhatsApp করুন</span>
              </a>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/pricing"
            className="text-sm font-medium text-brand-primary hover:underline"
          >
            বিস্তারিত দেখুন →
          </Link>
        </div>
      </SectionWrapper>
    </section>
  )
}
```

- [ ] **Step 7: Replace `app/page.tsx`**

```tsx
import { Hero }             from "@/components/home/hero"
import { ServiceCards }     from "@/components/home/service-cards"
import { WhyZeroD }         from "@/components/home/why-zerod"
import { PortfolioPreview } from "@/components/home/portfolio-preview"
import { Testimonials }     from "@/components/home/testimonials"
import { PricingPreview }   from "@/components/home/pricing-preview"
import { CTABanner }        from "@/components/cta-banner"

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServiceCards />
      <WhyZeroD />
      <PortfolioPreview />
      <Testimonials />
      <PricingPreview />
      <CTABanner />
    </>
  )
}
```

- [ ] **Step 8: Build and verify visually**

```bash
bun run build && bun run dev
```

Open `http://localhost:3000`. Scroll through all sections. Verify:
- Hero: dark green bg, animations (fade-up stagger, floating rings, gold glow on WhatsApp button)
- Service cards: 3 columns on desktop, stacked on mobile
- Why ZeroD: green bg, 4 white tiles
- Portfolio preview: 3 placeholder emoji cards
- Testimonials: Bengali quote cards
- Pricing preview: Growth tier has gold border and badge
- CTA banner: dark green, gold WhatsApp button

- [ ] **Step 9: Commit**

```bash
git add components/home/ app/page.tsx
git commit -m "feat: build homepage with all sections and hero animations"
```

---

## Task 6: Services Overview page

**Files:**
- Create: `app/services/page.tsx`

**Interfaces:**
- Consumes: `SectionWrapper`, `CTABanner`
- Consumes: `Card`, `CardContent`

- [ ] **Step 1: Create `app/services/page.tsx`**

```tsx
import type { Metadata } from "next"
import Link from "next/link"
import { Globe, ShoppingCart, Stethoscope, BookOpen, UtensilsCrossed, RefreshCw } from "lucide-react"
import { SectionWrapper } from "@/components/section-wrapper"
import { CTABanner }       from "@/components/cta-banner"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Services — ZeroD Agency",
  description: "Professional website services for Bangladeshi businesses. Build, redesign, or maintain your online presence.",
}

const SERVICES = [
  {
    icon:     Globe,
    titleBn:  "বিজনেস প্রোফাইল সাইট",
    titleEn:  "Business Profile Site",
    priceBn:  "থেকে শুরু ৳8,000",
    href:     "/services/website-build",
  },
  {
    icon:     ShoppingCart,
    titleBn:  "অনলাইন শপ / ই-কমার্স",
    titleEn:  "Online Shop / E-commerce",
    priceBn:  "থেকে শুরু ৳18,000",
    href:     "/services/website-build",
  },
  {
    icon:     Stethoscope,
    titleBn:  "ক্লিনিক ও স্বাস্থ্যসেবা",
    titleEn:  "Clinic & Healthcare",
    priceBn:  "থেকে শুরু ৳12,000",
    href:     "/services/website-build",
  },
  {
    icon:     BookOpen,
    titleBn:  "কোচিং ও শিক্ষা",
    titleEn:  "Coaching & Education",
    priceBn:  "থেকে শুরু ৳10,000",
    href:     "/services/website-build",
  },
  {
    icon:     UtensilsCrossed,
    titleBn:  "রেস্তোরাঁ ও খাবার ব্যবসা",
    titleEn:  "Restaurant & Food Business",
    priceBn:  "থেকে শুরু ৳10,000",
    href:     "/services/website-build",
  },
  {
    icon:     RefreshCw,
    titleBn:  "রিডিজাইন ও রিফ্রেশ",
    titleEn:  "Redesign & Refresh",
    priceBn:  "থেকে শুরু ৳6,000",
    href:     "/services/website-build",
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0D2818] py-20 text-center px-4">
        <h1 lang="bn" className="font-bengali text-4xl font-bold text-white">আমাদের সেবাসমূহ</h1>
        <p className="mt-3 text-base text-white/70">Our Services</p>
        <p className="mt-4 max-w-xl mx-auto text-sm text-white/60">
          Professional websites tailored for every type of local business — from first-time owners to growing e-commerce brands.
        </p>
      </section>

      {/* Service grid */}
      <section className="py-20 bg-[#FAFAFA]">
        <SectionWrapper>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <Link key={s.titleEn} href={s.href} className="group">
                <Card className="h-full border-[#E5E7EB] transition-shadow hover:shadow-md">
                  <CardContent className="flex flex-col gap-4 p-6">
                    <s.icon className="h-8 w-8 text-brand-primary" />
                    <div>
                      <p lang="bn" className="font-bengali text-base font-semibold text-[#0F1C15]">
                        {s.titleBn}
                      </p>
                      <p className="text-xs text-[#6B7280] uppercase tracking-wider">{s.titleEn}</p>
                    </div>
                    <p lang="bn" className="font-bengali text-sm font-semibold text-brand-primary">
                      {s.priceBn}
                    </p>
                    <span className="mt-auto text-sm font-medium text-brand-primary group-hover:underline">
                      বিস্তারিত →
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </SectionWrapper>
      </section>

      <CTABanner />
    </>
  )
}
```

- [ ] **Step 2: Build and verify**

```bash
bun run build && bun run dev
```

Open `http://localhost:3000/services`. Verify: dark-green hero, 6-card grid (2 col on tablet, 3 col on desktop), CTA banner at bottom.

- [ ] **Step 3: Commit**

```bash
git add app/services/page.tsx
git commit -m "feat: add Services Overview page"
```

---

## Task 7: Website Build Service page

**Files:**
- Create: `app/services/website-build/page.tsx`

- [ ] **Step 1: Create `app/services/website-build/page.tsx`**

```tsx
import type { Metadata } from "next"
import { MessageCircle, Check } from "lucide-react"
import { SectionWrapper } from "@/components/section-wrapper"
import { CTABanner }       from "@/components/cta-banner"
import { Badge }           from "@/components/ui/badge"
import { WHATSAPP_URL_WITH_MSG } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Website Build — ZeroD Agency",
  description: "Build a professional website for your business. Packages starting from ৳8,000.",
}

const CLIENT_TYPES = [
  {
    headlineBn: "প্রথমবার অনলাইনে আসছেন?",
    subtitleBn: "নতুন ব্যবসা শুরু করতে চান",
    bullets:    [
      "Domain + hosting সেটআপ",
      "প্রফেশনাল ডিজাইন",
      "Contact form ও Google Maps",
      "WhatsApp বাটন ইন্টিগ্রেশন",
    ],
    price:    "৳8,000 থেকে শুরু",
    bg:       "bg-white",
  },
  {
    headlineBn: "Facebook পেজ থেকে নিজের ওয়েবসাইটে আসুন",
    subtitleBn: "Facebook এ sell করি, proper site চাই",
    bullets:    [
      "Product catalog সহ সাইট",
      "WhatsApp/Facebook order ফর্ম",
      "Facebook Pixel ইন্টিগ্রেশন",
      "Mobile-optimized ডিজাইন",
    ],
    price:    "৳12,000 থেকে শুরু",
    bg:       "bg-[#FAFAFA]",
  },
  {
    headlineBn: "আপনার শপকে আরও শক্তিশালী করুন",
    subtitleBn: "E-commerce আছে কিন্তু ভালো না",
    bullets:    [
      "Performance audit ও সমস্যা সমাধান",
      "Payment gateway ইন্টিগ্রেশন",
      "উন্নত product UI",
      "SEO improvement",
    ],
    price:    "৳18,000 থেকে শুরু",
    bg:       "bg-white",
  },
]

const SUBCATEGORIES = [
  { nameBn: "বিজনেস প্রোফাইল সাইট",  price: "৳8,000"  },
  { nameBn: "অনলাইন শপ / ই-কমার্স",  price: "৳18,000" },
  { nameBn: "ক্লিনিক ও স্বাস্থ্যসেবা", price: "৳12,000" },
  { nameBn: "কোচিং ও শিক্ষা",         price: "৳10,000" },
  { nameBn: "রেস্তোরাঁ ও খাবার",       price: "৳10,000" },
]

export default function WebsiteBuildPage() {
  return (
    <>
      {/* Page hero */}
      <section className="bg-[#0D2818] py-16 text-center px-4">
        <h1 lang="bn" className="font-bengali text-4xl font-bold text-white">ওয়েবসাইট বানান</h1>
        <p className="mt-3 text-base text-white/70">Build a Website</p>
      </section>

      {/* Client-type sections */}
      {CLIENT_TYPES.map((ct, i) => (
        <section key={i} className={`${ct.bg} py-20 px-4`}>
          <SectionWrapper className="flex flex-col gap-8 md:flex-row md:items-center md:gap-16">
            {/* Text side */}
            <div className="flex-1">
              <p lang="bn" className="font-bengali text-sm font-semibold text-brand-primary uppercase tracking-wide">
                {ct.subtitleBn}
              </p>
              <h2 lang="bn" className="font-bengali mt-2 text-2xl font-bold text-[#0F1C15] sm:text-3xl">
                {ct.headlineBn}
              </h2>
              <ul className="mt-6 flex flex-col gap-3">
                {ct.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-[#374151]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
                    <span lang="bn" className="font-bengali">{b}</span>
                  </li>
                ))}
              </ul>
              <p lang="bn" className="font-bengali mt-6 text-lg font-bold text-[#0F1C15]">{ct.price}</p>
              <a
                href={WHATSAPP_URL_WITH_MSG}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-accent px-6 py-3 text-sm font-semibold text-[#0F1C15] hover:bg-brand-accent-hover transition-colors"
              >
                <MessageCircle className="h-4 w-4 text-[#1A4731]" />
                <span lang="bn" className="font-bengali">WhatsApp করুন</span>
              </a>
            </div>
            {/* Visual side — placeholder */}
            <div className="flex-1 flex items-center justify-center">
              <div className="h-48 w-full max-w-sm rounded-2xl bg-brand-primary/10 flex items-center justify-center text-5xl">
                🌐
              </div>
            </div>
          </SectionWrapper>
        </section>
      ))}

      {/* Subcategory cards */}
      <section className="bg-[#FAFAFA] py-20 px-4">
        <SectionWrapper>
          <h2 lang="bn" className="font-bengali mb-10 text-center text-2xl font-bold text-[#0F1C15]">
            আপনার ব্যবসার ধরন বেছে নিন
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SUBCATEGORIES.map((sc) => (
              <a
                key={sc.nameBn}
                href={WHATSAPP_URL_WITH_MSG}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-[#E5E7EB] bg-white p-5 transition-shadow hover:shadow-md"
              >
                <p lang="bn" className="font-bengali font-semibold text-[#0F1C15]">{sc.nameBn}</p>
                <Badge className="bg-brand-primary text-white">{sc.price}</Badge>
              </a>
            ))}
          </div>
        </SectionWrapper>
      </section>

      <CTABanner />
    </>
  )
}
```

- [ ] **Step 2: Build and verify**

```bash
bun run build && bun run dev
```

Open `http://localhost:3000/services/website-build`. Verify: 3 alternating client-type sections (white / light / white), each with a WhatsApp CTA; subcategory cards at bottom.

- [ ] **Step 3: Commit**

```bash
git add app/services/website-build/page.tsx
git commit -m "feat: add Website Build detailed service page"
```

---

## Task 8: Portfolio page

**Files:**
- Create: `app/portfolio/page.tsx`

- [ ] **Step 1: Create `app/portfolio/page.tsx`**

The filter tabs require `useState`, so the filter component is a `"use client"` child. The page itself is a Server Component.

```tsx
// app/portfolio/page.tsx
import type { Metadata } from "next"
import { CTABanner }         from "@/components/cta-banner"
import { PortfolioGrid }     from "./portfolio-grid"

export const metadata: Metadata = {
  title: "Portfolio — ZeroD Agency",
  description: "See our real client work — websites built for local Bangladeshi businesses.",
}

export default function PortfolioPage() {
  return (
    <>
      <section className="bg-[#0D2818] py-20 text-center px-4">
        <h1 lang="bn" className="font-bengali text-4xl font-bold text-white">আমাদের কাজ</h1>
        <p className="mt-3 text-base text-white/70">Our Portfolio</p>
      </section>
      <PortfolioGrid />
      <CTABanner />
    </>
  )
}
```

- [ ] **Step 2: Create `app/portfolio/portfolio-grid.tsx`**

```tsx
"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { SectionWrapper } from "@/components/section-wrapper"

const CATEGORIES = ["All", "E-commerce", "Healthcare", "Business", "Education", "Restaurant"]

const PROJECTS = [
  { nameBn: "নওগাঁ রেস্তোরাঁ",               descBn: "রেস্তোরাঁর মেনু ও অনলাইন অর্ডার সাইট",    category: "Restaurant", icon: "🍽️", color: "bg-orange-100" },
  { nameBn: "ডাক্তার চেম্বার অ্যাপয়েন্টমেন্ট", descBn: "অ্যাপয়েন্টমেন্ট বুকিং ওয়েবসাইট",       category: "Healthcare", icon: "🏥", color: "bg-blue-100"   },
  { nameBn: "ফ্যাশন শপ",                       descBn: "কাপড় ও ফ্যাশনের অনলাইন শপ",            category: "E-commerce", icon: "👗", color: "bg-purple-100" },
  { nameBn: "কোচিং সেন্টার",                   descBn: "অনলাইন ভর্তি ও কোর্স তথ্য সাইট",       category: "Education",  icon: "📚", color: "bg-green-100"  },
  { nameBn: "গ্রোসারি মার্ট",                   descBn: "অনলাইন গ্রোসারি শপ",                    category: "E-commerce", icon: "🛒", color: "bg-yellow-100" },
  { nameBn: "ল' ফার্ম",                         descBn: "আইনি সেবার প্রফেশনাল ওয়েবসাইট",        category: "Business",   icon: "⚖️", color: "bg-slate-100"  },
]

export function PortfolioGrid() {
  const [active, setActive] = useState("All")
  const filtered = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active)

  return (
    <section className="bg-[#FAFAFA] py-20 px-4">
      <SectionWrapper>
        {/* Filter tabs */}
        <div className="mb-10 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                active === cat
                  ? "bg-brand-primary text-white"
                  : "bg-white border border-[#E5E7EB] text-[#374151] hover:border-brand-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <div
              key={p.nameBn}
              className="overflow-hidden rounded-xl border border-[#E5E7EB] bg-white transition-shadow hover:shadow-md"
            >
              <div className={`flex h-48 items-center justify-center ${p.color}`}>
                <span className="text-6xl">{p.icon}</span>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <p lang="bn" className="font-bengali font-semibold text-[#0F1C15]">{p.nameBn}</p>
                  <Badge variant="secondary" className="text-xs shrink-0">{p.category}</Badge>
                </div>
                <p lang="bn" className="font-bengali mt-2 text-sm text-[#6B7280]">{p.descBn}</p>
                <p className="mt-3 text-xs text-[#9CA3AF] italic">Placeholder — real screenshots coming soon</p>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </section>
  )
}
```

- [ ] **Step 3: Build and verify**

```bash
bun run build && bun run dev
```

Open `http://localhost:3000/portfolio`. Verify: filter tabs work (client-side), cards filter correctly, 6 placeholder cards visible on "All".

- [ ] **Step 4: Commit**

```bash
git add app/portfolio/
git commit -m "feat: add Portfolio page with client-side category filter"
```

---

## Task 9: Pricing page

**Files:**
- Create: `app/pricing/page.tsx`

- [ ] **Step 1: Create `app/pricing/page.tsx`**

```tsx
import type { Metadata } from "next"
import { Check, X, MessageCircle } from "lucide-react"
import { SectionWrapper } from "@/components/section-wrapper"
import { CTABanner }       from "@/components/cta-banner"
import { Badge }           from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { WHATSAPP_URL_WITH_MSG } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Pricing — ZeroD Agency",
  description: "Transparent website pricing for Bangladeshi businesses. Starter from ৳8,000.",
}

const YES = <Check className="mx-auto h-4 w-4 text-brand-primary" />
const NO  = <X    className="mx-auto h-4 w-4 text-[#9CA3AF]" />

const FEATURES = [
  { label: "Pages",             starter: "Up to 5",  growth: "Up to 10", pro: "Unlimited" },
  { label: "Mobile responsive", starter: YES,         growth: YES,         pro: YES          },
  { label: "WhatsApp button",   starter: YES,         growth: YES,         pro: YES          },
  { label: "E-commerce",        starter: NO,          growth: YES,         pro: YES          },
  { label: "Payment gateway",   starter: NO,          growth: YES,         pro: YES          },
  { label: "SEO",               starter: "Basic",    growth: "Standard",  pro: "Advanced"   },
  { label: "Custom features",   starter: NO,          growth: NO,          pro: YES          },
  { label: "Support",           starter: "1 month",  growth: "3 months",  pro: "6 months"   },
  { label: "Delivery",          starter: "7 days",   growth: "14 days",   pro: "21 days"    },
]

const FAQS = [
  {
    q: "কতদিনে ওয়েবসাইট পাবো?",
    a: "Starter প্যাকেজে ৭ দিন, Growth-এ ১৪ দিন, Pro-তে ২১ দিন। জটিলতা কম থাকলে আরও আগে শেষ হয়।",
  },
  {
    q: "কি কি তথ্য লাগবে?",
    a: "আপনার ব্যবসার নাম, ঠিকানা, ফোন, ছবি, এবং কী ধরনের কন্টেন্ট চান তা। বাকি কাজ আমরা করি।",
  },
  {
    q: "পেমেন্ট কিভাবে করতে হবে?",
    a: "bKash, Nagad, বা ব্যাংক ট্রান্সফারে। শুরুতে ৫০% অগ্রিম, বাকি ডেলিভারির সময়।",
  },
  {
    q: "লঞ্চের পরে কি সাপোর্ট পাবো?",
    a: "হ্যাঁ। প্রতিটি প্যাকেজে সাপোর্ট পিরিয়ড আছে। যেকোনো সমস্যায় WhatsApp করুন।",
  },
  {
    q: "কি ধরনের ব্যবসার জন্য কাজ করেন?",
    a: "রেস্তোরাঁ, ক্লিনিক, কোচিং সেন্টার, অনলাইন শপ, ফ্যাশন, সার্ভিস বিজনেস — সব ধরনের।",
  },
]

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0D2818] py-20 text-center px-4">
        <h1 lang="bn" className="font-bengali text-4xl font-bold text-white">মূল্য তালিকা</h1>
        <p className="mt-3 text-base text-white/70">Transparent Pricing</p>
      </section>

      {/* Comparison table */}
      <section className="py-20 px-4 bg-[#FAFAFA]">
        <SectionWrapper>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr>
                  <th className="pb-6 text-left font-medium text-[#6B7280]">Feature</th>
                  {[
                    { nameBn: "স্টার্টার", price: "৳8,000",  featured: false },
                    { nameBn: "গ্রোথ",    price: "৳18,000", featured: true  },
                    { nameBn: "প্রো",      price: "৳35,000", featured: false },
                  ].map((tier) => (
                    <th
                      key={tier.price}
                      className={`pb-6 text-center ${tier.featured ? "relative" : ""}`}
                    >
                      {tier.featured && (
                        <Badge className="mb-2 bg-brand-accent text-[#0F1C15] font-semibold">
                          জনপ্রিয়
                        </Badge>
                      )}
                      <p lang="bn" className="font-bengali block font-bold text-[#0F1C15] text-base">
                        {tier.nameBn}
                      </p>
                      <p className="font-bold text-xl text-[#0F1C15]">{tier.price}</p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FEATURES.map((f, i) => (
                  <tr
                    key={f.label}
                    className={i % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"}
                  >
                    <td className="py-3 pl-3 font-medium text-[#374151] rounded-l-lg">{f.label}</td>
                    {[f.starter, f.growth, f.pro].map((val, j) => (
                      <td key={j} className="py-3 text-center text-[#374151]">
                        {typeof val === "string" ? val : val}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td />
                  {[false, true, false].map((featured, i) => (
                    <td key={i} className="pt-6 text-center">
                      <a
                        href={WHATSAPP_URL_WITH_MSG}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 rounded-lg px-5 py-2 text-sm font-semibold transition-colors ${
                          featured
                            ? "bg-brand-accent text-[#0F1C15] hover:bg-brand-accent-hover"
                            : "border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
                        }`}
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        <span lang="bn" className="font-bengali">শুরু করুন</span>
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </SectionWrapper>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-white">
        <SectionWrapper className="max-w-3xl">
          <h2 lang="bn" className="font-bengali mb-10 text-center text-2xl font-bold text-[#0F1C15]">
            সাধারণ প্রশ্নাবলী
          </h2>
          <Accordion type="single" collapsible className="flex flex-col gap-2">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] px-5"
              >
                <AccordionTrigger lang="bn" className="font-bengali text-left font-semibold text-[#0F1C15]">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent lang="bn" className="font-bengali text-[#374151] leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </SectionWrapper>
      </section>

      <CTABanner />
    </>
  )
}
```

- [ ] **Step 2: Build and verify**

```bash
bun run build && bun run dev
```

Open `http://localhost:3000/pricing`. Verify: comparison table renders, Growth column has gold badge, FAQ accordion expands/collapses, WhatsApp buttons work.

- [ ] **Step 3: Commit**

```bash
git add app/pricing/page.tsx
git commit -m "feat: add Pricing page with comparison table and FAQ accordion"
```

---

## Task 10: Contact page

**Files:**
- Create: `app/contact/page.tsx`

- [ ] **Step 1: Create `app/contact/page.tsx`**

```tsx
import type { Metadata } from "next"
import { MessageCircle, Phone, Mail, MapPin } from "lucide-react"
import { SectionWrapper } from "@/components/section-wrapper"
import { WHATSAPP_URL_WITH_MSG, EMAIL, PHONE, ADDRESS, FACEBOOK_URL } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Contact — ZeroD Agency",
  description: "Get in touch with ZeroD Agency. WhatsApp, call, or fill out the form.",
}

async function handleContact(formData: FormData) {
  "use server"
  const name         = formData.get("name")         as string
  const phone        = formData.get("phone")        as string
  const businessType = formData.get("businessType") as string
  const message      = formData.get("message")      as string
  // Log for now — replace with email/notification integration before launch
  console.log("[ZeroD Contact Form]", { name, phone, businessType, message })
}

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0D2818] py-20 text-center px-4">
        <h1 lang="bn" className="font-bengali text-4xl font-bold text-white">যোগাযোগ করুন</h1>
        <p className="mt-3 text-base text-white/70">Contact Us</p>
      </section>

      <section className="py-20 px-4 bg-[#FAFAFA]">
        <SectionWrapper>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Contact form */}
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8">
              <h2 lang="bn" className="font-bengali mb-6 text-xl font-bold text-[#0F1C15]">
                মেসেজ পাঠান
              </h2>
              <form action={handleContact} className="flex flex-col gap-4">
                <div>
                  <label lang="bn" htmlFor="name" className="font-bengali mb-1.5 block text-sm font-medium text-[#374151]">
                    নাম
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="আপনার নাম"
                    lang="bn"
                    className="w-full rounded-lg border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-2.5 text-sm text-[#0F1C15] placeholder:text-[#9CA3AF] focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                  />
                </div>
                <div>
                  <label lang="bn" htmlFor="phone" className="font-bengali mb-1.5 block text-sm font-medium text-[#374151]">
                    ফোন / WhatsApp নম্বর
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+8801XXXXXXXXX"
                    className="w-full rounded-lg border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-2.5 text-sm text-[#0F1C15] placeholder:text-[#9CA3AF] focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                  />
                </div>
                <div>
                  <label lang="bn" htmlFor="businessType" className="font-bengali mb-1.5 block text-sm font-medium text-[#374151]">
                    ব্যবসার ধরন
                  </label>
                  <input
                    id="businessType"
                    name="businessType"
                    type="text"
                    placeholder="যেমন: রেস্তোরাঁ, অনলাইন শপ, ক্লিনিক…"
                    lang="bn"
                    className="w-full rounded-lg border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-2.5 text-sm text-[#0F1C15] placeholder:text-[#9CA3AF] focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                  />
                </div>
                <div>
                  <label lang="bn" htmlFor="message" className="font-bengali mb-1.5 block text-sm font-medium text-[#374151]">
                    বার্তা
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="আপনার ওয়েবসাইট নিয়ে কি ভাবছেন…"
                    lang="bn"
                    className="w-full resize-none rounded-lg border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-2.5 text-sm text-[#0F1C15] placeholder:text-[#9CA3AF] focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-surface"
                >
                  <span lang="bn" className="font-bengali">পাঠান →</span>
                </button>
              </form>
            </div>

            {/* Contact info */}
            <div className="flex flex-col gap-8">
              {/* WhatsApp CTA */}
              <a
                href={WHATSAPP_URL_WITH_MSG}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl bg-brand-accent p-6 transition-opacity hover:opacity-90"
              >
                <MessageCircle className="h-8 w-8 text-[#1A4731] shrink-0" />
                <div>
                  <p lang="bn" className="font-bengali text-base font-bold text-[#0F1C15]">
                    সরাসরি WhatsApp করুন
                  </p>
                  <p className="text-sm text-[#0F1C15]/70">{PHONE}</p>
                </div>
              </a>

              {/* Details */}
              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-4">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Phone</p>
                    <a href={`tel:${PHONE}`} className="text-sm text-[#0F1C15] hover:text-brand-primary">
                      {PHONE}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Email</p>
                    <a href={`mailto:${EMAIL}`} className="text-sm text-[#0F1C15] hover:text-brand-primary">
                      {EMAIL}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Address</p>
                    <p className="text-sm text-[#0F1C15]">{ADDRESS}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 text-lg" aria-hidden="true">f</span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Facebook</p>
                    <a
                      href={FACEBOOK_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#0F1C15] hover:text-brand-primary"
                    >
                      facebook.com/zerodagency
                    </a>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="flex h-40 items-center justify-center rounded-xl bg-[#E5E7EB] text-[#9CA3AF]">
                <span className="text-sm">📍 Naogaon, Bangladesh — map coming soon</span>
              </div>
            </div>
          </div>
        </SectionWrapper>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Build and verify**

```bash
bun run build && bun run dev
```

Open `http://localhost:3000/contact`. Verify: form renders, all fields visible, WhatsApp CTA tile (gold), contact details, map placeholder. Submit form and check console for `[ZeroD Contact Form]` log.

- [ ] **Step 3: Commit**

```bash
git add app/contact/page.tsx
git commit -m "feat: add Contact page with Server Action form"
```

---

## Task 11: Final polish and merge to main

- [ ] **Step 1: Full build check**

```bash
bun run build
```

Expected: zero TypeScript errors, zero build failures.

- [ ] **Step 2: Manual visual checklist**

Start `bun run dev` and verify each page:

| URL | Check |
|---|---|
| `/` | Hero animations fire, all 6 sections visible, floating WA button present |
| `/services` | 6 service cards, correct prices, CTA banner |
| `/services/website-build` | 3 client-type sections, 5 subcategory cards |
| `/portfolio` | Filter tabs work, 6 cards, filter correctly |
| `/pricing` | Comparison table, Growth column highlighted, FAQ accordion opens |
| `/contact` | Form submits (check console), WA CTA tile, map placeholder |
| All pages | Navbar sticky, mobile hamburger opens/closes, footer present, floating WA button |

- [ ] **Step 3: Merge to main**

```bash
git checkout main
git merge feat/zerod-agency-website --no-ff -m "feat: ZeroD Agency website — 6 pages, bilingual, WhatsApp-first"
git branch -d feat/zerod-agency-website
```

- [ ] **Step 4: Final confirmation**

```bash
bun run build
```

Expected: clean build on main.
