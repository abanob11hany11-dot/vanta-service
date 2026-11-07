import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { query } from "@/lib/db";
import { verifyPassword, signToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { identifier, password } = await req.json();

    if (!identifier || !password) {
      return NextResponse.json(
        { success: false, error: "يرجى إدخال البريد الإلكتروني وكلمة المرور" },
        { status: 400 }
      );
    }

    // Query real accounts from MySQL
    const rows = await query<any>(
      "SELECT id, email, display_name, password_hash, role, status, credits FROM `accounts` WHERE email = ? OR display_name = ? LIMIT 1",
      [identifier.trim(), identifier.trim()]
    );

    const user = rows[0];
    if (!user) {
      return NextResponse.json(
        { success: false, error: "بيانات تسجيل الدخول غير صحيحة" },
        { status: 401 }
      );
    }

    if (user.status !== "ACTIVE") {
      return NextResponse.json(
        { success: false, error: "هذا الحساب معلق، يرجى التواصل مع الإدارة" },
        { status: 403 }
      );
    }

    const isValid = await verifyPassword(password, user.password_hash);
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "بيانات تسجيل الدخول غير صحيحة" },
        { status: 401 }
      );
    }

    const userData = {
      id: String(user.id),
      email: user.email,
      username: user.display_name || user.email.split("@")[0],
      role: (user.role === "OWNER" || user.role === "ADMIN" || user.role === "admin") ? "admin" : "user",
      balance: parseFloat(user.credits || "0"),
      currency: "USD",
    };

    const token = await signToken(userData);

    const response = NextResponse.json({
      success: true,
      message: "تم تسجيل الدخول بنجاح",
      user: userData,
    });

    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 86400 * 7,
      path: "/",
    });

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "حدث خطأ أثناء تسجيل الدخول" },
      { status: 500 }
    );
  }
}
