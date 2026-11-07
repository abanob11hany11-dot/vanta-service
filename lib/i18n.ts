export type Language = "ar" | "en" | "fr";

export interface Translations {
  dir: "rtl" | "ltr";
  siteName: string;
  tagline: string;
  nav: {
    home: string;
    services: string;
    categories: string;
    vip: string;
    dashboard: string;
    orders: string;
    topUp: string;
    admin: string;
    login: string;
    register: string;
    logout: string;
    balance: string;
  };
  hero: {
    badge: string;
    title: string;
    highlight: string;
    subtitle: string;
    searchPlaceholder: string;
    statsOrders: string;
    statsSuccess: string;
    statsSupport: string;
    ctaServices: string;
    ctaTopUp: string;
  };
  categoriesSection: {
    title: string;
    subtitle: string;
    viewAll: string;
  };
  popularSection: {
    title: string;
    subtitle: string;
    instantDelivery: string;
    orderBtn: string;
  };
  orderModal: {
    title: string;
    instructions: string;
    imeiLabel: string;
    imeiHint: string;
    imeiError: string;
    playerIdLabel: string;
    usernameLabel: string;
    ultraviewerLabel: string;
    price: string;
    yourBalance: string;
    confirmBtn: string;
    submitting: string;
    successMsg: string;
    insufficientBalance: string;
    closeBtn: string;
  };
  topUp: {
    title: string;
    subtitle: string;
    vodafone: string;
    instapay: string;
    binance: string;
    amountLabel: string;
    senderPhone: string;
    instapayUser: string;
    binanceOrderId: string;
    timerRemaining: string;
    submitRequest: string;
    successNotice: string;
  };
  dashboard: {
    welcome: string;
    balanceTitle: string;
    toggleCurrency: string;
    recentOrders: string;
    orderId: string;
    serviceName: string;
    status: string;
    result: string;
    copyCode: string;
    copied: string;
    reportProblem: string;
    noOrders: string;
  };
  admin: {
    title: string;
    totalUsers: string;
    totalOrders: string;
    pendingOrders: string;
    pendingTopups: string;
    approve: string;
    reject: string;
    resultInput: string;
    syncDhru: string;
    exchangeRate: string;
    saveSettings: string;
  };
  footer: {
    desc: string;
    quickLinks: string;
    support: string;
    telegram: string;
    whatsapp: string;
    terms: string;
    disclaimer: string;
    copyright: string;
  };
}

export const translations: Record<Language, Translations> = {
  ar: {
    dir: "rtl",
    siteName: "Vanta Services",
    tagline: "سيرفر خدمات السوفت وير وبرمجة الهواتف والمحفظة الرقمية",
    nav: {
      home: "الرئيسية",
      services: "الخدمات",
      categories: "الأقسام",
      vip: "باقات VIP",
      dashboard: "لوحة التحكم",
      orders: "طلباتي",
      topUp: "شحن الرصيد",
      admin: "لوحة الإدارة",
      login: "تسجيل الدخول",
      register: "إنشاء حساب",
      logout: "تسجيل الخروج",
      balance: "الرصيد",
    },
    hero: {
      badge: "المنصة الأولى المعتمدة لخدمات الـ GSM وبرمجة الهواتف ⚡",
      title: "مركز التحكم الفوري لخدمات",
      highlight: "السوفت وير وفك الحمايات",
      subtitle: "تخطي حسابات جوجل FRP، تفعيل واشتراكات البوكسات، شحن الألعاب، وفحص السيريال عبر أسرع سيرفر DHRU عالمي.",
      searchPlaceholder: "ابحث عن خدمة، موديل هاتف (Samsung, Xiaomi, iPhone) أو كود...",
      statsOrders: "طلب مكتمل",
      statsSuccess: "نسبة النجاح الفوري",
      statsSupport: "دعم فني مباشر",
      ctaServices: "تصفح جميع الخدمات",
      ctaTopUp: "شحن الرصيد الفوري",
    },
    categoriesSection: {
      title: "أقسام الخدمات الرقمية",
      subtitle: "تصنيفات منظمة تغطي كافة احتياجات فنيي الصيانة والمبرمجين",
      viewAll: "عرض كل الخدمات",
    },
    popularSection: {
      title: "الخدمات الأكثر طلباً اليوم",
      subtitle: "تنفيذ فوري مؤتمت بأعلى نسبة نجاح وأفضل أسعار الجملة",
      instantDelivery: "تنفيذ فوري",
      orderBtn: "طلب الخدمة الآن",
    },
    orderModal: {
      title: "طلب خدمة:",
      instructions: "يرجى ملء البيانات المطلوبة بدقة لضمان سرعة المعالجة الفورية.",
      imeiLabel: "رقم السيريال (IMEI 15 رقماً)",
      imeiHint: "اطلب *#06# في الهاتف واكتب أول 15 رقماً بدون فواصل",
      imeiError: "يجب أن يتكون رقم الـ IMEI من 15 رقماً صحيحاً",
      playerIdLabel: "معرّف الحساب / رقم اللاعب (Player ID)",
      usernameLabel: "اسم المستخدم / الإيميل المسجل بالأداة",
      ultraviewerLabel: "بيانات UltraViewer / AnyDesk (ID & Password)",
      price: "سعر الخدمة:",
      yourBalance: "رصيدك المتاح:",
      confirmBtn: "تأكيد وخصم الطلب",
      submitting: "جارٍ إرسال الطلب للسيرفر...",
      successMsg: "تم إرسال طلبك بنجاح! يتم المعالجة الآن.",
      insufficientBalance: "رصيدك غير كافٍ! يرجى شحن المحفظة أولاً.",
      closeBtn: "إلغاء",
    },
    topUp: {
      title: "شحن رصيد المحفظة",
      subtitle: "اشحن رصيدك بالدولار أو الجنيه المصري عبر 3 بوابات دفع سريعة وآمنة",
      vodafone: "فودافون كاش (تحقق آلي)",
      instapay: "إنستا باي (InstaPay)",
      binance: "باينانس باي (Binance USDT)",
      amountLabel: "المبلغ المراد شحنه",
      senderPhone: "الرقم المحول منه",
      instapayUser: "اسم حسابك على إنستا باي",
      binanceOrderId: "معرف الطلب (Binance Order ID)",
      timerRemaining: "الوقت المتبقي لتأكيد التحويل:",
      submitRequest: "تأكيد وإرسال طلب الشحن",
      successNotice: "تم تسجيل عملية الشحن بنجاح! سيتم إضافة الرصيد فور التحقق.",
    },
    dashboard: {
      welcome: "مرحباً بك مجدداً",
      balanceTitle: "رصيد المحفظة المتاح",
      toggleCurrency: "تبديل العملة (USD / EGP)",
      recentOrders: "سجل العمليات والطلبات الأخيرة",
      orderId: "رقم الطلب",
      serviceName: "اسم الخدمة",
      status: "الحالة",
      result: "النتيجة / كود الفك",
      copyCode: "نسخ الكود",
      copied: "تم النسخ!",
      reportProblem: "إبلاغ عن مشكلة",
      noOrders: "لا توجد طلبات منفذة حتى الآن.",
    },
    admin: {
      title: "لوحة تحكم الإدارة - Vanta Services",
      totalUsers: "إجمالي الأعضاء",
      totalOrders: "الطلبات المنفذة",
      pendingOrders: "طلبات معلقة تحتاج إجراء",
      pendingTopups: "إيداعات قيد المراجعة",
      approve: "موافقة وإكمال",
      reject: "رفض واسترداد الرصيد",
      resultInput: "أدخل كود الفك أو نص النتيجة للعميل...",
      syncDhru: "مزامنة سيرفر DHRU",
      exchangeRate: "سعر الصرف (1 USD = ? EGP)",
      saveSettings: "حفظ الإعدادات",
    },
    footer: {
      desc: "Vanta Services - المنصة الرائدة في خدمات وبرمجيات الهواتف المحمولة وتخطي الحمايات وتفعيل الأدوات الاحترافية.",
      quickLinks: "روابط سريعة",
      support: "الدعم الفني المباشر",
      telegram: "قناة التلجرام الرسمية",
      whatsapp: "خدمة العملاء واتساب",
      terms: "الشروط والأحكام",
      disclaimer: "إخلاء المسؤولية القانوني",
      copyright: "جميع الحقوق محفوظة © 2026 Vanta Services",
    },
  },
  en: {
    dir: "ltr",
    siteName: "Vanta Services",
    tagline: "GSM & Mobile Software Services, Unlocks & Digital Wallet Server",
    nav: {
      home: "Home",
      services: "Services",
      categories: "Categories",
      vip: "VIP Plans",
      dashboard: "Dashboard",
      orders: "My Orders",
      topUp: "Top-Up",
      admin: "Admin Panel",
      login: "Sign In",
      register: "Register",
      logout: "Sign Out",
      balance: "Balance",
    },
    hero: {
      badge: "The Premier Verified GSM & Mobile Unlock Server ⚡",
      title: "Instant Control Center for",
      highlight: "Software & Mobile Services",
      subtitle: "Google FRP Bypass, Box & Tool Activations, Game Top-Up, and Carrier IMEI Checks via Ultra-Fast Global DHRU Protocol.",
      searchPlaceholder: "Search services, device model (Samsung, Xiaomi, iPhone) or code...",
      statsOrders: "Completed Orders",
      statsSuccess: "Instant Success Rate",
      statsSupport: "Live Tech Support",
      ctaServices: "Explore All Services",
      ctaTopUp: "Top-Up Wallet",
    },
    categoriesSection: {
      title: "Digital Service Categories",
      subtitle: "Structured modules covering all technician and developer requirements",
      viewAll: "View All Services",
    },
    popularSection: {
      title: "Most Popular Services Today",
      subtitle: "Automated instant processing with top-tier success rates and wholesale pricing",
      instantDelivery: "Instant Delivery",
      orderBtn: "Order Service Now",
    },
    orderModal: {
      title: "Order Service:",
      instructions: "Please enter the required details carefully to ensure instant server processing.",
      imeiLabel: "IMEI Serial Number (15 Digits)",
      imeiHint: "Dial *#06# on the device and enter the 15 numeric digits",
      imeiError: "IMEI must be exactly 15 numeric digits",
      playerIdLabel: "Player ID / In-Game ID",
      usernameLabel: "Registered Account / Username",
      ultraviewerLabel: "UltraViewer / AnyDesk Credentials (ID & Password)",
      price: "Service Price:",
      yourBalance: "Available Balance:",
      confirmBtn: "Confirm & Submit Order",
      submitting: "Submitting to server...",
      successMsg: "Order submitted successfully! Currently processing.",
      insufficientBalance: "Insufficient balance! Please top-up your wallet first.",
      closeBtn: "Cancel",
    },
    topUp: {
      title: "Top-Up Prepaid Wallet",
      subtitle: "Fund your account in USD or EGP via 3 instant, verified payment gateways",
      vodafone: "Vodafone Cash (Auto-Check)",
      instapay: "InstaPay Egypt",
      binance: "Binance Pay (USDT)",
      amountLabel: "Amount to Deposit",
      senderPhone: "Sender Phone Number",
      instapayUser: "Your InstaPay Account Name",
      binanceOrderId: "Binance Order ID",
      timerRemaining: "Time remaining to complete payment:",
      submitRequest: "Submit Deposit Request",
      successNotice: "Deposit request recorded! Balance will be credited upon confirmation.",
    },
    dashboard: {
      welcome: "Welcome back",
      balanceTitle: "Available Wallet Balance",
      toggleCurrency: "Toggle Currency (USD / EGP)",
      recentOrders: "Recent Orders & History",
      orderId: "Order #",
      serviceName: "Service Name",
      status: "Status",
      result: "Result / Unlock Code",
      copyCode: "Copy Code",
      copied: "Copied!",
      reportProblem: "Report Issue",
      noOrders: "No orders placed yet.",
    },
    admin: {
      title: "Admin Command Center - Vanta Services",
      totalUsers: "Total Users",
      totalOrders: "Processed Orders",
      pendingOrders: "Pending Orders Action Required",
      pendingTopups: "Pending Top-Up Reviews",
      approve: "Approve & Complete",
      reject: "Reject & Auto-Refund",
      resultInput: "Enter unlock code or result message for the client...",
      syncDhru: "Sync DHRU Server",
      exchangeRate: "Exchange Rate (1 USD = ? EGP)",
      saveSettings: "Save Settings",
    },
    footer: {
      desc: "Vanta Services - The leading platform in mobile unlocking, GSM tools, repair solutions, and box activations.",
      quickLinks: "Quick Links",
      support: "Live Technical Support",
      telegram: "Official Telegram Channel",
      whatsapp: "WhatsApp Support",
      terms: "Terms of Service",
      disclaimer: "Legal Disclaimer",
      copyright: "All Rights Reserved © 2026 Vanta Services",
    },
  },
  fr: {
    dir: "ltr",
    siteName: "Vanta Services",
    tagline: "Serveur GSM & Logiciels Mobiles, Déblocages et Portefeuille Numérique",
    nav: {
      home: "Accueil",
      services: "Services",
      categories: "Catégories",
      vip: "Plans VIP",
      dashboard: "Tableau de Bord",
      orders: "Mes Commandes",
      topUp: "Recharger",
      admin: "Panneau Admin",
      login: "Connexion",
      register: "Inscription",
      logout: "Déconnexion",
      balance: "Solde",
    },
    hero: {
      badge: "Premier Serveur GSM & Déblocage Mobile Certifié ⚡",
      title: "Centre de Contrôle Instantané pour",
      highlight: "Services Logiciels & Déblocage",
      subtitle: "Contournement FRP Google, activations d'outils et de boîtiers, recharge de jeux et vérifications IMEI officielles.",
      searchPlaceholder: "Rechercher un service, un modèle (Samsung, Xiaomi, iPhone)...",
      statsOrders: "Commandes Terminées",
      statsSuccess: "Taux de Succès Instantané",
      statsSupport: "Support Technique 24/7",
      ctaServices: "Explorer Tous les Services",
      ctaTopUp: "Recharger le Portefeuille",
    },
    categoriesSection: {
      title: "Catégories de Services",
      subtitle: "Modules structurés pour techniciens et développeurs",
      viewAll: "Voir Tous les Services",
    },
    popularSection: {
      title: "Services les Plus Demandés",
      subtitle: "Traitement automatisé instantané au meilleur tarif de gros",
      instantDelivery: "Livraison Instantanée",
      orderBtn: "Commander Maintenant",
    },
    orderModal: {
      title: "Commander le Service:",
      instructions: "Veuillez saisir les informations requises pour un traitement immédiat.",
      imeiLabel: "Numéro de Série IMEI (15 Chiffres)",
      imeiHint: "Composez *#06# sur l'appareil et entrez les 15 chiffres",
      imeiError: "L'IMEI doit comporter exactement 15 chiffres",
      playerIdLabel: "Identifiant Joueur (Player ID)",
      usernameLabel: "Nom d'utilisateur ou Compte",
      ultraviewerLabel: "Identifiants UltraViewer / AnyDesk (ID & MDP)",
      price: "Prix du Service:",
      yourBalance: "Solde Disponible:",
      confirmBtn: "Confirmer & Déduire",
      submitting: "Soumission au serveur...",
      successMsg: "Commande soumise avec succès!",
      insufficientBalance: "Solde insuffisant! Veuillez d'abord recharger.",
      closeBtn: "Annuler",
    },
    topUp: {
      title: "Recharger le Solde",
      subtitle: "Créditez votre compte en USD ou EGP via 3 passerelles sécurisées",
      vodafone: "Vodafone Cash (Auto)",
      instapay: "InstaPay Égypte",
      binance: "Binance Pay (USDT)",
      amountLabel: "Montant à Recharger",
      senderPhone: "Numéro de l'Expéditeur",
      instapayUser: "Nom de Compte InstaPay",
      binanceOrderId: "ID de Commande Binance",
      timerRemaining: "Temps restant pour le paiement:",
      submitRequest: "Soumettre la Recharge",
      successNotice: "Demande enregistrée! Le solde sera crédité après validation.",
    },
    dashboard: {
      welcome: "Bienvenue à nouveau",
      balanceTitle: "Solde Disponible",
      toggleCurrency: "Changer de Devise (USD / EGP)",
      recentOrders: "Commandes Récentes",
      orderId: "N° Commande",
      serviceName: "Nom du Service",
      status: "Statut",
      result: "Résultat / Code",
      copyCode: "Copier le Code",
      copied: "Copié!",
      reportProblem: "Signaler un Problème",
      noOrders: "Aucune commande pour le moment.",
    },
    admin: {
      title: "Centre de Contrôle Admin - Vanta Services",
      totalUsers: "Utilisateurs",
      totalOrders: "Commandes Traitées",
      pendingOrders: "Commandes en Attente",
      pendingTopups: "Recharges en Attente",
      approve: "Valider & Compléter",
      reject: "Refuser & Rembourser",
      resultInput: "Entrez le code de déblocage ou le résultat...",
      syncDhru: "Synchroniser DHRU",
      exchangeRate: "Taux de Change (1 USD = ? EGP)",
      saveSettings: "Enregistrer",
    },
    footer: {
      desc: "Vanta Services - La plateforme de référence pour les déblocages GSM et les activations d'outils professionnels.",
      quickLinks: "Liens Rapides",
      support: "Support Technique en Direct",
      telegram: "Canal Telegram Officiel",
      whatsapp: "Support WhatsApp",
      terms: "Conditions Générales",
      disclaimer: "Avertissement Légal",
      copyright: "Tous Droits Réservés © 2026 Vanta Services",
    },
  },
};
