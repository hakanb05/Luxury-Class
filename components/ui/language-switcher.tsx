"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/contexts/language-context"
import { Globe } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Set mounted state after component mounts to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex items-center space-x-2">
      {isMobile ? (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Talen:</span>
          <Button
            variant="ghost"
            size="sm"
            className={`px-2 py-1 ${language === "en" ? "text-orange-500" : ""}`}
            onClick={() => setLanguage("en")}
          >
            EN
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`px-2 py-1 ${language === "nl" ? "text-orange-500" : ""}`}
            onClick={() => setLanguage("nl")}
          >
            NL
          </Button>
        </div>
      ) : (
        <>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => setLanguage(language === "en" ? "nl" : "en")}
          >
            <Globe className="h-4 w-4" />
            <span>{language === "en" ? "English" : "Nederlands"}</span>
          </Button>
        </>
      )}
    </div>
  )
}
