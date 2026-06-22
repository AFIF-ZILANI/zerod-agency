# ZeroD Agency UI/UX Lift Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate every page's visual quality and add a full EN/BN language toggle without changing site structure or backend.

**Architecture:** A `LanguageContext` (client-side React context) holds the active language and a `t(key)` resolver. All translatable strings live in `lib/translations.ts`. Shared visual primitives (`SectionHeading`, `PageHero`) centralise the new type/accent pattern. Every existing component gets `"use client"` where needed and swaps hardcoded strings for `t()` calls.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS v4, Framer Motion v12, TypeScript 5, Bun

## Global Constraints

- Never touch `lib/constants.ts` or any API route — these are out of scope
- Default language is `"bn"` (Bengali-first)
- `font-bengali` class applies only when `language === "bn"`; English text uses `font-sans` (Inter) via inheritance
- `lang` attribute on text elements must equal the active `language` value
- Section padding: `py-24` (previously `py-20`)
- Text muted color: `#4B5563` (bumped from `#64748B` for WCAG AA)
- Orange discipline: CTA buttons, arrow links, check icons, active states, section accent bars only — not card borders or icon containers
- Verify each task by running `bun run build` (catches TypeScript errors) then `bun dev` + visual check

---

## File Map

| File | Status | Responsibility |
|------|--------|----------------|
| `lib/translations.ts` | **New** | All bilingual string pairs keyed by `"section.key"` |
| `lib/i18n.tsx` | **New** | `LanguageContext`, `LanguageProvider`, `useLanguage()`, `fontClass()` |
| `app/layout.tsx` | Edit | Wrap body children with `LanguageProvider` |
| `app/globals.css` | Edit | New color vars, text-muted bump, `@layer utilities` additions |
| `components/section-heading.tsx` | **New** | Reusable h2 + orange underline accent |
| `components/page-hero.tsx` | **New** | Reusable navy hero band for all inner pages |
| `components/home-cta.tsx` | **New** | Client component for final CTA section on home page |
| `components/navbar.tsx` | Edit | Language toggle pill, glass-blur scroll state |
| `components/hero.tsx` | Edit | Larger type scale, trust micro-stats, i18n |
| `components/service-cards.tsx` | Edit | Card style lift, icon colors, i18n |
| `components/testimonials.tsx` | Edit | Stars, quote decoration, i18n |
| `components/pricing-section.tsx` | Edit | Depth shadows, popular gradient, i18n |
| `components/footer.tsx` | Edit | Bilingual brand, WA social icon, i18n |
| `app/page.tsx` | Edit | Replace inline CTA with `<HomeCTA />` |
| `app/contact/page.tsx` | Edit | Use `PageHero`, map div, i18n |
| `app/contact/contact-form.tsx` | Edit | Field styles, i18n |
| `app/portfolio/page.tsx` | Edit | Use `PageHero`, i18n |
| `app/portfolio/portfolio-grid.tsx` | Edit | Filter pill styles, card layout, i18n |
| `app/services/page.tsx` | Edit | Use `PageHero`, i18n |
| `app/services/website-build/page.tsx` | Edit | Use `PageHero`, i18n |
| `app/services/redesign/page.tsx` | Edit | Use `PageHero`, i18n |
| `app/services/maintenance/page.tsx` | Edit | Use `PageHero`, i18n |

---

## Task 1: Language Foundation

**Files:**
- Create: `lib/translations.ts`
- Create: `lib/i18n.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Produces: `useLanguage()` → `{ language: Language, setLanguage(l): void, t(key): string, fontClass: string }`
- Produces: `Language` type = `"bn" | "en"`
- Produces: `LanguageProvider` component (wraps body children in layout)

---

- [ ] **Step 1: Create `lib/translations.ts`**

```typescript
export type Language = "bn" | "en"

type TranslationMap = Record<string, string>

export const translations: Record<Language, TranslationMap> = {
  bn: {
    // Nav
    "nav.services":            "সেবাসমূহ",
    "nav.portfolio":           "আমাদের কাজ",
    "nav.pricing":             "মূল্য",
    "nav.contact":             "যোগাযোগ",
    "nav.whatsapp":            "WhatsApp",
    "nav.toggle_label":        "Switch to English",

    // Hero (home)
    "hero.tagline":            "আপনার ব্যবসাকে অনলাইনে নিয়ে আসুন",
    "hero.subtitle":           "We build websites that work for Bangladeshi businesses",
    "hero.trust":              "৳১৫,০০০+ থেকে শুরু · ৭ দিনে ডেলিভারি · ১০০% সন্তুষ্টি",
    "hero.cta_whatsapp":       "WhatsApp করুন",
    "hero.cta_portfolio":      "আমাদের কাজ দেখুন",

    // Service cards (home section)
    "services.heading":        "আমাদের সেবা",
    "services.build.title":    "ওয়েবসাইট বানান",
    "services.build.sub":      "Build a Website",
    "services.build.desc":     "আপনার business-এর জন্য professional website — ecommerce থেকে শুরু করে business profile পর্যন্ত।",
    "services.redesign.title": "রিডিজাইন করুন",
    "services.redesign.sub":   "Redesign",
    "services.redesign.desc":  "পুরনো website-কে modern, fast, এবং conversion-friendly করে তুলুন।",
    "services.maint.title":    "রক্ষণাবেক্ষণ",
    "services.maint.sub":      "Maintenance",
    "services.maint.desc":     "আপনার website সচল, secure, এবং up-to-date রাখার সম্পূর্ণ দায়িত্ব আমাদের।",
    "services.read_more":      "আরও জানুন",

    // Testimonials
    "testimonials.heading":    "আমাদের client-রা যা বলেন",

    // Pricing
    "pricing.heading":         "প্যাকেজ ও মূল্য",
    "pricing.subtitle":        "সব প্যাকেজে mobile-responsive design এবং free domain consultation অন্তর্ভুক্ত।",
    "pricing.popular":         "সবচেয়ে জনপ্রিয়",
    "pricing.s.name":          "স্টার্টার",
    "pricing.s.tagline":       "শুরু করার জন্য সেরা",
    "pricing.s.cta":           "শুরু করুন",
    "pricing.b.name":          "বিজনেস",
    "pricing.b.tagline":       "সবচেয়ে জনপ্রিয়",
    "pricing.b.cta":           "আলোচনা করুন",
    "pricing.c.name":          "কাস্টম",
    "pricing.c.tagline":       "সম্পূর্ণ সমাধান",
    "pricing.c.cta":           "কথা বলুন",

    // Home CTA
    "home.cta.heading":        "আজই শুরু করুন",
    "home.cta.sub":            "বিনামূল্যে পরামর্শের জন্য WhatsApp করুন",
    "home.cta.button":         "WhatsApp করুন",

    // Footer
    "footer.services":         "সেবাসমূহ",
    "footer.quick_links":      "দ্রুত লিঙ্ক",
    "footer.contact_col":      "যোগাযোগ",
    "footer.rights":           "সর্বস্বত্ব সংরক্ষিত",
    "footer.made":             "Made with care in Naogaon 🇧🇩",

    // Contact page
    "contact.heading":         "যোগাযোগ করুন",
    "contact.subtitle":        "Contact Us",
    "contact.form.heading":    "মেসেজ পাঠান",
    "contact.wa.heading":      "সরাসরি WhatsApp করুন",
    "contact.map.label":       "আমাদের অবস্থান — Naogaon, Bangladesh",

    // Contact form
    "form.name":               "আপনার নাম",
    "form.name_ph":            "আপনার নাম",
    "form.biz_name":           "ব্যবসার নাম",
    "form.biz_name_ph":        "ব্যবসার নাম (optional)",
    "form.biz_type":           "ব্যবসার ধরন",
    "form.budget":             "বাজেট",
    "form.message":            "বার্তা",
    "form.message_ph":         "আপনার website সম্পর্কে বলুন…",
    "form.submit":             "পাঠান",
    "form.submitting":         "পাঠানো হচ্ছে…",
    "form.success":            "আপনার message পাঠানো হয়েছে!",
    "form.success_sub":        "আমরা শীঘ্রই যোগাযোগ করবো।",
    "form.error":              "Something went wrong. Please try WhatsApp instead.",

    // Portfolio
    "portfolio.heading":       "আমাদের কাজ",
    "portfolio.subtitle":      "Our Portfolio",
    "portfolio.placeholder":   "Placeholder projects — real client screenshots আসছে শীঘ্রই",
    "portfolio.cta.heading":   "আপনার জন্যও এমন একটি বানাই?",
    "portfolio.cta.button":    "WhatsApp করুন",

    // Services page
    "svcp.heading":            "আমাদের সেবাসমূহ",
    "svcp.subtitle":           "Our Services",
    "svcp.cta.heading":        "কোন service লাগবে জানেন না?",
    "svcp.cta.sub":            "Free consultation-এর জন্য WhatsApp করুন",
    "svcp.cta.button":         "WhatsApp করুন",
    "svcp.details":            "বিস্তারিত দেখুন",
    "svcp.from":               "থেকে শুরু",

    // Website build page
    "build.heading":           "ওয়েবসাইট বানান",
    "build.subtitle":          "Build a Website",
    "build.biz_heading":       "আপনার ব্যবসার ধরন বেছে নিন",
    "build.from":              "শুরু",
    "build.wa":                "WhatsApp করুন",

    // Redesign page
    "redesign.heading":        "ওয়েবসাইট রিডিজাইন",
    "redesign.subtitle":       "Website Redesign",
    "redesign.h2":             "পুরনো website-কে নতুন জীবন দিন",
    "redesign.cta":            "Redesign নিয়ে আলোচনা করুন",

    // Maintenance page
    "maint.heading":           "ওয়েবসাইট রক্ষণাবেক্ষণ",
    "maint.subtitle":          "Website Maintenance",
    "maint.h2":                "চিন্তামুক্ত থাকুন — আমরা সামলাবো",
    "maint.sub":               "আপনি ব্যবসায় মনোযোগ দিন, website-এর দায়িত্ব আমাদের",
    "maint.start":             "শুরু করুন",

    // Shared
    "shared.whatsapp":         "WhatsApp করুন",
  },

  en: {
    // Nav
    "nav.services":            "Services",
    "nav.portfolio":           "Portfolio",
    "nav.pricing":             "Pricing",
    "nav.contact":             "Contact",
    "nav.whatsapp":            "WhatsApp",
    "nav.toggle_label":        "বাংলায় পরিবর্তন করুন",

    // Hero (home)
    "hero.tagline":            "Bring Your Business Online",
    "hero.subtitle":           "We build websites that work for Bangladeshi businesses",
    "hero.trust":              "Starting ৳15,000+ · 7-day delivery · 100% satisfaction",
    "hero.cta_whatsapp":       "WhatsApp Us",
    "hero.cta_portfolio":      "See Our Work",

    // Service cards (home section)
    "services.heading":        "Our Services",
    "services.build.title":    "Build a Website",
    "services.build.sub":      "New Website",
    "services.build.desc":     "A professional website for your business — from ecommerce to business profile.",
    "services.redesign.title": "Redesign",
    "services.redesign.sub":   "Modernize",
    "services.redesign.desc":  "Turn your outdated website into something modern, fast, and conversion-friendly.",
    "services.maint.title":    "Maintenance",
    "services.maint.sub":      "Ongoing Care",
    "services.maint.desc":     "We keep your website live, secure, and up-to-date — fully managed.",
    "services.read_more":      "Learn More",

    // Testimonials
    "testimonials.heading":    "What Our Clients Say",

    // Pricing
    "pricing.heading":         "Packages & Pricing",
    "pricing.subtitle":        "All packages include mobile-responsive design and free domain consultation.",
    "pricing.popular":         "Most Popular",
    "pricing.s.name":          "Starter",
    "pricing.s.tagline":       "Best for getting started",
    "pricing.s.cta":           "Get Started",
    "pricing.b.name":          "Business",
    "pricing.b.tagline":       "Most popular",
    "pricing.b.cta":           "Discuss",
    "pricing.c.name":          "Custom",
    "pricing.c.tagline":       "Complete solution",
    "pricing.c.cta":           "Talk to Us",

    // Home CTA
    "home.cta.heading":        "Get Started Today",
    "home.cta.sub":            "WhatsApp us for a free consultation",
    "home.cta.button":         "WhatsApp Us",

    // Footer
    "footer.services":         "Services",
    "footer.quick_links":      "Quick Links",
    "footer.contact_col":      "Contact",
    "footer.rights":           "All rights reserved",
    "footer.made":             "Made with care in Naogaon 🇧🇩",

    // Contact page
    "contact.heading":         "Contact Us",
    "contact.subtitle":        "যোগাযোগ করুন",
    "contact.form.heading":    "Send a Message",
    "contact.wa.heading":      "Chat on WhatsApp",
    "contact.map.label":       "Our Location — Naogaon, Bangladesh",

    // Contact form
    "form.name":               "Your Name",
    "form.name_ph":            "Your name",
    "form.biz_name":           "Business Name",
    "form.biz_name_ph":        "Business name (optional)",
    "form.biz_type":           "Business Type",
    "form.budget":             "Budget",
    "form.message":            "Message",
    "form.message_ph":         "Tell us about your website…",
    "form.submit":             "Send",
    "form.submitting":         "Sending…",
    "form.success":            "Your message has been sent!",
    "form.success_sub":        "We'll get back to you soon.",
    "form.error":              "Something went wrong. Please try WhatsApp instead.",

    // Portfolio
    "portfolio.heading":       "Our Portfolio",
    "portfolio.subtitle":      "আমাদের কাজ",
    "portfolio.placeholder":   "Placeholder projects — real client screenshots coming soon",
    "portfolio.cta.heading":   "Want one like this for your business?",
    "portfolio.cta.button":    "WhatsApp Us",

    // Services page
    "svcp.heading":            "Our Services",
    "svcp.subtitle":           "আমাদের সেবাসমূহ",
    "svcp.cta.heading":        "Not sure which service you need?",
    "svcp.cta.sub":            "WhatsApp us for a free consultation",
    "svcp.cta.button":         "WhatsApp Us",
    "svcp.details":            "See Details",
    "svcp.from":               "Starting from",

    // Website build page
    "build.heading":           "Build a Website",
    "build.subtitle":          "ওয়েবসাইট বানান",
    "build.biz_heading":       "Choose Your Business Type",
    "build.from":              "Starting",
    "build.wa":                "WhatsApp Us",

    // Redesign page
    "redesign.heading":        "Website Redesign",
    "redesign.subtitle":       "ওয়েবসাইট রিডিজাইন",
    "redesign.h2":             "Give Your Old Website a New Life",
    "redesign.cta":            "Discuss a Redesign",

    // Maintenance page
    "maint.heading":           "Website Maintenance",
    "maint.subtitle":          "ওয়েবসাইট রক্ষণাবেক্ষণ",
    "maint.h2":                "Stay worry-free — we'll handle it",
    "maint.sub":               "Focus on your business, we'll take care of your website",
    "maint.start":             "Get Started",

    // Shared
    "shared.whatsapp":         "WhatsApp Us",
  },
}
```

- [ ] **Step 2: Create `lib/i18n.tsx`**

```tsx
"use client"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { translations, type Language } from "./translations"

interface LanguageContextValue {
  language:    Language
  setLanguage: (l: Language) => void
  t:           (key: string) => string
  fontClass:   string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("bn")

  useEffect(() => {
    document.documentElement.setAttribute("lang", language)
  }, [language])

  const fontClass = language === "bn" ? "font-bengali" : ""

  function t(key: string): string {
    return translations[language][key] ?? key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, fontClass }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider")
  return ctx
}
```

- [ ] **Step 3: Update `app/layout.tsx` to wrap with `LanguageProvider`**

Replace the current `app/layout.tsx` with:

```tsx
import type { Metadata } from "next"
import { Inter, Hind_Siliguri } from "next/font/google"
import "./globals.css"
import { Navbar }        from "@/components/navbar"
import { Footer }        from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { Providers }     from "@/components/providers"
import { LanguageProvider } from "@/lib/i18n"

const inter = Inter({
  variable: "--font-inter-var",
  subsets:  ["latin"],
  display:  "swap",
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
    <html lang="bn" className={`${inter.variable} ${hindSiliguri.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">
            <Providers>{children}</Providers>
          </main>
          <Footer />
          <WhatsAppFloat />
        </LanguageProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 4: Verify — build check**

```bash
bun run build
```

Expected: build succeeds with no TypeScript errors. If there are import errors, check that `lib/translations.ts` and `lib/i18n.tsx` are saved correctly.

- [ ] **Step 5: Commit**

```bash
git checkout -b feat/ui-ux-lift
git add lib/translations.ts lib/i18n.tsx app/layout.tsx
git commit -m "feat: language foundation — LanguageProvider, translations, layout integration"
```

---

## Task 2: Visual Foundation

**Files:**
- Modify: `app/globals.css`
- Create: `components/section-heading.tsx`
- Create: `components/page-hero.tsx`
- Create: `components/home-cta.tsx`

**Interfaces:**
- Consumes: `useLanguage()` from `lib/i18n`
- Produces: `<SectionHeading textKey="..." />` — h2 + 3px orange bar
- Produces: `<PageHero headingKey="..." subtitleKey="..." subtextKey?="..." />` — navy hero band
- Produces: `<HomeCTA />` — final CTA section on home page

---

- [ ] **Step 1: Update `app/globals.css`**

Add the new color variables and update `--color-text-muted` inside `@theme inline`:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  /* Brand colors */
  --color-navy:         #0F172A;
  --color-navy-light:   #1E2D4A;
  --color-orange:       #F97316;
  --color-orange-hover: #EA6C0A;
  --color-surface:      #F8FAFC;
  --color-surface-alt:  #F1F5F9;
  --color-text-primary: #1E293B;
  --color-text-muted:   #4B5563;

  /* Fonts */
  --font-inter:    var(--font-inter-var);
  --font-bengali:  var(--font-hind-siliguri);
  --font-sans:     var(--font-inter-var);
  --font-mono:     ui-monospace, monospace;

  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-heading: var(--font-sans);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
}

:root {
  --brand-navy:         #0F172A;
  --brand-orange:       #F97316;
  --brand-orange-hover: #EA6C0A;
  --brand-surface:      #F8FAFC;

  --background: #FFFFFF;
  --foreground: #1E293B;
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: #0F172A;
  --primary-foreground: #FFFFFF;
  --secondary: #F8FAFC;
  --secondary-foreground: #1E293B;
  --muted: #F8FAFC;
  --muted-foreground: #4B5563;
  --accent: #F97316;
  --accent-foreground: #FFFFFF;
  --destructive: oklch(0.577 0.245 27.325);
  --border: #E2E8F0;
  --input: #E2E8F0;
  --ring: #F97316;
  --chart-1: oklch(0.87 0 0);
  --chart-2: oklch(0.556 0 0);
  --chart-3: oklch(0.439 0 0);
  --chart-4: oklch(0.371 0 0);
  --chart-5: oklch(0.269 0 0);
  --radius: 0.625rem;
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(0.87 0 0);
  --chart-2: oklch(0.556 0 0);
  --chart-3: oklch(0.439 0 0);
  --chart-4: oklch(0.371 0 0);
  --chart-5: oklch(0.269 0 0);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground font-sans antialiased;
  }
  html {
    @apply font-sans;
    scroll-behavior: smooth;
  }
}

@layer utilities {
  .font-bengali {
    font-family: var(--font-bengali), sans-serif;
  }
}
```

- [ ] **Step 2: Create `components/section-heading.tsx`**

```tsx
"use client"
import { useLanguage } from "@/lib/i18n"

interface SectionHeadingProps {
  textKey:   string
  className?: string
}

export function SectionHeading({ textKey, className = "" }: SectionHeadingProps) {
  const { t, fontClass, language } = useLanguage()
  return (
    <div className={`text-center ${className}`}>
      <h2
        lang={language}
        className={`${fontClass} text-3xl font-bold text-navy sm:text-4xl`}
      >
        {t(textKey)}
      </h2>
      <div className="mx-auto mt-3 h-[3px] w-10 rounded-full bg-orange" />
    </div>
  )
}
```

- [ ] **Step 3: Create `components/page-hero.tsx`**

```tsx
"use client"
import { useLanguage } from "@/lib/i18n"

interface PageHeroProps {
  headingKey:  string
  subtitleKey: string
  subtextKey?: string
}

export function PageHero({ headingKey, subtitleKey, subtextKey }: PageHeroProps) {
  const { t, fontClass, language } = useLanguage()
  return (
    <section className="bg-navy py-24 text-center px-4">
      <h1
        lang={language}
        className={`${fontClass} text-4xl font-bold text-white sm:text-5xl leading-tight`}
      >
        {t(headingKey)}
      </h1>
      <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-white/50">
        {t(subtitleKey)}
      </p>
      {subtextKey && (
        <p
          lang={language}
          className={`${fontClass} mx-auto mt-4 max-w-lg text-sm text-white/50`}
        >
          {t(subtextKey)}
        </p>
      )}
    </section>
  )
}
```

- [ ] **Step 4: Create `components/home-cta.tsx`**

```tsx
"use client"
import { MessageCircle } from "lucide-react"
import { WA_GENERAL }    from "@/lib/constants"
import { useLanguage }   from "@/lib/i18n"

export function HomeCTA() {
  const { t, fontClass, language } = useLanguage()
  return (
    <section className="bg-navy py-24 text-center px-4">
      <h2
        lang={language}
        className={`${fontClass} text-3xl font-bold text-white sm:text-4xl`}
      >
        {t("home.cta.heading")}
      </h2>
      <p
        lang={language}
        className={`${fontClass} mt-3 text-white/60`}
      >
        {t("home.cta.sub")}
      </p>
      <a
        href={WA_GENERAL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-orange px-8 py-4 text-base font-semibold text-white transition-all hover:bg-orange-hover"
      >
        <MessageCircle className="h-5 w-5" />
        <span lang={language} className={fontClass}>{t("home.cta.button")}</span>
      </a>
    </section>
  )
}
```

- [ ] **Step 5: Build check**

```bash
bun run build
```

Expected: build succeeds. All new components type-check correctly.

- [ ] **Step 6: Commit**

```bash
git add app/globals.css components/section-heading.tsx components/page-hero.tsx components/home-cta.tsx
git commit -m "feat: visual foundation — color vars, SectionHeading, PageHero, HomeCTA"
```

---

## Task 3: Navbar

**Files:**
- Modify: `components/navbar.tsx`

**Interfaces:**
- Consumes: `useLanguage()` from `lib/i18n`

---

- [ ] **Step 1: Replace `components/navbar.tsx`**

```tsx
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, MessageCircle } from "lucide-react"
import { WA_GENERAL }   from "@/lib/constants"
import { useLanguage }  from "@/lib/i18n"
import type { Language } from "@/lib/translations"

export function Navbar() {
  const [open,     setOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t, language, setLanguage } = useLanguage()

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

  function LanguageToggle({ className = "" }: { className?: string }) {
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
```

- [ ] **Step 2: Build check**

```bash
bun run build
```

Expected: builds cleanly.

- [ ] **Step 3: Visual check**

```bash
bun dev
```

Open `http://localhost:3000`. Verify:
- Navbar shows `বাং | EN` toggle pill, active side highlighted orange
- Clicking toggle switches nav link labels between Bengali and English
- Scrolling past 10px gives glass-blur background effect
- Mobile hamburger shows toggle at top of drawer

- [ ] **Step 4: Commit**

```bash
git add components/navbar.tsx
git commit -m "feat: navbar language toggle + glass-blur scroll state"
```

---

## Task 4: Hero

**Files:**
- Modify: `components/hero.tsx`

**Interfaces:**
- Consumes: `useLanguage()` from `lib/i18n`
- Consumes: `WA_GENERAL`, `TAGLINE_BN`, `TAGLINE_EN` (no longer used directly — replaced by `t()`)

---

- [ ] **Step 1: Replace `components/hero.tsx`**

```tsx
"use client"
import { motion, type Variants, useReducedMotion } from "framer-motion"
import Link                  from "next/link"
import { MessageCircle, ArrowRight } from "lucide-react"
import { WA_GENERAL }        from "@/lib/constants"
import { useLanguage }       from "@/lib/i18n"

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

export function Hero() {
  const { t, fontClass, language } = useLanguage()
  const reduced = useReducedMotion()

  const motionProps = (delay: number) =>
    reduced
      ? {}
      : { variants: fadeUp, initial: "hidden", animate: "visible", custom: delay }

  return (
    <section className="relative overflow-hidden bg-navy py-32 sm:py-40">
      {/* Background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Orange blur — top right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-orange/10 blur-3xl"
      />
      {/* Orange blur — bottom left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 left-0 h-[400px] w-[400px] rounded-full bg-orange/6 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <motion.h1
          lang={language}
          {...motionProps(0)}
          className={`${fontClass} text-5xl font-bold leading-[1.15] text-white sm:text-6xl md:text-7xl`}
        >
          {t("hero.tagline")}
        </motion.h1>

        <motion.p
          {...motionProps(0.15)}
          className="mx-auto mt-6 max-w-2xl text-lg text-white/70"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.p
          {...motionProps(0.22)}
          className="mt-4 text-sm text-white/40 tracking-wide"
        >
          {t("hero.trust")}
        </motion.p>

        <motion.div
          {...motionProps(0.3)}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href={WA_GENERAL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-orange px-7 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:bg-orange-hover hover:shadow-orange/30 hover:shadow-xl"
          >
            <MessageCircle className="h-5 w-5" />
            <span lang={language} className={fontClass}>{t("hero.cta_whatsapp")}</span>
          </a>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-7 py-3.5 text-base font-medium text-white transition-all hover:border-white/50 hover:bg-white/5"
          >
            <span lang={language} className={fontClass}>{t("hero.cta_portfolio")}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Build check**

```bash
bun run build
```

- [ ] **Step 3: Visual check**

```bash
bun dev
```

Open `http://localhost:3000`. Verify:
- Hero heading is visibly larger than before
- Trust stats line appears below subtitle in muted white
- Second orange blur glow visible in bottom-left of hero section
- Language toggle in navbar switches hero text between Bengali and English
- Animations play on load (or are absent in reduced-motion mode)

- [ ] **Step 4: Commit**

```bash
git add components/hero.tsx
git commit -m "feat: hero — larger type, trust stats, dual blur, i18n"
```

---

## Task 5: Home Page Sections

**Files:**
- Modify: `components/service-cards.tsx`
- Modify: `components/testimonials.tsx`
- Modify: `components/pricing-section.tsx`

**Interfaces:**
- Consumes: `useLanguage()`, `SectionHeading` from Task 2

---

- [ ] **Step 1: Replace `components/service-cards.tsx`**

```tsx
"use client"
import Link from "next/link"
import { Globe, RefreshCw, Wrench, ArrowRight } from "lucide-react"
import { useLanguage }     from "@/lib/i18n"
import { SectionHeading } from "@/components/section-heading"
import { motion, useReducedMotion } from "framer-motion"

const SERVICES = [
  { icon: Globe,     titleKey: "services.build.title",    subKey: "services.build.sub",    descKey: "services.build.desc",    href: "/services/website-build" },
  { icon: RefreshCw, titleKey: "services.redesign.title", subKey: "services.redesign.sub", descKey: "services.redesign.desc", href: "/services/redesign"       },
  { icon: Wrench,    titleKey: "services.maint.title",    subKey: "services.maint.sub",    descKey: "services.maint.desc",    href: "/services/maintenance"    },
]

export function ServiceCards() {
  const { t, fontClass, language } = useLanguage()
  const reduced = useReducedMotion()

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  }
  const item = reduced
    ? {}
    : { variants: { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } } }

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading textKey="services.heading" className="mb-12" />
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {SERVICES.map((s) => (
            <motion.div key={s.href} {...item}>
              <Link
                href={s.href}
                className="group flex h-full flex-col gap-4 rounded-xl border border-slate-100 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-slate-200 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy/6">
                  <s.icon className="h-6 w-6 text-navy" />
                </div>
                <div>
                  <p lang={language} className={`${fontClass} text-lg font-semibold text-navy`}>
                    {t(s.titleKey)}
                  </p>
                  <p className="text-xs uppercase tracking-widest text-text-muted">
                    {t(s.subKey)}
                  </p>
                </div>
                <p lang={language} className={`${fontClass} text-sm leading-7 text-text-muted`}>
                  {t(s.descKey)}
                </p>
                <span className="mt-auto flex items-center gap-1 text-sm font-medium text-orange transition-all group-hover:gap-2">
                  <span lang={language} className={fontClass}>{t("services.read_more")}</span>
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Replace `components/testimonials.tsx`**

```tsx
"use client"
import { useLanguage }    from "@/lib/i18n"
import { SectionHeading } from "@/components/section-heading"
import { motion, useReducedMotion } from "framer-motion"

const TESTIMONIALS = [
  { quote: "ZeroD Agency আমার restaurant-এর জন্য অসাধারণ website বানিয়েছে। Online order এখন অনেক বেড়ে গেছে।", name: "রাহেলা বেগম",  business: "রাহেলা'স কিচেন, নওগাঁ",          initial: "র" },
  { quote: "Facebook-এ বিক্রি করতাম, এখন নিজের website থেকে করি। Customer-রা আরো বিশ্বাস করে।",              name: "করিম ভাই",    business: "করিম ফ্যাশন হাউস, রাজশাহী",      initial: "ক" },
  { quote: "সময়মতো কাজ শেষ, দাম পরিষ্কার, support excellent। Highly recommended!",                         name: "আরিফ হোসেন", business: "আরিফ ট্রেডার্স, নওগাঁ",           initial: "আ" },
]

export function Testimonials() {
  const { language } = useLanguage()
  const reduced = useReducedMotion()

  const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }
  const item = reduced
    ? {}
    : { variants: { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } } }

  return (
    <section className="bg-surface-alt py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading textKey="testimonials.heading" className="mb-12" />
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {TESTIMONIALS.map((t) => (
            <motion.div
              key={t.name}
              {...item}
              className="relative overflow-hidden rounded-xl border border-border bg-white p-7"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-3 -left-1 font-serif text-8xl leading-none text-orange/8 select-none"
              >
                &ldquo;
              </span>
              <div className="relative">
                <div className="flex gap-0.5 text-orange" aria-label="5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-sm">★</span>
                  ))}
                </div>
                <p lang="bn" className="font-bengali mt-3 text-sm leading-7 text-text-primary">
                  {t.quote}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
                    <span lang="bn" className="font-bengali">{t.initial}</span>
                  </div>
                  <div>
                    <p lang="bn" className="font-bengali text-sm font-semibold text-navy">{t.name}</p>
                    <p lang="bn" className="font-bengali text-xs text-text-muted">{t.business}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
```

Note: Testimonial quotes are always Bengali regardless of language toggle — they are client quotes, not UI strings. The `language` import is still needed for the `SectionHeading` inside.

- [ ] **Step 3: Replace `components/pricing-section.tsx`**

```tsx
"use client"
import { Check, MessageCircle } from "lucide-react"
import { WA_GENERAL }     from "@/lib/constants"
import { useLanguage }    from "@/lib/i18n"
import { SectionHeading } from "@/components/section-heading"

const TIERS = [
  {
    nameKey:    "pricing.s.name",
    taglineKey: "pricing.s.tagline",
    price:      "৳15,000 – ৳25,000",
    features:   ["5 পেজ পর্যন্ত", "Contact form", "Basic SEO setup", "Mobile responsive", "WhatsApp integration", "1 মাস support"],
    featured:   false,
    ctaKey:     "pricing.s.cta",
  },
  {
    nameKey:    "pricing.b.name",
    taglineKey: "pricing.b.tagline",
    price:      "৳30,000 – ৳60,000",
    features:   ["10 পেজ পর্যন্ত", "CMS integration", "WhatsApp order system", "Full SEO setup", "Google Analytics", "3 মাস support"],
    featured:   true,
    ctaKey:     "pricing.b.cta",
  },
  {
    nameKey:    "pricing.c.name",
    taglineKey: "pricing.c.tagline",
    price:      "৳70,000+",
    features:   ["Ecommerce + payment", "Booking system", "Custom features", "Advanced SEO", "Priority support", "6 মাস support"],
    featured:   false,
    ctaKey:     "pricing.c.cta",
  },
]

export function PricingSection() {
  const { t, fontClass, language } = useLanguage()
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading textKey="pricing.heading" className="mb-4" />
        <p
          lang={language}
          className={`${fontClass} mb-12 mt-4 text-center text-text-muted`}
        >
          {t("pricing.subtitle")}
        </p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.nameKey}
              className={`relative flex flex-col rounded-xl border p-7 ${
                tier.featured
                  ? "border-2 border-orange shadow-2xl shadow-orange/15"
                  : "border-border bg-surface"
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-orange to-orange-hover px-4 py-1 text-xs font-bold text-white">
                  {t("pricing.popular")}
                </div>
              )}
              <p lang={language} className={`${fontClass} text-lg font-bold text-navy`}>
                {t(tier.nameKey)}
              </p>
              <p lang={language} className={`${fontClass} mt-0.5 text-xs text-text-muted`}>
                {t(tier.taglineKey)}
              </p>
              <p className="mt-4 text-2xl font-bold tabular-nums text-navy">{tier.price}</p>
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
                <span lang={language} className={fontClass}>{t(tier.ctaKey)}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Build check**

```bash
bun run build
```

- [ ] **Step 5: Visual check**

```bash
bun dev
```

Verify at `http://localhost:3000`:
- Service cards have `bg-navy/6` icon containers with navy icons (not orange)
- Cards lift with `shadow-md` on hover, no orange border
- Section headings have the 3px orange underline bar below them
- Testimonial cards show 5 stars and a large decorative quote mark
- Pricing featured card has stronger shadow, gradient badge
- Non-featured pricing cards have `bg-surface` background, creating depth
- Language toggle changes all text correctly

- [ ] **Step 6: Commit**

```bash
git add components/service-cards.tsx components/testimonials.tsx components/pricing-section.tsx
git commit -m "feat: home sections — card lift, stars, pricing depth, stagger animation, i18n"
```

---

## Task 6: Home CTA + Footer

**Files:**
- Modify: `app/page.tsx`
- Modify: `components/footer.tsx`

---

- [ ] **Step 1: Replace `app/page.tsx`**

```tsx
import type { Metadata } from "next"
import { Hero }           from "@/components/hero"
import { ServiceCards }   from "@/components/service-cards"
import { Testimonials }   from "@/components/testimonials"
import { PricingSection } from "@/components/pricing-section"
import { HomeCTA }        from "@/components/home-cta"

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
      <HomeCTA />
    </>
  )
}
```

- [ ] **Step 2: Replace `components/footer.tsx`**

```tsx
"use client"
import Link from "next/link"
import { Share2, Mail, Phone, MapPin, MessageCircle } from "lucide-react"
import { useLanguage }  from "@/lib/i18n"
import {
  SITE_NAME, TAGLINE_BN, TAGLINE_EN, EMAIL, PHONE, ADDRESS,
  FACEBOOK_URL, WA_GENERAL,
} from "@/lib/constants"

export function Footer() {
  const { t } = useLanguage()

  const SERVICE_LINKS = [
    { label: "Website Build",  href: "/services/website-build"  },
    { label: "Redesign",       href: "/services/redesign"       },
    { label: "Maintenance",    href: "/services/maintenance"    },
    { label: "All Services",   href: "/services"                },
  ]
  const QUICK_LINKS = [
    { labelKey: "nav.portfolio", href: "/portfolio" },
    { labelKey: "nav.pricing",   href: "/pricing"   },
    { labelKey: "nav.contact",   href: "/contact"   },
  ]

  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-1 text-xl font-bold">
              Zero<span className="text-orange">D</span>
              <span className="ml-0.5 h-1.5 w-1.5 rounded-full bg-orange" />
            </div>
            <p lang="bn" className="font-bengali mt-2 text-sm leading-relaxed text-white/60">
              {TAGLINE_BN}
            </p>
            <p className="mt-1 text-xs text-white/40">{TAGLINE_EN}</p>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">
              {t("footer.services")}
            </h3>
            <ul className="flex flex-col gap-2">
              {SERVICE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/70 transition-colors hover:text-orange">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">
              {t("footer.quick_links")}
            </h3>
            <ul className="flex flex-col gap-2">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/70 transition-colors hover:text-orange">
                    {t(l.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">
              {t("footer.contact_col")}
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                <a href={`tel:${PHONE}`} className="transition-colors hover:text-white">{PHONE}</a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                <a href={`mailto:${EMAIL}`} className="transition-colors hover:text-white">{EMAIL}</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                <span>{ADDRESS}</span>
              </li>
            </ul>
            <div className="mt-5 flex gap-3">
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-orange hover:text-white"
              >
                <Share2 className="h-4 w-4" />
              </a>
              <a
                href={WA_GENERAL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-[#25D366] hover:text-white"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/30">
          © {new Date().getFullYear()} {SITE_NAME}. {t("footer.rights")}. · {t("footer.made")}
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Build check**

```bash
bun run build
```

- [ ] **Step 4: Visual check**

```bash
bun dev
```

Verify:
- Home page final CTA section uses language toggle correctly
- Footer brand column shows both taglines stacked
- Footer has WhatsApp icon alongside Facebook in social row
- Bottom bar shows "Made with care in Naogaon 🇧🇩"

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx components/footer.tsx
git commit -m "feat: home CTA extracted to client component, footer bilingual brand + WA social icon"
```

---

## Task 7: Contact Page

**Files:**
- Modify: `app/contact/page.tsx`
- Modify: `app/contact/contact-form.tsx`

---

- [ ] **Step 1: Replace `app/contact/page.tsx`**

```tsx
import type { Metadata } from "next"
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react"
import { ContactForm } from "./contact-form"
import { ContactInfo } from "./contact-info"
import { PageHero }    from "@/components/page-hero"

export const metadata: Metadata = {
  title:       "Contact",
  description: "Get in touch with ZeroD Agency. WhatsApp, email, or fill out the form for a free consultation.",
}

export default function ContactPage() {
  return (
    <>
      <PageHero headingKey="contact.heading" subtitleKey="contact.subtitle" />

      <section className="bg-surface py-24 px-4">
        <div className="mx-auto max-w-6xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Create `app/contact/contact-info.tsx`** (extract info panel as client component)

```tsx
"use client"
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react"
import { useLanguage }  from "@/lib/i18n"
import { WA_GENERAL, PHONE, EMAIL, ADDRESS } from "@/lib/constants"

export function ContactInfo() {
  const { t, fontClass, language } = useLanguage()
  return (
    <div className="flex flex-col gap-6">
      <a
        href={WA_GENERAL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-5 rounded-2xl bg-[#25D366] p-6 text-white transition-opacity hover:opacity-90"
      >
        <div className="relative">
          <MessageCircle className="h-8 w-8 shrink-0" />
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-white/50 animate-ping" />
        </div>
        <div>
          <p lang={language} className={`${fontClass} text-lg font-bold`}>
            {t("contact.wa.heading")}
          </p>
          <p className="text-sm text-white/80">{PHONE}</p>
        </div>
      </a>

      <div className="flex flex-col gap-5 rounded-2xl border border-border bg-white p-6">
        {[
          { icon: Phone,  labelKey: "form.name", val: PHONE,   href: `tel:${PHONE}`,      label: "Phone"   },
          { icon: Mail,   labelKey: "form.name", val: EMAIL,   href: `mailto:${EMAIL}`,   label: "Email"   },
          { icon: MapPin, labelKey: "form.name", val: ADDRESS, href: undefined,            label: "Address" },
        ].map(({ icon: Icon, label, val, href }) => (
          <div key={label} className="flex items-start gap-4">
            <Icon className="mt-0.5 h-5 w-5 shrink-0 text-orange" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">{label}</p>
              {href ? (
                <a href={href} className="text-sm text-text-primary transition-colors hover:text-orange">{val}</a>
              ) : (
                <p className="text-sm text-text-primary">{val}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex h-36 items-center justify-center rounded-xl border border-border bg-surface">
        <p className="text-sm text-text-muted">{t("contact.map.label")}</p>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Replace `app/contact/contact-form.tsx`**

```tsx
"use client"
import { useState, FormEvent } from "react"
import { MessageCircle, Send, CheckCircle } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

const BUSINESS_TYPES = [
  "Restaurant & Food", "Online Shop / E-commerce", "Clinic & Healthcare",
  "Coaching & Education", "Business Profile Site", "NGO / Foundation", "Other",
]
const BUDGET_RANGES = [
  "Under ৳15,000", "৳15,000 – ৳50,000", "৳50,000 – ৳1,00,000", "৳1,00,000+", "Not sure yet",
]

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const { t, fontClass, language } = useLanguage()

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    try {
      const res = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(data),
      })
      if (res.ok) { setStatus("success"); form.reset() }
      else          setStatus("error")
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-border bg-white p-8 flex flex-col items-center justify-center gap-4 py-16 text-center">
        <CheckCircle className="h-12 w-12 text-orange" />
        <p lang={language} className={`${fontClass} text-xl font-bold text-navy`}>{t("form.success")}</p>
        <p lang={language} className={`${fontClass} text-text-muted`}>{t("form.success_sub")}</p>
      </div>
    )
  }

  const inputCls = "w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/30"

  return (
    <div className="rounded-2xl border border-border bg-white p-8">
      <h2 lang={language} className={`${fontClass} mb-6 text-xl font-bold text-navy`}>
        {t("contact.form.heading")}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label lang={language} htmlFor="name" className={`${fontClass} mb-1.5 block text-sm font-medium text-text-primary`}>
              {t("form.name")} <span className="text-orange">*</span>
            </label>
            <input id="name" name="name" type="text" required placeholder={t("form.name_ph")} className={inputCls} />
          </div>
          <div>
            <label lang={language} htmlFor="businessName" className={`${fontClass} mb-1.5 block text-sm font-medium text-text-primary`}>
              {t("form.biz_name")}
            </label>
            <input id="businessName" name="businessName" type="text" placeholder={t("form.biz_name_ph")} className={inputCls} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label lang={language} htmlFor="businessType" className={`${fontClass} mb-1.5 block text-sm font-medium text-text-primary`}>
              {t("form.biz_type")}
            </label>
            <select id="businessType" name="businessType" className={inputCls}>
              <option value="">Select type</option>
              {BUSINESS_TYPES.map((bt) => <option key={bt} value={bt}>{bt}</option>)}
            </select>
          </div>
          <div>
            <label lang={language} htmlFor="budgetRange" className={`${fontClass} mb-1.5 block text-sm font-medium text-text-primary`}>
              {t("form.budget")}
            </label>
            <select id="budgetRange" name="budgetRange" className={inputCls}>
              <option value="">Select budget</option>
              {BUDGET_RANGES.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label lang={language} htmlFor="message" className={`${fontClass} mb-1.5 block text-sm font-medium text-text-primary`}>
            {t("form.message")} <span className="text-orange">*</span>
          </label>
          <textarea
            id="message" name="message" rows={4} required
            placeholder={t("form.message_ph")} lang={language}
            className={`${inputCls} resize-none`}
          />
        </div>

        {status === "error" && (
          <p className="text-sm text-red-600">{t("form.error")}</p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="flex items-center justify-center gap-2 rounded-xl bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy/90 disabled:opacity-60"
        >
          <Send className="h-4 w-4" />
          <span lang={language} className={fontClass}>
            {status === "loading" ? t("form.submitting") : t("form.submit")}
          </span>
        </button>
      </form>
    </div>
  )
}
```

- [ ] **Step 4: Build check**

```bash
bun run build
```

Expected: builds cleanly. If `contact-info.tsx` isn't found, check the import path in `contact/page.tsx`.

- [ ] **Step 5: Visual check**

```bash
bun dev
```

Navigate to `http://localhost:3000/contact`. Verify:
- Page hero shows "যোগাযোগ করুন" in Bengali, "Contact Us" in English toggle
- Form fields have `rounded-xl` and orange focus ring
- WhatsApp card shows the animated ping dot on its icon
- Map div shows the location label from translations

- [ ] **Step 6: Commit**

```bash
git add app/contact/page.tsx app/contact/contact-form.tsx app/contact/contact-info.tsx
git commit -m "feat: contact page — PageHero, form field styles, WA pulse, i18n"
```

---

## Task 8: Portfolio Page

**Files:**
- Modify: `app/portfolio/page.tsx`
- Modify: `app/portfolio/portfolio-grid.tsx`

---

- [ ] **Step 1: Replace `app/portfolio/page.tsx`**

```tsx
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
```

- [ ] **Step 2: Create `app/portfolio/portfolio-cta.tsx`**

```tsx
"use client"
import { MessageCircle } from "lucide-react"
import { WA_GENERAL }    from "@/lib/constants"
import { useLanguage }   from "@/lib/i18n"

export function PortfolioCTA() {
  const { t, fontClass, language } = useLanguage()
  return (
    <section className="bg-navy py-16 text-center px-4">
      <h2 lang={language} className={`${fontClass} text-2xl font-bold text-white sm:text-3xl`}>
        {t("portfolio.cta.heading")}
      </h2>
      <a
        href={WA_GENERAL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-orange px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-hover"
      >
        <MessageCircle className="h-4 w-4" />
        <span lang={language} className={fontClass}>{t("portfolio.cta.button")}</span>
      </a>
    </section>
  )
}
```

- [ ] **Step 3: Replace `app/portfolio/portfolio-grid.tsx`**

```tsx
"use client"
import { useState }    from "react"
import { Badge }       from "@/components/ui/badge"
import { useLanguage } from "@/lib/i18n"

const CATS = ["All", "E-commerce", "Healthcare", "Business", "Education", "Restaurant"]
const PROJECTS = [
  { nameBn: "নওগাঁ রেস্তোরাঁ",                 descBn: "Restaurant menu + online order site",   cat: "Restaurant", icon: "🍽️", bg: "bg-orange-50"  },
  { nameBn: "ডাক্তার চেম্বার অ্যাপয়েন্টমেন্ট", descBn: "Appointment booking for clinic",        cat: "Healthcare", icon: "🏥", bg: "bg-blue-50"   },
  { nameBn: "ফ্যাশন শপ",                        descBn: "Online fashion store with bKash",        cat: "E-commerce", icon: "👗", bg: "bg-purple-50" },
  { nameBn: "কোচিং সেন্টার",                    descBn: "Course info + online admission",         cat: "Education",  icon: "📚", bg: "bg-green-50"  },
  { nameBn: "গ্রোসারি মার্ট",                   descBn: "Online grocery with WhatsApp orders",    cat: "E-commerce", icon: "🛒", bg: "bg-yellow-50" },
  { nameBn: "ল' ফার্ম",                          descBn: "Professional legal services website",   cat: "Business",   icon: "⚖️", bg: "bg-slate-50"  },
]

export function PortfolioGrid() {
  const [active, setActive] = useState("All")
  const { language } = useLanguage()
  const filtered = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.cat === active)

  return (
    <section className="bg-surface py-24 px-4">
      <div className="mx-auto max-w-6xl sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap gap-2">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                active === c
                  ? "bg-navy text-white shadow-sm"
                  : "border border-slate-200 bg-white text-text-primary hover:border-navy hover:text-navy"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <div
              key={p.nameBn}
              className="overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className={`flex aspect-video items-center justify-center ${p.bg}`}>
                <span className="text-6xl">{p.icon}</span>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <p lang="bn" className="font-bengali font-semibold text-navy">{p.nameBn}</p>
                  <Badge variant="secondary" className="shrink-0 text-xs">{p.cat}</Badge>
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

- [ ] **Step 4: Build check**

```bash
bun run build
```

- [ ] **Step 5: Visual check**

```bash
bun dev
```

Navigate to `http://localhost:3000/portfolio`. Verify:
- Page hero uses new `PageHero` component and responds to language toggle
- Filter pills: active = navy background, inactive = bordered
- Portfolio cards use `aspect-video` ratio for the image area
- Bottom CTA responds to language toggle

- [ ] **Step 6: Commit**

```bash
git add app/portfolio/page.tsx app/portfolio/portfolio-grid.tsx app/portfolio/portfolio-cta.tsx
git commit -m "feat: portfolio — PageHero, filter pill styles, aspect-video cards, i18n"
```

---

## Task 9: Service Pages

**Files:**
- Modify: `app/services/page.tsx`
- Modify: `app/services/website-build/page.tsx`
- Modify: `app/services/redesign/page.tsx`
- Modify: `app/services/maintenance/page.tsx`

---

- [ ] **Step 1: Replace `app/services/page.tsx`**

```tsx
import type { Metadata } from "next"
import { PageHero }      from "@/components/page-hero"
import { ServicesContent } from "./services-content"

export const metadata: Metadata = {
  title:       "Services",
  description: "Professional website services for Bangladeshi businesses — build, redesign, or maintain your online presence.",
}

export default function ServicesPage() {
  return (
    <>
      <PageHero headingKey="svcp.heading" subtitleKey="svcp.subtitle" />
      <ServicesContent />
    </>
  )
}
```

- [ ] **Step 2: Create `app/services/services-content.tsx`**

```tsx
"use client"
import Link        from "next/link"
import { Globe, RefreshCw, Wrench, ArrowRight, MessageCircle } from "lucide-react"
import { WA_GENERAL } from "@/lib/constants"
import { useLanguage } from "@/lib/i18n"

const SERVICES = [
  { icon: Globe,     titleKey: "services.build.title",    subKey: "services.build.sub",    descKey: "services.build.desc",    priceBn: "৳25,000",     priceSuffix: "svcp.from", href: "/services/website-build" },
  { icon: RefreshCw, titleKey: "services.redesign.title", subKey: "services.redesign.sub", descKey: "services.redesign.desc", priceBn: "৳15,000",     priceSuffix: "svcp.from", href: "/services/redesign"       },
  { icon: Wrench,    titleKey: "services.maint.title",    subKey: "services.maint.sub",    descKey: "services.maint.desc",    priceBn: "৳3,000/মাস", priceSuffix: "svcp.from", href: "/services/maintenance"    },
]

export function ServicesContent() {
  const { t, fontClass, language } = useLanguage()
  return (
    <>
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {SERVICES.map((s) => (
              <div key={s.href} className="rounded-xl border border-slate-100 bg-white p-8 shadow-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-navy/6">
                  <s.icon className="h-7 w-7 text-navy" />
                </div>
                <p lang={language} className={`${fontClass} mt-5 text-xl font-bold text-navy`}>{t(s.titleKey)}</p>
                <p className="mt-0.5 text-xs uppercase tracking-widest text-text-muted">{t(s.subKey)}</p>
                <p lang={language} className={`${fontClass} mt-4 text-sm leading-7 text-text-muted`}>{t(s.descKey)}</p>
                <p lang={language} className={`${fontClass} mt-4 text-base font-bold text-orange`}>
                  {s.priceBn} {t(s.priceSuffix)}
                </p>
                <Link
                  href={s.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-navy transition-colors hover:text-orange"
                >
                  <span lang={language} className={fontClass}>{t("svcp.details")}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-16 text-center px-4">
        <h2 lang={language} className={`${fontClass} text-2xl font-bold text-white`}>{t("svcp.cta.heading")}</h2>
        <p lang={language} className={`${fontClass} mt-3 text-white/70`}>{t("svcp.cta.sub")}</p>
        <a
          href={WA_GENERAL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-orange px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-hover"
        >
          <MessageCircle className="h-4 w-4" />
          <span lang={language} className={fontClass}>{t("svcp.cta.button")}</span>
        </a>
      </section>
    </>
  )
}
```

- [ ] **Step 3: Replace `app/services/redesign/page.tsx`**

```tsx
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
```

- [ ] **Step 4: Create `app/services/redesign/redesign-content.tsx`**

```tsx
"use client"
import { Check, MessageCircle } from "lucide-react"
import { wa }          from "@/lib/constants"
import { useLanguage } from "@/lib/i18n"

const WA_REDESIGN = wa("আমার website redesign করতে চাই।")

const FEATURES = [
  "Full visual redesign", "Mobile-first responsive layout",
  "Page speed optimization (Core Web Vitals)", "Modern UI/UX with conversion focus",
  "SEO structure improvement", "Content migration", "3 months post-launch support",
]

export function RedesignContent() {
  const { t, fontClass, language } = useLanguage()
  return (
    <section className="bg-white py-24 px-4">
      <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
        <h2 lang={language} className={`${fontClass} text-3xl font-bold text-navy sm:text-4xl`}>
          {t("redesign.h2")}
        </h2>
        <p lang="bn" className="font-bengali mt-4 text-lg leading-7 text-text-muted">
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
          <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">Starting price</p>
          <p className="mt-1 text-3xl font-bold tabular-nums text-navy">৳15,000</p>
          <p className="mt-1 text-sm text-text-muted">Final price depends on site size and complexity</p>
        </div>

        <a
          href={WA_REDESIGN}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-orange px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-orange-hover"
        >
          <MessageCircle className="h-4 w-4" />
          <span lang={language} className={fontClass}>{t("redesign.cta")}</span>
        </a>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Replace `app/services/maintenance/page.tsx`**

```tsx
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
```

- [ ] **Step 6: Create `app/services/maintenance/maintenance-content.tsx`**

```tsx
"use client"
import { Check, MessageCircle } from "lucide-react"
import { wa }          from "@/lib/constants"
import { useLanguage } from "@/lib/i18n"
import { SectionHeading } from "@/components/section-heading"

const WA_MAINTENANCE = wa("আমার website maintenance দরকার।")

const PLANS = [
  { name: "Basic",    price: "৳3,000/মাস", features: ["Monthly updates", "Security monitoring", "Uptime monitoring", "Email support"] },
  { name: "Standard", price: "৳5,000/মাস", features: ["Weekly updates", "Security + malware removal", "Speed optimization", "Priority support", "Monthly report"] },
  { name: "Premium",  price: "৳9,000/মাস", features: ["Unlimited updates", "Daily backups", "Performance tuning", "24/7 support", "Content updates included"] },
]

export function MaintenanceContent() {
  const { t, fontClass, language } = useLanguage()
  return (
    <section className="bg-surface py-24 px-4">
      <div className="mx-auto max-w-6xl sm:px-6 lg:px-8">
        <SectionHeading textKey="maint.h2" className="mb-4" />
        <p lang={language} className={`${fontClass} mb-12 text-center text-text-muted`}>
          {t("maint.sub")}
        </p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {PLANS.map((plan) => (
            <div key={plan.name} className="rounded-xl border border-slate-100 bg-white p-7 shadow-sm">
              <p className="text-lg font-bold text-navy">{plan.name}</p>
              <p className="mt-1 text-2xl font-bold tabular-nums text-orange">{plan.price}</p>
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
                className="mt-6 flex items-center justify-center gap-2 rounded-lg border border-navy py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
              >
                <MessageCircle className="h-4 w-4" />
                <span lang={language} className={fontClass}>{t("maint.start")}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 7: Replace `app/services/website-build/page.tsx`**

```tsx
import type { Metadata }      from "next"
import { PageHero }           from "@/components/page-hero"
import { WebsiteBuildContent } from "./website-build-content"

export const metadata: Metadata = {
  title:       "Website Build",
  description: "Build a professional website for your Bangladeshi business. Ecommerce, business profile, and more — starting from ৳25,000.",
}

export default function WebsiteBuildPage() {
  return (
    <>
      <PageHero headingKey="build.heading" subtitleKey="build.subtitle" />
      <WebsiteBuildContent />
    </>
  )
}
```

- [ ] **Step 8: Create `app/services/website-build/website-build-content.tsx`**

```tsx
"use client"
import { Check, MessageCircle } from "lucide-react"
import { WA_BUILD_NEW, WA_BUILD_FB, WA_BUILD_EXIST, waForBusiness } from "@/lib/constants"
import { useLanguage } from "@/lib/i18n"
import { SectionHeading } from "@/components/section-heading"

const SCENARIOS = [
  { bg: "bg-white",   labelBn: "নতুন ব্যবসা",        headlineBn: "নতুন ব্যবসা শুরু করছেন?",                       subtextBn: "আপনার idea কে আমরা পূর্ণ online store এ রূপ দেবো",               features: ["Full store setup", "Payment gateway (bKash / Nagad / ShurjoPay)", "Product catalog", "Mobile-first design", "Order management"],                   price: "৳50,000", waUrl: WA_BUILD_NEW  },
  { bg: "bg-surface", labelBn: "Facebook Seller",    headlineBn: "Facebook এ sell করেন? এবার নিজের website নিন", subtextBn: "আরো professional, আরো বিশ্বস্ত — আপনার brand আপনার নিজের",       features: ["Professional store", "Product migration", "bKash integration", "Order system", "Facebook / Instagram connection"],                             price: "৳35,000", waUrl: WA_BUILD_FB   },
  { bg: "bg-white",   labelBn: "Existing Ecommerce", headlineBn: "আপনার site এ visitor আসে কিন্তু buy করে না?",  subtextBn: "আমরা আপনার store কে conversion machine এ পরিণত করবো",           features: ["Speed optimization", "UX / conversion fix", "Payment upgrade", "Mobile experience", "Redesign option"],                                       price: "৳25,000", waUrl: WA_BUILD_EXIST },
]

const BIZ_TYPES = [
  { nameBn: "বিজনেস প্রোফাইল সাইট",    nameEn: "Business Profile Site",   type: "Business Profile Site"  },
  { nameBn: "অনলাইন শপ / ই-কমার্স",    nameEn: "Online Shop / E-commerce", type: "Online Shop"           },
  { nameBn: "ক্লিনিক ও স্বাস্থ্যসেবা", nameEn: "Clinic & Healthcare",     type: "Clinic & Healthcare"    },
  { nameBn: "কোচিং ও শিক্ষা",           nameEn: "Coaching & Education",    type: "Coaching & Education"   },
  { nameBn: "রেস্তোরাঁ ও খাবার",        nameEn: "Restaurant & Food",       type: "Restaurant & Food"      },
  { nameBn: "এনজিও / ফাউন্ডেশন",       nameEn: "NGO / Foundation",        type: "NGO / Foundation"       },
]

export function WebsiteBuildContent() {
  const { t, fontClass, language } = useLanguage()
  return (
    <>
      {SCENARIOS.map((s, i) => (
        <section key={i} className={`${s.bg} py-24 px-4`}>
          <div className="mx-auto max-w-6xl sm:px-6 lg:px-8">
            <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-16">
              <div className="flex-1">
                <span lang="bn" className="font-bengali inline-block rounded-full bg-orange/10 px-3 py-1 text-xs font-semibold text-orange">
                  {s.labelBn}
                </span>
                <h2 lang="bn" className="font-bengali mt-4 text-2xl font-bold text-navy sm:text-3xl">
                  {s.headlineBn}
                </h2>
                <p lang="bn" className="font-bengali mt-3 leading-7 text-text-muted">{s.subtextBn}</p>
                <ul className="mt-6 flex flex-col gap-2.5">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-text-primary">
                      <Check className="h-4 w-4 shrink-0 text-orange" />
                      {f}
                    </li>
                  ))}
                </ul>
                <p lang="bn" className="font-bengali mt-6 text-xl font-bold text-navy">
                  {t("build.from")} {s.price} থেকে
                </p>
                <a href={s.waUrl} target="_blank" rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-hover">
                  <MessageCircle className="h-4 w-4" />
                  <span lang={language} className={fontClass}>{t("build.wa")}</span>
                </a>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="flex aspect-video w-full max-w-sm items-center justify-center rounded-2xl border border-orange/10 bg-orange/5 text-6xl">
                  {i === 0 ? "🚀" : i === 1 ? "📱" : "⚡"}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="bg-surface py-24 px-4">
        <div className="mx-auto max-w-6xl sm:px-6 lg:px-8">
          <SectionHeading textKey="build.biz_heading" className="mb-10" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BIZ_TYPES.map((b) => (
              <a
                key={b.type}
                href={waForBusiness(b.type)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border border-border bg-white p-5 transition-all hover:border-orange/40 hover:shadow-md"
              >
                <div>
                  <p lang="bn" className="font-bengali font-semibold text-navy">{b.nameBn}</p>
                  <p className="text-xs text-text-muted">{b.nameEn}</p>
                </div>
                <MessageCircle className="h-5 w-5 text-text-muted transition-colors group-hover:text-orange" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 9: Final build check**

```bash
bun run build
```

Expected: clean build, no TypeScript errors across all 22 files.

- [ ] **Step 10: Full visual walkthrough**

```bash
bun dev
```

Walk through every page and toggle `EN | বাং` on each:
- `/` — hero, services, testimonials, pricing, CTA all switch
- `/services` — page hero + service cards switch
- `/services/website-build` — page hero switches; scenario sections stay Bengali (intentional — they're client quotes/scenarios)
- `/services/redesign` — page hero + CTA switch
- `/services/maintenance` — page hero + plan CTA switch
- `/portfolio` — page hero + filter labels + CTA switch
- `/contact` — page hero + form labels + WA heading switch

- [ ] **Step 11: Commit**

```bash
git add app/services/page.tsx app/services/services-content.tsx \
        app/services/redesign/page.tsx app/services/redesign/redesign-content.tsx \
        app/services/maintenance/page.tsx app/services/maintenance/maintenance-content.tsx \
        app/services/website-build/page.tsx app/services/website-build/website-build-content.tsx
git commit -m "feat: all service pages — PageHero, content components, i18n"
```

---

## Task 10: Merge to Main

- [ ] **Step 1: Final build + lint**

```bash
bun run build && bun run lint
```

Expected: no errors, no warnings.

- [ ] **Step 2: Merge feature branch**

```bash
git checkout main
git merge feat/ui-ux-lift --no-ff -m "feat: UI/UX lift — language toggle, visual refinements, all pages"
git branch -d feat/ui-ux-lift
```

---

## Self-Review

**Spec coverage:**
- ✅ Language toggle (EN/বাং) in navbar — Task 3
- ✅ `LanguageContext`, `t()`, `fontClass` — Task 1
- ✅ `<html lang>` updates via `useEffect` — Task 1
- ✅ Typography scale enlarged — Tasks 4, 2 (PageHero)
- ✅ Section heading orange underline accent — Task 2 `SectionHeading`
- ✅ `--color-text-muted` bumped to `#4B5563` — Task 2 globals.css
- ✅ `--color-surface-alt` + `--color-navy-light` added — Task 2
- ✅ Orange discipline (icons navy, hover border not orange) — Tasks 5, 9
- ✅ Trust micro-stats in hero — Task 4
- ✅ Glass-blur navbar on scroll — Task 3
- ✅ Testimonial stars + quote deco — Task 5
- ✅ Pricing depth (featured shadow-2xl, non-featured bg-surface, gradient badge) — Task 5
- ✅ Footer bilingual tagline + WA social icon — Task 6
- ✅ Contact form `rounded-xl`, orange focus ring — Task 7
- ✅ WA card pulse animation — Task 7
- ✅ Portfolio filter pills (navy active) + `aspect-video` cards — Task 8
- ✅ `useReducedMotion()` guard on animations — Tasks 4, 5
- ✅ `staggerChildren` on card grids — Task 5
- ✅ All service pages use consistent `PageHero` — Task 9

**Placeholders:** None.

**Type consistency:** `Language` type from `lib/translations.ts` is re-exported via `lib/i18n.tsx`. `fontClass` is a `string` throughout. `t(key: string): string` used uniformly. `useLanguage()` always returns `{ language, setLanguage, t, fontClass }`.
