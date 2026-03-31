import { test, expect } from '@playwright/test';
import fs from 'node:fs';

const outputPath = '/tmp/prime_coach_browser_result.json';

test('prime coach simulation and dashboard flow', async ({ page, baseURL }) => {
  test.setTimeout(120000);

  const consoleMessages = [];
  const pageErrors = [];

  page.on('console', (msg) => {
    consoleMessages.push({ type: msg.type(), text: msg.text() });
  });

  page.on('pageerror', (error) => {
    pageErrors.push(error.message);
  });

  await page.goto('/prime/coach/simulation/', { waitUntil: 'networkidle' });
  await expect(page.getByRole('heading', { name: /Naveen Riaz \/\/ Pattern Connector/i })).toBeVisible();

  const simulation = await page.evaluate(() => {
    const flagNodes = Array.from(document.querySelectorAll('.sim-flag')).map((node) => ({
      type: node.querySelector('.f-type')?.textContent?.trim() || '',
      category: node.querySelector('.f-cat')?.textContent?.trim() || '',
      message: node.querySelector('.f-msg')?.textContent?.trim() || '',
      severity: node.getAttribute('data-severity') || ''
    }));

    return {
      title: document.querySelector('.badge-title')?.textContent?.trim() || '',
      readiness: document.querySelector('.shift-stats .s-value')?.textContent?.trim() || '',
      briefAction: document.querySelector('.vow-action')?.textContent?.trim() || '',
      strengths: Array.from(document.querySelectorAll('.strength-chip')).map((node) => node.textContent?.trim() || ''),
      firstFlags: flagNodes.slice(0, 3),
      flagCount: flagNodes.length
    };
  });

  expect(simulation.flagCount).toBeGreaterThan(0);
  expect(simulation.strengths.length).toBe(5);
  expect(simulation.briefAction.length).toBeGreaterThan(0);

  await page.goto('/prime/coach/', { waitUntil: 'networkidle' });
  await expect(page.getByText('VOW Idle')).toBeVisible();

  await page.getByRole('button', { name: /The Sovereign Outcast/i }).click();
  await expect(page.getByRole('heading', { name: /The Sovereign Outcast/i })).toBeVisible();

  const firstClient = await page.evaluate(() => ({
    title: document.querySelector('.audit-title')?.textContent?.trim() || '',
    shift: document.querySelector('.shift-value')?.textContent?.trim() || '',
    flagCount: document.querySelectorAll('.flag-item').length,
    firstFlag: document.querySelector('.flag-item .f-msg')?.textContent?.trim() || '',
    declaration: document.querySelector('.declaration-text')?.textContent?.trim() || ''
  }));

  await page.getByRole('button', { name: /The Stagnant Catalyst/i }).click();
  await expect(page.getByRole('heading', { name: /The Stagnant Catalyst/i })).toBeVisible();

  const secondClient = await page.evaluate(() => ({
    title: document.querySelector('.audit-title')?.textContent?.trim() || '',
    shift: document.querySelector('.shift-value')?.textContent?.trim() || '',
    flagCount: document.querySelectorAll('.flag-item').length,
    firstFlag: document.querySelector('.flag-item .f-msg')?.textContent?.trim() || ''
  }));

  const result = {
    baseUrl: baseURL,
    simulation,
    dashboard: {
      firstClient,
      secondClient
    },
    consoleMessages,
    pageErrors
  };

  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));

  expect(firstClient.flagCount).toBeGreaterThan(0);
  expect(secondClient.flagCount).toBeGreaterThan(0);
  expect(firstClient.shift).toMatch(/%/);
  expect(secondClient.shift).toMatch(/%/);
  expect(pageErrors).toEqual([]);
});
