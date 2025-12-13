import type { TDesktopAppService } from '@Showcases/Desktop/Models';
import type { App } from 'electron';
import { BrowserWindow } from 'electron';

export function DesktopAppService(app: App): TDesktopAppService {
  let isExitingApp: boolean = false;

  function closeWindow(win: BrowserWindow, delay: number = 3000): void {
    if (win.isDestroyed()) return;

    try {
      win.close();
    } catch (err: any) {
      console.log(`[DESKTOP]: Failed to gracefully close window ("${win.id}"): ${err}`);
    }

    setTimeout((): void => {
      if (win.isDestroyed()) return;
      console.log(`[DESKTOP]: Trying to force close window ("${win.id}")...`);

      try {
        win.destroy();
      } catch (err: any) {
        console.log(`[DESKTOP]: Failed to force close window ("${win.id}"): ${err}`);
      }
    }, delay);
  }

  const closeAllWindows = (delay: number = 3000): void => BrowserWindow.getAllWindows().forEach((win: BrowserWindow): void => closeWindow(win, delay));

  function closeApp(): void {
    if (isExitingApp) return;
    isExitingApp = true;
    console.log('[DESKTOP]: Closing app');

    closeAllWindows();

    // triggering before-quit/ will-quit / quit
    app.quit();
  }

  function restartApp(args: ReadonlyArray<string> = []): void {
    if (isExitingApp) return;
    isExitingApp = true;
    console.log('[DESKTOP]: Restarting app');

    closeAllWindows();
    const baseArgs: ReadonlyArray<string> = process.argv.slice(1).filter((a: string): boolean => a !== '--relaunch');
    app.relaunch({ args: [...baseArgs, '--relaunch', ...args] });

    app.exit(0);
  }

  return {
    closeApp,
    isExiting(): boolean {
      return isExitingApp;
    },
    restartApp
  };
}
