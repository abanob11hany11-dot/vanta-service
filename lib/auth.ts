import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "vanta-services-ultra-secure-jwt-secret-key-2026";
const COOKIE_NAME = "vanta_session";

// Native Web Crypto HMAC-SHA256 Token implementation (zero external dependency)
async function getSigningKey(): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return await crypto.subtle.importKey(
    "raw",
    enc.encode(JWT_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function signToken(payload: Record<string, any>, expiresInSeconds = 86400 * 7): Promise<string> {
  const header = { alg: "HS256", typ: "JWT" };
  const exp = Math.floor(Date.now() / 1000) + expiresInSeconds;
  const fullPayload = { ...payload, exp };

  const encode = (obj: any) => Buffer.from(JSON.stringify(obj)).toString("base64url");
  const data = `${encode(header)}.${encode(fullPayload)}`;

  const key = await getSigningKey();
  const signatureBuffer = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  const signature = Buffer.from(signatureBuffer).toString("base64url");

  return `${data}.${signature}`;
}

export async function verifyToken<T = any>(token: string): Promise<T | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const data = `${parts[0]}.${parts[1]}`;
    const key = await getSigningKey();
    const signatureBytes = Buffer.from(parts[2], "base64url");

    const isValid = await crypto.subtle.verify("HMAC", key, signatureBytes, new TextEncoder().encode(data));
    if (!isValid) return null;

    const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf-8"));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null; // Expired
    }

    return payload as T;
  } catch {
    return null;
  }
}

// Password Hashing via native PBKDF2 (NIST compliant, zero-dependency)
export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    256
  );

  const saltHex = Buffer.from(salt).toString("hex");
  const hashHex = Buffer.from(derivedBits).toString("hex");
  return `${saltHex}:${hashHex}`;
}

export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  try {
    // Admin demo fallback check
    if (storedHash === "hash_admin" && password === "admin123") return true;
    if (storedHash === "hash_client" && password === "client123") return true;

    const [saltHex, hashHex] = storedHash.split(":");
    if (!saltHex || !hashHex) return false;

    const salt = Buffer.from(saltHex, "hex");
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      enc.encode(password),
      { name: "PBKDF2" },
      false,
      ["deriveBits"]
    );

    const derivedBits = await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        salt: salt,
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      256
    );

    const checkHashHex = Buffer.from(derivedBits).toString("hex");
    return checkHashHex === hashHex;
  } catch {
    return false;
  }
}

// Session cookie helper
export async function getSessionUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  return await verifyToken<{
    id: string;
    username: string;
    email: string;
    role: "user" | "admin";
    balance: number;
    currency: "USD" | "EGP";
  }>(token);
}

export { COOKIE_NAME };
