import type { Metadata } from "next"
import { notFound } from "next/navigation"

import type { Locale } from "@/lib/i18n.server"
import { getContent } from "@/lib/i18n.server"
import { I18nProvider } from "@/lib/i18n.client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageLoader } from "@/components/page-loader"

const locales = ["ar", "en"] as const

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const content = getContent(locale as Locale)

  return {
    title:
      locale === "ar"
        ? "الكويفا أكوابارك | أكبر مدينة ألعاب مائية في الأردن"
        : "La Cueva Aqua Park | The Largest Water Park in Jordan",
    description: content.home.heroDescription,
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!locales.includes(locale as Locale)) notFound()

  const dir = locale === "ar" ? "rtl" : "ltr"

  return (
    <div dir={dir} lang={locale} className={locale === "ar" ? "font-cairo" : "font-sans"}>
      <I18nProvider locale={locale as Locale}>
        <PageLoader />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </I18nProvider>
    </div>
  )
}
