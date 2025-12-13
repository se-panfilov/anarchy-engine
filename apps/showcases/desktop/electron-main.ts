import { app, BrowserWindow, dialog, ipcMain } from 'electron';
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
// TODO DESKTOP: Block browser's hotkeys and navigation

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

function createWindow(width: number, height: number): void {
  const win = new BrowserWindow({
    width,
    height,
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
}

// TODO DESKTOP: could it be a better place for this?
// TODO DESKTOP: "ping" is just a test api, remove it.
ipcMain.handle('ping', async () => {
  return 'pong';
});

app.whenReady().then((): void => {
  createWindow(windowWidth, windowHeight);

  // TODO DESKTOP: test this case
  app.on('activate', (): void => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow(windowWidth, windowHeight);
  });

  // TODO DESKTOP: test this case
  app.on('window-all-closed', (): void => {
    // Quit when all windows are closed, except on macOS. There, it's common
    // for applications and their menu bar to stay active until the user quits
    // explicitly with Cmd + Q.
    if (process.platform !== 'darwin') app.quit();
  });
});
