"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, Check } from "lucide-react"

interface CodeBlockProps {
  code: string
  language: string
  title?: string
}

const syntaxHighlight = (code: string, language: string) => {
  const lines = code.split("\n")

  const highlightLine = (line: string) => {
    // Python syntax highlighting
    if (language === "python") {
      return line
        .replace(
          /\b(def|class|if|else|elif|for|while|try|except|finally|with|import|from|return|yield|break|continue|pass|and|or|not|in|is|None|True|False)\b/g,
          '<span class="code-keyword">$1</span>',
        )
        .replace(/(["'])((?:\\.|(?!\1)[^\\])*?)\1/g, '<span class="code-string">$1$2$1</span>')
        .replace(/#.*/g, '<span class="code-comment">$&</span>')
        .replace(/\b(\d+\.?\d*)\b/g, '<span class="code-number">$1</span>')
        .replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/g, '<span class="code-function">$1</span>')
    }

    // JavaScript syntax highlighting
    if (language === "javascript" || language === "js") {
      return line
        .replace(
          /\b(function|const|let|var|if|else|for|while|do|switch|case|default|try|catch|finally|return|break|continue|class|extends|import|export|from|async|await|true|false|null|undefined)\b/g,
          '<span class="code-keyword">$1</span>',
        )
        .replace(/(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g, '<span class="code-string">$1$2$1</span>')
        .replace(/\/\/.*$/g, '<span class="code-comment">$&</span>')
        .replace(/\/\*[\s\S]*?\*\//g, '<span class="code-comment">$&</span>')
        .replace(/\b(\d+\.?\d*)\b/g, '<span class="code-number">$1</span>')
    }

    return line
  }

  return lines.map((line, index) => ({
    number: index + 1,
    content: highlightLine(line) || " ",
  }))
}

export default function CodeBlock({ code, language, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const highlightedLines = syntaxHighlight(code, language)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy code:", err)
    }
  }

  return (
    <div className="relative group">
      {/* Header */}
      <div className="flex items-center justify-between bg-slate-800 px-4 py-2 rounded-t-lg border-b border-slate-700">
        <div className="flex items-center gap-2">
          {title && <span className="text-slate-300 text-sm font-medium">{title}</span>}
          <Badge variant="outline" className="text-xs bg-slate-700 text-slate-300 border-slate-600">
            {language}
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="text-slate-400 hover:text-slate-200 hover:bg-slate-700"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-1" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </>
          )}
        </Button>
      </div>

      {/* Code content */}
      <div className="code-block rounded-t-none">
        <div className="overflow-x-auto">
          {highlightedLines.map((line, index) => (
            <div key={index} className="code-line">
              <span className="code-line-number">{line.number}</span>
              <span className="flex-1 font-mono text-sm" dangerouslySetInnerHTML={{ __html: line.content }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
