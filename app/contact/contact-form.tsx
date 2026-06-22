"use client"
import { useState, FormEvent } from "react"
import { Send, CheckCircle } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

const BUSINESS_TYPES = [
  "Restaurant & Food", "Online Shop / E-commerce", "Clinic & Healthcare",
  "Coaching & Education", "Business Profile Site", "NGO / Foundation", "Other",
]
const BUDGET_RANGES = [
  "Under ৳15,000", "৳15,000 – ৳50,000", "৳50,000 – ৳1,00,000", "৳1,00,000+", "Not sure yet",
]

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const { t, fontClass, language } = useLanguage()

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    try {
      const res = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(data),
      })
      if (res.ok) { setStatus("success"); form.reset() }
      else          setStatus("error")
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-border bg-white p-8 flex flex-col items-center justify-center gap-4 py-16 text-center">
        <CheckCircle className="h-12 w-12 text-orange" />
        <p lang={language} className={`${fontClass} text-xl font-bold text-navy`}>{t("form.success")}</p>
        <p lang={language} className={`${fontClass} text-text-muted`}>{t("form.success_sub")}</p>
      </div>
    )
  }

  const inputCls = "w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/30"

  return (
    <div className="rounded-2xl border border-border bg-white p-8">
      <h2 lang={language} className={`${fontClass} mb-6 text-xl font-bold text-navy`}>
        {t("contact.form.heading")}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label lang={language} htmlFor="name" className={`${fontClass} mb-1.5 block text-sm font-medium text-text-primary`}>
              {t("form.name")} <span className="text-orange">*</span>
            </label>
            <input id="name" name="name" type="text" required placeholder={t("form.name_ph")} className={inputCls} />
          </div>
          <div>
            <label lang={language} htmlFor="businessName" className={`${fontClass} mb-1.5 block text-sm font-medium text-text-primary`}>
              {t("form.biz_name")}
            </label>
            <input id="businessName" name="businessName" type="text" placeholder={t("form.biz_name_ph")} className={inputCls} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label lang={language} htmlFor="businessType" className={`${fontClass} mb-1.5 block text-sm font-medium text-text-primary`}>
              {t("form.biz_type")}
            </label>
            <select id="businessType" name="businessType" className={inputCls}>
              <option value="">Select type</option>
              {BUSINESS_TYPES.map((bt) => <option key={bt} value={bt}>{bt}</option>)}
            </select>
          </div>
          <div>
            <label lang={language} htmlFor="budgetRange" className={`${fontClass} mb-1.5 block text-sm font-medium text-text-primary`}>
              {t("form.budget")}
            </label>
            <select id="budgetRange" name="budgetRange" className={inputCls}>
              <option value="">Select budget</option>
              {BUDGET_RANGES.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label lang={language} htmlFor="message" className={`${fontClass} mb-1.5 block text-sm font-medium text-text-primary`}>
            {t("form.message")} <span className="text-orange">*</span>
          </label>
          <textarea
            id="message" name="message" rows={4} required
            placeholder={t("form.message_ph")} lang={language}
            className={`${inputCls} resize-none`}
          />
        </div>

        {status === "error" && (
          <p className="text-sm text-red-600">{t("form.error")}</p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="flex items-center justify-center gap-2 rounded-xl bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy/90 disabled:opacity-60"
        >
          <Send className="h-4 w-4" />
          <span lang={language} className={fontClass}>
            {status === "loading" ? t("form.submitting") : t("form.submit")}
          </span>
        </button>
      </form>
    </div>
  )
}
