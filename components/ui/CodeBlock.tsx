"use client"

import { Check, Copy } from "lucide-react"
import { useState } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism"
import { useTheme } from "next-themes"
import { Button } from "@nextui-org/react"

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
}

export function CodeBlock({
  code,
  language = "javascript",
  filename,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const { theme } = useTheme()

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const style = theme === "dark" ? oneDark : oneLight

  return (
    <div className="relative rounded-lg overflow-hidden border border-divider my-4">
      {filename && (
        <div className="px-4 py-2 bg-default-100 border-b border-divider text-sm font-mono text-foreground-600">
          {filename}
        </div>
      )}
      <div className="relative">
        <SyntaxHighlighter
          language={language}
          style={style}
          className="!m-0 !p-4"
          customStyle={{
            fontSize: "0.875rem",
            lineHeight: "1.5",
          }}
        >
          {code.trim()}
        </SyntaxHighlighter>
        <Button
          isIconOnly
          variant="flat"
          size="sm"
          className="absolute top-2 right-2"
          onClick={copyToClipboard}
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  )
}
