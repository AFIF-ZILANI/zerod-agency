import type { Metadata } from "next"
import { ContactForm } from "./contact-form"
import { ContactInfo } from "./contact-info"
import { PageHero }    from "@/components/page-hero"

export const metadata: Metadata = {
  title:       "Contact ZeroD Agency — Web Design Agency in Naogaon, Bangladesh",
  description: "Get in touch with ZeroD Agency — the web design agency based in Naogaon, Bangladesh. WhatsApp, email, or fill in the form for a free consultation on your website project.",
  keywords:    ["contact web agency Bangladesh", "website design Naogaon contact", "ZeroD Agency contact", "free website consultation Bangladesh"],
  alternates:  { canonical: "https://zerodagency.com/contact" },
  openGraph:   { url: "https://zerodagency.com/contact", title: "Contact ZeroD Agency — Web Design Agency in Naogaon, Bangladesh" },
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
