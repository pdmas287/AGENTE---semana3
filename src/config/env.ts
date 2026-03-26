import * as z from "zod";
import * as dotenv from "dotenv";
import * as path from "path";

// Cargamos variables desde .env
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const envSchema = z.object({
  OPENROUTER_API_KEY: z.string().min(1, "OPENROUTER_API_KEY es requerida"),
  OPENROUTER_MODEL: z.string().default("openai/gpt-4o-mini"),
  OPENROUTER_BASE_URL: z.string().default("https://openrouter.ai/api/v1"),
  OPENROUTER_TEMPERATURE: z.coerce.number().default(0.2),

  // Guardrails
  AGENT_MAX_INPUT_LENGTH: z.coerce.number().default(2000),
  AGENT_MAX_OUTPUT_LENGTH: z.coerce.number().default(5000),
  AGENT_MAX_ITERATIONS: z.coerce.number().default(5),
  AGENT_VERBOSE: z.coerce.boolean().default(false),
  AGENT_ENABLE_INPUT_FILTER: z.coerce.boolean().default(true),
  AGENT_ENABLE_OUTPUT_FILTER: z.coerce.boolean().default(true),
});

export const env = envSchema.parse(process.env);
