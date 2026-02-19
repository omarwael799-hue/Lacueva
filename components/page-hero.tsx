"use client"

import { usePathname } from "next/navigation"

type PageHeroProps = {
  title: string
  subtitle?: string
  backgroundImage?: string
  size?: "sm" | "md" | "lg"
  imageY?: number // 0-100 (نزّل الصورة لتحت)
}

/**
 * ✅ About page keeps this (as you requested)
 */
const DEFAULT_HERO_BG = "/images/gallery/backgrounds/hero/hero-11.webp";
/**
 * ✅ Local hero images (make sure names match EXACTLY — Linux is case-sensitive)
 * Folder: /public/images/gallery/backgrounds/hero
 */
const HERO = {
  h1: "/images/gallery/backgrounds/hero/hero-1.webp",
  h2: "/images/gallery/backgrounds/hero/hero-2.webp",
  h3: "/images/gallery/backgrounds/hero/hero-3.webp",
  h4: "/images/gallery/backgrounds/hero/hero-4.webp",
  h5: "/images/gallery/backgrounds/hero/hero-5.webp",
  h6: "/images/gallery/backgrounds/hero/hero-6.webp",
  h7: "/images/gallery/backgrounds/hero/hero-7.webp",
  h8: "/images/gallery/backgrounds/hero/hero-8.webp",
  h9: "/images/gallery/backgrounds/hero/hero-9.webp",
  h10: "/images/gallery/backgrounds/hero/hero-10.webp",
  h11: "/images/gallery/backgrounds/hero/hero-11.webp",

} as const
const SIZE_MAP = {
  sm: "min-h-[50vh]",
  md: "min-h-[65vh]",
  lg: "min-h-[85vh]",
}

function stripLocale(pathname: string) {
  // turns: /en/about -> /about , /ar/location -> /location
  return pathname.replace(/^\/(en|ar)(\/|$)/, "/")
}

function pickHeroForPath(pathname: string) {
  const p = stripLocale(pathname)

  // ✅ About uses the old/default hero
  if (p === "/about" || p.startsWith("/about/")) return DEFAULT_HERO_BG

  // Map the rest (change any route key if your folder names differ)
  if (p === "/attractions" || p.startsWith("/attractions/")) return HERO.h2
  if (p === "/about" || p.startsWith("/about/")) return HERO.h11
  if (p === "/kids-area" || p.startsWith("/kids-area/")) return HERO.h3
  if (p === "/food" || p.startsWith("/food/")) return HERO.h4
  if (p === "/events" || p.startsWith("/events/")) return HERO.h5
  if (p === "/schools" || p.startsWith("/schools/")) return HERO.h6
  if (p === "/tickets" || p.startsWith("/tickets/")) return HERO.h7
  if (p === "/gallery" || p.startsWith("/gallery/")) return HERO.h8
  if (p === "/faq" || p.startsWith("/faq/")) return HERO.h9
  if (p === "/location" || p.startsWith("/location/")) return HERO.h10
  if (p === "/contact" || p.startsWith("/contact/")) return HERO.h1

  // fallback لأي صفحة جديدة
  return HERO.h2
}

export function PageHero({
  title,
  subtitle,
  backgroundImage,
  size = "md",
  imageY = 65,
}: PageHeroProps) {
  const pathname = usePathname() || "/"
  const autoBg = pickHeroForPath(pathname)
  const bg = backgroundImage ?? autoBg

  return (
    <section className={`relative overflow-hidden ${SIZE_MAP[size]}`}>
      {/* BG */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundPosition: `center ${imageY}%`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-28 pb-16 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">{title}</h1>
        {subtitle ? (
          <p className="mt-4 text-lg md:text-2xl font-semibold opacity-95">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  )
}
