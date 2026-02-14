"use client"

import { useI18n } from "@/lib/i18n.client"
import { PageHero } from "@/components/page-hero"
import { FadeUp } from "@/components/motion"
import { Target, Zap } from "lucide-react"

export default function VisionPage() {
  const { content } = useI18n()
  const t = content.about

  return (
    <>
      <PageHero title={t.vision.title + " & " + t.mission.title} />

      <section className="py-16 lg:py-24 bg-background">
        <div className="mx-auto max-w-4xl px-4 space-y-12">
          <FadeUp>
            <div className="bg-aqua/5 rounded-2xl p-8 lg:p-12 border border-aqua/10">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-8 h-8 text-aqua" />
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-ocean">{t.vision.title}</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">{t.vision.content}</p>
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="bg-sun/5 rounded-2xl p-8 lg:p-12 border border-sun/10">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-8 h-8 text-sun" />
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-ocean">{t.mission.title}</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">{t.mission.content}</p>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
