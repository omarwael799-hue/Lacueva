"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { useI18n } from "@/lib/i18n.client"
import { FadeUp, StaggerContainer, StaggerItem, FloatCard } from "@/components/motion"
import { motion } from "framer-motion"
import {
  Waves,
  Baby,
  UtensilsCrossed,
  PartyPopper,
  GraduationCap,
  Ticket,
  MapPin,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  Building2,
  Award,
  Users,
  HeartHandshake,
} from "lucide-react"

const HERO_IMAGE = "/hero.png"

const sectionIcons = {
  attractions: Waves,
  kidsArea: Baby,
  food: UtensilsCrossed,
  events: PartyPopper,
  schools: GraduationCap,
  tickets: Ticket,
  location: MapPin,
} as const

const sectionColors = {
  attractions: "from-aqua to-ocean",
  kidsArea: "from-sun to-orange-400",
  food: "from-rose-400 to-red-500",
  events: "from-violet-400 to-purple-600",
  schools: "from-emerald-400 to-teal-600",
  tickets: "from-aqua to-ocean",
  location: "from-ocean to-blue-800",
} as const
const sectionLinks = {
  attractions: "attractions",
  kidsArea: "kids-area",
  food: "food",
  events: "events",
  schools: "schools",
  tickets: "tickets",
  location: "location",
} as const
function SectionShell({
  id,
  title,
  subtitle,
  icon: Icon,
  children,
  tone = "light",
  softBg,
}: {
  id: string
  title?: string
  subtitle?: string
  icon?: React.ElementType
  children: ReactNode
  tone?: "light" | "blue"
  softBg?: string
}) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden ${
        tone === "blue" ? "bg-gradient-to-b from-ocean to-[#0b2542] text-white" : (softBg ? "bg-transparent" : "bg-background")
      }`}
    >
      {softBg ? (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${softBg}')` }}
          />
          <div className="absolute inset-0 bg-white/75" />
        </>
      ) : null}
<div className="relative z-10 mx-auto max-w-7xl px-4 py-14 lg:py-20">
        {title ? (
          <div className="flex items-start gap-4 mb-8">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                tone === "blue" ? "bg-white/10" : "bg-aqua/10"
              }`}
            >
              {Icon ? (
                <Icon className={`${tone === "blue" ? "text-sun" : "text-ocean"} w-6 h-6`} />
              ) : (
                <Sparkles className={`${tone === "blue" ? "text-sun" : "text-ocean"} w-6 h-6`} />
              )}
            </div>

            <div>
              <h2
                className={`text-2xl md:text-3xl font-heading font-bold ${
                  tone === "blue" ? "text-white" : "text-ocean"
                }`}
              >
                {title}
              </h2>

              {subtitle ? (
                <p
                  className={`mt-1 text-sm md:text-base ${
                    tone === "blue" ? "text-white/75" : "text-muted-foreground"
                  }`}
                >
                  {subtitle}
                </p>
              ) : null}
            </div>
          </div>
        ) : null}

        {children}
      </div>

      {/* subtle bubbles */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.18]">
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-aqua blur-3xl" />
        <div className="absolute top-40 -right-24 w-96 h-96 rounded-full bg-sun blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-[520px] h-[520px] rounded-full bg-white blur-3xl" />
      </div>
    </section>
  )
}
export default function HomePage() {
  const { locale, content } = useI18n()
  const t = content.home
  const isAr = locale === "ar"
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight
  const p = `/${locale}`

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden isolate">
        {/* Background */}
        <div
className="absolute inset-0 bg-cover bg-center opacity-90"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        >
<div className="absolute inset-0 bg-gradient-to-b from-[#041a2e]/45 via-ocean/25 to-[#03121f]/55" />
        </div>

{/* Hero Waves (infinite + solid) */}
<div className="pointer-events-none absolute bottom-0 left-0 right-0 overflow-hidden h-36">
  <motion.div
    className="absolute bottom-0 left-0 h-36 w-[200%]"
    animate={{ x: [0, "-50%"] }}
    transition={{ duration: 6.5, repeat: Infinity, ease: "linear" }}
  >
    <svg viewBox="0 0 2880 180" className="h-full w-full" preserveAspectRatio="none" fill="none">
      {/* TOP wave — Navy */}
      <path
        d="M0,92 C240,142 480,42 720,92 C960,142 1200,42 1440,92 C1680,142 1920,42 2160,92 C2400,142 2640,42 2880,92 L2880,180 L0,180 Z"
        fill="#2969a5"
      />
      {/* BOTTOM wave — White (solid) */}
      <path
        d="M0,104 C240,144 480,64 720,104 C960,144 1200,64 1440,104 C1680,144 1920,64 2160,104 C2400,144 2640,64 2880,104 L2880,180 L0,180 Z"
        fill="#ffffff"
        opacity="1"
      />
    </svg>
  </motion.div>
</div>
{/* HERO BOOSTED GLOW */}
<div className="pointer-events-none absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 z-[15]
  w-[680px] h-[520px] md:w-[820px] md:h-[600px]">
  <div className="absolute inset-0 rounded-full bg-sun/20 blur-[110px]" />
  <div className="absolute inset-24 rounded-full bg-aqua/18 blur-[120px]" />
  <div className="absolute inset-44 rounded-full bg-white/12 blur-[90px]" />
</div>

<div className="relative z-[30] mx-auto max-w-5xl px-4 text-center py-32">
  {/* Soft glow behind hero content (calm) */}
  <div className="pointer-events-none absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 w-[720px] h-[520px] md:w-[860px] md:h-[600px]">
    {/* warm sun halo (very subtle) */}
    <div className="absolute inset-0 rounded-full bg-sun/18 blur-3xl" />
    {/* aqua halo (even softer) */}
    <div className="absolute inset-10 rounded-full bg-aqua/14 blur-3xl" />
    {/* white lift (tiny) */}
    <div className="absolute inset-24 rounded-full bg-white/10 blur-2xl" />
  </div>

  {/* content stays above glow */}
  <div className="relative">
    <FadeUp>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        className="mb-6"
      >
        <img
          src="/images/brand/logoW.png"
          alt="La Cueva"
          className="h-20 lg:h-28 w-auto mx-auto object-contain drop-shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
        />
      </motion.div>
    </FadeUp>

    <FadeUp delay={0.2}>
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white text-balance leading-tight drop-shadow-[0_18px_50px_rgba(0,0,0,0.45)]">
        {t.heroTitle}
      </h1>
    </FadeUp>

    <FadeUp delay={0.3}>
      <p className="text-xl md:text-2xl text-sun font-heading font-bold mt-10 drop-shadow-[0_14px_36px_rgba(0,0,0,0.35)]">
        {t.heroSubtitle}
      </p>
    </FadeUp>

    <FadeUp delay={0.4}>
      <p className="mt-6 text-lg text-white/85 max-w-2xl mx-auto text-pretty leading-relaxed drop-shadow-[0_14px_38px_rgba(0,0,0,0.35)]">
        {t.heroDescription}
      </p>
    </FadeUp>

    <FadeUp delay={0.5}>
      <div className="mt-8 flex flex-wrap justify-center gap-4 drop-shadow-[0_14px_38px_rgba(0,0,0,0.30)]">
        <Link
          href={`${p}/tickets`}
          className="inline-flex items-center gap-2 px-8 py-4 bg-sun text-ocean font-heading font-bold rounded-full hover:shadow-lg hover:shadow-sun/30 transition-all hover:scale-105"
        >
          {isAr ? "احجز الآن" : "Book Now"}
          <ArrowIcon className="w-5 h-5" />
        </Link>

        <Link
          href={`${p}/schools`}
          className="inline-flex items-center gap-2 px-8 py-4 bg-white/15 text-white font-heading font-bold rounded-full border border-white/30 hover:bg-white/25 transition-all"
        >
          {t.ctaSchools}
        </Link>

        <button
          onClick={() => {
            document.getElementById("site-footer")?.scrollIntoView({ behavior: "smooth" })
          }}
          className="inline-flex items-center gap-2 px-8 py-4 bg-aqua/20 text-white font-heading font-bold rounded-full border border-aqua/40 hover:bg-aqua/30 transition-all"
        >
          {t.ctaContact}
        </button>
      </div>
    </FadeUp>
  </div>
</div>
      </section>

      {/* Sections grid (KEEP AS IS) */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <FadeUp>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-ocean text-center mb-4 text-balance">
              {isAr ? "استكشف لاكويفا" : "Explore La Cueva"}
            </h2>
            <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12 text-pretty">
              {isAr ? "اكتشف كل ما تقدمه مدينة لاكويفا المائية" : "Discover everything La Cueva Aqua Park has to offer"}
            </p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {(Object.keys(t.sections) as Array<keyof typeof t.sections>).map((key) => {
              const section = t.sections[key]
              const Icon = sectionIcons[key as keyof typeof sectionIcons]
              const gradient = sectionColors[key as keyof typeof sectionColors]
              const link = sectionLinks[key as keyof typeof sectionLinks]
              return (
                <StaggerItem key={String(key)}>
                  <FloatCard>
                    <Link
                      href={`${p}/${link}`}
                      className="block group rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-aqua/30 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-aqua/10"
                    >
                      <div
                        className={`h-32 bg-gradient-to-br ${gradient} flex items-center justify-center relative overflow-hidden`}
                      >
                        <div className="absolute inset-0 bg-white/5 transition-opacity group-hover:opacity-85" />
                        <Icon className="w-12 h-12 text-white relative z-10 transition-transform group-hover:scale-110" />
                      </div>
                      <div className="p-5">
                        <h3 className="font-heading font-bold text-foreground group-hover:text-aqua transition-colors">
                          {section.title}
                        </h3>
                        <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{section.desc}</p>
                        <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-aqua group-hover:text-ocean transition-colors">
                          {content.common.learnMore}
                          <ArrowIcon className="w-4 h-4" />
                        </span>
                      </div>
                    </Link>
                  </FloatCard>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ========= NEW STRUCTURE (LANGUAGE SINGLE) ========= */}

      {/* About / Hero Story */}
      <SectionShell
        id="about"
        title={isAr ? "حيث تبدأ القصة" : "The Fun… Starts Here"}
        subtitle={isAr ? "The Fun… Starts Here" : ""}
        icon={Sparkles}
        tone="blue"
      >
        <div className={`relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 ${isAr ? "" : ""}`}>
          <div className={`space-y-4 leading-relaxed ${isAr ? "text-white/85" : "text-white/80"}`}>
            {isAr ? (
              <>
                <p>أكوابارك كفكرة تتجاوز الترفيه التقليدي</p>
                <p>في قلب البحر الميت، أحد أكثر المواقع تميزًا على مستوى العالم، وُلدت لاكويفا.</p>
                <p>لم تُنشأ لتكون مجرد مدينة ألعاب مائية، بل تجربة متكاملة تُعاش بكل تفاصيلها.</p>
              </>
            ) : (
              <p>
                From the heart of the Dead Sea, one of the world’s most unique destinations, La Cueva Aqua Park was born
                as more than a traditional water park — it was created as a fully immersive experience.
              </p>
            )}
          </div>

          {/* small cinematic card */}
          <div className="rounded-3xl bg-white/10 border border-white/15 p-6 text-white/80 leading-relaxed">
            <p className="font-heading font-bold text-white mb-2">{isAr ? "تجربة متكاملة" : "Fully immersive experience"}</p>
            <p>
              {isAr
                ? "عالم كامل من الحركة والمياه والضحك… كل تفصيلة معمولة عشان تعيش يوم مش عادي."
                : "A complete world where water becomes motion — designed for a day that feels unreal."}
            </p>
          </div>
        </div>
      </SectionShell>

{/* About La Cueva */}
<div data-softbg="01" className="relative bg-[url('/images/gallery/backgrounds/section/bg-soft-01.png')] bg-cover bg-center bg-no-repeat">
  <div className="absolute inset-0 bg-white/70"></div>
  <div className="relative z-10"><SectionShell
  id="about-lacueva"
  title={isAr ? "من نحن" : "About La Cueva"}
  icon={Building2}
 softBg="/images/gallery/backgrounds/section/bg-soft-01.png">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

    {/* LOGO */}
    <div
      className={`
        flex justify-center
        ${isAr ? "lg:order-1 lg:justify-start" : "lg:order-2 lg:justify-end"}
      `}
    >
      <img
        src="https://lh3.googleusercontent.com/proxy/evEbaCpDt7XaUmRHY8FZXfh52LpE0ndJNb2Vxj6WUBDin42pDMJetc1-YAAH8mFc2Ivb1y_IjgI8eU2pQzr9-Agwbh-J"
        alt="Al-Nabali & Al-Fares Holding"
        className="w-[220px] md:w-[300px] lg:w-[420px] opacity-90 drop-shadow-[0_30px_70px_rgba(0,0,0,0.2)]"
      />
    </div>

    {/* TEXT */}
    <div className={isAr ? "text-right" : "text-left"}>
      {isAr ? (
        <div className="space-y-5 text-foreground/90 leading-relaxed text-lg">
          <p>
            تُعد لاكويفا أكوابارك وجهة ترفيهية مائية رائدة في الأردن،
            طُوّرت وفق رؤية حديثة تركّز على جودة التجربة،
            كفاءة التشغيل، وتنوّع الفئات المستهدفة.
          </p>
          <p>
            تندرج لاكويفا ضمن استثمارات مجموعة النبالي والفارس القابضة،
            التي تمتلك خبرة طويلة في تطوير المشاريع النوعية
            وتعزيز السياحة الترفيهية المستدامة.
          </p>
        </div>
      ) : (
        <div className="space-y-5 text-muted-foreground leading-relaxed text-lg">
          <p>
            La Cueva Aqua Park is a leading water entertainment destination in Jordan,
            developed with a modern vision focused on experience quality,
            operational efficiency, and diverse target segments.
          </p>
          <p>
            La Cueva operates under Al-Nabali & Al-Fares Holding investments,
            bringing long-standing expertise in premium tourism projects.
          </p>
        </div>
      )}
    </div>

  </div>
</SectionShell></div>
</div>
      {/* The Concept */}
      <SectionShell
        id="concept"
        title={isAr ? "مفهوم لاكويفا" : "The Concept"}
        subtitle={isAr ? "The Concept |" : ""}
        icon={HeartHandshake}
        tone="blue"
      >
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-3 leading-relaxed text-white/85">
            {isAr ? (
              <>
                <p>لاكويفا ليست مكانًا للزيارة فقط — بل مساحة للهروب من الروتين.</p>
                <p>كل تفصيلة صُممت لتخاطب إحساس الزائر: سهولة الحركة، تنوّع التجارب، والشعور الدائم بالأمان.</p>
              </>
            ) : (
              <p>
                Conceptually, La Cueva is a complete world where water becomes motion, attractions turn into stories, and
                families experience joy together.
              </p>
            )}
          </div>

          <div className="rounded-3xl bg-white/10 border border-white/15 p-6 text-white/80 leading-relaxed">
            <p className="font-heading font-bold text-white mb-2">{isAr ? "الهروب من الروتين" : "Escape the routine"}</p>
            <p>
              {isAr
                ? "مش مجرد مدينة ألعاب… دي مود تاني بالكامل."
                : "Not just a water park — it’s a whole different mood."}
            </p>
          </div>
        </div>
      </SectionShell>

      {/* Location */}
      <div data-softbg="02" className="relative bg-[url('/images/gallery/backgrounds/section/bg-soft-02.png')] bg-cover bg-center bg-no-repeat">
  <div className="absolute inset-0 bg-white/70"></div>
  <div className="relative z-10"><SectionShell id="location" title={isAr ? "الموقع" : "Location"} icon={MapPin} softBg="/images/gallery/backgrounds/section/bg-soft-02.png">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-3 text-foreground/90 leading-relaxed">
            {isAr ? (
              <>
                <p>اختيار البحر الميت لم يكن قرارًا جغرافيًا فقط، بل قرارًا استراتيجيًا.</p>
                <p>الموقع يضع لاكويفا ضمن مسار سياحي نشط قريب من العاصمة عمّان والفنادق والمنتجعات.</p>
              </>
            ) : (
              <p className="text-muted-foreground leading-relaxed">
                Located at the Dead Sea, La Cueva enjoys strategic proximity to Amman, major resorts, and tourist attractions,
                ensuring steady visitor flow throughout the season.
              </p>
            )}
          </div>

          <div className="rounded-3xl bg-card border border-border/50 p-6 text-muted-foreground leading-relaxed">
            <p className="font-heading font-bold text-ocean mb-2">{isAr ? "قريب من كل حاجة" : "Close to everything"}</p>
            <p>
              {isAr
                ? "موقع يخدم السياحة… ويخلّي الوصول أسهل للزوار."
                : "A tourism-driven location with easy access for visitors."}
            </p>
          </div>
        </div>
      </SectionShell></div>
</div>

      {/* Park Size & Capacity */}
      <SectionShell
        id="capacity"
        title={isAr ? "الحجم والقدرة التشغيلية" : "Park Size & Capacity"}
        icon={Users}
        tone="blue"
      >
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { kAr: "المساحة الإجمالية", kEn: "Total Area", v: "30", uAr: "دونم", uEn: "Dunum" },
                { kAr: "الطاقة الاستيعابية اليومية", kEn: "Daily Capacity", v: "2000", uAr: "زائر", uEn: "Visitors" },
                { kAr: "الألعاب والتجارب", kEn: "Rides & Experiences", v: "26+", uAr: "", uEn: "" },
              ].map((x) => (
                <div key={x.v + x.kEn} className="rounded-2xl bg-white/10 border border-white/15 p-5">
                  <p className="text-white/80 text-sm">{isAr ? x.kAr : x.kEn}</p>
                  <p className="mt-2 text-3xl font-heading font-bold text-sun">
                    {x.v}{" "}
                    <span className="text-base text-white/70 font-normal">{isAr ? x.uAr : x.uEn}</span>
                  </p>
                </div>
              ))}
            </div>

            <p className="text-white/80 leading-relaxed">
              {isAr
                ? "تخطيط ذكي يضمن حركة أسهل للزوار ويقلّل الزحام ويزود المتعة."
                : "Master-planned for smooth circulation, reduced congestion, and maximum guest enjoyment."}
            </p>
          </div>

          <div className="rounded-3xl bg-white/10 border border-white/15 p-6 text-white/80 leading-relaxed">
            <p className="font-heading font-bold text-white mb-2">{isAr ? "ملخص سريع" : "Quick summary"}</p>
            {isAr ? (
              <ul className="space-y-2 list-disc list-inside">
                <li>تخطيط ذكي يقلّل الزحام ويحسن حركة الزوار</li>
                <li>تشغيل فعّال مع تجربة ضيوف أعلى</li>
                <li>تنوع ألعاب وتجارب يناسب جميع الأعمار</li>
              </ul>
            ) : (
              <ul className="space-y-2 list-disc list-inside">
                <li>Smart layout to reduce congestion</li>
                <li>High operational efficiency</li>
                <li>Experiences for all ages</li>
              </ul>
            )}
          </div>
        </div>
      </SectionShell>

      {/* Attractions & Rides (cards hover + ONE language) */}
      <div data-softbg="03" className="relative bg-[url('/images/gallery/backgrounds/section/bg-soft-03.png')] bg-cover bg-center bg-no-repeat">
  <div className="absolute inset-0 bg-white/70"></div>
  <div className="relative z-10"><SectionShell id="rides" title={isAr ? "الألعاب والتجارب" : "Attractions & Rides"} icon={Waves} softBg="/images/gallery/backgrounds/section/bg-soft-03.png">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              arT: "ألعاب الإثارة",
              enT: "Thrill Rides",
              arD: "زحاليق مائية عالية السرعة وتجارب مليئة بالإثارة لعشاق المغامرة.",
              enD: "High-speed water slides and adrenaline attractions.",
            },
            {
              arT: "بركة الأمواج",
              enT: "Wave Pool",
              arD: "مسبح أمواج واسع يمنح تجربة حيوية وآمنة لجميع الأعمار.",
              enD: "A large wave pool offering a dynamic yet safe experience for families and groups.",
            },
            {
              arT: "النهر الهادئ",
              enT: "Lazy River",
              arD: "رحلة مائية هادئة للاسترخاء والاستمتاع بالمكان.",
              enD: "A relaxing floating experience around the park.",
            },
            {
              arT: "منطقة الأطفال",
              enT: "Kids Zone",
              arD: "منطقة آمنة للأطفال بألعاب مائية مناسبة وإشراف دائم.",
              enD: "A dedicated, safe water playground with shallow pools and colorful attractions.",
            },
          ].map((c) => (
            <div
              key={c.enT}
              className="
                group rounded-3xl bg-card border border-border/50 p-6
                transition-all duration-300
                hover:-translate-y-1 hover:shadow-2xl hover:shadow-aqua/10
                hover:border-aqua/40
              "
            >
              <p className="font-heading font-bold text-ocean transition-colors group-hover:text-aqua">
                {isAr ? c.arT : c.enT}
              </p>

              <p className="mt-3 text-sm leading-relaxed text-foreground/85">{isAr ? c.arD : c.enD}</p>

              <div className="mt-4 h-px w-0 bg-aqua/40 transition-all duration-300 group-hover:w-full" />

              <p className="mt-3 text-xs text-muted-foreground group-hover:text-ocean transition-colors">
                {isAr ? "اعرف أكتر" : "Learn more"}{" "}
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </p>
            </div>
          ))}
        </div>
      </SectionShell></div>
</div>

      {/* Entertainment Experience */}
      <SectionShell
        id="experience"
        title={isAr ? "التجربة الترفيهية" : "Entertainment Experience"}
        icon={PartyPopper}
        tone="blue"
      >
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-3 text-white/85 leading-relaxed">
            {isAr ? (
              <>
                <p>راحة في مختلف الأوقات.</p>
                <p>
                  من الألعاب عالية الإثارة إلى مناطق الاسترخاء، تقدم لاكويفا تجربة متكاملة مدعومة بمناطق ظل واسعة، أنظمة تغشية وتبريد.
                </p>
              </>
            ) : (
              <p className="text-white/80 leading-relaxed">
                From thrilling rides to relaxing zones, La Cueva delivers a balanced entertainment experience enhanced by
                shaded areas and cooling systems.
              </p>
            )}
          </div>

          <div className="rounded-3xl bg-white/10 border border-white/15 p-6 text-white/80">
            <p className="font-heading font-bold text-white mb-2">{isAr ? "توازن مثالي" : "Perfect balance"}</p>
            <p className="leading-relaxed">
              {isAr ? "إثارة + استرخاء… من غير ما تحس بتعب اليوم." : "Thrills + chill — without the burnout."}
            </p>
          </div>
        </div>
      </SectionShell>

      {/* Target Segments */}
      <div data-softbg="04" className="relative bg-[url('/images/gallery/backgrounds/section/bg-soft-04.png')] bg-cover bg-center bg-no-repeat">
  <div className="absolute inset-0 bg-white/70"></div>
  <div className="relative z-10"><SectionShell id="segments" title={isAr ? "الفئات المستهدفة" : "Target Segments"} icon={Users} softBg="/images/gallery/backgrounds/section/bg-soft-04.png">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="rounded-3xl bg-card border border-border/50 p-6">
            {isAr ? (
              <ul className="space-y-2 text-foreground/90">
                {["العائلات", "المدارس والجامعات", "الشركات والمؤسسات", "المناسبات الخاصة والفعاليات"].map((x) => (
                  <li key={x} className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-aqua" />
                    {x}
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="space-y-2 text-muted-foreground">
                {["Families", "Schools & Universities", "Corporate Events", "Private Celebrations"].map((x) => (
                  <li key={x} className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-aqua" />
                    {x}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-3xl bg-card border border-border/50 p-6 text-muted-foreground leading-relaxed">
            <p>
              {isAr
                ? "لاكويفا بتخدم العائلات والمدارس والشركات والفعاليات الخاصة."
                : "La Cueva caters to families, schools, corporate events, and private celebrations."}
            </p>
          </div>
        </div>
      </SectionShell></div>
</div>

      {/* Safety & Technology */}
      <SectionShell id="safety" title={isAr ? "السلامة والتقنية" : "Safety & Technology"} icon={ShieldCheck} tone="blue">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="text-white/85 leading-relaxed">
            <p className="font-heading font-bold text-white mb-3">
              {isAr ? "لأن المرح الحقيقي لا يكتمل دون أمان:" : "Because real fun needs real safety:"}
            </p>

            {isAr ? (
              <ul className="space-y-2 list-disc list-inside text-white/80">
                <li>دخول بسوار ذكي + دفع بدون كاش</li>
                <li>أكثر من 125 كاميرا مراقبة</li>
                <li>أنظمة معالجة مياه تلقائية</li>
                <li>منقذون معتمدون + عيادة طبية</li>
              </ul>
            ) : (
              <ul className="space-y-2 list-disc list-inside text-white/80">
                <li>Smart wristband access & cashless payment</li>
                <li>125+ surveillance cameras</li>
                <li>Automated water treatment systems</li>
                <li>Certified lifeguards & on-site medical clinic</li>
              </ul>
            )}
          </div>

          <div className="rounded-3xl bg-white/10 border border-white/15 p-6 text-white/80">
            <p className="font-heading font-bold text-white mb-2">{isAr ? "تشغيل ذكي + مراقبة" : "Smart ops + monitoring"}</p>
            <p className="leading-relaxed">
              {isAr
                ? "منظومة متكاملة تضمن أعلى معايير الأمان… عشان تركز في المتعة وبس."
                : "A full system built for safety — so you can focus on fun."}
            </p>
          </div>
        </div>
      </SectionShell>

      {/* Facilities & Services */}
      <div data-softbg="05" className="relative bg-[url('/images/gallery/backgrounds/section/bg-soft-05.png')] bg-cover bg-center bg-no-repeat">
  <div className="absolute inset-0 bg-white/70"></div>
  <div className="relative z-10"><SectionShell id="facilities" title={isAr ? "المرافق والخدمات" : "Facilities & Services"} icon={Building2} softBg="/images/gallery/backgrounds/section/bg-soft-05.png">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(
            isAr
              ? [
                  "مسابح دافئة لتشغيل أطول",
                  "جلسات وكبائن خاصة",
                  "مطاعم وكافيهات",
                  "تجربة أكواريوم تعليمية",
                  "مواقف مع شحن للسيارات الكهربائية",
                ]
              : [
                  "Heated pools for extended operation",
                  "Private cabanas",
                  "Restaurants & cafés",
                  "Educational aquarium experience",
                  "EV charging parking spaces",
                ]
          ).map((x) => (
            <div
              key={x}
              className="
                group rounded-3xl bg-card border border-border/50 p-6
                transition-all duration-300
                hover:-translate-y-1 hover:shadow-2xl hover:shadow-aqua/10 hover:border-aqua/40
              "
            >
              <p className="font-heading font-bold text-ocean group-hover:text-aqua transition-colors">{x}</p>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {isAr ? "تفاصيل معمولة عشان تعيش يوم كامل من غير نقص." : "Designed to deliver a full, smooth day experience."}
              </p>
              <div className="mt-4 h-px w-0 bg-aqua/40 transition-all duration-300 group-hover:w-full" />
            </div>
          ))}
        </div>
      </SectionShell></div>
</div>

      {/* Certifications & Awards */}
      <SectionShell id="certs" title={isAr ? "الجودة والاعتمادات" : "Certifications & Awards"} icon={Award} tone="blue">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="rounded-3xl bg-white/10 border border-white/15 p-6">
            <ul className="space-y-2 text-white/85 list-disc list-inside">
              {(isAr
                ? [
                    "ISO 9001 – إدارة الجودة",
                    "ISO 45001 – الصحة والسلامة المهنية",
                    "ISO 22000 – سلامة الغذاء",
                    "حصلت على “Top Tourist Destination 2019” من وزارة السياحة الأردنية",
                  ]
                : [
                    "ISO 9001 – Quality Management",
                    "ISO 45001 – Occupational Health & Safety",
                    "ISO 22000 – Food Safety",
                    "Awarded “Top Tourist Destination 2019” by the Jordanian Ministry of Tourism",
                  ]
              ).map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>

          <div className="text-white/80 leading-relaxed">
            <p>
              {isAr
                ? "الجودة هنا مش شعار — دي منظومة تشغيل كاملة ومعايير موثقة تضمن تجربة ثابتة ومبهرة كل موسم."
                : "Quality isn’t a slogan here — it’s an operating system with documented standards, every season."}
            </p>
          </div>
        </div>
      </SectionShell>

      {/* A Living Brand */}
      <div data-softbg="06" className="relative bg-[url('/images/gallery/backgrounds/section/bg-soft-06.JPG')] bg-cover bg-center bg-no-repeat">
  <div className="absolute inset-0 bg-white/70"></div>
  <div className="relative z-10"><SectionShell id="brand" title={isAr ? "علامة تُعاش" : "A Living Brand"} icon={Sparkles} softBg="/images/gallery/backgrounds/section/bg-soft-06.JPG">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-3 text-foreground/90 leading-relaxed">
            <p>
              {isAr
                ? "لاكويفا ليست موقعًا على الخريطة… بل علامة ترتبط بالصيف، بالضحك، وبالذكريات."
                : "La Cueva is not just a destination — it’s a feeling that stays with every visitor."}
            </p>
          </div>

          <div className="rounded-3xl bg-card border border-border/50 p-6 text-muted-foreground leading-relaxed">
            <p className="font-heading font-bold text-ocean mb-2">{isAr ? "ذكريات" : "Memories"}</p>
            <p>{isAr ? "اللي بييجي مرة… بيرجع تاني." : "Once you visit — you want to come back."}</p>
          </div>
        </div>
      </SectionShell></div>
</div>

      {/* The Promise */}
      <SectionShell id="promise" title={isAr ? "الوعد" : "The Promise"} icon={HeartHandshake} tone="blue">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="text-white/85 leading-relaxed">
            <p>
              {isAr
                ? "في كل موسم، وفي كل زيارة، تَعِد لاكويفا زوارها بتجربة متكاملة لا تُشبه إلا نفسها."
                : "Every season, every visit — La Cueva promises an authentic experience unlike any other."}
            </p>
          </div>

          <div className="rounded-3xl bg-white/10 border border-white/15 p-6 text-white/80">
            <p className="font-heading font-bold text-white mb-2">{isAr ? "جاهز؟" : "Ready?"}</p>
            <p>{isAr ? "خلّي الصيف يبدأ صح." : "Start the season the right way."}</p>
          </div>

          <div className="lg:col-span-2 pt-4">
            <Link
              href={`${p}/tickets`}
              className="inline-flex items-center gap-2 px-10 py-4 bg-sun text-ocean font-heading font-bold rounded-full hover:shadow-xl hover:shadow-sun/30 transition-all hover:scale-105"
            >
              {isAr ? "احجز الآن" : "Book Now"}
              <ArrowIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </SectionShell>
    </>
  )
}
