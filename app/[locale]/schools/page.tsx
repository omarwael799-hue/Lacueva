"use client"

import Link from "next/link"
import { useI18n } from "@/lib/i18n.client"
import { PageHero } from "@/components/page-hero"
import { FadeUp, StaggerContainer, StaggerItem, FloatCard } from "@/components/motion"
import { Bus, Package, ClipboardList, ArrowRight, ArrowLeft } from "lucide-react"

const items = [
  { key: "trips", icon: Bus, color: "from-emerald-400 to-teal-600", link: "trips" },
  { key: "packages", icon: Package, color: "from-aqua to-ocean", link: "packages" },
  { key: "form", icon: ClipboardList, color: "from-sun to-amber-500", link: "booking" },
] as const

export default function SchoolsPage() {
  const { locale, content } = useI18n()
  const t = content.schools
  const ArrowIcon = locale === "ar" ? ArrowLeft : ArrowRight

  return (
    <>
      <PageHero title={t.title} subtitle={t.intro} />

      <section className="py-16 lg:py-24 bg-background">
        <div className="mx-auto max-w-5xl px-4">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map(({ key, icon: Icon, color, link }) => {
              const label = key === "form" ? t.form.title : (t[key] as { title: string; desc: string }).title
              const desc = key === "form"
                ? (content.meta.locale === "ar" ? "قم بتعبئة نموذج الحجز للمجموعات" : "Fill in the group booking request form")
                : (t[key] as { title: string; desc: string }).desc
              return (
                <StaggerItem key={key}>
                  <FloatCard>
                    <Link
                      href={`/${locale}/schools/${link}`}
                      className="block group rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-aqua/30 transition-all h-full"
                    >
                      <div className={`h-32 bg-gradient-to-br ${color} flex items-center justify-center`}>
                        <Icon className="w-12 h-12 text-white" />
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-heading font-bold text-foreground group-hover:text-aqua transition-colors">{label}</h3>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
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
