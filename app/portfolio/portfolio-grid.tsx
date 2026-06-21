"use client"
import { useState } from "react"
import { Badge }    from "@/components/ui/badge"

const CATS = ["All", "E-commerce", "Healthcare", "Business", "Education", "Restaurant"]
const PROJECTS = [
  { nameBn: "নওগাঁ রেস্তোরাঁ",                descBn: "Restaurant menu + online order site",     cat: "Restaurant", icon: "🍽️", bg: "bg-orange-50"  },
  { nameBn: "ডাক্তার চেম্বার অ্যাপয়েন্টমেন্ট", descBn: "Appointment booking for clinic",          cat: "Healthcare", icon: "🏥", bg: "bg-blue-50"   },
  { nameBn: "ফ্যাশন শপ",                       descBn: "Online fashion store with bKash",          cat: "E-commerce", icon: "👗", bg: "bg-purple-50" },
  { nameBn: "কোচিং সেন্টার",                   descBn: "Course info + online admission",           cat: "Education",  icon: "📚", bg: "bg-green-50"  },
  { nameBn: "গ্রোসারি মার্ট",                  descBn: "Online grocery with WhatsApp orders",      cat: "E-commerce", icon: "🛒", bg: "bg-yellow-50" },
  { nameBn: "ল' ফার্ম",                         descBn: "Professional legal services website",     cat: "Business",   icon: "⚖️", bg: "bg-slate-50"  },
]

export function PortfolioGrid() {
  const [active, setActive] = useState("All")
  const filtered = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.cat === active)
  return (
    <section className="bg-surface py-20 px-4">
      <div className="mx-auto max-w-6xl sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap gap-2">
          {CATS.map((c) => (
            <button key={c} onClick={() => setActive(c)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                active === c ? "bg-navy text-white" : "bg-white border border-border text-text-primary hover:border-navy"
              }`}>
              {c}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <div key={p.nameBn} className="overflow-hidden rounded-xl border border-border bg-white hover:shadow-md transition-shadow">
              <div className={`flex h-44 items-center justify-center ${p.bg}`}>
                <span className="text-6xl">{p.icon}</span>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <p lang="bn" className="font-bengali font-semibold text-navy">{p.nameBn}</p>
                  <Badge variant="secondary" className="text-xs shrink-0">{p.cat}</Badge>
                </div>
                <p className="mt-1.5 text-sm text-text-muted">{p.descBn}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
