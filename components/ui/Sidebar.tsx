"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { NAVIGATION } from "@/lib/constants"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

export function Sidebar() {
  const pathname = usePathname()
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  )

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(category)) {
      newExpanded.delete(category)
    } else {
      newExpanded.add(category)
    }
    setExpandedCategories(newExpanded)
  }

  const isActive = (slug?: string) => {
    if (!slug) return false
    return pathname === `/docs/${slug}`
  }

  return (
    <div className="w-64 border-r border-divider overflow-y-auto max-h-[calc(100vh-64px)]">
      <div className="p-6 space-y-2">
        {NAVIGATION.map((item, index) => (
          <div key={index}>
            {item.slug ? (
              <Link
                href={`/docs/${item.slug}`}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.slug)
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-default-100 text-foreground"
                }`}
              >
                {item.title}
              </Link>
            ) : (
              <div>
                <button
                  onClick={() => toggleCategory(item.title)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold hover:bg-default-100 text-foreground transition-colors"
                >
                  {item.title}
                  {item.items && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        expandedCategories.has(item.title)
                          ? "transform rotate-180"
                          : ""
                      }`}
                    />
                  )}
                </button>
                {item.items && expandedCategories.has(item.title) && (
                  <div className="ml-2 mt-1 space-y-1 border-l border-default-200 pl-2">
                    {item.items.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={`/docs/${subItem.slug}`}
                        className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                          isActive(subItem.slug)
                            ? "bg-primary text-primary-foreground font-medium"
                            : "hover:bg-default-100 text-foreground-600"
                        }`}
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
