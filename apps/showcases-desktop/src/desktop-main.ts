import type { PlatformActions } from '@Showcases/Desktop/Constants';
import { appCrashHandler, appWindowAllClosedHandler, windowNavigateHandler, windowSecondInstanceHandler } from '@Showcases/Desktop/EventHandlers';
import type { TDesktopAppConfig, TDocsService, TSettingsService, TWindowService } from '@Showcases/Desktop/Models';
import { handleAppRequest, SettingsService, WindowService } from '@Showcases/Desktop/Services';
import { DocsService } from '@Showcases/Desktop/Services/DocsService';
import { getDisplayInfo, hideMenuBar, noZoom, turnOffMenuBarAndHotkeys } from '@Showcases/Desktop/Utils';
import { platformApiChannel } from '@Showcases/Shared';
import type { BrowserWindow, IpcMainInvokeEvent } from 'electron';
import { app, ipcMain } from 'electron';

const desktopAppSettings: TDesktopAppConfig = {
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
// TODO DESKTOP: Does "exit to desktop" button displayed (and works)?
// TODO DESKTOP: Send user locale to the app (then to menu) for translations

const windowService: TWindowService = WindowService();
const settingsService: TSettingsService = SettingsService(app);
const docsService: TDocsService = DocsService(app);

ipcMain.handle(platformApiChannel, (event: IpcMainInvokeEvent, ...args: [PlatformActions | string, unknown]) => handleAppRequest({ settingsService, docsService }, event, args));

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
