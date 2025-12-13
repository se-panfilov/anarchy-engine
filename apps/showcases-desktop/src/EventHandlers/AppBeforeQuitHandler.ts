import type { TDesktopAppService } from '@Showcases/Desktop/Models';
import type { App } from 'electron';

export function appBeforeQuitHandler(app: App, desktopAppService: TDesktopAppService): void {
  app.on('before-quit', (e): void => {
    /// Using a single point of exiting the app
    if (!desktopAppService.isExiting()) {
      e.preventDefault();
      desktopAppService.closeApp();
    }
  });
}
