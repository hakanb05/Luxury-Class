"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Shield, Car, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/contexts/language-context"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import AnimatedText from "@/components/ui/animated-text"
import { useMediaQuery } from "@/hooks/use-media-query"
import BookingForm from "@/components/ui/booking-form"

const popularRoutes = [
  {
    from: "Amsterdam",
    to: "Schiphol Airport",
    distance: "18 km",
    time: "25 min",
    price: 95,
    vClassPrice: 95,
    sClassPrice: 105,
  },
  {
    from: "Amsterdam",
    to: "Den Haag",
    distance: "60 km",
    time: "50 min",
    price: 156.25,
    vClassPrice: 156.25,
    sClassPrice: 173.75,
  },
  {
    from: "Amsterdam",
    to: "Rotterdam Airport",
    distance: "75 km",
    time: "65 min",
    price: 173.75,
    vClassPrice: 173.75,
    sClassPrice: 191.25,
  },
  {
    from: "Amsterdam",
    to: "Haarlem",
    distance: "20 km",
    time: "30 min",
    price: 110,
    vClassPrice: 110,
    sClassPrice: 120,
  },
]

const partners = [
  { name: "ING", logo: "/images/logos/ing.png" },
  { name: "KNVB", logo: "/images/logos/knvb.png" },
  { name: "Audemars Piguet", logo: "images/logos/ap_audemars.png" },
  { name: "Heineken", logo: "images/logos/heineken.png" },
  { name: "Feadship", logo: "/images/logos/feadship.png" },
]

export default function HomePage() {
  const { t, formatPrice, language } = useLanguage()
  const [currentRouteIndex, setCurrentRouteIndex] = useState(0)
  const [showBookingForm, setShowBookingForm] = useState(true)
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Animation states
  const [heroSubtitleVisible, setHeroSubtitleVisible] = useState(false)
  const [heroButtonsVisible, setHeroButtonsVisible] = useState(false)

  useEffect(() => {
    // Trigger hero text animations in sequence
    setTimeout(() => setHeroSubtitleVisible(true), 800)
    setTimeout(() => setHeroButtonsVisible(true), 1300)

    // Function to check if element is in viewport
    const isInViewport = (element: Element) => {
      const rect = element.getBoundingClientRect()
      return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 && rect.bottom >= 0
    }

    // Handle scroll animations
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

  // Effect for automatically changing routes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRouteIndex((prev) => (prev + 1) % popularRoutes.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Calculate price excluding VAT for Dutch language
  const calculateExclVAT = (price: number) => {
    return Math.round(price * 0.91)
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/S-class/cover.avif" alt="Luxury Mercedes S-Class" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 container grid lg:grid-cols-2 gap-8 items-center">
          <div className="text-white space-y-6">
            <div className="text-4xl md:text-6xl font-bold leading-tight">
              <AnimatedText text={t("heroTitle")} className="justify-start" />
            </div>
            <p
              className={`text-xl md:text-2xl text-white/90 transform transition-all duration-700 ${
                heroSubtitleVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
              }`}
            >
              {t("heroSubtitle")}
            </p>
            <div
              className={`flex flex-col sm:flex-row gap-4 transform transition-all duration-700 ${
                heroButtonsVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
              }`}
            >
              <Button
                size="lg"
                className=" text-white font-semibold py-2 px-4 rounded-lg bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 hover:from-pink-600 hover:via-red-600 hover:to-orange-600"
                asChild
              >
                <Link href="/book">
                  {t("bookYourRide")} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white hover:bg-white text-black hover:opacity-80"
                asChild
              >
                <Link href="/services">{t("viewServices")}</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop Booking Form */}
        {!isMobile && showBookingForm && (
          <div className="fixed top-20 right-8 z-40 max-w-md hidden lg:block">
            <BookingForm onClose={() => setShowBookingForm(false)} />
          </div>
        )}
      </section>

      {/* Popular Routes */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12 fade-in-section">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("popularRoutes")}</h2>
          </div>

          <div className="fade-in-section">
            <div className="relative h-32 overflow-hidden">
              {popularRoutes.map((route, index) => (
                <div
                  key={index}
                  className={cn(
                    "absolute inset-0 flex items-center justify-center transition-all duration-500",
                    index === currentRouteIndex ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                  )}
                >
                  <Card className="p-6 w-full max-w-2xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-4">
                          <span className="text-lg font-semibold">{route.from}</span>
                          <ArrowRight className="h-5 w-5 text-orange-500" />
                          <span className="text-lg font-semibold">{route.to}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span>{route.distance}</span>
                          <span>{route.time}</span>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        {language === "nl" ? (
                          <div className="text-right">
                            <div className="text-2xl font-bold">€{route.price.toFixed(2)}</div>
                            <div className="text-sm text-muted-foreground">
                              (excl. btw €{Math.round(route.price * 0.91)})
                            </div>
                          </div>
                        ) : (
                          <div className="text-2xl font-bold dark:text-white text-orange-500">{formatPrice(route.price)}</div>
                        )}
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>

            <div className="text-center mt-6">
              <Button
                asChild
                className=" text-white font-semibold py-2 px-4 rounded-lg bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 hover:from-pink-600 hover:via-red-600 hover:to-orange-600"
              >
                <Link href="/services">{t("viewAllRoutes")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12 fade-in-section">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("whyLuxuryClass")}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4 fade-in-section">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold">{t("ccvCertificate")}</h3>
              <p className="text-muted-foreground">{t("ccvDescription")}</p>
            </div>

            <div className="text-center space-y-4 fade-in-section">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto">
                <Car className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold">{t("latestVehicles")}</h3>
              <p className="text-muted-foreground">{t("latestDescription")}</p>
            </div>

            <div className="text-center space-y-4 fade-in-section">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto">
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold">{t("experience")}</h3>
              <p className="text-muted-foreground">{t("experienceDescription")}</p>
            </div>

            <div className="text-center space-y-4 fade-in-section">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold">{t("satisfiedCustomers1000")}</h3>
              <p className="text-muted-foreground">{t("satisfiedDescription")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Partners */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12 fade-in-section">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("trustedPartners")}</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
            {partners.map((partner, index) => (
              <div key={index} className="flex items-center justify-center fade-in-section">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={120}
                  height={60}
                  className="object-contain aspect-[2/1]"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-500 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 fade-in-section">{t("readyForPremium")}</h2>
          <p className="text-xl mb-8 text-white/90 fade-in-section">{t("ctaDescription")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-section">
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="bg-white hover:bg-gray-100 text-orange-500 dark:bg-white dark:hover:bg-gray-100 dark:text-red-600"
            >
              <Link href="/book">{t("bookYourRide")}</Link>
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white hover:bg-gray-100 text-orange-500 dark:bg-white dark:hover:bg-gray-100 dark:text-red-600"
              asChild
            >
              <Link href="/contact">{t("contact")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
