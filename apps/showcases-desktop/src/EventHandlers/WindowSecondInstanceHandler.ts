import type { App, BrowserWindow } from 'electron';

export function windowSecondInstanceHandler(app: App, win: BrowserWindow): void {
  // No new windows via window.open
  win.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));

  const gotTheLock: boolean = app.requestSingleInstanceLock();

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
}
