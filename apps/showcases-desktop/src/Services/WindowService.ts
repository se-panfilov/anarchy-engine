import { existsSync } from 'node:fs';

import type { TDesktopAppConfig, TWindowService } from '@Showcases/Desktop/Models';
import { app, BrowserWindow, dialog } from 'electron';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

export const windowDefaultSettings: TDesktopAppConfig = {
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

  function getIndexHtmlPath(): string {
    const path: string = join(__dirname, 'dist-desktop', 'index.html');

    if (!existsSync(path)) {
      // TODO DESKTOP: can we log to the file?
      const errMsg: string = `[Desktop][Window service]: index.html not found at: ${path}`;
      console.error(errMsg);
      dialog.showErrorBox('[Desktop][Window service]: Startup Error', errMsg);
      app.quit();
    }

    return path;
  }

  function createWindow(width: number, height: number, { isOpenDevTools, showInstantly, isBorderless, isResizable, isFullScreenable, isFullScreen }: TDesktopAppConfig): BrowserWindow {
    const win: BrowserWindow = new BrowserWindow({
      ...windowDefaultSettings,
      width,
      height,
      show: !showInstantly,
      frame: !isBorderless,
      resizable: isResizable,
      fullscreenable: isFullScreenable,
      fullscreen: isFullScreen,
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

  return { getIndexHtmlPath, createWindow };
}
