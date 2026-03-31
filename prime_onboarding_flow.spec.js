import { test, expect } from '@playwright/test';
import fs from 'node:fs';

const outputPath = '/tmp/prime_onboarding_browser_result.json';

function categoryPayload(index) {
  const past = (index % 5) + 2;
  const present = Math.min(10, past + 2);
  const future = Math.min(10, present + 2);
  return { past, present, future };
}

async function setRangeValue(locator, value) {
  await locator.evaluate((node, nextValue) => {
    const descriptor = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value');
    descriptor?.set?.call(node, String(nextValue));
    node.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    node.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }, value);
}

test('prime onboarding browser flow', async ({ page, baseURL }) => {
  test.setTimeout(180000);

  const consoleMessages = [];
  const pageErrors = [];

  page.on('console', (msg) => {
    consoleMessages.push({ type: msg.type(), text: msg.text() });
  });

  page.on('pageerror', (error) => {
    pageErrors.push(error.message);
  });

  await page.goto('/prime/onboarding/monday/', { waitUntil: 'domcontentloaded' });
  await expect(page.getByRole('button', { name: 'Enter the Initiation' })).toBeVisible();
  await page.getByRole('button', { name: 'Enter the Initiation' }).click();

  for (let index = 0; index < 21; index += 1) {
    await expect(page.locator('.card-probe')).toBeVisible();
    const chapter = index + 1;
    const label = (await page.locator('.card-label').textContent())?.trim() || `CHAPTER ${chapter}`;
    const payload = categoryPayload(index);
    const ranges = page.locator("input[type='range']");
    const scoreChips = page.locator('.s-val');
    await setRangeValue(ranges.nth(0), payload.past);
    await expect(scoreChips.nth(0)).toHaveText(String(payload.past));
    await setRangeValue(ranges.nth(1), payload.present);
    await expect(scoreChips.nth(1)).toHaveText(String(payload.present));
    await setRangeValue(ranges.nth(2), payload.future);
    await expect(scoreChips.nth(2)).toHaveText(String(payload.future));
    await page.locator('.anchor-input').fill(`Browser test trace for ${label.toLowerCase()} at chapter ${chapter}.`);
    await page.getByRole('button', { name: /Next Chapter|Seal the Chronicle/ }).click();
  }

  for (let step = 0; step < 7; step += 1) {
    await expect(page.locator('.vow-question')).toBeVisible();
    const traceHeader = (await page.locator('.vow-trace-header').textContent())?.trim() || `TRACE ${step + 1}`;
    await page.locator('.vow-input').fill(`Browser test excavation for ${traceHeader.toLowerCase()} with specific cost and consequence.`);
    await page.getByRole('button', { name: /Continue Excavation|Seal the Monday Chronicle/ }).click();
  }

  await expect(page.locator('.codes-title')).toBeVisible();
  await page.getByPlaceholder('e.g. INTJ-A').fill('INTJ-A');
  await page.getByPlaceholder('e.g. Strategic, Achiever, Ideation...').fill('Strategic, Ideation, Achiever, Learner, Focus');
  await page.locator('select').nth(0).selectOption('Projector');
  await page.locator('select').nth(1).selectOption('Splenic');
  await page.getByPlaceholder('e.g. 5/1').fill('5/1');
  await page.getByRole('button', { name: 'Seal the Monday Excavation' }).click();
  await expect(page.getByRole('heading', { name: 'Chronicle Sealed' })).toBeVisible();

  const monday = await page.evaluate(() => ({
    completionTitle: document.querySelector('h2')?.textContent?.trim() || '',
    mondayPayload: JSON.parse(localStorage.getItem('synthai_onboarding_monday') || 'null')
  }));

  await page.goto('/prime/onboarding/wednesday/', { waitUntil: 'domcontentloaded' });
  await page.getByRole('button', { name: 'Look in the Mirror' }).click();
  await expect(page.locator('#act-2.active')).toBeVisible();
  const collisionText = (await page.locator('#vow-collision-text').textContent())?.trim() || '';
  await page.locator(".choice-btn[data-choice='accept']").click();
  await expect(page.locator('#act-3.active')).toBeVisible();
  await page.locator(".point-btn[data-point='throat']").click();
  await page.getByRole('button', { name: 'Seal the Resonance' }).click();
  await expect(page.locator('#act-complete.active')).toBeVisible();

  const wednesday = await page.evaluate((text) => ({
    collisionText: text,
    resonancePayload: JSON.parse(localStorage.getItem('synthai_onboarding_wednesday') || 'null')
  }), collisionText);

  await page.goto('/prime/onboarding/friday/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('#see-the-brief')).toBeVisible();
  await page.locator('#see-the-brief').click();
  await expect(page.getByRole('heading', { name: 'Sovereign Legacy Brief' })).toBeVisible();

  const brief = await page.evaluate(() => ({
    text: document.getElementById('vow-brief-text')?.textContent?.trim() || '',
    archetype: document.getElementById('archetype-val')?.textContent?.trim() || '',
    shadow: document.getElementById('shadow-val')?.textContent?.trim() || '',
    tension: document.getElementById('tension-val')?.textContent?.trim() || ''
  }));

  await page.locator('#make-declaration').click();
  await expect(page.locator('#declaration-input')).toBeVisible();
  await page.locator('#declaration-input').fill('I declare that I will turn pattern insight into embodied authority.');
  await page.locator('#seal-initiation').click();
  await expect(page.getByRole('heading', { name: 'Initiation Sealed' })).toBeVisible();

  const friday = await page.evaluate((currentBrief) => ({
    brief: currentBrief,
    declaration: localStorage.getItem('synthai_onboarding_final_declaration'),
    completionTitle: document.querySelector('h2')?.textContent?.trim() || ''
  }), brief);

  const result = {
    baseUrl: baseURL,
    monday,
    wednesday,
    friday,
    consoleMessages,
    pageErrors
  };

  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));

  expect(monday.completionTitle).toContain('Chronicle Sealed');
  expect(wednesday.resonancePayload?.somaticLocation).toBe('throat');
  expect(friday.brief.text.length).toBeGreaterThan(0);
  expect(pageErrors).toEqual([]);
});
