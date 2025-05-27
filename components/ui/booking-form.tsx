"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { useLanguage } from "@/lib/contexts/language-context"
import TimePicker from "@/components/ui/time-picker"
import AddressAutocomplete from "@/components/ui/address-autocomplete"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"

interface BookingFormProps {
  onClose?: () => void
}

export default function BookingForm({ onClose }: BookingFormProps) {
  const { t } = useLanguage()
  const searchParams = useSearchParams()
  const [isBusiness, setIsBusiness] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedTimeHourly, setSelectedTimeHourly] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedDateHourly, setSelectedDateHourly] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [activeTab, setActiveTab] = useState("one-way")

  // Form state for addresses
  const [fromAddress, setFromAddress] = useState("")
  const [toAddress, setToAddress] = useState("")
  const [fromAddressHourly, setFromAddressHourly] = useState("")

  // Check URL parameters on component mount
  useEffect(() => {
    const service = searchParams.get("service")
    const vehicle = searchParams.get("vehicle")

    if (service === "hourly") {
      setActiveTab("hourly")
    } else {
      setActiveTab("one-way")
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")

    try {
      // Collect form data
      const formData = new FormData(e.target as HTMLFormElement)
      const bookingData = {
        serviceType: activeTab,
        from: fromAddress || fromAddressHourly,
        to: toAddress,
        date: selectedDate || selectedDateHourly,
        time: selectedTime || selectedTimeHourly,
        vehicle: formData.get("vehicle"),
        isBusiness: isBusiness,
        companyName: formData.get("companyName") || "",
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
      }

      const response = await fetch("/api/send-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      })

      if (!response.ok) {
        throw new Error("Failed to send booking request")
      }

      setFormSubmitted(true)
    } catch (error) {
      console.error("Error submitting booking:", error)
      setSubmitError("Er is een fout opgetreden bij het verzenden. Probeer het opnieuw.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (formSubmitted) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
        <h3 className="text-xl font-semibold mb-2 text-green-600 dark:text-green-400">{t("requestBooking")}</h3>
        <p className="text-muted-foreground mb-4">{t("ctaDescription")}</p>
        <Button variant="outline" className="dark:border-white dark:text-white" onClick={() => setFormSubmitted(false)}>
          {t("makeAnotherBooking")}
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-background rounded-lg shadow-lg border">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold">{t("requestBooking")}</h3>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {submitError && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
              <p className="text-red-600 dark:text-red-400">{submitError}</p>
            </div>
          )}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="one-way"
                className="
                  data-[state=active]:bg-gradient-to-r
                  data-[state=active]:from-pink-500
                  data-[state=active]:via-red-500
                  data-[state=active]:to-orange-500
                  data-[state=active]:text-white
                  data-[state=inactive]:bg-gray-100
                  dark:data-[state=inactive]:bg-zinc-800
                  data-[state=inactive]:text-gray-600
                  dark:data-[state=inactive]:text-gray-300
                "
              >
                {t("oneWay")}
              </TabsTrigger>

              <TabsTrigger
                value="hourly"
                className="
                  data-[state=active]:bg-gradient-to-r
                  data-[state=active]:from-pink-500
                  data-[state=active]:via-red-500
                  data-[state=active]:to-orange-500
                  data-[state=active]:text-white
                  data-[state=inactive]:bg-gray-100
                  dark:data-[state=inactive]:bg-zinc-800
                  data-[state=inactive]:text-gray-600
                  dark:data-[state=inactive]:text-gray-300
                "
              >
                {t("byTheHour")}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="one-way" className="space-y-4 mt-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="from">{t("from")}</Label>
                  <AddressAutocomplete
                    id="from"
                    value={fromAddress}
                    onChange={setFromAddress}
                    placeholder={t("adressPlaceholder")}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="to">{t("to")}</Label>
                  <AddressAutocomplete
                    id="to"
                    value={toAddress}
                    onChange={setToAddress}
                    placeholder={t("adressPlaceholder")}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">{t("date")}</Label>
                    <Input
                      id="date"
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]} // Voorkomt selectie van verleden datums
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">{t("time")}</Label>
                    <TimePicker value={selectedTime} onChange={setSelectedTime} selectedDate={selectedDate} />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="hourly" className="space-y-4 mt-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="from-hourly">{t("from")}</Label>
                  <AddressAutocomplete
                    id="from-hourly"
                    value={fromAddressHourly}
                    onChange={setFromAddressHourly}
                    placeholder={t("adressPlaceholder")}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date-hourly">{t("date")}</Label>
                    <Input
                      id="date-hourly"
                      type="date"
                      value={selectedDateHourly}
                      onChange={(e) => setSelectedDateHourly(e.target.value)}
                      min={new Date().toISOString().split("T")[0]} // Voorkomt selectie van verleden datums
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="time-hourly">{t("time")}</Label>
                    <TimePicker
                      value={selectedTimeHourly}
                      onChange={setSelectedTimeHourly}
                      selectedDate={selectedDateHourly}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="duration">{t("duration")}</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={t("selectDuration")} />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 22 }, (_, i) => i + 3).map((hours) => (
                        <SelectItem key={hours} value={hours.toString()}>
                          {hours} {t("hours")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="space-y-4">
            <div>
              <Label htmlFor="vehicle">{t("vehicleType")}</Label>
              <Select name="vehicle">
                <SelectTrigger>
                  <SelectValue placeholder={t("selectVehicle")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="s-class">Mercedes-Benz S-Class (up to 3 passengers)</SelectItem>
                  <SelectItem value="v-class">Mercedes-Benz V-Class (up to 7 passengers)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="business"
                checked={isBusiness}
                onCheckedChange={(checked) => setIsBusiness(checked as boolean)}
              />
              <Label htmlFor="business" className="cursor-pointer">
                {t("business")}
              </Label>
            </div>

            {isBusiness && (
              <div className="animate-fade-up">
                <Label htmlFor="company">{t("companyName")}</Label>
                <Input id="company" placeholder={t("yourCompanyName")} name="companyName" />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">{t("name")}</Label>
                <Input id="name" placeholder={t("yourName")} required name="name" />
              </div>
              <div>
                <Label htmlFor="email">{t("email")}</Label>
                <Input id="email" type="email" placeholder={t("yourEmail")} required name="email" />
              </div>
            </div>

            <div>
              <Label htmlFor="phone">{t("phone")}</Label>
              <Input id="phone" placeholder={t("yourPhone")} required name="phone" />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full text-white font-semibold py-2 px-4 rounded-lg bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 hover:from-pink-600 hover:via-red-600 hover:to-orange-600 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Verzenden...
                </>
              ) : (
                t("requestBookingBtn")
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
