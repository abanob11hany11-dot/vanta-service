"use client";

import React from "react";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function Logo({ size = "md", showText = true }: LogoProps) {
  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl",
  };

  return (
    <Link href="/" className="flex items-center gap-3 group select-none">
      <div className={`relative ${iconSizes[size]} transition-transform duration-300 group-hover:scale-105`}>
        {/* Glowing backdrop halo */}
        <div className="absolute inset-0 bg-amber-500/25 blur-lg rounded-full group-hover:bg-amber-400/40 transition-colors" />

        <svg
          viewBox="0 0 100 100"
          className="w-full h-full relative z-10 drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="vantaGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EDE0C8" />
              <stop offset="50%" stopColor="#C5A059" />
              <stop offset="100%" stopColor="#9E7D3B" />
            </linearGradient>
            <linearGradient id="vantaDarkMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1C1A14" />
              <stop offset="50%" stopColor="#0F0E0A" />
              <stop offset="100%" stopColor="#080705" />
            </linearGradient>
            <linearGradient id="goldStroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E2D4BB" />
              <stop offset="100%" stopColor="#B38D42" />
            </linearGradient>
          </defs>

          {/* Hexagonal Shield Outline */}
          <polygon
            points="50,4 92,26 92,74 50,96 8,74 8,26"
            fill="url(#vantaDarkMetallic)"
            stroke="url(#vantaGoldGrad)"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Inner Accent Ring */}
          <polygon
            points="50,14 83,31 83,69 50,86 17,69 17,31"
            fill="none"
            stroke="url(#vantaGoldGrad)"
            strokeWidth="1.2"
            strokeOpacity="0.5"
            strokeDasharray="4 2"
          />

          {/* Stylized Monogram 'V' with Cyber Unlock Cuts */}
          <path
            d="M26 30 L50 78 L74 30 L62 30 L50 56 L38 30 Z"
            fill="url(#vantaGoldGrad)"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))"
          />

          {/* Central Glowing Sparkle */}
          <circle cx="50" cy="38" r="3.5" fill="#FFFBE6" className="animate-pulse" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black tracking-wider uppercase bg-gradient-to-r from-[#EDE0C8] via-[#C5A059] to-[#9E7D3B] bg-clip-text text-transparent ${textSizes[size]}`}
            >
              VANTA
            </span>
          </div>
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#C5A059]/90 -mt-0.5">
            SERVICES
          </span>
        </div>
      )}
    </Link>
  );
}
