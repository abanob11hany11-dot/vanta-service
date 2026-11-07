import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { validateImei, sanitizeText } from "@/lib/validator";
import { dhru } from "@/lib/dhru";

export async function GET() {
  try {
    const orders = await query(
      "SELECT * FROM `orders` ORDER BY `created_at` DESC LIMIT 50"
    );
    return NextResponse.json({ success: true, orders });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { serviceId, fieldsData, currency = "USD" } = body;

    if (!serviceId) {
      return NextResponse.json(
        { success: false, error: "معرّف الخدمة مطلوب" },
        { status: 400 }
      );
    }

    // Lookup service
    const services = await query("SELECT * FROM `services` WHERE `id` = ? LIMIT 1", [serviceId]);
    const service = services[0];
    if (!service) {
      return NextResponse.json(
        { success: false, error: "الخدمة المطلوبة غير متوفرة" },
        { status: 404 }
      );
    }

    // Validate required fields
    const required = Array.isArray(service.required_fields)
      ? service.required_fields
      : JSON.parse(service.required_fields || "[]");

    if (required.includes("field_imei")) {
      const imeiCheck = validateImei(fieldsData?.["field_imei"]);
      if (!imeiCheck.isValid) {
        return NextResponse.json({ success: false, error: imeiCheck.error }, { status: 400 });
      }
    }

    // In a real session, retrieve userId from verified session cookie
    const userId = "usr_demo_002";
    const orderCost = currency === "EGP" ? service.price_egp : service.price;

    // Check user balance
    const users = await query("SELECT * FROM `users` WHERE `id` = ? LIMIT 1", [userId]);
    const user = users[0];
    if (user && user.balance < service.price) {
      return NextResponse.json(
        { success: false, error: "رصيدك غير كافٍ لإتمام هذا الطلب" },
        { status: 400 }
      );
    }

    // Submit to DHRU if configured
    let dhruOrderId: string | null = null;
    let dhruAuto = 0;
    if (service.dhru_auto_submit && service.dhru_code) {
      const dhruRes = await dhru.placeImeiOrder({
        serviceId: service.dhru_code,
        imei: fieldsData?.["field_imei"] || "",
        customFields: fieldsData,
      });
      if (dhruRes.success && dhruRes.remoteOrderId) {
        dhruOrderId = dhruRes.remoteOrderId;
        dhruAuto = 1;
      }
    }

    const orderId = `ord_${Date.now()}`;
    const numericId = Math.floor(1000 + Math.random() * 9000);

    // Save order
    await query(
      `INSERT INTO \`orders\` (\`id\`, \`numeric_id\`, \`user_id\`, \`service_id\`, \`price\`, \`price_egp\`, \`currency\`, \`fields_data\`, \`status\`, \`dhru_order_id\`, \`dhru_auto\`)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?)`,
      [
        orderId,
        numericId,
        userId,
        service.id,
        service.price,
        service.price_egp,
        currency,
        JSON.stringify(fieldsData),
        dhruOrderId,
        dhruAuto,
      ]
    );

    return NextResponse.json({
      success: true,
      message: "تم إنشاء الطلب بنجاح",
      orderId,
      numericId,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "حدث خطأ غير متوقع" },
      { status: 500 }
    );
  }
}
