import { z } from 'zod'

const clientEnvSchema = z.object({
  NEXT_PUBLIC_APP_ENV: z.enum(['development', 'demo', 'preview', 'production']).default('development'),
  NEXT_PUBLIC_ENABLE_OFFLINE: z
    .enum(['true', 'false'])
    .default('true')
    .transform((value) => value === 'true'),
  NEXT_PUBLIC_ENABLE_DEMO_BANNER: z
    .enum(['true', 'false'])
    .default('true')
    .transform((value) => value === 'true'),
  NEXT_PUBLIC_MSW_MODE: z.enum(['on', 'off']).default('on'),
  NEXT_PUBLIC_PIMS_SYNC_INTERVAL_MS: z.coerce.number().int().positive().default(15_000),
})

export const clientEnv = clientEnvSchema.parse({
  NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
  NEXT_PUBLIC_ENABLE_OFFLINE: process.env.NEXT_PUBLIC_ENABLE_OFFLINE,
  NEXT_PUBLIC_ENABLE_DEMO_BANNER: process.env.NEXT_PUBLIC_ENABLE_DEMO_BANNER,
  NEXT_PUBLIC_MSW_MODE: process.env.NEXT_PUBLIC_MSW_MODE,
  NEXT_PUBLIC_PIMS_SYNC_INTERVAL_MS: process.env.NEXT_PUBLIC_PIMS_SYNC_INTERVAL_MS,
})

export function isDemoEnvironment() {
  return clientEnv.NEXT_PUBLIC_APP_ENV === 'demo' || clientEnv.NEXT_PUBLIC_MSW_MODE === 'on'
}
