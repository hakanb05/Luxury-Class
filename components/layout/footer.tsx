"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/contexts/language-context"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Luxury Class
            </h3>
            <p className="text-sm text-muted-foreground">{t("premiumService")}</p>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>+31 6 29421860</p>
              <p>luxuryclassbenz@gmail.com</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">{t("services")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/services" className="hover:text-foreground transition-colors">
                  {t("cityToCityRides")}
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-foreground transition-colors">
                  {t("airportTransfers")}
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-foreground transition-colors">
                  {t("hourlyHire")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">{t("quickLinks")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  {t("aboutUs")}
                </Link>
              </li>
              <li>
                <Link href="/vehicles" className="hover:text-foreground transition-colors">
                  {t("vehicles")}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">{t("contact")}</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>{t("location")}</p>
              <p>+31 6 29421860</p>
              <p>luxuryclassbenz@gmail.com</p>
              <Link href="/contact" className="hover:text-foreground transition-colors block">
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
