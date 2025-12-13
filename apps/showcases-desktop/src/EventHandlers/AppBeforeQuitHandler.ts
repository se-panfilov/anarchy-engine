import type { TDesktopAppService } from '@Showcases/Desktop/Models';
import type { App, Event } from 'electron';

export function appBeforeQuitHandler(app: App, desktopAppService: TDesktopAppService): void {
  app.on('before-quit', (event: Event): void => {
    /// Using a single point of exiting the app
    if (!desktopAppService.isExiting()) {
      event.preventDefault();
      desktopAppService.closeApp();
    }
  });
}
