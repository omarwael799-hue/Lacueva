"use client"

import { useI18n } from "@/lib/i18n.client"
import { PageHero } from "@/components/page-hero"
import { FadeUp } from "@/components/motion"
import { BookingForm } from "@/components/booking-form"
import { use } from "react"

export default function SchoolSubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const { content } = useI18n()
  const t = content.schools

  if (slug === "booking") {
    return (
      <>
        <PageHero title={t.form.title} />
        <section className="py-16 lg:py-24 bg-background">
          <div className="mx-auto max-w-2xl px-4">
            <FadeUp>
              <div className="bg-card rounded-2xl p-6 lg:p-10 shadow-sm border border-border/50">
                <BookingForm />
              </div>
            </FadeUp>
          </div>
        </section>
      </>
    )
  }

  const dataMap: Record<string, { title: string; desc: string }> = {
    trips: t.trips,
    packages: t.packages,
  }

  const data = dataMap[slug]
  if (!data) {
    return (
      <>
        <PageHero title="Not Found" />
        <div className="py-20 text-center text-muted-foreground">Page not found</div>
      </>
    )
  }

  return (
    <>
      <PageHero title={data.title} subtitle={data.desc} />
      <section className="py-16 lg:py-24 bg-background">
        <div className="mx-auto max-w-4xl px-4">
          <FadeUp>
            <div className="bg-emerald-50 rounded-2xl p-8 lg:p-12 border border-emerald-100">
              <p className="text-lg text-muted-foreground leading-relaxed">{data.desc}</p>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
