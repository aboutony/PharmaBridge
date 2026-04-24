interface AuthLayoutProps {
  children: React.ReactNode
  title?: string
}

export function AuthLayout({ children, title }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg p-4">
      <div className="w-full max-w-md bg-surface rounded-lg shadow-lg p-6 tablet:p-8">
        {title && (
          <h1 className="text-2xl font-bold text-center mb-6">{title}</h1>
        )}
        {children}
      </div>
    </div>
  )
}
