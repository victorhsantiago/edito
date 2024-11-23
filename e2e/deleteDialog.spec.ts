import { test, expect } from '@playwright/test'

test.describe('Delete dialog', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/')
  })

  test('deleting an item', async ({ page }) => {
    await page
      .getByRole('row', { name: 'Select post magnam facilis' })
      .getByLabel('Open delete confirmation')
      .click()
    await page.getByRole('heading', { name: 'Delete Post' }).click()

    await expect(page.getByRole('heading', { name: 'Delete Post' })).toBeVisible()
    await expect(
      page.getByText('Are you sure you want to delete "magnam facilis autem"? This action is'),
    ).toBeVisible()
    await expect(page.getByRole('button', { name: 'Cancel deletion' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Confirm deletion' })).toBeVisible()

    await page.getByRole('button', { name: 'Confirm deletion' }).click()

    await expect(page.getByRole('heading', { name: 'Delete Post' })).not.toBeVisible()
  })
})
