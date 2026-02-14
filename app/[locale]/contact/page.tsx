"use client"

import { useState } from "react"
import { useI18n } from "@/lib/i18n.client"
import { PageHero } from "@/components/page-hero"
import { FadeUp, SlideIn } from "@/components/motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  Clock,
  CheckCircle2,
  Send,
  MessageSquare,
} from "lucide-react"

const socials = [
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://www.facebook.com/LaCueva.JO/",
    color: "hover:bg-[#1877f2]/10 hover:text-[#1877f2]",
  },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/lacueva.jo",
    color: "hover:bg-[#e4405f]/10 hover:text-[#e4405f]",
  },
  {
    icon: Youtube,
    label: "YouTube",
    href: "https://www.youtube.com/@LaCuevaAquaPark",
    color: "hover:bg-[#ff0000]/10 hover:text-[#ff0000]",
  },
]

export default function ContactPage() {
  const { content } = useI18n()
  const t = content.contactPage
  const isAr = content.meta.locale === "ar"
  const [submitted, setSubmitted] = useState(false)

  const contactCards = [
    {
      icon: Phone,
      title: t.phone,
      lines: [
        { text: "+962 0771200901", href: "tel:+9620771200901" },
        { text: "+962 0771200904", href: "tel:+9620771200904" },
      ],
    },
    {
      icon: Mail,
      title: t.email,
      lines: [
        { text: "wecare@lacuevajo.com", href: "mailto:wecare@lacuevajo.com" },
      ],
    },
    {
      icon: MapPin,
      title: content.locationPage.deadSea,
      lines: [{ text: content.locationPage.address, href: undefined }],
    },
    {
      icon: Clock,
      title: isAr ? "ساعات العمل" : "Operating Hours",
      lines: [
        {
          text: isAr
            ? "يومياً خلال موسم الصيف: 10 ص - 7 م"
            : "Daily during summer: 10 AM - 7 PM",
          href: undefined,
        },
      ],
    },
  ]

  return (
    <>
      <PageHero
        title={t.title}
        subtitle={
          isAr
            ? "نحن هنا لمساعدتك في أي وقت"
            : "We are here to help you anytime"
        }
      />

      {/* Contact cards row */}
      <section className="py-12 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactCards.map((card, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="bg-card rounded-2xl p-5 border border-border/50 hover:border-aqua/20 transition-colors h-full">
                  <div className="w-11 h-11 rounded-xl bg-aqua/10 flex items-center justify-center mb-4">
                    <card.icon className="w-5 h-5 text-aqua" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-sm mb-2">
                    {card.title}
                  </h3>
                  {card.lines.map((line, j) =>
                    line.href ? (
                      <a
                        key={j}
                        href={line.href}
                        className="block text-sm text-muted-foreground hover:text-aqua transition-colors leading-relaxed"
                      >
                        {line.text}
                      </a>
                    ) : (
                      <p
                        key={j}
                        className="text-sm text-muted-foreground leading-relaxed"
                      >
                        {line.text}
                      </p>
                    )
                  )}
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Main contact section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Left side - Social + info */}
            <div className="lg:col-span-2">
              <SlideIn>
                <div className="space-y-8">
                  {/* Message intro */}
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-aqua to-ocean flex items-center justify-center mb-5">
                      <MessageSquare className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-2xl font-heading font-bold text-ocean mb-3">
                      {isAr ? "تواصل معنا" : "Get In Touch"}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {isAr
                        ? "هل لديك سؤال أو اقتراح أو استفسار عن الحجز؟ أرسل لنا رسالة وسنتواصل معك في أقرب وقت."
                        : "Have a question, suggestion, or booking inquiry? Send us a message and we will get back to you shortly."}
                    </p>
                  </div>

                  {/* Social links */}
                  <div>
                    <h3 className="font-heading font-bold text-foreground mb-4">
                      {t.socialTitle}
                    </h3>
                    <div className="flex gap-3">
                      {socials.map(({ icon: Icon, label, href, color }) => (
                        <a
                          key={label}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={label}
                          className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-muted-foreground transition-colors ${color}`}
                        >
                          <Icon className="w-5 h-5" />
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Quick response promise */}
                  <div className="bg-gradient-to-br from-aqua/5 to-ocean/5 rounded-2xl p-6 border border-aqua/10">
                    <h3 className="font-heading font-bold text-ocean mb-2 text-sm">
                      {isAr ? "وقت الاستجابة" : "Response Time"}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {isAr
                        ? "نرد على جميع الرسائل خلال 24 ساعة خلال موسم العمل. للأمور العاجلة، يرجى الاتصال بنا مباشرة."
                        : "We respond to all messages within 24 hours during operating season. For urgent matters, please call us directly."}
                    </p>
                  </div>
                </div>
              </SlideIn>
            </div>

            {/* Contact Form */}
            <SlideIn direction="right" className="lg:col-span-3">
              <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-sm border border-border/50">
                <h3 className="text-xl font-heading font-bold text-ocean mb-6">
                  {t.formTitle}
                </h3>

                {submitted ? (
                  <div className="rounded-xl bg-aqua/5 border border-aqua/20 p-10 text-center">
                    <div className="w-16 h-16 rounded-full bg-aqua/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-aqua" />
                    </div>
                    <p className="text-lg font-heading font-bold text-ocean mb-2">
                      {isAr
                        ? "تم إرسال رسالتك بنجاح!"
                        : "Your message has been sent!"}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {isAr
                        ? "سنتواصل معك في أقرب وقت"
                        : "We will get back to you shortly"}
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 text-sm text-aqua hover:underline"
                    >
                      {isAr ? "إرسال رسالة أخرى" : "Send another message"}
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      setSubmitted(true)
                    }}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <Label htmlFor="contactName">{t.nameLabel}</Label>
                        <Input
                          id="contactName"
                          required
                          placeholder={
                            isAr ? "أدخل اسمك الكامل" : "Enter your full name"
                          }
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="contactEmail">{t.emailLabel}</Label>
                        <Input
                          id="contactEmail"
                          required
                          type="email"
                          placeholder={
                            isAr
                              ? "example@email.com"
                              : "example@email.com"
                          }
                          className="h-11"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="contactPhone">
                        {isAr ? "رقم الهاتف (اختياري)" : "Phone (optional)"}
                      </Label>
                      <Input
                        id="contactPhone"
                        type="tel"
                        placeholder="+962 07XXXXXXXX"
                        className="h-11"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="contactSubject">
                        {isAr ? "الموضوع" : "Subject"}
                      </Label>
                      <select
                        id="contactSubject"
                        className="flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          {isAr ? "اختر الموضوع" : "Select a subject"}
                        </option>
                        <option>
                          {isAr ? "استفسار عام" : "General Inquiry"}
                        </option>
                        <option>
                          {isAr ? "حجز مجموعات" : "Group Booking"}
                        </option>
                        <option>
                          {isAr ? "أعياد ميلاد وفعاليات" : "Birthdays & Events"}
                        </option>
                        <option>
                          {isAr ? "رحلات مدرسية" : "School Trips"}
                        </option>
                        <option>
                          {isAr ? "شكوى أو اقتراح" : "Complaint or Suggestion"}
                        </option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="contactMessage">{t.messageLabel}</Label>
                      <textarea
                        id="contactMessage"
                        required
                        rows={5}
                        className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                        placeholder={
                          isAr
                            ? "اكتب رسالتك هنا..."
                            : "Write your message here..."
                        }
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-aqua to-ocean text-white font-heading font-bold py-6 hover:shadow-lg hover:shadow-aqua/20 transition-all text-base"
                    >
                      <Send className="w-4 h-4 me-2" />
                      {t.sendBtn}
                    </Button>
                  </form>
                )}
              </div>
            </SlideIn>
          </div>
        </div>
      </section>
    </>
  )
}
