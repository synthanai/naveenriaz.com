import { test } from '@playwright/test';
import fs from 'node:fs';

const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:4322';

test('debug monday onboarding click', async ({ page }) => {
  const consoleMessages = [];
  const pageErrors = [];

  page.on('console', (msg) => {
    consoleMessages.push({ type: msg.type(), text: msg.text() });
  });

  page.on('pageerror', (error) => {
    pageErrors.push(error.message);
  });

  await page.goto(`${baseUrl}/prime/onboarding/monday/`, { waitUntil: 'networkidle' });
  await page.click('#start-btn');
  await page.waitForTimeout(1500);

  const state = await page.evaluate(() => ({
    introClass: document.getElementById('intro-section')?.className || '',
    rootClass: document.getElementById('react-root')?.className || '',
    rootHtml: document.getElementById('react-root')?.innerHTML || '',
    probeCount: document.querySelectorAll('.card-probe').length
  }));

  fs.writeFileSync('/tmp/prime_monday_debug.json', JSON.stringify({
    state,
    consoleMessages,
    pageErrors
  }, null, 2));
});
