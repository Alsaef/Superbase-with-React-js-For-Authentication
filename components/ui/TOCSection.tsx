"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { HeadingItem } from "@/types"

interface TOCSectionProps {
  headings: HeadingItem[]
}

export function TOCSection({ headings }: TOCSectionProps) {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-50px 0px -66% 0px" }
    )

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [headings])

  if (!headings.length) return null

  return (
    <div className="hidden lg:block w-48 border-l border-divider pl-6 overflow-y-auto max-h-[calc(100vh-64px)]">
      <div className="py-6">
        <h3 className="text-xs font-semibold uppercase text-foreground-500 mb-4">
          On This Page
        </h3>
        <nav className="space-y-2">
          {headings.map((heading) => (
            <Link
              key={heading.id}
              href={`#${heading.id}`}
              className={`block text-sm transition-colors py-1 ${
                activeId === heading.id
                  ? "font-semibold text-primary"
                  : "text-foreground-600 hover:text-foreground"
              }`}
              style={{
                paddingLeft: `${(heading.level - 2) * 12}px`,
              }}
            >
              {heading.text}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
