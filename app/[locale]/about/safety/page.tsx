"use client"

import { useI18n } from "@/lib/i18n.client"
import { PageHero } from "@/components/page-hero"
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion"
import { Shield, Award } from "lucide-react"

export default function SafetyPage() {
  const { content } = useI18n()
  const t = content.about

  return (
    <>
      <PageHero title={t.safety.title} />

      <section className="py-16 lg:py-24 bg-background">
        <div className="mx-auto max-w-5xl px-4 space-y-16">
          {/* Safety */}
          <div>
            <FadeUp>
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-8 h-8 text-aqua" />
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-ocean">{t.safety.title}</h2>
              </div>
              <p className="text-lg text-muted-foreground mb-8">{t.safety.intro}</p>
            </FadeUp>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {t.safety.items.map((item, i) => (
                <StaggerItem key={i}>
                  <div className="bg-aqua/5 rounded-xl p-6 border border-aqua/10 flex items-center gap-4">
                    <span className="w-10 h-10 rounded-full bg-aqua/20 flex items-center justify-center text-sm font-bold text-ocean flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-foreground">{item}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Awards */}
          <div>
            <FadeUp>
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-8 h-8 text-sun" />
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-ocean">{t.awards.title}</h2>
              </div>
            </FadeUp>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {t.awards.items.map((item, i) => (
                <StaggerItem key={i}>
                  <div className="bg-sun/5 rounded-xl p-6 border border-sun/10 flex items-center gap-3">
                    <Award className="w-5 h-5 text-sun flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>
    </>
  )
}
