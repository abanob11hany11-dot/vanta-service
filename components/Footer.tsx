"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "./LanguageContext";
import { Logo } from "./Logo";
import { Send, MessageCircle, ShieldCheck, Zap, Lock } from "lucide-react";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative bg-[#070709] border-t border-white/[0.06] text-zinc-400 overflow-hidden">
      {/* Ambient background gold glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[#C5A059]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Col 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Logo size="md" />
            <p className="text-xs text-zinc-400 leading-relaxed">
              {t.footer.desc}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-zinc-900 border border-white/[0.08] flex items-center justify-center text-[#DFCA9B] hover:bg-[#C5A059] hover:text-zinc-950 transition-all shadow-sm"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-zinc-900 border border-white/[0.08] flex items-center justify-center text-emerald-400 hover:bg-emerald-500 hover:text-zinc-950 transition-all shadow-sm"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Services Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#DFCA9B]">
              {t.categoriesSection.title}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/services" className="hover:text-[#C5A059] transition-colors">
                  تخطي حماية جوجل (FRP)
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#C5A059] transition-colors">
                  تفعيل واشتراكات البوكسات (UnlockTool / Chimera)
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#C5A059] transition-colors">
                  فحص السيريال الرسمي (GSX Apple Check)
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#C5A059] transition-colors">
                  شحن الألعاب الفوري (PUBG / Free Fire)
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#C5A059] transition-colors">
                  تأجير أدوات السوفت وير عن بعد
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#DFCA9B]">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/dashboard" className="hover:text-[#C5A059] transition-colors">
                  {t.nav.dashboard}
                </Link>
              </li>
              <li>
                <Link href="/dashboard/orders" className="hover:text-[#C5A059] transition-colors">
                  {t.nav.orders}
                </Link>
              </li>
              <li>
                <Link href="/dashboard/top-up" className="hover:text-[#C5A059] transition-colors">
                  {t.nav.topUp}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#C5A059] transition-colors">
                  {t.footer.terms}
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-[#C5A059] transition-colors">
                  {t.footer.disclaimer}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Security Badges */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#DFCA9B]">
              الأمان والضمان
            </h4>
            <div className="space-y-2.5 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>ضمان استرداد الرصيد التلقائي للطلبات المرفوضة</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>معاملات مشفرة 100% وبوابات دفع معتمدة</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>خوادم سحابية فائقة السرعة بمعالجة فورية</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>{t.footer.copyright}</p>
          <div className="flex items-center gap-2">
            <span className="text-zinc-500">Developed</span>
            <span className="text-[#DFCA9B] font-bold tracking-wider">By Bebo</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
