export const WHATSAPP_NUMBER = "8801341570410"
export const WHATSAPP_URL    = `https://wa.me/${WHATSAPP_NUMBER}`
export const WHATSAPP_MSG    = "আমি ZeroD Agency-র সাথে কথা বলতে চাই।"

export function wa(message: string): string {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`
}

export const WA_GENERAL     = wa("আমি ZeroD Agency-র সাথে কথা বলতে চাই।")
export const WA_BUILD_NEW   = wa("আমি নতুন ব্যবসার জন্য website বানাতে চাই।")
export const WA_BUILD_FB    = wa("আমি Facebook থেকে নিজের website নিতে চাই।")
export const WA_BUILD_EXIST = wa("আমার existing ecommerce site improve করতে চাই।")

export function waForBusiness(type: string): string {
  return wa(`আমি ${type} website সম্পর্কে জানতে চাই।`)
}

export const SITE_NAME    = "ZeroD Agency"
export const TAGLINE_BN   = "আপনার ব্যবসাকে অনলাইনে নিয়ে আসুন"
export const TAGLINE_EN   = "We build websites that work for Bangladeshi businesses"
export const EMAIL        = "hello@zerodagency.com"
export const PHONE        = "+8801341570410"
export const ADDRESS      = "Naogaon, Rajshahi Division, Bangladesh"
export const FACEBOOK_URL = "https://facebook.com/zerodagency"
export const GITHUB_URL   = "https://github.com/zerodagencies"
