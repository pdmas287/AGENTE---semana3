import { ChatOpenAI } from "@langchain/openai";
import { env } from "../config/env";

export const chatModel = new ChatOpenAI({
  apiKey: env.OPENROUTER_API_KEY,
  modelName: env.OPENROUTER_MODEL,
  temperature: env.OPENROUTER_TEMPERATURE,
  configuration: {
    baseURL: env.OPENROUTER_BASE_URL,
    defaultHeaders: {
      "HTTP-Referer": "http://localhost",
      "X-Title": "Architect Agent Local",
    },
  },
});
