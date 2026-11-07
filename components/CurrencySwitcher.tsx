"use client";

import React from "react";
import { useLanguage } from "./LanguageContext";
import { Coins } from "lucide-react";

export function CurrencySwitcher() {
  const { currency, setCurrency } = useLanguage();

  return (
    <div className="inline-flex items-center rounded-xl bg-zinc-900/90 border border-white/[0.08] p-1 text-xs font-semibold">
      <button
        type="button"
        onClick={() => setCurrency("USD")}
        className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1 ${
          currency === "USD"
            ? "bg-gradient-to-r from-[#C5A059] to-[#9E7D3B] text-zinc-950 font-bold shadow-sm"
            : "text-zinc-400 hover:text-zinc-200"
        }`}
      >
        <span>($) USD</span>
      </button>
      <button
        type="button"
        onClick={() => setCurrency("EGP")}
        className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1 ${
          currency === "EGP"
            ? "bg-gradient-to-r from-[#C5A059] to-[#9E7D3B] text-zinc-950 font-bold shadow-sm"
            : "text-zinc-400 hover:text-zinc-200"
        }`}
      >
        <span>(ج.م) EGP</span>
      </button>
    </div>
  );
}
