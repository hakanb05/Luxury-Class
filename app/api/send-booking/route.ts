import { Resend } from "resend"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const body = await request.json()
    const { serviceType, from, to, date, time, vehicle, isBusiness, companyName, name, email, phone } = body

    // Validate required fields
    if (!name || !email || !phone || !from || !date || !time || !vehicle) {
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
            .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f97316; }
            .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
            .detail-label { font-weight: bold; color: #666; }
            .detail-value { color: #333; }
            .highlight { background: #fff3cd; padding: 15px; border-radius: 5px; border-left: 4px solid #ffc107; margin: 15px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚗 Nieuwe Boekingsaanvraag</h1>
              <p>Luxury Class Chauffeur Service</p>
            </div>

            <div class="content">
              <h2>Boekingsdetails</h2>

              <div class="booking-details">
                <div class="detail-row">
                  <span class="detail-label">Service Type:</span>
                  <span class="detail-value">${serviceType === "one-way" ? "Enkele Reis" : "Per Uur"}</span>
                </div>

                <div class="detail-row">
                  <span class="detail-label">Van:</span>
                  <span class="detail-value">${from}</span>
                </div>

                ${
                  to
                    ? `
                <div class="detail-row">
                  <span class="detail-label">Naar:</span>
                  <span class="detail-value">${to}</span>
                </div>
                `
                    : ""
                }

                <div class="detail-row">
                  <span class="detail-label">Datum:</span>
                  <span class="detail-value">${new Date(date).toLocaleDateString("nl-NL", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}</span>
                </div>

                <div class="detail-row">
                  <span class="detail-label">Tijd:</span>
                  <span class="detail-value">${time}</span>
                </div>

                <div class="detail-row">
                  <span class="detail-label">Voertuig:</span>
                  <span class="detail-value">${vehicle === "v-class" ? "Mercedes-Benz V-Class (tot 7 passagiers)" : "Mercedes-Benz S-Class (tot 3 passagiers)"}</span>
                </div>

                ${
                  isBusiness
                    ? `
                <div class="detail-row">
                  <span class="detail-label">Zakelijke Boeking:</span>
                  <span class="detail-value">Ja</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Bedrijfsnaam:</span>
                  <span class="detail-value">${companyName}</span>
                </div>
                `
                    : ""
                }
              </div>

              <h2>Klantgegevens</h2>

              <div class="booking-details">
                <div class="detail-row">
                  <span class="detail-label">Naam:</span>
                  <span class="detail-value">${name}</span>
                </div>

                <div class="detail-row">
                  <span class="detail-label">Email:</span>
                  <span class="detail-value"><a href="mailto:${email}">${email}</a></span>
                </div>

                <div class="detail-row">
                  <span class="detail-label">Telefoon:</span>
                  <span class="detail-value"><a href="tel:${phone}">${phone}</a></span>
                </div>
              </div>

              <div class="highlight">
                <strong>💡 Actie vereist:</strong> Neem contact op met de klant om de boeking te bevestigen en eventuele details te bespreken.
              </div>

              <div class="footer">
                <p>Deze email is automatisch gegenereerd door het boekingssysteem van Luxury Class.</p>
                <p>Boekingsdatum: ${new Date().toLocaleString("nl-NL")}</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    // Send email
    const { data, error } = await resend.emails.send({
    //   from: "Luxury Class <noreply@luxuryclass.nl>",
      from: "onboarding@resend.dev",
      to: ["hakanbektas934@gmail.com"],
      subject: `🚗 Nieuwe Boekingsaanvraag - ${name} (${serviceType === "one-way" ? "Enkele Reis" : "Per Uur"})`,
      html: emailHtml,
      replyTo: email,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    return NextResponse.json({ message: "Booking email sent successfully", id: data?.id }, { status: 200 })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
