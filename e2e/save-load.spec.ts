import type { Locator } from '@playwright/test';
import { expect, test } from '@playwright/test';

const VIEWPORT = { width: 800, height: 600 };

const GAME_URL = `http://localhost:${process.env.PORT}`;

test.use({ viewport: VIEWPORT });

test.describe('SpaceBasic', () => {
  test('Normal state', async ({ page }) => {
    const name = 'SpaceBasic';
    await page.goto(GAME_URL);

    const spaceSelect: Locator = page.getByLabel('Spaces');
    await expect(spaceSelect).toBeVisible();
    await page.getByLabel('Spaces').selectOption(name);
    await expect(page.locator('canvas')).toHaveScreenshot(`${name}-default.png`);
  });

  test('Change, Save and Load with the change', async ({ page }) => {
    await page.goto(GAME_URL);
    const name = 'SpaceBasic';

    const spaceSelect: Locator = page.getByLabel('Spaces');
    await expect(spaceSelect).toBeVisible();

    await page.getByLabel('Spaces').selectOption(name);

    await page.getByRole('button', { name: 'Change' }).click();

    await expect(page.locator('canvas')).toHaveScreenshot(`${name}-before.png`);

    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('button', { name: 'Drop' }).click();
    await page.getByRole('button', { name: 'Load' }).click();

    await expect(page.locator('canvas')).toHaveScreenshot(`${name}-after.png`);
  });
});

// test('SpaceCustomModels', async ({ page }) => {
//   await page.goto(GAME_URL);
//
//   const spaceSelect: Locator = page.getByLabel('Spaces');
//   await expect(spaceSelect).toBeVisible();
//
//   await page.getByLabel('Spaces').selectOption('SpaceCustomModels');
//
//   await expect(page.locator('canvas')).toHaveScreenshot('SpaceCustomModels-before.png');
//
//   await page.getByRole('button', { name: 'Change' }).click();
//   await page.getByRole('button', { name: 'Save' }).click();
//   await page.getByRole('button', { name: 'Drop' }).click();
//   await page.getByRole('button', { name: 'Load' }).click();
//
//   await expect(page.locator('canvas')).toHaveScreenshot('SpaceCustomModels-after.png');
// });
