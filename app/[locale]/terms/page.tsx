"use client"

import { useI18n } from "@/lib/i18n.client"

export default function TermsPage() {
  const { locale } = useI18n()
  const isAr = locale === "ar"

  return (
   <section className="pt-28 pb-16 bg-background">
      <div className="mx-auto max-w-4xl px-4 space-y-10 text-sm leading-7">

        {/* Title */}
        <h1 className="text-3xl font-heading font-bold text-aqua">
          {isAr ? "الشروط والأحكام" : "Terms & Conditions"}
        </h1>

        {/* Terms */}
        <div className="space-y-4">
          <p>
            {isAr
              ? "باستخدامك لهذا الموقع فإنك توافق على الشروط والأحكام التالية:"
              : "By using this website, you agree to the following terms and conditions:"}
          </p>

          <ul className="list-disc ps-6 space-y-2">
            <li>{isAr ? "جميع الأسعار المعروضة بالدينار الأردني وتشمل الضريبة إن وجدت." : "All prices are displayed in Jordanian Dinar (JOD) and include applicable taxes if any."}</li>
            <li>{isAr ? "الحجز أو الشراء يتم بعد إتمام عملية الدفع بنجاح." : "Booking or purchasing is confirmed only after successful payment."}</li>
            <li>{isAr ? "إدارة الموقع تحتفظ بحق تعديل الأسعار أو العروض دون إشعار مسبق." : "The website management reserves the right to modify prices or offers without prior notice."}</li>
            <li>{isAr ? "يمنع استخدام الموقع لأي نشاط غير قانوني أو احتيالي." : "The website may not be used for any illegal or fraudulent activity."}</li>
            <li>{isAr ? "جميع المحتويات مملوكة للموقع ولا يجوز نسخها بدون إذن." : "All content (images, texts, logos) is the property of the website and may not be copied or used without permission."}</li>
          </ul>
        </div>

        {/* Privacy */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-sun">
            {isAr ? "سياسة الخصوصية" : "Privacy Policy"}
          </h2>

          <ul className="list-disc ps-6 space-y-2">
            <li>{isAr ? "يتم جمع البيانات فقط لأغراض الحجز أو التواصل." : "Information is collected only for booking and communication purposes."}</li>
            <li>{isAr ? "لا يتم مشاركة المعلومات إلا مع بوابة الدفع." : "Personal data is not shared with any third party except the payment gateway."}</li>
            <li>{isAr ? "جميع بيانات الدفع تتم معالجتها عبر خادم آمن ومشفر." : "All payment information is processed through a secure and encrypted server."}</li>
          </ul>
        </div>

        {/* Refund */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-sun">
            {isAr ? "سياسة الاسترجاع" : "Refund Policy"}
          </h2>

          <ul className="list-disc ps-6 space-y-2">
            <li>{isAr ? "يمكن طلب الاسترجاع خلال 48 ساعة." : "Refund requests can be made within 48 hours from payment."}</li>
            <li>{isAr ? "يتم إعادة المبلغ خلال 7–14 يوم عمل." : "Refunds will be issued within 7–14 business days."}</li>
            <li>{isAr ? "لا يتم الاسترجاع بعد استخدام التذكرة." : "No refund will be issued once the ticket or service has been used."}</li>
            <li>{isAr ? "في حال إلغاء الفعالية يتم إعادة المبلغ كاملًا." : "Full refund in case of cancellation from our side."}</li>
          </ul>
        </div>

        {/* Cancellation */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-sun">
            {isAr ? "سياسة الإلغاء" : "Cancellation Policy"}
          </h2>

          <ul className="list-disc ps-6 space-y-2">
            <li>{isAr ? "يمكن إلغاء الحجز قبل 24 ساعة." : "Bookings can be cancelled up to 24 hours before."}</li>
            <li>{isAr ? "الإلغاء قبل أقل من 24 ساعة غير مسترد." : "Cancellations less than 24 hours are non-refundable."}</li>
            <li>{isAr ? "يحق للإدارة إلغاء الحجز مع إعادة المبلغ كاملًا." : "Management reserves the right to cancel bookings with full refund."}</li>
          </ul>
        </div>

        {/* Delivery */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-sun">
            {isAr ? "سياسة وطريقة التسليم" : "Delivery Policy & Method"}
          </h2>

          <ul className="list-disc ps-6 space-y-2">
            <li>{isAr ? "يتم إرسال التذاكر إلكترونيًا عبر البريد أو الواتساب." : "Tickets are delivered electronically via email or WhatsApp."}</li>
            <li>{isAr ? "لا يوجد شحن مادي." : "No physical shipping is required."}</li>
            <li>{isAr ? "يجب إبراز رقم الحجز عند الدخول." : "The electronic ticket reference must be presented at entrance."}</li>
          </ul>
        </div>

        {/* Payment Security */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-sun">
            {isAr ? "أمان الدفع" : "Payment Security"}
          </h2>

          <p>
            {isAr
              ? "الموقع يستخدم شهادة SSL وتشفير TLS 1.2 أو أعلى."
              : "The website is secured with SSL certificate and TLS 1.2+ encryption."}
          </p>

          {/* Payment Methods Logos */}
          <div className="flex items-center gap-6 pt-4">
            <img
              src="/VISA-logo.png"
              alt="Visa"
              className="h-10 w-auto object-contain"
            />
            <img
              src="/Mastercard-logo.svg"
              alt="Mastercard"
              className="h-10 w-auto object-contain"
            />
          </div>
        </div>

      </div>
    </section>
  )
}