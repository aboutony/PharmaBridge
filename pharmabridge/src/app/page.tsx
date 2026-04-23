import Image from "next/image";

import { ThemeToggle } from "@/components/ui/theme-toggle"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to PharmaBridge</h1>
        <p className="text-lg mb-8">Unified Pharmaceutical Ecosystem Platform</p>
        <ThemeToggle />
      </div>
    </main>
  )
}
