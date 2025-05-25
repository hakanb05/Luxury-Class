"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { useLanguage } from "@/lib/contexts/language-context"
import { cn } from "@/lib/utils"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const { t } = useLanguage()

  const navigation = [
    { name: t("home"), href: "/" },
    { name: t("services"), href: "/services" },
    { name: t("aboutUs"), href: "/about" },
    { name: t("vehicles"), href: "/vehicles" },
    { name: t("business"), href: "/business" },
    { name: t("faq"), href: "/faq" },
    {
      name: t("contact"),
      href: "/contact",
      hasDropdown: true,
      dropdownItems: [
        { name: t("contact"), href: "/contact" },
        { name: t("bookNow"), href: "/book" },
      ],
    },
  ]

  const toggleDropdown = (name: string) => {
    if (openDropdown === name) {
      setOpenDropdown(null)
    } else {
      setOpenDropdown(name)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold text-xl bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent sm:inline-block">
              Luxury Class
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <div className="relative">
                    <div
                      className="flex items-center space-x-1 cursor-pointer"
                      onClick={() => toggleDropdown(item.name)}
                      onMouseEnter={() => setOpenDropdown(item.name)}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "transition-colors hover:text-foreground/80",
                          pathname === item.href ? "text-orange-500 dark:text-red-500" : "text-foreground/80",
                        )}
                      >
                        {item.name}
                      </Link>
                      <ChevronDown className="h-3 w-3" />
                    </div>
                    {openDropdown === item.name && (
                      <div
                        className="absolute left-0 mt-2 w-48 p-2 rounded-md shadow-lg bg-popover z-50"
                        onMouseLeave={() => setOpenDropdown(null)}
                      >
                        {item.dropdownItems?.map((dropdownItem, idx) => (
                          <Link
                            key={idx}
                            href={dropdownItem.href}
                            className="block px-3 py-2 text-sm rounded-md hover:bg-muted"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "transition-colors hover:text-foreground/80",
                      pathname === item.href ? "text-orange-500 dark:text-red-500" : "text-foreground/80",
                    )}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Link href="/" className="flex items-center space-x-2 md:hidden">
              <span className="font-bold text-lg bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                Luxury Class
              </span>
            </Link>
          </div>
          <nav className="flex items-center space-x-2">
            <Button
              className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 py-2 px-3 text-base hover:bg-transparent text-foreground md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
            <div className="hidden md:flex items-center space-x-2">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
            <Button
              asChild
              className="bg-orange-500 hover:bg-orange-600 dark:bg-red-600 dark:hover:bg-red-700 dark:border dark:border-white"
            >
              <Link href="/book">{t("bookNow")}</Link>
            </Button>
          </nav>
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 top-14 z-50 grid h-[calc(100vh-3.5rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden">
          <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
            <nav className="grid grid-flow-row auto-rows-max text-sm">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline",
                    pathname === item.href ? "text-orange-500 dark:text-red-500" : "text-foreground",
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/book"
                className={cn(
                  "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline",
                  pathname === "/book" ? "text-orange-500 dark:text-red-500" : "text-foreground",
                )}
                onClick={() => setIsOpen(false)}
              >
                {t("bookNow")}
              </Link>
            </nav>
            <div className="flex items-center justify-between">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
