-- Vanta Services - MySQL Database Schema
-- GSM & Software Services Platform
-- Character set: utf8mb4 / Collation: utf8mb4_unicode_ci

CREATE DATABASE IF NOT EXISTS `vanta_services` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `vanta_services`;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(50) NOT NULL PRIMARY KEY,
  `username` VARCHAR(100) NOT NULL UNIQUE,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `phone` VARCHAR(50) DEFAULT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `balance` DECIMAL(12,2) NOT NULL DEFAULT 0.00 COMMENT 'USD Balance',
  `balance_egp` DECIMAL(12,2) NOT NULL DEFAULT 0.00 COMMENT 'EGP Balance',
  `currency` VARCHAR(10) NOT NULL DEFAULT 'USD',
  `role` ENUM('user', 'admin') NOT NULL DEFAULT 'user',
  `status` ENUM('active', 'suspended') NOT NULL DEFAULT 'active',
  `is_verified` TINYINT(1) NOT NULL DEFAULT 0,
  `otp_code` VARCHAR(10) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_users_role` (`role`),
  INDEX `idx_users_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Categories Table
CREATE TABLE IF NOT EXISTS `categories` (
  `id` VARCHAR(50) NOT NULL PRIMARY KEY,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `name_ar` VARCHAR(255) NOT NULL,
  `name_en` VARCHAR(255) NOT NULL,
  `name_fr` VARCHAR(255) DEFAULT NULL,
  `description_ar` TEXT DEFAULT NULL,
  `description_en` TEXT DEFAULT NULL,
  `icon` VARCHAR(50) NOT NULL DEFAULT 'Shield',
  `color` VARCHAR(50) NOT NULL DEFAULT 'gold',
  `image_url` TEXT DEFAULT NULL,
  `parent_id` VARCHAR(50) DEFAULT NULL,
  `sort_order` INT NOT NULL DEFAULT 0,
  `is_article_page` TINYINT(1) NOT NULL DEFAULT 0,
  `default_fields` JSON DEFAULT NULL,
  `show_in_sidebar` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_cat_sort` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Dynamic Custom Fields Table
CREATE TABLE IF NOT EXISTS `input_fields` (
  `id` VARCHAR(50) NOT NULL PRIMARY KEY,
  `name_ar` VARCHAR(255) NOT NULL,
  `name_en` VARCHAR(255) NOT NULL,
  `field_type` VARCHAR(50) NOT NULL DEFAULT 'text' COMMENT 'text, number, email, textarea, select',
  `hint_ar` VARCHAR(255) DEFAULT NULL,
  `hint_en` VARCHAR(255) DEFAULT NULL,
  `regex_pattern` VARCHAR(255) DEFAULT NULL,
  `is_required` TINYINT(1) NOT NULL DEFAULT 1,
  `dhru_param` VARCHAR(50) DEFAULT 'CUSTOMFIELD' COMMENT 'IMEI, PIN, MODELID, CUSTOMFIELD',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Services Table
CREATE TABLE IF NOT EXISTS `services` (
  `id` VARCHAR(50) NOT NULL PRIMARY KEY,
  `category_id` VARCHAR(50) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `name_ar` VARCHAR(255) NOT NULL,
  `name_en` VARCHAR(255) NOT NULL,
  `name_fr` VARCHAR(255) DEFAULT NULL,
  `description_ar` TEXT DEFAULT NULL,
  `description_en` TEXT DEFAULT NULL,
  `notes_ar` TEXT DEFAULT NULL,
  `price` DECIMAL(10,2) NOT NULL DEFAULT 0.00 COMMENT 'USD Price',
  `price_egp` DECIMAL(10,2) NOT NULL DEFAULT 0.00 COMMENT 'EGP Price',
  `delivery_time` VARCHAR(255) NOT NULL DEFAULT '1-15 Minutes',
  `required_fields` JSON DEFAULT NULL,
  `dhru_code` VARCHAR(100) DEFAULT NULL,
  `dhru_commission` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `dhru_auto_submit` TINYINT(1) NOT NULL DEFAULT 0,
  `status` ENUM('active', 'disabled') NOT NULL DEFAULT 'active',
  `sort_order` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_services_cat` (`category_id`),
  INDEX `idx_services_status` (`status`),
  CONSTRAINT `fk_services_cat` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Orders Table
CREATE TABLE IF NOT EXISTS `orders` (
  `id` VARCHAR(50) NOT NULL PRIMARY KEY,
  `numeric_id` INT AUTO_INCREMENT UNIQUE KEY,
  `user_id` VARCHAR(50) NOT NULL,
  `service_id` VARCHAR(50) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `price_egp` DECIMAL(10,2) NOT NULL,
  `currency` VARCHAR(10) NOT NULL DEFAULT 'USD',
  `fields_data` JSON NOT NULL,
  `status` ENUM('pending', 'completed', 'rejected') NOT NULL DEFAULT 'pending',
  `result` TEXT DEFAULT NULL,
  `admin_note` TEXT DEFAULT NULL,
  `dhru_order_id` VARCHAR(100) DEFAULT NULL,
  `dhru_status` VARCHAR(50) DEFAULT NULL,
  `dhru_auto` TINYINT(1) NOT NULL DEFAULT 0,
  `dhru_result` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_orders_user` (`user_id`),
  INDEX `idx_orders_status` (`status`),
  CONSTRAINT `fk_orders_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_orders_service` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Top-Up Requests Table
CREATE TABLE IF NOT EXISTS `top_up_requests` (
  `id` VARCHAR(50) NOT NULL PRIMARY KEY,
  `numeric_id` INT AUTO_INCREMENT UNIQUE KEY,
  `user_id` VARCHAR(50) NOT NULL,
  `amount` DECIMAL(10,2) NOT NULL,
  `currency` VARCHAR(10) NOT NULL DEFAULT 'USD',
  `method` ENUM('vodafone_cash', 'instapay', 'binance') NOT NULL,
  `sender_phone` VARCHAR(100) DEFAULT NULL,
  `instapay_username` VARCHAR(150) DEFAULT NULL,
  `receipt_image` LONGTEXT DEFAULT NULL,
  `status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  `extra_data` JSON DEFAULT NULL,
  `vf_order_id` VARCHAR(100) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_topup_user` (`user_id`),
  INDEX `idx_topup_status` (`status`),
  CONSTRAINT `fk_topup_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. VIP Packages & Subscriptions
CREATE TABLE IF NOT EXISTS `packages` (
  `id` VARCHAR(50) NOT NULL PRIMARY KEY,
  `name_ar` VARCHAR(255) NOT NULL,
  `name_en` VARCHAR(255) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `price_egp` DECIMAL(10,2) NOT NULL,
  `duration_days` INT NOT NULL DEFAULT 30,
  `description_ar` TEXT DEFAULT NULL,
  `description_en` TEXT DEFAULT NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `subscriptions` (
  `id` VARCHAR(50) NOT NULL PRIMARY KEY,
  `user_id` VARCHAR(50) NOT NULL,
  `package_id` VARCHAR(50) NOT NULL,
  `started_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expires_at` TIMESTAMP NOT NULL,
  `status` ENUM('active', 'expired') NOT NULL DEFAULT 'active',
  INDEX `idx_sub_user` (`user_id`),
  CONSTRAINT `fk_sub_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_sub_pkg` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. Articles Table
CREATE TABLE IF NOT EXISTS `articles` (
  `id` VARCHAR(50) NOT NULL PRIMARY KEY,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `title_ar` VARCHAR(255) NOT NULL,
  `title_en` VARCHAR(255) NOT NULL,
  `content_ar` MEDIUMTEXT NOT NULL,
  `content_en` MEDIUMTEXT DEFAULT NULL,
  `image_url` TEXT DEFAULT NULL,
  `category_id` VARCHAR(50) DEFAULT NULL,
  `is_vip` TINYINT(1) NOT NULL DEFAULT 0,
  `views_count` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_art_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. Notifications Table
CREATE TABLE IF NOT EXISTS `notifications` (
  `id` VARCHAR(50) NOT NULL PRIMARY KEY,
  `user_id` VARCHAR(50) DEFAULT NULL COMMENT 'NULL for admins, "all" for broadcast, or specific user_id',
  `title_ar` VARCHAR(255) NOT NULL,
  `title_en` VARCHAR(255) NOT NULL,
  `message_ar` TEXT NOT NULL,
  `message_en` TEXT DEFAULT NULL,
  `is_read` TINYINT(1) NOT NULL DEFAULT 0,
  `type` VARCHAR(50) NOT NULL DEFAULT 'info',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_notif_user` (`user_id`, `is_read`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. System Settings Table
CREATE TABLE IF NOT EXISTS `system_settings` (
  `key_name` VARCHAR(100) NOT NULL PRIMARY KEY,
  `key_value` TEXT NOT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- SEED DATA
INSERT IGNORE INTO `system_settings` (`key_name`, `key_value`) VALUES
('site_name', 'Vanta Services'),
('exchange_rate', '50.00'),
('vodafone_cash_number', '01012345678'),
('instapay_username', 'vanta@instapay'),
('binance_pay_id', '894123567'),
('dhru_api_url', 'https://dhru.example.com/api'),
('dhru_username', 'vanta_admin'),
('dhru_api_key', 'demo_dhru_api_key_123456');

-- Seed Input Fields
INSERT IGNORE INTO `input_fields` (`id`, `name_ar`, `name_en`, `field_type`, `hint_ar`, `hint_en`, `regex_pattern`, `dhru_param`) VALUES
('field_imei', 'رقم السيريال (IMEI)', 'IMEI Number', 'text', 'أدخل 15 رقم بدون فواصل', 'Enter 15 digits IMEI', '^[0-9]{15}$', 'IMEI'),
('field_player_id', 'معرف اللاعب (Player ID)', 'Player ID', 'text', 'أدخل معرف الحساب باللعبة', 'Enter your game account ID', '^[0-9a-zA-Z_-]{5,30}$', 'CUSTOMFIELD'),
('field_username', 'اسم المستخدم / الحساب', 'Username / Account', 'text', 'اسم حسابك المسجل لتفعيل الأداة', 'Your registered username for activation', '^[a-zA-Z0-9_.@-]{3,50}$', 'CUSTOMFIELD'),
('field_ultraviewer', 'بيانات UltraViewer / AnyDesk', 'UltraViewer ID & Pass', 'textarea', 'اكتب الـ ID و Password الخاص بالبرنامج', 'Write remote session ID and Password', NULL, 'CUSTOMFIELD');

-- Seed Categories
INSERT IGNORE INTO `categories` (`id`, `slug`, `name_ar`, `name_en`, `description_ar`, `description_en`, `icon`, `color`, `sort_order`) VALUES
('cat_frp', 'frp-bypass', 'تخطي حماية جوجل (FRP)', 'Google FRP Bypass', 'خدمات إزالة وتخطي حساب جوجل لجميع أجهزة أندرويد وسامسونج وشاومي', 'Instant Google FRP bypass for Samsung, Xiaomi, Moto and all Android devices', 'ShieldAlert', 'gold', 1),
('cat_boxes', 'box-activations', 'تفعيل واشتراكات البوكسات', 'Box & Tool Activations', 'تفعيل وتجديد اشتراكات أدوات السوفت وير الاحترافية بأفضل الأسعار', 'Instant activation for UnlockTool, Chimera, Octoplus, Pandora, Z3X', 'Zap', 'gold', 2),
('cat_imei', 'imei-check-repair', 'فحص وإصلاح السيريال (IMEI)', 'IMEI Check & Repair', 'خدمات الفحص الرسمي لأجهزة Apple وشبكات الايفون وحسابات شاومي', 'Official carrier check, iCloud check, and IMEI services', 'Smartphone', 'gold', 3),
('cat_rentals', 'tool-rentals', 'تأجير أدوات السوفت وير', 'Tool Remote Rentals', 'استأجر أدوات وبرامج السوفت وير بالساعة عن بعد بأمان كامل', 'Rent premium software tools hourly via remote USB or UltraViewer', 'Clock', 'gold', 4),
('cat_games', 'game-recharge', 'شحن الألعاب والبطاقات', 'Game Top-Up & Gift Cards', 'شحن شدات ببجي، فري فاير، وبطاقات رقمية فوري بالمعرف', 'Instant game top-up for PUBG Mobile, Free Fire and digital vouchers', 'Gamepad2', 'gold', 5),
('cat_vip', 'vip-firmware', 'ملفات وفلاشات السوفت وير VIP', 'VIP Firmware & Dump Files', 'مكتبة فلاشات حصرية وحلول إصلاح محمية باشتراك شهري', 'Exclusive repair dumps, patched firmware, and tested schematic diagrams', 'FileCode2', 'gold', 6);

-- Seed Services
INSERT IGNORE INTO `services` (`id`, `category_id`, `slug`, `name_ar`, `name_en`, `description_ar`, `notes_ar`, `price`, `price_egp`, `delivery_time`, `required_fields`, `sort_order`) VALUES
('srv_frp_samsung', 'cat_frp', 'samsung-frp-instant', 'تخطي حساب جوجل سامسونج فوري (جميع الموديلات)', 'Samsung FRP Instant Bypass (All Models)', 'إزالة حساب جوجل FRP لجميع هواتف سامسونج حتى أحدث حماية وأندرويد 14/15 بدون فتح الجهاز', 'يعمل على أحدث حماية. أدخل السيريال وتأكد من كتابته بدقة', 12.00, 600.00, '1 - 10 دقائق', '["field_imei"]', 1),
('srv_unlocktool_3m', 'cat_boxes', 'unlocktool-3-months', 'تفعيل أداة UnlockTool - 3 شهور', 'UnlockTool 3 Months Activation', 'تفعيل الحساب الرسمي لأداة UnlockTool لمدة 3 أشهر مع جميع التحديثات', 'أدخل اسم المستخدم المسجل في موقع أداة UnlockTool', 20.00, 1000.00, 'فوري (1 - 5 دقائق)', '["field_username"]', 2),
('srv_chimera_pro', 'cat_boxes', 'chimera-pro-tool-1y', 'تفعيل Chimera Tool PRO - سنة كاملة', 'Chimera Tool PRO 1 Year Activation', 'الاشتراك السنوي الشامل لأداة كايميرا برو لجميع الماركات', 'يجب أن يكون الحساب مسجل ومفعل البريد في موقع Chimera', 125.00, 6250.00, '5 - 15 دقيقة', '["field_username"]', 3),
('srv_apple_gsx_check', 'cat_imei', 'apple-gsx-carrier-check', 'فحص شبكة وضمان أبل الرسمي (GSX Check)', 'Apple Official GSX & Carrier Check', 'تقرير كامل ومفصل عن حالة الايفون: الشبكة المقفول عليها، حالة FMI، وتاريخ التفعيل', 'تحتاج فقط رقم الـ IMEI 15 رقم', 1.50, 75.00, '1 - 3 دقائق', '["field_imei"]', 4),
('srv_pubg_660_uc', 'cat_games', 'pubg-mobile-660-uc', 'شحن ببجي 660 شدة (UC) فوري', 'PUBG Mobile 660 UC Instant', 'شحن فوري بالـ Player ID مباشرة داخل حساب اللعبة', 'تأكد من كتابة الـ ID واسم اللاعب بشكل صحيح لتجنب الخطأ', 8.50, 425.00, 'فوري (1 دقيقة)', '["field_player_id"]', 5),
('srv_rental_unlocktool_2h', 'cat_rentals', 'unlocktool-rental-2-hours', 'تأجير أداة UnlockTool لمدة ساعتين', 'UnlockTool 2 Hours Remote Rental', 'استخدام كامل لأداة UnlockTool عبر UltraViewer لمدة ساعتين لإنهاء أجهزتك', 'شغّل برنامج UltraViewer وأرسل بيانات الدخول في الطلب', 2.00, 100.00, 'فوري (خلال دقائق)', '["field_ultraviewer"]', 6);

-- Seed VIP Packages
INSERT IGNORE INTO `packages` (`id`, `name_ar`, `name_en`, `price`, `price_egp`, `duration_days`, `description_ar`, `description_en`) VALUES
('pkg_silver_monthly', 'الباقة الفضية (شهر)', 'Silver VIP (1 Month)', 15.00, 750.00, 30, 'تحميل حتى 100 فلاشة VIP + دعم فني مخصص', 'Download up to 100 VIP files + Dedicated technical support'),
('pkg_gold_annual', 'الباقة الذهبية الملكية (سنة)', 'Royal Gold VIP (1 Year)', 99.00, 4950.00, 365, 'تحميل لا محدود لجميع الفلاشات الحصرية، ملفات دامب النادرة، وسيرفر خاص', 'Unlimited access to all VIP dumps, patched files, and high-speed mirrors');

-- Seed Admin User (password: Admin@Vanta2026!)
-- Hash: Bcrypt hash of Admin@Vanta2026!
INSERT IGNORE INTO `users` (`id`, `username`, `email`, `phone`, `password_hash`, `balance`, `balance_egp`, `currency`, `role`, `status`, `is_verified`) VALUES
('usr_admin_001', 'admin', 'admin@vanta-services.com', '+201012345678', '$2b$12$eX8V53xQpU7zT1W3jT7Y9eD8z9M7xM4X2R5T8W1Q0L9K6J3H2G1F0', 500.00, 25000.00, 'USD', 'admin', 'active', 1),
('usr_demo_002', 'demo_client', 'client@vanta-services.com', '+201098765432', '$2b$12$eX8V53xQpU7zT1W3jT7Y9eD8z9M7xM4X2R5T8W1Q0L9K6J3H2G1F0', 45.00, 2250.00, 'USD', 'user', 'active', 1);
