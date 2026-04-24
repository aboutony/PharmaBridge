import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test('landing page has no critical accessibility violations', async ({ page }) => {
  await page.goto('/ar')

  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze()

  expect(accessibilityScanResults.violations).toEqual([])
})

test('english landing page exposes main landmarks and controls', async ({ page }) => {
  await page.goto('/en')

  await expect(page.getByRole('main')).toBeVisible()
  await expect(page.getByRole('link', { name: /request demo/i })).toBeVisible()
  await expect(page.getByRole('button', { name: /switch to arabic/i })).toBeVisible()
})
