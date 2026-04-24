'use client'

import { SidebarNav } from "@/components/layout/sidebar-nav"
import { BottomNav } from "@/components/layout/bottom-nav"
import { Header } from "@/components/layout/header"

interface AdminLayoutProps {
  children: React.ReactNode
  title?: string
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen bg-bg">
      {/* Sidebar for tablet/desktop */}
      <aside className="hidden tablet:flex tablet:w-48 desktop:w-64 bg-surface border-r border-border">
        <SidebarNav activeTab="dashboard" />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Header title={title || "Admin Dashboard"} />
        <main className="flex-1 p-4 tablet:p-6 desktop:p-8">
          {children}
        </main>
      </div>

      {/* Bottom navigation for mobile */}
      <BottomNav activeTab="dashboard" />
    </div>
  )
}
