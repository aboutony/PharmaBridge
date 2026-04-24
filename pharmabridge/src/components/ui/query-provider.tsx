'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AppRuntime } from '@/components/system/app-runtime'
import { useMSW } from '@/hooks/useMSW'
import { queryClient } from '@/lib/queryClient'

interface QueryProviderProps {
  children: React.ReactNode
}

export function QueryProvider({ children }: QueryProviderProps) {
  useMSW()

  return (
    <QueryClientProvider client={queryClient}>
      <AppRuntime />
      {children}
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
    </QueryClientProvider>
  )
}
