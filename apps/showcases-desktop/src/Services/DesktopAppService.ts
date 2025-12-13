import type { TDesktopAppService } from '@Showcases/Desktop/Models';
import type { App } from 'electron';
import { BrowserWindow } from 'electron';

export function DesktopAppService(app: App): TDesktopAppService {
  let isExitingApp: boolean = false;

  function closeAllWindows(): void {
    BrowserWindow.getAllWindows().forEach((win: BrowserWindow): void => {
      try {
        win.close();
      } catch (err: any) {
        console.log(`[DESKTOP]: Failed to close a window: ${err}`);
      }
    });
  }

  return {
    closeApp(): void {
      if (isExitingApp) return;
      isExitingApp = true;
      console.log('[DESKTOP]: Closing app');

      closeAllWindows();
      app.quit();
    },
    restartApp(args: ReadonlyArray<string> = []): void {
      if (isExitingApp) return;
      isExitingApp = true;
      console.log('[DESKTOP]: Restarting app');

      closeAllWindows();
      const baseArgs: ReadonlyArray<string> = process.argv.slice(1).filter((a: string): boolean => a !== '--relaunch');
      app.relaunch({ args: [...baseArgs, '--relaunch', ...args] });

      app.exit(0);
    }
  };
}
