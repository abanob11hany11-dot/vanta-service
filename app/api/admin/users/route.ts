import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const users = await query<any>(
      "SELECT id, email, display_name as name, role, status, CAST(credits AS DOUBLE) as credits FROM `accounts` ORDER BY id ASC"
    );
    return NextResponse.json({ success: true, users });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId, amountDelta } = await req.json();
    if (!userId || isNaN(Number(amountDelta))) {
      return NextResponse.json({ success: false, error: "معرف المستخدم والمبلغ مطلوبان" }, { status: 400 });
    }

    await query(
      "UPDATE `accounts` SET credits = GREATEST(0, credits + ?) WHERE id = ?",
      [Number(amountDelta), userId]
    );

    return NextResponse.json({ success: true, message: "تم تحديث الرصيد بنجاح" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
