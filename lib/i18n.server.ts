export type Locale = "ar" | "en";

export function getDirection(locale: Locale): "rtl" | "ltr" {
  return locale === "ar" ? "rtl" : "ltr";
}

import ar from "@/content/ar.json";
import en from "@/content/en.json";

export function getContent(locale: Locale) {
  return locale === "ar" ? ar : en;
}
