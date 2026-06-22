import type { Metadata } from "next"
import { PageHero }      from "@/components/page-hero"
import { LegalContent }  from "@/components/legal-content"

export const metadata: Metadata = {
  title:      "Privacy Policy",
  description: "ZeroD Agency's privacy policy — how we collect, use, and protect your personal information.",
  alternates: { canonical: "https://zerodagency.com/privacy" },
}

const sections = [
  {
    heading: "1. Information We Collect",
    body: `When you contact us through our website form or WhatsApp, we may collect your name, business name, phone number, email address, and details about your project. We only collect information you voluntarily provide to us.`,
  },
  {
    heading: "2. How We Use Your Information",
    body: `We use the information you provide solely to respond to your inquiry, prepare a proposal, and deliver the services you request. We do not use your data for marketing without your consent.`,
  },
  {
    heading: "3. Data Sharing",
    body: `We do not sell, trade, or rent your personal information to third parties. We do not share your data with anyone except as required by law or with your explicit consent.`,
  },
  {
    heading: "4. Third-Party Services",
    body: `Our website uses WhatsApp (operated by Meta Platforms, Inc.) for communication. When you use our WhatsApp link, Meta's privacy policy applies. We have no control over data processed by Meta.`,
  },
  {
    heading: "5. Data Retention",
    body: `We retain your contact information and project details for up to 12 months after our last communication. After that period, your data is securely deleted unless you ask us to retain it.`,
  },
  {
    heading: "6. Cookies",
    body: `Our website does not currently use tracking cookies or analytics scripts. Basic browser behaviour (e.g. caching) is handled by your browser and Next.js, not by us.`,
  },
  {
    heading: "7. Your Rights",
    body: `You have the right to request access to, correction of, or deletion of any personal data we hold about you. To exercise these rights, email us at hello@zerodagency.com.`,
  },
  {
    heading: "8. Contact",
    body: `If you have any questions about this Privacy Policy, please contact us at hello@zerodagency.com or WhatsApp us at +8801341570410.`,
  },
  {
    heading: "9. Changes to This Policy",
    body: `We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. Continued use of our website after changes constitutes your acceptance of the updated policy.`,
  },
]

export default function PrivacyPage() {
  return (
    <>
      <PageHero headingKey="legal.privacy.heading" subtitleKey="legal.privacy.subtitle" />
      <LegalContent effectiveDate="June 22, 2026" sections={sections} />
    </>
  )
}
