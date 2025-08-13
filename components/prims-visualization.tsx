"use client"

import { Play, Pause, SkipForward, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useRef, useState } from "react"

type Node = {
  id: number
  label: string
  x: number
  y: number
}

type Edge = {
  source: number
  target: number
  weight: number
}

type Graph = {
  nodes: Node[]
  edges: Edge[]
}

type AlgorithmStep = {
  mstNodes: number[]
  mstEdges: Edge[]
  currentHeap: { edge: Edge; priority: number }[]
  currentEdge: Edge | null
  description: string
  detailedExplanation: string
  heapOperation: "insert" | "extract" | "update" | "none"
  highlightNodes: number[]
}

const predefinedGraphs = {
  simple: {
    nodes: [
      { id: 0, label: "A", x: 150, y: 100 },
      { id: 1, label: "B", x: 300, y: 100 },
      { id: 2, label: "C", x: 225, y: 200 },
      { id: 3, label: "D", x: 75, y: 200 },
      { id: 4, label: "E", x: 375, y: 200 },
    ],
    edges: [
      { source: 0, target: 1, weight: 4 },
      { source: 0, target: 3, weight: 2 },
      { source: 1, target: 2, weight: 3 },
      { source: 1, target: 4, weight: 6 },
      { source: 2, target: 3, weight: 5 },
      { source: 2, target: 4, weight: 1 },
      { source: 3, target: 4, weight: 7 },
    ],
  },
  complex: {
    nodes: [
      { id: 0, label: "A", x: 100, y: 80 },
      { id: 1, label: "B", x: 250, y: 80 },
      { id: 2, label: "C", x: 400, y: 80 },
      { id: 3, label: "D", x: 100, y: 200 },
      { id: 4, label: "E", x: 250, y: 200 },
      { id: 5, label: "F", x: 400, y: 200 },
      { id: 6, label: "G", x: 175, y: 320 },
      { id: 7, label: "H", x: 325, y: 320 },
    ],
    edges: [
      { source: 0, target: 1, weight: 5 },
      { source: 0, target: 3, weight: 3 },
      { source: 1, target: 2, weight: 4 },
      { source: 1, target: 4, weight: 6 },
      { source: 2, target: 5, weight: 2 },
      { source: 3, target: 4, weight: 7 },
      { source: 3, target: 6, weight: 8 },
      { source: 4, target: 5, weight: 3 },
      { source: 4, target: 6, weight: 2 },
      { source: 4, target: 7, weight: 5 },
      { source: 5, target: 7, weight: 4 },
      { source: 6, target: 7, weight: 1 },
    ],
  },
}

const generatePrimSteps = (graph: Graph): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = []
  const { nodes, edges } = graph

  if (nodes.length === 0) return steps

  const startNode = 0
  const mstNodes = [startNode]
  const mstEdges: Edge[] = []
  let minHeap: { edge: Edge; priority: number }[] = []

  steps.push({
    mstNodes: [...mstNodes],
    mstEdges: [...mstEdges],
    currentHeap: [],
    currentEdge: null,
    description: `Starting Prim's algorithm from node ${nodes[startNode].label}`,
    detailedExplanation: `We begin by selecting node ${nodes[startNode].label} as our starting point. This node will be the first node in our Minimum Spanning Tree (MST).`,
    heapOperation: "none",
    highlightNodes: [startNode],
  })

  // Add initial edges to heap
  const initialHeapEntries: { edge: Edge; priority: number }[] = []
  edges.forEach((edge) => {
    if (edge.source === startNode) {
      initialHeapEntries.push({ edge, priority: edge.weight })
    } else if (edge.target === startNode) {
      initialHeapEntries.push({
        edge: { source: edge.target, target: edge.source, weight: edge.weight },
        priority: edge.weight,
      })
    }
  })

  initialHeapEntries.sort((a, b) => a.priority - b.priority)
  minHeap = [...initialHeapEntries]

  steps.push({
    mstNodes: [...mstNodes],
    mstEdges: [...mstEdges],
    currentHeap: [...minHeap],
    currentEdge: null,
    description: `Added all edges from node ${nodes[startNode].label} to the min-heap`,
    detailedExplanation: `We identify all edges connected to our starting node ${nodes[startNode].label} and add them to the min-heap. The min-heap ensures we always get the edge with minimum weight.`,
    heapOperation: "insert",
    highlightNodes: [startNode],
  })

  while (minHeap.length > 0 && mstNodes.length < nodes.length) {
    const { edge } = minHeap.shift()!

    if (mstNodes.includes(edge.target)) {
      steps.push({
        mstNodes: [...mstNodes],
        mstEdges: [...mstEdges],
        currentHeap: [...minHeap],
        currentEdge: edge,
        description: `Edge ${nodes[edge.source].label}-${nodes[edge.target].label} (weight: ${edge.weight}) connects to node ${nodes[edge.target].label} which is already in MST. Skipping.`,
        detailedExplanation: `This edge would create a cycle, so we discard it and continue with the next minimum edge.`,
        heapOperation: "extract",
        highlightNodes: [edge.source, edge.target],
      })
      continue
    }

    mstEdges.push(edge)
    mstNodes.push(edge.target)

    steps.push({
      mstNodes: [...mstNodes],
      mstEdges: [...mstEdges],
      currentHeap: [...minHeap],
      currentEdge: edge,
      description: `Added edge ${nodes[edge.source].label}-${nodes[edge.target].label} (weight: ${edge.weight}) to MST`,
      detailedExplanation: `We add this edge to our MST and include node ${nodes[edge.target].label}. The MST now has ${mstEdges.length} edge(s) and ${mstNodes.length} node(s).`,
      heapOperation: "extract",
      highlightNodes: [edge.source, edge.target],
    })

    // Add new edges to heap
    const newEdges: { edge: Edge; priority: number }[] = []
    edges.forEach((e) => {
      if (e.source === edge.target && !mstNodes.includes(e.target)) {
        newEdges.push({ edge: e, priority: e.weight })
      } else if (e.target === edge.target && !mstNodes.includes(e.source)) {
        newEdges.push({
          edge: { source: e.target, target: e.source, weight: e.weight },
          priority: e.weight,
        })
      }
    })

    if (newEdges.length > 0) {
      minHeap = [...minHeap, ...newEdges]
      minHeap.sort((a, b) => a.priority - b.priority)

      steps.push({
        mstNodes: [...mstNodes],
        mstEdges: [...mstEdges],
        currentHeap: [...minHeap],
        currentEdge: null,
        description: `Added edges from node ${nodes[edge.target].label} to the min-heap`,
        detailedExplanation: `We add all edges from the newly added node ${nodes[edge.target].label} to unvisited nodes into our min-heap.`,
        heapOperation: "update",
        highlightNodes: [edge.target],
      })
    }
  }

  steps.push({
    mstNodes: [...mstNodes],
    mstEdges: [...mstEdges],
    currentHeap: [],
    currentEdge: null,
    description: "Prim's algorithm completed. MST found!",
    detailedExplanation: `Algorithm completed! We found a Minimum Spanning Tree with ${mstEdges.length} edges and total weight ${mstEdges.reduce((sum, edge) => sum + edge.weight, 0)}.`,
    heapOperation: "none",
    highlightNodes: [],
  })

  return steps
}

export default function PrimsVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const heapCanvasRef = useRef<HTMLCanvasElement>(null)
  const [graph, setGraph] = useState<Graph>(predefinedGraphs.simple)
  const [steps, setSteps] = useState<AlgorithmStep[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [showHeap, setShowHeap] = useState(true)
  const [selectedGraph, setSelectedGraph] = useState("simple")
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const algorithmSteps = generatePrimSteps(graph)
    setSteps(algorithmSteps)
    setCurrentStep(0)
  }, [graph])

  useEffect(() => {
    if (!isPlaying || currentStep >= steps.length - 1) {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
      return
    }

    const animate = () => {
      setTimeout(() => {
        setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
        if (currentStep < steps.length - 1) {
          animationRef.current = requestAnimationFrame(animate)
        }
      }, 2000 / speed)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying, currentStep, steps, speed])

  useEffect(() => {
    if (!canvasRef.current || steps.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const step = steps[currentStep]

    // Draw edges
    graph.edges.forEach((edge) => {
      const sourceNode = graph.nodes[edge.source]
      const targetNode = graph.nodes[edge.target]

      const isInMST = step.mstEdges.some(
        (e) =>
          (e.source === edge.source && e.target === edge.target) ||
          (e.source === edge.target && e.target === edge.source),
      )

      const isCurrent =
        step.currentEdge &&
        ((step.currentEdge.source === edge.source && step.currentEdge.target === edge.target) ||
          (step.currentEdge.source === edge.target && step.currentEdge.target === edge.source))

      ctx.beginPath()
      ctx.moveTo(sourceNode.x, sourceNode.y)
      ctx.lineTo(targetNode.x, targetNode.y)

      if (isCurrent) {
        ctx.strokeStyle = "#ff9800"
        ctx.lineWidth = 3
      } else if (isInMST) {
        ctx.strokeStyle = "#4caf50"
        ctx.lineWidth = 3
      } else {
        ctx.strokeStyle = "#ccc"
        ctx.lineWidth = 1
      }

      ctx.stroke()

      // Draw weight
      const midX = (sourceNode.x + targetNode.x) / 2
      const midY = (sourceNode.y + targetNode.y) / 2

      ctx.fillStyle = "white"
      ctx.beginPath()
      ctx.arc(midX, midY, 12, 0, 2 * Math.PI)
      ctx.fill()

      ctx.fillStyle = isInMST ? "#4caf50" : isCurrent ? "#ff9800" : "#666"
      ctx.font = "12px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(edge.weight.toString(), midX, midY)
    })

    // Draw nodes
    graph.nodes.forEach((node, index) => {
      const isInMST = step.mstNodes.includes(index)
      const isHighlighted = step.highlightNodes.includes(index)

      if (isHighlighted) {
        ctx.beginPath()
        ctx.arc(node.x, node.y, 25, 0, 2 * Math.PI)
        ctx.fillStyle = "rgba(255, 152, 0, 0.3)"
        ctx.fill()
      }

      ctx.beginPath()
      ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI)

      if (isInMST) {
        ctx.fillStyle = "#4caf50"
      } else {
        ctx.fillStyle = "#f5f5f5"
      }

      ctx.strokeStyle = isHighlighted ? "#ff9800" : "#333"
      ctx.lineWidth = isHighlighted ? 3 : 2
      ctx.fill()
      ctx.stroke()

      ctx.fillStyle = isInMST ? "#fff" : "#333"
      ctx.font = "bold 14px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(node.label, node.x, node.y)
    })
  }, [graph, steps, currentStep])

  const togglePlay = () => setIsPlaying(!isPlaying)
  const resetAnimation = () => {
    setIsPlaying(false)
    setCurrentStep(0)
  }
  const stepForward = () => {
    setIsPlaying(false)
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const handleGraphChange = (value: string) => {
    setSelectedGraph(value)
    setGraph(predefinedGraphs[value as keyof typeof predefinedGraphs])
  }

  const calculateTotalMSTWeight = () => {
    if (steps.length === 0) return 0
    return steps[currentStep].mstEdges.reduce((sum, edge) => sum + edge.weight, 0)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <Card className="modern-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Graph Visualization</CardTitle>
                <Select value={selectedGraph} onValueChange={handleGraphChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Graph" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="simple">Simple Graph</SelectItem>
                    <SelectItem value="complex">Complex Graph</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative w-full h-[400px] border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900">
                <canvas ref={canvasRef} width={500} height={400} className="w-full h-full" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex-1">
          <Card className="modern-card">
            <CardHeader>
              <CardTitle>Algorithm Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  Step {currentStep + 1} of {steps.length}
                </span>
                <Badge variant="outline">MST Weight: {calculateTotalMSTWeight()}</Badge>
              </div>

              <div className="w-full bg-slate-200 dark:bg-slate-600 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full transition-all duration-300 ease-in-out"
                  style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                />
              </div>

              {steps[currentStep] && (
                <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
                  <p className="text-sm font-medium mb-2">{steps[currentStep].description}</p>
                  <p className="text-xs text-muted-foreground">{steps[currentStep].detailedExplanation}</p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={togglePlay} disabled={currentStep >= steps.length - 1}>
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button variant="outline" size="sm" onClick={stepForward} disabled={currentStep >= steps.length - 1}>
                    <SkipForward className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={resetAnimation}>
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm">Speed:</span>
                  <div className="w-24">
                    <Slider
                      value={[speed]}
                      min={0.5}
                      max={3}
                      step={0.5}
                      onValueChange={(value) => setSpeed(value[0])}
                    />
                  </div>
                </div>
              </div>

              {showHeap && steps[currentStep]?.currentHeap.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Current Min-Heap</h4>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {steps[currentStep].currentHeap.slice(0, 5).map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-800 rounded text-sm"
                      >
                        <span>
                          {graph.nodes[item.edge.source].label}-{graph.nodes[item.edge.target].label}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {item.priority}
                        </Badge>
                      </div>
                    ))}
                    {steps[currentStep].currentHeap.length > 5 && (
                      <div className="text-xs text-muted-foreground text-center">
                        ... and {steps[currentStep].currentHeap.length - 5} more
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
