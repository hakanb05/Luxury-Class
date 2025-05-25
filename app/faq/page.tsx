"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/lib/contexts/language-context"
import AnimatedText from "@/components/ui/animated-text"

interface FAQItem {
  question: string
  answer: React.ReactNode
}

export default function FAQPage() {
  const { language } = useLanguage()
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

  // Dutch FAQs
  const pricingFAQsNL: FAQItem[] = [
    {
      question: "Wat zijn de betaalmogelijkheden? Contant en/of pin?",
      answer: (
        <div className="space-y-2">
          <p>U kunt bij ons veilig en eenvoudig betalen via:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Betaallink (iDeal, Bancontact, creditcard) – ideaal voor vooraf betalen</li>
            <li>Creditcard (Visa, Mastercard, Amex) – ter plaatse of digitaal</li>
            <li>Pinnen via mobiele terminal</li>
            <li>Contant – alleen op aanvraag</li>
          </ul>
        </div>
      ),
    },
    {
      question: "Betaal je van tevoren of achteraf?",
      answer: (
        <p>
          Om de reservering definitief te maken, vragen we een aanbetaling van 50%. Dit stelt ons in staat om alles
          direct te bevestigen en de hoogste kwaliteit van dienstverlening te garanderen.
        </p>
      ),
    },
    {
      question: "Zijn er extra kosten voor wachttijd?",
      answer: (
        <p>
          Bij luchthaven transfers is 1 uur wachttijd na landing inbegrepen. Voor andere services is 15 minuten
          wachttijd inbegrepen. Daarna wordt €45 per uur in rekening gebracht, berekend per 15 minuten.
        </p>
      ),
    },
  ]

  const bookingFAQsNL: FAQItem[] = [
    {
      question: "Tot wanneer kan ik annuleren?",
      answer: (
        <p>
          Annuleren kan kosteloos tot 24 uur voor aanvang van de rit. Daarna brengen wij 100% van het gereserveerde
          bedrag in rekening in verband met de gereserveerde tijd en planning.
        </p>
      ),
    },
    {
      question: "Kan ik het aantal geboekte uren verlengen?",
      answer: (
        <p>
          Ja, u kunt uw boeking verlengen als de beschikbaarheid dit toelaat. We raden aan om ons zo vroeg mogelijk op
          de hoogte te stellen, zodat we het schema kunnen aanpassen. Extra uren worden in rekening gebracht tegen het
          standaard uurtarief.
        </p>
      ),
    },
    {
      question: "Kan ik een chauffeur boeken voor meerdere dagen?",
      answer: (
        <div className="space-y-2">
          <p>Ja, absoluut.</p>
          <p>
            U kunt een chauffeur boeken voor meerdere dagen, afgestemd op uw schema en behoeften. Of het nu voor een
            zakenreis, evenement of privéreis is, wij bieden meerdaagse service met volledige flexibiliteit en
            discretie. Vooraf reserveren wordt aanbevolen om beschikbaarheid en optimale planning te garanderen.
          </p>
        </div>
      ),
    },
  ]

  const serviceFAQsNL: FAQItem[] = [
    {
      question: "Is de auto elektrisch?",
      answer: (
        <div className="space-y-2">
          <p>Ja, de auto is volledig elektrisch.</p>
          <p>Dat betekent dat u profiteert van:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Stil en comfortabel vervoer – geen motorgeluid, ideaal voor rust en discretie</li>
            <li>Duurzaam en milieuvriendelijk – geen uitstoot tijdens uw rit</li>
            <li>Toegang tot milieuzones – ook in steden met zero-emissiebeleid</li>
            <li>Modern en representatief voertuig – passend bij high-end vervoer</li>
            <li>Comfort van de nieuwste technologie – inclusief stille airco, rijassistentie en luxe afwerking</li>
          </ul>
        </div>
      ),
    },
    {
      question: "Kan er op verzoek een aangegeven route worden gereden?",
      answer: (
        <p>
          Ja, op verzoek kan er een vooraf aangegeven route worden gereden. Wij stemmen de rit graag af op uw wensen, of
          het nu gaat om een toeristische route, tussenstops of specifieke voorkeuren onderweg.
        </p>
      ),
    },
    {
      question: "Kun je bagage meenemen?",
      answer: (
        <p>
          Ja, er is ruimte voor bagage. Wij zorgen ervoor dat uw koffers en persoonlijke bezittingen veilig en
          comfortabel worden meegenomen. Geef gerust vooraf door hoeveel stuks u wilt meenemen, zodat we hier rekening
          mee kunnen houden.
        </p>
      ),
    },
  ]

  // English FAQs
  const pricingFAQsEN: FAQItem[] = [
    {
      question: "What are the payment options? Cash and/or card?",
      answer: (
        <div className="space-y-2">
          <p>You can safely and easily pay with us via:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Payment link (iDeal, Bancontact, credit card) – ideal for paying in advance</li>
            <li>Credit card (Visa, Mastercard, Amex) – on-site or digital</li>
            <li>Debit card via mobile terminal</li>
            <li>Cash – only upon request</li>
          </ul>
        </div>
      ),
    },
    {
      question: "Do you pay in advance or afterward?",
      answer: (
        <p>
          To finalize the reservation, we request a 50% deposit. This allows us to immediately confirm everything and
          guarantee the highest quality of service.
        </p>
      ),
    },
    {
      question: "Are there additional charges for waiting time?",
      answer: (
        <p>
          For airport transfers, 1 hour of waiting time after landing is included. For other services, 15 minutes of
          waiting time is included. After that, €45 per hour is charged, calculated per 15 minutes.
        </p>
      ),
    },
  ]

  const bookingFAQsEN: FAQItem[] = [
    {
      question: "Until when can I cancel?",
      answer: (
        <p>
          Cancellation is free of charge up to 24 hours before the start of the ride. After that, we charge 100% of the
          reserved amount due to the reserved time and planning.
        </p>
      ),
    },
    {
      question: "Can I extend the number of hours I've booked?",
      answer: (
        <p>
          Yes, you can extend your booking if availability allows. We recommend notifying us as early as possible so we
          can adjust the schedule accordingly. Additional hours will be charged at the standard hourly rate.
        </p>
      ),
    },
    {
      question: "Can I book a chauffeur for several days?",
      answer: (
        <div className="space-y-2">
          <p>Yes, absolutely.</p>
          <p>
            You can book a chauffeur for multiple days, tailored to your schedule and needs. Whether it's for a business
            trip, event, or private travel, we offer multi-day service with full flexibility and discretion. Advance
            notice is recommended to ensure availability and optimal planning.
          </p>
        </div>
      ),
    },
  ]

  const serviceFAQsEN: FAQItem[] = [
    {
      question: "Is the car electric?",
      answer: (
        <div className="space-y-2">
          <p>Yes, the car is fully electric.</p>
          <p>This means you benefit from:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Quiet and comfortable transportation – no engine noise, ideal for rest and discretion</li>
            <li>Sustainable and environmentally friendly – no emissions during your ride</li>
            <li>Access to environmental zones – even in cities with zero-emission policies</li>
            <li>Modern and representative vehicle – fitting for high-end transportation</li>
            <li>
              Comfort of the latest technology – including silent air conditioning, driving assistance, and luxury
              finishing
            </li>
          </ul>
        </div>
      ),
    },
    {
      question: "Can a specified route be driven upon request?",
      answer: (
        <p>
          Yes, a pre-specified route can be driven upon request. We are happy to tailor the ride to your wishes, whether
          it's a scenic route, intermediate stops, or specific preferences along the way.
        </p>
      ),
    },
    {
      question: "Can you bring luggage?",
      answer: (
        <p>
          Yes, there is room for luggage. We ensure that your suitcases and personal belongings are transported safely
          and comfortably. Feel free to let us know in advance how many pieces you want to bring so we can accommodate
          accordingly.
        </p>
      ),
    },
  ]

  // Select the appropriate FAQs based on language
  const pricingFAQs = language === "nl" ? pricingFAQsNL : pricingFAQsEN
  const bookingFAQs = language === "nl" ? bookingFAQsNL : bookingFAQsEN
  const serviceFAQs = language === "nl" ? serviceFAQsNL : serviceFAQsEN

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-muted/30">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <AnimatedText text={language === "nl" ? "Veelgestelde Vragen" : "Frequently Asked Questions"} />
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto fade-in-section">
            {language === "nl"
              ? "Vind antwoorden op veelgestelde vragen over onze luxe chauffeursdiensten"
              : "Find answers to common questions about our luxury chauffeur services"}
          </p>
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
                  {language === "nl" ? "Prijzen" : "Pricing"}
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
                  {language === "nl" ? "Boekingen" : "Booking"}
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
                  {language === "nl" ? "Service" : "Service"}
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
                    className="flex justify-between items-center w-full p-4 text-left font-medium"
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
                    className="flex justify-between items-center w-full p-4 text-left font-medium"
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
                    className="flex justify-between items-center w-full p-4 text-left font-medium"
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
          <h2 className="text-2xl font-bold mb-4 fade-in-section">
            {language === "nl" ? "Nog steeds vragen?" : "Still have questions?"}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto fade-in-section">
            {language === "nl"
              ? "Als u het antwoord op uw vraag niet kon vinden, aarzel dan niet om direct contact met ons op te nemen. Ons team staat klaar om u te helpen."
              : "If you couldn't find the answer to your question, please don't hesitate to contact us directly. Our team is ready to assist you."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-section">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-orange-500 text-white hover:bg-orange-600 dark:bg-red-600 dark:hover:bg-red-700 dark:border dark:border-white h-10 px-4 py-2"
            >
              {language === "nl" ? "Neem Contact Op" : "Contact Us"}
            </a>
            <a
              href="/book"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground dark:border-white dark:text-white h-10 px-4 py-2"
            >
              {language === "nl" ? "Boek een Rit" : "Book a Ride"}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
