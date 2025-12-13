import type { TLocaleId } from '@Anarchy/i18n';
import { getBrowserInfo } from '@Anarchy/Shared/Utils';
import type { TDistName, TLegalDoc, TLoadDocPayload, TReleaseName, TShowcaseGameSettings, TShowcasesDesktopApi } from '@Showcases/Shared';
import { makeDistName, platformApiChannel, platformApiName } from '@Showcases/Shared';
import { DesktopPreloadTrackingService } from 'anarchy-tracking/src/Services/DesktopPreloadTrackingService';
import { contextBridge, ipcRenderer } from 'electron';

import { PlatformActions } from './src/Constants';

const { AppExit, AppRestart, GetAppSettings, GetLegalDocs, GetPackagesVersions, GetPreferredLocales, GetReleaseName, SetAppSettings, UpdateAppSettings } = PlatformActions;

const mapping: TShowcasesDesktopApi = {
  closeApp: (): Promise<void> => ipcRenderer.invoke(platformApiChannel, AppExit),
  desktopAppVersion: async (): Promise<string> => __DESKTOP_APP_VERSION__,
  electron: (): string => process.versions.electron,
  getAppSettings: (): Promise<TShowcaseGameSettings> => ipcRenderer.invoke(platformApiChannel, GetAppSettings),
  getBrowserInfo,
  getDistName: async (): Promise<TDistName> => makeDistName(process.platform, process.arch),
  getLegalDocs: (options: TLoadDocPayload): Promise<TLegalDoc> => ipcRenderer.invoke(platformApiChannel, GetLegalDocs, options),
  getPackagesVersions: async (): Promise<Record<string, string>> => ipcRenderer.invoke(platformApiChannel, GetPackagesVersions),
  getPreferredLocales: (): Promise<ReadonlyArray<TLocaleId>> => ipcRenderer.invoke(platformApiChannel, GetPreferredLocales),
  getReleaseName: (): Promise<TReleaseName> => ipcRenderer.invoke(platformApiChannel, GetReleaseName),
  node: (): string => process.versions.node,
  restartApp: (args?: ReadonlyArray<string>): Promise<void> => ipcRenderer.invoke(platformApiChannel, AppRestart, args),
  setAppSettings: (settings: TShowcaseGameSettings): Promise<void> => ipcRenderer.invoke(platformApiChannel, SetAppSettings, settings),
  setFirstRun: (isFirstRun: boolean): Promise<void> => ipcRenderer.invoke(platformApiChannel, UpdateAppSettings, { internal: { isFirstRun } })
};

//platformApiName will be available in the main app as `window[platformApiName]`
contextBridge.exposeInMainWorld(platformApiName, mapping);

if (import.meta.env.VITE_SENTRY_DSN) {
  DesktopPreloadTrackingService(
    {
      dsn: import.meta.env.VITE_SENTRY_DSN,
      environment: __PLATFORM_MODE__,
      release: __DESKTOP_APP_VERSION__
    },
    {
      //Other meta info (versions) will be added by DesktopTrackingService ("main" layer)
      desktop: __DESKTOP_APP_VERSION__,
      platformVersion: process.versions.electron,
      node: process.versions.node,
      wrappedAppVersion: __DESKTOP_APP_VERSION__
    }
  ).start();
}
