"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  TrendingUp,
  Clock,
  BarChart3,
  Brain,
  Target,
  Zap,
  ArrowRight,
  BookOpen,
  Calculator,
  Activity,
} from "lucide-react"
import ComplexityVisualization from "@/components/complexity-visualization"
import CodeBlock from "@/components/code-block"
import Quiz from "@/components/quiz"

const complexityExamples = {
  "O(1)": {
    name: "Constant Time",
    description: "Execution time remains constant regardless of input size",
    color: "from-emerald-500 to-teal-600",
    examples: ["Array access by index", "Hash table lookup", "Stack push/pop"],
    code: `# O(1) - Constant Time Examples

# Array access by index
def get_first_element(arr):
    return arr[0]  # Always takes same time

# Hash table lookup
def get_value(hash_table, key):
    return hash_table[key]  # Average O(1)

# Stack operations
def stack_push(stack, item):
    stack.append(item)  # O(1) operation

def stack_pop(stack):
    return stack.pop()  # O(1) operation`,
  },
  "O(log n)": {
    name: "Logarithmic Time",
    description: "Execution time grows logarithmically with input size",
    color: "from-sky-500 to-blue-600",
    examples: ["Binary search", "Balanced tree operations", "Heap operations"],
    code: `# O(log n) - Logarithmic Time Examples

# Binary search
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

# Binary tree search
def search_bst(root, target):
    if not root or root.val == target:
        return root
    
    if target < root.val:
        return search_bst(root.left, target)
    else:
        return search_bst(root.right, target)`,
  },
  "O(n)": {
    name: "Linear Time",
    description: "Execution time grows linearly with input size",
    color: "from-violet-500 to-purple-600",
    examples: ["Linear search", "Array traversal", "Finding min/max"],
    code: `# O(n) - Linear Time Examples

# Linear search
def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1

# Find maximum element
def find_max(arr):
    if not arr:
        return None
    
    max_val = arr[0]
    for num in arr[1:]:
        if num > max_val:
            max_val = num
    return max_val

# Sum all elements
def sum_array(arr):
    total = 0
    for num in arr:
        total += num
    return total`,
  },
  "O(n log n)": {
    name: "Linearithmic Time",
    description: "Execution time grows as n times log n",
    color: "from-orange-500 to-red-600",
    examples: ["Merge sort", "Heap sort", "Quick sort (average)"],
    code: `# O(n log n) - Linearithmic Time Examples

# Merge Sort
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    result.extend(left[i:])
    result.extend(right[j:])
    return result

# Heap Sort
def heap_sort(arr):
    def heapify(arr, n, i):
        largest = i
        left = 2 * i + 1
        right = 2 * i + 2
        
        if left < n and arr[left] > arr[largest]:
            largest = left
        if right < n and arr[right] > arr[largest]:
            largest = right
        
        if largest != i:
            arr[i], arr[largest] = arr[largest], arr[i]
            heapify(arr, n, largest)
    
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)
    
    return arr`,
  },
  "O(n²)": {
    name: "Quadratic Time",
    description: "Execution time grows quadratically with input size",
    color: "from-rose-500 to-pink-600",
    examples: ["Bubble sort", "Selection sort", "Nested loops"],
    code: `# O(n²) - Quadratic Time Examples

# Bubble Sort
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

# Selection Sort
def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr

# Find all pairs with given sum
def find_pairs_with_sum(arr, target_sum):
    pairs = []
    n = len(arr)
    for i in range(n):
        for j in range(i + 1, n):
            if arr[i] + arr[j] == target_sum:
                pairs.append((arr[i], arr[j]))
    return pairs`,
  },
  "O(2^n)": {
    name: "Exponential Time",
    description: "Execution time doubles with each additional input element",
    color: "from-red-600 to-rose-700",
    examples: ["Recursive Fibonacci", "Tower of Hanoi", "Subset generation"],
    code: `# O(2^n) - Exponential Time Examples

# Naive Fibonacci (inefficient)
def fibonacci_naive(n):
    if n <= 1:
        return n
    return fibonacci_naive(n - 1) + fibonacci_naive(n - 2)

# Generate all subsets
def generate_subsets(arr):
    if not arr:
        return [[]]
    
    first = arr[0]
    rest_subsets = generate_subsets(arr[1:])
    
    new_subsets = []
    for subset in rest_subsets:
        new_subsets.append([first] + subset)
    
    return rest_subsets + new_subsets

# Tower of Hanoi
def tower_of_hanoi(n, source, destination, auxiliary):
    if n == 1:
        print(f"Move disk 1 from {source} to {destination}")
        return
    
    tower_of_hanoi(n - 1, source, auxiliary, destination)
    print(f"Move disk {n} from {source} to {destination}")
    tower_of_hanoi(n - 1, auxiliary, destination, source)`,
  },
}

const quizQuestions = [
  {
    question: "What is the time complexity of accessing an element in an array by its index?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correct: 0,
    explanation:
      "Array access by index is O(1) because arrays store elements in contiguous memory locations, allowing direct access.",
  },
  {
    question: "Which sorting algorithm has O(n log n) average time complexity?",
    options: ["Bubble Sort", "Selection Sort", "Merge Sort", "Insertion Sort"],
    correct: 2,
    explanation: "Merge Sort consistently has O(n log n) time complexity in all cases (best, average, and worst).",
  },
  {
    question: "What does 'Big O' notation describe?",
    options: [
      "Exact execution time",
      "Upper bound of algorithm's growth rate",
      "Memory usage only",
      "Best case scenario",
    ],
    correct: 1,
    explanation:
      "Big O notation describes the upper bound of an algorithm's time or space complexity as input size approaches infinity.",
  },
  {
    question: "Which complexity grows faster: O(n²) or O(n log n)?",
    options: ["O(n²)", "O(n log n)", "They grow at the same rate", "It depends on the constant factors"],
    correct: 0,
    explanation:
      "O(n²) grows much faster than O(n log n). For large inputs, quadratic algorithms become significantly slower.",
  },
]

export default function ComplexityAnalysisPage() {
  const [selectedComplexity, setSelectedComplexity] = useState<keyof typeof complexityExamples>("O(1)")
  const [progress, setProgress] = useState(0)
  const [activeTab, setActiveTab] = useState("overview")

  const currentComplexity = complexityExamples[selectedComplexity]

  return (
    <div className="min-h-screen gradient-bg dark:gradient-bg-dark">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 px-4 py-2 rounded-full mb-6">
            <TrendingUp className="h-5 w-5 text-orange-600" />
            <span className="text-orange-700 dark:text-orange-300 font-medium">Algorithm Analysis</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gradient-orange">Complexity Analysis</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Master the art of analyzing algorithm efficiency. Learn to evaluate time and space complexity using Big O
            notation and make informed decisions about algorithm selection.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white/80 dark:bg-black/20 px-4 py-2 rounded-full">
              <Clock className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium">1 hour</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 dark:bg-black/20 px-4 py-2 rounded-full">
              <Target className="h-4 w-4 text-sky-600" />
              <span className="text-sm font-medium">Fundamental</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 dark:bg-black/20 px-4 py-2 rounded-full">
              <Brain className="h-4 w-4 text-violet-600" />
              <span className="text-sm font-medium">Analysis Skills</span>
            </div>
          </div>

          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Complexity Selector */}
        <Card className="mb-8 animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-600">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              Explore Time Complexities
            </CardTitle>
            <CardDescription>
              Select a complexity class to explore its characteristics, examples, and code implementations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
              {Object.entries(complexityExamples).map(([complexity, data]) => (
                <Button
                  key={complexity}
                  variant={selectedComplexity === complexity ? "default" : "outline"}
                  className={`h-auto p-4 flex flex-col items-center gap-2 ${
                    selectedComplexity === complexity
                      ? `bg-gradient-to-r ${data.color} text-white hover:opacity-90`
                      : ""
                  }`}
                  onClick={() => setSelectedComplexity(complexity as keyof typeof complexityExamples)}
                >
                  <div className="font-mono font-bold text-sm">{complexity}</div>
                  <div className="text-xs text-center opacity-80">{data.name}</div>
                </Button>
              ))}
            </div>

            <Select value={selectedComplexity} onValueChange={(value) => setSelectedComplexity(value as keyof typeof complexityExamples)}>
              <SelectTrigger className="md:hidden">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(complexityExamples).map(([complexity, data]) => (
                  <SelectItem key={complexity} value={complexity}>
                    {complexity} - {data.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Detailed Analysis */}
        {currentComplexity && (
          <Card className="mb-8 animate-fade-in">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-xl bg-gradient-to-r ${currentComplexity.color}`}>
                  <Activity className="h-8 w-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-mono">{selectedComplexity}</CardTitle>
                  <CardDescription className="text-base mt-1">{currentComplexity.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="examples">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Examples
                  </TabsTrigger>
                  <TabsTrigger value="visualization">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Visualization
                  </TabsTrigger>
                  <TabsTrigger value="quiz">
                    <Brain className="h-4 w-4 mr-2" />
                    Quiz
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-gradient-orange">
                        {currentComplexity.name} Characteristics
                      </h3>
                      <p className="text-muted-foreground mb-4">{currentComplexity.description}</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-3">Common Examples</h4>
                      <div className="flex flex-wrap gap-2">
                        {currentComplexity.examples.map((example, idx) => (
                          <Badge key={idx} variant="secondary" className="px-3 py-1">
                            {example}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Growth Rate</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span>n = 10</span>
                              <span className="font-mono">
                                {selectedComplexity === "O(1)" && "1"}
                                {selectedComplexity === "O(log n)" && "~3.3"}
                                {selectedComplexity === "O(n)" && "10"}
                                {selectedComplexity === "O(n log n)" && "~33"}
                                {selectedComplexity === "O(n²)" && "100"}
                                {selectedComplexity === "O(2^n)" && "1,024"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>n = 100</span>
                              <span className="font-mono">
                                {selectedComplexity === "O(1)" && "1"}
                                {selectedComplexity === "O(log n)" && "~6.6"}
                                {selectedComplexity === "O(n)" && "100"}
                                {selectedComplexity === "O(n log n)" && "~664"}
                                {selectedComplexity === "O(n²)" && "10,000"}
                                {selectedComplexity === "O(2^n)" && "2^100"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>n = 1,000</span>
                              <span className="font-mono">
                                {selectedComplexity === "O(1)" && "1"}
                                {selectedComplexity === "O(log n)" && "~10"}
                                {selectedComplexity === "O(n)" && "1,000"}
                                {selectedComplexity === "O(n log n)" && "~9,966"}
                                {selectedComplexity === "O(n²)" && "1,000,000"}
                                {selectedComplexity === "O(2^n)" && "2^1000"}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Performance Rating</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <span className="w-20">Excellent</span>
                              <div
                                className={`h-2 rounded-full ${
                                  selectedComplexity === "O(1)" ? "bg-emerald-500 w-full" : "bg-gray-200 w-0"
                                }`}
                              />
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="w-20">Good</span>
                              <div
                                className={`h-2 rounded-full ${
                                  selectedComplexity === "O(log n)" ? "bg-sky-500 w-4/5" : "bg-gray-200 w-0"
                                }`}
                              />
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="w-20">Fair</span>
                              <div
                                className={`h-2 rounded-full ${
                                  selectedComplexity === "O(n)" ? "bg-violet-500 w-3/5" : "bg-gray-200 w-0"
                                }`}
                              />
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="w-20">Poor</span>
                              <div
                                className={`h-2 rounded-full ${
                                  selectedComplexity === "O(n log n)" ? "bg-orange-500 w-2/5" : "bg-gray-200 w-0"
                                }`}
                              />
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="w-20">Bad</span>
                              <div
                                className={`h-2 rounded-full ${
                                  selectedComplexity === "O(n²)" ? "bg-rose-500 w-1/5" : "bg-gray-200 w-0"
                                }`}
                              />
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="w-20">Terrible</span>
                              <div
                                className={`h-2 rounded-full ${
                                  selectedComplexity === "O(2^n)" ? "bg-red-600 w-1/12" : "bg-gray-200 w-0"
                                }`}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="examples" className="mt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-gradient-orange">Code Examples</h3>
                      <Badge variant="outline">Python</Badge>
                    </div>
                    <CodeBlock code={currentComplexity.code} language="python" />
                  </div>
                </TabsContent>

                <TabsContent value="visualization" className="mt-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gradient-orange">Growth Rate Visualization</h3>
                    <ComplexityVisualization selectedComplexity={selectedComplexity} />
                  </div>
                </TabsContent>

                <TabsContent value="quiz" className="mt-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gradient-orange">Test Your Knowledge</h3>
                    <Quiz questions={quizQuestions} onComplete={(score) => setProgress(Math.max(progress, score))} />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}

        {/* Next Steps */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              Master Algorithm Analysis
            </CardTitle>
            <CardDescription>
              You've learned the fundamentals of complexity analysis. Ready to apply this knowledge?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-gradient flex-1" size="lg">
                <ArrowRight className="h-4 w-4 mr-2" />
                Practice with Algorithms
              </Button>
              <Button variant="outline" size="lg" className="flex-1 bg-transparent">
                <BookOpen className="h-4 w-4 mr-2" />
                Advanced Topics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
