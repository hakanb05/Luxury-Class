"use client"

import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/lib/contexts/language-context"

interface TimePickerProps {
  value: string
  onChange: (time: string) => void
  selectedDate?: string // Nieuwe prop voor de geselecteerde datum
}

export default function TimePicker({ value, onChange, selectedDate }: TimePickerProps) {
  const { t } = useLanguage()
  const hours = Array.from({ length: 24 }, (_, i) => i)

  // Functie om te checken of een tijd in het verleden ligt
  const isTimeInPast = (hour: number): boolean => {
    if (!selectedDate) return false

    const today = new Date()
    const selectedDateObj = new Date(selectedDate)

    // Als de geselecteerde datum niet vandaag is, dan is geen tijd in het verleden
    if (selectedDateObj.toDateString() !== today.toDateString()) {
      return false
    }

    // Als het vandaag is, check of het uur al voorbij is
    const currentHour = today.getHours()
    const currentMinutes = today.getMinutes()

    // Als het huidige uur is en we zijn al voorbij het hele uur, dan is het in het verleden
    // Anders alleen als het uur volledig voorbij is
    if (hour < currentHour) {
      return true
    } else if (hour === currentHour && currentMinutes > 30) {
      // Als we meer dan 30 minuten in het huidige uur zijn, beschouw het als voorbij
      return true
    }

    return false
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between cursor-pointer" role="combobox">
          {value || t("selectTime")}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[200px] max-h-[300px] overflow-y-auto">
        {hours.map((hour) => {
          const timeString = `${hour.toString().padStart(2, "0")}:00`
          const isPastTime = isTimeInPast(hour)

          return (
            <DropdownMenuItem
              key={hour}
              onClick={() => !isPastTime && onChange(timeString)}
              className={`cursor-pointer ${
                isPastTime
                  ? "opacity-50 cursor-not-allowed text-muted-foreground bg-gray-100 dark:bg-gray-800"
                  : "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              }`}
              disabled={isPastTime}
            >
              {timeString}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
