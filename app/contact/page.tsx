import type { Metadata } from "next"
import { MessageCircle, Phone, Mail, MapPin } from "lucide-react"
import { ContactForm } from "./contact-form"
import { WA_GENERAL, PHONE, EMAIL, ADDRESS } from "@/lib/constants"

export const metadata: Metadata = {
  title:       "Contact",
  description: "Get in touch with ZeroD Agency. WhatsApp, email, or fill out the form for a free consultation.",
}

export default function ContactPage() {
  return (
    <>
      <section className="bg-navy py-20 text-center px-4">
        <h1 lang="bn" className="font-bengali text-4xl font-bold text-white">যোগাযোগ করুন</h1>
        <p className="mt-3 text-white/70">Contact Us</p>
      </section>

      <section className="bg-surface py-20 px-4">
        <div className="mx-auto max-w-6xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Form */}
            <div className="rounded-2xl border border-border bg-white p-8">
              <h2 lang="bn" className="font-bengali mb-6 text-xl font-bold text-navy">মেসেজ পাঠান</h2>
              <ContactForm />
            </div>

            {/* Info */}
            <div className="flex flex-col gap-6">
              <a href={WA_GENERAL} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-5 rounded-2xl bg-[#25D366] p-6 text-white transition-opacity hover:opacity-90">
                <MessageCircle className="h-8 w-8 shrink-0" />
                <div>
                  <p lang="bn" className="font-bengali text-lg font-bold">সরাসরি WhatsApp করুন</p>
                  <p className="text-sm text-white/80">{PHONE}</p>
                </div>
              </a>

              <div className="flex flex-col gap-5 rounded-2xl border border-border bg-white p-6">
                {[
                  { icon: Phone,  label: "Phone",   val: PHONE,   href: `tel:${PHONE}` },
                  { icon: Mail,   label: "Email",   val: EMAIL,   href: `mailto:${EMAIL}` },
                  { icon: MapPin, label: "Address", val: ADDRESS, href: undefined },
                ].map(({ icon: Icon, label, val, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-orange" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">{label}</p>
                      {href ? (
                        <a href={href} className="text-sm text-text-primary hover:text-orange transition-colors">{val}</a>
                      ) : (
                        <p className="text-sm text-text-primary">{val}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex h-36 items-center justify-center rounded-xl bg-surface border border-border text-text-muted text-sm">
                📍 Naogaon, Bangladesh — map embed coming soon
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
