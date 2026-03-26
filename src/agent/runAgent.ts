import { buildAgentExecutor } from "./createAgent";
import { validateInput } from "./guardrails/validateInput";
import { sanitizeOutput } from "./guardrails/sanitizeOutput";
import { GuardrailError } from "./guardrails/GuardrailError";

export async function runAgent(inputRaw: string): Promise<string> {
  try {
    // 1. Pre-Input Guard (Validación de longitud, inyección, vacíos)
    const safeInput = validateInput(inputRaw);

    // 2. Construir Executor (configurado con maxIterations, verbose, etc.)
    const executor = await buildAgentExecutor();

    // 3. Invocar al modelo
    const response = await executor.invoke({
      input: safeInput,
    });

    // 4. Post-Output Guard (Truncado y sanitización)
    const safeOutput = sanitizeOutput(response.output as string);

    return safeOutput;
  } catch (err: any) {
    if (err instanceof GuardrailError) {
      // Retornar el mensaje validado en lugar del stack trace o tirar la app
      return `[Bloqueo de Seguridad]: ${err.message}`;
    }
    return `[Error Interno]: ${err.message}`;
  }
}
