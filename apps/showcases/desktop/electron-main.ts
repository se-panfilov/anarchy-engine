import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'node:fs';

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = dirname(__filename);

const windowHeight: number = 720;
const windowWidth: number = 1280;
const isOpenDevTools: boolean = true;

function getIndexHtmlPath(): string {
  const path: string = app.isPackaged ? join(app.getAppPath(), 'game-dist', 'index.html') : join(__dirname, '..', 'game-dist', 'index.html');

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

  const indexPath: string = getIndexHtmlPath();
  win.loadFile(indexPath);

  if (isOpenDevTools) win.webContents.openDevTools();

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

app.whenReady().then((): void => createWindow(windowWidth, windowHeight));
