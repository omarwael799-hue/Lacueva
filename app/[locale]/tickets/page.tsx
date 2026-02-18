"use client"

import { useState } from "react"
import { useI18n } from "@/lib/i18n.client"
import { PageHero } from "@/components/page-hero"
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion"
import { WaveDivider } from "@/components/wave-divider"
import { BookingForm } from "@/components/booking-form"
import { User, Baby, Heart, Check, AlertTriangle, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function TicketsPage() {
  const { content } = useI18n()
  const t = content.tickets
  const [showBooking, setShowBooking] = useState(false)

  const pricingCards = [
    {
      icon: User,
      data: t.adults,
      gradient: "from-aqua to-ocean",
      featured: true,
    },
    {
      icon: Baby,
      data: t.kids,
      gradient: "from-sun to-amber-400",
      featured: false,
    },
    {
      icon: Heart,
      data: t.seniors,
      gradient: "from-emerald-400 to-teal-500",
      featured: false,
    },
  ]

  return (
    <>
      <PageHero title={t.title} subtitle={t.intro} />

      {/* Pricing Cards */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="mx-auto max-w-5xl px-4">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingCards.map(({ icon: Icon, data, gradient, featured }) => (
              <StaggerItem key={data.title}>
                <div
                  className={`rounded-2xl overflow-hidden ${
                    featured ? "ring-2 ring-aqua shadow-xl shadow-aqua/10" : "border border-border/50"
                  } bg-card h-full flex flex-col`}
                >
                  <div className={`bg-gradient-to-br ${gradient} p-6 text-center`}>
                    <Icon className="w-10 h-10 text-white mx-auto mb-2" />
                    <h3 className="text-xl font-heading font-bold text-white">{data.title}</h3>
                  </div>
                  <div className="p-6 flex-1 flex flex-col items-center text-center">
                    <p className="text-3xl font-heading font-bold text-ocean mb-2">{data.price}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">{data.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* CTA */}
          <FadeUp>
            <div className="mt-10 text-center">
              <button
                onClick={() => setShowBooking(true)}
                className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-aqua to-ocean text-white font-heading font-bold text-lg rounded-full hover:shadow-lg hover:shadow-aqua/20 transition-all hover:scale-105"
              >
                {t.ctaBook}
              </button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-12 bg-muted">
        <div className="mx-auto max-w-4xl px-4">
          <FadeUp>
            <h2 className="text-2xl font-heading font-bold text-ocean mb-6">{t.included.title}</h2>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {t.included.items.map((item: string, i: number) => (
              <StaggerItem key={i}>
                <div className="flex items-center gap-3 bg-card rounded-xl p-4 border border-border/50">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Important Notes */}
      <section className="py-12 bg-background">
        <div className="mx-auto max-w-4xl px-4">
          <FadeUp>
            <h2 className="text-2xl font-heading font-bold text-ocean mb-6 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-sun" />
              {t.notes.title}
            </h2>
          </FadeUp>
          <StaggerContainer className="space-y-3">
            {t.notes.items.map((item: string, i: number) => (
              <StaggerItem key={i}>
                <div className="flex items-start gap-3 bg-sun/5 rounded-xl p-4 border border-sun/10">
                  <AlertTriangle className="w-5 h-5 text-sun mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowBooking(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 lg:p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-heading font-bold text-ocean">{t.ctaBook}</h3>
                <button
                  onClick={() => setShowBooking(false)}
                  className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <BookingForm />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
