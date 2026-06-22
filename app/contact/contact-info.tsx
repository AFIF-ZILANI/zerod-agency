"use client"
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react"
import { useLanguage }  from "@/lib/i18n"
import { wa, PHONE, EMAIL, ADDRESS } from "@/lib/constants"

export function ContactInfo() {
  const { t, fontClass, language } = useLanguage()
  return (
    <div className="flex flex-col gap-6">
      <a
        href={wa(t("wa.general"))}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-5 rounded-2xl bg-[#25D366] p-6 text-white transition-opacity hover:opacity-90"
      >
        <div className="relative">
          <MessageCircle className="h-8 w-8 shrink-0" />
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-white/50 animate-ping" />
        </div>
        <div>
          <p lang={language} className={`${fontClass} text-lg font-bold`}>
            {t("contact.wa.heading")}
          </p>
          <p className="text-sm text-white/80">{PHONE}</p>
        </div>
      </a>

      <div className="flex flex-col gap-5 rounded-2xl border border-border bg-white p-6">
        {[
          { icon: Phone,  labelKey: "contact.phone_label",   val: PHONE,   href: `tel:${PHONE}`    },
          { icon: Mail,   labelKey: "contact.email_label",   val: EMAIL,   href: `mailto:${EMAIL}` },
          { icon: MapPin, labelKey: "contact.address_label", val: ADDRESS, href: undefined          },
        ].map(({ icon: Icon, labelKey, val, href }) => (
          <div key={labelKey} className="flex items-start gap-4">
            <Icon className="mt-0.5 h-5 w-5 shrink-0 text-orange" />
            <div>
              <p lang={language} className={`${fontClass} text-xs font-semibold uppercase tracking-widest text-text-muted`}>{t(labelKey)}</p>
              {href ? (
                <a href={href} className="text-sm text-text-primary transition-colors hover:text-orange">{val}</a>
              ) : (
                <p className="text-sm text-text-primary">{val}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex h-36 items-center justify-center rounded-xl border border-border bg-surface">
        <p className="text-sm text-text-muted">{t("contact.map.label")}</p>
      </div>
    </div>
  )
}
