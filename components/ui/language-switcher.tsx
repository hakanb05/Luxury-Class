"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/contexts/language-context"
import { Globe, ChevronDown } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const languages = [
  { code: "nl", name: "Nederlands", flag: "🇳🇱" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
] as const

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Set mounted state after component mounts to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const currentLanguage = languages.find((lang) => lang.code === language)

  if (isMobile) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Talen:</span>
        <div className="flex flex-wrap gap-1">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              variant="ghost"
              size="sm"
              className={`px-2 py-1 text-xs ${language === lang.code ? "text-orange-500" : ""}`}
              onClick={() => setLanguage(lang.code)}
            >
              {lang.code.toUpperCase()}
            </Button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <span className="flex items-center gap-1">
            <span>{currentLanguage?.flag}</span>
            <span>{currentLanguage?.name}</span>
          </span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`flex items-center gap-2 ${language === lang.code ? "bg-orange-50 text-orange-600" : ""}`}
          >
            <span>{lang.flag}</span>
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
