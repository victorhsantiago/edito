import { test, expect } from '@playwright/test'

test('Navigate to home and filter Posts Table', async ({ page }) => {
  await page.goto('http://localhost:5173/')
  await page.getByPlaceholder('Search for post...').click()
  await page.getByPlaceholder('Search for post...').fill('sunt aut')

  await expect(
    page.getByRole('cell', {
      name: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      exact: true,
    }),
  ).toBeVisible()
  await expect(
    page.getByRole('cell', {
      name: 'laborum non sunt aut ut assumenda perspiciatis voluptas',
      exact: true,
    }),
  ).toBeVisible()
})
