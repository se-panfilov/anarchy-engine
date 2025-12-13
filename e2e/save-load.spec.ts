import type { Locator } from '@playwright/test';
import { expect, test } from '@playwright/test';
import fs from 'fs';

const VIEWPORT = { width: 800, height: 600 };

const GAME_URL = `http://localhost:${process.env.PORT}`;

test.use({ viewport: VIEWPORT });

test.beforeEach(async ({ page }) => {
  await page.goto(GAME_URL);
});

const scenes: ReadonlyArray<string> = ['SpaceBasic', 'SpaceCustomModels'];

test.describe('Space save/load persistence', () => {
  const thresholds = {
    threshold: 0.01,
    maxDiffPixelRatio: 0.001
  };

  scenes.forEach((sceneName: string): void => {
    test(`Plain space load: [${sceneName}]`, async ({ page }) => {
      const spaceSelect: Locator = page.getByLabel('Spaces');
      await expect(spaceSelect).toBeVisible();
      await page.getByLabel('Spaces').selectOption(sceneName);
      await expect(page.locator('canvas')).toHaveScreenshot(`${sceneName}-default.png`);
    });

    test(`Load, Change, Save, Load changed [${sceneName}]`, async ({ page }, testInfo) => {
      const canvas: Locator = page.locator('canvas');
      await page.getByLabel('Spaces').selectOption(sceneName);

      await page.getByRole('button', { name: 'Change' }).click();

      const bufferA = await canvas.screenshot();

      await page.getByRole('button', { name: 'Save' }).click();
      await page.getByRole('button', { name: 'Drop' }).click();
      await page.getByRole('button', { name: 'Load' }).click();

      const bufferB = await canvas.screenshot();

      const snapshotName: string = `${sceneName}-compare.png`;
      const snapshotPath: string = testInfo.snapshotPath(snapshotName);

      if (!fs.existsSync(snapshotPath)) {
        fs.writeFileSync(snapshotPath, bufferA);
        throw new Error(`Snapshot for ${sceneName} was missing and has now been created. Re-run the test to validate.`);
      }

      expect(bufferB).toMatchSnapshot(snapshotName, thresholds);
    });
  });
});
