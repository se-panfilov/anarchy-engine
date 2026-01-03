import type { Locator, TestInfo } from '@playwright/test';
import { expect, test } from '@playwright/test';
import fs from 'fs';
import type { Page } from 'playwright';

const VIEWPORT = { width: 800, height: 600 };

const GAME_URL: string = `http://localhost:${process.env.PORT}?path=saveLoad`;

test.use({ viewport: VIEWPORT, deviceScaleFactor: 1 });

test.beforeEach(async ({ page }) => {
  await page.goto(GAME_URL, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => document.fonts?.ready);
  await page.evaluate(() => new Promise(requestAnimationFrame));
  await page.evaluate(() => new Promise(requestAnimationFrame));
  await waitUntilReady('BEFORE_EACH', page);
});

const scenes: ReadonlyArray<string> = [
  'SpaceActor',
  'SpaceAnimations',
  'SpaceAudio',
  'SpaceBasic',
  'SpaceCamera',
  'SpaceCustomModels',
  'SpaceFog',
  'SpaceFpsControls',
  'SpaceIntersections',
  'SpaceLight',
  'SpaceMaterials',
  'SpaceOrbitControls',
  'SpaceParticles',
  'SpacePhysics',
  'SpaceSpatial',
  'SpaceTexts',
  'SpaceTransformDrive'
];

test.describe('Space save/load persistence', (): void => {
  const thresholds = {
    // threshold: 0.01,
    // timeout: 30000,
    maxDiffPixelRatio: 0.01
  };

  scenes.forEach((sceneName: string): void => {
    test(`Plain space load: [${sceneName}]`, async ({ page }): Promise<void> => {
      const spaceSelect: Locator = page.getByLabel('Spaces');
      await expect(spaceSelect).toBeVisible();
      await page.getByLabel('Spaces').selectOption(sceneName);
      await waitUntilReady('AFTER_SELECT', page);
      await expect(page.locator('canvas')).toHaveScreenshot(`${sceneName}-1-default.png`, thresholds);
    });

    test(`Load, Save, Load: [${sceneName}]`, async ({ page }, testInfo: TestInfo): Promise<void> => {
      const canvas: Locator = page.locator('canvas');
      await page.getByLabel('Spaces').selectOption(sceneName);
      await waitUntilReady('WAIT_PAGE_LOAD', page);

      const bufferA: Buffer<ArrayBufferLike> = await canvas.screenshot();

      await page.getByRole('button', { name: 'Save' }).click();
      await waitUntilReady('CLICKED_SAVE', page);

      await page.getByRole('button', { name: 'Drop' }).click();
      await page.getByRole('button', { name: 'Load' }).click();
      await waitUntilReady('CLICKED_LOAD', page);

      const bufferB: Buffer<ArrayBufferLike> = await canvas.screenshot();

      const snapshotName: string = `${sceneName}-2-compare-same.png`;
      const snapshotPath: string = testInfo.snapshotPath(snapshotName);

      if (!fs.existsSync(snapshotPath)) {
        fs.writeFileSync(snapshotPath, bufferA);
        throw new Error(`Snapshot for ${sceneName} was missing and has now been created. Re-run the test to validate.`);
      }

      expect(bufferB).toMatchSnapshot(snapshotName, thresholds);
    });

    test(`Load, Change, Save, Load changed: [${sceneName}]`, async ({ page }, testInfo: TestInfo): Promise<void> => {
      const canvas: Locator = page.locator('canvas');
      await page.getByLabel('Spaces').selectOption(sceneName);

      await waitUntilReady('WAIT_PAGE_LOAD', page);

      await page.getByRole('button', { name: 'Change' }).click();
      await waitUntilReady('CLICKED_CHANGE', page);

      const bufferA: Buffer<ArrayBufferLike> = await canvas.screenshot();

      await page.getByRole('button', { name: 'Save' }).click();
      await waitUntilReady('CLICKED_SAVE', page);
      await page.getByRole('button', { name: 'Drop' }).click();
      await page.getByRole('button', { name: 'Load' }).click();
      await waitUntilReady('CLICKED_LOAD', page);

      const bufferB: Buffer<ArrayBufferLike> = await canvas.screenshot();

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

export async function waitUntilReady(actionName: string, page: Page, timeout: number = 1000): Promise<void> {
  await page.waitForFunction(
    ({ actionName }): boolean | undefined => {
      console.log(`[E2E] is ${actionName} ready:  ${(window as any)._isReady}. Is Renderer ready: ${(window as any)._isRendererReady}`);
      const body: HTMLBodyElement | null = document.querySelector('body');
      const loaded: boolean = !!body?.classList.contains('ready');
      const isReady: boolean = !!(window as any)._isReady;
      const isRendererReady: boolean = !!(window as any)._isRendererReady;
      return loaded && isReady && isRendererReady;
    },
    { timeout, actionName }
  );
  await page.waitForTimeout(500);
}
