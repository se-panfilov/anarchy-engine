import type { ElectronApplication, Page } from '@playwright/test';

export type TDesktopAppLaunchResult = Readonly<{
  electronApp: ElectronApplication;
  page: Page;
}>;
