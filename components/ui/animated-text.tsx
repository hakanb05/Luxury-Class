"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
}

export default function AnimatedText({ text, className, delay = 0 }: AnimatedTextProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div className={cn("flex flex-wrap justify-center", className)}>
      {text.split(" ").map((word, wordIndex) => (
        <div key={wordIndex} className="flex mr-2">
          {word.split("").map((char, charIndex) => (
            <span
              key={`${wordIndex}-${charIndex}`}
              className={`inline-block transition-all duration-700 ease-out ${
                isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
              }`}
              style={{
                transitionDelay: `${wordIndex * 100 + charIndex * 50}ms`,
              }}
            >
              {char}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}
