"use client"

import type React from "react"

import { useState, Suspense, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ArrowRight, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/contexts/language-context"
import Link from "next/link"
import AnimatedText from "@/components/ui/animated-text"
import AddressAutocomplete from "@/components/ui/address-autocomplete"

const popularRoutes = [
  { from: "Amsterdam", to: "Schiphol Airport", vClass: 95, sClass: 105 },
  { from: "Amsterdam", to: "Den Haag", vClass: 156.25, sClass: 173.75 },
  { from: "Amsterdam", to: "Rotterdam Airport", vClass: 173.75, sClass: 191.25 },
  { from: "Amsterdam", to: "Haarlem", vClass: 110, sClass: 120 },
]

const internationalRoutes = [
  { from: "Amsterdam", to: "Brussels", vClass: 285, sClass: 315 },
  { from: "Amsterdam", to: "Antwerp", vClass: 245, sClass: 270 },
]

function BookingContent() {
  const { t, formatPrice, language } = useLanguage()
  const searchParams = useSearchParams()

  // Get service type from URL parameters, default to "one-way" if not provided
  const serviceTypeParam = searchParams.get("service")

  const [formData, setFormData] = useState({
    serviceType: serviceTypeParam || "one-way",
    from: "",
    to: "",
    date: "",
    time: "",
    vehicle: searchParams.get("vehicle") || "",
    isBusiness: false,
    companyName: "",
    name: "",
    email: "",
    phone: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

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

  // Update form data when URL parameters change
  useEffect(() => {
    if (serviceTypeParam) {
      setFormData((prev) => ({
        ...prev,
        serviceType: serviceTypeParam,
      }))
    }
  }, [serviceTypeParam])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Booking submitted:", formData)
    setIsSubmitted(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isBusiness: checked }))
  }

  // Handle address changes from autocomplete
  const handleAddressChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col min-h-screen">
        <section className="py-16 flex-1 flex items-center justify-center">
          <div className="container text-center">
            <div className="max-w-md mx-auto space-y-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold">
                {language === "nl" ? "Boekingsaanvraag Verzonden!" : "Booking Request Sent!"}
              </h1>
              <p className="text-muted-foreground">
                {language === "nl"
                  ? "Bedankt voor uw boekingsaanvraag. We nemen binnenkort contact met u op om uw reservering te bevestigen."
                  : "Thank you for your booking request. We will contact you shortly to confirm your reservation."}
              </p>
              <Button
                asChild
                className="bg-orange-500 hover:bg-orange-600 dark:bg-red-600 dark:hover:bg-red-700 dark:border dark:border-white"
              >
                <a href="/">{language === "nl" ? "Terug naar Home" : "Return to Home"}</a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-muted/30">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <AnimatedText text={t("requestBooking")} />
          </h1>
          <p className="text-xl text-muted-foreground fade-in-section">
            {language === "nl"
              ? "Boek uw luxe chauffeursdienst en reis in comfort en stijl"
              : "Book your luxury chauffeur service and travel in comfort and style"}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card className="fade-in-section">
              <CardHeader>
                <CardTitle>{t("requestBooking")}</CardTitle>
                <CardDescription>
                  {language === "nl"
                    ? "Vul het onderstaande formulier in en we nemen contact met u op voor een bevestiging"
                    : "Fill out the form below and we'll get back to you with a confirmation"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Tabs
                    value={formData.serviceType}
                    onValueChange={(value) => handleSelectChange("serviceType", value)}
                    defaultValue={formData.serviceType}
                  >
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="one-way">{t("oneWay")}</TabsTrigger>
                      <TabsTrigger value="hourly">{t("byTheHour")}</TabsTrigger>
                    </TabsList>

                    <TabsContent value="one-way" className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="from">{t("from")}</Label>
                          <AddressAutocomplete
                            id="from"
                            value={formData.from}
                            onChange={(value) => handleAddressChange("from", value)}
                            placeholder={t("amsterdam")}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="to">{t("to")}</Label>
                          <AddressAutocomplete
                            id="to"
                            value={formData.to}
                            onChange={(value) => handleAddressChange("to", value)}
                            placeholder="Rotterdam"
                            required
                          />
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="hourly" className="space-y-4">
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <AddressAutocomplete
                          id="location"
                          value={formData.from}
                          onChange={(value) => handleAddressChange("from", value)}
                          placeholder={t("amsterdam")}
                          required
                        />
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">{t("date")}</Label>
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="time">{t("time")}</Label>
                      <Select
                        value={formData.time}
                        onValueChange={(value) => handleSelectChange("time", value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t("selectTime")} />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 24 }, (_, i) => (
                            <SelectItem key={i} value={`${i.toString().padStart(2, "0")}:00`}>
                              {`${i.toString().padStart(2, "0")}:00`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="vehicle">{t("vehicleType")}</Label>
                    <Select
                      value={formData.vehicle}
                      onValueChange={(value) => handleSelectChange("vehicle", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t("selectVehicle")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="v-class">
                          {language === "nl"
                            ? "Mercedes-Benz V-Klasse (tot 7 passagiers)"
                            : "Mercedes-Benz V-Class (up to 7 passengers)"}
                        </SelectItem>
                        <SelectItem value="s-class">
                          {language === "nl"
                            ? "Mercedes-Benz S-Klasse (tot 3 passagiers)"
                            : "Mercedes-Benz S-Class (up to 3 passengers)"}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="business" checked={formData.isBusiness} onCheckedChange={handleCheckboxChange} />
                    <Label htmlFor="business">{t("business")}</Label>
                  </div>

                  {formData.isBusiness && (
                    <div>
                      <Label htmlFor="companyName">{language === "nl" ? "Bedrijfsnaam" : "Company Name"}</Label>
                      <Input
                        id="companyName"
                        name="companyName"
                        placeholder={language === "nl" ? "Uw bedrijfsnaam" : "Your company name"}
                        value={formData.companyName}
                        onChange={handleInputChange}
                        required={formData.isBusiness}
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">{t("name")}</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder={t("yourName")}
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">{t("email")}</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder={t("yourEmail")}
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">{t("phone")}</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder={t("yourPhone")}
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 dark:bg-red-600 dark:hover:bg-red-700 dark:border dark:border-white"
                  >
                    {t("requestBookingBtn")} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
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
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="fade-in-section">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-orange-500" />
                  <span>{language === "nl" ? "Internationale Routes" : "International Routes"}</span>
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
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="fade-in-section">
              <CardHeader>
                <CardTitle>{language === "nl" ? "Andere Route?" : "Other Route?"}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {language === "nl"
                    ? "Als uw gewenste route hier niet vermeld staat, dien dan toch een boekingsaanvraag in en we zullen u een offerte op maat geven. Voor vragen kunt u contact met ons opnemen."
                    : "If your desired route is not listed here, please submit a booking request anyway and we'll provide you with a custom quote. For any questions, feel free to contact us."}
                </p>
                <Button variant="outline" className="w-full dark:border-white dark:text-white" asChild>
                  <Link href="/contact">{language === "nl" ? "Neem Contact Op" : "Contact Us"}</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function BookPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingContent />
    </Suspense>
  )
}
