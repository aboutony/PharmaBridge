import { expect, test } from '@playwright/test'

test('pharmacy settings supports both marketplace scenarios', async ({ page }) => {
  await page.goto('/en/pharmacy/settings')

  await expect(page.getByText('Scenario A: I already run my own marketplace')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Configure integration' })).toHaveAttribute(
    'href',
    '/en/pharmacy/settings/marketplace',
  )

  const launchPortal = page.getByRole('link', { name: 'Open PharmaMarket portal' })
  await expect(launchPortal).toHaveAttribute('href', '/en/pharmamarket')
  await expect(launchPortal).toHaveAttribute('target', '_blank')
})

test('light mode works and only request demo remains visible on the shell', async ({ page }) => {
  await page.goto('/en')

  await expect(page.getByRole('link', { name: /request demo/i })).toBeVisible()
  await expect(page.getByText(/Demo mode/i)).toHaveCount(0)
  await expect(page.getByText(/Demo environment enabled/i)).toHaveCount(0)

  const html = page.locator('html')
  const beforeThemeClass = (await html.getAttribute('class')) ?? ''
  const themeToggle = page.getByRole('button', { name: /switch to (light|dark) mode|toggle theme/i })
  await themeToggle.click()
  await expect.poll(async () => (await html.getAttribute('class')) ?? '').not.toBe(beforeThemeClass)
})

test('pharmamarket customer journey covers favorites alerts prescriptions checkout and orders', async ({ page }) => {
  await page.goto('/en/pharmamarket/catalog')

  await page.getByRole('button', { name: 'Favorite' }).first().click()
  await page.getByRole('button', { name: 'Add to cart' }).first().click()

  await page.goto('/en/pharmamarket/alerts')
  await page.getByRole('button', { name: 'Save alert' }).click()
  await expect(page.getByText('Panadol Extra', { exact: true }).last()).toBeVisible()

  await page.goto('/en/pharmamarket/prescriptions')
  await page.locator('input[type="file"]').setInputFiles({
    name: 'prescription.pdf',
    mimeType: 'application/pdf',
    buffer: Buffer.from('rx'),
  })
  await page.getByPlaceholder('Note for pharmacist').fill('Customer has a valid prescription.')
  await page.getByRole('button', { name: 'Upload prescription' }).click()
  await expect(page.getByText('prescription.pdf')).toBeVisible()

  await page.goto('/en/pharmamarket/checkout')
  await expect(page.getByText('Panadol Extra')).toBeVisible()
  await page.getByRole('link', { name: 'Continue to payment' }).click()

  await page.getByRole('button', { name: 'Confirm order' }).click()
  await expect(page).toHaveURL(/\/en\/pharmamarket\/orders$/)
  await expect(page.getByText(/PM-/)).toBeVisible()

  await page.getByRole('button', { name: 'Reorder' }).first().click()
  await page.goto('/en/pharmamarket/cart')
  await expect(page.getByText('Panadol Extra')).toBeVisible()
})
