import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vanta Services | سيرفر خدمات السوفت وير وبرمجة الهواتف",
  description:
    "المنصة الاحترافية الأولى لخدمات الـ GSM، تخطي حسابات جوجل FRP، تفعيل واشتراكات البوكسات، شحن الألعاب، وفحص السيريال الرسمي عبر سيرفر DHRU الفوري.",
  themeColor: "#d4af37",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${inter.variable} dark`}>
      <body className="min-h-screen flex flex-col bg-[#070709] text-zinc-100 font-sans selection:bg-amber-500/30 selection:text-amber-200">
        <LanguageProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
