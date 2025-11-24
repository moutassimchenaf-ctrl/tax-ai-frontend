import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
    test('should load hero section with 3D canvas', async ({ page }) => {
        await page.goto('http://localhost:3000');

        // Check for main heading
        await expect(page.getByRole('heading', { name: /Revolutionize Your/i })).toBeVisible();

        // Check for 3D Canvas container
        const canvas = page.locator('canvas').first();
        await expect(canvas).toBeAttached();
    });

    test('should display scrollytelling sections', async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForLoadState('networkidle');

        // Get viewport height
        const viewportHeight = await page.evaluate(() => window.innerHeight);

        // Scroll to the middle of the first section (Hero is 100vh, so 1.5 * vh)
        await page.evaluate((vh) => window.scrollTo(0, vh * 1.5), viewportHeight);
        await page.waitForTimeout(1000); // Wait for animation
        await expect(page.getByText('The New Standard')).toBeVisible();

        // Scroll to the next section
        await page.evaluate((vh) => window.scrollTo(0, vh * 2.5), viewportHeight);
        await page.waitForTimeout(1000);
        await expect(page.getByText('Multi-Agent Swarm')).toBeVisible();
    });
});
