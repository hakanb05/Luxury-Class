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
  { name: "KNVB", logo: "/images/logos/knvb.png" },
  { name: "Audemars Piguet", logo: "images/logos/ap_audemars.png" },
  { name: "Heineken", logo: "images/logos/heineken.png" },
  { name: "Feadship", logo: "/images/logos/feadship.png" },
]

export default function BusinessPage() {
  const { t, language } = useLanguage()

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
            <AnimatedText text={language === "nl" ? "Zakelijke Oplossingen" : "Business Solutions"} />
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto fade-in-section">
            {language === "nl"
              ? "Premium chauffeursdiensten op maat voor zakelijke behoeften"
              : "Premium chauffeur services tailored to corporate needs"}
          </p>
        </div>
      </section>

      {/* Corporate Transportation */}
      <section className="py-16">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 fade-in-section px-4 md:px-0">
              <h2 className="text-3xl font-bold">
                {language === "nl" ? "Verhoog Uw Zakelijk Vervoer" : "Elevate Your Corporate Transportation"}
              </h2>
              <p className="text-lg text-muted-foreground dark:text-gray-300 break-words">
                {language === "nl"
                  ? "Luxury Class biedt premium chauffeursdiensten speciaal ontworpen voor bedrijven. Van executive luchthaven transfers tot meerdaagse zakelijke evenementen, wij zorgen ervoor dat uw team en klanten reizen in comfort, stijl en absolute professionaliteit."
                  : "Luxury Class provides premium chauffeur services designed specifically for businesses. From executive airport transfers to multi-day corporate events, we ensure your team and clients travel in comfort, style, and absolute professionalism."}
              </p>

              <p className="text-lg text-muted-foreground dark:text-gray-300 break-words">
                {language === "nl" ? "Onze zakelijke oplossingen omvatten:" : "Our business solutions include:"}
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
                  <span className="dark:text-white">
                    {language === "nl" ? "Executive luchthaven transfers" : "Executive airport transfers"}
                  </span>
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
                  <span className="dark:text-white">
                    {language === "nl" ? "Vervoer voor zakelijke evenementen" : "Corporate event transportation"}
                  </span>
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
                  <span className="dark:text-white">
                    {language === "nl" ? "Roadshows en multi-city tours" : "Roadshows and multi-city tours"}
                  </span>
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
                  <span className="dark:text-white">
                    {language === "nl" ? "Klantentertainment en VIP-diensten" : "Client entertainment and VIP services"}
                  </span>
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
                  <span className="dark:text-white">
                    {language === "nl" ? "Aangepaste vervoersoplossingen" : "Customized transportation solutions"}
                  </span>
                </li>
              </ul>
            </div>

            <div className="fade-in-section">
              <Image
                src="/images/business-image.png"
                alt={language === "nl" ? "Executive Chauffeursdienst" : "Executive Chauffeur Service"}
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits for Business */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12 fade-in-section">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {language === "nl" ? "Voordelen voor Zakelijke Klanten" : "Benefits for Business Clients"}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-background rounded-lg p-6 border fade-in-section">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-4">
                <Briefcase className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                {language === "nl" ? "Zakelijke Accounts" : "Corporate Accounts"}
              </h3>
              <p className="text-muted-foreground dark:text-gray-300 break-words">
                {language === "nl"
                  ? "Vereenvoudigde facturering met maandelijkse facturatie en gedetailleerde rittenrapporten voor eenvoudig kostenbeheer."
                  : "Simplified billing with monthly invoicing and detailed trip reports for easy expense management."}
              </p>
            </div>

            <div className="bg-background rounded-lg p-6 border fade-in-section">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                {language === "nl" ? "Prioriteit Boekingen" : "Priority Booking"}
              </h3>
              <p className="text-muted-foreground dark:text-gray-300 break-words">
                {language === "nl"
                  ? "Gegarandeerde beschikbaarheid met prioriteitsplanning voor zakelijke klanten, zelfs tijdens piekperiodes."
                  : "Guaranteed availability with priority scheduling for corporate clients, even during peak times."}
              </p>
            </div>

            <div className="bg-background rounded-lg p-6 border fade-in-section">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                {language === "nl" ? "Toegewijde Chauffeurs" : "Dedicated Chauffeurs"}
              </h3>
              <p className="text-muted-foreground dark:text-gray-300 break-words">
                {language === "nl"
                  ? "Consistente service met dezelfde professionele chauffeurs die uw voorkeuren begrijpen."
                  : "Consistent service with the same professional chauffeurs who understand your preferences."}
              </p>
            </div>

            <div className="bg-background rounded-lg p-6 border fade-in-section">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-4">
                <Receipt className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">{language === "nl" ? "Fiscaal Aftrekbaar" : "Tax Deductible"}</h3>
              <p className="text-muted-foreground dark:text-gray-300 break-words">
                {language === "nl"
                  ? "Alle zakelijke vervoersdiensten zijn volledig fiscaal aftrekbaar met de juiste documentatie."
                  : "All business transportation services are fully tax deductible with proper documentation provided."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Partners */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12 fade-in-section">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {language === "nl" ? "Vertrouwd Door Toonaangevende Bedrijven" : "Trusted By Leading Companies"}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
            {partners.map((partner, index) => (
              <div key={index} className="flex items-center justify-center fade-in-section">
                <Image
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  width={120}
                  height={60}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-500 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 fade-in-section">
            {language === "nl"
              ? "Klaar om Uw Zakelijke Reizen te Verbeteren?"
              : "Ready to Elevate Your Corporate Travel?"}
          </h2>
          <p className="text-xl mb-8 text-white/90 fade-in-section">
            {language === "nl"
              ? "Neem vandaag nog contact met ons op om uw zakelijke vervoersbehoeften te bespreken en een oplossing op maat te creëren."
              : "Contact us today to discuss your business transportation needs and create a customized solution."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-section">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white hover:bg-gray-100 text-orange-500 dark:bg-white dark:hover:bg-gray-100 dark:text-red-600"
              asChild
            >
              <Link href="/contact">{language === "nl" ? "Neem Contact Op" : "Contact Us"}</Link>
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white hover:bg-gray-100 text-orange-500 dark:bg-white dark:hover:bg-gray-100 dark:text-red-600"
              asChild
            >
              <Link href="/book">{language === "nl" ? "Boek nu" : "Book now"}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
