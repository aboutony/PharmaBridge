import { cn } from "@/lib/utils"

interface SidebarLayoutProps {
  children: React.ReactNode
  sidebar: React.ReactNode
}

export function SidebarLayout({ children, sidebar }: SidebarLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar - hidden on mobile, fixed on tablet/desktop */}
      <aside className="hidden tablet:flex desktop:w-64 tablet:w-48 bg-surface border-r border-border">
        {sidebar}
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 tablet:p-6 desktop:p-8">
        {children}
      </main>

      {/* Bottom navigation for mobile */}
      <nav className="tablet:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border p-4">
        {/* Placeholder for bottom nav */}
        <div className="flex justify-around">
          <div>Dashboard</div>
          <div>Inventory</div>
          <div>Settings</div>
        </div>
      </nav>
    </div>
  )
}