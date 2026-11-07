// Input Validator & Sanitizer for Vanta Services (Trust Boundary Protection)

export function validateImei(imei: string): { isValid: boolean; error?: string } {
  const clean = imei ? imei.trim() : "";
  if (!clean) {
    return { isValid: false, error: "رقم الـ IMEI مطلوب" };
  }
  if (!/^\d{15}$/.test(clean)) {
    return { isValid: false, error: "يجب أن يتكون رقم الـ IMEI من 15 رقماً بالتمام والكمال" };
  }
  return { isValid: true };
}

export function validatePlayerId(id: string): { isValid: boolean; error?: string } {
  const clean = id ? id.trim() : "";
  if (!clean) {
    return { isValid: false, error: "معرف اللاعب مطلوب" };
  }
  if (!/^[a-zA-Z0-9_\-\.]{4,35}$/.test(clean)) {
    return { isValid: false, error: "صيغة معرف اللاعب غير صحيحة" };
  }
  return { isValid: true };
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email?.trim() || "");
}

export function validateAmount(amount: any): { isValid: boolean; parsed: number } {
  const num = Number(amount);
  if (isNaN(num) || num <= 0 || num > 500000) {
    return { isValid: false, parsed: 0 };
  }
  // Max 2 decimal digits
  return { isValid: true, parsed: Math.round(num * 100) / 100 };
}

export function sanitizeText(input: string): string {
  if (!input) return "";
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim();
}
