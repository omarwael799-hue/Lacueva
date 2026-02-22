"use client"

import { useState } from "react"
import { useI18n } from "@/lib/i18n.client"
import { PageHero } from "@/components/page-hero"
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion"
import { BookingForm } from "@/components/booking-form"
import { User, Users, Baby, BadgeCheck, AlertTriangle, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function TicketsPage() {
  const { content } = useI18n()
  const t = content.tickets
  const [showBooking, setShowBooking] = useState(false)

  const includedText =
    (t as any)?.included?.text ||
    ((t as any)?.included?.items ? (t as any).included.items.join(" ") : "")

  return (
    <>
      <PageHero title={t.title} subtitle={t.intro} />

      
<section className="py-12 lg:py-16 bg-background">
  <div className="mx-auto max-w-5xl px-4">

    <div className="mt-10">
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StaggerItem>
                <div className="rounded-2xl overflow-hidden border border-border/50 bg-card h-full">
                  <div className="bg-gradient-to-br from-aqua to-ocean p-6 text-center">
                    <User className="w-10 h-10 text-white mx-auto mb-2" />
                    <h3 className="text-xl font-heading font-black text-white">{t.adults.title}</h3>
                  </div>
                  <div className="p-6 text-center">
                    <p className="text-3xl font-heading font-black text-ocean mb-2">{t.adults.price}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t.adults.desc}</p>
                  </div>
                </div>
              </StaggerItem>
<StaggerItem>
  <div className="rounded-2xl overflow-hidden border border-border/50 bg-card h-full">
    <div className="bg-gradient-to-br from-sun to-amber-400 p-6 text-center">
      <Users className="w-10 h-10 text-white mx-auto mb-2" />
      <h3 className="text-xl font-heading font-black text-white">{(t as any).youth.title}</h3>
    </div>
    <div className="p-6 text-center">
      <p className="text-3xl font-heading font-black text-ocean mb-2">{(t as any).youth.price}</p>
      <p className="text-sm text-muted-foreground leading-relaxed">{(t as any).youth.desc}</p>
    </div>
  </div>
</StaggerItem>
              <StaggerItem>
                <div className="rounded-2xl overflow-hidden border border-border/50 bg-card h-full">
                  <div className="bg-gradient-to-br from-sun to-amber-400 p-6 text-center">
                    <Baby className="w-10 h-10 text-white mx-auto mb-2" />
                    <h3 className="text-xl font-heading font-black text-white">{t.kids.title}</h3>
                  </div>
                  <div className="p-6 text-center">
                    <p className="text-3xl font-heading font-black text-ocean mb-2">{t.kids.price}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t.kids.desc}</p>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="rounded-2xl overflow-hidden border border-border/50 bg-card h-full">
                  <div className="bg-gradient-to-br from-emerald-400 to-teal-500 p-6 text-center">
                    <BadgeCheck className="w-10 h-10 text-white mx-auto mb-2" />
                    <h3 className="text-xl font-heading font-black text-white">{(t as any).freeEntry?.title || (content.meta.locale === "ar" ? "حالات الدخول المجاني" : "Free Entry Cases")}</h3>
                  </div>
                  <div className="p-6 text-center">
                    <p className="text-3xl font-heading font-black text-ocean mb-4">{t.seniors?.price}</p>
                    <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                      <p>{t.kids.desc}</p>
                      <p>{t.seniors.desc}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>

<FadeUp>
  <div className="mt-12 text-center">
    <button
      onClick={() => setShowBooking(true)}
      className="inline-flex items-center justify-center px-20 py-7 text-2xl font-heading font-black rounded-full bg-gradient-to-r from-aqua to-ocean text-white shadow-[0_25px_60px_-10px_rgba(0,150,255,0.6)] hover:scale-[1.04] active:scale-[0.98] transition-all duration-300"
    >
      {t.ctaBook}
    </button>
  </div>
</FadeUp>

          </div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="mx-auto max-w-4xl px-4">
          <FadeUp>
            
      {/* Included */}
      <section className="py-12 bg-background">
        <div className="mx-auto max-w-4xl px-4">
          <FadeUp>
            <div className="bg-card border border-border/50 rounded-2xl p-6 lg:p-8 shadow-sm">
              <h2 className="text-2xl font-heading font-black text-ocean mb-3">
                {t.included?.title || "ما تشمله التذكرة"}
              </h2>
              <p className="text-base lg:text-lg leading-relaxed text-foreground/90">
                {(t as any)?.included?.text || ""}
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

<h2 className="text-2xl font-heading font-black text-ocean mb-6 flex items-center gap-2">
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
                <h3 className="text-xl font-heading font-black text-ocean">{t.ctaBook}</h3>
                <button
                  onClick={() => setShowBooking(false)}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
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
