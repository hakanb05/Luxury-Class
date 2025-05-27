"use client"
import { Suspense, useEffect } from "react"
import { MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/contexts/language-context"
import Link from "next/link"
import AnimatedText from "@/components/ui/animated-text"
import BookingForm from "@/components/ui/booking-form"

const popularRoutes = [
    { from: "Schiphol Airport", to: "Amsterdam", vClass: 130, sClass: 140 },
    { from: "Amsterdam", to: "Schiphol Airport", vClass: 105, sClass: 115 },
    { from: "Rotterdam Airport", to: "Amsterdam", vClass: 173.75, sClass: 191.25 },
    { from: "Eindhoven", to: "Amsterdam", vClass: 273.50, sClass: 283.50 },
    { from: "Den Haag", to: "Amsterdam", vClass: 156.25, sClass: 173.75 },
]

const internationalRoutes = [
  { from: "Amsterdam", to: "Brussels", vClass: 630, sClass: 640 },
  { from: "Amsterdam", to: "Antwerp", vClass: 480, sClass: 490 },
  { from: "Amsterdam", to: "Dusseldorf", vClass: 666, sClass: 676 },
]

function BookingContent() {
  const { t, formatPrice, language } = useLanguage()

  // Function to check if element is in viewport
  const isInViewport = (element: Element) => {
    const rect = element.getBoundingClientRect()
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 && rect.bottom >= 0
  }

  // Handle scroll animations
  useEffect(() => {
    const animateOnScroll = () => {
      const animatedElements = document.querySelectorAll(".fade-in-section")

      animatedElements.forEach((element) => {
        if (isInViewport(element)) {
          element.classList.add("is-visible")
        }
      })
    }

    // Run once on load
    animateOnScroll()

    // Add scroll event listener
    window.addEventListener("scroll", animateOnScroll)

    // Clean up
    return () => window.removeEventListener("scroll", animateOnScroll)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-muted/30">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <AnimatedText text={t("requestBooking")} />
          </h1>
          <p className="text-xl text-muted-foreground fade-in-section">{t("ctaDescription")}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="fade-in-section">
              <BookingForm />
            </div>
          </div>

          {/* Popular Routes Sidebar */}
          <div className="space-y-6">
            <Card className="fade-in-section">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-orange-500" />
                  <span>{t("popularRoutes")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {popularRoutes.map((route, index) => (
                  <div key={index} className="border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">
                        {route.from} → {route.to}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {language === "nl" ? (
                        <>
                          V-Class: €{route.vClass}{" "}
                          <span className="text-xs">(excl. btw €{Math.round(route.vClass * 0.91)})</span> • S-Class: €
                          {route.sClass} <span className="text-xs">(excl. btw €{Math.round(route.sClass * 0.91)})</span>
                        </>
                      ) : (
                        <>
                          V-Class: {formatPrice(route.vClass)} • S-Class: {formatPrice(route.sClass)}
                        </>
                      )}
                      <div className="text-xs text-muted-foreground mt-1 opacity-75">
                        {route.from !== "Schiphol Airport" && route.to !== "Schiphol Airport" && t("otherway")}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="fade-in-section">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-orange-500" />
                  <span>{t("internationalRoutes")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {internationalRoutes.map((route, index) => (
                  <div key={index} className="border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">
                        {route.from} → {route.to}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {language === "nl" ? (
                        <>
                          V-Class: €{route.vClass}{" "}
                          <span className="text-xs">(excl. btw €{Math.round(route.vClass * 0.91)})</span> • S-Class: €
                          {route.sClass} <span className="text-xs">(excl. btw €{Math.round(route.sClass * 0.91)})</span>
                        </>
                      ) : (
                        <>
                          V-Class: {formatPrice(route.vClass)} • S-Class: {formatPrice(route.sClass)}
                        </>
                      )}
                    <div className="text-xs text-muted-foreground mt-1 opacity-75">
                        {t("otherway")}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="fade-in-section">
              <CardHeader>
                <CardTitle>{t("otherRoute")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{t("otherRouteDescription")}</p>
                <Button
                  variant="outline"
                  className="text-white font-semibold py-2 px-4 rounded-lg bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 hover:from-pink-600 hover:via-red-600 hover:to-orange-600"
                  asChild
                >
                  <Link href="/contact">{t("contactUs")}</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function BookPageContent() {
  const { t } = useLanguage()
  return (
    <Suspense fallback={<div>{t("loading")}</div>}>
      <BookingContent />
    </Suspense>
  )
}
