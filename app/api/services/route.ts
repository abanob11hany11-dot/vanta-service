import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const categories = await query("SELECT * FROM `categories` ORDER BY `sort_order` ASC");
    const services = await query("SELECT * FROM `services` WHERE `status` = 'active' ORDER BY `sort_order` ASC");

    return NextResponse.json({
      success: true,
      categories,
      services,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load services" },
      { status: 500 }
    );
  }
}
