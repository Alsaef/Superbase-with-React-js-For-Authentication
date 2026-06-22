"use client"

import { Navbar as NextUINavbar, NavbarBrand, NavbarContent } from "@nextui-org/react"
import Link from "next/link"
import { SITE_NAME } from "@/lib/constants"
import { ThemeToggle } from "./ThemeToggle"
import { SearchModal } from "./SearchModal"
import { Database } from "lucide-react"

export function Navbar() {
  return (
    <NextUINavbar
      maxWidth="full"
      position="sticky"
      className="border-b border-divider"
    >
      <NavbarBrand as={Link} href="/" className="gap-3 cursor-pointer">
        <Database className="w-6 h-6" />
        <p className="font-bold text-lg">{SITE_NAME}</p>
      </NavbarBrand>

      <NavbarContent justify="end" className="gap-2">
        <SearchModal />
        <ThemeToggle />
      </NavbarContent>
    </NextUINavbar>
  )
}
