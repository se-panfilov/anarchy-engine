import type { BrowserBrand, BrowserEngine, OperatingSystem } from '@Anarchy/Shared/Constants';

import type { TBrowserBrandVersion } from './TBrowserBrandVersion';

export type TBrowserInfo = Readonly<{
  brand: BrowserBrand;
  version: string;
  engine: BrowserEngine;
  os: OperatingSystem;
  isMobile: boolean;
  model?: string;
  architecture?: string;
  fullVersionList?: ReadonlyArray<TBrowserBrandVersion>;
  userAgent?: string;
}>;
