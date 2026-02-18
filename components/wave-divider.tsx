"use client"

export function WaveDivider({
  flip = false,
  className = "",
}: {
  flip?: boolean
  className?: string
}) {
  return (
    <div
      className={`relative w-full overflow-hidden leading-none ${
        flip ? "scale-y-[-1]" : ""
      } ${className}`}
    >
      <svg
        viewBox="0 0 1440 140"
        preserveAspectRatio="none"
        className="block w-full h-[140px]"
      >
        <path
          d="
            M0,80
            C180,20 360,20 540,70
            C720,120 900,120 1080,70
            C1260,20 1440,40 1440,40
            L1440,140
            L0,140
            Z
          "
          fill="rgba(26,74,122,0.8)"
        />
      </svg>
    </div>
  )
}
