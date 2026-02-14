"use client"

import { useState } from "react"
import { useI18n } from "@/lib/i18n.client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2 } from "lucide-react"

export function BookingForm() {
  const { content } = useI18n()
  const t = content.bookingForm
  const [companionPhones, setCompanionPhones] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)

  const addPhone = () => setCompanionPhones([...companionPhones, ""])
  const removePhone = (i: number) => setCompanionPhones(companionPhones.filter((_, idx) => idx !== i))
  const updatePhone = (i: number, val: string) => {
    const copy = [...companionPhones]
    copy[i] = val
    setCompanionPhones(copy)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="rounded-xl bg-aqua/10 p-8 text-center">
        <div className="text-4xl mb-4">&#10003;</div>
        <p className="text-lg font-semibold text-ocean">
          {content.meta.locale === "ar" ? "تم إرسال طلبك بنجاح!" : "Your request has been submitted!"}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Full Name */}
      <div className="space-y-1.5">
        <Label htmlFor="fullName">{t.fullName} *</Label>
        <Input id="fullName" required placeholder={t.fullName} />
      </div>

      {/* Phone */}
      <div className="space-y-1.5">
        <Label htmlFor="phone">{t.phone} *</Label>
        <div className="flex gap-2">
          <span className="flex items-center px-3 rounded-lg bg-muted text-sm text-muted-foreground">+962</span>
          <Input id="phone" required type="tel" pattern="[0-9]{9,}" placeholder="7XXXXXXXX" className="flex-1" />
        </div>
      </div>

      {/* Visit Date */}
      <div className="space-y-1.5">
        <Label htmlFor="visitDate">{t.visitDate} *</Label>
        <Input
          id="visitDate"
          required
          type="date"
          min={new Date().toISOString().split("T")[0]}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Number of Kids */}
        <div className="space-y-1.5">
          <Label htmlFor="numKids">{t.numKids} *</Label>
          <Input id="numKids" required type="number" min="0" placeholder="0" />
        </div>

        {/* Kids Ages */}
        <div className="space-y-1.5">
          <Label htmlFor="kidsAges">{t.kidsAges} *</Label>
          <Input id="kidsAges" required placeholder="3, 5, 8" />
        </div>

        {/* Number of Adults */}
        <div className="space-y-1.5">
          <Label htmlFor="numAdults">{t.numAdults} *</Label>
          <Input id="numAdults" required type="number" min="1" placeholder="1" />
        </div>

        {/* Adults Ages */}
        <div className="space-y-1.5">
          <Label htmlFor="adultsAges">{t.adultsAges} *</Label>
          <Input id="adultsAges" required placeholder="28, 32" />
        </div>
      </div>

      {/* Companion Phones */}
      <div className="space-y-2">
        <Label>{t.companionPhones}</Label>
        {companionPhones.map((phone, i) => (
          <div key={i} className="flex gap-2">
            <span className="flex items-center px-3 rounded-lg bg-muted text-sm text-muted-foreground">+962</span>
            <Input
              type="tel"
              value={phone}
              onChange={(e) => updatePhone(i, e.target.value)}
              placeholder="7XXXXXXXX"
              className="flex-1"
            />
            <Button type="button" variant="ghost" size="icon" onClick={() => removePhone(i)} className="text-destructive">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={addPhone} className="gap-1.5">
          <Plus className="w-4 h-4" />
          {t.addPhone}
        </Button>
      </div>

      {/* Notes */}
      <div className="space-y-1.5">
        <Label htmlFor="notes">{t.notes}</Label>
        <textarea
          id="notes"
          rows={3}
          className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          placeholder={t.notes}
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-aqua to-ocean text-white font-heading font-bold text-base py-6 hover:shadow-lg hover:shadow-aqua/20 transition-all"
      >
        {t.submit}
      </Button>
    </form>
  )
}
