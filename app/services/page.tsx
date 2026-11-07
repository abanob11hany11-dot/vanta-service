"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/components/LanguageContext";
import { OrderModal, ServiceItem } from "@/components/OrderModal";
import { Search, Zap, Clock, Filter, ShieldCheck, Loader2 } from "lucide-react";

export default function ServicesPage() {
  const { t, formatPrice, lang } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState<{ id: string; name_ar: string; name_en: string }[]>([
    { id: "all", name_ar: "جميع الخدمات", name_en: "All Services" },
  ]);

  const [allServices, setAllServices] = useState<(ServiceItem & { category_id: string })[]>([]);

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.services?.length) {
          setAllServices(data.services);
          if (data.categories?.length) {
            setCategories([
              { id: "all", name_ar: "جميع الخدمات", name_en: "All Services" },
              ...data.categories,
            ]);
          }
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

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
                  ? "bg-gradient-to-r from-[#C5A059] to-[#9E7D3B] text-zinc-950 shadow-md"
                  : "bg-zinc-900/80 border border-zinc-800 text-zinc-300 hover:border-[#C5A059]/40 hover:text-amber-200"
              }`}
            >
              {lang === "ar" ? c.name_ar : c.name_en}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#C5A059] absolute start-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث فوري..."
            className="w-full bg-zinc-900/90 border border-zinc-700/80 rounded-xl ps-9 pe-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-[#C5A059] focus:outline-none transition-colors"
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
              className="card-matte rounded-2xl p-5 flex flex-col justify-between"
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
                  <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                    {service.description_ar}
                  </p>
                )}
              </div>

              <div className="mt-5 pt-4 border-t border-zinc-900 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-zinc-400 block">السعر:</span>
                  <span className="text-lg font-black text-[#DFCA9B]">
                    {formatPrice(service.price)}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedService(service)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#9E7D3B] text-zinc-950 text-xs font-bold shadow-sm hover:brightness-105 transition-all flex items-center gap-1.5"
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
