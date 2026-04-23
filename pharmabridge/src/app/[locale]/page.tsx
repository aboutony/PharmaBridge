'use client'

import { ThemeToggle } from "@/components/ui/theme-toggle"
import { LanguageToggle } from "@/components/ui/language-toggle"
import { useMSW } from "@/hooks/useMSW"

export default function Home() {
  // Initialize MSW in development
  useMSW()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to PharmaBridge</h1>
        <p className="text-lg mb-8">Unified Pharmaceutical Ecosystem Platform</p>
        <div className="flex gap-4 mb-4">
          <ThemeToggle />
          <LanguageToggle />
        </div>
        <div className="text-sm text-text-secondary">
          MSW is active in development - check network tab for mocked API calls
        </div>
      </div>
    </main>
  )
}