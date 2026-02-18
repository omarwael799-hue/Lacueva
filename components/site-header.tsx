"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useI18n } from "@/lib/i18n.client"
import { Menu, X, ChevronDown, Globe } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type SubItem = { label: string; href: string }
type NavItem = { label: string; href: string; children?: SubItem[] }

function useNavItems(): NavItem[] {
  const { locale, content } = useI18n()
  const p = `/${locale}`
  return [
    { label: content.nav.home, href: p },
    {
      label: content.nav.about,
      href: `${p}/about`,
      children: [
        { label: content.nav.aboutOverview, href: `${p}/about` },
        { label: content.nav.aboutVision, href: `${p}/about/vision` },
        { label: content.nav.aboutSafety, href: `${p}/about/safety` },
      ],
    },
    {
      label: content.nav.attractions,
      href: `${p}/attractions`,
      children: [
        { label: content.nav.waterSlides, href: `${p}/attractions/water-slides` },
        { label: content.nav.wavePool, href: `${p}/attractions/wave-pool` },
        { label: content.nav.lazyRiver, href: `${p}/attractions/lazy-river` },
        { label: content.nav.adrenalineTower, href: `${p}/attractions/adrenaline-tower` },
        { label: content.nav.familyPools, href: `${p}/attractions/family-pools` },
        { label: content.nav.kidsAreaNav, href: `${p}/attractions/kids-area` },
      ],
    },
    {
      label: content.nav.kidsArea,
      href: `${p}/kids-area`,
      children: [
        { label: content.nav.kidsSlides, href: `${p}/kids-area/slides` },
        { label: content.nav.kidsSafety, href: `${p}/kids-area/safety` },
        { label: content.nav.kidsAgeGuide, href: `${p}/kids-area/age-guide` },
      ],
    },
    {
      label: content.nav.food,
      href: `${p}/food`,
      children: [
        { label: content.nav.restaurants, href: `${p}/food/restaurants` },
        { label: content.nav.cafes, href: `${p}/food/cafes` },
        { label: content.nav.snacks, href: `${p}/food/snacks` },
      ],
    },
    {
      label: content.nav.events,
      href: `${p}/events`,
      children: [
        { label: content.nav.seasonalOffers, href: `${p}/events/seasonal` },
        { label: content.nav.birthdayParties, href: `${p}/events/birthday` },
        { label: content.nav.privateEvents, href: `${p}/events/private` },
      ],
    },
    {
      label: content.nav.schools,
      href: `${p}/schools`,
      children: [
        { label: content.nav.schoolTrips, href: `${p}/schools/trips` },
        { label: content.nav.groupPackages, href: `${p}/schools/packages` },
        { label: content.nav.bookingForm, href: `${p}/schools/booking` },
      ],
    },
    { label: content.nav.tickets, href: `${p}/tickets` },
    { label: content.nav.gallery, href: `${p}/gallery` },
    { label: content.nav.faq, href: `${p}/faq` },
    { label: content.nav.location, href: `${p}/location` },
    { label: content.nav.contact, href: `${p}/contact` },
  ]
}

export function SiteHeader() {
  const { locale } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const navItems = useNavItems()
  const otherLocale = locale === "ar" ? "en" : "ar"

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-lg border-b border-aqua/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex-shrink-0">
          <img
  src="/images/brand/logo.png"
            alt="La Cueva Aqua Park"
            className="h-10 lg:h-14 w-auto object-contain"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden xl:flex items-center gap-1">
          {navItems.map((item) => (
            <div
              key={item.href}
              className="relative group"
              onMouseEnter={() => item.children && setOpenDropdown(item.href)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={item.href}
                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  scrolled
                    ? "text-ocean hover:text-aqua hover:bg-aqua/10"
                    : "text-white hover:text-sun hover:bg-white/10"
                }`}
              >
                {item.label}
                {item.children && <ChevronDown className="w-3 h-3" />}
              </Link>

              {/* Dropdown */}
              {item.children && (
                <AnimatePresence>
                  {openDropdown === item.href && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full start-0 mt-1 bg-white rounded-xl shadow-xl border border-aqua/10 py-2 min-w-[200px] z-50"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-ocean hover:bg-aqua/10 hover:text-aqua transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <Link
            href={`/${otherLocale}`}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-all ${
              scrolled
                ? "bg-aqua/10 text-ocean hover:bg-aqua/20"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            <Globe className="w-4 h-4" />
            {otherLocale === "ar" ? "AR" : "EN"}
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`xl:hidden p-2 rounded-lg transition-colors ${
              scrolled ? "text-ocean hover:bg-aqua/10" : "text-white hover:bg-white/10"
            }`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="xl:hidden bg-white/95 backdrop-blur-xl border-t border-aqua/10 max-h-[80vh] overflow-y-auto"
          >
            <nav className="py-4 px-4 space-y-1">
              {navItems.map((item) => (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => !item.children && setMobileOpen(false)}
                    className="flex items-center justify-between px-4 py-3 text-ocean font-medium rounded-lg hover:bg-aqua/10 transition-colors"
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          openDropdown === item.href ? "rotate-180" : ""
                        }`}
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          setOpenDropdown(openDropdown === item.href ? null : item.href)
                        }}
                      />
                    )}
                  </Link>
                  {item.children && openDropdown === item.href && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      className="overflow-hidden ps-6"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="block px-4 py-2 text-sm text-muted-foreground hover:text-aqua transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
