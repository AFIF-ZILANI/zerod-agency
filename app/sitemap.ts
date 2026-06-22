import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://zerodagency.com"
  const now  = new Date()
  return [
    { url: base,                             lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/services`,               lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/services/website-build`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/services/redesign`,      lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services/maintenance`,   lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/portfolio`,              lastModified: now, changeFrequency: "weekly",  priority: 0.7 },
    { url: `${base}/pricing`,                lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/contact`,                lastModified: now, changeFrequency: "yearly",  priority: 0.7 },
  ]
}
