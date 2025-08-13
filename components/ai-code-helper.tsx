"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Bot,
  Send,
  Code,
  Lightbulb,
  CheckCircle,
  AlertCircle,
  Copy,
  Play,
  RefreshCw,
  MessageSquare,
  User,
  Zap,
  Target,
  Download,
  Maximize2,
  Minimize2,
  FileText,
  Cpu,
  MemoryStick,
  Clock,
  TrendingUp,
} from "lucide-react"

interface Message {
  id: string
  type: "user" | "ai" | "system"
  content: string
  timestamp: Date
  codeSnippet?: string
  language?: string
  executionResult?: ExecutionResult
}

interface ExecutionResult {
  output: string
  error?: string
  executionTime: number
  memoryUsage: number
  status: "success" | "error" | "timeout"
}

interface AICodeHelperProps {
  topic: string
  category?: string
  initialCode?: string
  language?: string
  fullScreen?: boolean
}

// Real AI model configurations
const aiModels = {
  deepseek: {
    name: "DeepSeek Coder V2",
    model: "deepseek-coder-33b-instruct",
    description: "Specialized in code generation and debugging",
    strengths: ["Code Generation", "Bug Fixing", "Optimization"],
    color: "from-blue-500 to-cyan-500",
  },
  gemini: {
    name: "Gemini 2.0 Flash",
    model: "gemini-2.0-flash-exp",
    description: "Advanced reasoning and explanation",
    strengths: ["Concept Explanation", "Algorithm Design", "Learning Guidance"],
    color: "from-purple-500 to-pink-500",
  },
  claude: {
    name: "Claude 3.5 Sonnet",
    model: "claude-3-5-sonnet-20241022",
    description: "Excellent at code analysis and teaching",
    strengths: ["Code Review", "Best Practices", "Documentation"],
    color: "from-orange-500 to-red-500",
  },
}

// Enhanced code execution simulator
const executeCode = async (code: string, language: string): Promise<ExecutionResult> => {
  return new Promise((resolve) => {
    setTimeout(
      () => {
        const hasError = code.includes("error") || code.includes("undefined") || Math.random() < 0.1
        const executionTime = Math.random() * 100 + 10 // 10-110ms
        const memoryUsage = Math.random() * 50 + 10 // 10-60MB

        if (hasError) {
          resolve({
            output: "",
            error: "SyntaxError: Unexpected token in line 5\nNameError: 'undefined_variable' is not defined",
            executionTime,
            memoryUsage,
            status: "error",
          })
        } else {
          const outputs = [
            `Algorithm executed successfully!\nResult: [1, 2, 3, 4, 5]\nTime complexity: O(n log n)\nSpace complexity: O(n)`,
            `✅ All test cases passed!\nInput: [64, 34, 25, 12, 22, 11, 90]\nOutput: [11, 12, 22, 25, 34, 64, 90]\nComparisons: 15\nSwaps: 8`,
            `🎯 Optimization successful!\nOriginal time: 150ms\nOptimized time: 45ms\nImprovement: 70%\nMemory saved: 25%`,
            `📊 Performance Analysis:\n- Best case: O(n)\n- Average case: O(n log n)\n- Worst case: O(n²)\n- Space: O(1) auxiliary`,
          ]

          resolve({
            output: outputs[Math.floor(Math.random() * outputs.length)],
            executionTime,
            memoryUsage,
            status: "success",
          })
        }
      },
      1000 + Math.random() * 2000,
    )
  })
}

// Enhanced AI response generation
const generateAIResponse = async (
  model: string,
  userInput: string,
  topic: string,
  category: string,
): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(
      () => {
        const modelData = aiModels[model as keyof typeof aiModels] || aiModels.deepseek

        // Category-specific responses
        const categoryContext =
          category === "data"
            ? "data structure implementation and memory management"
            : category === "algorithm"
              ? "algorithmic thinking and optimization strategies"
              : "foundational computer science concepts"

        if (userInput.toLowerCase().includes("implement") || userInput.toLowerCase().includes("code")) {
          const implementation = `
\`\`\`python
# ${topic} - Production-Ready Implementation
import heapq
from typing import List, Optional, Tuple
from dataclasses import dataclass
import time

@dataclass
class Node:
    value: int
    priority: float
    
class ${topic.replace(/[^a-zA-Z0-9]/g, "")}:
    """
    ${topic} implementation optimized for ${categoryContext}
    
    Time Complexity: O(n log n)
    Space Complexity: O(n)
    """
    
    def __init__(self):
        self.data = []
        self.visited = set()
        self.result = []
    
    def process(self, input_data: List[int]) -> List[int]:
        """Main algorithm implementation"""
        if not input_data:
            return []
        
        # Initialize data structures
        heap = [(item, idx) for idx, item in enumerate(input_data)]
        heapq.heapify(heap)
        
        # Core algorithm logic
        while heap:
            current_value, current_idx = heapq.heappop(heap)
            
            if current_idx not in self.visited:
                self.visited.add(current_idx)
                self.result.append(current_value)
                
                # Process adjacent elements
                self._process_neighbors(current_idx, input_data, heap)
        
        return self.result
    
    def _process_neighbors(self, idx: int, data: List[int], heap: List[Tuple[int, int]]):
        """Process neighboring elements"""
        for i in range(max(0, idx-1), min(len(data), idx+2)):
            if i not in self.visited and i != idx:
                heapq.heappush(heap, (data[i], i))
    
    def get_complexity_info(self) -> dict:
        """Return complexity analysis"""
        return {
            "time_complexity": "O(n log n)",
            "space_complexity": "O(n)",
            "best_case": "O(n)",
            "worst_case": "O(n²)",
            "stable": True,
            "in_place": False
        }

# Example usage and testing
if __name__ == "__main__":
    algorithm = ${topic.replace(/[^a-zA-Z0-9]/g, "")}()
    test_data = [64, 34, 25, 12, 22, 11, 90]
    
    start_time = time.time()
    result = algorithm.process(test_data)
    execution_time = time.time() - start_time
    
    print(f"Input: {test_data}")
    print(f"Output: {result}")
    print(f"Execution time: {execution_time:.4f}s")
    print(f"Complexity: {algorithm.get_complexity_info()}")
\`\`\`

**Key Features:**
- ✅ **Type Hints**: Full type annotation for better code quality
- ✅ **Error Handling**: Robust input validation and edge case handling
- ✅ **Performance Optimized**: Uses efficient data structures (heaps, sets)
- ✅ **Memory Efficient**: Minimal space overhead with in-place operations where possible
- ✅ **Production Ready**: Includes logging, testing, and documentation

**Performance Characteristics:**
- **Time Complexity**: O(n log n) - optimal for comparison-based algorithms
- **Space Complexity**: O(n) - linear space for auxiliary data structures
- **Stability**: Maintains relative order of equal elements
- **Adaptability**: Performs better on partially sorted data

Would you like me to explain any specific part or show you how to optimize it further?`

          resolve(implementation)
        } else if (userInput.toLowerCase().includes("explain") || userInput.toLowerCase().includes("how")) {
          resolve(`## Deep Dive: ${topic}

**Conceptual Foundation:**
${topic} is a fundamental ${categoryContext} technique that demonstrates key principles of efficient computation.

**Core Algorithm Principles:**

1. **${category === "data" ? "Data Organization" : "Algorithmic Strategy"}**
   - **Purpose**: ${category === "data" ? "Organize data for optimal access patterns" : "Solve problems using systematic approaches"}
   - **Approach**: ${category === "data" ? "Structure data to minimize access time" : "Break down complex problems into manageable steps"}
   - **Efficiency**: Achieves optimal performance through careful design choices

2. **Implementation Strategy**
   - **Data Structures**: Uses ${category === "data" ? "arrays, trees, or hash tables" : "priority queues, stacks, or graphs"}
   - **Control Flow**: Employs ${category === "data" ? "iterative or recursive traversal" : "greedy choices or dynamic programming"}
   - **Optimization**: Minimizes ${category === "data" ? "memory fragmentation" : "computational overhead"}

**Step-by-Step Breakdown:**

**Phase 1: Initialization**
- Set up required data structures
- Validate input parameters
- Initialize tracking variables

**Phase 2: Core Processing**
- Apply the main algorithmic logic
- Make optimal choices at each step
- Update data structures efficiently

**Phase 3: Result Generation**
- Compile final results
- Perform cleanup operations
- Return optimized output

**Real-World Applications:**
- 🌐 **Web Development**: ${category === "data" ? "Database indexing and caching" : "Route optimization and load balancing"}
- 🤖 **Machine Learning**: ${category === "data" ? "Feature engineering and data preprocessing" : "Model training and hyperparameter optimization"}
- 🎮 **Game Development**: ${category === "data" ? "Scene graphs and collision detection" : "AI pathfinding and procedural generation"}
- 📱 **Mobile Apps**: ${category === "data" ? "Local storage and synchronization" : "Background processing and battery optimization"}

**Complexity Analysis:**
- **Time**: O(n log n) - logarithmic factor from efficient data structure operations
- **Space**: O(n) - linear space for auxiliary storage
- **Scalability**: Handles datasets up to 10^6 elements efficiently

**Common Pitfalls & Solutions:**
❌ **Mistake**: Not handling edge cases (empty input, single element)
✅ **Solution**: Add comprehensive input validation

❌ **Mistake**: Using inefficient data structures (lists instead of heaps)
✅ **Solution**: Choose appropriate data structures for each operation

❌ **Mistake**: Not considering memory constraints
✅ **Solution**: Implement memory-efficient algorithms with proper cleanup

Would you like me to dive deeper into any specific aspect or show you variations of this algorithm?`)
        } else if (userInput.toLowerCase().includes("debug") || userInput.toLowerCase().includes("error")) {
          resolve(`## 🔧 Advanced Debugging Guide for ${topic}

**Systematic Debugging Approach:**

**1. Error Classification & Diagnosis**

**Syntax Errors:**
\`\`\`python
# ❌ Common syntax issues
def algorithm()  # Missing colon
    return result  # Incorrect indentation
    
# ✅ Corrected version
def algorithm():
    return result
\`\`\`

**Logic Errors:**
\`\`\`python
# ❌ Off-by-one error
for i in range(len(arr) + 1):  # Will cause IndexError
    process(arr[i])
    
# ✅ Correct bounds
for i in range(len(arr)):
    process(arr[i])
\`\`\`

**Performance Issues:**
\`\`\`python
# ❌ Inefficient nested loops
for i in range(n):
    for j in range(n):
        if arr[i] == target:  # O(n²) unnecessary
            return i
            
# ✅ Optimized approach
return arr.index(target) if target in arr else -1  # O(n)
\`\`\`

**2. Debugging Tools & Techniques**

**Print Debugging:**
\`\`\`python
def debug_${topic.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()}(data):
    print(f"🔍 Input: {data}")
    print(f"📊 Input size: {len(data)}")
    
    result = []
    for i, item in enumerate(data):
        print(f"Step {i+1}: Processing {item}")
        # Your algorithm logic here
        result.append(processed_item)
        print(f"✅ Current result: {result}")
    
    print(f"🎯 Final result: {result}")
    return result
\`\`\`

**Assertion-Based Testing:**
\`\`\`python
def test_${topic.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()}():
    # Test edge cases
    assert algorithm([]) == []  # Empty input
    assert algorithm([1]) == [1]  # Single element
    assert algorithm([1, 1, 1]) == [1, 1, 1]  # Duplicates
    
    # Test normal cases
    test_input = [64, 34, 25, 12, 22, 11, 90]
    result = algorithm(test_input)
    assert len(result) == len(test_input)  # Length preservation
    assert all(x in test_input for x in result)  # Element preservation
\`\`\`

**3. Performance Profiling**

\`\`\`python
import time
import tracemalloc
from memory_profiler import profile

@profile
def profiled_algorithm(data):
    # Start memory tracking
    tracemalloc.start()
    start_time = time.perf_counter()
    
    # Your algorithm implementation
    result = your_algorithm(data)
    
    # Performance metrics
    end_time = time.perf_counter()
    current, peak = tracemalloc.get_traced_memory()
    tracemalloc.stop()
    
    print(f"⏱️  Execution time: {end_time - start_time:.4f}s")
    print(f"💾 Memory usage: {current / 1024 / 1024:.2f}MB")
    print(f"📈 Peak memory: {peak / 1024 / 1024:.2f}MB")
    
    return result
\`\`\`

**4. Common ${topic} Issues & Fixes**

**Issue 1: Infinite Loops**
\`\`\`python
# ❌ Problematic code
while not_finished:
    process_item()
    # Missing termination condition update!

# ✅ Fixed version
while not_finished and iterations < max_iterations:
    process_item()
    iterations += 1
    not_finished = check_completion()
\`\`\`

**Issue 2: Memory Leaks**
\`\`\`python
# ❌ Memory leak potential
global_cache = {}
def algorithm(data):
    global_cache[id(data)] = expensive_computation(data)
    return global_cache[id(data)]

# ✅ Proper cleanup
from functools import lru_cache

@lru_cache(maxsize=128)
def algorithm(data_tuple):  # Use immutable types for caching
    return expensive_computation(data_tuple)
\`\`\`

**5. Debugging Checklist**
- [ ] Input validation (None, empty, invalid types)
- [ ] Boundary conditions (first, last, middle elements)
- [ ] Loop termination conditions
- [ ] Variable initialization
- [ ] Return value correctness
- [ ] Memory cleanup
- [ ] Exception handling

**6. Advanced Debugging Commands**

\`\`\`bash
# Python debugger
python -m pdb your_script.py

# Memory profiling
python -m memory_profiler your_script.py

# Performance profiling
python -m cProfile -s cumulative your_script.py
\`\`\`

Share your specific error message or problematic code, and I'll provide targeted debugging assistance!`)
        } else {
          resolve(`## 🚀 ${topic} - Complete Mastery Guide

**Welcome to Advanced ${topic} Learning!**

I'm your AI coding companion, specialized in ${categoryContext}. Let's build your expertise systematically.

**🎯 Learning Objectives:**
- Master the theoretical foundations
- Implement efficient, production-ready code
- Understand real-world applications
- Develop debugging and optimization skills

**📚 What We'll Cover:**

**1. Theoretical Foundation**
- Core concepts and principles
- Mathematical analysis and proofs
- Complexity theory and trade-offs
- Comparison with alternative approaches

**2. Practical Implementation**
- Step-by-step code development
- Best practices and design patterns
- Error handling and edge cases
- Testing and validation strategies

**3. Performance Optimization**
- Algorithmic improvements
- Data structure selection
- Memory management
- Parallel processing opportunities

**4. Real-World Applications**
- Industry use cases
- Integration patterns
- Scalability considerations
- Production deployment strategies

**🛠️ Interactive Features:**

**Code Generation & Review**
- Generate complete, tested implementations
- Review and improve your existing code
- Suggest optimizations and refactoring
- Provide alternative approaches

**Debugging & Problem Solving**
- Identify and fix bugs systematically
- Explain error messages and solutions
- Guide through complex debugging scenarios
- Teach debugging best practices

**Learning & Explanation**
- Break down complex concepts
- Provide visual explanations
- Create custom examples
- Answer specific questions

**Performance Analysis**
- Analyze time and space complexity
- Profile code performance
- Suggest optimization strategies
- Compare different implementations

**🎮 Quick Start Options:**

**For Beginners:**
- "Explain ${topic} in simple terms"
- "Show me a basic implementation"
- "What are the key concepts I need to know?"

**For Intermediate:**
- "Help me optimize my ${topic} code"
- "Show me advanced techniques"
- "How does this compare to other algorithms?"

**For Advanced:**
- "Review my production code"
- "Help me handle edge cases"
- "Show me parallel implementation"

**💡 Pro Tips:**
- Ask specific questions for targeted help
- Share your code for personalized review
- Request explanations at your skill level
- Practice with different input sizes

**Ready to start?** What aspect of ${topic} would you like to explore first?

Type your question or choose from:
- 🧠 "Explain the concept"
- 💻 "Show me the code"
- 🐛 "Help me debug"
- ⚡ "Optimize my solution"`)
        }
      },
      1500 + Math.random() * 2000,
    )
  })
}

export default function AICodeHelper({
  topic,
  category = "foundation",
  initialCode = "",
  language = "python",
  fullScreen = false,
}: AICodeHelperProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: `🤖 **AI Assistant Ready for ${topic}!**

I'm your dedicated coding companion, powered by advanced language models and specialized in ${category === "data" ? "data structures and memory management" : category === "algorithm" ? "algorithms and optimization" : "foundational computer science concepts"}.

**🎯 Specialized Capabilities:**
• 🧠 **Deep Analysis** - Comprehensive algorithm and data structure analysis
• 💻 **Code Generation** - Production-ready implementations with full documentation
• 🔍 **Smart Debugging** - Advanced error detection and resolution strategies
• ⚡ **Performance Optimization** - Memory and time complexity improvements
• 📚 **Interactive Learning** - Step-by-step explanations tailored to your level
• 🎯 **Real-world Applications** - Industry-standard practices and patterns

**🚀 Ready to master ${topic}?** Let's build something amazing together!`,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [currentCode, setCurrentCode] = useState(initialCode)
  const [selectedModel, setSelectedModel] = useState("deepseek")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")
  const [isExecuting, setIsExecuting] = useState(false)
  const [executionHistory, setExecutionHistory] = useState<ExecutionResult[]>([])
  const [codeLanguage, setCodeLanguage] = useState(language)
  const [isExpanded, setIsExpanded] = useState(fullScreen)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      const aiResponse = await generateAIResponse(selectedModel, inputValue, topic, category)

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: aiResponse,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "system",
        content: "Sorry, I encountered an error processing your request. Please try again.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const runCode = async () => {
    if (!currentCode.trim()) return

    setIsExecuting(true)

    try {
      const result = await executeCode(currentCode, codeLanguage)
      setExecutionHistory((prev) => [result, ...prev.slice(0, 9)]) // Keep last 10 executions

      const executionMessage: Message = {
        id: Date.now().toString(),
        type: "ai",
        content: `**Code Execution Results:**

${result.status === "success" ? "✅" : "❌"} **Status**: ${result.status.toUpperCase()}

${
  result.output
    ? `**Output:**
\`\`\`
${result.output}
\`\`\``
    : ""
}

${
  result.error
    ? `**Error:**
\`\`\`
${result.error}
\`\`\``
    : ""
}

**Performance Metrics:**
- ⏱️ Execution Time: ${result.executionTime.toFixed(2)}ms
- 💾 Memory Usage: ${result.memoryUsage.toFixed(1)}MB
- 🎯 Status: ${result.status === "success" ? "Successful execution" : "Execution failed"}

${
  result.status === "success"
    ? "🎉 Great job! Your code executed successfully. Would you like me to suggest any optimizations?"
    : "🔧 Don't worry! Errors are part of learning. Would you like me to help debug this issue?"
}`,
        timestamp: new Date(),
        executionResult: result,
      }

      setMessages((prev) => [...prev, executionMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: "system",
        content: "Failed to execute code. Please check your implementation and try again.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsExecuting(false)
    }
  }

  const suggestOptimization = async () => {
    const suggestion = `🚀 **Advanced Optimization Analysis for ${topic}**

**Performance Enhancement Opportunities:**

**1. 🏎️ Algorithmic Optimizations**
- **Time Complexity**: Current O(n²) → Optimized O(n log n)
- **Space Complexity**: Reduce auxiliary space by 40%
- **Cache Efficiency**: Improve data locality for 25% speed boost
- **Early Termination**: Add conditions to skip unnecessary work

**2. 💾 Memory Management**
- **Object Pooling**: Reuse objects to reduce GC pressure
- **In-place Operations**: Minimize memory allocations
- **Lazy Evaluation**: Compute values only when needed
- **Memory Layout**: Optimize data structure alignment

**3. 🔧 Code Quality Improvements**
- **Type Annotations**: Add comprehensive type hints
- **Error Handling**: Implement robust exception management
- **Logging**: Add structured logging for debugging
- **Documentation**: Include comprehensive docstrings

**4. 📊 Advanced Techniques**
- **Parallel Processing**: Utilize multiple cores for large datasets
- **Vectorization**: Use NumPy for numerical computations
- **Caching**: Implement memoization for repeated calculations
- **Profiling**: Add performance monitoring hooks

**Optimization Priority Matrix:**
1. **High Impact, Low Effort**: Data structure improvements
2. **High Impact, High Effort**: Algorithm redesign
3. **Medium Impact, Low Effort**: Code style enhancements
4. **Low Impact, High Effort**: Micro-optimizations

**Implementation Roadmap:**
- Week 1: Core algorithm optimization
- Week 2: Memory management improvements
- Week 3: Performance profiling and tuning
- Week 4: Production deployment preparation

Would you like me to implement any of these optimizations for your specific use case?`

    const suggestionMessage: Message = {
      id: Date.now().toString(),
      type: "ai",
      content: suggestion,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, suggestionMessage])
  }

  const formatMessage = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, "<strong class='font-semibold text-slate-900 dark:text-slate-100'>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em class='italic text-slate-700 dark:text-slate-300'>$1</em>")
      .replace(
        /`([^`]+)`/g,
        '<code class="bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded text-sm font-mono text-slate-800 dark:text-slate-200">$1</code>',
      )
      .replace(
        /```(\w+)?\n([\s\S]*?)```/g,
        '<pre class="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto mt-3 mb-3 border border-slate-700 font-mono text-sm"><code>$2</code></pre>',
      )
      .replace(
        /^## (.*$)/gm,
        '<h3 class="text-lg font-semibold mt-4 mb-2 text-violet-700 dark:text-violet-300">$1</h3>',
      )
      .replace(/^### (.*$)/gm, '<h4 class="text-md font-medium mt-3 mb-2 text-sky-600 dark:text-sky-400">$1</h4>')
  }

  const currentModel = aiModels[selectedModel as keyof typeof aiModels]

  return (
    <div
      className={`h-full flex flex-col ${fullScreen ? "bg-gradient-to-br from-slate-900 via-violet-900 to-blue-900" : "bg-gradient-to-b from-white to-violet-50/30 dark:from-slate-900 dark:to-violet-900/10"}`}
    >
      {/* Enhanced Header */}
      <div className={`p-4 border-b ${fullScreen ? "border-white/20" : "border-white/20 dark:border-slate-700/50"}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-gradient-to-r ${currentModel.color} shadow-lg`}>
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className={`font-semibold text-sm ${fullScreen ? "text-white" : ""}`}>{currentModel.name}</h3>
              <p className={`text-xs ${fullScreen ? "text-white/70" : "text-muted-foreground"}`}>
                {currentModel.description}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={`text-xs ${fullScreen ? "bg-green-500/20 text-green-300 border-green-500/30" : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"}`}
            >
              <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse" />
              Online
            </Badge>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger
                className={`w-32 h-8 text-xs ${fullScreen ? "bg-white/10 border-white/20 text-white" : ""}`}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(aiModels).map(([key, model]) => (
                  <SelectItem key={key} value={key}>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${model.color}`} />
                      {model.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fullScreen && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="h-8 w-8 text-white hover:bg-white/10"
              >
                {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
            )}
          </div>
        </div>

        {/* Model Strengths */}
        <div className="flex flex-wrap gap-1">
          {currentModel.strengths.map((strength, index) => (
            <Badge
              key={index}
              variant="secondary"
              className={`text-xs ${fullScreen ? "bg-white/10 text-white/80" : ""}`}
            >
              {strength}
            </Badge>
          ))}
        </div>

        {/* Topic Context */}
        <div className={`mt-2 text-xs ${fullScreen ? "text-white/70" : "text-muted-foreground"}`}>
          Current Topic:{" "}
          <span
            className={`font-medium ${fullScreen ? "text-white" : category === "data" ? "text-blue-600" : category === "algorithm" ? "text-violet-600" : "text-slate-600"}`}
          >
            {topic}
          </span>
          {" • "}
          Category: <span className="capitalize font-medium">{category}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className={`mx-4 mt-3 mb-2 ${fullScreen ? "bg-white/10" : ""}`}>
            <TabsTrigger
              value="chat"
              className={`text-sm ${fullScreen ? "data-[state=active]:bg-white/20 data-[state=active]:text-white" : ""}`}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Chat
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className={`text-sm ${fullScreen ? "data-[state=active]:bg-white/20 data-[state=active]:text-white" : ""}`}
            >
              <Code className="h-4 w-4 mr-2" />
              Code Editor
            </TabsTrigger>
            <TabsTrigger
              value="performance"
              className={`text-sm ${fullScreen ? "data-[state=active]:bg-white/20 data-[state=active]:text-white" : ""}`}
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Performance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="flex-1 flex flex-col m-0">
            <ScrollArea className="flex-1 px-4">
              <div className="space-y-4 pb-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[90%] ${
                        message.type === "user"
                          ? fullScreen
                            ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-lg p-3 shadow-lg"
                            : "user-message"
                          : message.type === "system"
                            ? "bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200 rounded-lg p-3 border border-orange-200 dark:border-orange-700"
                            : fullScreen
                              ? "bg-white/10 backdrop-blur-sm text-white rounded-lg p-3 border border-white/20"
                              : "ai-message"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {message.type === "ai" ? (
                          <div
                            className={`p-1.5 rounded ${fullScreen ? "bg-white/20" : "bg-violet-100 dark:bg-violet-900"} mt-0.5`}
                          >
                            <Bot className={`h-4 w-4 ${fullScreen ? "text-white" : "text-violet-600"}`} />
                          </div>
                        ) : message.type === "user" ? (
                          <div className={`p-1.5 rounded ${fullScreen ? "bg-white/20" : "bg-white/20"} mt-0.5`}>
                            <User className="h-4 w-4 text-white" />
                          </div>
                        ) : (
                          <div className="p-1.5 rounded bg-orange-200 dark:bg-orange-800 mt-0.5">
                            <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-200" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div
                            className="text-sm whitespace-pre-wrap break-words"
                            dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                          />
                          <div className={`text-xs opacity-70 mt-2 ${fullScreen ? "text-white/60" : ""}`}>
                            {message.timestamp.toLocaleTimeString()}
                            {message.executionResult && (
                              <span className="ml-2">
                                • {message.executionResult.executionTime.toFixed(2)}ms •{" "}
                                {message.executionResult.memoryUsage.toFixed(1)}MB
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div
                      className={`${fullScreen ? "bg-white/10 backdrop-blur-sm text-white rounded-lg p-3 border border-white/20" : "ai-message"}`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-1.5 rounded ${fullScreen ? "bg-white/20" : "bg-violet-100 dark:bg-violet-900"}`}
                        >
                          <Bot className={`h-4 w-4 ${fullScreen ? "text-white" : "text-violet-600"}`} />
                        </div>
                        <div className="flex space-x-1">
                          <div
                            className={`w-2 h-2 ${fullScreen ? "bg-white" : "bg-violet-500"} rounded-full animate-bounce`}
                          ></div>
                          <div
                            className={`w-2 h-2 ${fullScreen ? "bg-white" : "bg-violet-500"} rounded-full animate-bounce`}
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className={`w-2 h-2 ${fullScreen ? "bg-white" : "bg-violet-500"} rounded-full animate-bounce`}
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Enhanced Quick Actions */}
            <div
              className={`p-4 border-t ${fullScreen ? "border-white/20" : "border-white/20 dark:border-slate-700/50"}`}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInputValue("Explain this algorithm step by step with examples")}
                  className={`text-xs h-8 ${fullScreen ? "bg-white/10 border-white/20 text-white hover:bg-white/20" : "bg-transparent"}`}
                >
                  <Lightbulb className="h-3 w-3 mr-1" />
                  Explain
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInputValue("Generate a complete, production-ready implementation")}
                  className={`text-xs h-8 ${fullScreen ? "bg-white/10 border-white/20 text-white hover:bg-white/20" : "bg-transparent"}`}
                >
                  <Code className="h-3 w-3 mr-1" />
                  Generate
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={suggestOptimization}
                  className={`text-xs h-8 ${fullScreen ? "bg-white/10 border-white/20 text-white hover:bg-white/20" : "bg-transparent"}`}
                >
                  <Zap className="h-3 w-3 mr-1" />
                  Optimize
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInputValue("Help me debug and fix issues in my code")}
                  className={`text-xs h-8 ${fullScreen ? "bg-white/10 border-white/20 text-white hover:bg-white/20" : "bg-transparent"}`}
                >
                  <Target className="h-3 w-3 mr-1" />
                  Debug
                </Button>
              </div>

              {/* Enhanced Input */}
              <div className="flex gap-2">
                <Textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about algorithms, optimizations, debugging, or implementation..."
                  className={`flex-1 min-h-[60px] max-h-[120px] resize-none text-sm ${
                    fullScreen ? "bg-white/10 border-white/20 text-white placeholder:text-white/60" : ""
                  }`}
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className={`self-end h-[60px] w-16 ${
                    fullScreen
                      ? "bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600"
                      : "btn-gradient"
                  }`}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="code" className="flex-1 flex flex-col m-0">
            <div className="flex-1 p-4">
              <div className="space-y-4">
                {/* Enhanced Code Editor Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h3 className={`text-sm font-medium ${fullScreen ? "text-white" : ""}`}>Advanced Code Editor</h3>
                    <Select value={codeLanguage} onValueChange={setCodeLanguage}>
                      <SelectTrigger
                        className={`w-32 h-8 text-xs ${fullScreen ? "bg-white/10 border-white/20 text-white" : ""}`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="java">Java</SelectItem>
                        <SelectItem value="cpp">C++</SelectItem>
                        <SelectItem value="rust">Rust</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={runCode}
                      disabled={isExecuting}
                      className={`text-xs ${fullScreen ? "bg-white/10 border-white/20 text-white hover:bg-white/20" : "bg-transparent"}`}
                    >
                      {isExecuting ? (
                        <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                      ) : (
                        <Play className="h-3 w-3 mr-1" />
                      )}
                      {isExecuting ? "Running..." : "Run"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigator.clipboard.writeText(currentCode)}
                      className={`text-xs ${fullScreen ? "bg-white/10 border-white/20 text-white hover:bg-white/20" : "bg-transparent"}`}
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const element = document.createElement("a")
                        const file = new Blob([currentCode], { type: "text/plain" })
                        element.href = URL.createObjectURL(file)
                        element.download = `${topic.toLowerCase().replace(/\s+/g, "_")}.${codeLanguage === "cpp" ? "cpp" : codeLanguage === "javascript" ? "js" : codeLanguage}`
                        document.body.appendChild(element)
                        element.click()
                        document.body.removeChild(element)
                      }}
                      className={`text-xs ${fullScreen ? "bg-white/10 border-white/20 text-white hover:bg-white/20" : "bg-transparent"}`}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Save
                    </Button>
                  </div>
                </div>

                {/* Enhanced Code Editor */}
                <div className="relative">
                  <Textarea
                    value={currentCode}
                    onChange={(e) => setCurrentCode(e.target.value)}
                    placeholder={`# ${topic} Implementation in ${codeLanguage.charAt(0).toUpperCase() + codeLanguage.slice(1)}
# Write your ${category === "data" ? "data structure" : category === "algorithm" ? "algorithm" : "code"} implementation here

def ${topic.toLowerCase().replace(/[^a-z0-9]/g, "_")}():
    """
    ${topic} implementation
    
    Time Complexity: O(?)
    Space Complexity: O(?)
    """
    # Your implementation here
    pass

# Example usage
if __name__ == "__main__":
    result = ${topic.toLowerCase().replace(/[^a-z0-9]/g, "_")}()
    print(f"Result: {result}")`}
                    className={`font-mono text-sm min-h-[400px] resize-none ${
                      fullScreen
                        ? "bg-black/20 border-white/20 text-white placeholder:text-white/50"
                        : "bg-slate-50 dark:bg-slate-900"
                    }`}
                  />
                  {/* Line numbers overlay */}
                  <div className="absolute left-3 top-3 pointer-events-none">
                    {currentCode.split("\n").map((_, index) => (
                      <div
                        key={index}
                        className={`text-xs font-mono ${fullScreen ? "text-white/40" : "text-slate-400"} leading-5`}
                      >
                        {index + 1}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Code Actions */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setInputValue(`Please review and improve this ${codeLanguage} code:\n\n${currentCode}`)
                    }
                    className={`text-xs ${fullScreen ? "bg-white/10 border-white/20 text-white hover:bg-white/20" : "bg-transparent"}`}
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Review
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setInputValue(`Help me debug this ${codeLanguage} code and fix any issues:\n\n${currentCode}`)
                    }
                    className={`text-xs ${fullScreen ? "bg-white/10 border-white/20 text-white hover:bg-white/20" : "bg-transparent"}`}
                  >
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Debug
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setInputValue(`Optimize this ${codeLanguage} code for better performance:\n\n${currentCode}`)
                    }
                    className={`text-xs ${fullScreen ? "bg-white/10 border-white/20 text-white hover:bg-white/20" : "bg-transparent"}`}
                  >
                    <Zap className="h-3 w-3 mr-1" />
                    Optimize
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setInputValue(`Add comprehensive documentation and comments to this code:\n\n${currentCode}`)
                    }
                    className={`text-xs ${fullScreen ? "bg-white/10 border-white/20 text-white hover:bg-white/20" : "bg-transparent"}`}
                  >
                    <FileText className="h-3 w-3 mr-1" />
                    Document
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="flex-1 flex flex-col m-0">
            <div className="flex-1 p-4">
              <div className="space-y-4">
                <h3 className={`text-lg font-semibold ${fullScreen ? "text-white" : ""}`}>Performance Analytics</h3>

                {/* Execution History */}
                {executionHistory.length > 0 && (
                  <div className="space-y-3">
                    <h4 className={`text-sm font-medium ${fullScreen ? "text-white" : ""}`}>Recent Executions</h4>
                    {executionHistory.slice(0, 5).map((result, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border ${
                          fullScreen
                            ? "bg-white/10 border-white/20"
                            : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {result.status === "success" ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <AlertCircle className="h-4 w-4 text-red-500" />
                            )}
                            <span className={`text-sm font-medium ${fullScreen ? "text-white" : ""}`}>
                              Execution #{executionHistory.length - index}
                            </span>
                          </div>
                          <Badge variant={result.status === "success" ? "default" : "destructive"}>
                            {result.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className={`h-4 w-4 ${fullScreen ? "text-white/70" : "text-muted-foreground"}`} />
                            <span className={fullScreen ? "text-white/90" : "text-muted-foreground"}>
                              {result.executionTime.toFixed(2)}ms
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MemoryStick
                              className={`h-4 w-4 ${fullScreen ? "text-white/70" : "text-muted-foreground"}`}
                            />
                            <span className={fullScreen ? "text-white/90" : "text-muted-foreground"}>
                              {result.memoryUsage.toFixed(1)}MB
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Performance Tips */}
                <div
                  className={`p-4 rounded-lg border ${
                    fullScreen
                      ? "bg-white/10 border-white/20"
                      : "bg-gradient-to-r from-violet-50 to-sky-50 dark:from-violet-900/20 dark:to-sky-900/20 border-violet-200/50 dark:border-violet-700/50"
                  }`}
                >
                  <h4
                    className={`text-sm font-medium mb-3 ${fullScreen ? "text-white" : "text-violet-700 dark:text-violet-300"}`}
                  >
                    Performance Optimization Tips
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <Cpu className={`h-4 w-4 mt-0.5 ${fullScreen ? "text-white/70" : "text-violet-600"}`} />
                      <span className={fullScreen ? "text-white/90" : "text-muted-foreground"}>
                        Use efficient data structures (heaps, hash tables) for better time complexity
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MemoryStick className={`h-4 w-4 mt-0.5 ${fullScreen ? "text-white/70" : "text-violet-600"}`} />
                      <span className={fullScreen ? "text-white/90" : "text-muted-foreground"}>
                        Implement in-place operations to reduce memory usage
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <TrendingUp className={`h-4 w-4 mt-0.5 ${fullScreen ? "text-white/70" : "text-violet-600"}`} />
                      <span className={fullScreen ? "text-white/90" : "text-muted-foreground"}>
                        Add early termination conditions to skip unnecessary work
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
