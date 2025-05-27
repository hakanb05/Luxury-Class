"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  ChevronLeft,
  ChevronRight,
  Users,
  Wifi,
  Droplets,
  Usb,
  Volume2,
  Thermometer,
  Shield,
  Car,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/lib/contexts/language-context"

const vClassImages = [
  "/images/V-class/front.jpeg",
  "/images/V-class/inside.jpeg",
  "/images/V-class/inside2.jpeg",
  "/images/V-class/side.jpeg",
  "/images/V-class/side2.jpeg",
]

const sClassImages = [
  "/images/S-class/front.webp",
  "/images/S-class/cover.avif",
  "/images/cover.jpg",
  "images/S-class/back.jpg",
  "/images/S-class/side.jpg",
]

function VehiclesContent() {
  const { t, formatPrice, language } = useLanguage()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("s-class")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab === "s-class" || tab === "v-class") {
      setActiveTab(tab)
      // Reset current image index when tab changes
      setCurrentImageIndex(0)
    }
  }, [searchParams])

  useEffect(() => {
    const timer = setInterval(() => {
      const images = activeTab === "v-class" ? vClassImages : sClassImages
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [activeTab])

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

  const currentImages = activeTab === "v-class" ? vClassImages : sClassImages

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % currentImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length)
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-muted/30">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 fade-in-section">{t("ourFleet")}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto fade-in-section">{t("fleetDescription")}</p>
        </div>
      </section>

      {/* Vehicle Tabs */}
      <section className="py-8">
        <div className="container">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
              <TabsTrigger value="s-class">{t("sClass")}</TabsTrigger>
              <TabsTrigger value="v-class">{t("vClass")}</TabsTrigger>
            </TabsList>

            <TabsContent value="v-class">
              <div className="grid lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold">Mercedes-Benz V-Class</h2>
                  <p className="text-lg text-muted-foreground">{t("vClassDescription")}</p>

                  <div>
                    <h3 className="text-xl font-semibold mb-4">{t("specifications")}</h3>
                    <ul className="space-y-2 text-muted-foreground mb-6">
                      <li>• {t("capacity")}</li>
                      <li>• {t("luggage")}</li>
                      <li>• {t("amenities")}</li>
                      <li>• {t("perfectFor")}</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4">{t("keyFeatures")}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-orange-500" />
                        </div>
                        <span>{t("upTo7Passengers")}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                          <Wifi className="h-5 w-5 text-orange-500" />
                        </div>
                        <span>{t("highSpeedWifi")}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                          <Droplets className="h-5 w-5 text-orange-500" />
                        </div>
                        <span>{t("complimentaryWater")}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                          <Usb className="h-5 w-5 text-orange-500" />
                        </div>
                        <span>{t("usbChargers")}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                          <Volume2 className="h-5 w-5 text-orange-500" />
                        </div>
                        <span>{t("premiumSound")}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                          <Thermometer className="h-5 w-5 text-orange-500" />
                        </div>
                        <span>{t("climateControl")}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="relative w-full max-w-full overflow-hidden">
                    <Image
                      src={currentImages[currentImageIndex] || "/placeholder.svg"}
                      alt="Mercedes V-Class"
                      width={600}
                      height={620}
                      className="rounded-lg shadow-lg w-full h-[300px] md:h-[400px]"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex space-x-2 overflow-x-auto pb-2">
                    {currentImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded border-2 overflow-hidden ${
                          index === currentImageIndex
                            ? "border-orange-500 dark:border-red-600"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      >
                        <div className="w-full h-full relative">
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`Thumbnail ${index + 1}`}
                            width={64}
                            height={64}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Button
                  asChild
                  size="lg"
                  className=" text-white font-semibold py-2 px-4 rounded-lg bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 hover:from-pink-600 hover:via-red-600 hover:to-orange-600"
                >
                  <Link href="/book?vehicle=v-class">{t("bookVClass")}</Link>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="s-class">
              <div className="grid lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold">{t("sClass")}</h2>
                  <p className="text-lg text-muted-foreground">{t("sClassDescription")}</p>

                  <div>
                    <h3 className="text-xl font-semibold mb-4">{t("specifications")}</h3>
                    <ul className="space-y-2 text-muted-foreground mb-6">
                      <li>• {t("sClassCapacity")}</li>
                      <li>• {t("sClassLuggage")}</li>
                      <li>• {t("sClassAmenities")}</li>
                      <li>• {t("sClassPerfectFor")}</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4">{t("keyFeatures")}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-orange-500" />
                        </div>
                        <span>{t("upTo3Passengers")}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                          <Volume2 className="h-5 w-5 text-orange-500" />
                        </div>
                        <span>{t("premiumSound")}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                          <Thermometer className="h-5 w-5 text-orange-500" />
                        </div>
                        <span>{t("multiZoneClimate")}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-orange-500" />
                        </div>
                        <span>{t("executiveSeating")}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                          <Shield className="h-5 w-5 text-orange-500" />
                        </div>
                        <span>{t("noiseCancellation")}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                          <Shield className="h-5 w-5 text-orange-500" />
                        </div>
                        <span>{t("privacyGlass")}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="relative w-full max-w-full overflow-hidden">
                    <Image
                      src={currentImages[currentImageIndex] || "/placeholder.svg"}
                      alt="Mercedes S-Class"
                      width={600}
                      height={400}
                      className="rounded-lg shadow-lg w-full h-[300px] md:h-[400px] object-cover"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex space-x-2 overflow-x-auto pb-2">
                    {currentImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded border-2 overflow-hidden ${
                          index === currentImageIndex
                            ? "border-orange-500 dark:border-red-600"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      >
                        <div className="w-full h-full relative">
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`Thumbnail ${index + 1}`}
                            width={64}
                            height={64}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-orange-500 hover:bg-orange-600 dark:bg-red-600 dark:hover:bg-red-700 dark:border dark:border-white"
                >
                  <Link href="/book?vehicle=s-class">Book S-Class</Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12 fade-in-section">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("transparentPricing")}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-card rounded-lg shadow-lg p-6 border h-full">
              <div className="mb-4">
                <h3 className="text-xl font-bold flex items-center">
                  <Car className="h-5 w-5 text-orange-500 mr-2" />
                  Mercedes-Benz V-Class
                </h3>
                <p className="text-sm text-muted-foreground">Up to 7 passengers</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <span>{t("hourlyRate")}</span>
                  </span>
                  <span className="font-semibold">
                    {language === "nl" ? (
                      <>
                        €85 <span className="text-xs text-muted-foreground">(excl. btw €78)</span>
                        {t("hour")}
                      </>
                    ) : (
                      <>
                        {formatPrice(85)}
                        {t("hour")}
                      </>
                    )}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{t("arrivalAmsterdam")}</span>
                    <span>
                      {language === "nl" ? (
                        <>
                          €130 <span className="text-xs text-muted-foreground">(excl. btw €120)</span>
                        </>
                      ) : (
                        <>{formatPrice(130)}</>
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>{t("departureAmsterdam")}</span>
                    <span>
                      {language === "nl" ? (
                        <>
                          €105 <span className="text-xs text-muted-foreground">(excl. btw €97)</span>
                        </>
                      ) : (
                        <>{formatPrice(105)}</>
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span>{t("cityTransfer")}</span>
                  <span className="font-semibold">
                    {language === "nl" ? (
                      <>
                        €95 <span className="text-xs text-muted-foreground">(excl. btw €88)</span>
                      </>
                    ) : (
                      <>{formatPrice(95)}</>
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{t("extraKilometers")}</span>
                  <span>€1.75/km</span>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  className="w-full text-white font-semibold py-2 px-4 rounded-lg bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 hover:from-pink-600 hover:via-red-600 hover:to-orange-600"
                  asChild
                >
                  <Link href="/vehicles?tab=v-class">View V-Class Details</Link>
                </Button>
              </div>
            </div>

            <div className="bg-white dark:bg-card rounded-lg shadow-lg p-6 border h-full">
              <div className="mb-4">
                <h3 className="text-xl font-bold flex items-center">
                  <Car className="h-5 w-5 text-orange-500 mr-2" />
                  Mercedes-Benz S-Class
                </h3>
                <p className="text-sm text-muted-foreground">Up to 3 passengers</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <span>{t("hourlyRate")}</span>
                  </span>
                  <span className="font-semibold">
                    {language === "nl" ? (
                      <>
                        €95 <span className="text-xs text-muted-foreground">(excl. btw €87)</span>
                        {t("hour")}
                      </>
                    ) : (
                      <>
                        {formatPrice(95)}
                        {t("hour")}
                      </>
                    )}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{t("arrivalAmsterdam")}</span>
                    <span>
                      {language === "nl" ? (
                        <>
                          €140 <span className="text-xs text-muted-foreground">(excl. btw €129)</span>
                        </>
                      ) : (
                        <>{formatPrice(140)}</>
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>{t("departureAmsterdam")}</span>
                    <span>
                      {language === "nl" ? (
                        <>
                          €115 <span className="text-xs text-muted-foreground">(excl. btw €106)</span>
                        </>
                      ) : (
                        <>{formatPrice(115)}</>
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span>{t("cityTransfer")}</span>
                  <span className="font-semibold">
                    {language === "nl" ? (
                      <>
                        €105 <span className="text-xs text-muted-foreground">(excl. btw €97)</span>
                      </>
                    ) : (
                      <>{formatPrice(105)}</>
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{t("extraKilometers")}</span>
                  <span>€1.75/km</span>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  className="w-full text-white font-semibold py-2 px-4 rounded-lg bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 hover:from-pink-600 hover:via-red-600 hover:to-orange-600"
                  asChild
                >
                  <Link href="/vehicles?tab=s-class">View S-Class Details</Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="text-center mt-8 text-sm text-muted-foreground fade-in-section">
            <p>{t("hourlyRateExplanation")}</p>
            <p className="mt-2">{t("regionExplanation")}</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function VehiclesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VehiclesContent />
    </Suspense>
  )
}
