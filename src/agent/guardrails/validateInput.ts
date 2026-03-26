import { env } from "../../config/env";
import { GuardrailError } from "./GuardrailError";
import { logViolation } from "./logViolation";

export function validateInput(input: string): string {
  if (!env.AGENT_ENABLE_INPUT_FILTER) return input.trim();

  const maxLen = env.AGENT_MAX_INPUT_LENGTH;

  if (!input || input.trim().length === 0) {
    const err = new GuardrailError("INPUT_EMPTY", "La entrada no puede estar vacía.");
    logViolation(err.code, { length: 0 });
    throw err;
  }

  if (input.length > maxLen) {
    const err = new GuardrailError(
      "INPUT_TOO_LONG",
      `La entrada excede el límite de ${maxLen} caracteres.`
    );
    logViolation(err.code, { length: input.length });
    throw err;
  }

  const suspiciousPatterns = [
    /ignore\s+(previous|all)\s+instructions/i,
    /you\s+are\s+now/i,
    /system\s*:\s*/i,
    /\bact\s+as\b/i,
  ];

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(input)) {
      const err = new GuardrailError(
        "INPUT_SUSPICIOUS",
        "La entrada contiene patrones no permitidos."
      );
      logViolation(err.code, { pattern: pattern.toString() });
      throw err;
    }
  }

  return input.trim();
}
