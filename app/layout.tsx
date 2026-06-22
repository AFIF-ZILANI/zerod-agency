import type { Metadata } from "next"
import { Inter, Hind_Siliguri } from "next/font/google"
import "./globals.css"
import { Navbar }        from "@/components/navbar"
import { Footer }        from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { Providers }     from "@/components/providers"
import { LanguageProvider } from "@/lib/i18n"
import { JsonLd }        from "@/components/json-ld"

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
  metadataBase: new URL("https://zerodagency.com"),
  title: {
    default:  "ZeroD Agency — Best Website Building Agency in Bangladesh",
    template: "%s | ZeroD Agency",
  },
  description:
    "ZeroD Agency is a professional website building agency in Naogaon, Bangladesh. We design and develop websites for Bangladeshi businesses — starting from ৳15,000 with 7-day delivery.",
  keywords: [
    "best website building agency in Bangladesh",
    "web design agency Bangladesh",
    "website development company Bangladesh",
    "website design Naogaon",
    "affordable website Bangladesh",
    "ecommerce website Bangladesh",
    "web agency Rajshahi",
    "professional website Bangladesh",
    "ZeroD Agency",
  ],
  authors: [{ name: "ZeroD Agency", url: "https://zerodagency.com" }],
  openGraph: {
    type:            "website",
    locale:          "en_US",
    alternateLocale: "bn_BD",
    siteName:        "ZeroD Agency",
    images: [{
      url:    "/hero.webp",
      width:  1200,
      height: 630,
      alt:    "ZeroD Agency — Website Building Agency in Bangladesh",
    }],
  },
  twitter: { card: "summary_large_image" },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" className={`${inter.variable} ${hindSiliguri.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <JsonLd />
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
