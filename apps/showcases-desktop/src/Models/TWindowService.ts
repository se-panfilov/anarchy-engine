import type { BrowserWindow } from 'electron';

import type { TDesktopAppConfig } from './TDesktopAppConfig';

export type TWindowService = Readonly<{
  createWindow: (width: number, height: number, settings: TDesktopAppConfig) => BrowserWindow;
  findWindow: () => BrowserWindow | undefined;
  getIndexHtmlPath: () => string;
  getWindow: () => BrowserWindow | never;
}>;
