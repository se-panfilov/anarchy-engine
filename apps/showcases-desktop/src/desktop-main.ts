import type { PlatformActions } from '@Showcases/Desktop/Constants';
import { appBeforeQuitHandler, appCrashHandler, appWindowAllClosedHandler, windowNavigateHandler, windowReadyToShow, windowSecondInstanceHandler } from '@Showcases/Desktop/EventHandlers';
import type { TDesktopAppConfig, TDesktopAppService, TDocsService, TFilesService, TSettingsService, TWindowService } from '@Showcases/Desktop/Models';
import { DesktopAppService, DocsService, FilesService, handleAppRequest, SettingsService, WindowService } from '@Showcases/Desktop/Services';
import { getWindowSizeSafe, hideMenuBar, noZoom, turnOffMenuBarAndHotkeys } from '@Showcases/Desktop/Utils';
import type { TResolution, TShowcaseGameSettings } from '@Showcases/Shared';
import { platformApiChannel } from '@Showcases/Shared';
import type { BrowserWindow, IpcMainInvokeEvent } from 'electron';
import { app, ipcMain } from 'electron';

const desktopAppSettings: TDesktopAppConfig = {
  isOpenDevTools: true
};

// TODO DESKTOP: Steam integration (manifest, cloud_sync.vdf, cloud saves, achievements, layer, etc.)
// TODO DESKTOP: Other integrations (epic, gog, etc.)
// TODO DESKTOP: Add getting game's and engine's versions in preload.ts
// TODO DESKTOP: Error forwarding to a file (with versions)
// TODO DESKTOP: Add canvas.requestPointerLock(); on a Space level
// TODO DESKTOP: Fix Electron Security Warning (Insecure Content-Security-Policy) https://www.electronjs.org/docs/latest/tutorial/security
// TODO DESKTOP: We need e2e eventually
// TODO DESKTOP: Add .env files for different platforms (macos, windows, linux).

const desktopAppService: TDesktopAppService = DesktopAppService(app);
const windowService: TWindowService = WindowService();
const filesService: TFilesService = FilesService(app);
const settingsService: TSettingsService = SettingsService(app, filesService);
const docsService: TDocsService = DocsService(filesService);

ipcMain.handle(platformApiChannel, (event: IpcMainInvokeEvent, ...args: [PlatformActions | string, unknown]) => handleAppRequest({ settingsService, docsService, desktopAppService }, event, args));

app.whenReady().then(async (): Promise<void> => {
  // TODO DESKTOP: save this settings into a desktop-level store (to implement) and return value from there when app requests (also update it on save and use it for apply)
  const settings: TShowcaseGameSettings = await settingsService.loadAppSettings();

  const initialWindowSize: TResolution = getWindowSizeSafe();
  const win: BrowserWindow = windowService.createWindow(initialWindowSize.width, initialWindowSize.height, desktopAppSettings);

  windowReadyToShow(win, settings);
  appWindowAllClosedHandler(app);
  turnOffMenuBarAndHotkeys();
  // TODO DESKTOP: Make sure navigation isn't working (also from mouse extra buttons)
  windowNavigateHandler(win);
  // useWindowUnloadHandler(win);
  hideMenuBar(win);
  noZoom(win);
  windowSecondInstanceHandler(app, win);
  // Some cleanup if needed
  appBeforeQuitHandler(app, desktopAppService);
  //appQuitHandler(app);
  // On crash. Could try to restart the window or something
  appCrashHandler(app);
});
