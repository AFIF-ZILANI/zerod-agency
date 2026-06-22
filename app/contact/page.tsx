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
