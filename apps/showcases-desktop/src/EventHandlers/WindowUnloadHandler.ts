import type { BrowserWindow } from 'electron';

export function windowUnloadHandler(win: BrowserWindow): void {
  win.webContents.on('will-prevent-unload', (event) => {
    event.preventDefault(); // Prevent the default behavior of closing the window
  });
}
