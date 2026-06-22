# SEO + Structured Data Design

**Date:** 2026-06-22
**Scope:** Option B — Technical SEO foundation + Open Graph + JSON-LD structured data
**Goal:** Rank for "best website building agency in Bangladesh" and similar queries on Google and AI chatbots (ChatGPT, Gemini, Perplexity)

---

## 1. Technical Foundation

### 1.1 `metadataBase`

Add to `app/layout.tsx` root metadata:

```ts
metadataBase: new URL("https://zerodagency.com"),
```

This is required for all OG image URLs and canonical refs to resolve correctly.

### 1.2 `app/robots.ts`

New file. Allow all bots, disallow nothing, point to sitemap:

```ts
import type { MetadataRoute } from "next"
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://zerodagency.com/sitemap.xml",
  }
}
```

### 1.3 `app/sitemap.ts`

New file. Static sitemap covering all 8 routes:

- `/` — priority 1.0, changeFrequency "weekly"
- `/services` — priority 0.9
- `/services/website-build` — priority 0.9
- `/services/redesign` — priority 0.8
- `/services/maintenance` — priority 0.8
- `/portfolio` — priority 0.7
- `/pricing` — priority 0.9
- `/contact` — priority 0.7

### 1.4 `public/site.webmanifest`

Fix empty fields:

```json
{
  "name": "ZeroD Agency",
  "short_name": "ZeroD",
  "icons": [...],
  "theme_color": "#0a1628",
  "background_color": "#ffffff",
  "display": "standalone"
}
```

---

## 2. Open Graph + Page Metadata

### 2.1 Root layout (`app/layout.tsx`)

Updated fallback metadata:

```ts
export const metadata: Metadata = {
  metadataBase: new URL("https://zerodagency.com"),
  title: {
    default: "ZeroD Agency — Best Website Building Agency in Bangladesh",
    template: "%s | ZeroD Agency",
  },
  description:
    "ZeroD Agency is a professional website building agency based in Naogaon, Bangladesh. We design and develop websites for Bangladeshi businesses — starting from ৳15,000 with 7-day delivery.",
  keywords: [
    "best website building agency in Bangladesh",
    "web design agency Bangladesh",
    "website development company Bangladesh",
    "website design Naogaon",
    "affordable website Bangladesh",
    "ecommerce website Bangladesh",
    "web agency Rajshahi",
    "ZeroD Agency",
  ],
  authors: [{ name: "ZeroD Agency", url: "https://zerodagency.com" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "bn_BD",
    siteName: "ZeroD Agency",
    images: [{ url: "/hero.webp", width: 1200, height: 630, alt: "ZeroD Agency — Website Building Agency in Bangladesh" }],
  },
  twitter: { card: "summary_large_image" },
}
```

### 2.2 Per-page metadata

Each page file gets a `metadata` export. Keyword targeting per page:

| Page | Title | Focus keywords |
|------|-------|----------------|
| `/` (home) | `Best Website Building Agency in Bangladesh — ZeroD Agency` | "best website agency Bangladesh", "website design Bangladesh" |
| `/services` | `Web Design & Development Services in Bangladesh` | "web development services Bangladesh", "website services Naogaon" |
| `/services/website-build` | `Build a Professional Website in Bangladesh — From ৳15,000` | "build website Bangladesh", "affordable website Bangladesh" |
| `/services/redesign` | `Website Redesign Service in Bangladesh` | "website redesign Bangladesh", "modernize website Bangladesh" |
| `/services/maintenance` | `Website Maintenance Service Bangladesh` | "website maintenance Bangladesh", "website support Bangladesh" |
| `/portfolio` | `Our Work — ZeroD Agency Portfolio` | "web design portfolio Bangladesh" |
| `/pricing` | `Website Pricing in Bangladesh — Transparent Packages` | "website cost Bangladesh", "website price Bangladesh" |
| `/contact` | `Contact ZeroD Agency — Web Design Agency Naogaon Bangladesh` | "web agency contact Bangladesh", "website design Naogaon" |

All pages share the same OG image (`/hero.webp`), canonical self-link, and twitter card.

---

## 3. JSON-LD Structured Data

### 3.1 Architecture

New server component: `components/json-ld.tsx`

Renders a single `<script type="application/ld+json">` tag containing a `@graph` array. Injected into `app/layout.tsx` inside `<head>` (Next.js allows this via the layout body).

No client bundle — this is a server component with no `"use client"`.

### 3.2 Schemas in `@graph`

#### A. `Organization`

```json
{
  "@type": "Organization",
  "@id": "https://zerodagency.com/#organization",
  "name": "ZeroD Agency",
  "url": "https://zerodagency.com",
  "logo": "https://zerodagency.com/android-chrome-512x512.png",
  "email": "hello@zerodagency.com",
  "telephone": "+8801341570410",
  "foundingLocation": "Naogaon, Bangladesh",
  "knowsAbout": ["web development", "website design", "ecommerce", "website maintenance", "Bangladesh business websites"],
  "sameAs": ["https://facebook.com/zerodagency"],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+8801341570410",
    "contactType": "customer service",
    "availableLanguage": ["Bengali", "English"],
    "contactOption": "TollFree"
  }
}
```

#### B. `LocalBusiness`

```json
{
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": "https://zerodagency.com/#localbusiness",
  "name": "ZeroD Agency",
  "description": "Professional website building agency in Naogaon, Bangladesh. We build, redesign, and maintain websites for Bangladeshi businesses.",
  "url": "https://zerodagency.com",
  "telephone": "+8801341570410",
  "email": "hello@zerodagency.com",
  "priceRange": "৳৳",
  "currenciesAccepted": "BDT",
  "paymentAccepted": "bKash, Nagad, Bank Transfer",
  "areaServed": {
    "@type": "Country",
    "name": "Bangladesh"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Naogaon",
    "addressRegion": "Rajshahi Division",
    "addressCountry": "BD"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 24.9167,
    "longitude": 88.7500
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday"],
    "opens": "09:00",
    "closes": "20:00"
  }
}
```

#### C. `WebSite`

```json
{
  "@type": "WebSite",
  "@id": "https://zerodagency.com/#website",
  "url": "https://zerodagency.com",
  "name": "ZeroD Agency",
  "publisher": { "@id": "https://zerodagency.com/#organization" },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://zerodagency.com/?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

#### D. `Service` nodes (3)

One for each core service. Pattern:

```json
{
  "@type": "Service",
  "name": "Website Building",
  "description": "We design and build professional websites for Bangladeshi businesses — from business profiles to ecommerce stores. Starting from ৳15,000 with 7-day delivery.",
  "provider": { "@id": "https://zerodagency.com/#organization" },
  "areaServed": { "@type": "Country", "name": "Bangladesh" },
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "BDT",
    "lowPrice": "15000",
    "highPrice": "70000"
  }
}
```

Same pattern for Redesign and Maintenance services.

#### E. `FAQPage`

5 Q&A pairs sourced from `pricing-content.tsx` FAQS array, translated to English for maximum AI indexing:

1. Q: How long does it take to build a website? A: Starter takes 7 days, Business 14 days, Custom 21+ days.
2. Q: What do I need to provide? A: Business name, address, phone, photos, and your requirements — we handle the rest.
3. Q: How do I pay? A: bKash, Nagad, or bank transfer. 50% advance, 50% on delivery.
4. Q: Is there support after launch? A: Yes — every package includes a support period. Contact us on WhatsApp anytime.
5. Q: Do I need a domain and hosting? A: Yes — we help set everything up and the cost is included in the package.

---

## 4. Files Changed / Created

| File | Action |
|------|--------|
| `app/layout.tsx` | Update metadata, add `<JsonLd />` component |
| `app/page.tsx` | Update metadata |
| `app/services/page.tsx` | Add/update metadata |
| `app/services/website-build/page.tsx` | Add/update metadata |
| `app/services/redesign/page.tsx` | Add/update metadata |
| `app/services/maintenance/page.tsx` | Add/update metadata |
| `app/portfolio/page.tsx` | Add/update metadata |
| `app/pricing/page.tsx` | Add/update metadata |
| `app/contact/page.tsx` | Add/update metadata |
| `app/robots.ts` | New file |
| `app/sitemap.ts` | New file |
| `components/json-ld.tsx` | New file |
| `public/site.webmanifest` | Fix name/short_name/theme_color |

---

## 5. Out of Scope

- Content rewrite / hero copy changes (Option C)
- `hreflang` alternate links (requires URL-based routing per language, not in scope)
- Google Search Console setup (manual step for user)
- Backlinks / off-page SEO

---

## 6. Success Criteria

- Google can crawl and index all 8 pages via sitemap
- `robots.txt` is accessible at `/robots.txt`
- All pages show correct OG preview when shared on WhatsApp/Facebook
- Google Rich Results Test passes for LocalBusiness + FAQPage schemas
- AI chatbots citing ZeroD Agency when queried about "website agency Bangladesh"
