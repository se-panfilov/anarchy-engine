import type { App } from 'electron';

export function appCrashHandler(app: App): void {
  app.on('render-process-gone', (_event, _webContents, details) => {
    console.error(`Renderer crashed:`, details);
    // Could try to restart the window or something
  });
}
