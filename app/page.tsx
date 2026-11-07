"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageContext";
import { OrderModal, ServiceItem } from "@/components/OrderModal";
import {
  ShieldAlert,
  Zap,
  Smartphone,
  Clock,
  Gamepad2,
  FileCode2,
  Search,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  TrendingUp,
  Cpu,
  Layers,
  Award,
} from "lucide-react";

export default function HomePage() {
  const { t, dir, formatPrice, lang } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [liveServices, setLiveServices] = useState<ServiceItem[] | null>(null);

  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.services?.length) {
          setLiveServices(data.services);
        }
      })
      .catch(() => {});
  }, []);

  const categories = [
    {
      id: "cat_frp",
      slug: "frp-bypass",
      title: lang === "ar" ? "تخطي حماية جوجل (FRP)" : "Google FRP Bypass",
      desc: lang === "ar" ? "تخطي وتصفير حساب جوجل فوري لكافة إصدارات أندرويد وسامسونج وشاومي" : "Instant FRP reset for all Android, Samsung, and Xiaomi models",
      icon: ShieldAlert,
      servicesCount: 18,
    },
    {
      id: "cat_boxes",
      slug: "box-activations",
      title: lang === "ar" ? "تفعيل واشتراكات البوكسات" : "Box & Tool Activations",
      desc: lang === "ar" ? "اشتراكات أصلية ومباشرة: UnlockTool, Chimera, Octoplus, Pandora, Z3X" : "Official activations for UnlockTool, Chimera, Octoplus, Pandora, Z3X",
      icon: Zap,
      servicesCount: 34,
    },
    {
      id: "cat_imei",
      slug: "imei-check-repair",
      title: lang === "ar" ? "فحص وإصلاح السيريال (IMEI)" : "IMEI Check & Repair",
      desc: lang === "ar" ? "تقارير GSX الرسمية للايفون، فحص الآيكلاود، والشبكات العالمية" : "Official GSX reports, iCloud status check, and carrier unlocks",
      icon: Smartphone,
      servicesCount: 22,
    },
    {
      id: "cat_rentals",
      slug: "tool-rentals",
      title: lang === "ar" ? "تأجير أدوات السوفت وير" : "Tool Remote Rentals",
      desc: lang === "ar" ? "استأجر أدوات الصيانة بالساعة أو اليوم عن بعد دون شراء اشتراك كامل" : "Rent premium dongles & software hourly via UltraViewer or USB",
      icon: Clock,
      servicesCount: 12,
    },
    {
      id: "cat_games",
      slug: "game-recharge",
      title: lang === "ar" ? "شحن الألعاب والبطاقات" : "Game Top-Up & Gift Cards",
      desc: lang === "ar" ? "شحن شدات ببجي، جواهر فري فاير، وبطاقات رقمية فوري بالمعرف" : "Instant game top-up for PUBG Mobile, Free Fire and digital vouchers",
      icon: Gamepad2,
      servicesCount: 15,
    },
    {
      id: "cat_vip",
      slug: "vip-firmware",
      title: lang === "ar" ? "فلاشات وملفات VIP" : "VIP Firmware & Dumps",
      desc: lang === "ar" ? "ملفات دامب نادرة، فلاشات إصلاح مجربة، ومخططات حصرية للأعضاء" : "Tested dump files, repair firmwares, and board schematics",
      icon: FileCode2,
      servicesCount: 450,
    },
  ];

  const popularServices: ServiceItem[] = [
    {
      id: "srv_frp_samsung",
      name_ar: "تخطي حساب جوجل سامسونج فوري (جميع الموديلات)",
      name_en: "Samsung FRP Instant Bypass (All Models)",
      description_ar: "إزالة حساب جوجل FRP لجميع هواتف سامسونج حتى أحدث حماية وأندرويد 14/15 بدون فتح الجهاز",
      notes_ar: "يعمل على أحدث حماية. أدخل السيريال وتأكد من كتابته بدقة",
      price: 12.00,
      price_egp: 600.00,
      delivery_time: "1 - 10 دقائق",
      required_fields: ["field_imei"],
    },
    {
      id: "srv_unlocktool_3m",
      name_ar: "تفعيل أداة UnlockTool - 3 شهور",
      name_en: "UnlockTool 3 Months Activation",
      description_ar: "تفعيل الحساب الرسمي لأداة UnlockTool لمدة 3 أشهر مع جميع التحديثات",
      notes_ar: "أدخل اسم المستخدم المسجل في موقع أداة UnlockTool",
      price: 20.00,
      price_egp: 1000.00,
      delivery_time: "فوري (1 - 5 دقائق)",
      required_fields: ["field_username"],
    },
    {
      id: "srv_chimera_pro",
      name_ar: "تفعيل Chimera Tool PRO - سنة كاملة",
      name_en: "Chimera Tool PRO 1 Year Activation",
      description_ar: "الاشتراك السنوي الشامل لأداة كايميرا برو لجميع الماركات",
      notes_ar: "يجب أن يكون الحساب مسجل ومفعل البريد في موقع Chimera",
      price: 125.00,
      price_egp: 6250.00,
      delivery_time: "5 - 15 دقيقة",
      required_fields: ["field_username"],
    },
    {
      id: "srv_apple_gsx_check",
      name_ar: "فحص شبكة وضمان أبل الرسمي (GSX Check)",
      name_en: "Apple Official GSX & Carrier Check",
      description_ar: "تقرير كامل ومفصل عن حالة الايفون: الشبكة المقفول عليها، حالة FMI، وتاريخ التفعيل",
      notes_ar: "تحتاج فقط رقم الـ IMEI 15 رقم",
      price: 1.50,
      price_egp: 75.00,
      delivery_time: "1 - 3 دقائق",
      required_fields: ["field_imei"],
    },
    {
      id: "srv_pubg_660_uc",
      name_ar: "شحن ببجي 660 شدة (UC) فوري",
      name_en: "PUBG Mobile 660 UC Instant",
      description_ar: "شحن فوري بالـ Player ID مباشرة داخل حساب اللعبة",
      notes_ar: "تأكد من كتابة الـ ID واسم اللاعب بشكل صحيح لتجنب الخطأ",
      price: 8.50,
      price_egp: 425.00,
      delivery_time: "فوري (1 دقيقة)",
      required_fields: ["field_player_id"],
    },
    {
      id: "srv_rental_unlocktool_2h",
      name_ar: "تأجير أداة UnlockTool لمدة ساعتين",
      name_en: "UnlockTool 2 Hours Remote Rental",
      description_ar: "استخدام كامل لأداة UnlockTool عبر UltraViewer لمدة ساعتين لإنهاء أجهزتك",
      notes_ar: "شغّل برنامج UltraViewer وأرسل بيانات الدخول في الطلب",
      price: 2.00,
      price_egp: 100.00,
      delivery_time: "فوري (خلال دقائق)",
      required_fields: ["field_ultraviewer"],
    },
  ];

  const currentServicesList = liveServices || popularServices;
  const filteredServices = searchQuery.trim()
    ? currentServicesList.filter(
        (s) =>
          s.name_ar.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.name_en.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : currentServicesList;

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 start-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute -top-10 end-10 w-72 h-72 bg-yellow-600/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold shadow-[0_0_20px_rgba(212,175,55,0.2)] animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.hero.badge}</span>
          </div>

          {/* Heading */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.15] text-white">
              {t.hero.title}{" "}
              <span className="block mt-2 bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(212,175,55,0.3)]">
                {t.hero.highlight}
              </span>
            </h1>
            <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              {t.hero.subtitle}
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 opacity-20 group-hover:opacity-40 blur transition duration-300" />
            <div className="relative flex items-center rounded-2xl bg-zinc-950 border border-amber-500/40 p-2 shadow-2xl">
              <Search className="w-5 h-5 text-amber-400 ms-3 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.hero.searchPlaceholder}
                className="w-full bg-transparent px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none"
              />
              <button
                type="button"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 text-xs font-black shadow-md hover:brightness-110 transition-all shrink-0"
              >
                بحث
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/services"
              className="px-7 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-zinc-950 font-black text-sm shadow-[0_0_30px_rgba(212,175,55,0.35)] hover:brightness-110 transition-all flex items-center gap-2"
            >
              <span>{t.hero.ctaServices}</span>
              <Arrow className="w-4 h-4" />
            </Link>
            <Link
              href="/dashboard/top-up"
              className="px-7 py-3 rounded-xl bg-zinc-900 border border-amber-500/30 hover:border-amber-400 text-amber-300 font-bold text-sm hover:bg-zinc-800 transition-all shadow-[0_0_15px_rgba(212,175,55,0.15)]"
            >
              {t.hero.ctaTopUp}
            </Link>
          </div>

          {/* Key Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-10">
            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-amber-500/20 backdrop-blur-sm">
              <div className="text-2xl font-black text-amber-300">48,290+</div>
              <div className="text-xs text-zinc-400 mt-1">{t.hero.statsOrders}</div>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-amber-500/20 backdrop-blur-sm">
              <div className="text-2xl font-black text-amber-300">99.4%</div>
              <div className="text-xs text-zinc-400 mt-1">{t.hero.statsSuccess}</div>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-amber-500/20 backdrop-blur-sm">
              <div className="text-2xl font-black text-amber-300">DHRU 2.0</div>
              <div className="text-xs text-zinc-400 mt-1">بروتوكول ربط فوري</div>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-amber-500/20 backdrop-blur-sm">
              <div className="text-2xl font-black text-amber-300">24 / 7</div>
              <div className="text-xs text-zinc-400 mt-1">{t.hero.statsSupport}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
              {t.categoriesSection.subtitle}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {t.categoriesSection.title}
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>{t.categoriesSection.viewAll}</span>
            <Arrow className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                href={`/services?category=${cat.slug}`}
                className="group relative p-6 rounded-2xl bg-zinc-950/80 border border-amber-500/20 hover:border-amber-400/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_35px_rgba(212,175,55,0.15)] flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 group-hover:bg-amber-500/20 transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-zinc-900 flex items-center justify-between text-xs">
                  <span className="text-amber-400/80 font-semibold">
                    {cat.servicesCount} خدمة نشطة
                  </span>
                  <span className="flex items-center gap-1 text-zinc-400 group-hover:text-amber-300 font-semibold transition-colors">
                    <span>تصفح</span>
                    <Arrow className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. POPULAR SERVICES WITH INSTANT ORDER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
            {t.popularSection.instantDelivery}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {t.popularSection.title}
          </h2>
          <p className="text-xs text-zinc-400">
            {t.popularSection.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const title = lang === "ar" ? service.name_ar : service.name_en;
            return (
              <div
                key={service.id}
                className="relative rounded-2xl bg-zinc-950/90 border border-amber-500/25 p-5 flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.5)] hover:border-amber-400/50 transition-all hover:shadow-[0_8px_30px_rgba(212,175,55,0.15)]"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {service.delivery_time}
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      #{service.id.replace("srv_", "")}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug">
                    {title}
                  </h3>
                  {service.description_ar && (
                    <p className="text-xs text-zinc-400 mt-2 line-clamp-2">
                      {service.description_ar}
                    </p>
                  )}
                </div>

                <div className="mt-5 pt-4 border-t border-zinc-900/90 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] text-zinc-400 block">السعر:</span>
                    <span className="text-lg font-black text-amber-300">
                      {formatPrice(service.price)}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedService(service)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 text-xs font-black shadow-md hover:brightness-110 transition-all flex items-center gap-1.5"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>{t.popularSection.orderBtn}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. VIP MEMBERSHIP TIERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-amber-500/30 relative overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.15)]">
          <div className="absolute top-0 end-0 w-96 h-96 bg-amber-500/10 blur-[100px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-1 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
                <Award className="w-3.5 h-3.5" />
                <span>اشتراكات كبار الفنيين VIP</span>
              </div>
              <h2 className="text-3xl font-black text-white">
                انضم لنادي النخبة واحصل على فلاشات نادرة يومياً
              </h2>
              <p className="text-xs text-zinc-400 leading-relaxed">
                تحميل غير محدود لملفات الدامب النادرة، فلاشات إصلاح الموت المفاجئ، وحسابات الدعم الفني الخاصة عبر سيرفرات فائقة السرعة.
              </p>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Silver Plan */}
              <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
                <h4 className="text-base font-bold text-zinc-200">الباقة الفضية (شهر)</h4>
                <div className="text-3xl font-black text-amber-300">
                  {formatPrice(15.00)} <span className="text-xs font-normal text-zinc-400">/ 30 يوم</span>
                </div>
                <ul className="text-xs text-zinc-400 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>تحميل حتى 100 فلاشة VIP مجربة</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>روابط مباشرة سريعة بدون إعلانات</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>دعم فني عبر التلجرام</span>
                  </li>
                </ul>
                <Link
                  href="/dashboard/top-up"
                  className="block text-center py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-bold text-zinc-200 transition-colors"
                >
                  اشترك الآن
                </Link>
              </div>

              {/* Royal Gold Plan */}
              <div className="relative p-6 rounded-2xl bg-zinc-950 border-2 border-amber-400 space-y-4 shadow-[0_0_30px_rgba(212,175,55,0.25)]">
                <div className="absolute -top-3 end-4 px-2.5 py-0.5 rounded-full bg-amber-400 text-zinc-950 text-[10px] font-black uppercase tracking-wider">
                  الأكثر توفيراً
                </div>
                <h4 className="text-base font-bold text-amber-300">الباقة الملكية السنوية</h4>
                <div className="text-3xl font-black text-amber-300">
                  {formatPrice(99.00)} <span className="text-xs font-normal text-zinc-400">/ سنة كاملة</span>
                </div>
                <ul className="text-xs text-zinc-300 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>تحميل لا محدود لجميع الفلاشات والدامب</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>أولوية قصوى لتنفيذ طلبات السيرفر</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>طلب فلاشات مخصصة غير متوفرة بالسوق</span>
                  </li>
                </ul>
                <Link
                  href="/dashboard/top-up"
                  className="block text-center py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 text-xs font-black shadow-lg hover:brightness-110 transition-all"
                >
                  اشتراك ملكي VIP
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Order Modal */}
      <OrderModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        userBalance={45.0}
      />
    </div>
  );
}
