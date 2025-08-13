"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, SkipForward, SkipBack, RotateCcw, Clock, BarChart3 } from "lucide-react"

interface VisualizationStep {
  id: number
  description: string
  data: any[]
  highlights: number[]
  comparisons?: number[]
  swaps?: number[]
}

interface EnhancedVisualizationProps {
  algorithm: string
  data: number[]
  onStepChange?: (step: number) => void
}

export default function EnhancedVisualization({
  algorithm,
  data: initialData,
  onStepChange,
}: EnhancedVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [speed, setSpeed] = useState(1)
  const [steps, setSteps] = useState<VisualizationStep[]>([])
  const [data, setData] = useState(initialData)
  const animationRef = useRef<number>()

  // Generate algorithm steps
  const generateSteps = useCallback((algorithm: string, data: number[]) => {
    const steps: VisualizationStep[] = []
    const arr = [...data]

    switch (algorithm) {
      case "bubble-sort":
        steps.push({ id: 0, description: "Starting Bubble Sort", data: [...arr], highlights: [] })

        for (let i = 0; i < arr.length - 1; i++) {
          for (let j = 0; j < arr.length - i - 1; j++) {
            steps.push({
              id: steps.length,
              description: `Comparing elements at positions ${j} and ${j + 1}`,
              data: [...arr],
              highlights: [j, j + 1],
              comparisons: [j, j + 1],
            })

            if (arr[j] > arr[j + 1]) {
              ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
              steps.push({
                id: steps.length,
                description: `Swapping elements ${arr[j + 1]} and ${arr[j]}`,
                data: [...arr],
                highlights: [j, j + 1],
                swaps: [j, j + 1],
              })
            }
          }
        }
        steps.push({ id: steps.length, description: "Bubble Sort Complete!", data: [...arr], highlights: [] })
        break

      case "selection-sort":
        steps.push({ id: 0, description: "Starting Selection Sort", data: [...arr], highlights: [] })

        for (let i = 0; i < arr.length - 1; i++) {
          let minIdx = i
          steps.push({
            id: steps.length,
            description: `Finding minimum element from position ${i}`,
            data: [...arr],
            highlights: [i],
          })

          for (let j = i + 1; j < arr.length; j++) {
            steps.push({
              id: steps.length,
              description: `Comparing with element at position ${j}`,
              data: [...arr],
              highlights: [minIdx, j],
              comparisons: [minIdx, j],
            })

            if (arr[j] < arr[minIdx]) {
              minIdx = j
              steps.push({
                id: steps.length,
                description: `New minimum found at position ${j}`,
                data: [...arr],
                highlights: [minIdx],
              })
            }
          }

          if (minIdx !== i) {
            ;[arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]
            steps.push({
              id: steps.length,
              description: `Swapping elements at positions ${i} and ${minIdx}`,
              data: [...arr],
              highlights: [i, minIdx],
              swaps: [i, minIdx],
            })
          }
        }
        steps.push({ id: steps.length, description: "Selection Sort Complete!", data: [...arr], highlights: [] })
        break

      case "insertion-sort":
        steps.push({ id: 0, description: "Starting Insertion Sort", data: [...arr], highlights: [] })

        for (let i = 1; i < arr.length; i++) {
          const key = arr[i]
          let j = i - 1

          steps.push({
            id: steps.length,
            description: `Inserting element ${key} into sorted portion`,
            data: [...arr],
            highlights: [i],
          })

          while (j >= 0 && arr[j] > key) {
            steps.push({
              id: steps.length,
              description: `Moving element ${arr[j]} one position right`,
              data: [...arr],
              highlights: [j, j + 1],
              comparisons: [j, j + 1],
            })

            arr[j + 1] = arr[j]
            j--
          }

          arr[j + 1] = key
          steps.push({
            id: steps.length,
            description: `Placed element ${key} at position ${j + 1}`,
            data: [...arr],
            highlights: [j + 1],
          })
        }
        steps.push({ id: steps.length, description: "Insertion Sort Complete!", data: [...arr], highlights: [] })
        break

      case "binary-search":
        const target = arr[Math.floor(Math.random() * arr.length)]
        const sortedArr = [...arr].sort((a, b) => a - b)
        let left = 0
        let right = sortedArr.length - 1

        steps.push({
          id: 0,
          description: `Searching for ${target} in sorted array`,
          data: [...sortedArr],
          highlights: [],
        })

        while (left <= right) {
          const mid = Math.floor((left + right) / 2)

          steps.push({
            id: steps.length,
            description: `Checking middle element at position ${mid}`,
            data: [...sortedArr],
            highlights: [mid],
            comparisons: [left, mid, right],
          })

          if (sortedArr[mid] === target) {
            steps.push({
              id: steps.length,
              description: `Found target ${target} at position ${mid}!`,
              data: [...sortedArr],
              highlights: [mid],
            })
            break
          } else if (sortedArr[mid] < target) {
            left = mid + 1
            steps.push({
              id: steps.length,
              description: `Target is greater, searching right half`,
              data: [...sortedArr],
              highlights: Array.from({ length: right - left + 1 }, (_, i) => left + i),
            })
          } else {
            right = mid - 1
            steps.push({
              id: steps.length,
              description: `Target is smaller, searching left half`,
              data: [...sortedArr],
              highlights: Array.from({ length: right - left + 1 }, (_, i) => left + i),
            })
          }
        }
        break

      default:
        steps.push({ id: 0, description: "Algorithm visualization", data: [...arr], highlights: [] })
    }

    return steps
  }, [])

  // Initialize steps
  useEffect(() => {
    const generatedSteps = generateSteps(algorithm, data)
    setSteps(generatedSteps)
    setCurrentStep(0)
  }, [algorithm, data, generateSteps])

  // Animation loop
  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      const timeout = setTimeout(() => {
        setCurrentStep((prev) => prev + 1)
        onStepChange?.(currentStep + 1)
      }, 1000 / speed)

      return () => clearTimeout(timeout)
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false)
    }
  }, [isPlaying, currentStep, steps.length, speed, onStepChange])

  // Canvas drawing
  useEffect(() => {
    if (!canvasRef.current || steps.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const step = steps[currentStep]
    const { data, highlights = [], comparisons = [], swaps = [] } = step

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Calculate dimensions
    const padding = 40
    const barWidth = (canvas.width - 2 * padding) / data.length
    const maxValue = Math.max(...data)
    const barMaxHeight = canvas.height - 2 * padding

    // Draw bars
    data.forEach((value, index) => {
      const barHeight = (value / maxValue) * barMaxHeight
      const x = padding + index * barWidth
      const y = canvas.height - padding - barHeight

      // Determine bar color
      let color = "#64748b" // default gray
      if (swaps.includes(index)) {
        color = "#ef4444" // red for swaps
      } else if (comparisons.includes(index)) {
        color = "#f59e0b" // orange for comparisons
      } else if (highlights.includes(index)) {
        color = "#10b981" // green for highlights
      }

      // Draw bar
      ctx.fillStyle = color
      ctx.fillRect(x + 2, y, barWidth - 4, barHeight)

      // Draw value
      ctx.fillStyle = "#1f2937"
      ctx.font = "12px Arial"
      ctx.textAlign = "center"
      ctx.fillText(value.toString(), x + barWidth / 2, y - 5)

      // Draw index
      ctx.fillStyle = "#6b7280"
      ctx.font = "10px Arial"
      ctx.fillText(index.toString(), x + barWidth / 2, canvas.height - padding + 15)
    })

    // Draw legend
    const legendY = 20
    const legendItems = [
      { color: "#64748b", label: "Default" },
      { color: "#10b981", label: "Highlighted" },
      { color: "#f59e0b", label: "Comparing" },
      { color: "#ef4444", label: "Swapping" },
    ]

    legendItems.forEach((item, index) => {
      const x = padding + index * 80
      ctx.fillStyle = item.color
      ctx.fillRect(x, legendY, 12, 12)
      ctx.fillStyle = "#1f2937"
      ctx.font = "10px Arial"
      ctx.textAlign = "left"
      ctx.fillText(item.label, x + 16, legendY + 9)
    })
  }, [currentStep, steps])

  const handlePlay = () => setIsPlaying(true)
  const handlePause = () => setIsPlaying(false)
  const handleReset = () => {
    setIsPlaying(false)
    setCurrentStep(0)
    onStepChange?.(0)
  }
  const handleStepForward = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
      onStepChange?.(currentStep + 1)
    }
  }
  const handleStepBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
      onStepChange?.(currentStep - 1)
    }
  }

  const currentStepData = steps[currentStep]

  return (
    <Card className="modern-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-violet-600" />
            {algorithm.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())} Visualization
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              Step {currentStep + 1} of {steps.length}
            </Badge>
            <Badge variant="outline" className="text-xs">
              <Clock className="h-3 w-3 mr-1" />
              {speed}x
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Canvas */}
        <div className="relative">
          <canvas ref={canvasRef} width={800} height={400} className="w-full h-auto viz-canvas" />
        </div>

        {/* Current step description */}
        {currentStepData && (
          <div className="bg-muted p-3 rounded-lg">
            <p className="text-sm font-medium">{currentStepData.description}</p>
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleStepBack} disabled={currentStep === 0}>
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={isPlaying ? handlePause : handlePlay}
              disabled={currentStep >= steps.length - 1}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="sm" onClick={handleStepForward} disabled={currentStep >= steps.length - 1}>
              <SkipForward className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Speed:</span>
              <div className="w-24">
                <Slider value={[speed]} onValueChange={(value) => setSpeed(value[0])} min={0.5} max={3} step={0.5} />
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-violet-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </CardContent>
    </Card>
  )
}
