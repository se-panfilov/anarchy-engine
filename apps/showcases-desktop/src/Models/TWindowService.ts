import type { FullScreenMode } from '@Showcases/Desktop/Constants/FullScreenModes';
import type { TResolution } from '@Showcases/Shared';
import type { BrowserWindow } from 'electron';

import type { TDesktopAppConfig } from './TDesktopAppConfig';

export type TWindowService = Readonly<{
  createWindow: (width: number, height: number, settings: TDesktopAppConfig) => BrowserWindow;
  findWindow: () => BrowserWindow | undefined;
  getFullScreenMode: () => FullScreenMode;
  getIndexHtmlPath: () => string;
  getWindow: () => BrowserWindow | never;
  isFullScreen: () => boolean;
  setFullScreen: (isFullScreen: boolean) => void;
  setWindowSize: (resolution: TResolution) => void;
}>;
