"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Database,
  List,
  SquareStackIcon as Stack,
  Layers,
  GitBranch,
  Hash,
  Clock,
  Zap,
  BookOpen,
  Play,
  CheckCircle,
  ArrowRight,
  Code,
  Brain,
  Target,
} from "lucide-react"
import DataStructureVisualization from "@/components/data-structure-visualization"
import CodeBlock from "@/components/code-block"
import Quiz from "@/components/quiz"

const dataStructures = [
  {
    id: "arrays",
    name: "Arrays",
    icon: Database,
    description: "Linear collection of elements stored in contiguous memory locations",
    complexity: {
      access: "O(1)",
      search: "O(n)",
      insertion: "O(n)",
      deletion: "O(n)",
    },
    advantages: ["Fast access by index", "Memory efficient", "Cache friendly"],
    disadvantages: ["Fixed size", "Expensive insertion/deletion", "Memory waste"],
    useCases: ["Mathematical operations", "Lookup tables", "Buffers"],
    color: "from-violet-500 to-purple-600",
  },
  {
    id: "linkedlists",
    name: "Linked Lists",
    icon: List,
    description: "Linear collection of nodes where each node contains data and a reference to the next node",
    complexity: {
      access: "O(n)",
      search: "O(n)",
      insertion: "O(1)",
      deletion: "O(1)",
    },
    advantages: ["Dynamic size", "Efficient insertion/deletion", "Memory efficient"],
    disadvantages: ["No random access", "Extra memory for pointers", "Not cache friendly"],
    useCases: ["Dynamic lists", "Undo functionality", "Music playlists"],
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "stacks",
    name: "Stacks",
    icon: Stack,
    description: "LIFO (Last In, First Out) data structure with push and pop operations",
    complexity: {
      access: "O(n)",
      search: "O(n)",
      insertion: "O(1)",
      deletion: "O(1)",
    },
    advantages: ["Simple implementation", "Fast push/pop", "Memory efficient"],
    disadvantages: ["Limited access", "No random access", "Stack overflow risk"],
    useCases: ["Function calls", "Expression evaluation", "Undo operations"],
    color: "from-sky-500 to-blue-600",
  },
  {
    id: "queues",
    name: "Queues",
    icon: Layers,
    description: "FIFO (First In, First Out) data structure with enqueue and dequeue operations",
    complexity: {
      access: "O(n)",
      search: "O(n)",
      insertion: "O(1)",
      deletion: "O(1)",
    },
    advantages: ["Fair ordering", "Fast enqueue/dequeue", "Simple implementation"],
    disadvantages: ["Limited access", "No random access", "Memory overhead"],
    useCases: ["Task scheduling", "Breadth-first search", "Print queues"],
    color: "from-orange-500 to-red-600",
  },
  {
    id: "trees",
    name: "Trees",
    icon: GitBranch,
    description: "Hierarchical data structure with nodes connected by edges",
    complexity: {
      access: "O(log n)",
      search: "O(log n)",
      insertion: "O(log n)",
      deletion: "O(log n)",
    },
    advantages: ["Hierarchical structure", "Fast search", "Dynamic size"],
    disadvantages: ["Complex implementation", "Memory overhead", "Can become unbalanced"],
    useCases: ["File systems", "Decision trees", "Database indexing"],
    color: "from-rose-500 to-pink-600",
  },
  {
    id: "hashtables",
    name: "Hash Tables",
    icon: Hash,
    description: "Data structure that maps keys to values using a hash function",
    complexity: {
      access: "N/A",
      search: "O(1)",
      insertion: "O(1)",
      deletion: "O(1)",
    },
    advantages: ["Fast lookup", "Dynamic size", "Flexible keys"],
    disadvantages: ["Hash collisions", "Memory overhead", "No ordering"],
    useCases: ["Caches", "Database indexing", "Symbol tables"],
    color: "from-indigo-500 to-purple-600",
  },
]

const arrayCode = `# Array Implementation in Python
class Array:
    def __init__(self, capacity):
        self.data = [None] * capacity
        self.size = 0
        self.capacity = capacity
    
    def get(self, index):
        if 0 <= index < self.size:
            return self.data[index]
        raise IndexError("Index out of bounds")
    
    def set(self, index, value):
        if 0 <= index < self.size:
            self.data[index] = value
        else:
            raise IndexError("Index out of bounds")
    
    def append(self, value):
        if self.size < self.capacity:
            self.data[self.size] = value
            self.size += 1
        else:
            raise OverflowError("Array is full")
    
    def insert(self, index, value):
        if self.size >= self.capacity:
            raise OverflowError("Array is full")
        
        # Shift elements to the right
        for i in range(self.size, index, -1):
            self.data[i] = self.data[i - 1]
        
        self.data[index] = value
        self.size += 1
    
    def delete(self, index):
        if index < 0 or index >= self.size:
            raise IndexError("Index out of bounds")
        
        # Shift elements to the left
        for i in range(index, self.size - 1):
            self.data[i] = self.data[i + 1]
        
        self.size -= 1
        self.data[self.size] = None

# Usage example
arr = Array(5)
arr.append(10)
arr.append(20)
arr.append(30)
print(arr.get(1))  # Output: 20`

const linkedListCode = `# Linked List Implementation in Python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
        self.size = 0
    
    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
        else:
            current = self.head
            while current.next:
                current = current.next
            current.next = new_node
        self.size += 1
    
    def prepend(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node
        self.size += 1
    
    def delete(self, data):
        if not self.head:
            return False
        
        if self.head.data == data:
            self.head = self.head.next
            self.size -= 1
            return True
        
        current = self.head
        while current.next:
            if current.next.data == data:
                current.next = current.next.next
                self.size -= 1
                return True
            current = current.next
        return False
    
    def find(self, data):
        current = self.head
        index = 0
        while current:
            if current.data == data:
                return index
            current = current.next
            index += 1
        return -1
    
    def display(self):
        elements = []
        current = self.head
        while current:
            elements.append(current.data)
            current = current.next
        return elements

# Usage example
ll = LinkedList()
ll.append(1)
ll.append(2)
ll.append(3)
print(ll.display())  # Output: [1, 2, 3]`

const stackCode = `# Stack Implementation in Python
class Stack:
    def __init__(self):
        self.items = []
    
    def push(self, item):
        """Add an item to the top of the stack"""
        self.items.append(item)
    
    def pop(self):
        """Remove and return the top item from the stack"""
        if self.is_empty():
            raise IndexError("Stack is empty")
        return self.items.pop()
    
    def peek(self):
        """Return the top item without removing it"""
        if self.is_empty():
            raise IndexError("Stack is empty")
        return self.items[-1]
    
    def is_empty(self):
        """Check if the stack is empty"""
        return len(self.items) == 0
    
    def size(self):
        """Return the number of items in the stack"""
        return len(self.items)
    
    def display(self):
        """Display all items in the stack"""
        return self.items.copy()

# Usage example
stack = Stack()
stack.push(1)
stack.push(2)
stack.push(3)
print(stack.display())  # Output: [1, 2, 3]
print(stack.pop())      # Output: 3
print(stack.peek())     # Output: 2`

const quizQuestions = [
  {
    question: "What is the time complexity of accessing an element in an array by index?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correct: 0,
    explanation:
      "Arrays provide constant time access to elements by index because elements are stored in contiguous memory locations.",
  },
  {
    question: "Which data structure follows the LIFO (Last In, First Out) principle?",
    options: ["Queue", "Array", "Stack", "Linked List"],
    correct: 2,
    explanation: "Stack follows LIFO principle where the last element added is the first one to be removed.",
  },
  {
    question: "What is the main advantage of linked lists over arrays?",
    options: ["Faster access", "Less memory usage", "Dynamic size", "Better cache performance"],
    correct: 2,
    explanation: "Linked lists can grow and shrink during runtime, unlike arrays which have a fixed size.",
  },
  {
    question: "In a hash table, what is the average time complexity for search operations?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correct: 0,
    explanation:
      "Hash tables provide average O(1) time complexity for search operations due to direct key-to-index mapping.",
  },
]

export default function DataStructuresPage() {
  const [selectedStructure, setSelectedStructure] = useState("arrays")
  const [progress, setProgress] = useState(65)

  const currentStructure = dataStructures.find((ds) => ds.id === selectedStructure)

  const getCodeExample = (structureId: string) => {
    switch (structureId) {
      case "arrays":
        return arrayCode
      case "linkedlists":
        return linkedListCode
      case "stacks":
        return stackCode
      default:
        return arrayCode
    }
  }

  return (
    <div className="min-h-screen gradient-bg dark:gradient-bg-dark">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-violet-100 dark:bg-violet-900/30 px-4 py-2 rounded-full mb-6">
            <Database className="h-5 w-5 text-violet-600" />
            <span className="text-violet-700 dark:text-violet-300 font-medium">Data Structures</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">Master Data Structures</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Learn the fundamental building blocks of computer science. Understand how data is organized, stored, and
            manipulated efficiently in memory.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white/80 dark:bg-black/20 px-4 py-2 rounded-full">
              <Clock className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-medium">2-3 hours</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 dark:bg-black/20 px-4 py-2 rounded-full">
              <Target className="h-4 w-4 text-sky-600" />
              <span className="text-sm font-medium">6 Topics</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 dark:bg-black/20 px-4 py-2 rounded-full">
              <Brain className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium">Beginner to Intermediate</span>
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

        {/* Data Structure Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {dataStructures.map((structure, index) => {
            const Icon = structure.icon
            return (
              <Card
                key={structure.id}
                className={`card-hover cursor-pointer transition-all duration-300 ${
                  selectedStructure === structure.id
                    ? "ring-2 ring-violet-500 shadow-lg shadow-violet-500/20"
                    : "hover:shadow-lg"
                }`}
                onClick={() => setSelectedStructure(structure.id)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${structure.color}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    {selectedStructure === structure.id && <CheckCircle className="h-5 w-5 text-emerald-500" />}
                  </div>
                  <CardTitle className="text-xl">{structure.name}</CardTitle>
                  <CardDescription className="text-sm">{structure.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="text-center p-2 bg-muted rounded-lg">
                      <div className="text-xs text-muted-foreground">Access</div>
                      <div className="font-mono text-sm font-medium">{structure.complexity.access}</div>
                    </div>
                    <div className="text-center p-2 bg-muted rounded-lg">
                      <div className="text-xs text-muted-foreground">Search</div>
                      <div className="font-mono text-sm font-medium">{structure.complexity.search}</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {structure.useCases.slice(0, 2).map((useCase, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {useCase}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Detailed View */}
        {currentStructure && (
          <Card className="mb-8 animate-fade-in">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-xl bg-gradient-to-r ${currentStructure.color}`}>
                  <currentStructure.icon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">{currentStructure.name}</CardTitle>
                  <CardDescription className="text-base mt-1">{currentStructure.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview" className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="implementation" className="flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    Code
                  </TabsTrigger>
                  <TabsTrigger value="visualization" className="flex items-center gap-2">
                    <Play className="h-4 w-4" />
                    Visualize
                  </TabsTrigger>
                  <TabsTrigger value="quiz" className="flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    Quiz
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-gradient">Time Complexity</h3>
                      <div className="space-y-3">
                        {Object.entries(currentStructure.complexity).map(([operation, complexity]) => (
                          <div key={operation} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                            <span className="capitalize font-medium">{operation}</span>
                            <Badge variant="outline" className="font-mono">
                              {complexity}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-gradient">Characteristics</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-emerald-600 mb-2">✓ Advantages</h4>
                          <ul className="space-y-1">
                            {currentStructure.advantages.map((advantage, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                                {advantage}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-rose-600 mb-2">✗ Disadvantages</h4>
                          <ul className="space-y-1">
                            {currentStructure.disadvantages.map((disadvantage, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
                                {disadvantage}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-4 text-gradient">Common Use Cases</h3>
                    <div className="flex flex-wrap gap-2">
                      {currentStructure.useCases.map((useCase, idx) => (
                        <Badge key={idx} variant="secondary" className="px-3 py-1">
                          {useCase}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="implementation" className="mt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gradient">Implementation</h3>
                      <Badge variant="outline">Python</Badge>
                    </div>
                    <CodeBlock code={getCodeExample(selectedStructure)} language="python" />
                  </div>
                </TabsContent>

                <TabsContent value="visualization" className="mt-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gradient">Interactive Visualization</h3>
                    <DataStructureVisualization 
                      type={selectedStructure} 
                      animationSpeed={1}
                      darkMode={false}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="quiz" className="mt-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gradient">Test Your Knowledge</h3>
                    <Quiz questions={quizQuestions} onComplete={() => {}} />
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
              Ready for the Next Challenge?
            </CardTitle>
            <CardDescription>
              Now that you understand data structures, let's explore algorithms that work with them.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-gradient flex-1" size="lg">
                <ArrowRight className="h-4 w-4 mr-2" />
                Continue to Algorithms
              </Button>
              <Button variant="outline" size="lg" className="flex-1 bg-transparent">
                <BookOpen className="h-4 w-4 mr-2" />
                Review Concepts
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
