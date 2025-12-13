import { app, BrowserWindow, dialog, ipcMain, Menu } from 'electron';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'node:fs';

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = dirname(__filename);

const windowHeight: number = 720;
const windowWidth: number = 1280;
const isOpenDevTools: boolean = true;

// TODO CWP
// TODO DESKTOP: Save/Load with files?
// TODO DESKTOP: Can we avoid copying of dist-desktop to dist-app? (check paths in asar)
// TODO DESKTOP: Save/Load app's settings (screen resolution, fullscreen mode, etc.)
// TODO DESKTOP: Detect resolution and set window size accordingly
// TODO DESKTOP: Add canvas.requestPointerLock(); on a Space level
// TODO DESKTOP: Error forwarding to a file
// TODO DESKTOP: Fix Electron Security Warning (Insecure Content-Security-Policy) https://www.electronjs.org/docs/latest/tutorial/security

function getIndexHtmlPath(): string {
  const path: string = app.isPackaged ? join(app.getAppPath(), 'dist-app', 'index.html') : join(__dirname, '..', 'dist-app', 'index.html');

  if (!existsSync(path)) {
    const errMsg: string = `[Main] index.html not found at: ${path}`;
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

  // TODO DESKTOP: Enable hot reloading in development mode.
  // try {
  //   require('electron-reloader')(module);
  // } catch (_) {}

  return win;
}

// TODO DESKTOP: could it be a better place for this?
// TODO DESKTOP: "ping" is just a test api, remove it.
ipcMain.handle('ping', async () => {
  return 'pong';
});

app.whenReady().then((): void => {
  const win: BrowserWindow = createWindow(windowWidth, windowHeight);

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
  win.webContents.on('will-navigate', (event, url): void => {
    console.log(`[NAVIGATION] navigation to {event.url} `);

    // event.preventDefault(); // Prevent navigation to other pages

    // Prevent drag and drop navigation
    if (url !== win.webContents.getURL()) {
      event.preventDefault();
      console.log(`[NAVIGATION] navigation by drag and drop prevented`);
    }
  });

  // win.webContents.on('will-prevent-unload', (event) => {
  // event.preventDefault(); // Prevent the default behavior of closing the window
  // });

  // Hide the menu bar
  win.setMenuBarVisibility(false);

  // No zooming
  win.webContents.setVisualZoomLevelLimits(1, 1).catch((err: any): void => {
    console.log('[Main] Error setting zoom level limits:');
    console.error(err);
  });

  // No new windows via window.open
  win.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
});
