"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageContext";
import {
  MessageCircle,
  Send,
  ShieldCheck,
  Zap,
  Users,
  Clock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export default function AboutPage() {
  const { t, dir } = useLanguage();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  const [settings, setSettings] = useState({
    whatsapp_group: "https://chat.whatsapp.com/demo",
    telegram_channel: "https://t.me/demo",
    facebook_page: "https://facebook.com/demo",
    contact_phone: "+201012345678",
  });

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings) {
          setSettings((prev) => ({ ...prev, ...data.settings }));
        }
      })
      .catch(() => {});
  }, []);

  const socialLinks = [
    {
      id: "whatsapp",
      name: "جروب مجتمع الواتساب VIP",
      description: "انضم لمجتمع فنيي الصيانة والمبرمجين لمتابعة التحديثات والعروض الحصرية والمساعدة اليومية.",
      url: settings.whatsapp_group,
      icon: MessageCircle,
      color: "from-emerald-500 to-green-600",
      btnText: "انضمام لمجموعة الواتساب",
    },
    {
      id: "telegram",
      name: "قناة التلجرام الرسمية",
      description: "إشعارات فورية بالخدمات الجديدة، تحديثات أسعار السيرفر، وسجلات الدعم الفني اللحظي.",
      url: settings.telegram_channel,
      icon: Send,
      color: "from-sky-500 to-blue-600",
      btnText: "متابعة قناة التلجرام",
    },
    {
      id: "facebook",
      name: "صفحة الفيسبوك الرسمية",
      description: "الصفحة المعتمدة لمنصة Vanta Services، شروحات فيديو، ومراجعات العملاء وتجارب الفنيين.",
      url: settings.facebook_page,
      icon: FacebookIcon,
      color: "from-blue-600 to-indigo-700",
      btnText: "زيارة صفحة الفيسبوك",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold shadow-[0_0_20px_rgba(212,175,55,0.2)]">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>منصة Vanta Services المعتمدة</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">
          حول منصة{" "}
          <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
            Vanta Services
          </span>
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
          المركز الأول المعتمد في الشرق الأوسط لخدمات السوفت وير وبرمجة الهواتف، تخطي حماية جوجل FRP، تفعيل واشتراكات بوكسات الصيانة الرسمية، وشحن الألعاب والعملات الرقمية بأعلى سرعة تنفيذ واستقرار بنسبة 100%.
        </p>
      </div>

      {/* Social Media Community Section */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
            قنوات التواصل والمجتمع
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            انضم إلى مجتمعنا الرسمي
          </h2>
          <p className="text-xs text-zinc-400">
            تواصل معنا وتابع آخر التحديثات والأخبار والعروض عبر منصاتنا الرسمية
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {socialLinks.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="relative rounded-3xl bg-zinc-950/90 border border-amber-500/25 p-7 flex flex-col justify-between shadow-[0_4px_30px_rgba(0,0,0,0.5)] hover:border-amber-400/60 transition-all hover:-translate-y-1 hover:shadow-[0_10px_35px_rgba(212,175,55,0.2)]"
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-5 shadow-lg`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.name}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 rounded-xl bg-zinc-900 border border-amber-500/30 hover:border-amber-400 text-amber-300 font-bold text-xs flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all shadow-md"
                >
                  <span>{item.btnText}</span>
                  <Arrow className="w-3.5 h-3.5" />
                </a>
              </div>
            );
          })}
        </div>
      </div>

      {/* Core Advantages */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-950 border border-amber-500/30 relative overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.15)]">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">تنفيذ فوري مؤتمت</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              ربط مباشر ببروتوكولات DHRU Fusion لمعالجة طلبات الفك والتفعيل خلال ثوانٍ معدودة دون تأخير.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">ضمان استرداد الرصيد 100%</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              إذا تعذر إتمام أي طلب من جهة السيرفر أو المزود، يُعاد المبلغ بالكامل فوراً لمحفظتك الرقمية.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">دعم فني مخصص</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              فريق دعم فني متمرس جاهز للإجابة على استفسارات الصيانة وفحص السيريال عبر قنوات التواصل على مدار الساعة.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
