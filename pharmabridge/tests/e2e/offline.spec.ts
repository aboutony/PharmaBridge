import { expect, test } from '@playwright/test'

test('marketplace supports cached reads and queued writes offline', async ({ page, context }) => {
  await page.goto('/en/marketplace')

  await page.getByLabel('Medicine name').fill('Paracetamol')
  await page.getByRole('button', { name: 'Search' }).click()
  await expect(page.getByText('Pharmacy Al-Rashid')).toBeVisible()

  await context.setOffline(true)
  await expect(page.getByText(/Offline mode active/i)).toBeVisible()

  await page.getByRole('button', { name: 'Search' }).click()
  await expect(page.getByText('Pharmacy Al-Rashid')).toBeVisible()

  const queuedResponse = await page.evaluate(async () => {
    const response = await fetch('/api/marketplace/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pharmacyId: '1',
        pharmacyName: 'Pharmacy Al-Rashid',
        items: [{ id: '1', quantity: 1 }],
        deliveryMethod: 'pickup',
        total: 2.5,
      }),
    })

    return response.json()
  })

  expect(queuedResponse.queued).toBe(true)
  await expect(page.getByText(/1 queued/i)).toBeVisible()

  await context.setOffline(false)
  await page.getByRole('button', { name: /sync offline changes/i }).click()
  await expect(page.getByText(/0 queued/i)).toBeVisible()
})
