"use client"

import { useI18n } from "@/lib/i18n.client"
import { PageHero } from "@/components/page-hero"
import { FadeUp, SlideIn, StaggerContainer, StaggerItem } from "@/components/motion"
import { Shield, Eye, Target, MapPin, Users, Award, Heart, Zap } from "lucide-react"

export default function AboutPage() {
  const { content } = useI18n()
  const t = content.about

  return (
    <>
      <PageHero title={t.title} subtitle={t.heroTagline} />

      {/* Hero paragraph */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="mx-auto max-w-4xl px-4">
          <FadeUp>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-center whitespace-pre-line text-pretty">
              {t.heroParagraph}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Overview */}
      <section className="py-12 bg-muted">
        <div className="mx-auto max-w-6xl px-4">
          <SlideIn>
            <div className="bg-card rounded-2xl p-8 lg:p-12 shadow-sm border border-border/50">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-aqua/10 flex items-center justify-center flex-shrink-0">
                  <Eye className="w-6 h-6 text-aqua" />
                </div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-ocean">{t.overview.title}</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">{t.overview.content}</p>
            </div>
          </SlideIn>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-6xl px-4">
          <FadeUp>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-ocean mb-6">{t.story.title}</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line text-lg">{t.story.content}</p>
          </FadeUp>
        </div>
      </section>

      {/* Concept + Location Strategy side by side */}
      <section className="py-12 bg-muted">
        <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SlideIn>
            <div className="bg-card rounded-2xl p-8 shadow-sm border border-border/50 h-full">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-6 h-6 text-aqua" />
                <h3 className="text-xl font-heading font-bold text-ocean">{t.concept.title}</h3>
              </div>
              <p className="text-muted-foreground whitespace-pre-line leading-relaxed">{t.concept.content}</p>
            </div>
          </SlideIn>
          <SlideIn direction="right">
            <div className="bg-card rounded-2xl p-8 shadow-sm border border-border/50 h-full">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-aqua" />
                <h3 className="text-xl font-heading font-bold text-ocean">{t.locationStrategy.title}</h3>
              </div>
              <p className="text-muted-foreground whitespace-pre-line leading-relaxed">{t.locationStrategy.content}</p>
            </div>
          </SlideIn>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="relative overflow-hidden">
        <div className="bg-ocean py-16">
          <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
            <FadeUp>
              <div className="text-center p-8">
                <Target className="w-10 h-10 text-sun mx-auto mb-4" />
                <h3 className="text-2xl font-heading font-bold text-white mb-3">{t.vision.title}</h3>
                <p className="text-white/80 text-lg">{t.vision.content}</p>
              </div>
            </FadeUp>
            <FadeUp delay={0.15}>
              <div className="text-center p-8">
                <Zap className="w-10 h-10 text-sun mx-auto mb-4" />
                <h3 className="text-2xl font-heading font-bold text-white mb-3">{t.mission.title}</h3>
                <p className="text-white/80 text-lg">{t.mission.content}</p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Capacity & Target */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          <FadeUp>
            <div className="bg-aqua/5 rounded-2xl p-8 border border-aqua/10">
              <h3 className="text-xl font-heading font-bold text-ocean mb-4">{t.capacity.title}</h3>
              <ul className="space-y-3">
                {t.capacity.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-2 h-2 rounded-full bg-aqua mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="bg-sun/5 rounded-2xl p-8 border border-sun/10">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-ocean" />
                <h3 className="text-xl font-heading font-bold text-ocean">{t.targets.title}</h3>
              </div>
              <ul className="space-y-3">
                {t.targets.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-2 h-2 rounded-full bg-sun mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Safety */}
      <section className="py-12 bg-muted">
        <div className="mx-auto max-w-6xl px-4">
          <FadeUp>
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-7 h-7 text-aqua" />
              <h2 className="text-2xl font-heading font-bold text-ocean">{t.safety.title}</h2>
            </div>
            <p className="text-muted-foreground mb-6 text-lg">{t.safety.intro}</p>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {t.safety.items.map((item, i) => (
              <StaggerItem key={i}>
                <div className="bg-card rounded-xl p-5 border border-border/50 flex items-center gap-4">
                  <span className="w-8 h-8 rounded-full bg-aqua/10 flex items-center justify-center text-sm font-bold text-aqua flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-foreground">{item}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-6xl px-4">
          <FadeUp>
            <h2 className="text-2xl font-heading font-bold text-ocean mb-6">{t.services.title}</h2>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.services.items.map((item, i) => (
              <StaggerItem key={i}>
                <div className="bg-aqua/5 rounded-xl p-5 border border-aqua/10 text-foreground">{item}</div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Awards */}
      <section className="py-12 bg-muted">
        <div className="mx-auto max-w-6xl px-4">
          <FadeUp>
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-7 h-7 text-sun" />
              <h2 className="text-2xl font-heading font-bold text-ocean">{t.awards.title}</h2>
            </div>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {t.awards.items.map((item, i) => (
              <StaggerItem key={i}>
                <div className="bg-card rounded-xl p-5 border border-sun/20 flex items-center gap-3">
                  <Award className="w-5 h-5 text-sun flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Brand Promise */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-ocean to-aqua py-16 text-center">
          <div className="mx-auto max-w-3xl px-4">
            <FadeUp>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-6">{t.brandPromise.title}</h2>
              <p className="text-white/90 text-lg whitespace-pre-line leading-relaxed">{t.brandPromise.content}</p>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  )
}
