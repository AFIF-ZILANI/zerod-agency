const BASE = "https://zerodagency.com"

const graph = [
  {
    "@type": "Organization",
    "@id": `${BASE}/#organization`,
    name: "ZeroD Agency",
    url: BASE,
    logo: `${BASE}/android-chrome-512x512.png`,
    email: "hello@zerodagency.com",
    telephone: "+8801341570410",
    foundingLocation: "Naogaon, Bangladesh",
    knowsAbout: [
      "web development",
      "website design",
      "ecommerce website",
      "website maintenance",
      "website redesign",
      "Bangladeshi business websites",
    ],
    sameAs: ["https://facebook.com/zerodagency", "https://github.com/zerodagencies"],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+8801341570410",
      contactType: "customer service",
      availableLanguage: ["Bengali", "English"],
    },
  },
  {
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${BASE}/#localbusiness`,
    name: "ZeroD Agency",
    description:
      "ZeroD Agency is a professional website building agency based in Naogaon, Bangladesh. We design, build, redesign, and maintain websites for Bangladeshi businesses — starting from ৳15,000 with 7-day delivery.",
    url: BASE,
    telephone: "+8801341570410",
    email: "hello@zerodagency.com",
    priceRange: "৳৳",
    currenciesAccepted: "BDT",
    paymentAccepted: "bKash, Nagad, Bank Transfer",
    areaServed: { "@type": "Country", name: "Bangladesh" },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Naogaon",
      addressRegion: "Rajshahi Division",
      addressCountry: "BD",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 24.9167,
      longitude: 88.75,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "09:00",
      closes: "20:00",
    },
  },
  {
    "@type": "WebSite",
    "@id": `${BASE}/#website`,
    url: BASE,
    name: "ZeroD Agency",
    publisher: { "@id": `${BASE}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@type": "Service",
    name: "Website Building",
    description:
      "We design and build professional websites for Bangladeshi businesses — from business profiles to full ecommerce stores. Starter package from ৳15,000 with 7-day delivery.",
    provider: { "@id": `${BASE}/#organization` },
    areaServed: { "@type": "Country", name: "Bangladesh" },
    url: `${BASE}/services/website-build`,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "BDT",
      lowPrice: "15000",
      highPrice: "70000",
    },
  },
  {
    "@type": "Service",
    name: "Website Redesign",
    description:
      "Turn your outdated website into a modern, fast, and conversion-focused digital presence. We redesign existing websites for Bangladeshi businesses.",
    provider: { "@id": `${BASE}/#organization` },
    areaServed: { "@type": "Country", name: "Bangladesh" },
    url: `${BASE}/services/redesign`,
  },
  {
    "@type": "Service",
    name: "Website Maintenance",
    description:
      "Keep your website live, secure, and up-to-date with ZeroD Agency's fully managed maintenance packages for Bangladeshi businesses.",
    provider: { "@id": `${BASE}/#organization` },
    areaServed: { "@type": "Country", name: "Bangladesh" },
    url: `${BASE}/services/maintenance`,
  },
  {
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How long does it take to build a website?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Starter websites are delivered in 7 days, Business packages in 14 days, and Custom projects in 21+ days. Simple projects may be delivered even faster.",
        },
      },
      {
        "@type": "Question",
        name: "What do I need to provide to get started?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We need your business name, address, phone number, photos, and your requirements. We handle everything else.",
        },
      },
      {
        "@type": "Question",
        name: "How do I pay for a website from ZeroD Agency?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We accept bKash, Nagad, and bank transfer. Payment is split 50% in advance and 50% on delivery.",
        },
      },
      {
        "@type": "Question",
        name: "Is there support after the website launches?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — every package includes a support period (1 month for Starter, 3 months for Business, 6 months for Custom). Contact us on WhatsApp anytime.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to buy a domain and hosting separately?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, but we help you set everything up. Domain and hosting costs are included in your package.",
        },
      },
    ],
  },
]

const data = { "@context": "https://schema.org", "@graph": graph }

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
