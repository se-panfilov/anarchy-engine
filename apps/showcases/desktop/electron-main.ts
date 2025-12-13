import { app, BrowserWindow, ipcMain } from 'electron';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

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

  win.loadFile(join(__dirname, '../dist/index.html'));

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
