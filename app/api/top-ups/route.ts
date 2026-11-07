import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { validateAmount, sanitizeText } from "@/lib/validator";

export async function GET() {
  try {
    const topups = await query("SELECT * FROM `top_up_requests` ORDER BY `created_at` DESC LIMIT 50");
    return NextResponse.json({ success: true, topups });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, currency = "USD", method, senderPhone, instapayUsername, binanceOrderId } = body;

    const amtCheck = validateAmount(amount);
    if (!amtCheck.isValid) {
      return NextResponse.json({ success: false, error: "المبلغ المدخل غير صالح" }, { status: 400 });
    }

    if (!["vodafone_cash", "instapay", "binance"].includes(method)) {
      return NextResponse.json({ success: false, error: "وسيلة الدفع غير معتمدة" }, { status: 400 });
    }

    const userId = "usr_demo_002";
    const topupId = `tu_${Date.now()}`;
    const numericId = Math.floor(800 + Math.random() * 200);

    await query(
      `INSERT INTO \`top_up_requests\` (\`id\`, \`numeric_id\`, \`user_id\`, \`amount\`, \`currency\`, \`method\`, \`sender_phone\`, \`instapay_username\`, \`status\`)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [
        topupId,
        numericId,
        userId,
        amtCheck.parsed,
        currency,
        method,
        sanitizeText(senderPhone || binanceOrderId || ""),
        sanitizeText(instapayUsername || ""),
      ]
    );

    return NextResponse.json({
      success: true,
      message: "تم تسجيل طلب الشحن بنجاح",
      numericId,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
