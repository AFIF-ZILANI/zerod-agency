"use client"
import { useState, FormEvent } from "react"
import { MessageCircle, Send, CheckCircle } from "lucide-react"
import { WA_GENERAL } from "@/lib/constants"

const BUSINESS_TYPES = [
  "Restaurant & Food",
  "Online Shop / E-commerce",
  "Clinic & Healthcare",
  "Coaching & Education",
  "Business Profile Site",
  "NGO / Foundation",
  "Other",
]
const BUDGET_RANGES = [
  "Under ৳15,000",
  "৳15,000 – ৳50,000",
  "৳50,000 – ৳1,00,000",
  "৳1,00,000+",
  "Not sure yet",
]

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")
    const form   = e.currentTarget
    const data   = Object.fromEntries(new FormData(form))
    try {
      const res = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(data),
      })
      if (res.ok) {
        setStatus("success")
        form.reset()
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <CheckCircle className="h-12 w-12 text-orange" />
        <p lang="bn" className="font-bengali text-xl font-bold text-navy">আপনার message পাঠানো হয়েছে!</p>
        <p lang="bn" className="font-bengali text-text-muted">আমরা শীঘ্রই যোগাযোগ করবো।</p>
      </div>
    )
  }

  const inputCls = "w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/20"

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label lang="bn" htmlFor="name" className="font-bengali mb-1.5 block text-sm font-medium text-text-primary">
            আপনার নাম <span className="text-orange">*</span>
          </label>
          <input id="name" name="name" type="text" required placeholder="আপনার নাম" className={inputCls} />
        </div>
        <div>
          <label lang="bn" htmlFor="businessName" className="font-bengali mb-1.5 block text-sm font-medium text-text-primary">
            ব্যবসার নাম
          </label>
          <input id="businessName" name="businessName" type="text" placeholder="ব্যবসার নাম (optional)" className={inputCls} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label lang="bn" htmlFor="businessType" className="font-bengali mb-1.5 block text-sm font-medium text-text-primary">
            ব্যবসার ধরন
          </label>
          <select id="businessType" name="businessType" className={inputCls}>
            <option value="">Select type</option>
            {BUSINESS_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label lang="bn" htmlFor="budgetRange" className="font-bengali mb-1.5 block text-sm font-medium text-text-primary">
            বাজেট
          </label>
          <select id="budgetRange" name="budgetRange" className={inputCls}>
            <option value="">Select budget</option>
            {BUDGET_RANGES.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label lang="bn" htmlFor="message" className="font-bengali mb-1.5 block text-sm font-medium text-text-primary">
          বার্তা <span className="text-orange">*</span>
        </label>
        <textarea id="message" name="message" rows={4} required placeholder="আপনার website সম্পর্কে বলুন…" lang="bn"
          className={`${inputCls} resize-none`} />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">Something went wrong. Please try WhatsApp instead.</p>
      )}

      <button type="submit" disabled={status === "loading"}
        className="flex items-center justify-center gap-2 rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy/90 disabled:opacity-60">
        <Send className="h-4 w-4" />
        <span lang="bn" className="font-bengali">{status === "loading" ? "পাঠানো হচ্ছে…" : "পাঠান"}</span>
      </button>
    </form>
  )
}
