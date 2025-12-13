import type { App } from 'electron';

export function appQuitHandler(app: App): void {
  app.on('will-quit', (): void => {
    // Some cleanup if needed
  });
}
