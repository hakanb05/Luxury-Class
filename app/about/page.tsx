"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Shield, Users, Clock, Award, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/contexts/language-context"
import AnimatedText from "@/components/ui/animated-text"

const skills = [
  {
    title: "Professional Driving",
    titleNL: "Professioneel Rijden",
    points: [
      "CCV-D1 certified chauffeurs",
      "Defensive driving techniques",
      "Route optimization expertise",
      "Traffic management skills",
    ],
    pointsNL: [
      "CCV-D1 gecertificeerde chauffeurs",
      "Defensieve rijtechnieken",
      "Expertise in route-optimalisatie",
      "Verkeersmanagement vaardigheden",
    ],
  },
  {
    title: "Customer Service",
    titleNL: "Klantenservice",
    points: [
      "Multilingual communication",
      "Discretion and confidentiality",
      "Punctuality and reliability",
      "Professional appearance",
    ],
    pointsNL: [
      "Meertalige communicatie",
      "Discretie en vertrouwelijkheid",
      "Stiptheid en betrouwbaarheid",
      "Professionele uitstraling",
    ],
  },
  {
    title: "Vehicle Expertise",
    titleNL: "Voertuig Expertise",
    points: [
      "Mercedes-Benz specialist knowledge",
      "Vehicle maintenance awareness",
      "Safety system proficiency",
      "Comfort feature optimization",
    ],
    pointsNL: [
      "Mercedes-Benz specialistische kennis",
      "Bewustzijn van voertuigonderhoud",
      "Vaardigheid met veiligheidssystemen",
      "Optimalisatie van comfortfuncties",
    ],
  },
  {
    title: "Local Knowledge",
    titleNL: "Lokale Kennis",
    points: [
      "Amsterdam area expertise",
      "Airport procedures familiarity",
      "Business district navigation",
      "Cultural awareness",
    ],
    pointsNL: [
      "Expertise in Amsterdam en omgeving",
      "Bekendheid met luchthavenprocessen",
      "Navigatie in zakendistrict",
      "Cultureel bewustzijn",
    ],
  },
]

const partners = [
  { name: "ING", logo: "/images/logos/ing.png" },
  { name: "KNVB", logo: "/images/logos/knvb.png" },
  { name: "Audemars Piguet", logo: "images/logos/ap_audemars.png" },
  { name: "Heineken", logo: "images/logos/heineken.png" },
  { name: "Feadship", logo: "/images/logos/feadship.png" },
]

export default function AboutPage() {
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
            <AnimatedText text={language === "nl" ? "Over Luxury Class" : "About Luxury Class"} />
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto fade-in-section">
            {language === "nl"
              ? "Meer dan 10 jaar uitmuntendheid in luxe vervoersdiensten in Amsterdam"
              : "Over 10 years of excellence in luxury transportation services in Amsterdam"}
          </p>
        </div>
      </section>

      {/* Excellence Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 fade-in-section">
              <h2 className="text-3xl font-bold">
                {language === "nl" ? "Uitmuntendheid in Elke Reis" : "Excellence in Every Journey"}
              </h2>
              <p className="text-lg text-muted-foreground">
                {language === "nl"
                  ? "Met meer dan tien jaar ervaring in luxe vervoer heeft Luxury Class zich gevestigd als de premier chauffeursdienst in Amsterdam. Onze toewijding aan uitmuntendheid, veiligheid en klanttevredenheid onderscheidt ons."
                  : "With over a decade of experience in luxury transportation, Luxury Class has established itself as the premier chauffeur service in Amsterdam. Our commitment to excellence, safety, and customer satisfaction sets us apart."}
              </p>
              <p className="text-lg text-muted-foreground">
                {language === "nl"
                  ? "Al onze chauffeurs hebben het prestigieuze CCV-D1 Certificaat, wat de hoogste standaarden van professioneel rijden garandeert. Deze certificering garandeert:"
                  : "All our chauffeurs hold the prestigious CCV-D1 Certificate, ensuring the highest standards of professional driving. This certification guarantees:"}
              </p>

              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  </div>
                  <span>
                    {language === "nl" ? "Defensief en anticiperend rijden" : "Defensive and anticipatory driving"}
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  </div>
                  <span>
                    {language === "nl" ? "Professioneel gedrag en etiquette" : "Professional behavior and etiquette"}
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  </div>
                  <span>
                    {language === "nl"
                      ? "Routeplanning en discrete communicatie"
                      : "Route planning and discrete communication"}
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  </div>
                  <span>
                    {language === "nl"
                      ? "Veilige en comfortabele rijtechnieken"
                      : "Safe and comfortable driving techniques"}
                  </span>
                </li>
              </ul>
            </div>
            <div className="fade-in-section">
              <Image
                src="/placeholder.svg?height=400&width=600&text=About+Us"
                alt={language === "nl" ? "Over Luxury Class" : "About Luxury Class"}
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
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
              <div className="text-muted-foreground">
                {language === "nl" ? "Jaren Ervaring" : "Years of Experience"}
              </div>
            </div>
            <div className="space-y-4 fade-in-section">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold">1000+</div>
              <div className="text-muted-foreground">
                {language === "nl" ? "Tevreden Klanten" : "Satisfied Customers"}
              </div>
            </div>
            <div className="space-y-4 fade-in-section">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto">
                <Award className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold">100%</div>
              <div className="text-muted-foreground">
                {language === "nl" ? "Gecertificeerde Chauffeurs" : "Licensed Chauffeurs"}
              </div>
            </div>
            <div className="space-y-4 fade-in-section">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-muted-foreground">
                {language === "nl" ? "Beschikbare Service" : "Available Service"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Skills */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12 fade-in-section">
            <h2 className="text-3xl font-bold mb-4">
              {language === "nl" ? "Professionele Vaardigheden" : "Professional Skills"}
            </h2>
            <p className="text-xl text-muted-foreground">
              {language === "nl"
                ? "Onze chauffeurs zijn getraind in meerdere gebieden om uitzonderlijke service te garanderen"
                : "Our chauffeurs are trained in multiple areas to ensure exceptional service"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <Card key={index} className="fade-in-section">
                <CardHeader>
                  <CardTitle className="text-lg">{language === "nl" ? skill.titleNL : skill.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {(language === "nl" ? skill.pointsNL : skill.points).map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Premium Fleet */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12 fade-in-section">
            <h2 className="text-3xl font-bold mb-4">
              {language === "nl" ? "Ons Premium Wagenpark" : "Our Premium Fleet"}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-lg overflow-hidden border fade-in-section">
              <Image
                src="/images/v-class.png"
                alt="Mercedes V-Class"
                width={600}
                height={400}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">
                  {language === "nl" ? "Mercedes-Benz V-Klasse" : "Mercedes-Benz V-Class"}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {language === "nl"
                    ? "Perfect voor groepen en families, onze V-Klasse voertuigen bieden ruim comfort voor maximaal 7 passagiers."
                    : "Perfect for groups and families, our V-Class vehicles offer spacious comfort for up to 7 passengers."}
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    <span>{language === "nl" ? "Premium airconditioning" : "Premium air conditioning"}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    <span>{language === "nl" ? "Comfortabele lederen stoelen" : "Comfortable leather seats"}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    <span>{language === "nl" ? "Ruime beenruimte en opslag" : "Ample legroom and storage"}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    <span>{language === "nl" ? "Snelle WiFi" : "High-speed WiFi"}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    <span>{language === "nl" ? "Gratis water" : "Complimentary water"}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    <span>{language === "nl" ? "USB-C snelladers" : "USB-C fast chargers"}</span>
                  </li>
                </ul>
                <Button
                  asChild
                  className="w-full bg-orange-500 hover:bg-orange-600 dark:bg-red-600 dark:hover:bg-red-700 dark:border dark:border-white"
                >
                  <Link href="/vehicles?tab=v-class">{language === "nl" ? "Bekijk V-Klasse" : "View V-Class"}</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden border fade-in-section">
              <Image
                src="/images/s-class.png"
                alt="Mercedes S-Class"
                width={600}
                height={400}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">
                  {language === "nl" ? "Mercedes-Benz S-Klasse" : "Mercedes-Benz S-Class"}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {language === "nl"
                    ? "Het toppunt van luxe, onze S-Klasse sedans bieden een exclusieve ervaring voor maximaal 3 passagiers."
                    : "The epitome of luxury, our S-Class sedans provide an exclusive experience for up to 3 passengers."}
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    <span>{language === "nl" ? "Ultieme comfortstoelen" : "Ultimate comfort seats"}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    <span>{language === "nl" ? "Premium geluidssysteem" : "Premium sound system"}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    <span>{language === "nl" ? "Klimaatbeheersing" : "Climate control"}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    <span>{language === "nl" ? "Privacy glas" : "Privacy glass"}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    <span>{language === "nl" ? "Executive voorzieningen" : "Executive amenities"}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    <span>{language === "nl" ? "Soepele, stille rit" : "Smooth, quiet ride"}</span>
                  </li>
                </ul>
                <Button
                  asChild
                  className="w-full bg-orange-500 hover:bg-orange-600 dark:bg-red-600 dark:hover:bg-red-700 dark:border dark:border-white"
                >
                  <Link href="/vehicles?tab=s-class">{language === "nl" ? "Bekijk S-Klasse" : "View S-Class"}</Link>
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
            <p className="text-xl text-muted-foreground">
              {language === "nl"
                ? "We zijn er trots op dat we toonaangevende bedrijven en organisaties mogen bedienen"
                : "We're proud to serve leading companies and organizations"}
            </p>
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
    </div>
  )
}
