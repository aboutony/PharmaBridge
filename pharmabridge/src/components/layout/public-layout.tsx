interface PublicLayoutProps {
  children: React.ReactNode
  header?: React.ReactNode
}

export function PublicLayout({ children, header }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-bg">
      {header && (
        <header className="border-b border-border">
          {header}
        </header>
      )}
      <main id="main-content" className="container mx-auto px-4 tablet:px-6 desktop:px-8 py-8">
        {children}
      </main>
    </div>
  )
}
