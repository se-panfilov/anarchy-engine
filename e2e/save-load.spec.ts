import type { Locator } from '@playwright/test';
import { expect, test } from '@playwright/test';
import fs from 'fs';
import type { Page } from 'playwright';

const VIEWPORT = { width: 800, height: 600 };

const GAME_URL = `http://localhost:${process.env.PORT}`;

test.use({ viewport: VIEWPORT });

test.beforeEach(async ({ page }) => {
  await page.goto(GAME_URL);
  await waitUntilReady(page);
});

const scenes: ReadonlyArray<string> = ['SpaceBasic', 'SpaceCustomModels', 'SpaceTexts', 'SpaceLight', 'SpaceMaterials', 'SpaceOrbitControls', 'SpaceFpsControls', 'SpaceActor'];

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
      await expect(page.locator('canvas')).toHaveScreenshot(`${sceneName}-1-default.png`);
    });

    test(`Load, Save, Load: [${sceneName}]`, async ({ page }, testInfo) => {
      const canvas: Locator = page.locator('canvas');
      await page.getByLabel('Spaces').selectOption(sceneName);
      await waitUntilReady(page);

      const bufferA = await canvas.screenshot();

      await page.getByRole('button', { name: 'Save' }).click();

      await waitUntilReady(page);
      await page.getByRole('button', { name: 'Drop' }).click();
      await page.getByRole('button', { name: 'Load' }).click();
      await waitUntilReady(page);

      const bufferB = await canvas.screenshot();

      const snapshotName: string = `${sceneName}-2-compare-same.png`;
      const snapshotPath: string = testInfo.snapshotPath(snapshotName);

      if (!fs.existsSync(snapshotPath)) {
        fs.writeFileSync(snapshotPath, bufferA);
        throw new Error(`Snapshot for ${sceneName} was missing and has now been created. Re-run the test to validate.`);
      }

      expect(bufferB).toMatchSnapshot(snapshotName, thresholds);
    });

    test(`Load, Change, Save, Load changed: [${sceneName}]`, async ({ page }, testInfo) => {
      const canvas: Locator = page.locator('canvas');
      await page.getByLabel('Spaces').selectOption(sceneName);

      await waitUntilReady(page);

      await page.getByRole('button', { name: 'Change' }).click();
      await waitUntilReady(page);

      const bufferA = await canvas.screenshot();

      await page.getByRole('button', { name: 'Save' }).click();
      await waitUntilReady(page);
      await page.getByRole('button', { name: 'Drop' }).click();
      await page.getByRole('button', { name: 'Load' }).click();
      await waitUntilReady(page);

      const bufferB = await canvas.screenshot();

      const snapshotName: string = `${sceneName}-3-compare-changed.png`;
      const snapshotPath: string = testInfo.snapshotPath(snapshotName);

      if (!fs.existsSync(snapshotPath)) {
        fs.writeFileSync(snapshotPath, bufferA);
        throw new Error(`Snapshot for ${sceneName} was missing and has now been created. Re-run the test to validate.`);
      }

      expect(bufferB).toMatchSnapshot(snapshotName, thresholds);
    });
  });
});

export async function waitUntilReady(page: Page, timeout: number = 1000): Promise<void> {
  await page.waitForFunction(
    (): boolean | undefined => {
      const body: HTMLBodyElement | null = document.querySelector('body');
      return body?.classList.contains('ready');
    },
    { timeout }
  );
  await page.waitForTimeout(500);
}
