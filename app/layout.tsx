import type { Metadata, Viewport } from "next"
import { Inter, Poppins, Cairo } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500"],
})

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["600", "700"],
})

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  weight: ["400", "600", "700"],
})

export const metadata: Metadata = {
  title: "La Cueva Aqua Park | The Largest Water Park in Jordan",
  description:
    "La Cueva Aqua Park is located on the Dead Sea coast and features over 25 water attractions designed for all ages.",
  keywords: [
    "Water Park Jordan",
    "Dead Sea Water Park",
    "Family Water Park Jordan",
    "مدينة ألعاب مائية",
    "ألعاب مائية في الأردن",
    "مدينة مائية البحر الميت",
  ],
  openGraph: {
    title: "La Cueva Aqua Park",
    description: "The Largest Water Park in Jordan – Dead Sea",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#3ecaf6",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${poppins.variable} ${cairo.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
