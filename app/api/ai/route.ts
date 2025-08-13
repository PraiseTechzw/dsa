import { NextRequest, NextResponse } from "next/server"

// Open source AI model configurations
const OPEN_SOURCE_MODELS = {
  codellama: {
    name: "Code Llama 34B",
    endpoint: "https://api-inference.huggingface.co/models/codellama/CodeLlama-34b-Instruct-hf",
    token: process.env.HUGGINGFACE_API_KEY || "",
  },
  mistral: {
    name: "Mistral 7B Instruct",
    endpoint: "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
    token: process.env.HUGGINGFACE_API_KEY || "",
  },
  deepseek: {
    name: "DeepSeek Coder 6.7B",
    endpoint: "https://api-inference.huggingface.co/models/deepseek-ai/deepseek-coder-6.7b-instruct",
    token: process.env.HUGGINGFACE_API_KEY || "",
  },
  wizardcoder: {
    name: "WizardCoder 15B",
    endpoint: "https://api-inference.huggingface.co/models/WizardLM/WizardCoder-15B-V1.0",
    token: process.env.HUGGINGFACE_API_KEY || "",
  }
}

export async function POST(req: NextRequest) {
  try {
    const { message, model = "codellama", topic, category, code } = await req.json()

    const selectedModel = OPEN_SOURCE_MODELS[model as keyof typeof OPEN_SOURCE_MODELS] || OPEN_SOURCE_MODELS.codellama

    const systemPrompt = `You are an expert programming tutor specializing in ${topic} and ${category === "data" ? "data structures" : category === "algorithm" ? "algorithms" : "computer science fundamentals"}. 

Provide detailed, educational responses that include:
1. Clear explanations with examples
2. Working Python code when requested
3. Performance analysis and optimization tips
4. Best practices and common pitfalls
5. Real-world applications

Format your responses with markdown for better readability.`

    const userPrompt = code ? `${message}\n\nHere's my current code:\n\`\`\`python\n${code}\n\`\`\`` : message

    // Use Hugging Face Inference API (free tier available)
    const response = await fetch(selectedModel.endpoint, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${selectedModel.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: `<s>[INST] ${systemPrompt}\n\n${userPrompt} [/INST]`,
        parameters: {
          max_new_tokens: 2000,
          temperature: 0.7,
          top_p: 0.95,
          do_sample: true,
        }
      })
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }

    const data = await response.json()
    const aiResponse = Array.isArray(data) ? data[0]?.generated_text || data[0]?.text : data.generated_text || data.text

    // Clean up the response (remove the prompt part)
    const cleanResponse = aiResponse?.replace(/<s>\[INST\].*?\[\/INST\]/, "").trim() || "Sorry, I couldn't generate a response at the moment."

    return NextResponse.json({ 
      response: cleanResponse,
      model: selectedModel.name,
      provider: "Open Source (Hugging Face)"
    })

  } catch (error) {
    console.error("AI API Error:", error)
    
    // Fallback to a simple response if API fails
    const fallbackResponse = `I'm having trouble connecting to the AI service right now. Here are some general tips for programming:

1. **Start with the basics** - Make sure you understand the fundamental concepts
2. **Practice with examples** - Try implementing simple versions first
3. **Use online resources** - Check documentation and tutorials
4. **Break down problems** - Divide complex problems into smaller parts

Would you like me to try again, or would you prefer to explore the learning materials on this site?`

    return NextResponse.json({ 
      response: fallbackResponse,
      model: "Fallback",
      provider: "Local Fallback"
    })
  }
}
