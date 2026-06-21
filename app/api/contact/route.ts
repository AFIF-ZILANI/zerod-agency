import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, businessName, businessType, budgetRange, message } = body

    // Validation
    if (!name || !message) {
      return NextResponse.json({ error: "Name and message are required" }, { status: 400 })
    }

    // Log submission (replace with nodemailer/resend before launch)
    console.log("[ZeroD Contact Form]", {
      name, businessName, businessType, budgetRange, message,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
