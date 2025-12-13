import { app, BrowserWindow } from 'electron';
import { join } from 'path';

function createWindow(): void {
  // TODO DESKTOP: why fixed resolution?
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      // TODO DESKTOP: what is this?
      contextIsolation: true
    }
  });

  win.loadFile(join(__dirname, '../dist/index.html'));
}

app.whenReady().then(createWindow);
