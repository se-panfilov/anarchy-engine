import { existsSync } from 'node:fs';

import { platformApiChannel } from '@Desktop/Constants';
import { appCrashHandler, appWindowAllClosedHandler, windowNavigateHandler, windowSecondInstanceHandler } from '@Desktop/EventHandlers';
import { handleAppRequest } from '@Desktop/Services';
import { getDisplayInfo } from '@Desktop/Utils';
import { app, BrowserWindow, dialog, ipcMain, Menu } from 'electron';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = dirname(__filename);

const isOpenDevTools: boolean = true;

// TODO CWP
// TODO DESKTOP: Save/Load with files?
// TODO DESKTOP: Save/Load app's settings (screen resolution, fullscreen mode, etc.)
// TODO DESKTOP: Steam integration (manifest, cloud_sync.vdf, cloud saves, achievements, layer, etc.)
// TODO DESKTOP: Other integrations (epic, gog, etc.)
// TODO DESKTOP: Add getting game's and engine's versions in preload.ts
// TODO DESKTOP: Error forwarding to a file (with versions)
// TODO DESKTOP: Add canvas.requestPointerLock(); on a Space level
// TODO DESKTOP: Fix Electron Security Warning (Insecure Content-Security-Policy) https://www.electronjs.org/docs/latest/tutorial/security
// TODO DESKTOP: We need e2e eventually
// TODO DESKTOP: Add .env files for different platforms (macos, windows, linux).

function getIndexHtmlPath(): string {
  const path: string = join(__dirname, 'dist-desktop', 'index.html');

  if (!existsSync(path)) {
    const errMsg: string = `[Desktop Main]: index.html not found at: ${path}`;
    console.error(errMsg);
    dialog.showErrorBox('[Desktop Main]: Startup Error', errMsg);
    app.quit();
  }

  return path;
}

function createWindow(width: number, height: number): BrowserWindow {
  const win = new BrowserWindow({
    width,
    height,
    // TODO DESKTOP: Is Fullscreen or not should depend on the app settings
    // TODO DESKTOP: Change default fullscreen mode to "true"
    fullscreen: false,
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

ipcMain.handle(platformApiChannel, handleAppRequest);

app.whenReady().then((): void => {
  // TODO DESKTOP: use "getDisplayInfo()" as default settings, prioritize saved user settings and use hardcoded fallback settings. Same for fullscreen mode
  const { width, height } = getDisplayInfo();
  const win: BrowserWindow = createWindow(width, height);

  appWindowAllClosedHandler(app);

  // Turn off the menu bar (and Hotkeys(!!!) such as Ctrl+R, Ctrl+F5, etc.)
  const emptyMenu: Menu = Menu.buildFromTemplate([]);
  Menu.setApplicationMenu(emptyMenu);

  // TODO DESKTOP: Make sure navigation isn't working (also from mouse extra buttons)
  windowNavigateHandler(win);
  // useWindowUnloadHandler(win);

  // Hide the menu bar
  win.setMenuBarVisibility(false);

  // No zooming
  win.webContents.setVisualZoomLevelLimits(1, 1).catch((err: any): void => {
    console.log('[Desktop Main]: Error setting zoom level limits:');
    console.error(err);
  });

  windowSecondInstanceHandler(app, win);

  // Some cleanup if needed
  //appQuitHandler(app);

  // On crash. Could try to restart the window or something
  appCrashHandler(app);
});
