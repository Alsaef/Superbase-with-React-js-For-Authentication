'use client'

import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider } from 'next-themes'

export function RootLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NextUIProvider>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        {children}
      </ThemeProvider>
    </NextUIProvider>
  )
}
