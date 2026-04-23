import { expect, test } from '@playwright/test'

test('root redirects to the default Arabic locale', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveURL(/\/ar$/)
  await expect(page.getByText('Welcome to PharmaBridge')).toBeVisible()
})

test('english login flow reaches the pharmacy dashboard', async ({ page }) => {
  await page.goto('/en/auth/login')

  await page.getByLabel('Email').fill('demo@pharmabridge.test')
  await page.getByLabel('Password').fill('password123')
  await page.getByRole('button', { name: 'Login' }).click()

  await expect(page).toHaveURL(/\/en\/pharmacy\/dashboard$/)
})

test('marketplace page loads in production mode with mocked data enabled', async ({ page }) => {
  await page.goto('/en/marketplace')
  await expect(page.getByText('Find Your Medicine')).toBeVisible()

  await page.getByPlaceholder('e.g., Paracetamol, Amoxicillin...').fill('Paracetamol')
  await page.getByRole('button', { name: 'Search' }).click()
  await expect(page.getByText('Pharmacy Al-Rashid')).toBeVisible()
})
