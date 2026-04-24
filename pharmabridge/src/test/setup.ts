import '@testing-library/jest-dom/vitest'
import 'fake-indexeddb/auto'
import { vi } from 'vitest'

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/en',
}))
