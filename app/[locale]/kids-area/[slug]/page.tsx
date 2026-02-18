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

const GALLERY: Record<string, string[]> = {
  slides: [
    "/images/kids/slides-1.jpg",
    "/images/kids/slides-2.jpg",
    "/images/kids/slides-3.jpg",
    "/images/kids/slides-4.png",
  ],
  safety: [
    "/images/kids/safety-1.png",
    "/images/kids/safety-2.png",
    "/images/kids/safety-3.png",
    "/images/kids/safety-4.png",
  ],
  "age-guide": [
    "/images/kids/age-1.png",
    "/images/kids/age-2.png",
    "/images/kids/age-3.png",
    "/images/kids/age-4.png",
  ],
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
              {(GALLERY[slug] ?? []).map((src, i) => (
  <div key={i} className="aspect-video rounded-xl overflow-hidden border border-sun/10 bg-black/5">
    <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${src})` }} />
  </div>
))}
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
