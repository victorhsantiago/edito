import { test, expect } from '@playwright/test'

test.describe('Create new post modal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/')
  })

  test('Validate modal inputs', async ({ page }) => {
    await page.getByRole('button', { name: 'Create new post add' }).click()
    await page.getByRole('button', { name: 'Save Changes' }).click()

    await expect(page.getByText('title is a required field')).toBeVisible()
    await expect(page.getByText('author is a required field')).toBeVisible()
    await expect(page.getByText('body is a required field')).toBeVisible()
  })

  test('Publish a new post', async ({ page }) => {
    await page.getByRole('button', { name: 'Create new post add' }).click()

    await expect(page.getByText('Create new postclose')).toBeVisible()

    await page.getByLabel('Title').fill('New title')
    await page.getByLabel('Author').selectOption('4')
    await page.getByRole('paragraph').click()
    await page.locator('#quill-editor div').first().fill('A new story is about to begin')
    await page.getByRole('button', { name: 'Save Changes' }).click()

    await expect(page.getByText('Create new postclose')).not.toBeVisible()
  })
})
