"use client"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { translations, type Language } from "./translations"

interface LanguageContextValue {
  language:    Language
  setLanguage: (l: Language) => void
  t:           (key: string) => string
  fontClass:   string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("bn")

  useEffect(() => {
    document.documentElement.setAttribute("lang", language)
  }, [language])

  const fontClass = language === "bn" ? "font-bengali" : ""

  function t(key: string): string {
    return translations[language][key] ?? key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, fontClass }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider")
  return ctx
}
