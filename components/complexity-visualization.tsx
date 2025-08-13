"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RotateCcw } from "lucide-react"

interface ComplexityVisualizationProps {
  selectedComplexity?: string
}

const ComplexityVisualization: React.FC<ComplexityVisualizationProps> = ({ selectedComplexity = "O(n)" }) => {
  const [inputSize, setInputSize] = useState([10])
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationStep, setAnimationStep] = useState(0)

  const complexityFunctions = {
    "O(1)": (n: number) => 1,
    "O(log n)": (n: number) => Math.log2(n),
    "O(n)": (n: number) => n,
    "O(n log n)": (n: number) => n * Math.log2(n),
    "O(n²)": (n: number) => n * n,
    "O(2^n)": (n: number) => Math.min(Math.pow(2, n), 1000000), // Cap for visualization
  }

  const complexityColors = {
    "O(1)": "bg-emerald-500",
    "O(log n)": "bg-sky-500",
    "O(n)": "bg-violet-500",
    "O(n log n)": "bg-orange-500",
    "O(n²)": "bg-rose-500",
    "O(2^n)": "bg-red-600",
  }

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isAnimating) {
      interval = setInterval(() => {
        setAnimationStep((prev) => (prev + 1) % 50)
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isAnimating])

  const generateChartData = () => {
    const maxN = inputSize[0]
    const data = []
    const step = Math.max(1, Math.floor(maxN / 20))

    for (let n = 1; n <= maxN; n += step) {
      const point: { [key: string]: number } = { n }
      Object.entries(complexityFunctions).forEach(([complexity, func]) => {
        point[complexity] = func(n)
      })
      data.push(point)
    }
    return data
  }

  const chartData = generateChartData()
  const maxValue = Math.max(
    ...chartData.map((d) => Math.max(...Object.keys(complexityFunctions).map((key) => d[key] || 0))),
  )

  const getBarHeight = (value: number) => {
    return Math.max(2, (value / maxValue) * 200)
  }

  const renderOperationsVisualization = () => {
    const n = inputSize[0]
    const operations = complexityFunctions[selectedComplexity as keyof typeof complexityFunctions](n)
    const maxOps = 100
    const displayOps = Math.min(operations, maxOps)

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Operations for n = {n}:</span>
          <Badge variant="outline" className="font-mono">
            {operations > maxOps ? `${Math.floor(operations)}+` : Math.floor(operations)}
          </Badge>
        </div>

        <div className="grid grid-cols-10 gap-1 h-32 items-end">
          {Array.from({ length: Math.floor(displayOps) }, (_, i) => (
            <div
              key={i}
              className={`${complexityColors[selectedComplexity as keyof typeof complexityColors]} rounded-sm transition-all duration-300`}
              style={{
                height: `${Math.max(8, ((i + 1) / displayOps) * 100)}%`,
                opacity: isAnimating && i > animationStep ? 0.3 : 1,
              }}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Visualization Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Input Size (n): {inputSize[0]}</label>
            <Slider value={inputSize} onValueChange={setInputSize} max={50} min={1} step={1} className="w-full" />
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsAnimating(!isAnimating)}>
              {isAnimating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isAnimating ? "Pause" : "Animate"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsAnimating(false)
                setAnimationStep(0)
              }}
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Growth Rate Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Growth Rate Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-between gap-1 bg-muted/30 p-4 rounded-lg">
            {chartData.map((point, index) => (
              <div key={index} className="flex flex-col items-center gap-1 flex-1">
                <div className="flex flex-col items-end gap-1 h-52 justify-end">
                  {Object.entries(complexityFunctions).map(([complexity, _]) => (
                    <div
                      key={complexity}
                      className={`w-full max-w-[20px] rounded-sm transition-all duration-300 ${
                        complexityColors[complexity as keyof typeof complexityColors]
                      } ${selectedComplexity === complexity ? "ring-2 ring-white" : "opacity-70"}`}
                      style={{ height: `${getBarHeight(point[complexity])}px` }}
                      title={`${complexity}: ${Math.floor(point[complexity])}`}
                    />
                  ))}
                </div>
                {index % 4 === 0 && <span className="text-xs text-muted-foreground">{point.n}</span>}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {Object.keys(complexityFunctions).map((complexity) => (
              <div key={complexity} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-sm ${complexityColors[complexity as keyof typeof complexityColors]}`} />
                <span className="text-sm font-mono">{complexity}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Operations Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Operations Count: {selectedComplexity}</CardTitle>
        </CardHeader>
        <CardContent>{renderOperationsVisualization()}</CardContent>
      </Card>

      {/* Complexity Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Complexity Comparison Table</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Input Size (n)</th>
                  {Object.keys(complexityFunctions).map((complexity) => (
                    <th key={complexity} className="text-center p-2 font-mono">
                      {complexity}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[1, 10, 100, 1000].map((n) => (
                  <tr key={n} className="border-b">
                    <td className="p-2 font-medium">{n.toLocaleString()}</td>
                    {Object.entries(complexityFunctions).map(([complexity, func]) => {
                      const value = func(n)
                      return (
                        <td
                          key={complexity}
                          className={`text-center p-2 font-mono ${
                            selectedComplexity === complexity ? "bg-muted font-bold" : ""
                          }`}
                        >
                          {value > 1000000 ? "∞" : Math.floor(value).toLocaleString()}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ComplexityVisualization
