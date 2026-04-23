import { useEffect } from 'react'

// Lazy load MSW only in browser
export function useMSW() {
  useEffect(() => {
    const shouldEnableMocking = typeof window !== 'undefined'

    if (shouldEnableMocking) {
      import('../mocks/browser').then(({ worker }) => {
        worker.start({
          onUnhandledRequest: 'bypass'
        })
      })
    }
  }, [])
}
