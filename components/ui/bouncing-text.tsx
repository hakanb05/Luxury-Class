"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface BouncingTextProps {
  text: string
  className?: string
}

export default function BouncingText({ text, className }: BouncingTextProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={cn("flex flex-wrap", className)}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className={`inline-block transition-transform duration-700 ease-bounce ${
            isVisible ? "translate-y-0" : "-translate-y-full"
          }`}
          style={{
            transitionDelay: `${index * 50}ms`,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  )
}
