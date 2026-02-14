"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useI18n } from "@/lib/i18n.client"

export function PageLoader() {
  const [loading, setLoading] = useState(true)
  const { content } = useI18n()

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #2969a5 0%, #3ecaf6 50%, #2969a5 100%)",
            backgroundSize: "200% 200%",
          }}
        >
          {/* Ripple rings */}
          <div className="relative flex items-center justify-center">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border-2 border-white/30"
                initial={{ width: 40, height: 40, opacity: 0.8 }}
                animate={{
                  width: [40, 200],
                  height: [40, 200],
                  opacity: [0.8, 0],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.5,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            ))}

            {/* Logo */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            >
              <img
                src="https://filebin.net/zy3egmesuud202vv/logo.png"
                alt="La Cueva Aqua Park"
                className="w-24 h-24 object-contain relative z-10"
              />
            </motion.div>
          </div>

          {/* Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-8 text-xl font-heading font-bold text-white tracking-wide"
          >
            {content.loader.text}
          </motion.p>

          {/* Water wave at bottom */}
          <div className="absolute bottom-0 left-0 right-0 overflow-hidden h-20">
            <motion.div
              className="absolute bottom-0 left-0 w-[200%] h-20"
              animate={{ x: [0, "-50%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <svg viewBox="0 0 2880 120" fill="none" className="w-full h-full">
                <path
                  d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 C1680,120 1920,0 2160,60 C2400,120 2640,0 2880,60 L2880,120 L0,120 Z"
                  fill="rgba(255,255,255,0.2)"
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
