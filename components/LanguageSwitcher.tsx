"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "./LanguageContext";
import { Language } from "@/lib/i18n";
import { Globe, Check, ChevronDown } from "lucide-react";

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const languages: { code: Language; name: string; nativeName: string; flag: string }[] = [
    { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦" },
    { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
    { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
  ];

  const current = languages.find((l) => l.code === lang) || languages[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-amber-500/30 hover:border-amber-400/60 text-amber-100 text-xs font-medium transition-all shadow-[0_0_12px_rgba(212,175,55,0.1)] hover:shadow-[0_0_16px_rgba(212,175,55,0.25)]"
        aria-label="Select Language"
      >
        <Globe className="w-3.5 h-3.5 text-amber-400" />
        <span>{current.flag}</span>
        <span className="font-semibold">{current.nativeName}</span>
        <ChevronDown className={`w-3 h-3 text-amber-400/80 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute end-0 mt-2 w-40 rounded-xl bg-zinc-950/95 border border-amber-500/40 shadow-2xl backdrop-blur-xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="text-[10px] uppercase font-bold text-amber-400/60 px-2 py-1 tracking-wider">
            Select Language
          </div>
          {languages.map((item) => (
            <button
              key={item.code}
              onClick={() => {
                setLang(item.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-all ${
                lang === item.code
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold"
                  : "text-zinc-300 hover:bg-zinc-900 hover:text-amber-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{item.flag}</span>
                <span>{item.nativeName}</span>
              </div>
              {lang === item.code && <Check className="w-3.5 h-3.5 text-amber-400" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
