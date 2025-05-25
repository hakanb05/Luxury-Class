"use client"

import type React from "react"
import { useState } from "react"
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
  const [isBusiness, setIsBusiness] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedTimeHourly, setSelectedTimeHourly] = useState("")

  // Form state for addresses
  const [fromAddress, setFromAddress] = useState("")
  const [toAddress, setToAddress] = useState("")
  const [fromAddressHourly, setFromAddressHourly] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
  }

  if (formSubmitted) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
        <h3 className="text-xl font-semibold mb-2 text-green-600 dark:text-green-400">{t("requestBooking")}</h3>
        <p className="text-muted-foreground mb-4">{t("ctaDescription")}</p>
        <Button variant="outline" className="dark:border-white dark:text-white" onClick={() => setFormSubmitted(false)}>
          Make Another Booking
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
          <Tabs defaultValue="one-way" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="one-way">{t("oneWay")}</TabsTrigger>
              <TabsTrigger value="hourly">{t("byTheHour")}</TabsTrigger>
            </TabsList>

            <TabsContent value="one-way" className="space-y-4 mt-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="from">{t("from")}</Label>
                  <AddressAutocomplete
                    id="from"
                    value={fromAddress}
                    onChange={setFromAddress}
                    placeholder="Amsterdam"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="to">{t("to")}</Label>
                  <AddressAutocomplete
                    id="to"
                    value={toAddress}
                    onChange={setToAddress}
                    placeholder="Rotterdam"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">{t("date")}</Label>
                    <Input id="date" type="date" required />
                  </div>
                  <div>
                    <Label htmlFor="time">{t("time")}</Label>
                    <TimePicker value={selectedTime} onChange={setSelectedTime} />
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
                    placeholder="Amsterdam"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date-hourly">{t("date")}</Label>
                    <Input id="date-hourly" type="date" required />
                  </div>
                  <div>
                    <Label htmlFor="time-hourly">{t("time")}</Label>
                    <TimePicker value={selectedTimeHourly} onChange={setSelectedTimeHourly} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 22 }, (_, i) => i + 3).map((hours) => (
                        <SelectItem key={hours} value={hours.toString()}>
                          {hours} hours
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
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={t("selectVehicle")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="v-class">Mercedes-Benz V-Class (up to 7 passengers)</SelectItem>
                  <SelectItem value="s-class">Mercedes-Benz S-Class (up to 3 passengers)</SelectItem>
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
                <Label htmlFor="company">Company Name</Label>
                <Input id="company" placeholder="Your company name" />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">{t("name")}</Label>
                <Input id="name" placeholder={t("yourName")} required />
              </div>
              <div>
                <Label htmlFor="email">{t("email")}</Label>
                <Input id="email" type="email" placeholder={t("yourEmail")} required />
              </div>
            </div>

            <div>
              <Label htmlFor="phone">{t("phone")}</Label>
              <Input id="phone" placeholder={t("yourPhone")} required />
            </div>

            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 dark:bg-red-600 dark:hover:bg-red-700 dark:border dark:border-white"
            >
              {t("requestBookingBtn")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
