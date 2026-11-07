"use client";

import React, { useState } from "react";
import { useLanguage } from "@/components/LanguageContext";
import {
  Shield,
  Users,
  ShoppingBag,
  Clock,
  Wallet,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Settings,
  Layers,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  AlertTriangle,
} from "lucide-react";

type Tab = "orders" | "topups" | "services" | "users" | "settings";

export default function AdminPanelPage() {
  const { t, formatPrice } = useLanguage();
  const [activeTab, setActiveTab] = useState<Tab>("orders");
  const [exchangeRate, setExchangeRate] = useState<string>("50.00");
  const [dhruSyncing, setDhruSyncing] = useState<boolean>(false);
  const [syncNotice, setSyncNotice] = useState<string | null>(null);

  // Sample Admin Orders
  const [orders, setOrders] = useState([
    {
      id: 1025,
      user: "Bebo (client@vanta-services.com)",
      service: "فحص شبكة وضمان أبل الرسمي (GSX Check)",
      inputs: "IMEI: 358729103847291",
      price: 1.5,
      status: "pending",
      resultInput: "",
    },
    {
      id: 1024,
      user: "Ahmed (ahmed@gsm.com)",
      service: "تخطي حساب جوجل سامسونج فوري",
      inputs: "IMEI: 354892019485721",
      price: 12.0,
      status: "completed",
      resultInput: "Token: 98AF-E320-994A",
    },
  ]);

  // Sample Admin Top-ups
  const [topups, setTopups] = useState([
    {
      id: 802,
      user: "Mohamed (mohamed@gsm.com)",
      method: "إنستا باي (InstaPay)",
      amount: "1,000 ج.م",
      sender: "mohamed@instapay",
      status: "pending",
    },
    {
      id: 801,
      user: "Bebo (client@vanta-services.com)",
      method: "باينانس باي (USDT)",
      amount: "$50.00",
      sender: "BINANCE-ORDER-827419",
      status: "approved",
    },
  ]);

  // Sample Admin Users
  const [users, setUsers] = useState([
    {
      id: "usr_admin_001",
      username: "admin",
      email: "admin@vanta-services.com",
      balanceUsd: 500.0,
      role: "admin",
      status: "active",
    },
    {
      id: "usr_demo_002",
      username: "Bebo",
      email: "client@vanta-services.com",
      balanceUsd: 45.0,
      role: "user",
      status: "active",
    },
  ]);

  const handleApproveOrder = (orderId: number) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, status: "completed", resultInput: o.resultInput || "SUCCESS-UNLOCKED-AUTO" }
          : o
      )
    );
  };

  const handleRejectOrder = (orderId: number) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, status: "rejected", resultInput: "تم الرفض واسترداد الرصيد" } : o
      )
    );
  };

  const handleApproveTopup = (id: number) => {
    setTopups((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "approved" } : t))
    );
  };

  const handleRejectTopup = (id: number) => {
    setTopups((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "rejected" } : t))
    );
  };

  const handleSyncDhru = () => {
    setDhruSyncing(true);
    setTimeout(() => {
      setDhruSyncing(false);
      setSyncNotice("تمت مزامنة 142 خدمة مع سيرفر DHRU وتحديث الأسعار بنجاح!");
      setTimeout(() => setSyncNotice(null), 4000);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold mb-1">
            <Shield className="w-3.5 h-3.5" />
            <span>لوحة الإدارة المركزية</span>
          </div>
          <h1 className="text-3xl font-black text-white">{t.admin.title}</h1>
        </div>

        <button
          onClick={handleSyncDhru}
          disabled={dhruSyncing}
          className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-amber-500/30 hover:border-amber-400 text-amber-300 text-xs font-bold transition-all flex items-center gap-2 shadow-lg disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${dhruSyncing ? "animate-spin" : ""}`} />
          <span>{dhruSyncing ? "جارٍ المزامنة..." : t.admin.syncDhru}</span>
        </button>
      </div>

      {syncNotice && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{syncNotice}</span>
        </div>
      )}

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
          <div className="text-xs text-zinc-400 font-bold">{t.admin.totalUsers}</div>
          <div className="text-2xl font-black text-white mt-2">1,248</div>
        </div>
        <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
          <div className="text-xs text-zinc-400 font-bold">{t.admin.totalOrders}</div>
          <div className="text-2xl font-black text-amber-300 mt-2">48,290</div>
        </div>
        <div className="p-5 rounded-2xl bg-zinc-950 border border-amber-500/30">
          <div className="text-xs text-amber-400 font-bold">{t.admin.pendingOrders}</div>
          <div className="text-2xl font-black text-amber-400 mt-2">
            {orders.filter((o) => o.status === "pending").length}
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
          <div className="text-xs text-zinc-400 font-bold">{t.admin.pendingTopups}</div>
          <div className="text-2xl font-black text-white mt-2">
            {topups.filter((tp) => tp.status === "pending").length}
          </div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex border-b border-zinc-800 gap-2">
        {[
          { key: "orders", label: "الطلبات والمراجعة", icon: ShoppingBag },
          { key: "topups", label: "طلبات شحن الرصيد", icon: Wallet },
          { key: "users", label: "المستخدمين والأرصدة", icon: Users },
          { key: "settings", label: "إعدادات المنصة وDHRU", icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as Tab)}
              className={`flex items-center gap-2 px-5 py-3 border-b-2 text-xs font-bold transition-all ${
                activeTab === tab.key
                  ? "border-amber-400 text-amber-300 bg-amber-500/5"
                  : "border-transparent text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: ORDERS */}
      {activeTab === "orders" && (
        <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-6 space-y-4">
          <h3 className="text-base font-bold text-white">إدارة طلبات الخدمات</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400 text-[11px]">
                  <th className="py-3 px-3 text-start">الطلب</th>
                  <th className="py-3 px-3 text-start">العميل</th>
                  <th className="py-3 px-3 text-start">الخدمة والمدخلات</th>
                  <th className="py-3 px-3 text-start">المبلغ</th>
                  <th className="py-3 px-3 text-start">الحالة</th>
                  <th className="py-3 px-3 text-start">كود النتيجة للعميل</th>
                  <th className="py-3 px-3 text-start">إجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-zinc-900/50">
                    <td className="py-3.5 px-3 font-mono font-bold text-amber-400">
                      #{ord.id}
                    </td>
                    <td className="py-3.5 px-3 text-zinc-300">{ord.user}</td>
                    <td className="py-3.5 px-3">
                      <span className="font-bold text-white block">{ord.service}</span>
                      <span className="font-mono text-[10px] text-zinc-400">{ord.inputs}</span>
                    </td>
                    <td className="py-3.5 px-3 font-bold text-amber-300">
                      ${ord.price.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-3">
                      {ord.status === "completed" && (
                        <span className="text-emerald-400 font-bold">مكتمل</span>
                      )}
                      {ord.status === "pending" && (
                        <span className="text-amber-400 font-bold">معلق</span>
                      )}
                      {ord.status === "rejected" && (
                        <span className="text-rose-400 font-bold">مرفوض</span>
                      )}
                    </td>
                    <td className="py-3.5 px-3">
                      <input
                        type="text"
                        value={ord.resultInput}
                        onChange={(e) => {
                          const val = e.target.value;
                          setOrders((prev) =>
                            prev.map((o) => (o.id === ord.id ? { ...o, resultInput: val } : o))
                          );
                        }}
                        placeholder="أدخل كود الفك أو التقرير..."
                        className="bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1 text-xs text-white font-mono w-48 focus:border-amber-400 focus:outline-none"
                      />
                    </td>
                    <td className="py-3.5 px-3">
                      {ord.status === "pending" ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleApproveOrder(ord.id)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px]"
                          >
                            موافقة
                          </button>
                          <button
                            onClick={() => handleRejectOrder(ord.id)}
                            className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-[11px]"
                          >
                            رفض ورد
                          </button>
                        </div>
                      ) : (
                        <span className="text-zinc-500">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: TOP-UPS */}
      {activeTab === "topups" && (
        <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-6 space-y-4">
          <h3 className="text-base font-bold text-white">إدارة طلبات شحن المحفظة</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400 text-[11px]">
                  <th className="py-3 px-3 text-start">المعرف</th>
                  <th className="py-3 px-3 text-start">العميل</th>
                  <th className="py-3 px-3 text-start">الوسيلة</th>
                  <th className="py-3 px-3 text-start">المبلغ</th>
                  <th className="py-3 px-3 text-start">البيانات / المرسل</th>
                  <th className="py-3 px-3 text-start">الحالة</th>
                  <th className="py-3 px-3 text-start">إجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {topups.map((tp) => (
                  <tr key={tp.id} className="hover:bg-zinc-900/50">
                    <td className="py-3.5 px-3 font-mono font-bold text-amber-400">
                      #{tp.id}
                    </td>
                    <td className="py-3.5 px-3 text-zinc-300">{tp.user}</td>
                    <td className="py-3.5 px-3 font-semibold text-white">{tp.method}</td>
                    <td className="py-3.5 px-3 font-bold text-amber-300">{tp.amount}</td>
                    <td className="py-3.5 px-3 font-mono text-zinc-400">{tp.sender}</td>
                    <td className="py-3.5 px-3">
                      {tp.status === "approved" && (
                        <span className="text-emerald-400 font-bold">معتمد</span>
                      )}
                      {tp.status === "pending" && (
                        <span className="text-amber-400 font-bold">بانتظار المراجعة</span>
                      )}
                      {tp.status === "rejected" && (
                        <span className="text-rose-400 font-bold">مرفوض</span>
                      )}
                    </td>
                    <td className="py-3.5 px-3">
                      {tp.status === "pending" ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleApproveTopup(tp.id)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px]"
                          >
                            اعتماد وإيداع
                          </button>
                          <button
                            onClick={() => handleRejectTopup(tp.id)}
                            className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-[11px]"
                          >
                            رفض
                          </button>
                        </div>
                      ) : (
                        <span className="text-zinc-500">تم الإجراء</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: USERS & BALANCE */}
      {activeTab === "users" && (
        <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-6 space-y-4">
          <h3 className="text-base font-bold text-white">إدارة الأعضاء والأرصدة</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400 text-[11px]">
                  <th className="py-3 px-3 text-start">المستخدم</th>
                  <th className="py-3 px-3 text-start">البريد</th>
                  <th className="py-3 px-3 text-start">الرصيد بالدولار</th>
                  <th className="py-3 px-3 text-start">الصلاحية</th>
                  <th className="py-3 px-3 text-start">الحالة</th>
                  <th className="py-3 px-3 text-start">تعديل الرصيد</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-zinc-900/50">
                    <td className="py-3.5 px-3 font-bold text-white">{u.username}</td>
                    <td className="py-3.5 px-3 text-zinc-400">{u.email}</td>
                    <td className="py-3.5 px-3 font-mono font-bold text-amber-300">
                      ${u.balanceUsd.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-[10px] font-bold text-amber-300">
                        {u.role.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="text-emerald-400 font-semibold">{u.status}</span>
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setUsers((prev) =>
                              prev.map((usr) =>
                                usr.id === u.id ? { ...usr, balanceUsd: usr.balanceUsd + 10 } : usr
                              )
                            );
                          }}
                          className="px-2 py-1 rounded bg-zinc-900 border border-zinc-700 hover:border-amber-400 text-amber-300 text-[11px] font-bold"
                        >
                          + $10
                        </button>
                        <button
                          onClick={() => {
                            setUsers((prev) =>
                              prev.map((usr) =>
                                usr.id === u.id ? { ...usr, balanceUsd: usr.balanceUsd + 50 } : usr
                              )
                            );
                          }}
                          className="px-2 py-1 rounded bg-zinc-900 border border-zinc-700 hover:border-amber-400 text-amber-300 text-[11px] font-bold"
                        >
                          + $50
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: SETTINGS & DHRU */}
      {activeTab === "settings" && (
        <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-6 space-y-6 max-w-2xl">
          <h3 className="text-base font-bold text-white">إعدادات المنصة وأسعار الصرف</h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-zinc-300 font-bold mb-1">
                سعر صرف الدولار مقابل الجنيه (1 USD = X EGP)
              </label>
              <input
                type="text"
                value={exchangeRate}
                onChange={(e) => setExchangeRate(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm font-mono text-white focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-zinc-300 font-bold mb-1">
                رقم استلام فودافون كاش
              </label>
              <input
                type="text"
                defaultValue="01012345678"
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm font-mono text-white focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-zinc-300 font-bold mb-1">
                معرف إنستا باي الرسمي
              </label>
              <input
                type="text"
                defaultValue="vanta@instapay"
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm font-mono text-white focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-zinc-300 font-bold mb-1">
                Binance Pay Merchant ID
              </label>
              <input
                type="text"
                defaultValue="894123567"
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm font-mono text-white focus:border-amber-400 focus:outline-none"
              />
            </div>

            <button
              type="button"
              onClick={() => alert("تم حفظ الإعدادات بنجاح")}
              className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 font-black text-xs shadow-md hover:brightness-110 transition-all"
            >
              {t.admin.saveSettings}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
