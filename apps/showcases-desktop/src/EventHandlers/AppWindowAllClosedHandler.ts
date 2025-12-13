import type { App } from 'electron';

export function appWindowAllClosedHandler(app: App): void {
  app.on('window-all-closed', (): void => {
    //Quit the app when all windows are closed (even on macOS, which is a bit non-macOS style)
    app.quit();

    // Makes quit not to quit on macOS (macOS style)
    // if (process.platform !== 'darwin') app.quit();
  });
}
