import type { Locator } from '@playwright/test';
import { expect, test } from '@playwright/test';
import fs from 'fs';

const VIEWPORT = { width: 800, height: 600 };

const GAME_URL = `http://localhost:${process.env.PORT}`;

test.use({ viewport: VIEWPORT });

test.beforeEach(async ({ page }) => {
  await page.goto(GAME_URL);
});

test.describe('SpaceBasic', () => {
  const name = 'SpaceBasic';

  test('Normal state', async ({ page }) => {
    const spaceSelect: Locator = page.getByLabel('Spaces');
    await expect(spaceSelect).toBeVisible();
    await page.getByLabel('Spaces').selectOption(name);
    await expect(page.locator('canvas')).toHaveScreenshot(`${name}-default.png`);
  });

  test('Compare canvas before and after reload', async ({ page }, testInfo) => {
    const canvas: Locator = page.locator('canvas');
    await page.getByLabel('Spaces').selectOption(name);

    await page.getByRole('button', { name: 'Change' }).click();

    const bufferA = await canvas.screenshot();

    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('button', { name: 'Drop' }).click();
    await page.getByRole('button', { name: 'Load' }).click();

    const bufferB = await canvas.screenshot();

    const snapshotName = `${name}-compare.png`;
    const snapshotPath: string = testInfo.snapshotPath(snapshotName);

    if (!fs.existsSync(snapshotPath)) {
      fs.writeFileSync(snapshotPath, bufferA);
      throw new Error('Snapshot A was missing and has now been created. Re-run the test.');
    }

    expect(bufferB).toMatchSnapshot(snapshotName, {
      threshold: 0.01,
      maxDiffPixelRatio: 0.001
    });
  });
});
