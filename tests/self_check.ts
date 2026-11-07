// Vanta Services - Runnable Self-Check (Assert-based, no external framework)
import assert from "node:assert";
import { validateImei, validatePlayerId, validateAmount } from "../lib/validator";
import { translations } from "../lib/i18n";

async function runSelfCheck() {
  console.log("Starting Vanta Services Self-Check...");

  // 1. Check IMEI validation
  const validImei = validateImei("358491029384751");
  assert.strictEqual(validImei.isValid, true, "15 digits IMEI should be valid");

  const invalidImeiShort = validateImei("12345");
  assert.strictEqual(invalidImeiShort.isValid, false, "Short IMEI must be rejected");

  const invalidImeiAlpha = validateImei("35849102938475A");
  assert.strictEqual(invalidImeiAlpha.isValid, false, "Alpha characters in IMEI must be rejected");

  // 2. Check Player ID validation
  const validPlayer = validatePlayerId("Player_1234");
  assert.strictEqual(validPlayer.isValid, true, "Valid Player ID should pass");

  const invalidPlayer = validatePlayerId("?<>");
  assert.strictEqual(invalidPlayer.isValid, false, "Special chars in Player ID must be rejected");

  // 3. Check Amount validation
  const validAmt = validateAmount("100.50");
  assert.strictEqual(validAmt.isValid, true);
  assert.strictEqual(validAmt.parsed, 100.5);

  const invalidAmt = validateAmount("-50");
  assert.strictEqual(invalidAmt.isValid, false);

  // 4. Check i18n configuration
  assert.strictEqual(translations.ar.dir, "rtl", "Arabic must be RTL");
  assert.strictEqual(translations.en.dir, "ltr", "English must be LTR");
  assert.strictEqual(translations.fr.dir, "ltr", "French must be LTR");

  console.log("✅ All Vanta Services self-checks passed successfully!");
}

runSelfCheck().catch((err) => {
  console.error("❌ Self-check failed:", err);
  process.exit(1);
});
