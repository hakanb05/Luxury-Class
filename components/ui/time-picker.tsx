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
    return hour <= currentHour
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
                isPastTime ? "opacity-50 cursor-not-allowed text-muted-foreground" : "hover:bg-accent"
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
