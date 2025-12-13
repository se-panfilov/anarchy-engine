import type { BrowserWindow } from 'electron';

import type { TDesktopAppConfig } from './TDesktopAppConfig';

export type TWindowService = Readonly<{
  getIndexHtmlPath: () => string;
  createWindow: (width: number, height: number, settings: TDesktopAppConfig) => BrowserWindow;
}>;
