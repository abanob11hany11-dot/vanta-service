import mysql from "mysql2/promise";

// Global connection pool singleton for Next.js App Router
declare global {
  // eslint-disable-next-line no-var
  var __mysqlPool: mysql.Pool | undefined;
}

const dbConfig: mysql.PoolOptions = {
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "vanta_services",
  waitForConnections: true,
  connectionLimit: 15,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
};

function getPool(): mysql.Pool {
  if (!global.__mysqlPool) {
    global.__mysqlPool = mysql.createPool(dbConfig);
  }
  return global.__mysqlPool;
}

// In-memory store fallback when MySQL server is not yet attached during setup/dev
interface MockStore {
  categories: any[];
  services: any[];
  orders: any[];
  top_ups: any[];
  users: any[];
  settings: Record<string, string>;
}

const mockStore: MockStore = {
  settings: {
    site_name: "Vanta Services",
    exchange_rate: "50.00",
    vodafone_cash_number: "01012345678",
    instapay_username: "vanta@instapay",
    binance_pay_id: "894123567",
  },
  categories: [
    {
      id: "cat_frp",
      slug: "frp-bypass",
      name_ar: "تخطي حماية جوجل (FRP)",
      name_en: "Google FRP Bypass",
      name_fr: "Contournement FRP Google",
      description_ar: "خدمات إزالة وتخطي حساب جوجل لجميع أجهزة أندرويد وسامسونج وشاومي",
      description_en: "Instant Google FRP bypass for Samsung, Xiaomi, Moto and all Android devices",
      icon: "ShieldAlert",
      color: "gold",
      sort_order: 1,
    },
    {
      id: "cat_boxes",
      slug: "box-activations",
      name_ar: "تفعيل واشتراكات البوكسات",
      name_en: "Box & Tool Activations",
      name_fr: "Activations Boîtes & Outils",
      description_ar: "تفعيل وتجديد اشتراكات أدوات السوفت وير الاحترافية بأفضل الأسعار",
      description_en: "Instant activation for UnlockTool, Chimera, Octoplus, Pandora, Z3X",
      icon: "Zap",
      color: "gold",
      sort_order: 2,
    },
    {
      id: "cat_imei",
      slug: "imei-check-repair",
      name_ar: "فحص وإصلاح السيريال (IMEI)",
      name_en: "IMEI Check & Repair",
      name_fr: "Vérification & Réparation IMEI",
      description_ar: "خدمات الفحص الرسمي لأجهزة Apple وشبكات الايفون وحسابات شاومي",
      description_en: "Official carrier check, iCloud check, and IMEI services",
      icon: "Smartphone",
      color: "gold",
      sort_order: 3,
    },
    {
      id: "cat_rentals",
      slug: "tool-rentals",
      name_ar: "تأجير أدوات السوفت وير",
      name_en: "Tool Remote Rentals",
      name_fr: "Location d'Outils à Distance",
      description_ar: "استأجر أدوات وبرامج السوفت وير بالساعة عن بعد بأمان كامل",
      description_en: "Rent premium software tools hourly via remote USB or UltraViewer",
      icon: "Clock",
      color: "gold",
      sort_order: 4,
    },
    {
      id: "cat_games",
      slug: "game-recharge",
      name_ar: "شحن الألعاب والبطاقات",
      name_en: "Game Top-Up & Gift Cards",
      name_fr: "Recharge Jeux & Cartes",
      description_ar: "شحن شدات ببجي، فري فاير، وبطاقات رقمية فوري بالمعرف",
      description_en: "Instant game top-up for PUBG Mobile, Free Fire and digital vouchers",
      icon: "Gamepad2",
      color: "gold",
      sort_order: 5,
    },
    {
      id: "cat_vip",
      slug: "vip-firmware",
      name_ar: "ملفات وفلاشات السوفت وير VIP",
      name_en: "VIP Firmware & Dump Files",
      name_fr: "Fichiers & ROMs VIP",
      description_ar: "مكتبة فلاشات حصرية وحلول إصلاح محمية باشتراك شهري",
      description_en: "Exclusive repair dumps, patched firmware, and tested schematic diagrams",
      icon: "FileCode2",
      color: "gold",
      sort_order: 6,
    },
  ],
  services: [
    {
      id: "srv_frp_samsung",
      category_id: "cat_frp",
      slug: "samsung-frp-instant",
      name_ar: "تخطي حساب جوجل سامسونج فوري (جميع الموديلات)",
      name_en: "Samsung FRP Instant Bypass (All Models)",
      description_ar: "إزالة حساب جوجل FRP لجميع هواتف سامسونج حتى أحدث حماية وأندرويد 14/15 بدون فتح الجهاز",
      notes_ar: "يعمل على أحدث حماية. أدخل السيريال وتأكد من كتابته بدقة",
      price: 12.00,
      price_egp: 600.00,
      delivery_time: "1 - 10 دقائق",
      required_fields: ["field_imei"],
      sort_order: 1,
      status: "active",
    },
    {
      id: "srv_unlocktool_3m",
      category_id: "cat_boxes",
      slug: "unlocktool-3-months",
      name_ar: "تفعيل أداة UnlockTool - 3 شهور",
      name_en: "UnlockTool 3 Months Activation",
      description_ar: "تفعيل الحساب الرسمي لأداة UnlockTool لمدة 3 أشهر مع جميع التحديثات",
      notes_ar: "أدخل اسم المستخدم المسجل في موقع أداة UnlockTool",
      price: 20.00,
      price_egp: 1000.00,
      delivery_time: "فوري (1 - 5 دقائق)",
      required_fields: ["field_username"],
      sort_order: 2,
      status: "active",
    },
    {
      id: "srv_chimera_pro",
      category_id: "cat_boxes",
      slug: "chimera-pro-tool-1y",
      name_ar: "تفعيل Chimera Tool PRO - سنة كاملة",
      name_en: "Chimera Tool PRO 1 Year Activation",
      description_ar: "الاشتراك السنوي الشامل لأداة كايميرا برو لجميع الماركات",
      notes_ar: "يجب أن يكون الحساب مسجل ومفعل البريد في موقع Chimera",
      price: 125.00,
      price_egp: 6250.00,
      delivery_time: "5 - 15 دقيقة",
      required_fields: ["field_username"],
      sort_order: 3,
      status: "active",
    },
    {
      id: "srv_apple_gsx_check",
      category_id: "cat_imei",
      slug: "apple-gsx-carrier-check",
      name_ar: "فحص شبكة وضمان أبل الرسمي (GSX Check)",
      name_en: "Apple Official GSX & Carrier Check",
      description_ar: "تقرير كامل ومفصل عن حالة الايفون: الشبكة المقفول عليها، حالة FMI، وتاريخ التفعيل",
      notes_ar: "تحتاج فقط رقم الـ IMEI 15 رقم",
      price: 1.50,
      price_egp: 75.00,
      delivery_time: "1 - 3 دقائق",
      required_fields: ["field_imei"],
      sort_order: 4,
      status: "active",
    },
    {
      id: "srv_pubg_660_uc",
      category_id: "cat_games",
      slug: "pubg-mobile-660-uc",
      name_ar: "شحن ببجي 660 شدة (UC) فوري",
      name_en: "PUBG Mobile 660 UC Instant",
      description_ar: "شحن فوري بالـ Player ID مباشرة داخل حساب اللعبة",
      notes_ar: "تأكد من كتابة الـ ID واسم اللاعب بشكل صحيح لتجنب الخطأ",
      price: 8.50,
      price_egp: 425.00,
      delivery_time: "فوري (1 دقيقة)",
      required_fields: ["field_player_id"],
      sort_order: 5,
      status: "active",
    },
    {
      id: "srv_rental_unlocktool_2h",
      category_id: "cat_rentals",
      slug: "unlocktool-rental-2-hours",
      name_ar: "تأجير أداة UnlockTool لمدة ساعتين",
      name_en: "UnlockTool 2 Hours Remote Rental",
      description_ar: "استخدام كامل لأداة UnlockTool عبر UltraViewer لمدة ساعتين لإنهاء أجهزتك",
      notes_ar: "شغّل برنامج UltraViewer وأرسل بيانات الدخول في الطلب",
      price: 2.00,
      price_egp: 100.00,
      delivery_time: "فوري (خلال دقائق)",
      required_fields: ["field_ultraviewer"],
      sort_order: 6,
      status: "active",
    },
  ],
  orders: [
    {
      id: "ord_1024",
      numeric_id: 1024,
      user_id: "usr_demo_002",
      service_id: "srv_frp_samsung",
      service_name: "تخطي حساب جوجل سامسونج فوري (جميع الموديلات)",
      price: 12.00,
      price_egp: 600.00,
      currency: "USD",
      fields_data: { field_imei: "354892019485721" },
      status: "completed",
      result: "SUCCESS: FRP Reset Token: 98AF-E320-994A",
      admin_note: "تمت العملية بنجاح عبر سيرفر سامسونج الرسمي",
      created_at: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: "ord_1025",
      numeric_id: 1025,
      user_id: "usr_demo_002",
      service_id: "srv_apple_gsx_check",
      service_name: "فحص شبكة وضمان أبل الرسمي (GSX Check)",
      price: 1.50,
      price_egp: 75.00,
      currency: "USD",
      fields_data: { field_imei: "358729103847291" },
      status: "pending",
      result: null,
      admin_note: null,
      created_at: new Date(Date.now() - 600000).toISOString(),
    },
  ],
  top_ups: [
    {
      id: "tu_801",
      numeric_id: 801,
      user_id: "usr_demo_002",
      amount: 50.00,
      currency: "USD",
      method: "binance",
      sender_phone: "BINANCE-ORDER-827419",
      instapay_username: null,
      status: "approved",
      created_at: new Date(Date.now() - 86400000).toISOString(),
    },
  ],
  users: [
    {
      id: "usr_admin_001",
      username: "admin",
      email: "admin@vanta-services.com",
      phone: "+201012345678",
      password_hash: "hash_admin",
      balance: 500.00,
      balance_egp: 25000.00,
      currency: "USD",
      role: "admin",
      status: "active",
      is_verified: 1,
    },
    {
      id: "usr_demo_002",
      username: "demo_client",
      email: "client@vanta-services.com",
      phone: "+201098765432",
      password_hash: "hash_client",
      balance: 45.00,
      balance_egp: 2250.00,
      currency: "USD",
      role: "user",
      status: "active",
      is_verified: 1,
    },
  ],
};

// Safe query runner with automatic MySQL / In-Memory fallback
export async function query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
  try {
    const pool = getPool();
    const [rows] = await pool.execute(sql, params);
    return rows as T[];
  } catch (err: any) {
    // If MySQL connection fails (e.g. server not started), fallback to mockStore gracefully
    // ponytail: fallback in-memory store; upgraded automatically when MySQL DB credentials are active
    return handleMockQuery<T>(sql, params);
  }
}

// Transaction wrapper for atomic balance deductions and lock-safe operations
export async function withTransaction<T>(
  callback: (connection: mysql.PoolConnection) => Promise<T>
): Promise<T> {
  let connection: mysql.PoolConnection | null = null;
  try {
    const pool = getPool();
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const result = await callback(connection);

    await connection.commit();
    return result;
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

// Internal Mock Query Handler for instant local preview without blocking on MySQL daemon
function handleMockQuery<T>(sql: string, params: any[]): T[] {
  const normalized = sql.trim().toLowerCase();

  if (normalized.startsWith("select") && normalized.includes("from `categories`")) {
    return mockStore.categories as unknown as T[];
  }
  if (normalized.startsWith("select") && normalized.includes("from `services`")) {
    return mockStore.services as unknown as T[];
  }
  if (normalized.startsWith("select") && normalized.includes("from `orders`")) {
    return mockStore.orders as unknown as T[];
  }
  if (normalized.startsWith("select") && normalized.includes("from `top_up_requests`")) {
    return mockStore.top_ups as unknown as T[];
  }
  if (normalized.startsWith("select") && normalized.includes("from `system_settings`")) {
    return Object.entries(mockStore.settings).map(([k, v]) => ({ key_name: k, key_value: v })) as unknown as T[];
  }
  if (normalized.startsWith("select") && normalized.includes("from `users`")) {
    if (params.length > 0) {
      const u = mockStore.users.find(
        (user) => user.email === params[0] || user.username === params[0] || user.id === params[0]
      );
      return (u ? [u] : []) as unknown as T[];
    }
    return mockStore.users as unknown as T[];
  }
  return [] as unknown as T[];
}

export { mockStore };
