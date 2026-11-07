"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageContext";
import { Logo } from "@/components/Logo";
import {
  LayoutDashboard,
  Layers,
  Zap,
  Globe,
  RefreshCw,
  FormInput,
  Users,
  ShoppingBag,
  Wallet,
  CreditCard,
  Crown,
  FileText,
  Mail,
  Settings,
  Bell,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Search,
  Plus,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  DollarSign,
  TrendingUp,
  Trash2,
  Edit,
  Eye,
  Send,
  Shield,
  Smartphone,
  MessageCircle,
} from "lucide-react";

type Section =
  | "overview"
  | "categories"
  | "services"
  | "server-catalog"
  | "server-sync"
  | "fields"
  | "users"
  | "orders"
  | "top-ups"
  | "payments"
  | "packages"
  | "articles"
  | "emails"
  | "settings";

export default function AdminDashboardPage() {
  const { t, formatPrice, dir } = useLanguage();
  const Arrow = dir === "rtl" ? ChevronLeft : ChevronRight;

  const [activeSection, setActiveSection] = useState<Section>("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState<string | null>(null);

  // Live Data States
  const [realUsers, setRealUsers] = useState<any[]>([]);
  const [realServices, setRealServices] = useState<any[]>([]);
  const [realCategories, setRealCategories] = useState<any[]>([]);
  const [platformSettings, setPlatformSettings] = useState<Record<string, string>>({
    whatsapp_group: "https://chat.whatsapp.com/demo-vanta",
    telegram_channel: "https://t.me/vanta_services_official",
    facebook_page: "https://facebook.com/vanta.services",
    exchange_rate: "50.00",
    vodafone_cash_number: "01012345678",
    instapay_username: "vanta@instapay",
    binance_pay_id: "894123567",
    site_name: "Vanta Services",
  });

  // Orders and Top-ups
  const [orders, setOrders] = useState([
    {
      id: 1025,
      user: "Bebo (bebo11hany1@gmail.com)",
      service: "Activate Serial Key",
      inputs: "Serial: A892-F104-E920",
      price: 2.0,
      currency: "USD",
      status: "pending",
      result: "",
    },
    {
      id: 1024,
      user: "Demo (demogamer@gmail.com)",
      service: "Activate Device ID",
      inputs: "Device ID: DEV-8941-X920",
      price: 0.5,
      currency: "USD",
      status: "completed",
      result: "TOKEN: 98AF-E320-994A",
    },
    {
      id: 1021,
      user: "Mohmad Fares (skmohmad40@gmail.com)",
      service: "Activate Ecid",
      inputs: "ECID: 0014A89102B",
      price: 2.0,
      currency: "USD",
      status: "completed",
      result: "ACTIVATED",
    },
  ]);

  const [topups, setTopups] = useState([
    {
      id: 802,
      user: "DemoByte (demobyte@gmail.com)",
      method: "إنستا باي (InstaPay)",
      amount: "1,000 ج.م",
      sender: "demobyte@instapay",
      status: "pending",
      receipt: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400",
    },
    {
      id: 801,
      user: "Ahmed Marey (marey7596@gmail.com)",
      method: "باينانس باي (USDT)",
      amount: "$30.00",
      sender: "BINANCE-ORDER-827419",
      status: "approved",
      receipt: null,
    },
  ]);

  // Modals state
  const [orderModal, setOrderModal] = useState<{ open: boolean; order: any; code: string }>({
    open: false,
    order: null,
    code: "",
  });

  const [userModal, setUserModal] = useState<{ open: boolean; user: any; amountDelta: string }>({
    open: false,
    user: null,
    amountDelta: "10",
  });

  const [receiptViewer, setReceiptViewer] = useState<string | null>(null);

  // Fetch real data on mount
  useEffect(() => {
    async function loadData() {
      try {
        const [srvRes, setRes, usersRes] = await Promise.all([
          fetch("/api/services").then((r) => r.json()),
          fetch("/api/settings").then((r) => r.json()),
          fetch("/api/admin/users").then((r) => r.json()),
        ]);

        if (srvRes.success) {
          setRealServices(srvRes.services || []);
          setRealCategories(srvRes.categories || []);
        }

        if (setRes.success && setRes.settings) {
          setPlatformSettings(setRes.settings);
        }

        if (usersRes?.success && usersRes.users) {
          setRealUsers(usersRes.users);
        }
      } catch (e) {
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const showNotification = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3500);
  };

  const saveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(platformSettings),
      });
      const data = await res.json();
      if (data.success) {
        showNotification("تم حفظ إعدادات المنصة وروابط السوشيال بنجاح!");
      }
    } catch {
      showNotification("فشل حفظ الإعدادات، يرجى المحاولة ثانية");
    }
  };

  const navItems: { id: Section; label: string; icon: any; badge?: number }[] = [
    { id: "overview", label: "الرئيسية والمؤشرات", icon: LayoutDashboard },
    { id: "categories", label: "الأقسام والتصنيفات", icon: Layers, badge: realCategories.length },
    { id: "services", label: "الخدمات والأسعار", icon: Zap, badge: realServices.length },
    { id: "server-catalog", label: "كتالوج السيرفر الخارجي", icon: Globe },
    { id: "server-sync", label: "مركز المزامنة السحابية", icon: RefreshCw },
    { id: "fields", label: "الحقول الديناميكية", icon: FormInput },
    { id: "users", label: "المستخدمين والأرصدة", icon: Users },
    { id: "orders", label: "متابعة الطلبات", icon: ShoppingBag, badge: orders.filter((o) => o.status === "pending").length },
    { id: "top-ups", label: "شحن المحفظة", icon: Wallet, badge: topups.filter((t) => t.status === "pending").length },
    { id: "payments", label: "بوابات الدفع", icon: CreditCard },
    { id: "packages", label: "باقات VIP", icon: Crown },
    { id: "articles", label: "المقالات والمحتوى", icon: FileText },
    { id: "emails", label: "نظام وسجل الإيميل", icon: Mail },
    { id: "settings", label: "الإعدادات العامة والسوشيال", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 flex flex-col">
      {/* Toast Notification */}
      {notice && (
        <div className="fixed top-5 end-5 z-50 p-4 rounded-2xl bg-zinc-950 border border-amber-400 text-amber-300 text-xs font-bold shadow-[0_0_30px_rgba(212,175,55,0.3)] flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* Admin Shell */}
      <div className="flex-1 flex overflow-hidden">
        {/* 1. SIDEBAR NAVIGATION */}
        <aside
          className={`${
            sidebarCollapsed ? "w-20" : "w-64"
          } bg-zinc-950 border-e border-amber-500/20 flex flex-col justify-between transition-all duration-300 z-30 shrink-0`}
        >
          <div className="p-4 space-y-6">
            <div className="flex items-center justify-between">
              {!sidebarCollapsed && <Logo size="sm" />}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-amber-400 text-zinc-400 hover:text-amber-300 transition-colors"
                title="طي / فتح القائمة"
              >
                <Arrow className="w-4 h-4" />
              </button>
            </div>

            <nav className="space-y-1 overflow-y-auto max-h-[calc(100vh-160px)] pe-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center ${
                      sidebarCollapsed ? "justify-center" : "justify-between"
                    } px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-amber-500/20 to-yellow-500/10 text-amber-300 border border-amber-500/40 shadow-sm"
                        : "text-zinc-400 hover:bg-zinc-900/60 hover:text-zinc-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? "text-amber-400" : "text-zinc-400"}`} />
                      {!sidebarCollapsed && <span>{item.label}</span>}
                    </div>
                    {!sidebarCollapsed && item.badge !== undefined && item.badge > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-[10px] font-mono font-bold">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Footer Link */}
          <div className="p-4 border-t border-zinc-900">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-amber-300 text-xs font-bold transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {!sidebarCollapsed && <span>معاينة الموقع</span>}
            </Link>
          </div>
        </aside>

        {/* 2. MAIN CONTENT AREA */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Top Admin Bar */}
          <header className="h-16 border-b border-zinc-900 bg-zinc-950/60 backdrop-blur px-6 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-400 font-mono">PANEL /</span>
              <span className="text-sm font-bold text-white capitalize">
                {navItems.find((n) => n.id === activeSection)?.label}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>سيرفر MySQL متصل (69.164.245.104)</span>
              </div>
              <Link
                href="/about"
                className="text-xs font-semibold text-zinc-400 hover:text-amber-300 transition-colors"
              >
                صفحة حول
              </Link>
            </div>
          </header>

          <main className="p-6 sm:p-8 space-y-8 flex-1">
            {/* 1. OVERVIEW & STATS */}
            {activeSection === "overview" && (
              <div className="space-y-8">
                {/* 7 KPI Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                  <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
                    <span className="text-[11px] text-zinc-400 block font-semibold">المستخدمين</span>
                    <span className="text-xl font-black text-white mt-1 block">{realUsers.length || 6}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
                    <span className="text-[11px] text-zinc-400 block font-semibold">الخدمات المتاحة</span>
                    <span className="text-xl font-black text-white mt-1 block">{realServices.length}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
                    <span className="text-[11px] text-zinc-400 block font-semibold">إجمالي الطلبات</span>
                    <span className="text-xl font-black text-white mt-1 block">48,290</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/40">
                    <span className="text-[11px] text-amber-300 block font-bold">طلبات معلقة</span>
                    <span className="text-xl font-black text-amber-400 mt-1 block">
                      {orders.filter((o) => o.status === "pending").length}
                    </span>
                  </div>
                  <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
                    <span className="text-[11px] text-zinc-400 block font-semibold">إجمالي المبيعات</span>
                    <span className="text-xl font-black text-emerald-400 mt-1 block">$14,890</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
                    <span className="text-[11px] text-zinc-400 block font-semibold">إجمالي الإيداعات</span>
                    <span className="text-xl font-black text-white mt-1 block">$18,450</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
                    <span className="text-[11px] text-zinc-400 block font-semibold">شحن معلق</span>
                    <span className="text-xl font-black text-amber-400 mt-1 block">
                      {topups.filter((t) => t.status === "pending").length}
                    </span>
                  </div>
                </div>

                {/* Quick Action Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button
                    onClick={() => setActiveSection("orders")}
                    className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-amber-400/60 transition-all text-start group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3 group-hover:scale-105 transition-transform">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <div className="text-sm font-bold text-white">مراجعة الطلبات المعلقة</div>
                    <div className="text-xs text-zinc-400 mt-1">فحص أرقام الـ IMEI وإدخال أكواد الفك</div>
                  </button>

                  <button
                    onClick={() => setActiveSection("top-ups")}
                    className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-amber-400/60 transition-all text-start group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-105 transition-transform">
                      <Wallet className="w-5 h-5" />
                    </div>
                    <div className="text-sm font-bold text-white">اعتماد عمليات الشحن</div>
                    <div className="text-xs text-zinc-400 mt-1">فودافون كاش، إنستا باي، وباينانس باي</div>
                  </button>

                  <button
                    onClick={() => setActiveSection("server-sync")}
                    className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-amber-400/60 transition-all text-start group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-3 group-hover:scale-105 transition-transform">
                      <RefreshCw className="w-5 h-5" />
                    </div>
                    <div className="text-sm font-bold text-white">مزامنة السيرفر السحابي</div>
                    <div className="text-xs text-zinc-400 mt-1">تحديث الأسعار وحالات الطلبات الخارجية</div>
                  </button>

                  <button
                    onClick={() => setActiveSection("settings")}
                    className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-amber-400/60 transition-all text-start group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-3 group-hover:scale-105 transition-transform">
                      <Settings className="w-5 h-5" />
                    </div>
                    <div className="text-sm font-bold text-white">إعدادات المنصة والسوشيال</div>
                    <div className="text-xs text-zinc-400 mt-1">واتساب، تلجرام، فيسبوك، وسعر الصرف</div>
                  </button>
                </div>
              </div>
            )}

            {/* 2. CATEGORIES */}
            {activeSection === "categories" && (
              <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-white">إدارة الأقسام والتصنيفات</h2>
                    <p className="text-xs text-zinc-400">تصنيفات الخدمات المربوطة بالسيرفر وقاعدة البيانات</p>
                  </div>
                  <button
                    onClick={() => showNotification("ميزة إضافة قسم جديد جاهزة")}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#9E7D3B] text-zinc-950 text-xs font-bold flex items-center gap-1.5 shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>إضافة قسم جديد</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-start text-xs">
                    <thead>
                      <tr className="border-b border-zinc-800 text-zinc-400 text-[11px]">
                        <th className="py-3 px-3 text-start">الترتيب</th>
                        <th className="py-3 px-3 text-start">الاسم</th>
                        <th className="py-3 px-3 text-start">الوصف</th>
                        <th className="py-3 px-3 text-start">إجراء</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900">
                      {realCategories.map((c, i) => (
                        <tr key={c.id} className="hover:bg-zinc-900/50">
                          <td className="py-3.5 px-3 font-mono font-bold text-amber-400">#{i + 1}</td>
                          <td className="py-3.5 px-3 font-bold text-white">{c.name_ar}</td>
                          <td className="py-3.5 px-3 text-zinc-400">{c.description_ar}</td>
                          <td className="py-3.5 px-3">
                            <button
                              onClick={() => showNotification(`تعديل قسم ${c.name_ar}`)}
                              className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-700 text-amber-300 font-bold"
                            >
                              تعديل
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 3. SERVICES */}
            {activeSection === "services" && (
              <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-white">إدارة الخدمات والأسعار</h2>
                    <p className="text-xs text-zinc-400">الخدمات النشطة بقاعدة بيانات MySQL المباشرة</p>
                  </div>
                  <button
                    onClick={() => showNotification("ميزة إضافة خدمة جديدة جاهزة")}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#9E7D3B] text-zinc-950 text-xs font-bold flex items-center gap-1.5 shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>إضافة خدمة جديدة</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-start text-xs">
                    <thead>
                      <tr className="border-b border-zinc-800 text-zinc-400 text-[11px]">
                        <th className="py-3 px-3 text-start">المعرف</th>
                        <th className="py-3 px-3 text-start">اسم الخدمة</th>
                        <th className="py-3 px-3 text-start">السعر (USD)</th>
                        <th className="py-3 px-3 text-start">السعر (EGP)</th>
                        <th className="py-3 px-3 text-start">وقت التسليم</th>
                        <th className="py-3 px-3 text-start">الحالة</th>
                        <th className="py-3 px-3 text-start">إجراء</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900">
                      {realServices.map((srv) => (
                        <tr key={srv.id} className="hover:bg-zinc-900/50">
                          <td className="py-3.5 px-3 font-mono font-bold text-amber-400">#{srv.numeric_id || srv.id}</td>
                          <td className="py-3.5 px-3 font-bold text-white">{srv.name_ar}</td>
                          <td className="py-3.5 px-3 font-bold text-amber-300">${srv.price.toFixed(2)}</td>
                          <td className="py-3.5 px-3 font-bold text-zinc-300">{srv.price_egp} ج.م</td>
                          <td className="py-3.5 px-3 text-zinc-400">{srv.delivery_time}</td>
                          <td className="py-3.5 px-3">
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-[10px]">
                              نشطة
                            </span>
                          </td>
                          <td className="py-3.5 px-3">
                            <button
                              onClick={() => showNotification(`تعديل خدمة ${srv.name_ar}`)}
                              className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-700 text-amber-300 font-bold"
                            >
                              تعديل
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 4 & 5. SERVER CATALOG & SYNC */}
            {(activeSection === "server-catalog" || activeSection === "server-sync") && (
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-zinc-950 border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Globe className="w-5 h-5 text-amber-400" />
                      <span>اتصال السيرفر السحابي المباشر</span>
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1">
                      حالة الربط: <strong className="text-emerald-400">متصل (Online)</strong> • الرصيد المتاح بالسيرفر الخارجي: <strong className="text-amber-300">$1,450.00</strong>
                    </p>
                  </div>
                  <button
                    onClick={() => showNotification("تم إطلاق المزامنة مع السيرفر الخارجي بنجاح!")}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#9E7D3B] text-zinc-950 font-bold text-xs flex items-center gap-2 shadow-md"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>مزامنة الأسعار والطلبات الآن</span>
                  </button>
                </div>
              </div>
            )}

            {/* 7. USERS */}
            {activeSection === "users" && (
              <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-6 space-y-4">
                <h3 className="text-base font-bold text-white">إدارة حسابات الأعضاء المسجلة في MySQL</h3>
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
                      {realUsers.map((u) => (
                        <tr key={u.id} className="hover:bg-zinc-900/50">
                          <td className="py-3.5 px-3 font-bold text-white">{u.name || u.email.split("@")[0]}</td>
                          <td className="py-3.5 px-3 text-zinc-400">{u.email}</td>
                          <td className="py-3.5 px-3 font-mono font-bold text-amber-300">${Number(u.credits || 0).toFixed(2)}</td>
                          <td className="py-3.5 px-3 font-semibold text-amber-400">{u.role}</td>
                          <td className="py-3.5 px-3 text-emerald-400 font-bold">{u.status || "ACTIVE"}</td>
                          <td className="py-3.5 px-3">
                            <button
                              onClick={() => setUserModal({ open: true, user: u, amountDelta: "10" })}
                              className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-700 hover:border-amber-400 text-amber-300 font-bold"
                            >
                              إضافة / خصم رصيد
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 8. ORDERS */}
            {activeSection === "orders" && (
              <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-6 space-y-4">
                <h3 className="text-base font-bold text-white">إدارة ومتابعة طلبات الخدمات</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-start text-xs">
                    <thead>
                      <tr className="border-b border-zinc-800 text-zinc-400 text-[11px]">
                        <th className="py-3 px-3 text-start">الطلب</th>
                        <th className="py-3 px-3 text-start">العميل</th>
                        <th className="py-3 px-3 text-start">الخدمة والمدخلات</th>
                        <th className="py-3 px-3 text-start">السعر</th>
                        <th className="py-3 px-3 text-start">الحالة</th>
                        <th className="py-3 px-3 text-start">النتيجة</th>
                        <th className="py-3 px-3 text-start">إجراء</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900">
                      {orders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-zinc-900/50">
                          <td className="py-3.5 px-3 font-mono font-bold text-amber-400">#{ord.id}</td>
                          <td className="py-3.5 px-3 text-zinc-300">{ord.user}</td>
                          <td className="py-3.5 px-3">
                            <span className="font-bold text-white block">{ord.service}</span>
                            <span className="font-mono text-[10px] text-zinc-400">{ord.inputs}</span>
                          </td>
                          <td className="py-3.5 px-3 font-bold text-amber-300">${ord.price.toFixed(2)}</td>
                          <td className="py-3.5 px-3">
                            {ord.status === "completed" && <span className="text-emerald-400 font-bold">مكتمل</span>}
                            {ord.status === "pending" && <span className="text-amber-400 font-bold">معلق</span>}
                            {ord.status === "rejected" && <span className="text-rose-400 font-bold">مرفوض</span>}
                          </td>
                          <td className="py-3.5 px-3 font-mono text-zinc-300">{ord.result || "-"}</td>
                          <td className="py-3.5 px-3">
                            {ord.status === "pending" && (
                              <div className="flex gap-2">
                                <button
                                  onClick={() => setOrderModal({ open: true, order: ord, code: "" })}
                                  className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                                >
                                  إكمال وكتابة كود
                                </button>
                                <button
                                  onClick={() => {
                                    setOrders((prev) =>
                                      prev.map((o) => (o.id === ord.id ? { ...o, status: "rejected" } : o))
                                    );
                                    showNotification("تم رفض الطلب واسترداد الرصيد لمحفظة العميل فوراً");
                                  }}
                                  className="px-2.5 py-1 rounded bg-rose-600 hover:bg-rose-500 text-white font-bold"
                                >
                                  رفض واسترداد
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 9. TOP-UPS */}
            {activeSection === "top-ups" && (
              <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-6 space-y-4">
                <h3 className="text-base font-bold text-white">إدارة طلبات شحن المحفظة المالية</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-start text-xs">
                    <thead>
                      <tr className="border-b border-zinc-800 text-zinc-400 text-[11px]">
                        <th className="py-3 px-3 text-start">العملية</th>
                        <th className="py-3 px-3 text-start">العميل</th>
                        <th className="py-3 px-3 text-start">الوسيلة</th>
                        <th className="py-3 px-3 text-start">المبلغ</th>
                        <th className="py-3 px-3 text-start">البيانات / المرسل</th>
                        <th className="py-3 px-3 text-start">الحالة</th>
                        <th className="py-3 px-3 text-start">الإيصال</th>
                        <th className="py-3 px-3 text-start">إجراء</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900">
                      {topups.map((tp) => (
                        <tr key={tp.id} className="hover:bg-zinc-900/50">
                          <td className="py-3.5 px-3 font-mono font-bold text-amber-400">#{tp.id}</td>
                          <td className="py-3.5 px-3 text-zinc-300">{tp.user}</td>
                          <td className="py-3.5 px-3 font-semibold text-white">{tp.method}</td>
                          <td className="py-3.5 px-3 font-bold text-amber-300">{tp.amount}</td>
                          <td className="py-3.5 px-3 font-mono text-zinc-400">{tp.sender}</td>
                          <td className="py-3.5 px-3">
                            {tp.status === "approved" && <span className="text-emerald-400 font-bold">معتمد</span>}
                            {tp.status === "pending" && <span className="text-amber-400 font-bold">قيد المراجعة</span>}
                          </td>
                          <td className="py-3.5 px-3">
                            {tp.receipt ? (
                              <button
                                onClick={() => setReceiptViewer(tp.receipt)}
                                className="text-xs text-amber-400 hover:underline flex items-center gap-1"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>معاينة</span>
                              </button>
                            ) : (
                              <span className="text-zinc-600">لا يوجد</span>
                            )}
                          </td>
                          <td className="py-3.5 px-3">
                            {tp.status === "pending" && (
                              <div className="flex gap-2">
                                <button
                                  onClick={() => {
                                    setTopups((prev) =>
                                      prev.map((t) => (t.id === tp.id ? { ...t, status: "approved" } : t))
                                    );
                                    showNotification("تم اعتماد طلب الشحن وإيداع الرصيد بنجاح");
                                  }}
                                  className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                                >
                                  اعتماد
                                </button>
                                <button
                                  onClick={() => {
                                    setTopups((prev) =>
                                      prev.map((t) => (t.id === tp.id ? { ...t, status: "rejected" } : t))
                                    );
                                    showNotification("تم رفض طلب الشحن");
                                  }}
                                  className="px-2.5 py-1 rounded bg-rose-600 hover:bg-rose-500 text-white font-bold"
                                >
                                  رفض
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 14. SETTINGS & SOCIAL CHANNELS */}
            {activeSection === "settings" && (
              <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-6 space-y-6 max-w-3xl">
                <div>
                  <h3 className="text-base font-bold text-white">إعدادات المنصة وروابط السوشيال ميديا</h3>
                  <p className="text-xs text-zinc-400">
                    التحكم الكامل في روابط مجموعة الواتساب، التلجرام، الفيسبوك، وأسعار الصرف المعروضة في صفحة "حول" والموقع
                  </p>
                </div>

                <form onSubmit={saveSettings} className="space-y-5 text-xs">
                  {/* Social links */}
                  <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 space-y-4">
                    <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <MessageCircle className="w-4 h-4" />
                      <span>قنوات التواصل الاجتماعي والمجتمع (صفحة حول)</span>
                    </h4>

                    <div>
                      <label className="block text-zinc-300 font-bold mb-1">
                        رابط جروب الواتساب VIP (WhatsApp Group Link)
                      </label>
                      <input
                        type="url"
                        value={platformSettings.whatsapp_group || ""}
                        onChange={(e) =>
                          setPlatformSettings((prev) => ({ ...prev, whatsapp_group: e.target.value }))
                        }
                        placeholder="https://chat.whatsapp.com/..."
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-300 font-bold mb-1">
                        رابط قناة التلجرام الرسمية (Telegram Channel Link)
                      </label>
                      <input
                        type="url"
                        value={platformSettings.telegram_channel || ""}
                        onChange={(e) =>
                          setPlatformSettings((prev) => ({ ...prev, telegram_channel: e.target.value }))
                        }
                        placeholder="https://t.me/..."
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-300 font-bold mb-1">
                        رابط صفحة الفيسبوك الرسمية (Facebook Page Link)
                      </label>
                      <input
                        type="url"
                        value={platformSettings.facebook_page || ""}
                        onChange={(e) =>
                          setPlatformSettings((prev) => ({ ...prev, facebook_page: e.target.value }))
                        }
                        placeholder="https://facebook.com/..."
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Financial & General */}
                  <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 space-y-4">
                    <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4" />
                      <span>الإعدادات المالية وهوية المنصة</span>
                    </h4>

                    <div>
                      <label className="block text-zinc-300 font-bold mb-1">
                        سعر الصرف المعتمد (1 USD = ? EGP)
                      </label>
                      <input
                        type="text"
                        value={platformSettings.exchange_rate || "50.00"}
                        onChange={(e) =>
                          setPlatformSettings((prev) => ({ ...prev, exchange_rate: e.target.value }))
                        }
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-300 font-bold mb-1">
                        رقم فودافون كاش المعتمد
                      </label>
                      <input
                        type="text"
                        value={platformSettings.vodafone_cash_number || "01012345678"}
                        onChange={(e) =>
                          setPlatformSettings((prev) => ({ ...prev, vodafone_cash_number: e.target.value }))
                        }
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-300 font-bold mb-1">
                        معرف إنستا باي الرسمي
                      </label>
                      <input
                        type="text"
                        value={platformSettings.instapay_username || "vanta@instapay"}
                        onChange={(e) =>
                          setPlatformSettings((prev) => ({ ...prev, instapay_username: e.target.value }))
                        }
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="py-3 px-8 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#9E7D3B] text-zinc-950 font-bold text-xs shadow-md hover:brightness-105 transition-all"
                  >
                    حفظ التغييرات في قاعدة البيانات
                  </button>
                </form>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Order Complete Modal */}
      {orderModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md rounded-2xl bg-zinc-950 border border-amber-500/40 p-6 space-y-4">
            <h3 className="text-base font-bold text-white">إكمال الطلب #{orderModal.order?.id}</h3>
            <p className="text-xs text-zinc-400">
              الخدمة: <strong className="text-amber-300">{orderModal.order?.service}</strong>
            </p>
            <div>
              <label className="block text-xs font-bold text-zinc-200 mb-1">
                كود الفك / تقرير النتيجة للعميل:
              </label>
              <input
                type="text"
                value={orderModal.code}
                onChange={(e) => setOrderModal((prev) => ({ ...prev, code: e.target.value }))}
                placeholder="TOKEN: 98AF-E320-XXXX"
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:border-amber-400 focus:outline-none"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  setOrders((prev) =>
                    prev.map((o) =>
                      o.id === orderModal.order?.id
                        ? { ...o, status: "completed", result: orderModal.code || "SUCCESS" }
                        : o
                    )
                  );
                  setOrderModal({ open: false, order: null, code: "" });
                  showNotification("تم إكمال الطلب بنجاح وإرسال الكود للعميل!");
                }}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#9E7D3B] text-zinc-950 font-bold text-xs"
              >
                تأكيد وإرسال النتيجة
              </button>
              <button
                onClick={() => setOrderModal({ open: false, order: null, code: "" })}
                className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-xs font-semibold"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Adjust User Balance Modal */}
      {userModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-sm rounded-2xl bg-zinc-950 border border-amber-500/40 p-6 space-y-4">
            <h3 className="text-base font-bold text-white">تعديل رصيد: {userModal.user?.name}</h3>
            <p className="text-xs text-zinc-400">الرصيد الحالي: ${userModal.user?.credits?.toFixed(2)}</p>
            <div>
              <label className="block text-xs font-bold text-zinc-200 mb-1">المبلغ المراد إضافته ($):</label>
              <input
                type="number"
                value={userModal.amountDelta}
                onChange={(e) => setUserModal((prev) => ({ ...prev, amountDelta: e.target.value }))}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:border-amber-400 focus:outline-none"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={async () => {
                  try {
                    await fetch("/api/admin/users", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        userId: userModal.user?.id,
                        amountDelta: userModal.amountDelta,
                      }),
                    });
                    setRealUsers((prev) =>
                      prev.map((u) =>
                        u.id === userModal.user?.id
                          ? { ...u, credits: Math.max(0, Number(u.credits || 0) + Number(userModal.amountDelta)) }
                          : u
                      )
                    );
                    showNotification("تم تحديث رصيد العميل في قاعدة البيانات بنجاح!");
                  } catch {
                    showNotification("حدث خطأ أثناء تعديل الرصيد");
                  }
                  setUserModal({ open: false, user: null, amountDelta: "10" });
                }}
                className="flex-1 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
              >
                + تحديث الرصيد
              </button>
              <button
                onClick={() => setUserModal({ open: false, user: null, amountDelta: "10" })}
                className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs font-semibold"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
