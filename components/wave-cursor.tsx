"use client"

import { useEffect, useMemo, useRef, useState } from "react"

type Pt = { x: number; y: number; t: number; id: number }

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n))
}

export default function WaveCursor() {
  const [pos, setPos] = useState({ x: -9999, y: -9999 })
  const [isDown, setIsDown] = useState(false)

  const trailRef = useRef<Pt[]>([])
  const splashesRef = useRef<Pt[]>([])
  const rafRef = useRef<number | null>(null)
  const idRef = useRef(1)

  const now = () => performance.now()

  const cursorStyle = useMemo(() => {
    return {
      transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%) scale(${isDown ? 0.92 : 1})`,
    } as React.CSSProperties
  }, [pos.x, pos.y, isDown])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY
      setPos({ x, y })

      // push into trail
      const t = now()
      trailRef.current.push({ x, y, t, id: idRef.current++ })
      // keep trail length
      if (trailRef.current.length > 18) trailRef.current.shift()
    }

    const onDown = (e: MouseEvent) => {
      setIsDown(true)
      const t = now()
      // create "splash" burst (a few droplets)
      for (let i = 0; i < 7; i++) {
        const ang = (Math.PI * 2 * i) / 7
        const r = 8 + Math.random() * 10
        splashesRef.current.push({
          x: e.clientX + Math.cos(ang) * r,
          y: e.clientY + Math.sin(ang) * r,
          t,
          id: idRef.current++,
        })
      }
    }

    const onUp = () => setIsDown(false)

    window.addEventListener("mousemove", onMove, { passive: true })
    window.addEventListener("mousedown", onDown, { passive: true })
    window.addEventListener("mouseup", onUp, { passive: true })

    // cleanup old particles with raf
    const tick = () => {
      const t = now()

      // fade splashes
      splashesRef.current = splashesRef.current.filter((p) => t - p.t < 520)

      // also decay trail a bit (in case mouse stops)
      trailRef.current = trailRef.current.filter((p) => t - p.t < 650)

      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mousedown", onDown)
      window.removeEventListener("mouseup", onUp)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // build render lists
  const tNow = now()
  const trail = trailRef.current.slice(-18)
  const splashes = splashesRef.current.slice(-28)

  return (
    <>
      {/* TRAIL */}
      <div className="wave-cursor-layer" aria-hidden="true">
        {trail.map((p, i) => {
          const age = tNow - p.t
          const alpha = 1 - clamp(age / 650, 0, 1)
          const size = 18 - i * 0.6
          const blur = 6 + i * 0.35
          return (
            <span
              key={p.id}
              className="wave-trail-dot"
              style={{
                left: p.x,
                top: p.y,
                width: size,
                height: size,
                opacity: alpha * 0.55,
                filter: `blur(${blur}px)`,
              }}
            />
          )
        })}

        {/* SPLASH */}
        {splashes.map((p) => {
          const age = tNow - p.t
          const k = clamp(age / 520, 0, 1)
          const alpha = 1 - k
          const size = 10 - k * 5
          return (
            <span
              key={p.id}
              className="wave-splash-dot"
              style={{
                left: p.x,
                top: p.y,
                width: size,
                height: size,
                opacity: alpha * 0.8,
                transform: `translate(-50%, -50%) scale(${1 + k * 0.6})`,
              }}
            />
          )
        })}
      </div>

      {/* MAIN CURSOR */}
      <div className="wave-cursor" style={cursorStyle} aria-hidden="true">
        {/* ripple ring */}
        <span className={`wave-ripple ${isDown ? "is-down" : ""}`} />

        {/* wave svg */}
        <svg className="wave-svg" width="46" height="46" viewBox="0 0 46 46" fill="none">
          <defs>
            <linearGradient id="wgrad" x1="6" y1="8" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="rgb(62,202,246)" stopOpacity="1" />
              <stop offset="1" stopColor="rgb(41,105,165)" stopOpacity="1" />
            </linearGradient>

            <filter id="wglow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.6" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="1 0 0 0 0
                        0 1 0 0 0
                        0 0 1 0 0
                        0 0 0 0.8 0"
              />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <circle cx="23" cy="23" r="17" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
          <path
            d="M8 26 C12 20, 16 32, 20 26 C24 20, 28 32, 32 26 C36 20, 38 24, 40 22"
            stroke="url(#wgrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#wglow)"
            className="wave-path"
          />
        </svg>

      </div>
    </>
  )
}
