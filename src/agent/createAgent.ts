// @ts-ignore
import { createToolCallingAgent, AgentExecutor } from "langchain/agents";
import { chatModel } from "./model";
import { architectPrompt } from "./architectPrompt";
import { generateAdrTool } from "./tools/generateAdr";
import { env } from "../config/env";

export const agentTools = [generateAdrTool];

export async function buildAgentExecutor() {
  const agent = await createToolCallingAgent({
    llm: chatModel,
    tools: agentTools,
    prompt: architectPrompt,
  });

  return new AgentExecutor({
    agent,
    tools: agentTools,
    verbose: env.AGENT_VERBOSE,
    maxIterations: env.AGENT_MAX_ITERATIONS,
    earlyStoppingMethod: "force",
  });
}
