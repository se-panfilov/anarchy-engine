import type { Page } from '@playwright/test';
import { test } from '@playwright/test';
import type { TLaunchContext } from '@Showcases/E2E/Models/TLaunchContext';

import { launchPackagedElectronApp } from './LaunchPackagedElectronApp';

const GAME_URL: string = `http://localhost:${process.env.PORT ?? '4173'}?path=menu`;

let context: TLaunchContext;

test.describe('Space Transform Drive save/load Special tests (desktop packaged)', () => {
  test.beforeAll(async () => {
    const { page } = await launchPackagedElectronApp();

    context = { page };

    await page.goto(GAME_URL + '&e2eName=continuous-move');

    await waitUntilReady('GO_TO_PAGE', page);
  });

  test('GUI buttons should have translations', async () => {
    const { page } = context;

    await page.getByRole('button', { name: 'Settings' }).click();
  });
});

export async function waitUntilReady(actionName: string, page: Page, timeout: number = 1000): Promise<void> {
  await page.waitForFunction(
    ({ actionName }): boolean | undefined => {
      console.log(`[E2E] is ${actionName} ready: `, (window as any)._isReady);
      const body: HTMLBodyElement | null = document.querySelector('body');
      const loaded: boolean = !!body?.classList.contains('ready');
      const isReady: boolean = !!(window as any)._isReady;
      return loaded && isReady;
    },
    { timeout, actionName }
  );
}
