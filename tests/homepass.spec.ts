import { test, expect } from '@playwright/test';

test.describe('EU HomePass Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('foco visível nos links e botões', async ({ page }) => {
    await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => document.activeElement?.tagName);
    expect(["A", "BUTTON"].includes(focused!)).toBeTruthy();
  });

  test('opens and closes registration modal', async ({ page }) => {
    await page.getByRole('button', { name: /create account/i }).first().click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.getByRole('button', { name: /close/i }).click();
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('mobile menu toggle', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.getByRole('button', { name: /menu/i }).click();
    await expect(page.getByRole('navigation')).toBeVisible();
    await page.getByRole('button', { name: /menu/i }).click();
    await expect(page.getByRole('navigation')).not.toBeVisible();
  });

  test('navigation to anchor sections', async ({ page }) => {
    await page.getByRole('link', { name: /pricing/i }).click();
    await expect(page.locator('h2', { hasText: /pricing/i })).toBeVisible();
  });

  test('checks presence of pricing text', async ({ page }) => {
    await expect(page.getByText(/€90/)).toBeVisible();
    await expect(page.getByText(/€270/)).toBeVisible();
    await expect(page.getByText(/save €90/i)).toBeVisible();
  });
});
