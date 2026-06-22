import type { Metadata } from "next"
import { PageHero }      from "@/components/page-hero"
import { LegalContent }  from "@/components/legal-content"

export const metadata: Metadata = {
  title:      "Refund Policy",
  description: "ZeroD Agency's refund policy — when refunds apply, how to request one, and what to expect.",
  alternates: { canonical: "https://zerodagency.com/refund" },
}

const sections = [
  {
    heading: "1. Overview",
    body: `At ZeroD Agency, we are committed to delivering quality websites. This policy explains when refunds are available and how to request one.`,
  },
  {
    heading: "2. Advance Payment (50%)",
    body: `The 50% advance payment is fully refundable if you cancel before we begin work. Once we have started design or development, the advance is non-refundable because time and resources have already been allocated to your project.`,
  },
  {
    heading: "3. Final Payment (50%)",
    body: `The final 50% payment is due upon delivery of the completed website. Once you have reviewed and approved the final website, this payment is non-refundable. Approval may be explicit (written confirmation) or implied (going live with the site).`,
  },
  {
    heading: "4. When We Fail to Deliver",
    body: `If ZeroD Agency is unable to complete and deliver your website within a reasonable extension of the agreed timeline — and this failure is solely due to our error — you are entitled to a full refund of all payments made. We will initiate the refund within 7 business days.`,
  },
  {
    heading: "5. Revision Disputes",
    body: `If you are unhappy with our work, please contact us before requesting a refund. We offer up to 2 rounds of revisions included in every package to address reasonable concerns. We will make every effort to resolve the issue before a refund is considered.`,
  },
  {
    heading: "6. Non-Refundable Scenarios",
    body: `Refunds are not available in the following situations: you changed your mind after work began; you provided incorrect or incomplete content that caused issues; delays were caused by your own late responses; or the website was delivered and approved but you later decided you no longer need it.`,
  },
  {
    heading: "7. How to Request a Refund",
    body: `To request a refund, email us at hello@zerodagency.com with your name, project details, payment reference, and the reason for your refund request. We will respond within 2 business days. Approved refunds are processed via the original payment method (bKash, Nagad, or bank transfer) within 7 business days.`,
  },
  {
    heading: "8. Contact",
    body: `For any questions about this Refund Policy, reach us at hello@zerodagency.com or WhatsApp us at +8801341570410.`,
  },
]

export default function RefundPage() {
  return (
    <>
      <PageHero headingKey="legal.refund.heading" subtitleKey="legal.refund.subtitle" />
      <LegalContent effectiveDate="June 22, 2026" sections={sections} />
    </>
  )
}
