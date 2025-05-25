"use client"

import { useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { useTheme } from "next-themes"

interface AddressAutocompleteProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  id?: string
  required?: boolean
  className?: string
}

declare global {
  interface Window {
    google: any
    initMap: () => void
  }
}

export default function AddressAutocomplete({
  value,
  onChange,
  placeholder,
  id,
  required,
  className,
}: AddressAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const autocompleteRef = useRef<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    // Check if Google Maps is already loaded
    if (window.google && window.google.maps && window.google.maps.places) {
      initializeAutocomplete()
      setIsLoaded(true)
      return
    }

    // Check if script is already loading
    const existingScript = document.getElementById("google-maps-script")
    if (existingScript) {
      // Script is already loading, wait for it
      const checkLoaded = setInterval(() => {
        if (window.google && window.google.maps && window.google.maps.places) {
          clearInterval(checkLoaded)
          initializeAutocomplete()
          setIsLoaded(true)
        }
      }, 100)
      return () => clearInterval(checkLoaded)
    }

    // Load Google Maps script
    setIsLoading(true)
    const script = document.createElement("script")
    script.id = "google-maps-script"
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`
    script.async = true
    script.defer = true

    window.initMap = () => {
      setIsLoaded(true)
      setIsLoading(false)
      initializeAutocomplete()
    }

    script.onerror = () => {
      console.error("Failed to load Google Maps script")
      setIsLoading(false)
    }

    document.head.appendChild(script)

    return () => {
      // Cleanup function
      if (autocompleteRef.current) {
        window.google?.maps?.event?.clearInstanceListeners(autocompleteRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (isLoaded && inputRef.current && !autocompleteRef.current) {
      initializeAutocomplete()
    }
  }, [isLoaded])

  // Apply dark mode styles when theme changes
  useEffect(() => {
    if (isLoaded && theme) {
      applyDarkModeStyles()
    }
  }, [theme, isLoaded])

  const initializeAutocomplete = () => {
    if (!inputRef.current || !window.google || !window.google.maps || !window.google.maps.places) {
      console.warn("Google Maps Places API not available")
      return
    }

    try {
      // Create autocomplete instance
      autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ["address"],
        componentRestrictions: { country: ["nl", "be", "de", "fr", "es"] },
        fields: ["formatted_address", "geometry", "name", "place_id"],
      })

      // Add listener for place selection
      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current.getPlace()
        if (place.formatted_address) {
          onChange(place.formatted_address)
        } else if (place.name) {
          onChange(place.name)
        }
      })

      // Apply dark mode styles after initialization
      setTimeout(() => {
        applyDarkModeStyles()
      }, 100)
    } catch (error) {
      console.error("Error initializing Google Maps Autocomplete:", error)
    }
  }

  const applyDarkModeStyles = () => {
    if (!window.google || theme !== "dark") return

    // Wait a bit for the dropdown to be created
    setTimeout(() => {
      const pacContainers = document.querySelectorAll(".pac-container")

      pacContainers.forEach((container: Element) => {
        const pacContainer = container as HTMLElement

        // Apply dark mode styles to the container
        pacContainer.style.backgroundColor = "hsl(222.2 47.4% 11.2%)"
        pacContainer.style.border = "1px solid hsl(217.2 32.6% 17.5%)"
        pacContainer.style.borderRadius = "6px"
        pacContainer.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.3)"

        // Apply styles to each item
        const pacItems = pacContainer.querySelectorAll(".pac-item")
        pacItems.forEach((item: Element) => {
          const pacItem = item as HTMLElement
          pacItem.style.backgroundColor = "hsl(222.2 47.4% 11.2%)"
          pacItem.style.color = "hsl(210 40% 98%)"
          pacItem.style.borderTop = "1px solid hsl(217.2 32.6% 17.5%)"

          // Hover effect
          pacItem.addEventListener("mouseenter", () => {
            pacItem.style.backgroundColor = "hsl(217.2 32.6% 17.5%)"
          })

          pacItem.addEventListener("mouseleave", () => {
            pacItem.style.backgroundColor = "hsl(222.2 47.4% 11.2%)"
          })
        })

        // Style the query text
        const pacItemQuery = pacContainer.querySelectorAll(".pac-item-query")
        pacItemQuery.forEach((query: Element) => {
          const queryElement = query as HTMLElement
          queryElement.style.color = "hsl(210 40% 98%)"
        })

        // Style the matched text
        const pacMatched = pacContainer.querySelectorAll(".pac-matched")
        pacMatched.forEach((matched: Element) => {
          const matchedElement = matched as HTMLElement
          matchedElement.style.color = "hsl(24.6 95% 53.1%)" // Orange color
          matchedElement.style.fontWeight = "bold"
        })
      })
    }, 50)
  }

  // Listen for when the dropdown opens
  useEffect(() => {
    if (!inputRef.current) return

    const handleFocus = () => {
      if (theme === "dark") {
        // Apply styles when dropdown might open
        setTimeout(applyDarkModeStyles, 100)
      }
    }

    const handleInput = () => {
      if (theme === "dark") {
        // Apply styles when user types (dropdown updates)
        setTimeout(applyDarkModeStyles, 50)
      }
    }

    const input = inputRef.current
    input.addEventListener("focus", handleFocus)
    input.addEventListener("input", handleInput)

    return () => {
      input.removeEventListener("focus", handleFocus)
      input.removeEventListener("input", handleInput)
    }
  }, [theme])

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        id={id}
        required={required}
        className={className}
        autoComplete="off"
        disabled={isLoading}
      />
      {isLoading && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500"></div>
        </div>
      )}
    </div>
  )
}
