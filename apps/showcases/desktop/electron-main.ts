import { app, BrowserWindow, dialog, ipcMain, Menu } from 'electron';
import type { Event, WebContentsWillNavigateEventParams } from 'electron';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'node:fs';
import { getDisplayInfo } from './src/Utils/DisplayUtils.js';
import { handleAppRequest } from './src/Services/AppToPlatformMessagesService.js';
import { APP_TO_PLATFORM_CHANNEL } from './src/Constants/AppToPlatformMessagesConstants.js';

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = dirname(__filename);

const isOpenDevTools: boolean = true;

// TODO CWP
// TODO DESKTOP: Save/Load with files?
// TODO DESKTOP: Save/Load app's settings (screen resolution, fullscreen mode, etc.)
// TODO DESKTOP: Steam integration (manifest, cloud_sync.vdf, cloud saves, achievements, layer, etc.)
// TODO DESKTOP: Other integrations (epic, gog, etc.)
// TODO DESKTOP: Error forwarding to a file (with versions)
// TODO DESKTOP: Add canvas.requestPointerLock(); on a Space level
// TODO DESKTOP: Fix Electron Security Warning (Insecure Content-Security-Policy) https://www.electronjs.org/docs/latest/tutorial/security
// TODO DESKTOP: TS check, lint, prettier, etc.?
// TODO DESKTOP: npm scripts, like clean reinstall, generate licenses etc?
// TODO DESKTOP: Add readme
// TODO DESKTOP: Maybe move desktop app to the apps/showcases level?
// TODO DESKTOP: Can we avoid copying of dist-desktop to dist-app? (check paths in asar)
// TODO DESKTOP: add "sanitize assets" script for desktop/assets and mobile/assets

function getIndexHtmlPath(): string {
  const path: string = app.isPackaged ? join(app.getAppPath(), 'dist-app', 'index.html') : join(__dirname, '..', 'dist-app', 'index.html');

  if (!existsSync(path)) {
    const errMsg: string = `[Desktop Main] index.html not found at: ${path}`;
    console.error(errMsg);
    dialog.showErrorBox('Startup Error', errMsg);
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

ipcMain.handle(APP_TO_PLATFORM_CHANNEL, handleAppRequest);

app.whenReady().then((): void => {
  // TODO DESKTOP: use "getDisplayInfo()" as default settings, prioritize saved user settings and use hardcoded fallback settings. Same for fullscreen mode
  const { width, height } = getDisplayInfo();
  const win: BrowserWindow = createWindow(width, height);

  app.on('window-all-closed', (): void => {
    //Quit the app when all windows are closed (even on macOS, which is a bit non-macOS style)
    app.quit();

    // Makes quit not to quit on macOS (macOS style)
    // if (process.platform !== 'darwin') app.quit();
  });

  // Turn off the menu bar (and Hotkeys(!!!) such as Ctrl+R, Ctrl+F5, etc.)
  const emptyMenu: Menu = Menu.buildFromTemplate([]);
  Menu.setApplicationMenu(emptyMenu);

  // TODO DESKTOP: Make sure navigation isn't working (also from mouse extra buttons)
  win.webContents.on('will-navigate', (event: Event<WebContentsWillNavigateEventParams>, url: string): void => {
    console.log(`[Desktop Main] navigation to {event.url} `);

    // event.preventDefault(); // Prevent navigation to other pages

    // Prevent drag and drop navigation
    if (url !== win.webContents.getURL()) {
      event.preventDefault();
      console.log(`[Desktop Main] navigation by drag and drop prevented`);
    }
  });

  // win.webContents.on('will-prevent-unload', (event) => {
  // event.preventDefault(); // Prevent the default behavior of closing the window
  // });

  // Hide the menu bar
  win.setMenuBarVisibility(false);

  // No zooming
  win.webContents.setVisualZoomLevelLimits(1, 1).catch((err: any): void => {
    console.log('[Desktop Main] Error setting zoom level limits:');
    console.error(err);
  });

  // No new windows via window.open
  win.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));

  const gotTheLock: boolean = app.requestSingleInstanceLock();

  // TODO DESKTOP: Test this on windows
  //Allow only one instance of the app to run
  if (!gotTheLock) {
    app.quit(); // Close the second instance of the app
  } else {
    app.on('second-instance', (_event: unknown, _argv: ReadonlyArray<string>, _cwd: string): void => {
      // Restore the window if it was minimized
      if (win) {
        if (win.isMinimized()) win.restore();
        win.focus();
      }
    });
  }

  // app.on('will-quit', (): void => {
  //  // Some cleanup if needed
  // });

  // app.on('render-process-gone', (_event, webContents, details) => {
  //   console.error(`Renderer crashed:`, details);
  //   // Could try to restart the window or something
  // });
});
