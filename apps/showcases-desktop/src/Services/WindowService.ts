import { existsSync } from 'node:fs';

import { isDefined, isNotDefined } from '@Anarchy/Shared/Utils';
import { FullScreenMode } from '@Showcases/Desktop/Constants/FullScreenModes';
import type { TDesktopAppConfig, TWindowService } from '@Showcases/Desktop/Models';
import { app, BrowserWindow, dialog } from 'electron';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

export const windowDefaultSettings: Required<TDesktopAppConfig> = {
  isOpenDevTools: false,
  showInstantly: false,
  isBorderless: false,
  isResizable: true,
  isFullScreenable: true,
  isFullScreen: false
};

export function WindowService(): TWindowService {
  const __filename: string = fileURLToPath(import.meta.url);
  const __dirname: string = dirname(__filename);
  let win: BrowserWindow | undefined;

  function getIndexHtmlPath(): string {
    const path: string = join(__dirname, 'dist-desktop', 'index.html');

    if (!existsSync(path)) {
      // TODO DESKTOP: can we log to the file?
      const errMsg: string = `[DESKTOP] index.html not found at: ${path}`;
      console.error(errMsg);
      dialog.showErrorBox('[DESKTOP] Startup Error', errMsg);
      app.quit();
    }

    return path;
  }

  function createWindow(width: number, height: number, { isOpenDevTools, showInstantly, isBorderless, isResizable, isFullScreenable, isFullScreen }: TDesktopAppConfig): BrowserWindow {
    const show: boolean = !(isDefined(showInstantly) ? showInstantly : windowDefaultSettings.showInstantly);
    const frame: boolean = !(isDefined(isBorderless) ? isBorderless : windowDefaultSettings.isBorderless);
    const resizable: boolean = isDefined(isResizable) ? isResizable : windowDefaultSettings.isResizable;
    const fullscreenable: boolean = isDefined(isFullScreenable) ? isFullScreenable : windowDefaultSettings.isFullScreenable;
    const fullscreen: boolean = isDefined(isFullScreen) ? isFullScreen : windowDefaultSettings.isFullScreen;

    win = new BrowserWindow({
      ...windowDefaultSettings,
      width,
      height,
      show,
      frame,
      resizable,
      fullscreenable,
      fullscreen,
      autoHideMenuBar: true,
      useContentSize: true,
      hiddenInMissionControl: true,
      webPreferences: {
        contextIsolation: true,
        preload: join(__dirname, 'preload.js'),
        nodeIntegration: false //Must be off fore security reasons
      }
    });

    const indexPath: string = getIndexHtmlPath();
    win.loadFile(indexPath);

    if (isOpenDevTools) win.webContents.openDevTools();

    // Hot reloading (in development mode)
    // try {
    //   require('electron-reloader')(module);
    // } catch (_) {}

    return win;
  }

  function getWindow(): BrowserWindow | never {
    if (isNotDefined(win)) throw new Error('[DESKTOP] Window is not defined');
    return win;
  }

  //This is just a style preference to use SimpleFullScreen on macOS, not a "must"
  const getFullScreenMode = (): FullScreenMode => (process.platform === 'darwin' ? FullScreenMode.SimpleFullScreen : FullScreenMode.FullScreen);

  function setFullScreen(isFullScreen: boolean): void {
    const win: BrowserWindow = getWindow();
    const mode: FullScreenMode = getFullScreenMode();

    switch (mode) {
      case FullScreenMode.SimpleFullScreen:
        win.setSimpleFullScreen(isFullScreen);
        break;
      case FullScreenMode.FullScreen:
        win.setFullScreen(isFullScreen);
        break;
      default:
        throw new Error(`[DESKTOP] Unhandled fullscreen mode: ${mode}`);
    }
  }

  function isFullScreen(): boolean {
    const win: BrowserWindow = getWindow();
    const mode: FullScreenMode = getFullScreenMode();

    switch (mode) {
      case FullScreenMode.SimpleFullScreen:
        return win.isSimpleFullScreen();
      case FullScreenMode.FullScreen:
        return win.isFullScreen();
      default:
        throw new Error(`[DESKTOP] Unhandled fullscreen mode: ${mode}`);
    }
  }

  return {
    createWindow,
    findWindow: (): BrowserWindow | undefined => win,
    getFullScreenMode,
    getIndexHtmlPath,
    getWindow,
    isFullScreen,
    setFullScreen
  };
}
