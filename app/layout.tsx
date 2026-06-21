import type { Metadata } from "next"
import { Inter, Hind_Siliguri } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { Providers } from "@/components/providers"

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
        <main className="flex-1">
          <Providers>{children}</Providers>
        </main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  )
}
