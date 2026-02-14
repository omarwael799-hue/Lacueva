"use client"

import { useI18n } from "@/lib/i18n.client"
import { PageHero } from "@/components/page-hero"
import { FadeUp } from "@/components/motion"
import { use } from "react"

const slugMap: Record<string, string> = {
  slides: "slides",
  safety: "safety",
  "age-guide": "ageGuide",
}

export default function KidsSubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const { content } = useI18n()
  const key = slugMap[slug] as keyof typeof content.kidsArea
  const data = content.kidsArea[key] as { title: string; desc: string } | undefined

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
            <div className="bg-sun/5 rounded-2xl p-8 lg:p-12 border border-sun/10">
              <p className="text-lg text-muted-foreground leading-relaxed">{data.desc}</p>
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-video rounded-xl bg-gradient-to-br from-sun/20 to-amber-200/30 flex items-center justify-center text-muted-foreground text-sm border border-sun/10">
                  {content.meta.locale === "ar" ? `صورة ${i}` : `Photo ${i}`}
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
