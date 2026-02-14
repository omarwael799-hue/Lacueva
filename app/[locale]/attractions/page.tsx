"use client"

import Link from "next/link"
import { useI18n } from "@/lib/i18n.client"
import { PageHero } from "@/components/page-hero"
import { FadeUp, StaggerContainer, StaggerItem, FloatCard } from "@/components/motion"
import { Waves, Wind, Droplets, Mountain, Users, Baby, ArrowRight, ArrowLeft } from "lucide-react"

const attractions = [
  { key: "waterSlides", icon: Waves, color: "from-aqua to-ocean", link: "water-slides" },
  { key: "wavePool", icon: Wind, color: "from-cyan-400 to-blue-500", link: "wave-pool" },
  { key: "lazyRiver", icon: Droplets, color: "from-teal-400 to-emerald-500", link: "lazy-river" },
  { key: "adrenalineTower", icon: Mountain, color: "from-orange-400 to-red-500", link: "adrenaline-tower" },
  { key: "familyPools", icon: Users, color: "from-blue-400 to-indigo-500", link: "family-pools" },
  { key: "kidsAreaAttraction", icon: Baby, color: "from-sun to-amber-400", link: "kids-area" },
] as const

export default function AttractionsPage() {
  const { locale, content } = useI18n()
  const t = content.attractions
  const ArrowIcon = locale === "ar" ? ArrowLeft : ArrowRight

  return (
    <>
      <PageHero title={t.title} subtitle={t.intro} />

      {/* Bullets */}
      <section className="py-12 bg-background">
        <div className="mx-auto max-w-4xl px-4">
          <FadeUp>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {t.bullets.map((bullet, i) => (
                <li key={i} className="flex items-center gap-3 bg-aqua/5 rounded-xl p-4 border border-aqua/10">
                  <Waves className="w-5 h-5 text-aqua flex-shrink-0" />
                  <span className="text-foreground">{bullet}</span>
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </section>

      {/* Attraction cards */}
      <section className="py-12 lg:py-20 bg-muted">
        <div className="mx-auto max-w-6xl px-4">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {attractions.map(({ key, icon: Icon, color, link }) => {
              const item = t[key]
              return (
                <StaggerItem key={key}>
                  <FloatCard>
                    <Link
                      href={`/${locale}/attractions/${link}`}
                      className="block group rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-aqua/30 transition-all"
                    >
                      <div className={`h-36 bg-gradient-to-br ${color} flex items-center justify-center`}>
                        <Icon className="w-14 h-14 text-white" />
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-heading font-bold text-foreground group-hover:text-aqua transition-colors">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-aqua">
                          {content.common.learnMore}
                          <ArrowIcon className="w-4 h-4" />
                        </span>
                      </div>
                    </Link>
                  </FloatCard>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </section>
    </>
  )
}
