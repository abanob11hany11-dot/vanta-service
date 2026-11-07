"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageContext";
import { Logo } from "@/components/Logo";
import { User, Mail, Phone, Lock, KeyRound, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<"form" | "otp">("form");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError("يرجى ملء كافة الحقول الأساسية");
      return;
    }
    setLoading(true);
    setError(null);
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
    }, 700);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) {
      setError("رمز التأكيد غير مكتمل");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 700);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="relative w-full max-w-md rounded-3xl bg-zinc-950 border border-amber-500/30 p-8 shadow-[0_0_50px_rgba(212,175,55,0.15)] text-zinc-100 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600" />

        <div className="text-center mb-8 space-y-2">
          <div className="inline-block">
            <Logo size="md" />
          </div>
          <h2 className="text-2xl font-black text-white">
            {step === "form" ? "إنشاء حساب فني جديد" : "تفعيل الحساب بكود OTP"}
          </h2>
          <p className="text-xs text-zinc-400">
            {step === "form"
              ? "سجل حسابك لتتمكن من شحن الرصيد وطلب أدوات السوفت وير"
              : `أدخل الكود المكون من 6 أرقام المرسل إلى بريدك: ${email}`}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">
            {error}
          </div>
        )}

        {step === "form" ? (
          <form onSubmit={handleRegister} className="space-y-4 text-xs">
            <div>
              <label className="block text-zinc-300 font-bold mb-1">اسم المستخدم الفريد *</label>
              <div className="relative">
                <User className="w-4 h-4 text-amber-400 absolute start-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="technician_bebo"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl ps-9 pe-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-zinc-300 font-bold mb-1">البريد الإلكتروني *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-amber-400 absolute start-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl ps-9 pe-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-zinc-300 font-bold mb-1">رقم الهاتف / الواتساب</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-amber-400 absolute start-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+20 10XXXXXXXX"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl ps-9 pe-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-zinc-300 font-bold mb-1">كلمة المرور القوية *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-amber-400 absolute start-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl ps-9 pe-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-zinc-950 font-black text-sm shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{loading ? "جارٍ إرسال كود التفعيل..." : "المتابعة وتأكيد البريد"}</span>
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4 text-xs">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center text-xs text-amber-200">
              تم إرسال كود تجريبي (استخدم: <strong className="text-amber-400 font-mono">123456</strong> للتجربة)
            </div>

            <div>
              <label className="block text-zinc-300 font-bold mb-1 text-center">
                رمز التحقق (6 أرقام)
              </label>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                placeholder="123456"
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl py-3 text-center text-2xl font-mono tracking-[0.5em] text-amber-300 focus:border-amber-400 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 font-black text-sm shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{loading ? "جارٍ التفعيل..." : "تفعيل الحساب والدخول"}</span>
            </button>

            <button
              type="button"
              onClick={() => setStep("form")}
              className="w-full text-center text-xs text-zinc-400 hover:text-zinc-200 mt-2"
            >
              العودة لتعديل البيانات
            </button>
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-zinc-900 text-center text-xs text-zinc-400">
          لديك حساب بالفعل؟{" "}
          <Link href="/login" className="font-bold text-amber-400 hover:text-amber-300">
            تسجيل الدخول
          </Link>
        </div>
      </div>
    </div>
  );
}
