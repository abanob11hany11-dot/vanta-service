import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const rows = await query<any>("SELECT setting_key, setting_value FROM `platform_settings`");
    const settings: Record<string, string> = {
      whatsapp_group: "https://chat.whatsapp.com/demo-vanta",
      telegram_channel: "https://t.me/vanta_services_official",
      facebook_page: "https://facebook.com/vanta.services",
      exchange_rate: "50.00",
      vodafone_cash_number: "01012345678",
      instapay_username: "vanta@instapay",
      binance_pay_id: "894123567",
      contact_phone: "+201012345678",
      site_name: "Vanta Services",
    };

    rows.forEach((r: any) => {
      let val = r.setting_value;
      if (typeof val === "string") {
        try {
          const parsed = JSON.parse(val);
          val = typeof parsed === "string" ? parsed : val;
        } catch {}
      }
      settings[r.setting_key] = String(val);
    });

    return NextResponse.json({ success: true, settings });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const entries = Object.entries(body);

    for (const [key, value] of entries) {
      const valStr = typeof value === "object" ? JSON.stringify(value) : String(value);
      await query(
        `INSERT INTO \`platform_settings\` (\`setting_key\`, \`setting_value\`)
         VALUES (?, ?)
         ON DUPLICATE KEY UPDATE \`setting_value\` = ?`,
        [key, valStr, valStr]
      );
    }

    return NextResponse.json({ success: true, message: "تم حفظ الإعدادات بنجاح" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
