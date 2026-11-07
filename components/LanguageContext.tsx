"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, translations, Translations } from "@/lib/i18n";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
  dir: "rtl" | "ltr";
  currency: "USD" | "EGP";
  setCurrency: (c: "USD" | "EGP") => void;
  exchangeRate: number;
  formatPrice: (priceUsd: number) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("ar");
  const [currency, setCurrencyState] = useState<"USD" | "EGP">("USD");
  const [exchangeRate, setExchangeRate] = useState<number>(50.0);

  useEffect(() => {
    // Read persisted language preference from localStorage
    const savedLang = localStorage.getItem("vanta_lang") as Language;
    if (savedLang && (savedLang === "ar" || savedLang === "en" || savedLang === "fr")) {
      setLangState(savedLang);
    }
    const savedCurr = localStorage.getItem("vanta_currency") as "USD" | "EGP";
    if (savedCurr && (savedCurr === "USD" || savedCurr === "EGP")) {
      setCurrencyState(savedCurr);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("vanta_lang", newLang);
    if (typeof document !== "undefined") {
      document.documentElement.lang = newLang;
      document.documentElement.dir = translations[newLang].dir;
    }
  };

  const setCurrency = (newCurr: "USD" | "EGP") => {
    setCurrencyState(newCurr);
    localStorage.setItem("vanta_currency", newCurr);
  };

  const currentT = translations[lang] || translations.ar;
  const currentDir = currentT.dir;

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = currentDir;
    }
  }, [lang, currentDir]);

  const formatPrice = (priceUsd: number) => {
    if (currency === "EGP") {
      const egp = (priceUsd * exchangeRate).toFixed(0);
      return `${egp} ج.م`;
    }
    return `$${Number(priceUsd).toFixed(2)}`;
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        t: currentT,
        dir: currentDir,
        currency,
        setCurrency,
        exchangeRate,
        formatPrice,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
