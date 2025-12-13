import type { BrowserWindow } from 'electron';

import type { TDesktopAppSettings } from './TDesktopAppSettings';

export type TWindowService = Readonly<{
  getIndexHtmlPath: () => string;
  createWindow: (width: number, height: number, settings: TDesktopAppSettings) => BrowserWindow;
}>;
