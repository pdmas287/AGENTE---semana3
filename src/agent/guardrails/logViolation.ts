export function logViolation(code: string, context: Record<string, unknown>): void {
  const entry = {
    timestamp: new Date().toISOString(),
    level: "warn",
    type: "guardrail_violation",
    code,
    ...context,
  };
  console.warn(JSON.stringify(entry));
}
