"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useI18n } from "@/lib/i18n.client"

const LOGO_URL = "/logo.webp"

// عدّل المدة هنا
const LOADER_MS = 3200

export function PageLoader() {
  const { content } = useI18n()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), LOADER_MS)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{
            y: "-110%",
            filter: "blur(10px)",
            transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[9999] overflow-hidden"
          style={{
            // شمس بعيدة خفيفة جدًا + جراديانت البحر
            background: "linear-gradient(135deg, #fff7dd 0%, #3ecaf6 50%, #2969a5 100%)",
            backgroundSize: "cover, 200% 200%",
            willChange: "transform, filter",
          }}
        >
          {/* ===== WAVES (TOP LAYER) ===== */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 overflow-hidden h-36 z-30">
            <motion.div
              className="absolute bottom-0 left-0 h-36 w-[200%]"
              animate={{ x: [0, "-50%"] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "linear" }}
            >
              <svg viewBox="0 0 2880 180" className="h-full w-full" preserveAspectRatio="none" fill="none">
                {/* TOP wave — Navy (الأساس) */}
                <path
                  d="M0,92 C240,142 480,42 720,92 C960,142 1200,42 1440,92 C1680,142 1920,42 2160,92 C2400,142 2640,42 2880,92 L2880,180 L0,180 Z"
                  fill="#2969a5"
                />

                {/* BOTTOM wave — White (نفس الشكل بس نازلة لتحت شوية وأهدى) */}
                <path
                  d="M0,104 C240,144 480,64 720,104 C960,144 1200,64 1440,104 C1680,144 1920,64 2160,104 C2400,144 2640,64 2880,104 L2880,180 L0,180 Z"
                  fill="#ffffff"
                  opacity="1"
                />
              </svg>
            </motion.div>
          </div>

          {/* ===== CONTENT ===== */}
          <div className="relative z-40 flex h-full w-full flex-col items-center justify-center">
            {/* Ripple rings */}
            <div className="relative flex items-center justify-center">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border-2 border-white/30"
                  initial={{ width: 46, height: 46, opacity: 0.85 }}
                  animate={{ width: [46, 260], height: [46, 260], opacity: [0.85, 0] }}
                  transition={{ duration: 2.2, delay: i * 0.45, repeat: Infinity, ease: "easeOut" }}
                />
              ))}

              {/* Logo */}
              <motion.div
                initial={{ scale: 0.7, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.75, ease: "easeOut" }}
                className="relative"
                style={{ width: 220, height: 220 }}
              >
                <img
                  src={LOGO_URL}
                  alt="La Cueva Aqua Park"
                  className="absolute inset-0 h-full w-full object-contain"
                  draggable={false}
                />

                {/* Water overlay داخل شكل اللوجو (يختفي تدريجيًا عشان يرجع للوجو الأصلي) */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    WebkitMaskImage: `url(${LOGO_URL})`,
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    WebkitMaskSize: "contain",
                    maskImage: `url(${LOGO_URL})`,
                    maskRepeat: "no-repeat",
                    maskPosition: "center",
                    maskSize: "contain",
                    pointerEvents: "none",
                    mixBlendMode: "overlay",
                  }}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: [1, 1, 0] }}
                  transition={{
                    duration: (LOADER_MS / 1000) * 0.85,
                    times: [0, 0.65, 1],
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(62,202,246,0.90) 35%, rgba(41,105,165,0.90) 100%)",
                    }}
                    initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                    animate={{ clipPath: "inset(-6% 0% 0% 0%)" }}
                    transition={{
                      duration: 1.6,
                      ease: [0.22, 1, 0.36, 1],
                      repeat: Infinity,
                      repeatType: "mirror",
                      repeatDelay: 0.25,
                    }}
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Text */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-8 text-xl font-heading font-bold text-white tracking-wide"
            >
              {content.loader.text}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
