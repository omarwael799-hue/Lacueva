"use client"

import { useI18n } from "@/lib/i18n.client"
import { PageHero } from "@/components/page-hero"
import { FadeUp, SlideIn, StaggerContainer, StaggerItem } from "@/components/motion"
import {
  MapPin,
  Clock,
  Car,
  Phone,
  Navigation,
  Bus,
  ParkingCircle,
  Wifi,
} from "lucide-react"

export default function LocationPage() {
  const { locale, content } = useI18n()
  const t = content.locationPage
  const isAr = locale === "ar"

  const infoCards = [
    {
      icon: MapPin,
      label: isAr ? "العنوان" : "Address",
      value: t.address,
      color: "bg-aqua/10 text-aqua",
    },
    {
      icon: Car,
      label: isAr ? "المسافة من عمان" : "Distance from Amman",
      value: isAr ? "35 دقيقة بالسيارة عبر طريق البحر الميت" : "35 minutes by car via Dead Sea highway",
      color: "bg-ocean/10 text-ocean",
    },
    {
      icon: Clock,
      label: isAr ? "ساعات العمل" : "Operating Hours",
      value: isAr ? "يومياً خلال موسم الصيف من 10 صباحاً حتى 7 مساءً" : "Daily during summer season, 10 AM - 7 PM",
      color: "bg-sun/20 text-foreground",
    },
    {
      icon: Phone,
      label: isAr ? "الهاتف" : "Phone",
      value: "0771200901 / 0771200904",
      color: "bg-aqua/10 text-aqua",
    },
  ]

  const amenities = [
    {
      icon: ParkingCircle,
      label: isAr ? "مواقف مجانية" : "Free Parking",
      desc: isAr ? "مواقف سيارات واسعة ومجانية لجميع الزوار" : "Large free parking for all visitors",
    },
    {
      icon: Bus,
      label: isAr ? "خدمة النقل" : "Shuttle Service",
      desc: isAr ? "باصات نقل من عمان إلى المدينة المائية" : "Shuttle buses from Amman to the park",
    },
    {
      icon: Wifi,
      label: isAr ? "واي فاي مجاني" : "Free WiFi",
      desc: isAr ? "إنترنت مجاني في جميع أنحاء المدينة المائية" : "Free internet throughout the park",
    },
    {
      icon: Navigation,
      label: isAr ? "سهولة الوصول" : "Easy Access",
      desc: isAr ? "طريق معبد ومؤشرات واضحة" : "Paved roads with clear signage",
    },
  ]

  return (
    <>
      <PageHero title={t.title} subtitle={t.deadSea} />

      <section className="py-16 lg:py-24 bg-background">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Map - takes 3 columns */}
            <SlideIn className="lg:col-span-3">
              <div className="rounded-2xl overflow-hidden border border-border/50 shadow-sm h-[400px] lg:h-full min-h-[450px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6769.03!2d35.5505!3d31.7200!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x150e9b8f8a8a8a8b%3A0x1234567890abcdef!2sLa%20Cueva%20Aqua%20Park!5e0!3m2!1sen!2sjo!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="La Cueva Aqua Park Location"
                />
              </div>
            </SlideIn>

            {/* Info cards - takes 2 columns */}
            <div className="lg:col-span-2 space-y-4">
              <FadeUp>
                <h2 className="text-2xl font-heading font-bold text-ocean mb-6">
                  {isAr ? "كيف تصل إلينا" : "How to Find Us"}
                </h2>
              </FadeUp>

              {infoCards.map((item, i) => (
                <FadeUp key={i} delay={i * 0.1}>
                  <div className="flex items-start gap-4 bg-card rounded-xl p-5 border border-border/50 hover:border-aqua/20 transition-colors">
                    <div
                      className={`w-11 h-11 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0`}
                    >
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="text-foreground mt-0.5 leading-relaxed">
                        {item.value}
                      </p>
                    </div>
                  </div>
                </FadeUp>
              ))}

              <FadeUp delay={0.5}>
                <a
                  href="https://maps.app.goo.gl/xcc8tX8jAhLz8Csu9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-aqua to-ocean text-white font-heading font-bold rounded-xl hover:shadow-lg hover:shadow-aqua/20 transition-all"
                >
                  <Navigation className="w-5 h-5" />
                  {isAr ? "افتح في خرائط جوجل" : "Open in Google Maps"}
                </a>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby amenities */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4">
          <FadeUp>
            <h2 className="text-2xl lg:text-3xl font-heading font-bold text-center text-ocean mb-10">
              {isAr ? "مرافق الوصول" : "Getting Here"}
            </h2>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {amenities.map((item) => (
              <StaggerItem key={item.label}>
                <div className="bg-card rounded-2xl p-6 border border-border/50 text-center hover:border-aqua/20 transition-colors h-full">
                  <div className="w-12 h-12 rounded-xl bg-aqua/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-aqua" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground mb-1">
                    {item.label}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Directions section */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="mx-auto max-w-4xl px-4">
          <FadeUp>
            <div className="bg-gradient-to-br from-ocean/5 to-aqua/5 rounded-2xl p-8 lg:p-10 border border-aqua/10">
              <h2 className="text-xl lg:text-2xl font-heading font-bold text-ocean mb-6 text-center">
                {isAr ? "اتجاهات القيادة من عمان" : "Driving Directions from Amman"}
              </h2>
              <ol className="space-y-4">
                {(isAr
                  ? [
                      "اسلك طريق البحر الميت من عمان باتجاه الشونة الجنوبية",
                      "استمر على الطريق الرئيسي لمدة 35 دقيقة تقريباً",
                      "ابحث عن لافتات لاكويفا أكوابارك على يمين الطريق",
                      "ادخل من البوابة الرئيسية واتبع إشارات مواقف السيارات",
                    ]
                  : [
                      "Take the Dead Sea highway from Amman towards South Shouna",
                      "Continue on the main road for approximately 35 minutes",
                      "Look for La Cueva Aqua Park signs on the right side",
                      "Enter from the main gate and follow parking signs",
                    ]
                ).map((step, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-aqua text-white flex items-center justify-center text-sm font-bold">
                      {i + 1}
                    </span>
                    <span className="text-foreground leading-relaxed pt-1">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
