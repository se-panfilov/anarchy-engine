import { app, BrowserWindow, ipcMain } from 'electron';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'node:fs';

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = dirname(__filename);

function createWindow(): void {
  // TODO DESKTOP: why fixed resolution?
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      // TODO DESKTOP: what is "contextIsolation"?
      contextIsolation: true,
      preload: join(__dirname, 'preload.js')
    }
  });

  const indexPath: string = resolve(__dirname, '../../dist/index.html');
  console.log('__dirname', __dirname);
  console.log('🔍 Resolved index.html path:', indexPath);
  console.log('📁 Exists:', fs.existsSync(indexPath));

  win.loadFile(indexPath);
  // win.loadURL(`file://${encodeURI(join(__dirname, '../dist/index.html'))}`);

  // TODO DESKTOP: Should come from .env file, to enable/disable dev tools.
  win.webContents.openDevTools();

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

app.whenReady().then(createWindow);
