import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'node:fs';

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = dirname(__filename);

// TODO DESKTOP: These vars should come from .env files:
const FAKE_ENV_IS_PROD: boolean = false;
const FAKE_ENV_WINDOW_HEIGHT: number = 720;
const FAKE_ENV_WINDOW_WIDTH: number = 1280;
const FAKE_ENV_IS_OPEN_DEV_TOOLS: boolean = true;

function getIndexHtmlPath(isProdMode: boolean): string {
  console.log('[Main] isProdMode:', isProdMode);
  //console.log('XXX app.isPackaged', app.isPackaged);
  //   // console.log('XXX resolve', join(process.resourcesPath, 'dist', 'index.html'));
  //   const indexPath: string = false ? resolve(__dirname, '../../dist/index.html') : join(process.resourcesPath, 'dist', 'index.html');
  //   // const indexPath: string = resolve(__dirname, '../../dist/index.html');
  const path: string = isProdMode ? join(process.resourcesPath, 'dist', 'index.html') : resolve(__dirname, '../../dist/index.html');
  //   console.log('Resolved index.html path:', path);
  //   console.log('Exists:', fs.existsSync(path));

  if (!existsSync(path)) {
    const errMsg: string = `[Main] index.html not found at: ${path}`;
    console.error(errMsg);
    dialog.showErrorBox('Startup Error', errMsg);
    app.quit();
  }

  return path;
}

function createWindow(width: number, height: number): void {
  const win = new BrowserWindow({
    width,
    height,
    webPreferences: {
      // TODO DESKTOP: what is "contextIsolation"?
      contextIsolation: true,
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: false //Must be off fore security reasons
    }
  });

  // TODO DESKTOP: Should come from .env file, to enable/disable dev tools.
  // const isProdMode: boolean = app.isPackaged;
  const isProdMode: boolean = false;
  const indexPath: string = getIndexHtmlPath(FAKE_ENV_IS_PROD);
  win.loadFile(indexPath);

  if (FAKE_ENV_IS_OPEN_DEV_TOOLS) win.webContents.openDevTools();

  // TODO DESKTOP: Should come from .env file, to enable/disable dev tools.
  // TODO DESKTOP: Enable hot reloading in development mode.
  // try {
  //   require('electron-reloader')(module);
  // } catch (_) {}
}

// TODO DESKTOP: could it be a better place for this?
// TODO DESKTOP: "ping" is just a test api, remove it.
ipcMain.handle('ping', async () => {
  return 'pong';
});

// TODO DESKTOP: Should come from .env file, to enable/disable dev tools.
app.whenReady().then((): void => createWindow(FAKE_ENV_WINDOW_WIDTH, FAKE_ENV_WINDOW_HEIGHT));
