import type { ElectronApplication, Page } from '@playwright/test';

export type TLaunchContext = Readonly<{
  page: Page;
  electronApp: ElectronApplication;
}>;
