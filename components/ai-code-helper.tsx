"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
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
} from "lucide-react"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
  codeSnippet?: string
  language?: string
}

interface AICodeHelperProps {
  topic: string
  initialCode?: string
  language?: string
}

// Enhanced AI responses with more context
const mockAIResponses = {
  deepseek: {
    name: "DeepSeek Coder",
    model: "deepseek-coder-33b",
    responses: [
      "I'll analyze this algorithm step by step and provide an optimized solution:",
      "Let me break down the implementation with detailed explanations:",
      "Here's how we can improve the time complexity and code structure:",
      "I've identified several optimization opportunities in your approach:",
    ],
  },
  gemini: {
    name: "Gemini 2.0 Flash",
    model: "gemini-2.0-flash-exp",
    responses: [
      "Excellent question! Let me provide a comprehensive analysis:",
      "I can help you understand this concept with practical examples:",
      "Let me suggest a more efficient algorithmic approach:",
      "Here's a detailed breakdown with visual explanations:",
    ],
  },
}

const generateContextualResponse = (model: string, userInput: string, topic: string): string => {
  const modelData = mockAIResponses[model as keyof typeof mockAIResponses] || mockAIResponses.deepseek
  const randomResponse = modelData.responses[Math.floor(Math.random() * modelData.responses.length)]

  // Enhanced contextual responses based on topic and input
  if (userInput.toLowerCase().includes("implement") || userInput.toLowerCase().includes("code")) {
    const algorithmName = topic.toLowerCase().replace(/[^a-z0-9]/g, "_")
    return `${randomResponse}

\`\`\`python
# ${topic} - Optimized Implementation
def ${algorithmName}(data):
    """
    ${topic} algorithm implementation
    Time Complexity: O(n log n)
    Space Complexity: O(n)
    """
    # Initialize data structures
    result = []
    visited = set()
    priority_queue = []
    
    # Main algorithm logic
    while priority_queue:
        current = heapq.heappop(priority_queue)
        
        if current not in visited:
            visited.add(current)
            result.append(current)
            
            # Process neighbors/adjacent elements
            for neighbor in get_neighbors(current):
                if neighbor not in visited:
                    heapq.heappush(priority_queue, neighbor)
    
    return result

# Example usage
data = [/* your input data */]
result = ${algorithmName}(data)
print(f"Result: {result}")
\`\`\`

**Key Implementation Details:**
- Uses a priority queue for optimal selection
- Maintains visited set to avoid cycles
- Greedy approach ensures optimal solution
- Time complexity is O(n log n) due to heap operations

Would you like me to explain any specific part in more detail?`
  } else if (userInput.toLowerCase().includes("explain") || userInput.toLowerCase().includes("how")) {
    return `${randomResponse}

## Understanding ${topic}

**Core Concept:**
${topic} is a fundamental algorithm that solves optimization problems using a greedy approach.

**Key Principles:**
1. **Greedy Choice Property**: At each step, make the locally optimal choice
2. **Optimal Substructure**: Optimal solution contains optimal solutions to subproblems
3. **No Backtracking**: Once a choice is made, it's never reconsidered

**Step-by-Step Process:**
1. **Initialize**: Set up data structures (priority queue, visited set)
2. **Select**: Choose the best available option according to criteria
3. **Update**: Add selection to result and update data structures
4. **Repeat**: Continue until all elements are processed

**Real-World Applications:**
- Network routing protocols
- Task scheduling systems
- Resource allocation problems
- Graph connectivity analysis

**Complexity Analysis:**
- **Time**: O(n log n) - dominated by priority queue operations
- **Space**: O(n) - for storing visited nodes and queue

Would you like me to dive deeper into any specific aspect?`
  } else if (userInput.toLowerCase().includes("debug") || userInput.toLowerCase().includes("error")) {
    return `${randomResponse}

## Debugging ${topic} Implementation

**Common Issues & Solutions:**

**1. Infinite Loops**
- ❌ Problem: Not updating visited set properly
- ✅ Solution: Always mark nodes as visited before processing

**2. Incorrect Results**
- ❌ Problem: Wrong priority queue ordering
- ✅ Solution: Use proper comparison function (min-heap vs max-heap)

**3. Memory Issues**
- ❌ Problem: Not clearing processed elements
- ✅ Solution: Remove elements from queue after processing

**4. Edge Cases**
- ❌ Problem: Empty input or single element
- ✅ Solution: Add proper input validation

**Debugging Checklist:**
- [ ] Verify input validation and edge cases
- [ ] Check priority queue implementation (min/max heap)
- [ ] Ensure visited set is updated correctly
- [ ] Validate termination conditions
- [ ] Test with small examples first

**Debug Code Template:**
\`\`\`python
def debug_${topic.toLowerCase().replace(/[^a-z0-9]/g, "_")}(data):
    print(f"Input: {data}")
    
    # Add debug prints at key points
    visited = set()
    queue = []
    
    for step, item in enumerate(process_items(data)):
        print(f"Step {step}: Processing {item}")
        print(f"Visited: {visited}")
        print(f"Queue: {queue}")
        
    return result
\`\`\`

What specific error are you encountering? Share your code and I'll help identify the issue!`
  } else if (userInput.toLowerCase().includes("optimize") || userInput.toLowerCase().includes("improve")) {
    return `${randomResponse}

## Optimization Strategies for ${topic}

**Performance Improvements:**

**1. Data Structure Optimization**
\`\`\`python
# Instead of list operations O(n)
items = []
items.append(x)  # O(1)
min_item = min(items)  # O(n) - SLOW

# Use heap for O(log n) operations
import heapq
heap = []
heapq.heappush(heap, x)  # O(log n)
min_item = heapq.heappop(heap)  # O(log n) - FAST
\`\`\`

**2. Memory Optimization**
- Use generators instead of lists for large datasets
- Implement in-place operations where possible
- Clear unnecessary data structures

**3. Algorithmic Improvements**
- Early termination conditions
- Pruning unnecessary branches
- Caching frequently computed values

**4. Code Quality Enhancements**
\`\`\`python
# Optimized implementation
def optimized_${topic.toLowerCase().replace(/[^a-z0-9]/g, "_")}(data):
    if not data:  # Early return for empty input
        return []
    
    # Use more efficient data structures
    from collections import defaultdict
    import heapq
    
    # Pre-allocate known size structures
    result = []
    visited = set()
    heap = list(data)
    heapq.heapify(heap)  # O(n) instead of n * O(log n)
    
    while heap and len(result) < target_size:
        current = heapq.heappop(heap)
        if current not in visited:
            visited.add(current)
            result.append(current)
    
    return result
\`\`\`

**Performance Metrics:**
- Original: O(n²) time, O(n) space
- Optimized: O(n log n) time, O(n) space
- Memory usage reduced by ~40%
- Runtime improved by ~60%

Would you like me to analyze your specific code for optimization opportunities?`
  } else {
    return `${randomResponse}

## ${topic} - Complete Learning Guide

**What You'll Master:**
- Core algorithm principles and theory
- Efficient implementation techniques
- Real-world problem-solving applications
- Performance optimization strategies

**Learning Path:**
1. **Foundation** - Understand the problem and approach
2. **Implementation** - Write clean, working code
3. **Analysis** - Study time/space complexity
4. **Optimization** - Improve performance and readability
5. **Application** - Solve real-world problems

**Interactive Features Available:**
- 💬 **Ask Questions** - Get instant explanations
- 🔧 **Code Review** - Improve your implementations
- 🐛 **Debug Help** - Fix issues quickly
- ⚡ **Optimization** - Enhance performance
- 📚 **Provide Examples** - Show practical applications
- 🎯 **Guide Learning** - Personalized step-by-step help

**Quick Start Options:**
- "Explain the algorithm step by step"
- "Help me implement this from scratch"
- "Review my code for improvements"
- "Debug this error I'm getting"
- "Show me optimization techniques"

What specific aspect of ${topic} would you like to explore first?`
  }
}

export default function AICodeHelper({ topic, initialCode = "", language = "python" }: AICodeHelperProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: `🤖 **AI Assistant Ready!**

I'm your dedicated coding companion for **${topic}**. I'm powered by advanced language models and ready to help you master this algorithm.

**What I can do:**
• 🧠 **Explain Concepts** - Break down complex ideas
• 💻 **Write Code** - Generate clean, efficient implementations  
• 🔍 **Debug Issues** - Find and fix problems quickly
• ⚡ **Optimize Performance** - Improve speed and memory usage
• 📚 **Provide Examples** - Show practical applications
• 🎯 **Guide Learning** - Personalized step-by-step help

**Ready to start?** Ask me anything about ${topic} or click one of the quick actions below!`,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [currentCode, setCurrentCode] = useState(initialCode)
  const [selectedModel, setSelectedModel] = useState("deepseek")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")
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

    // Simulate AI response with realistic delay
    setTimeout(
      () => {
        const aiResponse = generateContextualResponse(selectedModel, inputValue, topic)

        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "ai",
          content: aiResponse,
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, aiMessage])
        setIsLoading(false)
      },
      1500 + Math.random() * 2000,
    )
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const runCode = () => {
    const output = `🚀 Executing ${language} code...

✅ **Execution Successful!**

📊 **Results:**
- Algorithm completed successfully
- All test cases passed ✓
- Performance: Excellent
- Memory usage: Optimal

⏱️  **Performance Metrics:**
- Execution time: 0.003s
- Memory used: 2.1MB
- CPU usage: 12%

🎯 **Analysis:**
- Time complexity: O(n log n)
- Space complexity: O(n)
- Code quality: A+`

    const executionMessage: Message = {
      id: Date.now().toString(),
      type: "ai",
      content: `**Code Execution Results:**

\`\`\`
${output}
\`\`\`

🎉 Excellent work! Your ${topic} implementation is running perfectly. The algorithm demonstrates optimal performance characteristics and follows best practices.

**Next Steps:**
- Try with different input sizes
- Experiment with edge cases
- Consider optimization opportunities

Would you like me to suggest any improvements or explain the results in more detail?`,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, executionMessage])
  }

  const suggestOptimization = () => {
    const suggestion = `🚀 **Advanced Optimization Analysis for ${topic}**

**Performance Enhancements Identified:**

**1. 🏎️ Algorithm Optimization**
- Replace linear search with binary search: **60% faster**
- Use hash tables for O(1) lookups: **40% memory efficient**
- Implement early termination: **25% fewer operations**

**2. 💾 Memory Management**
- Use in-place operations: **50% less memory**
- Implement object pooling: **30% fewer allocations**
- Optimize data structures: **20% smaller footprint**

**3. 🔧 Code Quality**
- Add comprehensive error handling
- Implement proper logging and debugging
- Use type hints for better maintainability
- Follow PEP 8 style guidelines

**4. 📊 Scalability Improvements**
- Parallel processing for large datasets
- Streaming for memory-constrained environments
- Caching for repeated computations

**Optimization Priority:**
1. **High Impact**: Data structure improvements
2. **Medium Impact**: Algorithm refinements  
3. **Low Impact**: Code style enhancements

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
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(
        /`([^`]+)`/g,
        '<code class="bg-violet-100 dark:bg-violet-900 px-2 py-1 rounded text-sm font-mono">$1</code>',
      )
      .replace(
        /```(\w+)?\n([\s\S]*?)```/g,
        '<pre class="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto mt-3 mb-3 border border-slate-700"><code>$2</code></pre>',
      )
      .replace(
        /^## (.*$)/gm,
        '<h3 class="text-lg font-semibold mt-4 mb-2 text-violet-700 dark:text-violet-300">$1</h3>',
      )
      .replace(/^### (.*$)/gm, '<h4 class="text-md font-medium mt-3 mb-2 text-sky-600 dark:text-sky-400">$1</h4>')
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-white to-violet-50/30 dark:from-slate-900 dark:to-violet-900/10">
      {/* Compact Header */}
      <div className="p-3 border-b border-white/20 dark:border-slate-700/50">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-gradient-to-r from-violet-500 to-emerald-500">
              <Bot className="h-3 w-3 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">AI Assistant</h3>
              <p className="text-xs text-muted-foreground">
                {mockAIResponses[selectedModel as keyof typeof mockAIResponses]?.name}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedModel(selectedModel === "deepseek" ? "gemini" : "deepseek")}
            className="h-7 w-7 p-0"
          >
            <RefreshCw className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="mx-3 mt-2 mb-2 h-8">
            <TabsTrigger value="chat" className="text-xs h-6 px-3">
              <MessageSquare className="h-3 w-3 mr-1" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="code" className="text-xs h-6 px-3">
              <Code className="h-3 w-3 mr-1" />
              Code
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="flex-1 flex flex-col m-0">
            <ScrollArea className="flex-1 px-3">
              <div className="space-y-3 pb-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[90%] ${message.type === "user" ? "user-message" : "ai-message"}`}>
                      <div className="flex items-start gap-2">
                        {message.type === "ai" ? (
                          <div className="p-1 rounded bg-violet-100 dark:bg-violet-900 mt-0.5">
                            <Bot className="h-3 w-3 text-violet-600" />
                          </div>
                        ) : (
                          <div className="p-1 rounded bg-white/20 mt-0.5">
                            <User className="h-3 w-3 text-white" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div
                            className="text-sm whitespace-pre-wrap break-words"
                            dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                          />
                          <div className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="ai-message">
                      <div className="flex items-center gap-2">
                        <div className="p-1 rounded bg-violet-100 dark:bg-violet-900">
                          <Bot className="h-3 w-3 text-violet-600" />
                        </div>
                        <div className="flex space-x-1">
                          <div className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-bounce"></div>
                          <div
                            className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-bounce"
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

            {/* Quick Actions */}
            <div className="p-3 border-t border-white/20 dark:border-slate-700/50">
              <div className="grid grid-cols-2 gap-1 mb-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInputValue("Explain this algorithm step by step")}
                  className="text-xs h-7 bg-transparent"
                >
                  <Lightbulb className="h-3 w-3 mr-1" />
                  Explain
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInputValue("Help me implement this")}
                  className="text-xs h-7 bg-transparent"
                >
                  <Code className="h-3 w-3 mr-1" />
                  Code
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={suggestOptimization}
                  className="text-xs h-7 bg-transparent"
                >
                  <Zap className="h-3 w-3 mr-1" />
                  Optimize
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInputValue("Debug my code")}
                  className="text-xs h-7 bg-transparent"
                >
                  <Target className="h-3 w-3 mr-1" />
                  Debug
                </Button>
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <Textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1 min-h-[50px] max-h-[100px] resize-none text-sm"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="self-end btn-gradient h-[50px] w-12"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="code" className="flex-1 flex flex-col m-0">
            <div className="flex-1 p-3">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Code Editor</h3>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm" onClick={runCode} className="h-7 text-xs bg-transparent">
                      <Play className="h-3 w-3 mr-1" />
                      Run
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigator.clipboard.writeText(currentCode)}
                      className="h-7 text-xs bg-transparent"
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </Button>
                  </div>
                </div>
                <Textarea
                  value={currentCode}
                  onChange={(e) => setCurrentCode(e.target.value)}
                  placeholder={`# ${topic} Implementation
def algorithm():
    # Your code here
    pass`}
                  className="font-mono text-sm min-h-[200px] resize-none"
                />
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setInputValue(`Review this code:\n\n${currentCode}`)}
                    className="text-xs bg-transparent"
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Review
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setInputValue(`Debug this code:\n\n${currentCode}`)}
                    className="text-xs bg-transparent"
                  >
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Debug
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
