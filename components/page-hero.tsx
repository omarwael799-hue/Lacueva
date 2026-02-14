"use client"

type PageHeroProps = {
  title: string
  subtitle?: string
  backgroundImage?: string
  size?: "sm" | "md" | "lg"
  imageY?: number // 0-100 (نزّل الصورة لتحت)
}

const DEFAULT_HERO_BG =
  "https://filebin.net/fo3nk3edgyb7990w/627029956_1200445888926322_3879120956538668317_n.jpg"

const SIZE_MAP = {
  sm: "min-h-[50vh]",
  md: "min-h-[65vh]",
  lg: "min-h-[85vh]",
}

export function PageHero({
  title,
  subtitle,
  backgroundImage = DEFAULT_HERO_BG,
  size = "md",
  imageY = 65, // زوّدها 70/75 لو عايز الصورة تنزل أكتر
}: PageHeroProps) {
  return (
    <section className={`relative overflow-hidden ${SIZE_MAP[size]}`}>
      {/* BG */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: `center ${imageY}%`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-28 pb-16 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">{title}</h1>
        {subtitle ? (
          <p className="mt-4 text-lg md:text-2xl font-semibold opacity-95">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  )
}