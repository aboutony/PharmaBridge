import { expect, test } from '@playwright/test'

test('platform surfaces offline-first continuity messaging', async ({ page }) => {
  await page.goto('/en')
  await expect(page.getByText('Offline-first operations')).toBeVisible()
  await expect(page.getByText(/queued updates sync when connectivity returns/i)).toBeVisible()
})
