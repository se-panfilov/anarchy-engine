import type { Page } from '@playwright/test';

export type TLaunchContext = Readonly<{
  page: Page;
}>;
