import { test } from '@playwright/test';

test('debug ports', async ({ page }) => {
    console.log('--- DEBUG PORT 3000 ---');
    try {
        await page.goto('http://localhost:3000');
        console.log('Title:', await page.title());
        console.log('Body:', await page.innerHTML('body'));
    } catch (e) {
        console.log('Error 3000:', e);
    }

    console.log('--- DEBUG PORT 3001 ---');
    try {
        await page.goto('http://localhost:3001');
        console.log('Title:', await page.title());
        console.log('Body:', await page.innerHTML('body'));
    } catch (e) {
        console.log('Error 3001:', e);
    }
});
