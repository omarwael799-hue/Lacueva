"use client";

import React, { createContext, useContext, useMemo } from "react";
import type { Locale } from "@/lib/i18n.server";
import { getContent } from "@/lib/i18n.server";

const I18nCtx = createContext<{ locale: Locale; content: any } | null>(null);

export function I18nProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const content = useMemo(() => getContent(locale), [locale]);
  return <I18nCtx.Provider value={{ locale, content }}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
