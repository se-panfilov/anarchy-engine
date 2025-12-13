import { platformApiChannel } from '@Desktop/Constants';
import { appCrashHandler, appWindowAllClosedHandler, windowNavigateHandler, windowSecondInstanceHandler } from '@Desktop/EventHandlers';
import type { TDesktopAppSettings } from '@Desktop/Models';
import { handleAppRequest, WindowService } from '@Desktop/Services';
import { getDisplayInfo, hideMenuBar, noZoom, turnOffMenuBarAndHotkeys } from '@Desktop/Utils';
import type { BrowserWindow } from 'electron';
import { app, ipcMain } from 'electron';

const desktopAppSettings: TDesktopAppSettings = {
  isOpenDevTools: true
};

// TODO CWP
// TODO DESKTOP: Save/Load with files?
// TODO DESKTOP: Save/Load app's settings (screen resolution, fullscreen mode, etc.)
// TODO DESKTOP: Steam integration (manifest, cloud_sync.vdf, cloud saves, achievements, layer, etc.)
// TODO DESKTOP: Other integrations (epic, gog, etc.)
// TODO DESKTOP: Add getting game's and engine's versions in preload.ts
// TODO DESKTOP: Error forwarding to a file (with versions)
// TODO DESKTOP: Add canvas.requestPointerLock(); on a Space level
// TODO DESKTOP: Fix Electron Security Warning (Insecure Content-Security-Policy) https://www.electronjs.org/docs/latest/tutorial/security
// TODO DESKTOP: We need e2e eventually
// TODO DESKTOP: Add .env files for different platforms (macos, windows, linux).

const windowService = WindowService();
ipcMain.handle(platformApiChannel, handleAppRequest);

app.whenReady().then((): void => {
  // TODO DESKTOP: use "getDisplayInfo()" as default settings, prioritize saved user settings and use hardcoded fallback settings. Same for fullscreen mode
  const { width, height } = getDisplayInfo();
  const win: BrowserWindow = windowService.createWindow(width, height, desktopAppSettings);

  appWindowAllClosedHandler(app);
  turnOffMenuBarAndHotkeys();
  // TODO DESKTOP: Make sure navigation isn't working (also from mouse extra buttons)
  windowNavigateHandler(win);
  // useWindowUnloadHandler(win);
  hideMenuBar(win);
  noZoom(win);
  windowSecondInstanceHandler(app, win);
  // Some cleanup if needed
  //appQuitHandler(app);
  // On crash. Could try to restart the window or something
  appCrashHandler(app);
});
