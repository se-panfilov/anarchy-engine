import { expect, test } from '@playwright/test';
import type { Page } from 'playwright';

const VIEWPORT = { width: 800, height: 600 };

const GAME_URL: string = `http://localhost:${process.env.PORT}?path=saveLoad`;

test.use({ viewport: VIEWPORT, deviceScaleFactor: 1 });

test.beforeEach(async ({ page }): Promise<void> => {
  await page.goto(GAME_URL + '&e2eName=continuous-move');
  await waitUntilReady('GO_TO_PAGE', page);
});

test.describe('Space Transform Drive save/load Special tests', (): void => {
  test(`Special: Transform Drive continuous move`, async ({ page }): Promise<void> => {
    const sceneName: string = 'SpaceTransformDrive';

    await page.getByLabel('Spaces').selectOption(sceneName);

    await waitUntilReady('WAIT_PAGE_LOAD', page);

    await page.getByRole('button', { name: 'Change' }).click();
    await waitUntilReady('CLICKED_CHANGE', page);

    await page.getByRole('button', { name: 'Save' }).click();
    await waitUntilReady('CLICKED_SAVE', page);
    await page.getByRole('button', { name: 'Drop' }).click();
    await page.getByRole('button', { name: 'Load' }).click();
    await waitUntilReady('CLICKED_LOAD', page);
    await page.getByRole('button', { name: 'Change' }).click();
    await waitUntilReady('CLICKED_Change_2', page);

    await expect(page).toHaveScreenshot(`${sceneName}-4-td-continuous-move-compare-changed.png`);
  });
});

export async function waitUntilReady(actionName: string, page: Page, timeout: number = 1000): Promise<void> {
  await page.waitForFunction(
    ({ actionName }): boolean | undefined => {
      console.log(`[E2E] is ${actionName} ready: `, (window as any)._isReady);
      const body: HTMLBodyElement | null = document.querySelector('body');
      const loaded: boolean = !!body?.classList.contains('ready');
      const isReady: boolean = !!(window as any)._isReady;
      const isResourcesReady: boolean = !!(window as any)._isResourcesReady;
      return loaded && isReady && isResourcesReady;
    },
    { timeout, actionName }
  );
}
