"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Plane, Clock, ArrowRight, Car, Shield, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/contexts/language-context"
import AnimatedText from "@/components/ui/animated-text"

export default function ServicesPage() {
  // Initialize with default values to prevent hydration errors
  const [mounted, setMounted] = useState(false)
  const languageContext = useLanguage()

  const { t } = languageContext

  // Set mounted state after component mounts
  useEffect(() => {
    setMounted(true)
  }, [])

  const services = [
    {
      icon: MapPin,
      title: t("cityToCityRides"),
      description: t("cityToCityDescription"),
      features: [t("freeWaitTime"), t("directRoutes"), t("fixedPricing"), t("comfortableJourney")],
      image: "images/services/city-to-city.png",
      serviceType: "one-way",
    },
    {
      icon: Plane,
      title: t("airportTransfers"),
      description: t("airportDescription"),
      features: [t("oneHourWait"), t("flightMonitoring"), t("meetGreet"), t("luggageAssistance")],
      image: "images/services/airport.webp",
      serviceType: "one-way",
    },
    {
      icon: Clock,
      title: t("hourlyHire"),
      description: t("hourlyDescription"),
      features: [t("minimumBooking"), t("kmIncluded"), t("flexibleItinerary"), t("perfectForBusiness")],
      image: "images/services/by-the-hour.jpeg",
      serviceType: "hourly",
    },
  ]

  // Function to check if element is in viewport
  const isInViewport = (element: Element) => {
    const rect = element.getBoundingClientRect()
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 && rect.bottom >= 0
  }

  // Handle scroll animations
  useEffect(() => {
    if (!mounted) return

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
  }, [mounted])

  // If not mounted yet, show a simple loading state
  if (!mounted) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse">Laden...</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-muted/30">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <AnimatedText text={t("ourServices")} />
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto fade-in-section">{t("servicesDescription")}</p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="container space-y-16">
          {services.map((service, index) => (
            <div
              key={index}
              className={`grid lg:grid-cols-2 gap-8 items-center fade-in-section ${
                index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}
            >
              <div className={`space-y-6 ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                    <service.icon className="h-6 w-6 text-orange-500" />
                  </div>
                  <h2 className="text-3xl font-bold">{service.title}</h2>
                </div>
                <p className="text-lg text-muted-foreground">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className="bg-orange-500 hover:bg-orange-600 dark:bg-red-600 dark:hover:bg-red-700 dark:border dark:border-white"
                >
                  <Link href={`/book?service=${service.serviceType}`}>
                    {t("bookThisService")} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  width={500}
                  height={300}
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-muted/30">
  <div className="container">
    <div className="text-center mb-12 fade-in-section">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("transparentPricing")}</h2>
    </div>

    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      <Card className="relative overflow-hidden flex flex-col h-full fade-in-section">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full -mr-16 -mt-16" />
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Car className="h-6 w-6 text-orange-500" />
            <CardTitle>Mercedes-Benz V-Klasse</CardTitle>
          </div>
          <CardDescription>Tot 7 passagiers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 flex-grow">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-500" />
                <span className="font-medium">{t("hourlyRate")}</span>
              </div>
              <span className="text-2xl font-bold text-foreground dark:text-white">€85/hour</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <Plane className="h-4 w-4 text-orange-500" />
                <span className="font-medium">{t("airportServices")}</span>
              </div>
              <div className="pl-6 space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{t("arrivalAmsterdam")}</span>
                  <span className="font-semibold dark:text-white">€130</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{t("departureAmsterdam")}</span>
                  <span className="font-semibold dark:text-white">€105</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-orange-500" />
                <span className="font-medium">{t("cityTransfer")}</span>
              </div>
              <span className="font-bold dark:text-white">€95</span>
            </div>
          </div>

          <div className="pt-4 border-t space-y-2">
            <h4 className="font-semibold flex items-center gap-2">
              <Shield className="h-4 w-4 text-orange-500" />
              {t("includedAmenities")}
            </h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>✓ {t("highSpeedWifi")}</li>
              <li>✓ {t("complimentaryWater")}</li>
              <li>✓ {t("usbChargers")}</li>
              <li>✓ {t("kmIncluded")}</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="mt-auto">
          <Button className="w-full bg-orange-500 hover:bg-orange-600 dark:bg-red-600 dark:hover:bg-red-700 dark:border dark:border-white" asChild>
            <Link href="/vehicles?tab=v-class">{t("viewVclass")}</Link>
          </Button>
        </CardFooter>
      </Card>

      <Card className="relative overflow-hidden flex flex-col h-full fade-in-section">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full -mr-16 -mt-16" />
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Car className="h-6 w-6 text-orange-500" />
            <CardTitle>Mercedes-Benz S-Klasse</CardTitle>
          </div>
          <CardDescription>Tot 3 passagiers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 flex-grow">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-500" />
                <span className="font-medium">{t("hourlyRate")}</span>
              </div>
              <span className="text-2xl font-bold text-foreground dark:text-white">€95/hour</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <Plane className="h-4 w-4 text-orange-500" />
                <span className="font-medium">{t("airportServices")}</span>
              </div>
              <div className="pl-6 space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{t("arrivalAmsterdam")}</span>
                  <span className="font-semibold dark:text-white">€140</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{t("departureAmsterdam")}</span>
                  <span className="font-semibold dark:text-white">€115</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-orange-500" />
                <span className="font-medium">{t("cityTransfer")}</span>
              </div>
              <span className="font-bold dark:text-white">€105</span>
            </div>
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground flex items-start gap-2">
              <CreditCard className="h-4 w-4 text-orange-500 mt-0.5" />
              <span>{t("extraKilometers")}</span>
            </p>
          </div>
        </CardContent>
        <CardFooter className="mt-auto">
          <Button className="w-full bg-orange-500 hover:bg-orange-600 dark:bg-red-600 dark:hover:bg-red-700 dark:border dark:border-white" asChild>
            <Link href="/vehicles?tab=s-class">{t("viewSclass")}</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  </div>
</section>

      {/* CTA Section - Simplified without background image */}
      <section className="py-16 border-t">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 fade-in-section">Klaar om Luxe te Ervaren?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto fade-in-section">
            Kies het voertuig dat het beste bij uw behoeften past en geniet van een premium chauffeurservaring
          </p>
          <div className="fade-in-section">
            <Button
              asChild
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 dark:bg-red-600 dark:hover:bg-red-700 dark:border dark:border-white"
            >
              <Link href="/book">{t("bookNow  ")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
