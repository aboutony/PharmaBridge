import { useEffect } from 'react'

// Lazy load MSW only in browser
export function useMSW() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
      import('./mocks/browser').then(({ worker }) => {
        worker.start({
          onUnhandledRequest: 'bypass'
        })
      })
    }
  }, [])
}