"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/components/LanguageContext";
import {
  Wallet,
  Smartphone,
  CreditCard,
  QrCode,
  Clock,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ShieldCheck,
  Upload,
} from "lucide-react";

type Method = "vodafone" | "instapay" | "binance";

export default function TopUpPage() {
  const { t, formatPrice, currency } = useLanguage();
  const [activeMethod, setActiveMethod] = useState<Method>("vodafone");
  const [amount, setAmount] = useState<string>("500");
  const [senderPhone, setSenderPhone] = useState<string>("");
  const [instapayUser, setInstapayUser] = useState<string>("");
  const [binanceOrderId, setBinanceOrderId] = useState<string>("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Countdown timer for Vodafone Cash session
  const [timer, setTimer] = useState<number>(600); // 10 minutes
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessNotice(t.topUp.successNotice);
      setTimer(600);
    }, 1200);
  };

  const topUpHistory = [
    {
      id: 801,
      method: "باينانس باي (USDT)",
      amount: "$50.00",
      status: "approved",
      date: "منذ 24 ساعة",
    },
    {
      id: 795,
      method: "فودافون كاش",
      amount: "500 ج.م",
      status: "approved",
      date: "منذ 3 أيام",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div>
        <span className="text-xs text-[#C5A059] font-bold uppercase tracking-wider block">
          محفظة Vanta الرقمية
        </span>
        <h1 className="text-3xl font-black text-white">
          {t.topUp.title}
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          {t.topUp.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Interactive Payment Gateways */}
        <div className="lg:col-span-2 space-y-6">
          {/* Method Selection Tabs */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setActiveMethod("vodafone")}
              className={`p-4 rounded-2xl border text-start transition-all flex flex-col justify-between ${
                activeMethod === "vodafone"
                  ? "bg-[#C5A059]/10 border-[#C5A059] text-[#DFCA9B] shadow-sm"
                  : "bg-zinc-950/80 border-white/[0.08] text-zinc-400 hover:border-[#C5A059]/40 hover:text-zinc-200"
              }`}
            >
              <Smartphone className="w-5 h-5 text-red-500 mb-2" />
              <div className="text-xs font-bold">{t.topUp.vodafone}</div>
              <div className="text-[10px] text-zinc-500 mt-1">جنيه مصري (EGP)</div>
            </button>

            <button
              onClick={() => setActiveMethod("instapay")}
              className={`p-4 rounded-2xl border text-start transition-all flex flex-col justify-between ${
                activeMethod === "instapay"
                  ? "bg-[#C5A059]/10 border-[#C5A059] text-[#DFCA9B] shadow-sm"
                  : "bg-zinc-950/80 border-white/[0.08] text-zinc-400 hover:border-[#C5A059]/40 hover:text-zinc-200"
              }`}
            >
              <CreditCard className="w-5 h-5 text-indigo-400 mb-2" />
              <div className="text-xs font-bold">{t.topUp.instapay}</div>
              <div className="text-[10px] text-zinc-500 mt-1">دفع بنكي فوري</div>
            </button>

            <button
              onClick={() => setActiveMethod("binance")}
              className={`p-4 rounded-2xl border text-start transition-all flex flex-col justify-between ${
                activeMethod === "binance"
                  ? "bg-[#C5A059]/10 border-[#C5A059] text-[#DFCA9B] shadow-sm"
                  : "bg-zinc-950/80 border-white/[0.08] text-zinc-400 hover:border-[#C5A059]/40 hover:text-zinc-200"
              }`}
            >
              <Wallet className="w-5 h-5 text-[#C5A059] mb-2" />
              <div className="text-xs font-bold">{t.topUp.binance}</div>
              <div className="text-[10px] text-zinc-500 mt-1">دولار رقمي (USDT)</div>
            </button>
          </div>

          {/* Gateway Card Form */}
          <div className="rounded-2xl bg-zinc-950 border border-white/[0.08] p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />

            {successNotice && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                <span>{successNotice}</span>
              </div>
            )}

            {/* VODAFONE CASH TAB */}
            {activeMethod === "vodafone" && (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/30 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-red-300 block">رقم فودافون كاش المعتمد للتحويل:</span>
                    <span className="text-lg font-mono font-black text-white tracking-widest">
                      01012345678
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyText("01012345678", "vf_phone")}
                    className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs font-bold text-[#DFCA9B] hover:bg-zinc-800 transition-colors flex items-center gap-1"
                  >
                    {copiedKey === "vf_phone" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === "vf_phone" ? "تم النسخ" : "نسخ الرقم"}</span>
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs">
                  <span className="text-zinc-400 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#C5A059]" />
                    <span>{t.topUp.timerRemaining}</span>
                  </span>
                  <span className="font-mono font-bold text-[#DFCA9B] text-sm">
                    {formatTimer(timer)}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-200 mb-1">
                      {t.topUp.amountLabel} (بالجنيه المصري EGP) *
                    </label>
                    <input
                      type="number"
                      min="50"
                      max="30000"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="500"
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:border-[#C5A059] focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-200 mb-1">
                      {t.topUp.senderPhone} *
                    </label>
                    <input
                      type="text"
                      maxLength={11}
                      value={senderPhone}
                      onChange={(e) => setSenderPhone(e.target.value.replace(/\D/g, ""))}
                      placeholder="010XXXXXXXX"
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:border-[#C5A059] focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <p className="text-[11px] text-zinc-500">
                  بمجرد تحويل المبلغ من محفظتك إلى الرقم أعلاه والضغط على تأكيد، يقوم النظام الآلي بمطابقة رسالة الـ SMS وإيداع الرصيد لحظياً دون تدخل بشري.
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#9E7D3B] text-zinc-950 font-bold text-sm shadow-md hover:brightness-105 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? "جارٍ التحقق من التحويل..." : t.topUp.submitRequest}
                </button>
              </form>
            )}

            {/* INSTAPAY TAB */}
            {activeMethod === "instapay" && (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/30 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-indigo-300 block">معرف حساب إنستا باي الرسمي:</span>
                    <span className="text-base font-mono font-black text-white">
                      vanta@instapay
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyText("vanta@instapay", "insta_user")}
                    className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs font-bold text-[#DFCA9B] hover:bg-zinc-800 transition-colors flex items-center gap-1"
                  >
                    {copiedKey === "insta_user" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === "insta_user" ? "تم النسخ" : "نسخ المعرف"}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-200 mb-1">
                      المبلغ المحول (EGP) *
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="1000"
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:border-[#C5A059] focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-200 mb-1">
                      {t.topUp.instapayUser} *
                    </label>
                    <input
                      type="text"
                      value={instapayUser}
                      onChange={(e) => setInstapayUser(e.target.value)}
                      placeholder="username@instapay"
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:border-[#C5A059] focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-200 mb-1">
                    صورة إيصال التحويل (اختياري لتسريع الاعتماد)
                  </label>
                  <div className="border-2 border-dashed border-zinc-700 hover:border-[#C5A059]/50 rounded-xl p-4 text-center cursor-pointer bg-zinc-900/40 transition-colors">
                    <Upload className="w-6 h-6 text-[#C5A059] mx-auto mb-1" />
                    <span className="text-xs text-zinc-400">انقر لرفع لقطة الشاشة أو الإيصال</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#9E7D3B] text-zinc-950 font-bold text-sm shadow-md hover:brightness-105 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? "جارٍ إرسال الطلب..." : t.topUp.submitRequest}
                </button>
              </form>
            )}

            {/* BINANCE PAY TAB */}
            {activeMethod === "binance" && (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="p-4 rounded-xl bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#DFCA9B] block">Binance Pay ID التاجر المعتمد:</span>
                    <span className="text-lg font-mono font-black text-white">
                      894123567
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyText("894123567", "binance_id")}
                    className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs font-bold text-[#DFCA9B] hover:bg-zinc-800 transition-colors flex items-center gap-1"
                  >
                    {copiedKey === "binance_id" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === "binance_id" ? "تم النسخ" : "نسخ الـ ID"}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-200 mb-1">
                      المبلغ المحول بالدولار (USDT) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="50.00"
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:border-[#C5A059] focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-200 mb-1">
                      {t.topUp.binanceOrderId} *
                    </label>
                    <input
                      type="text"
                      value={binanceOrderId}
                      onChange={(e) => setBinanceOrderId(e.target.value)}
                      placeholder="2819401827401928"
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:border-[#C5A059] focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <p className="text-[11px] text-zinc-500">
                  فحص فوري تلقائي عبر Binance API: يرجى كتابة الـ Order ID الخاص بعملية الدفع بدقة ليتم التحقق وإضافة الرصيد فورياً دون انتظار.
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#9E7D3B] text-zinc-950 font-bold text-sm shadow-md hover:brightness-105 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? "جارٍ التحقق من Binance..." : t.topUp.submitRequest}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right 1 Col: Top-Up History & Security Info */}
        <div className="space-y-6">
          <div className="rounded-2xl bg-zinc-950 border border-white/[0.08] p-6 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C5A059]" />
              <span>سجل عمليات الشحن الأخيرة</span>
            </h3>

            <div className="space-y-3">
              {topUpHistory.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-zinc-200 block">{item.method}</span>
                    <span className="text-[10px] text-zinc-500 font-mono">#{item.id} • {item.date}</span>
                  </div>
                  <div className="text-end">
                    <span className="font-mono font-bold text-[#DFCA9B] block">{item.amount}</span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" />
                      مكتمل
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-[#C5A059]/5 border border-[#C5A059]/20 p-5 space-y-3">
            <div className="flex items-center gap-2 text-[#DFCA9B] text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
              <span>أمان وحماية المعاملات 100%</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              جميع المعاملات المالية مسجلة بنظام الحماية ضد الإنفاق المزدوج ومربوطة بأرصدة مشفرة تضمن وصول المبلغ لمحفظتك بدقة وسرعة متناهية.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
