"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Briefcase, Clock, Users, Receipt } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/contexts/language-context"
import AnimatedText from "@/components/ui/animated-text"

const partners = [
  { name: "ING", logo: "/images/logos/ing.png" },
  { name: "ABN Amro", logo: "/images/logos/abn.png" },
  { name: "Audemars Piguet", logo: "images/logos/ap_audemars.png" },
  { name: "Heineken", logo: "images/logos/heineken.png" },
  { name: "KLM", logo: "/images/logos/klm.jpg" },
]

export default function BusinessPageContent() {
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
            <AnimatedText text={t("businessSolutions")} />
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto fade-in-section">{t("businessDescription")}</p>
        </div>
      </section>

      {/* Corporate Transportation */}
      <section className="py-16">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 fade-in-section px-4 md:px-0">
              <h2 className="text-3xl font-bold">{t("elevateTransportation")}</h2>
              <p className="text-lg text-muted-foreground dark:text-gray-300 break-words">{t("businessText")}</p>

              <p className="text-lg text-muted-foreground dark:text-gray-300 break-words">
                {t("businessSolutionsInclude")}
              </p>

              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-orange-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="dark:text-white">{t("executiveTransfers")}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-orange-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="dark:text-white">{t("corporateEvents")}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-orange-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="dark:text-white">{t("roadshows")}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-orange-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="dark:text-white">{t("clientEntertainment")}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-orange-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="dark:text-white">{t("customizedSolutions")}</span>
                </li>
              </ul>
            </div>

            <div className="fade-in-section">
              <Image
                src="/images/zakelijk_transport.webp"
                alt={t("businessSolutions")}
                width={600}
                height={400}
                className="rounded-lg shadow-lg w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits for Business */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12 fade-in-section">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("benefitsForBusiness")}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-background rounded-lg p-6 border fade-in-section">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-4">
                <Briefcase className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t("corporateAccounts")}</h3>
              <p className="text-muted-foreground dark:text-gray-300 break-words">{t("corporateAccountsText")}</p>
            </div>

            <div className="bg-background rounded-lg p-6 border fade-in-section">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t("priorityBooking")}</h3>
              <p className="text-muted-foreground dark:text-gray-300 break-words">{t("priorityBookingText")}</p>
            </div>

            <div className="bg-background rounded-lg p-6 border fade-in-section">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t("dedicatedChauffeurs")}</h3>
              <p className="text-muted-foreground dark:text-gray-300 break-words">{t("dedicatedChauffeursText")}</p>
            </div>

            <div className="bg-background rounded-lg p-6 border fade-in-section">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-4">
                <Receipt className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t("taxDeductible")}</h3>
              <p className="text-muted-foreground dark:text-gray-300 break-words">{t("taxDeductibleText")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Partners */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12 fade-in-section">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("trustedByCompanies")}</h2>
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

      {/* CTA Section */}
      <section className="py-16 bg-orange-500 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 fade-in-section">{t("readyToElevate")}</h2>
          <p className="text-xl mb-8 text-white/90 fade-in-section">{t("contactToday")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-section">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white hover:bg-gray-100 text-orange-500 dark:bg-white dark:hover:bg-gray-100 dark:text-red-600"
              asChild
            >
              <Link href="/contact">{t("contactUs")}</Link>
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white hover:bg-gray-100 text-orange-500 dark:bg-white dark:hover:bg-gray-100 dark:text-red-600"
              asChild
            >
              <Link href="/book">{t("bookNow")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
