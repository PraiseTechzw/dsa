import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { deepseek } from "@/lib/ai-providers"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { message, model, topic, category, code } = await req.json()

    const modelConfig = model === "deepseek" ? deepseek : openai
    const modelName = model === "deepseek" ? "deepseek-coder" : "gpt-4-turbo-preview"

    const systemPrompt = `You are an expert programming tutor specializing in ${topic} and ${category === "data" ? "data structures" : category === "algorithm" ? "algorithms" : "computer science fundamentals"}. 

Provide detailed, educational responses that include:
1. Clear explanations with examples
2. Working Python code when requested
3. Performance analysis and optimization tips
4. Best practices and common pitfalls
5. Real-world applications

Format your responses with markdown for better readability.`

    const userPrompt = code ? `${message}\n\nHere's my current code:\n\`\`\`python\n${code}\n\`\`\`` : message

    const { text } = await generateText({
      model: modelConfig(modelName),
      system: systemPrompt,
      prompt: userPrompt,
      maxTokens: 2000,
      temperature: 0.7,
    })

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error("AI API Error:", error)
    return NextResponse.json({ error: "Failed to generate AI response" }, { status: 500 })
  }
}
