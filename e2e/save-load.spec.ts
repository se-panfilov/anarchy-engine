import type { Locator } from '@playwright/test';
import { expect, test } from '@playwright/test';

const VIEWPORT = { width: 800, height: 600 };

const GAME_URL = `http://localhost:${process.env.PORT}`;

test.use({ viewport: VIEWPORT });

test('SpaceBasic', async ({ page }) => {
  await page.goto(GAME_URL);

  const spaceSelect: Locator = page.getByLabel('Spaces');
  await expect(spaceSelect).toBeVisible();

  await page.getByLabel('Spaces').selectOption('SpaceBasic');

  await expect(page.locator('canvas')).toHaveScreenshot('SpaceBasic-before.png');

  await page.getByRole('button', { name: 'Change' }).click();

  await expect(page.locator('canvas')).toHaveScreenshot('SpaceBasic-after.png');
});

test('SpaceCustomModels', async ({ page }) => {
  await page.goto(GAME_URL);

  const spaceSelect: Locator = page.getByLabel('Spaces');
  await expect(spaceSelect).toBeVisible();

  await page.getByLabel('Spaces').selectOption('SpaceCustomModels');

  await expect(page.locator('canvas')).toHaveScreenshot('SpaceCustomModels-before.png');

  await page.getByRole('button', { name: 'Change' }).click();

  await expect(page.locator('canvas')).toHaveScreenshot('SpaceCustomModels-after.png');
});
