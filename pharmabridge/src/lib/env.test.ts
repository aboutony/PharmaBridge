import { describe, expect, it } from 'vitest'
import { clientEnv, isDemoEnvironment } from './env'

describe('client environment', () => {
  it('parses the public app environment', () => {
    expect(clientEnv.NEXT_PUBLIC_APP_ENV).toBeTruthy()
    expect(typeof clientEnv.NEXT_PUBLIC_ENABLE_OFFLINE).toBe('boolean')
  })

  it('treats MSW demo mode as demo environment', () => {
    expect(isDemoEnvironment()).toBe(true)
  })
})
