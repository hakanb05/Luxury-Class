"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Shield, Users, Clock, Award, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/contexts/language-context"
import AnimatedText from "@/components/ui/animated-text"

const skills = [
  {
    titleKey: "professionalDriving",
    pointsKeys: ["ccvCertificate", "defensiveDriving", "routePlanning", "safeDriving"],
  },
  {
    titleKey: "customerService",
    pointsKeys: [
      "multilingualCommunication",
      "discretionConfidentiality",
      "punctualityReliability",
      "professionalAppearance",
    ],
  },
  {
    titleKey: "vehicleExpertise",
    pointsKeys: ["mercedesSpecialist", "vehicleMaintenance", "safetySystemProficiency", "comfortOptimization"],
  },
  {
    titleKey: "localKnowledge",
    pointsKeys: ["amsterdamExpertise", "airportProcedures", "businessNavigation", "culturalAwareness"],
  },
]

const partners = [
  { name: "ING", logo: "/images/logos/ing.png" },
  { name: "KNVB", logo: "/images/logos/knvb.png" },
  { name: "Audemars Piguet", logo: "images/logos/ap_audemars.png" },
  { name: "Heineken", logo: "images/logos/heineken.png" },
  { name: "Feadship", logo: "/images/logos/feadship.png" },
]

export default function AboutPageContent() {
  const { t } = useLanguage()

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
            <AnimatedText text={t("aboutLuxuryClass")} />
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto fade-in-section">{t("aboutSubtitle")}</p>
        </div>
      </section>

      {/* Excellence Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 fade-in-section">
              <h2 className="text-3xl font-bold">{t("excellenceInEveryJourney")}</h2>
              <p className="text-lg text-muted-foreground">{t("aboutDescription1")}</p>
              <p className="text-lg text-muted-foreground">{t("aboutDescription2")}</p>

              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  </div>
                  <span>{t("defensiveDriving")}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  </div>
                  <span>{t("professionalBehavior")}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  </div>
                  <span>{t("routePlanning")}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  </div>
                  <span>{t("safeDriving")}</span>
                </li>
              </ul>
            </div>
            <div className="fade-in-section">
              <Image
                src="/images/chaffeur.jpeg"
                alt={t("aboutLuxuryClass")}
                width={600}
                height={400}
                className="rounded-lg shadow-lg w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-4 fade-in-section">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold">10+</div>
              <div className="text-muted-foreground">{t("yearsExperience")}</div>
            </div>
            <div className="space-y-4 fade-in-section">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold">1000+</div>
              <div className="text-muted-foreground">{t("satisfiedCustomers")}</div>
            </div>
            <div className="space-y-4 fade-in-section">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto">
                <Award className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold">100%</div>
              <div className="text-muted-foreground">{t("licensedChauffeurs")}</div>
            </div>
            <div className="space-y-4 fade-in-section">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-muted-foreground">{t("availableService")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Premium Fleet */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12 fade-in-section">
            <h2 className="text-3xl font-bold mb-4">{t("ourFleet")}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-lg overflow-hidden border fade-in-section flex flex-col h-full">
              <div className="relative w-full h-72">
                <Image src="/images/V-class/side2.jpeg" alt={t("vClass")} fill className="object-cover" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2">{t("vClass")}</h3>
                <p className="text-muted-foreground mb-4">{t("vClassDescriptionAbout")}</p>
                <ul className="space-y-2 mb-6 flex-grow">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    <span>{t("premiumAirConditioning")}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    <span>{t("comfortableLeatherSeats")}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    <span>{t("ampleLegroom")}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    <span>{t("highSpeedWifi")}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    <span>{t("complimentaryWater")}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    <span>{t("usbChargers")}</span>
                  </li>
                </ul>
                <Button
                  asChild
                  className="w-full text-white font-semibold py-2 px-4 rounded-lg bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 hover:from-pink-600 hover:via-red-600 hover:to-orange-600"
                >
                  <Link href="/vehicles?tab=v-class">{t("viewVclass")}</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden border fade-in-section flex flex-col h-full">
              <div className="relative w-full h-72">
                <Image src="/images/S-class/cover.avif" alt={t("sClass")} fill className="object-cover" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2">{t("sClass")}</h3>
                <p className="text-muted-foreground mb-4">{t("sClassDescriptionAbout")}</p>
                <ul className="space-y-2 mb-6 flex-grow">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    <span>{t("ultimateComfortSeats")}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    <span>{t("premiumSound")}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    <span>{t("climateControl")}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    <span>{t("privacyGlass")}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    <span>{t("executiveAmenities")}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    <span>{t("smoothQuietRide")}</span>
                  </li>
                </ul>
                <Button
                  asChild
                  className="w-full text-white font-semibold py-2 px-4 rounded-lg bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 hover:from-pink-600 hover:via-red-600 hover:to-orange-600"
                >
                  <Link href="/vehicles?tab=s-class">{t("viewSclass")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Partners */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12 fade-in-section">
            <h2 className="text-3xl font-bold mb-4">{t("trustedPartners")}</h2>
            <p className="text-xl text-muted-foreground">{t("trustedPartnersDescription")}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
            {partners.map((partner, index) => (
              <div key={index} className="flex items-center justify-center fade-in-section">
                <Image src={partner.logo || "/placeholder.svg"} alt={partner.name} width={120} height={60} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
