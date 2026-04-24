import { expect, test } from '@playwright/test'

test('landing page meets local LCP and CLS thresholds', async ({ page }) => {
  await page.addInitScript(() => {
    // @ts-expect-error test-only metric handoff
    window.__pbMetrics = { lcp: 0, cls: 0 }

    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      const lastEntry = entries[entries.length - 1]
      // @ts-expect-error test-only metric handoff
      window.__pbMetrics.lcp = lastEntry?.startTime ?? 0
    }).observe({ type: 'largest-contentful-paint', buffered: true })

    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const layoutShiftEntry = entry as PerformanceEntry & { value?: number; hadRecentInput?: boolean }
        if (!layoutShiftEntry.hadRecentInput) {
          // @ts-expect-error test-only metric handoff
          window.__pbMetrics.cls += layoutShiftEntry.value ?? 0
        }
      }
    }).observe({ type: 'layout-shift', buffered: true })
  })

  await page.goto('/ar')
  await page.waitForLoadState('networkidle')

  const metrics = await page.evaluate(() => {
    // @ts-expect-error test-only metric handoff
    return window.__pbMetrics as { lcp: number; cls: number }
  })

  expect(metrics.lcp).toBeLessThan(2500)
  expect(metrics.cls).toBeLessThan(0.1)
})
