// Open source AI model configurations
export const OPEN_SOURCE_MODELS = {
  codellama: {
    name: "Code Llama 34B",
    endpoint: "https://api-inference.huggingface.co/models/codellama/CodeLlama-34b-Instruct-hf",
    token: process.env.HUGGINGFACE_API_KEY || "",
    provider: "Hugging Face",
    strengths: ["Code Generation", "Bug Fixing", "Optimization"],
    color: "from-blue-500 to-cyan-500",
  },
  mistral: {
    name: "Mistral 7B Instruct",
    endpoint: "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
    token: process.env.HUGGINGFACE_API_KEY || "",
    provider: "Hugging Face",
    strengths: ["Concept Explanation", "Algorithm Design", "Learning Guidance"],
    color: "from-green-500 to-emerald-500",
  },
  deepseek: {
    name: "DeepSeek Coder 6.7B",
    endpoint: "https://api-inference.huggingface.co/models/deepseek-ai/deepseek-coder-6.7b-instruct",
    token: process.env.HUGGINGFACE_API_KEY || "",
    provider: "Hugging Face",
    strengths: ["Code Generation", "Bug Fixing", "Optimization"],
    color: "from-orange-500 to-red-500",
  },
  wizardcoder: {
    name: "WizardCoder 15B",
    endpoint: "https://api-inference.huggingface.co/models/WizardLM/WizardCoder-15B-V1.0",
    token: process.env.HUGGINGFACE_API_KEY || "",
    provider: "Hugging Face",
    strengths: ["Code Generation", "Bug Fixing", "Optimization"],
    color: "from-purple-500 to-violet-500",
  }
} as const

// Provider configurations for UI
export const AI_PROVIDERS = {
  codellama: {
    name: "Code Llama 34B",
    model: "codellama",
    provider: OPEN_SOURCE_MODELS.codellama,
    strengths: ["Code Generation", "Bug Fixing", "Optimization"],
    color: "from-blue-500 to-cyan-500",
  },
  mistral: {
    name: "Mistral 7B Instruct",
    model: "mistral",
    provider: OPEN_SOURCE_MODELS.mistral,
    strengths: ["Concept Explanation", "Algorithm Design", "Learning Guidance"],
    color: "from-green-500 to-emerald-500",
  },
  deepseek: {
    name: "DeepSeek Coder 6.7B",
    model: "deepseek",
    provider: OPEN_SOURCE_MODELS.deepseek,
    strengths: ["Code Generation", "Bug Fixing", "Optimization"],
    color: "from-orange-500 to-red-500",
  },
  wizardcoder: {
    name: "WizardCoder 15B",
    model: "wizardcoder",
    provider: OPEN_SOURCE_MODELS.wizardcoder,
    strengths: ["Code Generation", "Bug Fixing", "Optimization"],
    color: "from-purple-500 to-violet-500",
  }
} as const
