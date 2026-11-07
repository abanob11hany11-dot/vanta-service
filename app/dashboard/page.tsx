"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageContext";
import { CurrencySwitcher } from "@/components/CurrencySwitcher";
import {
  Wallet,
  Clock,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Zap,
  ArrowUpRight,
  ShieldAlert,
  FileText,
} from "lucide-react";

export default function DashboardOverviewPage() {
  const { t, formatPrice, currency } = useLanguage();
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [currentUser, setCurrentUser] = useState<{
    username: string;
    email: string;
    balance: number;
    role: string;
  } | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setCurrentUser({
            username: data.user.username,
            email: data.user.email,
            balance: data.user.balance,
            role: data.user.role,
          });
        }
      })
      .catch(() => {});
  }, []);

  const stats = {
    balanceUsd: currentUser ? currentUser.balance : 0.0,
    pendingOrders: 0,
    completedOrders: 5,
    totalSpentUsd: 25.0,
  };

  const recentOrders = [
    {
      id: 1025,
      service: "فحص شبكة وضمان أبل الرسمي (GSX Check)",
      inputs: "IMEI: 358729103847291",
      priceUsd: 1.5,
      status: "pending",
      date: "منذ 10 دقائق",
      result: null,
    },
    {
      id: 1024,
      service: "تخطي حساب جوجل سامسونج فوري (جميع الموديلات)",
      inputs: "IMEI: 354892019485721",
      priceUsd: 12.0,
      status: "completed",
      date: "اليوم 04:30 م",
      result: "SUCCESS: Token 98AF-E320-994A",
    },
    {
      id: 1021,
      service: "شحن ببجي 660 شدة (UC) فوري",
      inputs: "Player ID: 512948194",
      priceUsd: 8.5,
      status: "completed",
      date: "أمس 08:15 م",
      result: "RECHARGE SUCCESSFUL TXN#892147",
    },
  ];

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Welcome & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block">
            لوحة تحكم العميل
          </span>
          <h1 className="text-3xl font-black text-white">
            {t.dashboard.welcome}، {currentUser?.username || "عزيزنا العميل"} 👋
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/services"
            className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-amber-500/30 hover:border-amber-400 text-amber-300 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>طلب خدمة جديدة</span>
          </Link>
          <Link
            href="/dashboard/top-up"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 text-xs font-black shadow-lg hover:brightness-110 transition-all flex items-center gap-1.5"
          >
            <Wallet className="w-3.5 h-3.5" />
            <span>شحن الرصيد</span>
          </Link>
        </div>
      </div>

      {/* Profile & Currency Preference Section */}
      <div className="p-6 rounded-2xl bg-zinc-950 border border-amber-500/25 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center text-zinc-950 font-black text-lg shadow-md shrink-0">
            {currentUser?.username?.charAt(0).toUpperCase() || "U"}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">{currentUser?.username || "حساب العميل"}</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold">
                {currentUser?.role === "admin" ? "مدير النظام (Owner)" : "حساب معتمد (Reseller)"}
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-1 font-mono">{currentUser?.email || "البريد الإلكتروني مسجل"}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-zinc-900/80 border border-zinc-800 p-3.5 rounded-2xl">
          <div className="text-xs">
            <span className="text-zinc-200 font-bold block">عملة عرض الأسعار المفضلة:</span>
            <span className="text-zinc-500 text-[11px]">الافتراضية المعتمدة هي الدولار ($ USD)</span>
          </div>
          <CurrencySwitcher />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Balance Card */}
        <div className="relative p-6 rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-950 border border-amber-500/40 shadow-[0_0_25px_rgba(212,175,55,0.15)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-400">
              {t.dashboard.balanceTitle}
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div className="my-4">
            <span className="text-3xl font-black text-amber-300">
              {formatPrice(stats.balanceUsd)}
            </span>
          </div>
          <div className="pt-2 border-t border-zinc-900 flex items-center justify-between text-xs">
            <span className="text-zinc-500">تحويل العملة:</span>
            <CurrencySwitcher />
          </div>
        </div>

        {/* Pending Orders */}
        <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-400">طلبات قيد التنفيذ</span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="my-4 text-3xl font-black text-white">
            {stats.pendingOrders}
          </div>
          <div className="text-xs text-amber-400/80">جارٍ المعالجة بالسيرفر الخارجي</div>
        </div>

        {/* Completed Orders */}
        <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-400">طلبات مكتملة بنجاح</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="my-4 text-3xl font-black text-white">
            {stats.completedOrders}
          </div>
          <div className="text-xs text-emerald-400">نسبة نجاح 100%</div>
        </div>

        {/* Total Spent */}
        <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-400">إجمالي المشتريات</span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
          <div className="my-4 text-3xl font-black text-white">
            {formatPrice(stats.totalSpentUsd)}
          </div>
          <div className="text-xs text-zinc-500">منذ فتح الحساب</div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="rounded-2xl bg-zinc-950 border border-amber-500/20 p-6 space-y-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-400" />
            <span>{t.dashboard.recentOrders}</span>
          </h2>
          <Link
            href="/dashboard/orders"
            className="text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
          >
            عرض كافة الطلبات
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400 text-[11px] uppercase tracking-wider">
                <th className="py-3 px-3 text-start">{t.dashboard.orderId}</th>
                <th className="py-3 px-3 text-start">{t.dashboard.serviceName}</th>
                <th className="py-3 px-3 text-start">المدخلات</th>
                <th className="py-3 px-3 text-start">المبلغ</th>
                <th className="py-3 px-3 text-start">{t.dashboard.status}</th>
                <th className="py-3 px-3 text-start">{t.dashboard.result}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900">
              {recentOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-zinc-900/50 transition-colors">
                  <td className="py-3.5 px-3 font-mono font-bold text-amber-400">
                    #{ord.id}
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-zinc-200">
                    {ord.service}
                  </td>
                  <td className="py-3.5 px-3 font-mono text-zinc-400">
                    {ord.inputs}
                  </td>
                  <td className="py-3.5 px-3 font-bold text-amber-300">
                    {formatPrice(ord.priceUsd)}
                  </td>
                  <td className="py-3.5 px-3">
                    {ord.status === "completed" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-[10px]">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>مكتمل</span>
                      </span>
                    )}
                    {ord.status === "pending" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-[10px]">
                        <Clock className="w-3 h-3 animate-spin" />
                        <span>قيد الانتظار</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-3">
                    {ord.result ? (
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-emerald-300 bg-emerald-950/40 px-2 py-1 rounded border border-emerald-500/20 max-w-[200px] truncate">
                          {ord.result}
                        </span>
                        <button
                          onClick={() => copyToClipboard(ord.result!, ord.id)}
                          className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-amber-300 transition-colors"
                          title={t.dashboard.copyCode}
                        >
                          {copiedId === ord.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    ) : (
                      <span className="text-zinc-600 font-mono">- قيد الفحص -</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
