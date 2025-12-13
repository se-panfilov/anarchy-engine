import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import type { TLaunchContext } from '@Showcases/E2E/Models/TLaunchContext';

import { launchPackagedElectronApp } from './LaunchPackagedElectronApp';

const GAME_URL: string = `http://localhost:${process.env.PORT ?? '4173'}?path=menu`;

let context: TLaunchContext;

test.describe('Desktop app Menu/GUI text tests', () => {
  test.beforeAll(async () => {
    const { electronApp, page } = await launchPackagedElectronApp();

    context = { electronApp, page };

    await page.goto(GAME_URL);
  });

  //Not sure if this is needed
  // test.afterAll(async () => {
  //   if (context?.electronApp) await context.electronApp.close();
  // });

  test('Open plain page', async () => {
    const { page } = context;

    await expect(page).toHaveScreenshot('plain-page.png', { fullPage: true });
  });

  // test('Translations for plain page should work', async () => {
  //   const { page } = context;
  //
  //   await toggleLanguage(page);
  //
  //   await expect(page).toHaveScreenshot('plain-page-language-toggled.png', { fullPage: true });
  // });
  //
  // test('Open menu', async () => {
  //   const { page } = context;
  //
  //   await openSettings(page);
  //
  //   await expect(page).toHaveScreenshot('settings-open.png', { fullPage: true });
  // });
  //
  // test('Open menu with language toggle', async () => {
  //   const { page } = context;
  //
  //   await openSettings(page);
  //   await toggleLanguage(page);
  //
  //   await expect(page).toHaveScreenshot('settings-open-language-toggled.png', { fullPage: true });
  // });
});

export async function waitUntilReady(actionName: string, page: Page, timeout: number = 30_000): Promise<void> {
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

async function openSettings(page: Page): Promise<void> {
  const settingsButton = page.getByRole('button', { name: /settings/i });
  await settingsButton.click();
}

async function toggleLanguage(page: Page): Promise<void> {
  const languageButton = page.getByRole('button', { name: /language/i });
  await languageButton.click();
}
