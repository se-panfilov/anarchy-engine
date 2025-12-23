import type { Locator, Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import type { TLaunchContext } from '@Showcases/E2E/Models/TLaunchContext';

import { launchPackagedElectronApp, waitFontsReady } from './DesktopE2eUtils';

const GAME_URL: string = `http://localhost:${process.env.PORT ?? '4173'}?path=menu`;

let context: TLaunchContext;

// Run tests in serial mode to avoid multiple Electron instances running simultaneously
test.describe.configure({ mode: 'serial' });

test.describe('Desktop app Menu/GUI text tests', () => {
  test.beforeAll(async () => {
    const { electronApp, page } = await launchPackagedElectronApp();

    context = { electronApp, page };

    await page.goto(GAME_URL);
    await page.waitForLoadState('domcontentloaded');
    // eslint-disable-next-line spellcheck/spell-checker
    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('load');
    await waitFontsReady(page);
  });

  test.afterAll(async () => {
    if (context?.electronApp) await context.electronApp.close();
  });

  test('Open plain page', async () => {
    const { page } = context;

    await expect(page).toHaveScreenshot('plain-page.png', { fullPage: true });
  });

  test('Translations for plain page should work', async () => {
    const { page } = context;

    await toggleLanguage(page);
    await expect(page).toHaveScreenshot('plain-page-language-toggled.png', { fullPage: true });
  });

  test('Open menu', async () => {
    const { page } = context;
    await resetTranslations(page);

    await openMenu(page);

    await expect(page).toHaveScreenshot('settings-open.png', { fullPage: true });
  });

  test('Open menu with language toggle', async () => {
    const { page } = context;
    await resetTranslations(page);

    await toggleLanguage(page);
    await openMenu(page);

    await expect(page).toHaveScreenshot('settings-open-language-toggled.png', { fullPage: true });
  });
});

async function openMenu(page: Page): Promise<void> {
  const settingsButtonEn: Locator = page.getByRole('button', { name: 'Settings' });
  const settingsButtonNl: Locator = page.getByRole('button', { name: 'Instellingen' });

  if (await settingsButtonEn.count()) {
    await settingsButtonEn.click();
    return;
  }

  if (await settingsButtonNl.count()) {
    await settingsButtonNl.click();
    return;
  }

  throw new Error('Settings toggle button not found');
}

async function toggleLanguage(page: Page): Promise<void> {
  const langButtonEn: Locator = page.getByRole('button', { name: 'Lang' });
  // eslint-disable-next-line spellcheck/spell-checker
  const langButtonNl: Locator = page.getByRole('button', { name: 'Taal' });

  if (await langButtonEn.count()) {
    await langButtonEn.first().click();
    return;
  }

  if (await langButtonNl.count()) {
    await langButtonNl.first().click();
    return;
  }

  throw new Error('Language toggle button not found');
}

async function closeMenu(page: Page): Promise<void> {
  const closeMenuEn: Locator = page.getByRole('button', { name: 'Close Menu' });
  // eslint-disable-next-line spellcheck/spell-checker
  const closeMenuNl: Locator = page.getByRole('button', { name: 'Sluit Menu' });

  if (await closeMenuEn.count()) {
    await closeMenuEn.click();
    return;
  }

  if (await closeMenuNl.count()) {
    await closeMenuNl.click();
    return;
  }
}

async function resetTranslations(page: Page): Promise<void> {
  const languageButtonEn: Locator = page.getByRole('button', { name: 'Lang' });
  const isVisible: boolean = await languageButtonEn.isVisible();
  if (!isVisible) await toggleLanguage(page);
  await closeMenu(page);
}
