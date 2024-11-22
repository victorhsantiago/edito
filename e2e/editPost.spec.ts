import { test, expect } from '@playwright/test'

test.describe('Edit post modal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://127.0.0.1:5173/')
  })

  test('Successfylly edit a post', async ({ page }) => {
    await page
      .getByRole('row', { name: 'Select post et ea vero quia' })
      .getByRole('button')
      .first()
      .click()

    await expect(page.getByLabel('Title')).toHaveValue('et ea vero quia laudantium autem')
    await expect(page.getByLabel('Author')).toHaveValue('2')

    await page.getByLabel('Title').click()
    await page.getByLabel('Title').press('ControlOrMeta+a')
    await page.getByLabel('Title').fill('New title')
    await page.getByRole('button', { name: 'Save Changes' }).click()

    await expect(page.getByText('Edit postclose')).not.toBeVisible()
  })

  test('Validate inputs', async ({ page }) => {
    await page.goto('http://127.0.0.1:5173/')
    await page
      .getByRole('row', { name: 'Select post et ea vero quia' })
      .getByRole('button')
      .first()
      .click()
    await page.getByLabel('Title').click()
    await page.getByLabel('Title').press('ControlOrMeta+a')
    await page.getByLabel('Title').fill('')

    await expect(page.getByText('title is a required field')).toBeVisible()
  })
})
