"use client";

import React, { useState } from "react";
import { useLanguage } from "./LanguageContext";
import { validateImei, validatePlayerId } from "@/lib/validator";
import { X, ShieldCheck, AlertCircle, Clock, Zap, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export interface ServiceItem {
  id: string;
  name_ar: string;
  name_en: string;
  description_ar?: string;
  notes_ar?: string;
  price: number;
  price_egp: number;
  delivery_time: string;
  required_fields: string[];
}

interface OrderModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  userBalance?: number;
}

export function OrderModal({ service, onClose, userBalance = 45.0 }: OrderModalProps) {
  const { t, lang, formatPrice, currency } = useLanguage();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderResult, setOrderResult] = useState<{ success: boolean; message: string; orderId?: number } | null>(null);

  if (!service) return null;

  const title = lang === "ar" ? service.name_ar : service.name_en;
  const description = service.description_ar;
  const notes = service.notes_ar;

  const cost = currency === "EGP" ? service.price_egp : service.price;
  const hasSufficientBalance = userBalance >= service.price;

  const handleInputChange = (fieldKey: string, val: string) => {
    setFormData((prev) => ({ ...prev, [fieldKey]: val }));
    // Clear field-specific error
    if (errors[fieldKey]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[fieldKey];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Validate required fields
    if (service.required_fields.includes("field_imei")) {
      const imeiCheck = validateImei(formData["field_imei"] || "");
      if (!imeiCheck.isValid) {
        newErrors["field_imei"] = t.orderModal.imeiError;
      }
    }

    if (service.required_fields.includes("field_player_id")) {
      const playerCheck = validatePlayerId(formData["field_player_id"] || "");
      if (!playerCheck.isValid) {
        newErrors["field_player_id"] = "معرّف الحساب غير صالح";
      }
    }

    if (service.required_fields.includes("field_username")) {
      if (!formData["field_username"]?.trim()) {
        newErrors["field_username"] = "اسم الحساب / الإيميل مطلوب";
      }
    }

    if (service.required_fields.includes("field_ultraviewer")) {
      if (!formData["field_ultraviewer"]?.trim()) {
        newErrors["field_ultraviewer"] = "بيانات الاتصال عن بعد مطلوبة";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!hasSufficientBalance) {
      setErrors({ balance: t.orderModal.insufficientBalance });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: service.id,
          fieldsData: formData,
          currency: currency,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setOrderResult({
          success: true,
          message: t.orderModal.successMsg,
          orderId: data.numericId || 1026,
        });
      } else {
        setErrors({ general: data.error || "فشل إرسال الطلب للسيرفر" });
      }
    } catch {
      setErrors({ general: "تعذر الاتصال بالخادم، يرجى المحاولة لاحقاً" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-zinc-950 border border-white/[0.1] p-6 shadow-2xl text-zinc-100 overflow-hidden">
        {/* Top Gold Ambient Accent */}
        <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 end-4 p-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-[#DFCA9B] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {orderResult ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/40 flex items-center justify-center mx-auto text-[#DFCA9B] shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-[#DFCA9B]">
              {t.orderModal.successMsg}
            </h3>
            <p className="text-sm text-zinc-400">
              رقم طلبك: <span className="font-mono text-[#C5A059] font-bold">#{orderResult.orderId}</span>
            </p>
            <div className="pt-4 flex gap-3 justify-center">
              <Link
                href="/dashboard/orders"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#9E7D3B] text-zinc-950 font-bold text-sm shadow-md hover:brightness-105 transition-all"
              >
                متابعة الطلب في لوحتي
              </Link>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-sm font-semibold hover:bg-zinc-800 transition-colors"
              >
                {t.orderModal.closeBtn}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#C5A059] mb-1">
                <Zap className="w-4 h-4" />
                <span>{t.orderModal.title}</span>
              </div>
              <h2 className="text-lg font-bold text-white line-clamp-2">{title}</h2>
              {description && <p className="text-xs text-zinc-400 mt-1">{description}</p>}
            </div>

            {/* Price & Delivery badge bar */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/90 border border-white/[0.08]">
              <div>
                <span className="text-xs text-zinc-400 block">{t.orderModal.price}</span>
                <span className="text-lg font-black text-[#DFCA9B]">{formatPrice(service.price)}</span>
              </div>
              <div className="text-end">
                <span className="text-xs text-zinc-400 flex items-center gap-1 justify-end">
                  <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                  {service.delivery_time}
                </span>
                <span className="text-xs font-medium text-emerald-400 block mt-0.5">
                  {t.orderModal.yourBalance}: ${userBalance.toFixed(2)}
                </span>
              </div>
            </div>

            {notes && (
              <div className="p-2.5 rounded-lg bg-[#C5A059]/10 border border-[#C5A059]/20 text-xs text-[#DFCA9B]">
                <strong>تنبيه هـام: </strong>
                {notes}
              </div>
            )}

            {/* Dynamic Custom Fields */}
            <div className="space-y-3 pt-1">
              {service.required_fields.includes("field_imei") && (
                <div>
                  <label className="block text-xs font-bold text-zinc-200 mb-1">
                    {t.orderModal.imeiLabel} <span className="text-[#C5A059]">*</span>
                  </label>
                  <input
                    type="text"
                    maxLength={15}
                    placeholder="358491029384751"
                    value={formData["field_imei"] || ""}
                    onChange={(e) => handleInputChange("field_imei", e.target.value.replace(/\D/g, ""))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-[#C5A059] focus:outline-none text-sm font-mono tracking-widest text-white placeholder-zinc-500 transition-colors"
                  />
                  <span className="text-[11px] text-zinc-400 block mt-1">{t.orderModal.imeiHint}</span>
                  {errors["field_imei"] && (
                    <span className="text-xs text-rose-400 block mt-1">{errors["field_imei"]}</span>
                  )}
                </div>
              )}

              {service.required_fields.includes("field_player_id") && (
                <div>
                  <label className="block text-xs font-bold text-zinc-200 mb-1">
                    {t.orderModal.playerIdLabel} <span className="text-[#C5A059]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="512948194"
                    value={formData["field_player_id"] || ""}
                    onChange={(e) => handleInputChange("field_player_id", e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-[#C5A059] focus:outline-none text-sm font-mono text-white placeholder-zinc-500 transition-colors"
                  />
                  {errors["field_player_id"] && (
                    <span className="text-xs text-rose-400 block mt-1">{errors["field_player_id"]}</span>
                  )}
                </div>
              )}

              {service.required_fields.includes("field_username") && (
                <div>
                  <label className="block text-xs font-bold text-zinc-200 mb-1">
                    {t.orderModal.usernameLabel} <span className="text-[#C5A059]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="user@example.com"
                    value={formData["field_username"] || ""}
                    onChange={(e) => handleInputChange("field_username", e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-[#C5A059] focus:outline-none text-sm text-white placeholder-zinc-500 transition-colors"
                  />
                  {errors["field_username"] && (
                    <span className="text-xs text-rose-400 block mt-1">{errors["field_username"]}</span>
                  )}
                </div>
              )}

              {service.required_fields.includes("field_ultraviewer") && (
                <div>
                  <label className="block text-xs font-bold text-zinc-200 mb-1">
                    {t.orderModal.ultraviewerLabel} <span className="text-[#C5A059]">*</span>
                  </label>
                  <textarea
                    rows={2}
                    placeholder="ID: 84 920 182 | Pass: 1948"
                    value={formData["field_ultraviewer"] || ""}
                    onChange={(e) => handleInputChange("field_ultraviewer", e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-[#C5A059] focus:outline-none text-sm font-mono text-white placeholder-zinc-500 transition-colors"
                  />
                  {errors["field_ultraviewer"] && (
                    <span className="text-xs text-rose-400 block mt-1">{errors["field_ultraviewer"]}</span>
                  )}
                </div>
              )}
            </div>

            {/* Balance warning / error */}
            {errors.balance && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-between text-xs text-rose-300">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{errors.balance}</span>
                </div>
                <Link
                  href="/dashboard/top-up"
                  className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#C5A059] to-[#9E7D3B] text-zinc-950 font-bold hover:brightness-105 transition-all shrink-0"
                >
                  شحن المحفظة
                </Link>
              </div>
            )}

            {errors.general && (
              <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300">
                {errors.general}
              </div>
            )}

            {/* Actions */}
            <div className="pt-2 flex gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#9E7D3B] text-zinc-950 font-bold text-sm shadow-md hover:brightness-105 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{isSubmitting ? t.orderModal.submitting : t.orderModal.confirmBtn}</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 font-semibold text-sm transition-colors"
              >
                {t.orderModal.closeBtn}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
