"use client"

import { useState } from "react"
import { useI18n } from "@/lib/i18n.client"
import { PageHero } from "@/components/page-hero"
import { FadeUp } from "@/components/motion"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronDown,
  Ticket,
  Waves,
  UtensilsCrossed,
  Shield,
  Fish,
  Home,
  PartyPopper,
  Search,
} from "lucide-react"

type FAQEntry = { qAr: string; qEn: string; aAr: string; aEn: string }

const faqData: Record<string, FAQEntry[]> = {
  tickets: [
    { qAr: "ما أسعار التذاكر للكبار؟", qEn: "What are adult ticket prices?", aAr: "الأسعار تتراوح بين 15–25 دينار للشخص البالغ وتشمل جميع الألعاب المائية والمسابح.", aEn: "Prices range from 15–25 JOD per adult and include all water rides and pools." },
    { qAr: "هل هناك خصومات للأطفال؟", qEn: "Are there discounts for children?", aAr: "نعم، الأطفال دون 12 سنة يحصلون على خصم خاص، والأطفال دون سنتين يدخلون مجاناً.", aEn: "Yes, children under 12 get a special discount, and children under 2 enter for free." },
    { qAr: "هل يوجد تذاكر عائلية؟", qEn: "Are there family tickets?", aAr: "نعم، تتوفر باقات عائلية مخفضة تشمل دخول جميع أفراد الأسرة.", aEn: "Yes, discounted family packages are available for all family members." },
    { qAr: "هل يمكن شراء التذاكر أونلاين؟", qEn: "Can I buy tickets online?", aAr: "نعم، يمكن الحجز والدفع عبر الموقع الإلكتروني أو تطبيقات الدفع الإلكتروني.", aEn: "Yes, booking and payment are available through the website or eFAWATEERcom." },
    { qAr: "هل هناك اشتراكات موسمية؟", qEn: "Are there seasonal passes?", aAr: "نعم، بطاقات موسمية تسمح بالدخول عدة مرات خلال الصيف.", aEn: "Yes, seasonal passes allow multiple entries throughout the summer." },
    { qAr: "هل يسمح بإعادة الدخول بنفس التذكرة؟", qEn: "Can I re-enter with the same ticket?", aAr: "نعم، يمكن إعادة الدخول بنفس التذكرة في نفس اليوم.", aEn: "Yes, re-entry is allowed on the same day." },
    { qAr: "هل هناك تذاكر مخفضة لكبار السن؟", qEn: "Are there discounts for seniors?", aAr: "65 سنة فما فوق دخول مجاني.", aEn: "Ages 65 and above enter for free." },
    { qAr: "هل يمكن استرداد قيمة التذكرة؟", qEn: "Can I get a refund?", aAr: "نعم، وفق سياسة الإلغاء قبل 24 ساعة من موعد الزيارة.", aEn: "Yes, per cancellation policy 24 hours before the visit." },
    { qAr: "هل أسعار التذاكر تشمل كل الألعاب؟", qEn: "Do ticket prices include all rides?", aAr: "نعم، جميع الألعاب مشمولة بدون رسوم إضافية.", aEn: "Yes, all rides are included with no extra fees." },
    { qAr: "هل هناك تذاكر مسائية فقط؟", qEn: "Are there evening-only tickets?", aAr: "نعم، بأسعار أقل للدخول بعد الساعة 2/3 مساءً.", aEn: "Yes, at reduced prices for entry after 2/3 PM." },
  ],
  activities: [
    { qAr: "كم عدد الألعاب المائية؟", qEn: "How many water rides are there?", aAr: "هناك أكثر من 26 لعبة مائية متنوعة تناسب جميع الأعمار.", aEn: "Over 26 diverse water rides for all ages." },
    { qAr: "ما أطول منزلق مائي؟", qEn: "What is the tallest water slide?", aAr: "يصل طوله إلى أكثر من 20 متر ويوفر تجربة مثيرة للكبار.", aEn: "Over 20 meters tall, offering a thrilling experience for adults." },
    { qAr: "هل هناك ألعاب للأطفال تحت 5 سنوات؟", qEn: "Are there rides for kids under 5?", aAr: "نعم، منطقة خاصة بهم بألعاب آمنة ومناسبة لأعمارهم.", aEn: "Yes, a dedicated area with safe, age-appropriate rides." },
    { qAr: "هل الألعاب آمنة؟", qEn: "Are the rides safe?", aAr: "نعم، مع منقذين مدربين وفحص دوري لجميع الألعاب.", aEn: "Yes, with trained lifeguards and regular safety inspections." },
    { qAr: "هل يوجد مسبح أمواج؟", qEn: "Is there a wave pool?", aAr: "نعم، يحاكي تجربة البحر بأمواج متنوعة الشدة.", aEn: "Yes, simulating an ocean experience with varying wave intensity." },
    { qAr: "هل الألعاب تعمل في الشتاء؟", qEn: "Do rides operate in winter?", aAr: "لا، المنتزه مغلق بالشتاء.", aEn: "No, the park is closed in winter." },
    { qAr: "هل يمكن ارتداء سترات النجاة؟", qEn: "Are life jackets available?", aAr: "نعم، متوفرة مجاناً لجميع الزوار.", aEn: "Yes, available for free for all visitors." },
    { qAr: "هل هناك ألعاب جديدة في 2026؟", qEn: "Are there new rides in 2026?", aAr: "نعم، يتم إضافة ألعاب جديدة كل موسم.", aEn: "Yes, new rides are added every season." },
  ],
  food: [
    { qAr: "ما أنواع الطعام المتوفرة؟", qEn: "What food is available?", aAr: "مأكولات وجبات سريعة مثل البيتزا والبرغر والفلافل.", aEn: "Fast food options including pizza, burgers, and falafel." },
    { qAr: "هل يسمح بإدخال الطعام من الخارج؟", qEn: "Can I bring outside food?", aAr: "لا، حفاظاً على النظافة والسلامة.", aEn: "No, to maintain cleanliness and safety standards." },
    { qAr: "هل هناك كافيهات تقدم الشيشة؟", qEn: "Are there shisha cafes?", aAr: "نعم، في مناطق مخصصة بعيداً عن الأطفال.", aEn: "Yes, in designated areas away from children." },
    { qAr: "هل هناك وجبات للأطفال؟", qEn: "Are there kids meals?", aAr: "نعم، وجبات صغيرة وخفيفة تناسب الأطفال.", aEn: "Yes, small and light meals designed for kids." },
    { qAr: "هل هناك مشروبات طبيعية؟", qEn: "Are there natural beverages?", aAr: "نعم، عصائر طازجة ومشروبات صحية.", aEn: "Yes, fresh juices and healthy drinks." },
    { qAr: "هل يمكن الدفع بالبطاقة في المطاعم؟", qEn: "Can I pay by card at restaurants?", aAr: "نعم، جميع المطاعم مجهزة بخدمة الدفع الإلكتروني.", aEn: "Yes, all restaurants accept electronic payment." },
  ],
  safety: [
    { qAr: "هل يوجد واي فاي مجاني؟", qEn: "Is there free WiFi?", aAr: "نعم، الإنترنت متوفر مجاناً في معظم المناطق.", aEn: "Yes, free internet in most areas." },
    { qAr: "هل هناك غرف تبديل ملابس؟", qEn: "Are there changing rooms?", aAr: "نعم، توجد غرف مخصصة لتبديل الملابس.", aEn: "Yes, dedicated changing rooms available." },
    { qAr: "هل يوجد خزائن لحفظ الأغراض؟", qEn: "Are there lockers?", aAr: "نعم، يمكن استئجار خزائن لحفظ الأغراض الشخصية.", aEn: "Yes, lockers available for rent." },
    { qAr: "هل هناك مواقف سيارات؟", qEn: "Is there parking?", aAr: "نعم، هناك مواقف سيارات كبيرة ومجانية.", aEn: "Yes, large free parking available." },
    { qAr: "هل يوجد خدمة نقل من عمان؟", qEn: "Is there transport from Amman?", aAr: "نعم، تتوفر باصات نقل خاصة من عمان إلى المنتزه.", aEn: "Yes, shuttle buses from Amman are available." },
    { qAr: "هل هناك إسعافات أولية؟", qEn: "Is there first aid?", aAr: "نعم، يوجد مركز طبي مجهز داخل المنتزه مع فريق إسعاف متواجد دائماً.", aEn: "Yes, an equipped medical center with a permanent first aid team." },
    { qAr: "هل يسمح للأطفال دون مرافق؟", qEn: "Can children enter alone?", aAr: "لا، يجب وجود مرافق بالغ.", aEn: "No, an adult companion is required." },
    { qAr: "هل هناك كاميرات مراقبة؟", qEn: "Are there security cameras?", aAr: "نعم، أكثر من 125 كاميرا لضمان الأمن والسلامة.", aEn: "Yes, over 125 cameras ensuring security and safety." },
  ],
  cabins: [
    { qAr: "هل الأكواخ مكيفة؟", qEn: "Are the cabins air-conditioned?", aAr: "نعم، جميع الأكواخ مجهزة بمكيفات هواء حديثة.", aEn: "Yes, all cabins are equipped with modern air conditioning." },
    { qAr: "كم عدد الأشخاص المسموح في الكوخ؟", qEn: "How many people per cabin?", aAr: "الأكواخ تستوعب من 4 إلى 6 أشخاص حسب الحجم.", aEn: "Cabins accommodate 4 to 6 people depending on size." },
    { qAr: "هل يمكن الحجز مسبقاً؟", qEn: "Can I book in advance?", aAr: "نعم، يفضل الحجز مسبقاً خاصة في عطلة نهاية الأسبوع.", aEn: "Yes, advance booking is recommended, especially on weekends." },
    { qAr: "هل يوجد أكواخ VIP؟", qEn: "Are there VIP cabins?", aAr: "نعم، أكواخ مجهزة بمرافق فاخرة.", aEn: "Yes, cabins equipped with premium amenities." },
    { qAr: "هل يمكن طلب وجبات داخل الكوخ؟", qEn: "Can I order food to the cabin?", aAr: "نعم، خدمة توصيل متاحة.", aEn: "Yes, delivery service is available." },
    { qAr: "هل الأكواخ مجهزة بإنترنت؟", qEn: "Do cabins have internet?", aAr: "نعم، واي فاي مجاني.", aEn: "Yes, free WiFi is available." },
  ],
  aquarium: [
    { qAr: "ما نوع الأسماك المعروضة؟", qEn: "What types of fish are displayed?", aAr: "المعرض يضم أسماك من بحار ومحيطات مختلفة، مثل أسماك الزينة، القرش الصغير، وأسماك استوائية.", aEn: "Fish from various seas and oceans, including ornamental fish, small sharks, and tropical fish." },
    { qAr: "هل المعرض تعليمي للأطفال؟", qEn: "Is the aquarium educational for kids?", aAr: "نعم، هناك لوحات تعريفية وأنشطة تعليمية للأطفال مع شرح مبسط عن الحياة البحرية.", aEn: "Yes, with informational boards and educational activities for children." },
    { qAr: "هل يمكن التصوير داخل المعرض؟", qEn: "Can I take photos inside?", aAr: "نعم، التصوير مسموح لكن بدون فلاش حفاظاً على الأسماك.", aEn: "Yes, photos are allowed but no flash to protect the fish." },
    { qAr: "هل هناك جولات إرشادية؟", qEn: "Are there guided tours?", aAr: "نعم، تتوفر جولات مع مرشدين متخصصين.", aEn: "Yes, guided tours with specialized guides are available." },
    { qAr: "هل المعرض مفتوح طوال اليوم؟", qEn: "Is the aquarium open all day?", aAr: "نعم، من الساعة 11 صباحاً حتى 6 مساءً.", aEn: "Yes, from 11 AM to 6 PM." },
    { qAr: "هل هناك عروض تفاعلية للأطفال؟", qEn: "Are there interactive shows for kids?", aAr: "نعم، مثل إطعام الأسماك تحت إشراف الموظفين.", aEn: "Yes, like fish feeding under staff supervision." },
    { qAr: "هل يمكن الدخول للمعرض فقط؟", qEn: "Can I visit the aquarium only?", aAr: "نعم، يمكن شراء تذاكر خاصة للمعرض فقط.", aEn: "Yes, separate aquarium-only tickets are available." },
  ],
  events: [
    { qAr: "هل تقام حفلات موسيقية؟", qEn: "Are there music concerts?", aAr: "نعم، خاصة في الصيف مع فنانين محليين.", aEn: "Yes, especially in summer with local artists." },
    { qAr: "هل يمكن تنظيم أعياد ميلاد؟", qEn: "Can I organize birthdays?", aAr: "نعم، مناطق خاصة وخدمات الطعام والديكور.", aEn: "Yes, with dedicated areas, food, and decoration services." },
    { qAr: "هل يمكن حجز فعاليات خاصة؟", qEn: "Can I book private events?", aAr: "نعم، للشركات والمؤسسات والمناسبات.", aEn: "Yes, for companies, organizations, and special occasions." },
    { qAr: "هل هناك عروض ترفيهية مسائية؟", qEn: "Are there evening entertainment shows?", aAr: "نعم، موسيقى وعروض ضوئية خلال الموسم.", aEn: "Yes, music and light shows during the season." },
    { qAr: "هل هناك فعاليات للأطفال؟", qEn: "Are there events for children?", aAr: "نعم، أنشطة ترفيهية وتعليمية مثل مسابقات الرسم وعروض الماسكوت.", aEn: "Yes, activities like drawing contests and mascot shows." },
  ],
}

const categoryIcons: Record<string, typeof Ticket> = {
  tickets: Ticket,
  activities: Waves,
  food: UtensilsCrossed,
  safety: Shield,
  cabins: Home,
  aquarium: Fish,
  events: PartyPopper,
}

const categoryLabels: Record<string, { ar: string; en: string }> = {
  tickets: { ar: "التذاكر والدخول", en: "Tickets & Entry" },
  activities: { ar: "الألعاب والأنشطة", en: "Activities" },
  food: { ar: "المطاعم", en: "Food" },
  safety: { ar: "الخدمات والسلامة", en: "Services & Safety" },
  cabins: { ar: "الأكواخ", en: "Cabins" },
  aquarium: { ar: "معرض الأسماك", en: "Fish Aquarium" },
  events: { ar: "الفعاليات", en: "Events" },
}

function FAQItem({
  entry,
  isAr,
}: {
  entry: FAQEntry
  isAr: boolean
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-border/50 rounded-xl overflow-hidden bg-card hover:border-aqua/30 transition-colors">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 lg:p-5 text-start hover:bg-muted/50 transition-colors"
      >
        <span className="font-medium text-foreground pe-4 leading-relaxed">
          {isAr ? entry.qAr : entry.qEn}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-aqua flex-shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 lg:px-5 lg:pb-5 text-muted-foreground leading-relaxed border-t border-border/30 pt-4">
              {isAr ? entry.aAr : entry.aEn}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQPage() {
  const { content } = useI18n()
  const t = content.faq
  const isAr = content.meta.locale === "ar"
  const [activeTab, setActiveTab] = useState<string>("tickets")
  const [searchQuery, setSearchQuery] = useState("")

  const categories = Object.keys(faqData)

  const filteredItems = searchQuery.trim()
    ? Object.values(faqData)
        .flat()
        .filter((entry) => {
          const q = isAr ? entry.qAr : entry.qEn
          const a = isAr ? entry.aAr : entry.aEn
          const query = searchQuery.toLowerCase()
          return (
            q.toLowerCase().includes(query) || a.toLowerCase().includes(query)
          )
        })
    : faqData[activeTab] || []

  return (
    <>
      <PageHero
        title={t.title}
        subtitle={
          isAr
            ? "ابحث عن إجابات لأسئلتك الأكثر شيوعاً"
            : "Find answers to your most common questions"
        }
      />

      <section className="py-16 lg:py-24 bg-background">
        <div className="mx-auto max-w-4xl px-4">
          {/* Search bar */}
          <FadeUp>
            <div className="relative mb-8">
              <Search className="absolute start-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  isAr ? "ابحث في الأسئلة الشائعة..." : "Search FAQs..."
                }
                className="w-full ps-12 pe-4 py-3.5 rounded-xl border border-border/50 bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-aqua/50 transition-all"
              />
            </div>
          </FadeUp>

          {/* Category tabs */}
          {!searchQuery.trim() && (
            <FadeUp delay={0.1}>
              <div className="flex flex-wrap gap-2 mb-10 justify-center">
                {categories.map((key) => {
                  const Icon = categoryIcons[key]
                  const label = categoryLabels[key]
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                        activeTab === key
                          ? "bg-aqua text-white shadow-md shadow-aqua/20"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {Icon && <Icon className="w-4 h-4" />}
                      {isAr ? label.ar : label.en}
                    </button>
                  )
                })}
              </div>
            </FadeUp>
          )}

          {/* Results count for search */}
          {searchQuery.trim() && (
            <p className="text-sm text-muted-foreground mb-6">
              {isAr
                ? `${filteredItems.length} نتيجة`
                : `${filteredItems.length} result${filteredItems.length !== 1 ? "s" : ""}`}
            </p>
          )}

          {/* FAQ items */}
          <div className="space-y-3">
            {filteredItems.map((item, i) => (
              <FadeUp key={`${activeTab}-${i}-${searchQuery}`} delay={i * 0.03}>
                <FAQItem entry={item} isAr={isAr} />
              </FadeUp>
            ))}

            {filteredItems.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>{isAr ? "لا توجد نتائج" : "No results found"}</p>
              </div>
            )}
          </div>

          {/* Contact CTA */}
          <FadeUp delay={0.2}>
            <div className="mt-16 text-center bg-gradient-to-br from-aqua/5 to-ocean/5 rounded-2xl p-8 border border-aqua/10">
              <h3 className="text-xl font-heading font-bold text-ocean mb-2">
                {isAr
                  ? "لم تجد إجابتك؟"
                  : "Didn't find your answer?"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {isAr
                  ? "تواصل معنا وسنرد عليك في أقرب وقت"
                  : "Contact us and we will get back to you soon"}
              </p>
              <a
                href={`/${content.meta.locale}/contact`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-aqua to-ocean text-white font-heading font-bold rounded-full hover:shadow-lg hover:shadow-aqua/20 transition-all"
              >
                {isAr ? "تواصل معنا" : "Contact Us"}
              </a>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
