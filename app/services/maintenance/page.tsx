import type { Metadata } from "next"
import { Check, MessageCircle } from "lucide-react"
import { wa } from "@/lib/constants"

export const metadata: Metadata = {
  title:       "Website Maintenance",
  description: "Keep your website fast, secure, and up-to-date with ZeroD Agency's maintenance packages. From ৳3,000/month.",
}

const PLANS = [
  {
    name:     "Basic",
    price:    "৳3,000/মাস",
    features: ["Monthly updates", "Security monitoring", "Uptime monitoring", "Email support"],
  },
  {
    name:     "Standard",
    price:    "৳5,000/মাস",
    features: ["Weekly updates", "Security + malware removal", "Speed optimization", "Priority support", "Monthly report"],
  },
  {
    name:     "Premium",
    price:    "৳9,000/মাস",
    features: ["Unlimited updates", "Daily backups", "Performance tuning", "24/7 support", "Content updates included"],
  },
]

const WA_MAINTENANCE = wa("আমার website maintenance দরকার।")

export default function MaintenancePage() {
  return (
    <>
      <section className="bg-navy py-20 text-center px-4">
        <h1 lang="bn" className="font-bengali text-4xl font-bold text-white">ওয়েবসাইট রক্ষণাবেক্ষণ</h1>
        <p className="mt-3 text-white/70">Website Maintenance</p>
      </section>

      <section className="bg-surface py-20 px-4">
        <div className="mx-auto max-w-6xl sm:px-6 lg:px-8">
          <h2 lang="bn" className="font-bengali mb-4 text-center text-3xl font-bold text-navy">
            চিন্তামুক্ত থাকুন — আমরা সামলাবো
          </h2>
          <p lang="bn" className="font-bengali mb-12 text-center text-text-muted">
            আপনি ব্যবসায় মনোযোগ দিন, website-এর দায়িত্ব আমাদের
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {PLANS.map((plan) => (
              <div key={plan.name} className="rounded-xl border border-border bg-white p-7">
                <p className="text-lg font-bold text-navy">{plan.name}</p>
                <p className="mt-1 text-2xl font-bold text-orange">{plan.price}</p>
                <ul className="mt-5 flex flex-col gap-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-text-primary">
                      <Check className="h-4 w-4 shrink-0 text-orange" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={WA_MAINTENANCE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-center justify-center gap-2 rounded-lg border border-navy py-2.5 text-sm font-semibold text-navy hover:bg-navy hover:text-white transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span lang="bn" className="font-bengali">শুরু করুন</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
