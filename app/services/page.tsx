"use client";

import React, { useState } from "react";
import { useLanguage } from "@/components/LanguageContext";
import { OrderModal, ServiceItem } from "@/components/OrderModal";
import { Search, Zap, Clock, Filter, ShieldCheck } from "lucide-react";

export default function ServicesPage() {
  const { t, formatPrice, lang } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const categories = [
    { id: "all", name_ar: "جميع الخدمات", name_en: "All Services" },
    { id: "cat_frp", name_ar: "تخطي جوجل FRP", name_en: "FRP Bypass" },
    { id: "cat_boxes", name_ar: "تفعيل البوكسات", name_en: "Box Activations" },
    { id: "cat_imei", name_ar: "فحص السيريال", name_en: "IMEI Check" },
    { id: "cat_rentals", name_ar: "تأجير الأدوات", name_en: "Tool Rentals" },
    { id: "cat_games", name_ar: "شحن الألعاب", name_en: "Game Top-Up" },
  ];

  const allServices: (ServiceItem & { category_id: string })[] = [
    {
      id: "srv_frp_samsung",
      category_id: "cat_frp",
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
      category_id: "cat_boxes",
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
      category_id: "cat_boxes",
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
      category_id: "cat_imei",
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
      category_id: "cat_games",
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
      category_id: "cat_rentals",
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

  const filtered = allServices.filter((s) => {
    const matchesCat = selectedCategory === "all" || s.category_id === selectedCategory;
    const matchesSearch =
      s.name_ar.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name_en.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-white">
          دليل وكتالوج الخدمات
        </h1>
        <p className="text-xs text-zinc-400">
          تصفح كافة الخدمات المعتمدة مع التنفيذ الفوري والربط المباشر بسيرفرات الدعم
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === c.id
                  ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                  : "bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-amber-500/40 hover:text-amber-200"
              }`}
            >
              {lang === "ar" ? c.name_ar : c.name_en}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-amber-400 absolute start-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث فوري..."
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl ps-9 pe-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((service) => {
          const title = lang === "ar" ? service.name_ar : service.name_en;
          return (
            <div
              key={service.id}
              className="rounded-2xl bg-zinc-950 border border-amber-500/25 p-5 flex flex-col justify-between shadow-lg hover:border-amber-400/50 transition-all hover:shadow-[0_8px_30px_rgba(212,175,55,0.15)]"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-400" />
                    <span>{service.delivery_time}</span>
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">
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

              <div className="mt-5 pt-4 border-t border-zinc-900 flex items-center justify-between">
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
                  <span>طلب الآن</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <OrderModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        userBalance={45.0}
      />
    </div>
  );
}
