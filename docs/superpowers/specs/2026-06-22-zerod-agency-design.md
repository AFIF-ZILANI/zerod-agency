# ZeroD Agency — Website Design Spec
**Date:** 2026-06-22
**Approach:** A — Trust-Dense, Content-Forward
**Status:** Approved, ready for implementation

---

## 1. Project Overview

**Agency name:** ZeroD Agency
**Location:** Naogaon, Bangladesh
**Tagline:** আপনার ব্যবসাকে অনলাইনে নিয়ে আসুন *(Bring your business online)*
**Target audience:** Local Bangladeshi small and mid-level businesses
**Tone:** Professional but approachable, local but modern
**Language:** Bilingual — Bengali (Hind Siliguri font) + English (Geist font) mixed naturally
**Primary CTA:** WhatsApp — placeholder number `+8801XXXXXXXXX` (swap before launch)
**WhatsApp link pattern:** `https://wa.me/8801XXXXXXXXX`

---

## 2. Color System

| Token | Value | Usage |
|---|---|---|
| `--brand-primary` | `#1A4731` | Buttons, accents, icons |
| `--brand-surface` | `#0D2818` | Hero bg, footer bg, dark sections |
| `--brand-accent` | `#F59E0B` | WhatsApp CTA buttons, highlights, borders on featured card |
| `--accent-hover` | `#D97706` | Accent button hover state |
| `--background` | `#FAFAFA` | Page background |
| `--surface` | `#FFFFFF` | Cards, navbar |
| `--text-primary` | `#0F1C15` | Body text |
| `--text-muted` | `#6B7280` | Subtext, labels |
| `--border` | `#E5E7EB` | Card borders, dividers |
| `--trust-bg` | `#1A4731` | "Why ZeroD" section bg |

**Dark mode:** Not implemented in v1. Add later if needed.

---

## 3. Typography

| Role | Font | Weight | Size (mobile → desktop) |
|---|---|---|---|
| Bengali headings / body | Hind Siliguri (Google Font) | 400, 600, 700 | 18px → 22px |
| English headings | Geist Sans (already installed) | 600, 700 | 28px → 48px |
| English body / UI | Geist Sans | 400, 500 | 15px → 16px |
| Prices / numbers | Geist Sans | 700 | 24px → 36px |

**Rule:** Bengali copy uses Hind Siliguri. English copy uses Geist. Mixed-language sentences apply both inline via `lang` attributes and font-family on `<span>` wrappers.

**Add to `layout.tsx`:**
```ts
import { Hind_Siliguri } from "next/font/google"
const hindSiliguri = Hind_Siliguri({ subsets: ["bengali"], weight: ["400","600","700"], variable: "--font-bengali" })
```

---

## 4. Logo

**Type:** SVG text mark — no external image file.

**Design:**
- `Zero` in bold Geist Sans, color `#0D2818`
- `D` in same weight, surrounded by a thin gold circle (`#F59E0B`) — suggests "zero to digital" / digital loop
- `Agency` in lighter weight (400), smaller size, spaced out below `ZeroD`
- White/inverted version for dark backgrounds (hero, footer)

**File:** `components/logo.tsx` — renders the SVG inline, accepts a `variant` prop (`"dark" | "light"`) for color switching.

---

## 5. Shared Components

### Navbar
- **Sticky** — `position: sticky; top: 0; z-index: 50`
- **Background:** white, `border-bottom: 1px solid #E5E7EB`
- **Layout:** Logo left → Nav links center/right → WhatsApp button far right
- **Nav links:** Home, Services, Portfolio, Pricing, Contact — `text-sm font-medium text-[#0F1C15] hover:text-[#1A4731]`
- **WhatsApp CTA button:** `bg-[#F59E0B] text-[#0F1C15] font-semibold rounded-lg px-4 py-2` with green WhatsApp icon (lucide `MessageCircle` or custom SVG)
- **Mobile:** hamburger icon → full-screen drawer (slide from right) with all links stacked + WhatsApp button at bottom. Client component (`"use client"`).
- **Active link:** underline in gold `#F59E0B`

### Footer
- **Background:** `#0D2818` (deep green)
- **Text:** white / muted white
- **Layout (3 columns on desktop, stacked on mobile):**
  - Left: Logo (light variant) + tagline in Bengali
  - Center: Quick links (Services, Portfolio, Pricing, Contact)
  - Right: Contact info — phone, email, "Naogaon, Rajshahi Division, Bangladesh" + social icons (Facebook, WhatsApp)
- **Bottom bar:** thin border, "© 2026 ZeroD Agency. All rights reserved." centered

### Floating WhatsApp Button
- **Position:** `fixed bottom-6 right-6 z-50`
- **Style:** gold circle (`#F59E0B`) 56×56px, green WhatsApp icon centered, subtle drop-shadow
- **Link:** `https://wa.me/8801XXXXXXXXX`
- **Client component** — lives in root layout, renders on every page

### Section Wrapper
- **Max-width:** `1200px`, auto-centered
- **Padding:** `px-4 sm:px-6 lg:px-8` horizontal, `py-16 md:py-24` vertical
- **Component:** `components/section-wrapper.tsx`

---

## 6. Page Designs

### 6.1 Homepage (`/`)

#### Hero
- **Background:** `#0D2818` full-width, min-height `100svh`
- **Content (centered, mobile-first):**
  - Logo mark (light variant, smaller)
  - Bengali headline (large, white, Hind Siliguri 700): `আপনার ব্যবসাকে অনলাইনে নিয়ে আসুন`
  - English sub-headline (Geist 600, white, smaller): "Professional websites for Bangladeshi businesses — built fast, priced fairly."
  - Two CTAs stacked on mobile, side-by-side on desktop:
    - Primary: `WhatsApp করুন 💬` → gold button, `wa.me` link
    - Secondary: `আমাদের কাজ দেখুন →` → outlined white button, links to `/portfolio`

#### Hero Animations (CSS only — no Framer Motion)
All animations use CSS keyframes defined in `globals.css`. No extra dependencies — `tw-animate-css` already installed.

1. **Staggered fade-up entrance** — each hero element fades in from `translateY(20px)` to `translateY(0)` + `opacity 0→1`, with `animation-delay` staggered 150ms per element in this order: logo → Bengali headline → English subtext → CTA buttons. Duration: 600ms ease-out per element.

2. **Breathing background gradient** — a radial glow (`rgba(245,158,11,0.08)` gold tint) centered behind the headline, animates `opacity 0.5→1→0.5` on an 8s infinite loop. Implemented as an absolutely-positioned `::before` pseudo-element on the hero section.

3. **Floating decorative ring** — large circle (400px × 400px) rendered as a CSS `border` ring (`border: 1.5px solid rgba(245,158,11,0.15)`), positioned bottom-right of the hero, animates `translateY(0) → translateY(-20px) → translateY(0)` on a 12s infinite ease-in-out loop. Purely decorative, `pointer-events: none`, `aria-hidden`.

4. **WhatsApp CTA pulse glow** — the gold primary button has a repeating `box-shadow` pulse animation (`0 0 0 0 rgba(245,158,11,0.6)` → `0 0 0 12px rgba(245,158,11,0)`) on a 2.5s infinite loop, drawing the eye to the primary action without being distracting.

**Performance note:** All four are CSS `@keyframes` — GPU-composited (`transform` + `opacity` only for 1, 3, 4). The breathing gradient uses `opacity` only. Zero JS execution on the animation path.

#### 3 Service Cards
- **Background:** `#FAFAFA`
- **Layout:** 1 col mobile → 3 col desktop
- **Each card:** white bg, `border border-[#E5E7EB]`, rounded-xl, padding 24px
  - Icon (green, 32px) — lucide icons
  - Bengali title + English subtitle
  - 1-line description
  - `"আরও জানুন →"` text link in green
- Cards:
  1. 🌐 ওয়েবসাইট বানান / Build a Website → `/services/website-build`
  2. 🔄 রিডিজাইন করুন / Redesign → `/services`
  3. 🛠️ রক্ষণাবেক্ষণ / Maintenance → `/services`

#### Why ZeroD (Trust Signals)
- **Background:** `#1A4731` (green)
- **Layout:** 2×2 grid on mobile → 4 columns on desktop
- **Each tile:** icon (gold, 28px) + Bengali title + 1-line English description, white text
  1. 🏠 স্থানীয় দল — Local Team, Naogaon-based, always reachable
  2. ✅ বাস্তব প্রজেক্ট — Real Projects, portfolio of actual client work
  3. 💰 স্বচ্ছ মূল্য — Transparent Pricing, no hidden costs
  4. 🤝 চলমান সাপোর্ট — Ongoing Support, we stay after launch

#### Portfolio Preview
- **Background:** white
- **Section title:** "আমাদের কাজ" / Our Work
- **Layout:** 1 col mobile → 3 col desktop
- **3 placeholder project cards:**
  1. "নওগাঁ রেস্তোরাঁ" — category badge: Restaurant, image placeholder (green bg with icon)
  2. "ডাক্তার চেম্বার" — category badge: Healthcare
  3. "ফ্যাশন শপ" — category badge: E-commerce
- Each card: image area, badge, title, `"দেখুন →"` link
- Below cards: `"সব কাজ দেখুন →"` button linking to `/portfolio`

#### Testimonials
- **Background:** `#FAFAFA`
- **Layout:** 1 col mobile → 2 col desktop
- **2 placeholder quotes:**
  1. "ZeroD Agency আমার ব্যবসার জন্য অসাধারণ ওয়েবসাইট বানিয়েছে। এখন অনেক নতুন কাস্টমার পাচ্ছি।" — রাহেলা বেগম, সবজি মার্ট, নওগাঁ
  2. "দাম একদম ঠিকঠাক, কাজ সময়মতো শেষ।" — করিম ভাই, করিম ট্রেডার্স, রাজশাহী
- Each card: quote mark (gold), Bengali text, name + business type in muted

#### Pricing Packages
- **Background:** white
- **Section title:** "প্যাকেজ দেখুন" / Our Packages
- **Layout:** 1 col mobile → 3 col desktop
- **3 tiers:**
  | | Starter | Growth ★ | Pro |
  |---|---|---|---|
  | Price | ৳8,000 | ৳18,000 | ৳35,000 |
  | Tagline | শুরু করুন | সবচেয়ে জনপ্রিয় | সম্পূর্ণ সমাধান |
  | Includes | Business profile site | + E-commerce, payment | + Custom features, SEO |
- Growth tier: `border-2 border-[#F59E0B]`, gold "জনপ্রিয়" badge top-right
- Each tier has WhatsApp CTA button at bottom
- `"বিস্তারিত দেখুন →"` below grid, links to `/pricing`

#### Final CTA Banner
- **Background:** `#0D2818`
- **Content:** Large Bengali headline: `"আজই শুরু করুন"`, subtext: "WhatsApp করুন — বিনামূল্যে পরামর্শ নিন", gold WhatsApp button, phone number below
- **Full width, generous padding**

---

### 6.2 Services Overview (`/services`)

- **Hero:** dark green bg, title "আমাদের সেবাসমূহ" / Our Services, short description
- **Service grid (2 col mobile → 3 col desktop), 6 cards:**
  1. Business Profile Website
  2. Online Shop / E-commerce
  3. Clinic & Healthcare Site
  4. Coaching & Education
  5. Restaurant & Food Business
  6. Redesign & Refresh
- Each card: icon (green), Bengali name, English subtitle, price "থেকে শুরু ৳X,XXX", CTA link
- Final CTA Banner (same component as homepage)

---

### 6.3 Website Build Service Page (`/services/website-build`)

**Three client-type sections** — full-width, alternating bg (white / light green tint):

**Type 1 — নতুন ব্যবসা শুরু করতে চান**
- Bengali headline: "প্রথমবার অনলাইনে আসছেন?"
- 4 bullets: Domain + hosting setup, Professional design, Contact form, Google Maps integration
- Starting price: ৳8,000
- WhatsApp CTA button

**Type 2 — Facebook এ sell করি, proper site চাই**
- Bengali headline: "Facebook পেজ থেকে নিজের ওয়েবসাইটে আসুন"
- 4 bullets: Product catalog, Order form / WhatsApp order, Facebook pixel integration, Mobile-optimized
- Starting price: ৳12,000
- WhatsApp CTA button

**Type 3 — E-commerce আছে কিন্তু ভালো না**
- Bengali headline: "আপনার শপকে আরও শক্তিশালী করুন"
- 4 bullets: Performance audit + fix, Payment gateway, Better product UI, SEO improvement
- Starting price: ৳18,000
- WhatsApp CTA button

**Subcategory cards (below client types), 5 cards:**
- Business Profile Site → ৳8,000
- Online Shop / E-commerce → ৳18,000
- Clinic & Healthcare → ৳12,000
- Coaching & Education → ৳10,000
- Restaurant & Food → ৳10,000

Final CTA Banner.

---

### 6.4 Portfolio Page (`/portfolio`)

- **Hero:** simple, white bg, title "আমাদের কাজ" / Our Work
- **Filter tabs:** All | E-commerce | Healthcare | Business | Education | Restaurant
  - Client component for tab switching
- **Project grid (1 col mobile → 2 col → 3 col), 6 placeholder cards:**
  1. নওগাঁ রেস্তোরাঁ — Restaurant — "লাইভ দেখুন →"
  2. ডাক্তার চেম্বার অ্যাপয়েন্টমেন্ট — Healthcare
  3. ফ্যাশন শপ — E-commerce
  4. কোচিং সেন্টার — Education
  5. গ্রোসারি মার্ট — E-commerce
  6. ল' ফার্ম — Business
- Each card: colored image placeholder (green bg, lucide icon), category badge (gold), project name, 1-line description, external link button
- Final CTA Banner

---

### 6.5 Pricing Page (`/pricing`)

- **Hero:** dark green bg, "মূল্য তালিকা" / Pricing
- **Full comparison table — 3 columns:**

| Feature | Starter ৳8,000 | Growth ৳18,000 | Pro ৳35,000 |
|---|---|---|---|
| Pages | Up to 5 | Up to 10 | Unlimited |
| Mobile responsive | ✅ | ✅ | ✅ |
| WhatsApp integration | ✅ | ✅ | ✅ |
| E-commerce | ❌ | ✅ | ✅ |
| Payment gateway | ❌ | ✅ | ✅ |
| SEO optimization | Basic | Standard | Advanced |
| Custom features | ❌ | ❌ | ✅ |
| Support | 1 month | 3 months | 6 months |
| Delivery | 7 days | 14 days | 21 days |

- Growth column highlighted with gold border + "সবচেয়ে জনপ্রিয়" badge
- WhatsApp CTA on each column

- **FAQ Accordion (5 questions, client component):**
  1. কতদিনে ওয়েবসাইট পাবো?
  2. কি কি তথ্য লাগবে?
  3. পেমেন্ট কিভাবে করতে হবে?
  4. লঞ্চের পরে কি সাপোর্ট পাবো?
  5. কি ধরনের ব্যবসার জন্য ওয়েবসাইট বানান?

- Final CTA Banner

---

### 6.6 Contact Page (`/contact`)

- **Hero:** simple, white bg, "যোগাযোগ করুন" / Contact Us
- **Two-column layout (stacked on mobile):**

**Left — Contact Form:**
- Fields: নাম (Name), ফোন/WhatsApp নম্বর, ব্যবসার ধরন (Business type — text), বার্তা (Message)
- Submit button: green, "পাঠান →"
- Server Action for form submission (logs to console for now, email integration later)

**Right — Contact Info:**
- WhatsApp CTA (gold, large) → `wa.me` link
- Phone number
- Email: `zerodagency@gmail.com` (placeholder)
- Address: Naogaon, Rajshahi Division, Bangladesh
- Facebook page link
- Google Maps embed placeholder (gray box with "📍 নওগাঁ, বাংলাদেশ" text for now)

---

## 7. Routing Structure

```
app/
  layout.tsx           ← root layout: fonts, Navbar, FloatingWhatsApp, Footer
  page.tsx             ← Homepage
  services/
    page.tsx           ← Services Overview
    website-build/
      page.tsx         ← Website Build Service Page
  portfolio/
    page.tsx           ← Portfolio Page
  pricing/
    page.tsx           ← Pricing Page
  contact/
    page.tsx           ← Contact Page

components/
  logo.tsx             ← SVG logo, dark/light variant
  navbar.tsx           ← Sticky nav (client component for mobile drawer)
  footer.tsx           ← Footer
  floating-whatsapp.tsx← Fixed WhatsApp button (client component)
  section-wrapper.tsx  ← Max-width centered wrapper
  ui/
    button.tsx         ← existing shadcn button (will update tokens)
    card.tsx           ← add via shadcn
    badge.tsx          ← add via shadcn
    accordion.tsx      ← add via shadcn (for FAQ)
```

---

## 8. Tech Decisions

| Decision | Choice | Reason |
|---|---|---|
| Framework | Next.js 16 App Router | Already set up |
| Styling | Tailwind v4 + CSS variables | Already set up; update tokens to brand colors |
| UI components | shadcn/ui (radix-nova) | Already installed; add Card, Badge, Accordion |
| Bengali font | Hind Siliguri via `next/font/google` | Best readability for BD mobile |
| Icons | lucide-react | Already a dependency |
| Form | Next.js Server Actions | No extra library needed for v1 |
| Animations | CSS keyframes only | Hero section: staggered fade-up, breathing gradient, floating ring, CTA pulse. GPU-composited (transform + opacity), no JS. `tw-animate-css` already installed. |
| Dark mode | Not in v1 | Skip for now |
| Image optimization | Next.js `<Image>` | Built-in, important for mobile perf |
| Portfolio images | Colored placeholder divs (CSS) | No real screenshots yet; replace later |

---

## 9. Content Placeholders (swap before launch)

- WhatsApp number: `+8801XXXXXXXXX`
- Email: `zerodagency@gmail.com`
- Portfolio images: colored placeholder divs
- Testimonial client photos: initials avatar
- Google Maps embed: gray placeholder box

---

## 10. Out of Scope (v1)

- CMS / content management
- Blog
- Dark mode
- Animations / page transitions
- Real portfolio screenshots
- Email sending from contact form (logs to console)
- Payment integration
- Multi-language toggle (both languages coexist in copy, no switcher needed)
