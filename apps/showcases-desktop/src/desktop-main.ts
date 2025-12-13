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
// TODO DESKTOP: Error forwarding to a file (with versions)
// TODO DESKTOP: Add canvas.requestPointerLock(); on a Space level
// TODO DESKTOP: We need e2e eventually
// TODO DESKTOP: Add .env files for different platforms (macos, windows, linux).
// TODO DESKTOP: 3d texts doesn't work in Safari
// TODO DESKTOP: Build every platform-version on any machine (use docker or something)
// TODO DESKTOP: Windows: make sure we can build the project (done, but re-check)
// TODO DESKTOP: Windows: some models (glb?) cannot obtain textures
// TODO DESKTOP: Windows: CSP hits: sometimes cannot load fonts
// TODO DESKTOP: Linux: make sure we can build the project

const filesService: TFilesService = FilesService(app);
const desktopAppService: TDesktopAppService = DesktopAppService(app, { filesService });
const windowService: TWindowService = WindowService();
const settingsService: TSettingsService = SettingsService(app, { filesService, windowService });
const docsService: TDocsService = DocsService(filesService);

ipcMain.handle(platformApiChannel, (event: IpcMainInvokeEvent, ...args: [PlatformActions | string, unknown]) => handleAppRequest({ settingsService, docsService, desktopAppService }, event, args));

app.whenReady().then(async (): Promise<void> => {
  const initialWindowSize: TResolution = getWindowSizeSafe();
  const win: BrowserWindow = windowService.createWindow(initialWindowSize.width, initialWindowSize.height, desktopAppSettings);

  //Note: Do not "await" before window creation (cause problems in production – invisible window)
  const settings: TShowcaseGameSettings = await settingsService.getAppSettings();

  windowReadyToShow(win, settings, windowService);
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
