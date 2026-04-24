import { expect, test } from '@playwright/test'

test('root redirects to the default Arabic locale', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveURL(/\/ar$/)
  await expect(page.getByRole('heading', { name: /مستقبل الصيدليات/ })).toBeVisible()
})

test('english login flow reaches the pharmacy dashboard', async ({ page }) => {
  await page.goto('/en/auth/login')

  await page.getByLabel('Email').fill('demo@pharmabridge.test')
  await page.getByLabel('Password').fill('password123')
  await page.getByRole('button', { name: 'Enter platform' }).click()

  await expect(page).toHaveURL(/\/en\/pharmacy\/dashboard$/)
})

test('marketplace page loads in production mode with mocked data enabled', async ({ page }) => {
  await page.goto('/en/pharmamarket')
  await expect(page.getByRole('heading', { name: /Search, compare, upload your prescription/i })).toBeVisible()
  await expect(page.getByRole('link', { name: /Open catalog/i })).toBeVisible()
  await expect(page.getByText('Verified pharmacies')).toBeVisible()
})
