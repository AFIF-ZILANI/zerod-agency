import type { Metadata } from "next"
import { Check, MessageCircle } from "lucide-react"
import { wa } from "@/lib/constants"

export const metadata: Metadata = {
  title:       "Website Redesign",
  description: "Transform your outdated website into a modern, fast, conversion-focused digital presence. Starting from ৳15,000.",
}

const FEATURES = [
  "Full visual redesign",
  "Mobile-first responsive layout",
  "Page speed optimization (Core Web Vitals)",
  "Modern UI/UX with conversion focus",
  "SEO structure improvement",
  "Content migration",
  "3 months post-launch support",
]

const WA_REDESIGN = wa("আমার website redesign করতে চাই।")

export default function RedesignPage() {
  return (
    <>
      <section className="bg-navy py-20 text-center px-4">
        <h1 lang="bn" className="font-bengali text-4xl font-bold text-white">ওয়েবসাইট রিডিজাইন</h1>
        <p className="mt-3 text-white/70">Website Redesign</p>
      </section>

      <section className="bg-white py-20 px-4">
        <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
          <h2 lang="bn" className="font-bengali text-3xl font-bold text-navy">
            পুরনো website-কে নতুন জীবন দিন
          </h2>
          <p lang="bn" className="font-bengali mt-4 text-lg text-text-muted leading-relaxed">
            Outdated design, slow loading, বা mobile-unfriendly? আমরা আপনার existing site-কে modern,
            fast, এবং conversion-focused করে তুলি — content হারিয়ে না গিয়ে।
          </p>

          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm text-text-primary">
                <Check className="h-4 w-4 shrink-0 text-orange" />
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-xl border border-orange/20 bg-orange/5 p-6">
            <p className="text-sm font-semibold text-text-muted uppercase tracking-wider">Starting price</p>
            <p className="mt-1 text-3xl font-bold text-navy">৳15,000</p>
            <p className="mt-1 text-sm text-text-muted">Final price depends on site size and complexity</p>
          </div>

          <a
            href={WA_REDESIGN}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-orange px-7 py-3.5 text-sm font-semibold text-white hover:bg-orange-hover transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            <span lang="bn" className="font-bengali">Redesign নিয়ে আলোচনা করুন</span>
          </a>
        </div>
      </section>
    </>
  )
}
