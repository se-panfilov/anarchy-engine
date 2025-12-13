import { app, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';

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
}

// TODO DESKTOP: could it be a better place for this?
// TODO DESKTOP: "ping" is just a test api, remove it.
ipcMain.handle('ping', async () => {
  return 'pong';
});

app.whenReady().then(createWindow);
