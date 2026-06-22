# ZeroD Agency — UI/UX Lift Design Spec

**Date:** 2026-06-22
**Approach:** Option A — Minimal Surgical Lift (evolve existing components in place)
**Goal:** Professional, aesthetic, minimal UI with full EN/BN language toggle

---

## 1. Language System

### Architecture
- New file: `lib/i18n.tsx` — exports `LanguageContext`, `LanguageProvider`, and `useLanguage()` hook
- New file: `lib/translations.ts` — flat `TRANSLATIONS` object with all bilingual strings, keyed as `"section.key"` (e.g. `"hero.tagline"`, `"nav.services"`)
- `t(key)` helper returned from `useLanguage()` resolves `TRANSLATIONS[lang][key]`
- Active language: `"en" | "bn"`, default `"bn"` (Bengali-first audience)
- `<html lang>` attribute updates dynamically via `document.documentElement.setAttribute('lang', language)` inside a `useEffect` in `LanguageProvider` (since `app/layout.tsx` is a Server Component)

### Toggle UI
- Pill toggle in navbar: `EN | বাং`
- Two character labels, no flags
- Positioned: right of nav links, left of WhatsApp CTA on desktop
- On mobile drawer: toggle appears at top of menu
- `aria-label` updates dynamically: `"Switch to English"` / `"বাংলায় পরিবর্তন করুন"`

### Provider placement
- `LanguageProvider` wraps children in `app/layout.tsx` (inside existing `Providers` component or alongside it)

---

## 2. Typography & Color System

### Type Scale
| Use | Class | Notes |
|-----|-------|-------|
| Hero h1 | `text-5xl sm:text-6xl md:text-7xl` | Bengali font, tight leading (`leading-[1.15]`) |
| Section h2 | `text-3xl sm:text-4xl` | + 3px orange underline accent (40px wide, centered) |
| Body Bengali | `text-base leading-7` | Bengali needs more line-height than Latin |
| Body English | `text-base leading-6` | |
| Caption/label | `text-xs tracking-widest uppercase text-muted` | Section labels, card sub-labels |

### Section Heading Pattern
All `<h2>` section headings get a decorative orange accent below:
```
[  Section Title  ]
      ━━━━          ← 3px tall, 40px wide, bg-orange, mx-auto, mt-3
```

### Color Additions
| Variable | Value | Use |
|----------|-------|-----|
| `--color-surface-alt` | `#F1F5F9` | Alternating section backgrounds (deeper than surface) |
| `--color-navy-light` | `#1E2D4A` | Card hover states, subtle borders on dark sections |
| `--color-text-muted` | `#4B5563` | Bumped from `#64748B` to pass WCAG AA (4.6:1 → 5.9:1) |

### Orange Discipline
- Orange reserved for: CTA buttons, arrow links, check icons, active states, section accent underlines
- Card borders on hover: `border-navy/20` (not `border-orange/40`)
- Icons inside cards: `bg-navy/6` container, `text-navy` color (not orange)

### Spacing
- Section padding: `py-24` (up from `py-20`)
- Content max-width: `max-w-5xl` on prose/form sections, `max-w-6xl` on grids
- Card gaps: `gap-5` (from `gap-6`)

---

## 3. Component Changes

### Navbar (`components/navbar.tsx`)
- Add `EN | বাং` pill toggle (calls `setLanguage` from `useLanguage()`)
- Scrolled state: `backdrop-blur-md bg-white/90` instead of plain `bg-white shadow-md`
- All nav link labels driven by `t("nav.*")` translations
- Mobile drawer: toggle at top, then links, then WhatsApp CTA

### Hero (`components/hero.tsx`)
- Section height: `py-32 sm:py-40`
- Background: grid opacity `0.06` (from `0.04`); add second orange blur circle bottom-left (`bg-orange/6 -bottom-20 left-0`)
- Heading: new large type scale, driven by `t("hero.tagline")`
- Trust micro-stats: one line below subtitle — `৳১৫,০০০+ থেকে শুরু · ৭ দিনে ডেলিভারি · ১০০% সন্তুষ্টি গ্যারান্টি` (bilingual, driven by `t()`)
- Buttons: driven by `t("hero.cta_whatsapp")` and `t("hero.cta_portfolio")`

### Service Cards (`components/service-cards.tsx`)
- Card styles: `bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200`
- Icon container: `bg-navy/6` with `text-navy` icon
- Orange reserved for the `→` arrow CTA at card bottom
- Section heading gets orange underline accent
- All text strings driven by `t()`

### Testimonials (`components/testimonials.tsx`)
- Quote mark: large background decoration, `text-8xl text-orange/8 absolute`
- Add `★★★★★` row in `text-orange` above each quote
- Section heading gets orange underline accent
- All text driven by `t()`

### Pricing Section (`components/pricing-section.tsx`)
- Featured card: `shadow-2xl shadow-orange/15`
- Non-featured cards: `bg-surface` background (3-level depth)
- "Popular" pill: gradient `from-orange to-orange-hover`
- Price numbers: `font-variant-numeric: tabular-nums` via inline style or utility
- All text driven by `t()`

### Footer (`components/footer.tsx`)
- Brand column: tagline shown in both languages stacked (always bilingual regardless of toggle — footer is context-setting)
- Social row: add WhatsApp icon link alongside Facebook
- Bottom bar: add `· Made with care in Naogaon 🇧🇩`
- Nav link labels driven by `t()`

### Contact Page (`app/contact/page.tsx`, `app/contact/contact-form.tsx`)
- Map placeholder: replace emoji placeholder with styled `<div>` with proper label and iframe-ready structure
- WhatsApp card: CSS pulse animation on the icon (`animate-pulse` or custom keyframe)
- Form fields: `rounded-xl`, `focus:ring-2 focus:ring-orange/30`
- All text driven by `t()`

### Portfolio Page (`app/portfolio/page.tsx`, `app/portfolio/portfolio-grid.tsx`)
- Filter pills: active = `bg-navy text-white`, inactive = `border border-slate-200 text-text-primary`
- Portfolio cards: consistent `aspect-video` image placeholder area
- All text driven by `t()`

### Service Pages (`app/services/*/page.tsx`)
- Page hero sections: consistent pattern (navy bg, large Bengali h1, English subtitle)
- All text driven by `t()`

---

## 4. Motion & Accessibility

### Motion
- `fadeUp` Framer Motion variant (already exists) extended to section headings and card grids
- Card grids use `staggerChildren` with 0.08s delay per child
- Language toggle text crossfade: 150ms opacity transition on content elements when language changes
- All animations guarded with `useReducedMotion()` from Framer Motion

### Accessibility
- `<html lang>` updates dynamically on language toggle
- All Bengali text retains `lang="bn"` attribute on the element
- Toggle button `aria-label` updates with active language
- `text-text-muted` bumped to `#4B5563` for WCAG AA compliance

### Font Loading
- No changes — Inter (English) and Hind Siliguri (Bengali) already loaded and correct

---

## 5. Files Changed

| File | Change type |
|------|-------------|
| `lib/i18n.tsx` | **New** — LanguageContext + hook |
| `lib/translations.ts` | **New** — all bilingual strings |
| `app/globals.css` | **Edit** — new color vars, type scale utilities |
| `app/layout.tsx` | **Edit** — wrap with LanguageProvider |
| `components/navbar.tsx` | **Edit** — toggle, glass blur, i18n |
| `components/hero.tsx` | **Edit** — scale, trust stats, i18n |
| `components/service-cards.tsx` | **Edit** — card style, icon colors, i18n |
| `components/testimonials.tsx` | **Edit** — stars, quote deco, i18n |
| `components/pricing-section.tsx` | **Edit** — depth, shadows, i18n |
| `components/footer.tsx` | **Edit** — bilingual brand, WA social, i18n |
| `app/contact/page.tsx` | **Edit** — map div, form style, i18n |
| `app/contact/contact-form.tsx` | **Edit** — field styles, i18n |
| `app/portfolio/page.tsx` | **Edit** — i18n |
| `app/portfolio/portfolio-grid.tsx` | **Edit** — filter pills, card layout, i18n |
| `app/services/page.tsx` | **Edit** — i18n |
| `app/services/*/page.tsx` (×3) | **Edit** — consistent hero pattern, i18n |

---

## Out of Scope

- New pages (About, Blog, Case Studies)
- Real photography / portfolio screenshots
- Backend changes (contact API unchanged)
- Dark mode
- Animation library changes
