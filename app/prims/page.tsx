"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GitBranch, Clock, Target, Brain, BookOpen, Code, Play, Zap, ArrowRight, CheckCircle } from "lucide-react"
import PrimsVisualization from "@/components/prims-visualization"
import AICodeHelper from "@/components/ai-code-helper"
import Quiz from "@/components/quiz"
import CodeBlock from "@/components/code-block"
import ConfettiAnimation from "@/components/confetti-animation"

const primsCode = `# Prim's Algorithm Implementation in Python
import heapq
from collections import defaultdict

class Graph:
    def __init__(self):
        self.vertices = set()
        self.edges = defaultdict(list)
    
    def add_edge(self, u, v, weight):
        """Add an edge between vertices u and v with given weight"""
        self.vertices.add(u)
        self.vertices.add(v)
        self.edges[u].append((v, weight))
        self.edges[v].append((u, weight))
    
    def get_vertices(self):
        """Return all vertices in the graph"""
        return list(self.vertices)
    
    def get_edges(self, vertex):
        """Return all edges connected to a vertex"""
        return self.edges[vertex]

def prims_algorithm(graph, start_vertex):
    """
    Prim's algorithm to find Minimum Spanning Tree
    
    Args:
        graph: Graph object containing vertices and edges
        start_vertex: Starting vertex for the algorithm
    
    Returns:
        tuple: (mst_edges, total_weight)
    """
    if start_vertex not in graph.vertices:
        return [], 0
    
    # Initialize data structures
    mst_edges = []
    visited = set()
    min_heap = []
    total_weight = 0
    
    # Start with the given vertex
    visited.add(start_vertex)
    
    # Add all edges from start vertex to heap
    for neighbor, weight in graph.edges[start_vertex]:
        heapq.heappush(min_heap, (weight, start_vertex, neighbor))
    
    # Continue until all vertices are visited or heap is empty
    while min_heap and len(visited) < len(graph.vertices):
        # Get minimum weight edge
        weight, u, v = heapq.heappop(min_heap)
        
        # Skip if both vertices are already visited (would create cycle)
        if v in visited:
            continue
        
        # Add vertex to MST
        visited.add(v)
        mst_edges.append((u, v, weight))
        total_weight += weight
        
        # Add all edges from new vertex to heap
        for neighbor, edge_weight in graph.edges[v]:
            if neighbor not in visited:
                heapq.heappush(min_heap, (edge_weight, v, neighbor))
    
    return mst_edges, total_weight

# Example usage
if __name__ == "__main__":
    # Create sample graph
    g = Graph()
    g.add_edge('A', 'B', 4)
    g.add_edge('A', 'C', 2)
    g.add_edge('B', 'C', 1)
    g.add_edge('B', 'D', 5)
    g.add_edge('C', 'D', 8)
    g.add_edge('C', 'E', 10)
    g.add_edge('D', 'E', 2)
    
    # Find MST using Prim's algorithm
    mst_edges, total_weight = prims_algorithm(g, 'A')
    
    print("Minimum Spanning Tree:")
    for u, v, weight in mst_edges:
        print(f"Edge ({u}, {v}) - Weight: {weight}")
    print(f"Total Weight: {total_weight}")`

const primsQuiz = [
  {
    question: "What is the main goal of Prim's algorithm?",
    options: [
      "Find the shortest path between two vertices",
      "Find the minimum spanning tree of a graph",
      "Detect cycles in a graph",
      "Find strongly connected components",
    ],
    correct: 1,
    explanation:
      "Prim's algorithm finds the minimum spanning tree (MST) of a weighted, connected graph by selecting edges with minimum weight that don't create cycles.",
  },
  {
    question: "What data structure is commonly used to implement Prim's algorithm efficiently?",
    options: ["Stack", "Queue", "Priority Queue (Min-Heap)", "Hash Table"],
    correct: 2,
    explanation:
      "A priority queue (min-heap) is used to efficiently select the minimum weight edge at each step of the algorithm.",
  },
  {
    question: "What is the time complexity of Prim's algorithm using a binary heap?",
    options: ["O(V)", "O(V log V)", "O(E log V)", "O(V²)"],
    correct: 2,
    explanation:
      "Using a binary heap, Prim's algorithm has O(E log V) time complexity, where E is the number of edges and V is the number of vertices.",
  },
  {
    question: "In Prim's algorithm, how do we ensure we don't create cycles?",
    options: [
      "By using DFS to check for cycles",
      "By only adding edges to unvisited vertices",
      "By sorting all edges first",
      "By using Union-Find data structure",
    ],
    correct: 1,
    explanation:
      "Prim's algorithm avoids cycles by only adding edges that connect a visited vertex to an unvisited vertex, ensuring the MST property is maintained.",
  },
  {
    question: "What type of graphs can Prim's algorithm work on?",
    options: ["Only directed graphs", "Only undirected graphs", "Both directed and undirected graphs", "Only trees"],
    correct: 1,
    explanation:
      "Prim's algorithm works specifically on undirected, weighted, connected graphs to find their minimum spanning tree.",
  },
]

export default function PrimsPage() {
  const [progress, setProgress] = useState(0)
  const [activeTab, setActiveTab] = useState("theory")
  const [showConfetti, setShowConfetti] = useState(false)

  const handleQuizComplete = (score: number) => {
    const newProgress = Math.max(progress, score)
    setProgress(newProgress)
    if (score >= 80) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
    }
  }

  return (
    <div className="min-h-screen gradient-bg dark:gradient-bg-dark">
      {showConfetti && <ConfettiAnimation />}

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 px-4 py-2 rounded-full mb-6">
            <GitBranch className="h-5 w-5 text-emerald-600" />
            <span className="text-emerald-700 dark:text-emerald-300 font-medium">Graph Algorithms</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">Prim's Algorithm</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Master Prim's algorithm for finding minimum spanning trees. Learn how to connect all vertices in a graph
            with the minimum total edge weight using a greedy approach.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white/80 dark:bg-black/20 px-4 py-2 rounded-full">
              <Clock className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-medium">45 minutes</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 dark:bg-black/20 px-4 py-2 rounded-full">
              <Target className="h-4 w-4 text-sky-600" />
              <span className="text-sm font-medium">Intermediate</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 dark:bg-black/20 px-4 py-2 rounded-full">
              <Brain className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium">MST Algorithm</span>
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

        {/* Main Content */}
        <Card className="mb-8 animate-fade-in modern-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600">
                <GitBranch className="h-6 w-6 text-white" />
              </div>
              Prim's Algorithm Deep Dive
            </CardTitle>
            <CardDescription>
              Explore the theory, implementation, and visualization of Prim's algorithm for finding minimum spanning
              trees.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="theory" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Theory
                </TabsTrigger>
                <TabsTrigger value="implementation" className="flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  Code
                </TabsTrigger>
                <TabsTrigger value="visualization" className="flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  Visualize
                </TabsTrigger>
                <TabsTrigger value="ai-helper" className="flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  AI Helper
                </TabsTrigger>
                <TabsTrigger value="quiz" className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Quiz
                </TabsTrigger>
              </TabsList>

              <TabsContent value="theory" className="mt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-semibold mb-4 text-gradient">What is Prim's Algorithm?</h3>
                    <p className="text-muted-foreground mb-4">
                      Prim's algorithm is a greedy algorithm that finds a minimum spanning tree (MST) for a weighted,
                      connected graph. It starts with a single vertex and grows the MST by adding the minimum weight
                      edge that connects a vertex in the MST to a vertex outside the MST.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="modern-card">
                      <CardHeader>
                        <CardTitle className="text-lg text-emerald-600">Key Properties</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5" />
                          <div>
                            <div className="font-medium">Greedy Approach</div>
                            <div className="text-sm text-muted-foreground">Always selects the minimum weight edge</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5" />
                          <div>
                            <div className="font-medium">Optimal Solution</div>
                            <div className="text-sm text-muted-foreground">Guarantees minimum total weight</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5" />
                          <div>
                            <div className="font-medium">Connected Graph</div>
                            <div className="text-sm text-muted-foreground">Works on connected, weighted graphs</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="modern-card">
                      <CardHeader>
                        <CardTitle className="text-lg text-sky-600">Algorithm Steps</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-start gap-3">
                          <Badge variant="outline" className="mt-0.5">
                            1
                          </Badge>
                          <div className="text-sm">Start with any vertex as the initial MST</div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Badge variant="outline" className="mt-0.5">
                            2
                          </Badge>
                          <div className="text-sm">Find minimum weight edge connecting MST to non-MST vertex</div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Badge variant="outline" className="mt-0.5">
                            3
                          </Badge>
                          <div className="text-sm">Add the edge and vertex to MST</div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Badge variant="outline" className="mt-0.5">
                            4
                          </Badge>
                          <div className="text-sm">Repeat until all vertices are included</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-gradient">Time & Space Complexity</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <Card className="modern-card">
                        <CardContent className="pt-6 text-center">
                          <div className="text-2xl font-bold text-orange-600 mb-2">O(E log V)</div>
                          <div className="text-sm text-muted-foreground">Time Complexity</div>
                          <div className="text-xs text-muted-foreground mt-1">Using Binary Heap</div>
                        </CardContent>
                      </Card>
                      <Card className="modern-card">
                        <CardContent className="pt-6 text-center">
                          <div className="text-2xl font-bold text-violet-600 mb-2">O(V²)</div>
                          <div className="text-sm text-muted-foreground">Time Complexity</div>
                          <div className="text-xs text-muted-foreground mt-1">Using Array</div>
                        </CardContent>
                      </Card>
                      <Card className="modern-card">
                        <CardContent className="pt-6 text-center">
                          <div className="text-2xl font-bold text-emerald-600 mb-2">O(V)</div>
                          <div className="text-sm text-muted-foreground">Space Complexity</div>
                          <div className="text-xs text-muted-foreground mt-1">Additional Space</div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-gradient">Applications</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Badge
                          variant="secondary"
                          className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                        >
                          Network Design
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200"
                        >
                          Circuit Design
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200"
                        >
                          Transportation Networks
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <Badge
                          variant="secondary"
                          className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                        >
                          Cluster Analysis
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200"
                        >
                          Approximation Algorithms
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                        >
                          Image Segmentation
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="implementation" className="mt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gradient">Complete Implementation</h3>
                    <Badge
                      variant="outline"
                      className="bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200"
                    >
                      Python
                    </Badge>
                  </div>
                  <CodeBlock code={primsCode} language="python" />
                </div>
              </TabsContent>

              <TabsContent value="visualization" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gradient">Interactive Visualization</h3>
                  <PrimsVisualization />
                </div>
              </TabsContent>

              <TabsContent value="ai-helper" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gradient">AI Coding Assistant</h3>
                  <p className="text-muted-foreground">
                    Get help with implementing Prim's algorithm, understanding concepts, or debugging your code.
                  </p>
                  <AICodeHelper
                    topic="Prim's Algorithm"
                    initialCode={`# Implement Prim's algorithm here
def prims_algorithm(graph, start_vertex):
    # Your implementation here
    pass`}
                    language="python"
                  />
                </div>
              </TabsContent>

              <TabsContent value="quiz" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gradient">Test Your Understanding</h3>
                  <Quiz questions={primsQuiz} onComplete={handleQuizComplete} />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="animate-fade-in modern-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              Continue Your Learning Journey
            </CardTitle>
            <CardDescription>
              Great job learning Prim's algorithm! Ready to explore more graph algorithms?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-gradient flex-1" size="lg">
                <ArrowRight className="h-4 w-4 mr-2" />
                Learn Kruskal's Algorithm
              </Button>
              <Button variant="outline" size="lg" className="flex-1 bg-transparent">
                <BookOpen className="h-4 w-4 mr-2" />
                Review Graph Theory
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
