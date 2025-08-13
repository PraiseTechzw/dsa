import { openai } from "@ai-sdk/openai"
import { createOpenAI } from "@ai-sdk/openai"

// DeepSeek provider configuration
export const deepseek = createOpenAI({
  name: "deepseek",
  apiKey: process.env.DEEPSEEK_API_KEY ?? "",
  baseURL: "https://api.deepseek.com/v1",
})

// OpenAI provider (already configured)
export { openai }

// Provider configurations
export const AI_PROVIDERS = {
  deepseek: {
    name: "DeepSeek Coder V2.5",
    model: "deepseek-coder",
    provider: deepseek,
    strengths: ["Code Generation", "Bug Fixing", "Optimization"],
    color: "from-blue-500 to-cyan-500",
  },
  openai: {
    name: "GPT-4 Turbo",
    model: "gpt-4-turbo-preview",
    provider: openai,
    strengths: ["Concept Explanation", "Algorithm Design", "Learning Guidance"],
    color: "from-green-500 to-emerald-500",
  },
} as const
