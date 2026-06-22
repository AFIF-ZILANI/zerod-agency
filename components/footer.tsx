"use client"
import Link from "next/link"
import { Share2, Mail, Phone, MapPin } from "lucide-react"
import {
  SITE_NAME, TAGLINE_BN, EMAIL, PHONE, ADDRESS,
  FACEBOOK_URL, GITHUB_URL,
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
const LEGAL_LINKS = [
  { labelKey: "legal.privacy.heading", href: "/privacy" },
  { labelKey: "legal.terms.heading",   href: "/terms"   },
  { labelKey: "legal.refund.heading",  href: "/refund"  },
]

export function Footer() {
  const { t, fontClass, language } = useLanguage()
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
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

          {/* Legal */}
          <div>
            <h3 lang={language} className={`${fontClass} mb-4 text-xs font-semibold uppercase tracking-widest text-white/40`}>
              {t("footer.legal")}
            </h3>
            <ul className="flex flex-col gap-2">
              {LEGAL_LINKS.map((l) => (
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
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-orange hover:text-white transition-colors"
                aria-label="Facebook">
                <Share2 className="h-4 w-4" />
              </a>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-orange hover:text-white transition-colors"
                aria-label="GitHub">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
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
