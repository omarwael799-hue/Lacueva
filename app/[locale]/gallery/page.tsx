"use client"

import { useState } from "react"
import { useI18n } from "@/lib/i18n.client"
import { PageHero } from "@/components/page-hero"
import { StaggerContainer, StaggerItem } from "@/components/motion"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const galleryItems = [
  {
    id: 1,
    src: "/images/gallery-1.jpg",
    labelEn: "Aerial View",
    labelAr: "منظر جوي",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: 2,
    src: "/images/gallery-2.jpg",
    labelEn: "Water Slides",
    labelAr: "الزحاليق المائية",
    span: "",
  },
  {
    id: 3,
    src: "/images/gallery-3.jpg",
    labelEn: "Wave Pool",
    labelAr: "مسبح الأمواج",
    span: "",
  },
  {
    id: 4,
    src: "/images/gallery-4.jpg",
    labelEn: "Kids Area",
    labelAr: "منطقة الأطفال",
    span: "md:col-span-2",
  },
  {
    id: 5,
    src: "/images/gallery-5.jpg",
    labelEn: "Lazy River",
    labelAr: "النهر الهادئ",
    span: "",
  },
  {
    id: 6,
    src: "/images/gallery-6.jpg",
    labelEn: "Food Court",
    labelAr: "المطاعم",
    span: "",
  },
  {
    id: 7,
    src: "/images/gallery-7.jpg",
    labelEn: "Fish Aquarium",
    labelAr: "معرض الأسماك",
    span: "md:col-span-2",
  },
  {
    id: 8,
    src: "/images/gallery-8.jpg",
    labelEn: "Sunset View",
    labelAr: "غروب الشمس",
    span: "",
  },
]

export default function GalleryPage() {
  const { content } = useI18n()
  const t = content.gallery
  const isAr = content.meta.locale === "ar"
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const goNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % galleryItems.length)
    }
  }
  const goPrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(
        (lightboxIndex - 1 + galleryItems.length) % galleryItems.length
      )
    }
  }

  return (
    <>
      <PageHero title={t.title} subtitle={t.desc} />

      <section className="py-16 lg:py-24 bg-background">
        <div className="mx-auto max-w-6xl px-4">
          {/* Filter chips */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            <span className="px-4 py-2 rounded-full bg-aqua text-white text-sm font-medium shadow-md shadow-aqua/20">
              {isAr ? "الكل" : "All"}
            </span>
            {[
              isAr ? "الألعاب" : "Rides",
              isAr ? "المسابح" : "Pools",
              isAr ? "الأطفال" : "Kids",
              isAr ? "المرافق" : "Facilities",
            ].map((label) => (
              <span
                key={label}
                className="px-4 py-2 rounded-full bg-muted text-muted-foreground text-sm font-medium hover:bg-muted/80 transition-colors cursor-pointer"
              >
                {label}
              </span>
            ))}
          </div>

          {/* Gallery grid */}
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[180px] lg:auto-rows-[240px]">
            {galleryItems.map((item, index) => (
              <StaggerItem key={item.id} className={item.span}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  onClick={() => openLightbox(index)}
                  className="relative w-full h-full rounded-2xl overflow-hidden group cursor-pointer"
                >
                  <Image
                    src={item.src}
                    alt={isAr ? item.labelAr : item.labelEn}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ocean/70 via-ocean/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white font-heading font-bold text-sm">
                      {isAr ? item.labelAr : item.labelEn}
                    </span>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-6 max-w-md mx-auto text-center">
            {[
              { value: "26+", labelEn: "Attractions", labelAr: "لعبة مائية" },
              { value: "30", labelEn: "Dunums", labelAr: "دونم" },
              { value: "2000+", labelEn: "Daily Visitors", labelAr: "زائر يومياً" },
            ].map((stat) => (
              <div key={stat.value}>
                <p className="text-2xl lg:text-3xl font-heading font-bold text-aqua">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {isAr ? stat.labelAr : stat.labelEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 end-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                goPrev()
              }}
              className="absolute start-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                goNext()
              }}
              className="absolute end-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryItems[lightboxIndex].src}
                alt={
                  isAr
                    ? galleryItems[lightboxIndex].labelAr
                    : galleryItems[lightboxIndex].labelEn
                }
                fill
                className="object-cover"
                sizes="90vw"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-white font-heading font-bold text-center">
                  {isAr
                    ? galleryItems[lightboxIndex].labelAr
                    : galleryItems[lightboxIndex].labelEn}
                </p>
                <p className="text-white/60 text-sm text-center mt-1">
                  {lightboxIndex + 1} / {galleryItems.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
