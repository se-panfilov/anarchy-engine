import { isDefined } from '@Anarchy/Shared/Utils';
import type { PlatformActions } from '@Showcases/Desktop/Constants';
import { appBeforeQuitHandler, appCrashHandler, appWindowAllClosedHandler, windowNavigateHandler, windowReadyToShow, windowSecondInstanceHandler } from '@Showcases/Desktop/EventHandlers';
import type { TDesktopAppConfig, TDesktopAppService, TDocsService, TFilesService, TSettingsService, TWindowService } from '@Showcases/Desktop/Models';
import { DesktopAppService, DocsService, ElectronErrorTrackingService, FilesService, handleAppRequest, SettingsService, WindowService } from '@Showcases/Desktop/Services';
import { getWindowSizeSafe, hideMenuBar, noZoom, turnOffMenuBarAndHotkeys } from '@Showcases/Desktop/Utils';
import type { TResolution, TShowcaseGameSettings } from '@Showcases/Shared';
import { platformApiChannel } from '@Showcases/Shared';
import type { BrowserWindow, IpcMainInvokeEvent } from 'electron';
import { app, ipcMain } from 'electron';

const isDevToolsStr: string = app.commandLine.getSwitchValue('dev-tools');

const desktopAppSettings: TDesktopAppConfig = {
  isOpenDevTools: isDevToolsStr === 'true' || import.meta.env.VITE_IS_DEV_TOOL_OPEN === 'true' || false,
  isForceDpr: import.meta.env.VITE_IS_FORCE_DPR === 'true' || false,
  highDpiSupport: import.meta.env.VITE_HIGH_DPI_SUPPORT ? Number(import.meta.env.VITE_HIGH_DPI_SUPPORT) : undefined
};

// TODO DESKTOP: Linux: make sure we can build the project
// TODO DESKTOP: Steam integration (manifest, cloud_sync.vdf, cloud saves, achievements, layer, etc.)
// TODO DESKTOP: Other integrations (epic, gog, etc.)

const filesService: TFilesService = FilesService(app);
const desktopAppService: TDesktopAppService = DesktopAppService(app, { filesService });

let packagesVersions: Record<string, string> = { error: 'Could not get versions' };
try {
  packagesVersions = await desktopAppService.getPackagesVersions();
} catch (e) {
  console.warn('Could not get packages versions for error tracking', e);
}

//Allow tracking for production (only Electron part, web part should be tracked separately)
ElectronErrorTrackingService().start(packagesVersions);

const windowService: TWindowService = WindowService();
const settingsService: TSettingsService = SettingsService(app, { filesService, windowService });
const docsService: TDocsService = DocsService(filesService);

ipcMain.handle(platformApiChannel, (event: IpcMainInvokeEvent, ...args: [PlatformActions | string, unknown]) => handleAppRequest({ settingsService, docsService, desktopAppService }, event, args));

// Set DPR and High DPI support if needed (mostly for E2E-screenshots tests, to make them the same on different devices)
if (desktopAppSettings.isForceDpr) {
  app.commandLine.appendSwitch('force-device-scale-factor', String(desktopAppSettings.isForceDpr));
  app.commandLine.appendSwitch('high-dpi-support', String(desktopAppSettings.highDpiSupport));
}

app.whenReady().then(async (): Promise<void> => {
  const initialWindowSize: TResolution = getWindowSizeSafe();
  const win: BrowserWindow = windowService.createWindow(initialWindowSize.width, initialWindowSize.height, desktopAppSettings);

  //Note: Do not "await" before window creation (cause problems in production – invisible window)
  const settings: TShowcaseGameSettings = await settingsService.getAppSettings();
  if (isDefined(settings.graphics.resolution)) windowService.setWindowSize(settings.graphics.resolution);

  windowReadyToShow(win, settings, windowService);
  appWindowAllClosedHandler(app);
  turnOffMenuBarAndHotkeys();
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
