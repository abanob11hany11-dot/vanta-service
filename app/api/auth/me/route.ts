import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ authenticated: false, user: null });
    }

    // Refresh live balance from MySQL accounts
    const rows = await query<any>(
      "SELECT id, email, display_name, role, status, credits FROM `accounts` WHERE id = ? LIMIT 1",
      [session.id]
    );

    const liveUser = rows[0];
    if (!liveUser || liveUser.status !== "ACTIVE") {
      return NextResponse.json({ authenticated: false, user: null });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: String(liveUser.id),
        email: liveUser.email,
        username: liveUser.display_name || session.username,
        role: (liveUser.role === "OWNER" || liveUser.role === "ADMIN" || liveUser.role === "admin") ? "admin" : "user",
        balance: parseFloat(liveUser.credits || "0"),
        currency: session.currency || "USD",
      },
    });
  } catch (err: any) {
    return NextResponse.json({ authenticated: false, error: err.message }, { status: 500 });
  }
}
