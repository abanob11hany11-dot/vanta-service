"use client";

import React from "react";
import { useLanguage } from "./LanguageContext";
import { Coins } from "lucide-react";

export function CurrencySwitcher() {
  const { currency, setCurrency } = useLanguage();

  return (
    <div className="flex items-center rounded-xl bg-zinc-900/90 border border-amber-500/30 p-0.5 text-xs font-semibold shadow-[0_0_12px_rgba(212,175,55,0.1)]">
      <button
        onClick={() => setCurrency("USD")}
        className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
          currency === "USD"
            ? "bg-gradient-to-r from-[#C5A059] to-[#9E7D3B] text-zinc-950 font-bold shadow-sm"
            : "text-zinc-400 hover:text-amber-200"
        }`}
      >
        <span>USD ($)</span>
      </button>
      <button
        onClick={() => setCurrency("EGP")}
        className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
          currency === "EGP"
            ? "bg-gradient-to-r from-[#C5A059] to-[#9E7D3B] text-zinc-950 font-bold shadow-sm"
            : "text-zinc-400 hover:text-amber-200"
        }`}
      >
        <span>EGP (ج.م)</span>
      </button>
    </div>
  );
}
