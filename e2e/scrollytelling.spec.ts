import { test, expect } from '@playwright/test'

test.describe('Scrollytelling E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3001')
    await page.waitForLoadState('networkidle')
  })

  test('should load home page without errors', async ({ page }) => {
    // Check for no console errors
    const errors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })

    await page.waitForTimeout(2000)
    expect(errors.length).toBe(0)
  })

  test('should display hero section', async ({ page }) => {
    const heading = page.getByRole('heading', { name: /Tax\.ai/i })
    await expect(heading).toBeVisible()

    const ctaButton = page.getByRole('button', { name: /Get Started/i })
    await expect(ctaButton).toBeVisible()
  })

  test('should scroll through sections', async ({ page }) => {
    // Initial position
    const initialScroll = await page.evaluate(() => window.scrollY)
    expect(initialScroll).toBe(0)

    // Scroll to middle
    await page.evaluate(() => window.scrollTo(0, window.innerHeight))
    await page.waitForTimeout(500)

    const middleScroll = await page.evaluate(() => window.scrollY)
    expect(middleScroll).toBeGreaterThan(0)

    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(500)

    const bottomScroll = await page.evaluate(() => window.scrollY)
    expect(bottomScroll).toBeGreaterThan(middleScroll)
  })

  test('should have 3D canvas element', async ({ page }) => {
    const canvas = page.locator('canvas')
    await expect(canvas).toBeVisible()
  })

  test('should be accessible', async ({ page }) => {
    // Check for proper heading hierarchy
    const h1 = page.locator('h1')
    await expect(h1).toHaveCount(1)

    // Check for alt text on images (if any)
    const images = page.locator('img')
    const count = await images.count()
    
    for (let i = 0; i < count; i++) {
      const img = images.nth(i)
      await expect(img).toHaveAttribute('alt')
    }
  })

  test('should have proper meta tags', async ({ page }) => {
    const title = await page.title()
    expect(title).toContain('Tax.ai')

    const description = page.locator('meta[name="description"]')
    await expect(description).toHaveAttribute('content')
  })
})
