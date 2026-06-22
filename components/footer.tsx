"use client"
import Link from "next/link"
import { Share2, Mail, Phone, MapPin } from "lucide-react"
import {
  SITE_NAME, TAGLINE_BN, EMAIL, PHONE, ADDRESS,
  FACEBOOK_URL,
} from "@/lib/constants"
import { useLanguage } from "@/lib/i18n"

const SERVICE_LINKS = [
  { labelKey: "services.build.title",    href: "/services/website-build"  },
  { labelKey: "services.redesign.title", href: "/services/redesign"       },
  { labelKey: "services.maint.title",    href: "/services/maintenance"    },
  { labelKey: "svcp.heading",            href: "/services"                },
]
const QUICK_LINKS = [
  { labelKey: "nav.portfolio", href: "/portfolio" },
  { labelKey: "nav.pricing",   href: "/pricing"   },
  { labelKey: "nav.contact",   href: "/contact"   },
]

export function Footer() {
  const { t, fontClass, language } = useLanguage()
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-1 text-xl font-bold">
              Zero<span className="text-orange">D</span>
              <span className="ml-0.5 h-1.5 w-1.5 rounded-full bg-orange" />
            </div>
            <p lang="bn" className="font-bengali mt-3 text-sm text-white/60 leading-relaxed">
              {TAGLINE_BN}
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 lang={language} className={`${fontClass} mb-4 text-xs font-semibold uppercase tracking-widest text-white/40`}>
              {t("footer.services")}
            </h3>
            <ul className="flex flex-col gap-2">
              {SERVICE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/70 hover:text-orange transition-colors">
                    <span lang={language} className={fontClass}>{t(l.labelKey)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 lang={language} className={`${fontClass} mb-4 text-xs font-semibold uppercase tracking-widest text-white/40`}>
              {t("footer.quick_links")}
            </h3>
            <ul className="flex flex-col gap-2">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/70 hover:text-orange transition-colors">
                    <span lang={language} className={fontClass}>{t(l.labelKey)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 lang={language} className={`${fontClass} mb-4 text-xs font-semibold uppercase tracking-widest text-white/40`}>
              {t("footer.contact_col")}
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                <a href={`tel:${PHONE}`} className="hover:text-white transition-colors">{PHONE}</a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                <a href={`mailto:${EMAIL}`} className="hover:text-white transition-colors">{EMAIL}</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                <span>{ADDRESS}</span>
              </li>
            </ul>
            <div className="mt-5 flex gap-3">
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-orange hover:text-white transition-colors">
                <Share2 className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/30">
          © {new Date().getFullYear()} {SITE_NAME}. {t("footer.rights")}
        </div>
      </div>
    </footer>
  )
}
