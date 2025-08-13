// Python code execution utilities
export interface ExecutionResult {
  output: string
  error?: string
  executionTime: number
  memoryUsage: number
  status: "success" | "error" | "timeout"
  complexity?: {
    time: string
    space: string
  }
}

// Simulate Python execution with realistic behavior
export async function executePythonCode(code: string): Promise<ExecutionResult> {
  const startTime = performance.now()

  try {
    // Simulate execution delay
    await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 1500))

    const executionTime = performance.now() - startTime
    const memoryUsage = Math.random() * 50 + 10 // 10-60MB

    // Check for common errors
    const hasError =
      code.includes("undefined_variable") ||
      code.includes("import nonexistent") ||
      code.includes("1/0") ||
      code.includes("syntax error") ||
      Math.random() < 0.1

    if (hasError) {
      const errors = [
        "NameError: name 'undefined_variable' is not defined",
        "ModuleNotFoundError: No module named 'nonexistent'",
        "ZeroDivisionError: division by zero",
        "SyntaxError: invalid syntax",
        "IndexError: list index out of range",
      ]

      return {
        output: "",
        error: errors[Math.floor(Math.random() * errors.length)],
        executionTime,
        memoryUsage,
        status: "error",
      }
    }

    // Generate realistic output based on code content
    const output = generateOutput(code)

    // Analyze complexity
    const complexity = analyzeComplexity(code)

    return {
      output,
      executionTime,
      memoryUsage,
      status: "success",
      complexity,
    }
  } catch (error) {
    return {
      output: "",
      error: `Execution failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      executionTime: performance.now() - startTime,
      memoryUsage: 0,
      status: "error",
    }
  }
}

function generateOutput(code: string): string {
  if (code.includes("print")) {
    const printMatches = code.match(/print\s*\((.*?)\)/g)
    if (printMatches) {
      return printMatches
        .map((match) => {
          const content = match.replace(/print\s*\(|\)/g, "").replace(/['"]/g, "")
          return content
        })
        .join("\n")
    }
  } else if (code.includes("sort") || code.includes("algorithm")) {
    return `Algorithm executed successfully!
Input: [64, 34, 25, 12, 22, 11, 90]
Output: [11, 12, 22, 25, 34, 64, 90]
Comparisons: 15
Swaps: 8
Time Complexity: O(n log n)
Space Complexity: O(1)`
  } else if (code.includes("def ")) {
    const functionMatch = code.match(/def\s+(\w+)/)
    const functionName = functionMatch ? functionMatch[1] : "function"
    return `Function '${functionName}' defined successfully.
Ready for execution.
Use ${functionName}() to call the function.`
  }
  
  return `Code executed successfully!
No explicit output generated.
All operations completed without errors.`
}

function analyzeComplexity(code: string) {
  let timeComplexity = "O(1)"
  let spaceComplexity = "O(1)"

  if (code.includes("for") && code.includes("for")) {
    timeComplexity = "O(n²)"
  } else if (code.includes("while") || code.includes("for")) {
    timeComplexity = "O(n)"
  } else if (code.includes("sort") || code.includes("heapq")) {
    timeComplexity = "O(n log n)"
  }

  if (code.includes("list") || code.includes("dict") || code.includes("set")) {
    spaceComplexity = "O(n)"
  }

  return { time: timeComplexity, space: spaceComplexity }
}
