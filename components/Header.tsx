"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "./LanguageContext";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Wallet, Menu, X, Shield, User, LogOut, ArrowRight, ArrowLeft } from "lucide-react";

export function Header() {
  const { t, dir } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ username: string; balance: number; role: string } | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setUser({
            username: data.user.username,
            balance: data.user.balance,
            role: data.user.role,
          });
        }
      })
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    window.location.href = "/";
  };

  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#08080C]/90 border-b border-white/[0.06] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Logo size="md" />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold">
          <Link
            href="/"
            className="text-zinc-300 hover:text-[#C5A059] transition-colors"
          >
            {t.nav.home}
          </Link>
          <Link
            href="/services"
            className="text-zinc-300 hover:text-[#C5A059] transition-colors"
          >
            {t.nav.services}
          </Link>
          <Link
            href="/about"
            className="text-zinc-300 hover:text-[#C5A059] transition-colors"
          >
            حول
          </Link>
          {user?.role === "admin" && (
            <Link
              href="/admin"
              className="px-2.5 py-1 rounded-lg bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#DFCA9B] text-xs font-bold hover:bg-[#C5A059]/20 transition-all flex items-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>لوحة الإدارة</span>
            </Link>
          )}
        </nav>

        {/* Right Action Bar */}
        <div className="hidden lg:flex items-center gap-3">
          <LanguageSwitcher />

          {user ? (
            <div className="flex items-center gap-3 ps-2 border-s border-zinc-800">
              <Link
                href="/dashboard/top-up"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-[#C5A059]/30 hover:border-[#C5A059] text-[#DFCA9B] text-xs font-bold transition-all"
              >
                <Wallet className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>${user.balance.toFixed(2)}</span>
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 text-xs text-zinc-300 hover:text-[#C5A059] font-medium"
              >
                <User className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{user.username}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-zinc-900 transition-colors"
                title="تسجيل الخروج"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 ps-2 border-s border-zinc-800">
              <Link
                href="/login"
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-zinc-300 hover:text-[#C5A059] transition-colors"
              >
                {t.nav.login}
              </Link>
              <Link
                href="/register"
                className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#9E7D3B] text-zinc-950 text-xs font-bold shadow-sm hover:brightness-105 transition-all"
              >
                {t.nav.register}
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 hover:text-amber-400 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-800 bg-[#08080C]/95 backdrop-blur-2xl px-4 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
            {user ? (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#C5A059]" />
                  <span className="text-xs font-bold text-zinc-200">{user.username}</span>
                </div>
                <div className="text-xs font-bold text-[#DFCA9B] flex items-center gap-1">
                  <Wallet className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>${user.balance.toFixed(2)}</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 w-full">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-bold text-zinc-200 hover:text-[#C5A059]"
                >
                  {t.nav.login}
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#9E7D3B] text-zinc-950 text-xs font-bold shadow-sm"
                >
                  {t.nav.register}
                </Link>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 text-sm font-semibold">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-zinc-200 hover:bg-zinc-900 hover:text-[#C5A059] transition-colors"
            >
              {t.nav.home}
            </Link>
            <Link
              href="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-zinc-200 hover:bg-zinc-900 hover:text-[#C5A059] transition-colors"
            >
              {t.nav.services}
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-zinc-200 hover:bg-zinc-900 hover:text-[#C5A059] transition-colors"
            >
              حول
            </Link>
            {user && (
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-zinc-200 hover:bg-zinc-900 hover:text-[#C5A059] transition-colors"
              >
                {t.nav.dashboard}
              </Link>
            )}
            {user?.role === "admin" && (
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-[#DFCA9B] bg-[#C5A059]/10 border border-[#C5A059]/30 font-bold flex items-center gap-2"
              >
                <Shield className="w-4 h-4 text-[#C5A059]" />
                <span>لوحة الإدارة</span>
              </Link>
            )}
            {user && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="px-3 py-2 rounded-lg text-start text-xs font-bold text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 mt-2 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>تسجيل الخروج</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
