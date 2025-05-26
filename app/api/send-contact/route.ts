import { Resend } from "resend"
import { type NextRequest, NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Format the email content
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f97316, #ea580c); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .contact-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f97316; }
            .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
            .detail-label { font-weight: bold; color: #666; }
            .detail-value { color: #333; }
            .message-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f97316; }
            .highlight { background: #fff3cd; padding: 15px; border-radius: 5px; border-left: 4px solid #ffc107; margin: 15px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📧 Nieuw Contact Bericht</h1>
              <p>Luxury Class Chauffeur Service</p>
            </div>

            <div class="content">
              <h2>Contact Details</h2>

              <div class="contact-details">
                <div class="detail-row">
                  <span class="detail-label">Naam:</span>
                  <span class="detail-value">${name}</span>
                </div>

                <div class="detail-row">
                  <span class="detail-label">Email:</span>
                  <span class="detail-value"><a href="mailto:${email}">${email}</a></span>
                </div>

                ${
                  phone
                    ? `
                <div class="detail-row">
                  <span class="detail-label">Telefoon:</span>
                  <span class="detail-value"><a href="tel:${phone}">${phone}</a></span>
                </div>
                `
                    : ""
                }

                ${
                  subject
                    ? `
                <div class="detail-row">
                  <span class="detail-label">Onderwerp:</span>
                  <span class="detail-value">${subject}</span>
                </div>
                `
                    : ""
                }
              </div>

              <h2>Bericht</h2>

              <div class="message-box">
                <p style="margin: 0; white-space: pre-wrap;">${message}</p>
              </div>

              <div class="highlight">
                <strong>💡 Actie vereist:</strong> Beantwoord dit bericht binnen 24 uur voor de beste klantenservice.
              </div>

              <div class="footer">
                <p>Deze email is automatisch gegenereerd door het contactformulier van Luxury Class.</p>
                <p>Ontvangen op: ${new Date().toLocaleString("nl-NL")}</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    // Send email
    const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: ["hakanbektas934@gmail.com"],
      subject: `📧 Nieuw Contact Bericht - ${name}${subject ? ` (${subject})` : ""}`,
      html: emailHtml,
      replyTo: email,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    return NextResponse.json({ message: "Contact email sent successfully", id: data?.id }, { status: 200 })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
