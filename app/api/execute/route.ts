import { type NextRequest, NextResponse } from "next/server"
import { executePythonCode } from "@/lib/python-executor"

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json()

    if (!code || typeof code !== "string") {
      return NextResponse.json({ error: "Invalid code provided" }, { status: 400 })
    }

    const result = await executePythonCode(code)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Code execution error:", error)
    return NextResponse.json({ error: "Failed to execute code" }, { status: 500 })
  }
}
