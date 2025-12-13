import type { Locator } from '@playwright/test';
import { expect, test } from '@playwright/test';
import fs from 'fs';
import type { Page } from 'playwright';

const VIEWPORT = { width: 800, height: 600 };

const GAME_URL = `http://localhost:${process.env.PORT}`;

test.use({ viewport: VIEWPORT });

test.beforeEach(async ({ page }) => {
  await page.goto(GAME_URL + '?e2eName=continuous-move');
  await waitUntilReady(page);
});

test.describe('Space Transform Drive save/load Special tests', () => {
  const thresholds = {
    threshold: 0.01,
    maxDiffPixelRatio: 0.001
  };

  test(`Special: Transform Drive continuous move`, async ({ page }, testInfo) => {
    const sceneName: string = 'SpaceTransformDrive';

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
    await page.getByRole('button', { name: 'Change' }).click();
    await waitUntilReady(page);

    const bufferB = await canvas.screenshot();

    const snapshotName: string = `${sceneName}-4-td-continuous-move-compare-changed.png`;
    const snapshotPath: string = testInfo.snapshotPath(snapshotName);

    if (!fs.existsSync(snapshotPath)) {
      fs.writeFileSync(snapshotPath, bufferA);
      throw new Error(`Snapshot for ${sceneName} was missing and has now been created. Re-run the test to validate.`);
    }

    expect(bufferB).toMatchSnapshot(snapshotName, thresholds);
  });
});

export async function waitUntilReady(page: Page, timeout: number = 1000, delay: number = 500): Promise<void> {
  await page.waitForFunction(
    (): boolean | undefined => {
      const body: HTMLBodyElement | null = document.querySelector('body');
      return body?.classList.contains('ready') && !body?.classList.contains('await');
    },
    { timeout }
  );
  await page.waitForTimeout(delay);
}
