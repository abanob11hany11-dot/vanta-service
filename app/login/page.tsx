"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageContext";
import { Logo } from "@/components/Logo";
import { Lock, Mail, ShieldCheck, ArrowRight, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const { t, dir } = useLanguage();
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) {
      setError("يرجى ملء جميع الحقول");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "فشل تسجيل الدخول، تأكد من البيانات");
        setLoading(false);
        return;
      }
      window.location.href = "/dashboard";
    } catch {
      setError("تعذر الاتصال بالسيرفر، يرجى المحاولة لاحقاً");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="relative w-full max-w-md rounded-3xl bg-zinc-950/90 border border-white/[0.08] p-8 shadow-2xl text-zinc-100 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />

        <div className="text-center mb-8 space-y-3">
          <div className="inline-block">
            <Logo size="md" />
          </div>
          <h2 className="text-2xl font-black text-white">تسجيل الدخول للمنصة</h2>
          <p className="text-xs text-zinc-400">
            أدخل بيانات حسابك للوصول إلى لوحة التحكم والرصيد
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-zinc-300 font-bold mb-1">
              البريد الإلكتروني أو اسم المستخدم
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#C5A059] absolute start-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="client@vanta-services.com"
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl ps-9 pe-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-[#C5A059] focus:outline-none transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-zinc-300 font-bold">كلمة المرور</label>
              <Link href="#" className="text-[#DFCA9B] hover:text-[#C5A059] text-[11px] transition-colors">
                نسيت كلمة المرور؟
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#C5A059] absolute start-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl ps-9 pe-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-[#C5A059] focus:outline-none transition-colors"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#9E7D3B] text-zinc-950 font-bold text-sm shadow-md hover:brightness-105 transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{loading ? "جارٍ التحقق..." : "تسجيل الدخول"}</span>
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-zinc-900 text-center text-xs text-zinc-400">
          ليس لديك حساب بعد؟{" "}
          <Link href="/register" className="font-bold text-[#DFCA9B] hover:text-[#C5A059] transition-colors">
            إنشاء حساب جديد
          </Link>
        </div>
      </div>
    </div>
  );
}
