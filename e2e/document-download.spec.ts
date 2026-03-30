import { test, expect } from '@playwright/test';

test.describe('Document Downloads', () => {
  test('should provide CV download button on home page', async ({ page }) => {
    await page.goto('/');

    const cvDownloadButton = page.locator(
      'a[href*="cv"], a[href*="CV"], a:has-text("Download CV")'
    );
    await expect(cvDownloadButton).toBeVisible();

    // Check that it's a proper download link
    const href = await cvDownloadButton.getAttribute('href');
    expect(href).toContain('.pdf');
  });

  test('should provide reference download button on home page', async ({
    page,
  }) => {
    await page.goto('/');

    const referenceDownloadButton = page.locator(
      'a[href*="reference"], a:has-text("Download Reference")'
    );
    await expect(referenceDownloadButton).toBeVisible();

    // Check that it's a proper download link
    const href = await referenceDownloadButton.getAttribute('href');
    expect(href).toContain('.pdf');
  });

  test('CV download should serve PDF directly', async ({ page }) => {
    await page.goto('/');

    const cvDownloadButton = page
      .locator('a[href*="cv"], a[href*="CV"], a:has-text("Download CV")')
      .first();
    const href = await cvDownloadButton.getAttribute('href');

    if (href) {
      // Use fetch to check the PDF response instead of navigating
      const response = await page.evaluate(async url => {
        const res = await fetch(url);
        return {
          status: res.status,
          contentType: res.headers.get('content-type'),
        };
      }, href);

      // Check that it's a PDF response
      expect(response.status).toBe(200);
      expect(response.contentType).toContain('application/pdf');
    }
  });

  test('Reference download should serve PDF directly', async ({ page }) => {
    await page.goto('/');

    const referenceDownloadButton = page
      .locator('a[href*="reference"], a:has-text("Download Reference")')
      .first();
    const href = await referenceDownloadButton.getAttribute('href');

    if (href) {
      // Use fetch to check the PDF response instead of navigating
      const response = await page.evaluate(async url => {
        const res = await fetch(url);
        return {
          status: res.status,
          contentType: res.headers.get('content-type'),
        };
      }, href);

      // Check that it's a PDF response
      expect(response.status).toBe(200);
      expect(response.contentType).toContain('application/pdf');
    }
  });

  test('download buttons should have proper accessibility attributes', async ({
    page,
  }) => {
    await page.goto('/');

    const downloadButtons = page.locator('a[href*=".pdf"]');
    const buttonCount = await downloadButtons.count();

    for (let i = 0; i < buttonCount; i++) {
      const button = downloadButtons.nth(i);

      // Check for descriptive text or aria-label
      const text = await button.textContent();
      const ariaLabel = await button.getAttribute('aria-label');

      expect(text || ariaLabel).toBeTruthy();

      // Should indicate it's a download
      const content = (text || ariaLabel || '').toLowerCase();
      expect(content).toMatch(/download|cv|reference/);
    }
  });

  test('external links should open in new tab', async ({ page }) => {
    await page.goto('/');

    // Check GitHub and LinkedIn links
    const externalLinks = page.locator(
      'a[href*="github.com"], a[href*="linkedin.com"]'
    );
    const linkCount = await externalLinks.count();

    for (let i = 0; i < linkCount; i++) {
      const link = externalLinks.nth(i);

      // Should have target="_blank"
      await expect(link).toHaveAttribute('target', '_blank');

      // Should have security attributes
      await expect(link).toHaveAttribute('rel', /noopener|noreferrer/);
    }
  });
});
