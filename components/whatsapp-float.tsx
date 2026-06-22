import { MessageCircle } from "lucide-react"
import { WA_GENERAL } from "@/lib/constants"

export function WhatsAppFloat() {
  return (
    <a
      href={WA_GENERAL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg"
      style={{ animation: "whatsapp-pulse 2.5s ease-out infinite" }}
    >
      <MessageCircle className="h-7 w-7" />
      <style>{`
        @keyframes whatsapp-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(37,211,102,0.55); }
          70%  { box-shadow: 0 0 0 12px rgba(37,211,102,0); }
          100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); }
        }
      `}</style>
    </a>
  )
}
