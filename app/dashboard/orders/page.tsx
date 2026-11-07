"use client";

import React, { useState } from "react";
import { useLanguage } from "@/components/LanguageContext";
import {
  Clock,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  AlertTriangle,
  Search,
  Filter,
  X,
  Send,
} from "lucide-react";

interface OrderItem {
  id: number;
  service: string;
  category: string;
  inputs: Record<string, string>;
  price: number;
  currency: string;
  status: "pending" | "completed" | "rejected";
  result: string | null;
  adminNote?: string;
  date: string;
}

export default function UserOrdersPage() {
  const { t, formatPrice } = useLanguage();
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [reportingOrder, setReportingOrder] = useState<OrderItem | null>(null);
  const [problemText, setProblemText] = useState("");
  const [reportSent, setReportSent] = useState(false);

  const [orders] = useState<OrderItem[]>([
    {
      id: 1025,
      service: "فحص شبكة وضمان أبل الرسمي (GSX Check)",
      category: "فحص السيريال",
      inputs: { IMEI: "358729103847291" },
      price: 1.5,
      currency: "USD",
      status: "pending",
      result: null,
      date: "2026-11-06 21:10",
    },
    {
      id: 1024,
      service: "تخطي حساب جوجل سامسونج فوري (جميع الموديلات)",
      category: "تخطي حماية جوجل",
      inputs: { IMEI: "354892019485721" },
      price: 12.0,
      currency: "USD",
      status: "completed",
      result: "SUCCESS: Token 98AF-E320-994A",
      adminNote: "تمت المعالجة عبر سيرفر سامسونج الرسمي بنجاح",
      date: "2026-11-06 16:30",
    },
    {
      id: 1021,
      service: "شحن ببجي 660 شدة (UC) فوري",
      category: "شحن الألعاب",
      inputs: { "Player ID": "512948194" },
      price: 8.5,
      currency: "USD",
      status: "completed",
      result: "TXN#892147-PUBG-SUCCESS",
      date: "2026-11-05 20:15",
    },
    {
      id: 1018,
      service: "تفعيل أداة UnlockTool - 3 شهور",
      category: "تفعيل البوكسات",
      inputs: { Username: "gsm_technician_bebo" },
      price: 20.0,
      currency: "USD",
      status: "completed",
      result: "Account Activated until Feb 2027",
      date: "2026-11-03 12:00",
    },
    {
      id: 1012,
      service: "تخطي آيكلاود ايفون (iCloud Bypass Clean)",
      category: "فك الشبكات والآيكلاود",
      inputs: { IMEI: "359981273910294" },
      price: 35.0,
      currency: "USD",
      status: "rejected",
      result: null,
      adminNote: "الجهاز في وضعية Lost Mode وغير مدعوم، تم رد المبلغ لمحفظتك فوراً",
      date: "2026-11-01 18:45",
    },
  ]);

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSendReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!problemText.trim()) return;
    setReportSent(true);
    setTimeout(() => {
      setReportingOrder(null);
      setProblemText("");
      setReportSent(false);
    }, 1500);
  };

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = filterStatus === "all" || o.status === filterStatus;
    const matchesSearch =
      o.id.toString().includes(searchQuery) ||
      o.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      Object.values(o.inputs).some((val) => val.includes(searchQuery));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs text-[#C5A059] font-bold uppercase tracking-wider block">
            السجلات والعمليات
          </span>
          <h1 className="text-3xl font-black text-white">
            {t.dashboard.recentOrders}
          </h1>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap gap-2">
          {["all", "pending", "completed", "rejected"].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterStatus === st
                  ? "bg-gradient-to-r from-[#C5A059] to-[#9E7D3B] text-zinc-950 font-bold shadow-sm"
                  : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-[#DFCA9B]"
              }`}
            >
              {st === "all" && "الكل"}
              {st === "pending" && "قيد الانتظار"}
              {st === "completed" && "المكتملة"}
              {st === "rejected" && "المرفوضة"}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-[#C5A059] absolute start-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ابحث برقم الطلب #1024 أو السيريال أو اسم الخدمة..."
          className="w-full bg-zinc-900 border border-zinc-700 rounded-xl ps-9 pe-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-[#C5A059] focus:outline-none transition-colors"
        />
      </div>

      {/* Orders Table */}
      <div className="rounded-2xl bg-zinc-950 border border-white/[0.08] shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead>
              <tr className="bg-zinc-900/80 border-b border-zinc-800 text-zinc-400 text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4 text-start">رقم الطلب</th>
                <th className="py-3 px-4 text-start">الخدمة والتصنيف</th>
                <th className="py-3 px-4 text-start">بيانات الإدخال</th>
                <th className="py-3 px-4 text-start">السعر</th>
                <th className="py-3 px-4 text-start">الحالة</th>
                <th className="py-3 px-4 text-start">النتيجة / كود الفك</th>
                <th className="py-3 px-4 text-start">إجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-zinc-500">
                    {t.dashboard.noOrders}
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-zinc-900/50 transition-colors">
                    <td className="py-4 px-4 font-mono font-bold text-[#C5A059]">
                      #{ord.id}
                      <span className="block text-[10px] text-zinc-500 font-normal mt-0.5">
                        {ord.date}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-bold text-zinc-100 block">
                        {ord.service}
                      </span>
                      <span className="text-[10px] text-[#DFCA9B] font-medium">
                        {ord.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-mono text-zinc-300">
                      {Object.entries(ord.inputs).map(([k, v]) => (
                        <div key={k} className="text-[11px]">
                          <span className="text-zinc-500">{k}:</span> {v}
                        </div>
                      ))}
                    </td>
                    <td className="py-4 px-4 font-bold text-[#DFCA9B]">
                      {formatPrice(ord.price)}
                    </td>
                    <td className="py-4 px-4">
                      {ord.status === "completed" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-[10px]">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>مكتمل</span>
                        </span>
                      )}
                      {ord.status === "pending" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#DFCA9B] font-bold text-[10px]">
                          <Clock className="w-3 h-3 animate-spin" />
                          <span>قيد التنفيذ</span>
                        </span>
                      )}
                      {ord.status === "rejected" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-bold text-[10px]">
                          <XCircle className="w-3 h-3" />
                          <span>مرفوض ومسترد</span>
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      {ord.result ? (
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-emerald-300 bg-emerald-950/40 px-2 py-1 rounded border border-emerald-500/20 max-w-[220px] truncate">
                            {ord.result}
                          </span>
                          <button
                            onClick={() => copyToClipboard(ord.result!, ord.id)}
                            className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-[#DFCA9B] transition-colors"
                            title={t.dashboard.copyCode}
                          >
                            {copiedId === ord.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      ) : ord.status === "rejected" && ord.adminNote ? (
                        <span className="text-xs text-rose-300/80 line-clamp-2">
                          {ord.adminNote}
                        </span>
                      ) : (
                        <span className="text-zinc-600 font-mono">- قيد الفحص -</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => setReportingOrder(ord)}
                        className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-700 hover:border-[#C5A059]/50 text-[11px] text-zinc-300 hover:text-[#DFCA9B] transition-colors flex items-center gap-1"
                      >
                        <AlertTriangle className="w-3 h-3 text-[#C5A059]" />
                        <span>إبلاغ</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Problem Modal */}
      {reportingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-md rounded-2xl bg-zinc-950 border border-amber-500/40 p-6 shadow-2xl text-zinc-100">
            <button
              onClick={() => setReportingOrder(null)}
              className="absolute top-4 end-4 p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>إبلاغ عن مشكلة في الطلب #{reportingOrder.id}</span>
            </h3>
            <p className="text-xs text-zinc-400 mb-4">
              الخدمة: <strong className="text-amber-300">{reportingOrder.service}</strong>
            </p>

            {reportSent ? (
              <div className="text-center py-6 text-emerald-400 font-bold text-sm">
                تم إرسال بلاغك للإدارة بنجاح، سيتم الرد عليك في أقرب وقت!
              </div>
            ) : (
              <form onSubmit={handleSendReport} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    اشرح المشكلة بالتفصيل:
                  </label>
                  <textarea
                    rows={4}
                    value={problemText}
                    onChange={(e) => setProblemText(e.target.value)}
                    placeholder="مثال: الكود الناتج لم يعمل مع الهاتف، أو توقفت الأداة..."
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none"
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#9E7D3B] text-zinc-950 text-xs font-bold shadow-md hover:brightness-105 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>إرسال البلاغ</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setReportingOrder(null)}
                    className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-xs font-semibold text-zinc-300 hover:bg-zinc-800"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
