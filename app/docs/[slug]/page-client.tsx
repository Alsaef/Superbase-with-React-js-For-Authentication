'use client'

import { docsContent } from '@/lib/docs-data'
import { DOCS_METADATA } from '@/lib/constants'
import { TOCSection } from '@/components/ui/TOCSection'
import { CodeBlock } from '@/components/ui/CodeBlock'
import { extractHeadings } from '@/lib/utils'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@nextui-org/react'

interface DocPageClientProps {
  slug: string
}

function renderMarkdown(content: string) {
  const parts: React.ReactNode[] = []
  let lastIndex = 0

  // Pattern for code blocks
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g
  let match

  const matches: Array<{ index: number; match: string; language: string; code: string }> = []

  while ((match = codeBlockRegex.exec(content)) !== null) {
    matches.push({
      index: match.index,
      match: match[0],
      language: match[1] || 'javascript',
      code: match[2],
    })
  }

  matches.forEach((codeMatch) => {
    // Add text before code block
    if (codeMatch.index > lastIndex) {
      const textBefore = content.substring(lastIndex, codeMatch.index)
      parts.push(renderTextContent(textBefore))
    }

    // Add code block
    parts.push(
      <CodeBlock
        key={`code-${codeMatch.index}`}
        code={codeMatch.code}
        language={codeMatch.language}
      />
    )

    lastIndex = codeMatch.index + codeMatch.match.length
  })

  // Add remaining text
  if (lastIndex < content.length) {
    parts.push(renderTextContent(content.substring(lastIndex)))
  }

  return parts
}

function renderTextContent(text: string) {
  const lines = text.split('\n')
  const result: React.ReactNode[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Headings
    if (line.startsWith('## ')) {
      const heading = line.replace('## ', '')
      const id = heading
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '')
      result.push(
        <h2
          key={`h2-${i}`}
          id={id}
          className="text-3xl font-bold mt-8 mb-4 scroll-mt-20"
        >
          {heading}
        </h2>
      )
    } else if (line.startsWith('### ')) {
      const heading = line.replace('### ', '')
      const id = heading
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '')
      result.push(
        <h3
          key={`h3-${i}`}
          id={id}
          className="text-2xl font-semibold mt-6 mb-3 scroll-mt-20"
        >
          {heading}
        </h3>
      )
    } else if (line.startsWith('#### ')) {
      const heading = line.replace('#### ', '')
      result.push(
        <h4
          key={`h4-${i}`}
          className="text-xl font-semibold mt-4 mb-2"
        >
          {heading}
        </h4>
      )
    } else if (line.startsWith('# ')) {
      const heading = line.replace('# ', '')
      result.push(
        <h1
          key={`h1-${i}`}
          className="text-4xl font-bold mb-4"
        >
          {heading}
        </h1>
      )
    } else if (line.match(/^[-*]\s/)) {
      // Lists
      result.push(
        <li
          key={`li-${i}`}
          className="ml-6 text-foreground-600 mb-2"
        >
          {line.replace(/^[-*]\s/, '')}
        </li>
      )
    } else if (line.match(/^\d+\.\s/)) {
      // Ordered lists
      result.push(
        <li
          key={`ol-${i}`}
          className="ml-6 text-foreground-600 mb-2"
        >
          {line.replace(/^\d+\.\s/, '')}
        </li>
      )
    } else if (line.match(/^\|/)) {
      // Tables (simplified)
      result.push(
        <div
          key={`table-${i}`}
          className="overflow-x-auto my-4"
        >
          <table className="w-full border-collapse border border-divider">
            <tbody>
              <tr>
                {line
                  .split('|')
                  .filter((cell) => cell.trim())
                  .map((cell, idx) => (
                    <td
                      key={`td-${i}-${idx}`}
                      className="border border-divider px-4 py-2"
                    >
                      {cell.trim()}
                    </td>
                  ))}
              </tr>
            </tbody>
          </table>
        </div>
      )
    } else if (line.trim()) {
      // Regular paragraphs and inline formatting
      result.push(
        <p
          key={`p-${i}`}
          className="mb-4 text-foreground-700 leading-relaxed"
        >
          {formatInlineContent(line)}
        </p>
      )
    } else if (line === '') {
      result.push(<div key={`space-${i}`} className="mb-2" />)
    }
  }

  return result
}

function formatInlineContent(text: string) {
  // Handle bold
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  // Handle italic
  text = text.replace(/\*(.+?)\*/g, '<em>$1</em>')
  // Handle code
  text = text.replace(/`(.+?)`/g, '<code>$1</code>')
  // Handle links
  text = text.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')

  return (
    <span
      dangerouslySetInnerHTML={{ __html: text }}
      className="[&_strong]:font-semibold [&_em]:italic [&_code]:bg-default-100 [&_code]:px-2 [&_code]:py-1 [&_code]:rounded [&_code]:font-mono [&_code]:text-sm [&_a]:text-primary [&_a]:hover:underline"
    />
  )
}

export function DocPageClient({ slug }: DocPageClientProps) {
  const content = docsContent[slug]
  const metadata = DOCS_METADATA.find((doc) => doc.slug === slug)

  if (!content || !metadata) {
    notFound()
  }

  const headings = extractHeadings(content)

  const currentIndex = DOCS_METADATA.findIndex((doc) => doc.slug === slug)
  const previousDoc = currentIndex > 0 ? DOCS_METADATA[currentIndex - 1] : null
  const nextDoc = currentIndex < DOCS_METADATA.length - 1 ? DOCS_METADATA[currentIndex + 1] : null

  return (
    <div className="flex">
      <div className="flex-1 max-w-4xl px-8 py-12">
        <article className="prose prose-invert max-w-none">
          {renderMarkdown(content)}
        </article>

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-divider flex gap-4">
          {previousDoc && (
            <Button
              as={Link}
              href={`/docs/${previousDoc.slug}`}
              variant="flat"
              startContent={<ArrowLeft className="w-4 h-4" />}
              className="flex-1"
            >
              <div className="text-left">
                <div className="text-xs text-foreground-500">Previous</div>
                <div>{previousDoc.title}</div>
              </div>
            </Button>
          )}

          {nextDoc && (
            <Button
              as={Link}
              href={`/docs/${nextDoc.slug}`}
              variant="flat"
              endContent={<ArrowRight className="w-4 h-4" />}
              className="flex-1"
            >
              <div className="text-right">
                <div className="text-xs text-foreground-500">Next</div>
                <div>{nextDoc.title}</div>
              </div>
            </Button>
          )}
        </div>
      </div>

      {/* TOC Sidebar */}
      <TOCSection headings={headings} />
    </div>
  )
}
