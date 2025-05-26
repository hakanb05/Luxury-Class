"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/lib/contexts/language-context"
import AnimatedText from "@/components/ui/animated-text"
import Link from "next/link"

interface FAQItem {
  question: string
  answer: React.ReactNode
}

export default function FAQPage() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("pricing")
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})
  const [initialLoad, setInitialLoad] = useState(true)

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

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

  // Set initial load to false after component mounts
  useEffect(() => {
    setInitialLoad(false)
  }, [])

  // FAQ data using translation keys
  const pricingFAQs: FAQItem[] = [
    {
      question: t("faqPaymentOptions"),
      answer: (
        <div className="space-y-2">
          <p>{t("faqPaymentOptionsAnswer")}</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>{t("faqPaymentLink")}</li>
            <li>{t("faqCreditCard")}</li>
            <li>{t("faqDebitCard")}</li>
            <li>{t("faqCash")}</li>
          </ul>
        </div>
      ),
    },
    {
      question: t("faqPaymentTiming"),
      answer: <p>{t("faqPaymentTimingAnswer")}</p>,
    },
    {
      question: t("faqWaitingCharges"),
      answer: <p>{t("faqWaitingChargesAnswer")}</p>,
    },
  ]

  const bookingFAQs: FAQItem[] = [
    {
      question: t("faqCancellation"),
      answer: <p>{t("faqCancellationAnswer")}</p>,
    },
    {
      question: t("faqExtendHours"),
      answer: <p>{t("faqExtendHoursAnswer")}</p>,
    },
    {
      question: t("faqMultipleDays"),
      answer: (
        <div className="space-y-2">
          <p>{t("faqMultipleDaysAnswer1")}</p>
          <p>{t("faqMultipleDaysAnswer2")}</p>
        </div>
      ),
    },
  ]

  const serviceFAQs: FAQItem[] = [
    {
      question: t("faqElectricCar"),
      answer: (
        <div className="space-y-2">
          <p>{t("faqElectricCarAnswer1")}</p>
          <p>{t("faqElectricCarAnswer2")}</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>{t("faqQuietComfort")}</li>
            <li>{t("faqSustainable")}</li>
            <li>{t("faqEnvironmentalZones")}</li>
            <li>{t("faqModernVehicle")}</li>
            <li>{t("faqLatestTechnology")}</li>
          </ul>
        </div>
      ),
    },
    {
      question: t("faqCustomRoute"),
      answer: <p>{t("faqCustomRouteAnswer")}</p>,
    },
    {
      question: t("faqLuggage"),
      answer: <p>{t("faqLuggageAnswer")}</p>,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-muted/30">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <AnimatedText text={t("frequentlyAskedQuestions")} />
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto fade-in-section">{t("faqDescription")}</p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12 fade-in-section">
              <TabsTrigger value="pricing">
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {t("pricing")}
                </span>
              </TabsTrigger>
              <TabsTrigger value="booking">
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {t("booking")}
                </span>
              </TabsTrigger>
              <TabsTrigger value="service">
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  {t("service")}
                </span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pricing" className="space-y-4">
              {pricingFAQs.map((faq, index) => (
                <div
                  key={index}
                  className={`border rounded-lg overflow-hidden ${initialLoad ? "fade-in-section" : ""}`}
                >
                  <button
                    className="flex justify-between items-center w-full p-4 text-left font-medium hover:bg-muted/50 transition-colors"
                    onClick={() => toggleItem(`pricing-${index}`)}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${
                        openItems[`pricing-${index}`] ? "transform rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openItems[`pricing-${index}`] && <div className="p-4 pt-0 text-muted-foreground">{faq.answer}</div>}
                </div>
              ))}
            </TabsContent>

            <TabsContent value="booking" className="space-y-4">
              {bookingFAQs.map((faq, index) => (
                <div
                  key={index}
                  className={`border rounded-lg overflow-hidden ${initialLoad ? "fade-in-section" : ""}`}
                >
                  <button
                    className="flex justify-between items-center w-full p-4 text-left font-medium hover:bg-muted/50 transition-colors"
                    onClick={() => toggleItem(`booking-${index}`)}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${
                        openItems[`booking-${index}`] ? "transform rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openItems[`booking-${index}`] && <div className="p-4 pt-0 text-muted-foreground">{faq.answer}</div>}
                </div>
              ))}
            </TabsContent>

            <TabsContent value="service" className="space-y-4">
              {serviceFAQs.map((faq, index) => (
                <div
                  key={index}
                  className={`border rounded-lg overflow-hidden ${initialLoad ? "fade-in-section" : ""}`}
                >
                  <button
                    className="flex justify-between items-center w-full p-4 text-left font-medium hover:bg-muted/50 transition-colors"
                    onClick={() => toggleItem(`service-${index}`)}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${
                        openItems[`service-${index}`] ? "transform rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openItems[`service-${index}`] && <div className="p-4 pt-0 text-muted-foreground">{faq.answer}</div>}
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container text-center">
          <h2 className="text-2xl font-bold mb-4 fade-in-section">{t("stillHaveQuestions")}</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto fade-in-section">{t("cantFindAnswer")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-section">
            <Link
              href="/contact"
              className="inline-block text-white font-semibold py-2 px-4 rounded-lg bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 hover:from-pink-600 hover:via-red-600 hover:to-orange-600 transition-all"
            >
              {t("contactUs")}
            </Link>
            <Link
              href="/book"
              className="inline-block text-white font-semibold py-2 px-4 rounded-lg bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 hover:from-pink-600 hover:via-red-600 hover:to-orange-600 transition-all"
            >
              {t("bookARide")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
