import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    // Read real categories from MySQL
    const categoriesRows = await query<any>(
      "SELECT id, name, description, sort_order FROM `service_categories` WHERE `status` = 'ACTIVE' OR `status` IS NULL ORDER BY `sort_order` ASC"
    );

    const categories = categoriesRows.map((cat: any) => ({
      id: String(cat.id),
      slug: `cat-${cat.id}`,
      name_ar: cat.name,
      name_en: cat.name,
      description_ar: cat.description || "خدمات وتفعيلات احترافية فورية",
      description_en: cat.description || "Professional instant activations",
      sort_order: cat.sort_order || 0,
    }));

    // Read real services from MySQL
    const servicesRows = await query<any>(
      "SELECT id, name, description, category_id, price_credits, execution_time, status, custom_fields FROM `services` WHERE `status` = 'ACTIVE' ORDER BY `id` ASC"
    );

    const services = servicesRows.map((srv: any) => {
      const priceUsd = parseFloat(srv.price_credits || "0");
      return {
        id: `srv_${srv.id}`,
        numeric_id: srv.id,
        category_id: String(srv.category_id),
        name_ar: srv.name,
        name_en: srv.name,
        description_ar: srv.description || srv.name,
        price: priceUsd,
        price_egp: Math.round(priceUsd * 50),
        delivery_time: srv.execution_time || "1 دقيقة (Instant)",
        required_fields: ["field_imei"],
        status: srv.status,
      };
    });

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
