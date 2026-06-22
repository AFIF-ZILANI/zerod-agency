export type Language = "bn" | "en"

type TranslationMap = Record<string, string>

export const translations: Record<Language, TranslationMap> = {
  bn: {
    // Nav
    "nav.services":            "সেবাসমূহ",
    "nav.portfolio":           "আমাদের কাজ",
    "nav.pricing":             "মূল্য",
    "nav.contact":             "যোগাযোগ",
    "nav.whatsapp":            "WhatsApp",
    "nav.toggle_label":        "Switch to English",

    // Hero (home)
    "hero.tagline":            "আপনার ব্যবসাকে অনলাইনে নিয়ে আসুন",
    "hero.subtitle":           "We build websites that work for Bangladeshi businesses",
    "hero.trust":              "৳১৫,০০০+ থেকে শুরু · ৭ দিনে ডেলিভারি · ১০০% সন্তুষ্টি",
    "hero.cta_whatsapp":       "WhatsApp করুন",
    "hero.cta_portfolio":      "আমাদের কাজ দেখুন",

    // Service cards (home section)
    "services.heading":        "আমাদের সেবা",
    "services.build.title":    "ওয়েবসাইট বানান",
    "services.build.sub":      "Build a Website",
    "services.build.desc":     "আপনার business-এর জন্য professional website — ecommerce থেকে শুরু করে business profile পর্যন্ত।",
    "services.redesign.title": "রিডিজাইন করুন",
    "services.redesign.sub":   "Redesign",
    "services.redesign.desc":  "পুরনো website-কে modern, fast, এবং conversion-friendly করে তুলুন।",
    "services.maint.title":    "রক্ষণাবেক্ষণ",
    "services.maint.sub":      "Maintenance",
    "services.maint.desc":     "আপনার website সচল, secure, এবং up-to-date রাখার সম্পূর্ণ দায়িত্ব আমাদের।",
    "services.read_more":      "আরও জানুন",

    // Testimonials
    "testimonials.heading":    "আমাদের client-রা যা বলেন",

    // Pricing
    "pricing.heading":         "প্যাকেজ ও মূল্য",
    "pricing.subtitle":        "সব প্যাকেজে mobile-responsive design এবং free domain consultation অন্তর্ভুক্ত।",
    "pricing.popular":         "সবচেয়ে জনপ্রিয়",
    "pricing.s.name":          "স্টার্টার",
    "pricing.s.tagline":       "শুরু করার জন্য সেরা",
    "pricing.s.cta":           "শুরু করুন",
    "pricing.b.name":          "বিজনেস",
    "pricing.b.tagline":       "সবচেয়ে জনপ্রিয়",
    "pricing.b.cta":           "আলোচনা করুন",
    "pricing.c.name":          "কাস্টম",
    "pricing.c.tagline":       "সম্পূর্ণ সমাধান",
    "pricing.c.cta":           "কথা বলুন",

    // Home CTA
    "home.cta.heading":        "আজই শুরু করুন",
    "home.cta.sub":            "বিনামূল্যে পরামর্শের জন্য WhatsApp করুন",
    "home.cta.button":         "WhatsApp করুন",

    // Footer
    "footer.services":         "সেবাসমূহ",
    "footer.quick_links":      "দ্রুত লিঙ্ক",
    "footer.contact_col":      "যোগাযোগ",
    "footer.rights":           "সর্বস্বত্ব সংরক্ষিত",
    "footer.made":             "Made with care in Naogaon 🇧🇩",

    // Contact page
    "contact.heading":         "যোগাযোগ করুন",
    "contact.subtitle":        "Contact Us",
    "contact.form.heading":    "মেসেজ পাঠান",
    "contact.wa.heading":      "সরাসরি WhatsApp করুন",
    "contact.map.label":       "আমাদের অবস্থান — Naogaon, Bangladesh",

    // Contact form
    "form.name":               "আপনার নাম",
    "form.name_ph":            "আপনার নাম",
    "form.biz_name":           "ব্যবসার নাম",
    "form.biz_name_ph":        "ব্যবসার নাম (optional)",
    "form.biz_type":           "ব্যবসার ধরন",
    "form.budget":             "বাজেট",
    "form.message":            "বার্তা",
    "form.message_ph":         "আপনার website সম্পর্কে বলুন…",
    "form.submit":             "পাঠান",
    "form.submitting":         "পাঠানো হচ্ছে…",
    "form.success":            "আপনার message পাঠানো হয়েছে!",
    "form.success_sub":        "আমরা শীঘ্রই যোগাযোগ করবো।",
    "form.error":              "Something went wrong. Please try WhatsApp instead.",

    // Portfolio
    "portfolio.heading":       "আমাদের কাজ",
    "portfolio.subtitle":      "Our Portfolio",
    "portfolio.placeholder":   "Placeholder projects — real client screenshots আসছে শীঘ্রই",
    "portfolio.cta.heading":   "আপনার জন্যও এমন একটি বানাই?",
    "portfolio.cta.button":    "WhatsApp করুন",

    // Services page
    "svcp.heading":            "আমাদের সেবাসমূহ",
    "svcp.subtitle":           "Our Services",
    "svcp.cta.heading":        "কোন service লাগবে জানেন না?",
    "svcp.cta.sub":            "Free consultation-এর জন্য WhatsApp করুন",
    "svcp.cta.button":         "WhatsApp করুন",
    "svcp.details":            "বিস্তারিত দেখুন",
    "svcp.from":               "থেকে শুরু",

    // Website build page
    "build.heading":           "ওয়েবসাইট বানান",
    "build.subtitle":          "Build a Website",
    "build.biz_heading":       "আপনার ব্যবসার ধরন বেছে নিন",
    "build.from":              "শুরু",
    "build.wa":                "WhatsApp করুন",

    // Redesign page
    "redesign.heading":        "ওয়েবসাইট রিডিজাইন",
    "redesign.subtitle":       "Website Redesign",
    "redesign.h2":             "পুরনো website-কে নতুন জীবন দিন",
    "redesign.cta":            "Redesign নিয়ে আলোচনা করুন",

    // Maintenance page
    "maint.heading":           "ওয়েবসাইট রক্ষণাবেক্ষণ",
    "maint.subtitle":          "Website Maintenance",
    "maint.h2":                "চিন্তামুক্ত থাকুন — আমরা সামলাবো",
    "maint.sub":               "আপনি ব্যবসায় মনোযোগ দিন, website-এর দায়িত্ব আমাদের",
    "maint.start":             "শুরু করুন",

    // Pricing page
    "pricing.page_heading":    "মূল্য তালিকা",
    "pricing.page_subtitle":   "Transparent Pricing",
    "pricing.faq_heading":     "সাধারণ প্রশ্ন",
    "pricing.start":           "শুরু করুন",

    // Contact info labels
    "contact.phone_label":     "ফোন",
    "contact.email_label":     "ইমেইল",
    "contact.address_label":   "ঠিকানা",

    // WhatsApp pre-fill messages
    "wa.general":              "আমি ZeroD Agency-র সাথে কথা বলতে চাই।",
    "wa.redesign":             "আমার website redesign করতে চাই।",
    "wa.maintenance":          "আমার website maintenance দরকার।",

    // Shared
    "shared.whatsapp":         "WhatsApp করুন",
  },

  en: {
    // Nav
    "nav.services":            "Services",
    "nav.portfolio":           "Portfolio",
    "nav.pricing":             "Pricing",
    "nav.contact":             "Contact",
    "nav.whatsapp":            "WhatsApp",
    "nav.toggle_label":        "বাংলায় পরিবর্তন করুন",

    // Hero (home)
    "hero.tagline":            "Bring Your Business Online",
    "hero.subtitle":           "We build websites that work for Bangladeshi businesses",
    "hero.trust":              "Starting ৳15,000+ · 7-day delivery · 100% satisfaction",
    "hero.cta_whatsapp":       "WhatsApp Us",
    "hero.cta_portfolio":      "See Our Work",

    // Service cards (home section)
    "services.heading":        "Our Services",
    "services.build.title":    "Build a Website",
    "services.build.sub":      "New Website",
    "services.build.desc":     "A professional website for your business — from ecommerce to business profile.",
    "services.redesign.title": "Redesign",
    "services.redesign.sub":   "Modernize",
    "services.redesign.desc":  "Turn your outdated website into something modern, fast, and conversion-friendly.",
    "services.maint.title":    "Maintenance",
    "services.maint.sub":      "Ongoing Care",
    "services.maint.desc":     "We keep your website live, secure, and up-to-date — fully managed.",
    "services.read_more":      "Learn More",

    // Testimonials
    "testimonials.heading":    "What Our Clients Say",

    // Pricing
    "pricing.heading":         "Packages & Pricing",
    "pricing.subtitle":        "All packages include mobile-responsive design and free domain consultation.",
    "pricing.popular":         "Most Popular",
    "pricing.s.name":          "Starter",
    "pricing.s.tagline":       "Best for getting started",
    "pricing.s.cta":           "Get Started",
    "pricing.b.name":          "Business",
    "pricing.b.tagline":       "Most popular",
    "pricing.b.cta":           "Discuss",
    "pricing.c.name":          "Custom",
    "pricing.c.tagline":       "Complete solution",
    "pricing.c.cta":           "Talk to Us",

    // Home CTA
    "home.cta.heading":        "Get Started Today",
    "home.cta.sub":            "WhatsApp us for a free consultation",
    "home.cta.button":         "WhatsApp Us",

    // Footer
    "footer.services":         "Services",
    "footer.quick_links":      "Quick Links",
    "footer.contact_col":      "Contact",
    "footer.rights":           "All rights reserved",
    "footer.made":             "Made with care in Naogaon 🇧🇩",

    // Contact page
    "contact.heading":         "Contact Us",
    "contact.subtitle":        "যোগাযোগ করুন",
    "contact.form.heading":    "Send a Message",
    "contact.wa.heading":      "Chat on WhatsApp",
    "contact.map.label":       "Our Location — Naogaon, Bangladesh",

    // Contact form
    "form.name":               "Your Name",
    "form.name_ph":            "Your name",
    "form.biz_name":           "Business Name",
    "form.biz_name_ph":        "Business name (optional)",
    "form.biz_type":           "Business Type",
    "form.budget":             "Budget",
    "form.message":            "Message",
    "form.message_ph":         "Tell us about your website…",
    "form.submit":             "Send",
    "form.submitting":         "Sending…",
    "form.success":            "Your message has been sent!",
    "form.success_sub":        "We'll get back to you soon.",
    "form.error":              "Something went wrong. Please try WhatsApp instead.",

    // Portfolio
    "portfolio.heading":       "Our Portfolio",
    "portfolio.subtitle":      "আমাদের কাজ",
    "portfolio.placeholder":   "Placeholder projects — real client screenshots coming soon",
    "portfolio.cta.heading":   "Want one like this for your business?",
    "portfolio.cta.button":    "WhatsApp Us",

    // Services page
    "svcp.heading":            "Our Services",
    "svcp.subtitle":           "আমাদের সেবাসমূহ",
    "svcp.cta.heading":        "Not sure which service you need?",
    "svcp.cta.sub":            "WhatsApp us for a free consultation",
    "svcp.cta.button":         "WhatsApp Us",
    "svcp.details":            "See Details",
    "svcp.from":               "Starting from",

    // Website build page
    "build.heading":           "Build a Website",
    "build.subtitle":          "ওয়েবসাইট বানান",
    "build.biz_heading":       "Choose Your Business Type",
    "build.from":              "Starting",
    "build.wa":                "WhatsApp Us",

    // Redesign page
    "redesign.heading":        "Website Redesign",
    "redesign.subtitle":       "ওয়েবসাইট রিডিজাইন",
    "redesign.h2":             "Give Your Old Website a New Life",
    "redesign.cta":            "Discuss a Redesign",

    // Maintenance page
    "maint.heading":           "Website Maintenance",
    "maint.subtitle":          "ওয়েবসাইট রক্ষণাবেক্ষণ",
    "maint.h2":                "Stay worry-free — we'll handle it",
    "maint.sub":               "Focus on your business, we'll take care of your website",
    "maint.start":             "Get Started",

    // Pricing page
    "pricing.page_heading":    "Price List",
    "pricing.page_subtitle":   "স্বচ্ছ মূল্য",
    "pricing.faq_heading":     "Frequently Asked Questions",
    "pricing.start":           "Get Started",

    // Contact info labels
    "contact.phone_label":     "Phone",
    "contact.email_label":     "Email",
    "contact.address_label":   "Address",

    // WhatsApp pre-fill messages
    "wa.general":              "I'd like to talk to ZeroD Agency.",
    "wa.redesign":             "I'd like to redesign my website.",
    "wa.maintenance":          "I need website maintenance.",

    // Shared
    "shared.whatsapp":         "WhatsApp Us",
  },
}
