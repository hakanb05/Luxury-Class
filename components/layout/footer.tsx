"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/contexts/language-context"

export function Footer() {
  const { t } = useLanguage()

  return (
  <footer className="bg-black text-white border-t border-t-gray-700">
    <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent dark:text-red-500">
              Luxury Class
            </h3>
            <p className="text-sm">{t("premiumService")}</p>
            <div className="space-y-1 text-sm text-foreground text-white">
              <a href="tel:+31629421860" className="hover:underline block">+31 6 29421860</a>
              <a href="mailto:luxuryclassbenz@gmail.com" className="hover:underline block">luxuryclassbenz@gmail.com</a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent dark:text-red-500">{t("services")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/services" className="text-white">
                  {t("cityToCityRides")}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white">
                  {t("airportTransfers")}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white">
                  {t("hourlyHire")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent dark:text-red-500">{t("quickLinks")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="text-white">
                  {t("aboutUs")}
                </Link>
              </li>
              <li>
                <Link href="/vehicles" className="text-white">
                  {t("vehicles")}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-orange-500">{t("contact")}</h4>
            <div className="space-y-2 text-sm text-white">
              <p>{t("location")}</p>
              <a href="tel:+31629421860" className="block hover:underline">
                +31 6 29421860
              </a>
              <a href="mailto:luxuryclassbenz@gmail.com" className="block hover:underline">
                luxuryclassbenz@gmail.com
              </a>
              <Link href="/contact" className="block hover:underline">
                {t("contact")}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Luxury Class Chauffeur Service. {t("allRightsReserved")}
          </p>
        </div>
      </div>
    </footer>
  )
}
