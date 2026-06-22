"use client"

import { useEffect, useState } from "react"
import { Search, X } from "lucide-react"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  Button,
} from "@nextui-org/react"
import Fuse from "fuse.js"
import Link from "next/link"
import { DOCS_METADATA } from "@/lib/constants"

interface SearchItem {
  title: string
  description: string
  slug: string
}

export function SearchModal() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchItem[]>([])
  const [fuse, setFuse] = useState<Fuse<SearchItem> | null>(null)

  useEffect(() => {
    // Initialize Fuse.js
    const fuseInstance = new Fuse(DOCS_METADATA, {
      keys: ["title", "description"],
      threshold: 0.3,
      ignoreLocation: true,
    })
    setFuse(fuseInstance)

    // Keyboard shortcut: Cmd/Ctrl + K
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
      if (e.key === "Escape") {
        setOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  useEffect(() => {
    if (!fuse) return

    if (query.trim()) {
      const searchResults = fuse.search(query).map((result) => result.item)
      setResults(searchResults)
    } else {
      setResults([])
    }
  }, [query, fuse])

  return (
    <>
      <Button
        isIconOnly
        variant="light"
        className="w-10 h-10"
        onClick={() => setOpen(true)}
        aria-label="Open search"
      >
        <Search className="w-5 h-5" />
      </Button>

      <Modal
        isOpen={open}
        onOpenChange={setOpen}
        size="lg"
        className="top-20"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <Input
              autoFocus
              placeholder="Search documentation..."
              startContent={<Search className="w-4 h-4" />}
              value={query}
              onValueChange={setQuery}
              variant="underlined"
            />
          </ModalHeader>
          <ModalBody>
            {results.length > 0 ? (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {results.map((result) => (
                  <Link
                    key={result.slug}
                    href={`/docs/${result.slug}`}
                    onClick={() => {
                      setOpen(false)
                      setQuery("")
                    }}
                    className="block p-3 rounded-lg hover:bg-default-100 transition-colors"
                  >
                    <div className="font-semibold text-foreground">
                      {result.title}
                    </div>
                    <div className="text-sm text-foreground-500">
                      {result.description}
                    </div>
                  </Link>
                ))}
              </div>
            ) : query ? (
              <div className="text-center py-8 text-foreground-500">
                No results found for {`"${query}"`}
              </div>
            ) : (
              <div className="text-center py-8 text-foreground-500">
                Start typing to search...
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
