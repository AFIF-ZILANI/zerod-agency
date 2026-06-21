# Graph Report - .  (2026-06-22)

## Corpus Check
- Corpus is ~10,470 words - fits in a single context window. You may not need a graph.

## Summary
- 158 nodes · 197 edges · 19 communities (10 shown, 9 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 9 edges (avg confidence: 0.88)
- Token cost: 42 input · 95 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Website Implementation Plan|Website Implementation Plan]]
- [[_COMMUNITY_shadcn Component Config|shadcn Component Config]]
- [[_COMMUNITY_Design System & Architecture|Design System & Architecture]]
- [[_COMMUNITY_Build & Dev Dependencies|Build & Dev Dependencies]]
- [[_COMMUNITY_TypeScript Compiler Config|TypeScript Compiler Config]]
- [[_COMMUNITY_Runtime Dependencies|Runtime Dependencies]]
- [[_COMMUNITY_Root Layout & Fonts|Root Layout & Fonts]]
- [[_COMMUNITY_UI Utilities & Button|UI Utilities & Button]]
- [[_COMMUNITY_Claude Code Settings|Claude Code Settings]]
- [[_COMMUNITY_Window Icon Asset|Window Icon Asset]]
- [[_COMMUNITY_Agent Instructions|Agent Instructions]]
- [[_COMMUNITY_ESLint Config|ESLint Config]]
- [[_COMMUNITY_Next.js Config|Next.js Config]]
- [[_COMMUNITY_PostCSS Config|PostCSS Config]]
- [[_COMMUNITY_File Icon Asset|File Icon Asset]]
- [[_COMMUNITY_Globe Icon Asset|Globe Icon Asset]]
- [[_COMMUNITY_Next.js Logo Asset|Next.js Logo Asset]]
- [[_COMMUNITY_Vercel Logo Asset|Vercel Logo Asset]]

## God Nodes (most connected - your core abstractions)
1. `ZeroD Agency Website Implementation Plan` - 32 edges
2. `compilerOptions` - 16 edges
3. `ZeroD Agency Website Design Spec` - 16 edges
4. `components/section-wrapper.tsx` - 11 edges
5. `lib/constants.ts` - 10 edges
6. `app/page.tsx (Homepage)` - 8 edges
7. `shadcn/ui Components (card, badge, accordion)` - 7 edges
8. `components/cta-banner.tsx` - 7 edges
9. `tailwind` - 6 edges
10. `aliases` - 6 edges

## Surprising Connections (you probably didn't know these)
- `ZeroD Agency Next.js Project` --semantically_similar_to--> `Next.js 16 App Router`  [INFERRED] [semantically similar]
  README.md → docs/superpowers/plans/2026-06-22-zerod-agency-website.md
- `Pricing Tiers (Starter / Growth / Pro)` --semantically_similar_to--> `components/home/pricing-preview.tsx`  [INFERRED] [semantically similar]
  docs/superpowers/specs/2026-06-22-zerod-agency-design.md → docs/superpowers/plans/2026-06-22-zerod-agency-website.md
- `Brand Color System` --semantically_similar_to--> `app/globals.css (brand tokens + keyframes)`  [INFERRED] [semantically similar]
  docs/superpowers/specs/2026-06-22-zerod-agency-design.md → docs/superpowers/plans/2026-06-22-zerod-agency-website.md
- `Logo Design (ZeroD text mark)` --semantically_similar_to--> `components/logo.tsx`  [INFERRED] [semantically similar]
  docs/superpowers/specs/2026-06-22-zerod-agency-design.md → docs/superpowers/plans/2026-06-22-zerod-agency-website.md
- `Typography System (Hind Siliguri + Geist)` --semantically_similar_to--> `Hind Siliguri Font (next/font/google)`  [INFERRED] [semantically similar]
  docs/superpowers/specs/2026-06-22-zerod-agency-design.md → docs/superpowers/plans/2026-06-22-zerod-agency-website.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Shared Layout Shell (Navbar + Footer + FloatingWhatsApp in RootLayout)** — plans_layout_tsx, plans_navbar_tsx, plans_footer_tsx, plans_floating_whatsapp_tsx [EXTRACTED 1.00]
- **Homepage Section Composition** — plans_page_tsx, plans_hero_tsx, plans_service_cards_tsx, plans_why_zerod_tsx, plans_portfolio_preview_tsx, plans_testimonials_tsx, plans_pricing_preview_tsx, plans_cta_banner_tsx [EXTRACTED 1.00]
- **WhatsApp-First Contact Strategy** — plans_whatsapp_cta, plans_floating_whatsapp_tsx, plans_cta_banner_tsx, plans_constants_ts [INFERRED 0.95]

## Communities (19 total, 9 thin omitted)

### Community 0 - "Website Implementation Plan"
Cohesion: 0.17
Nodes (30): ZeroD Agency Website Implementation Plan, Bun Package Manager, lib/constants.ts, app/contact/page.tsx, components/cta-banner.tsx, components/floating-whatsapp.tsx, components/footer.tsx, app/globals.css (brand tokens + keyframes) (+22 more)

### Community 1 - "shadcn Component Config"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 2 - "Design System & Architecture"
Cohesion: 0.09
Nodes (22): Bilingual Bengali/English Content Strategy, CSS Keyframe Animations (Hero Only), Next.js 16 App Router, create-next-app, next/font (Geist), ZeroD Agency Next.js Project, Vercel Deployment, ZeroD Agency Website Design Spec (+14 more)

### Community 3 - "Build & Dev Dependencies"
Cohesion: 0.10
Nodes (19): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom (+11 more)

### Community 4 - "TypeScript Compiler Config"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 5 - "Runtime Dependencies"
Cohesion: 0.18
Nodes (11): dependencies, class-variance-authority, clsx, lucide-react, next, radix-ui, react, react-dom (+3 more)

### Community 6 - "Root Layout & Fonts"
Cohesion: 0.40
Nodes (3): geistMono, geistSans, metadata

### Community 7 - "UI Utilities & Button"
Cohesion: 0.70
Nodes (3): cn(), Button(), buttonVariants

### Community 9 - "Window Icon Asset"
Cohesion: 0.67
Nodes (3): Browser Window, UI Icon Set, Window Icon

## Knowledge Gaps
- **96 isolated node(s):** `allow`, `geistSans`, `geistMono`, `metadata`, `$schema` (+91 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ZeroD Agency Website Implementation Plan` connect `Website Implementation Plan` to `Design System & Architecture`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **Why does `ZeroD Agency Website Design Spec` connect `Design System & Architecture` to `Website Implementation Plan`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Runtime Dependencies` to `Build & Dev Dependencies`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **What connects `allow`, `geistSans`, `geistMono` to the rest of the system?**
  _96 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `shadcn Component Config` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._
- **Should `Design System & Architecture` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._
- **Should `Build & Dev Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._