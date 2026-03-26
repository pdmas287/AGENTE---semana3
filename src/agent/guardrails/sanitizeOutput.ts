import { env } from "../../config/env";
import { logViolation } from "./logViolation";

export function sanitizeOutput(output: string): string {
  if (!env.AGENT_ENABLE_OUTPUT_FILTER) return output;

  const maxLen = env.AGENT_MAX_OUTPUT_LENGTH;
  let result = output;

  if (result.length > maxLen) {
    result = result.slice(0, maxLen) + "\n[Respuesta truncada por límite de seguridad]";
    logViolation("OUTPUT_TOO_LONG", { originalLength: output.length });
  }

  // Redactar patrones que parezcan credenciales (ej. API keys de OpenRouter)
  const sensitivePatterns = [
    /sk-[a-zA-Z0-9]{20,}/g,        
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, // emails
  ];

  let redactedCount = 0;
  for (const pattern of sensitivePatterns) {
    const matches = result.match(pattern);
    if (matches) {
      redactedCount += matches.length;
      result = result.replace(pattern, "[REDACTADO]");
    }
  }

  if (redactedCount > 0) {
    logViolation("SENSITIVE_DATA_REDACTED", { count: redactedCount });
  }

  return result;
}
