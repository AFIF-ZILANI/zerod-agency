import type { Metadata } from "next"
import { PageHero }      from "@/components/page-hero"
import { LegalContent }  from "@/components/legal-content"

export const metadata: Metadata = {
  title:      "Terms & Conditions",
  description: "ZeroD Agency's terms and conditions — the agreement between you and us when you use our services.",
  alternates: { canonical: "https://zerodagency.com/terms" },
}

const sections = [
  {
    heading: "1. Agreement",
    body: `By engaging ZeroD Agency for website design or development services, you agree to these Terms & Conditions. These terms govern all projects between ZeroD Agency ("we", "us") and you ("the client").`,
  },
  {
    heading: "2. Services",
    body: `We provide website design, development, redesign, and maintenance services as described in your chosen package or custom proposal. The full scope of work is agreed before any project begins.`,
  },
  {
    heading: "3. Payment",
    body: `Payment is split 50% advance before work begins and 50% upon delivery. We accept bKash, Nagad, and bank transfer. Work does not start until the advance payment is received. Prices are in Bangladeshi Taka (BDT).`,
  },
  {
    heading: "4. Client Responsibilities",
    body: `You agree to provide all required content — text, images, logos, and any other assets — within 7 days of project start. Delays in providing content may extend the delivery timeline proportionally. We are not responsible for delays caused by late content delivery.`,
  },
  {
    heading: "5. Revisions",
    body: `Each package includes up to 2 rounds of revisions within the agreed scope. Revisions beyond this, or changes that fall outside the original scope, may incur additional charges that will be agreed upon before work proceeds.`,
  },
  {
    heading: "6. Delivery Timeline",
    body: `Delivery timelines (7 days for Starter, 14 days for Business, 21+ days for Custom) are estimates and begin from the date both the advance payment is received and all required content is provided. We will communicate promptly if any delay is expected.`,
  },
  {
    heading: "7. Intellectual Property",
    body: `Upon receipt of full payment, you own the final website design and all code created for your project. ZeroD Agency retains the right to showcase completed work in our portfolio and marketing materials unless you request otherwise in writing.`,
  },
  {
    heading: "8. Hosting & Domain",
    body: `Domain and hosting costs are not included in our package prices unless explicitly stated. We will assist you in purchasing and configuring these services, but ongoing hosting and domain renewal fees are your responsibility.`,
  },
  {
    heading: "9. Limitation of Liability",
    body: `ZeroD Agency is not liable for any indirect, incidental, or consequential damages arising from the use of your website, including but not limited to loss of revenue, data loss, or business interruption. Our maximum liability is limited to the total amount you paid for the specific project.`,
  },
  {
    heading: "10. Governing Law",
    body: `These Terms & Conditions are governed by the laws of Bangladesh. Any disputes shall first be attempted to be resolved through mutual discussion. If unresolved, disputes shall be subject to the jurisdiction of courts in Naogaon, Bangladesh.`,
  },
  {
    heading: "11. Contact",
    body: `Questions about these terms? Email us at hello@zerodagency.com or WhatsApp us at +8801341570410.`,
  },
]

export default function TermsPage() {
  return (
    <>
      <PageHero headingKey="legal.terms.heading" subtitleKey="legal.terms.subtitle" />
      <LegalContent effectiveDate="June 22, 2026" sections={sections} />
    </>
  )
}
