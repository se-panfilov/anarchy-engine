import { contextBridge, ipcRenderer } from 'electron';
import type { TLoadDocPayload, TShowcaseGameSettings, TShowcasesDesktopApi } from '@Showcases/Shared';
import { platformApiChannel, platformApiName } from '@Showcases/Shared';
import { PlatformActions } from './src/Constants';
import type { TLegalDoc } from 'showcases-shared';
import { TLocaleId } from 'anarchy-i18n';
import { getBrowserInfo } from 'anarchy-shared/src/Utils';

const { AppExit, AppRestart, GetAppSettings, GetLegalDocs, GetPreferredLocales, SetAppSettings, UpdateAppSettings } = PlatformActions;

declare const __DESKTOP_APP_VERSION__: string;

const mapping: TShowcasesDesktopApi = {
  closeApp: (): Promise<void> => ipcRenderer.invoke(platformApiChannel, AppExit),
  desktopAppVersion: async (): Promise<string> => __DESKTOP_APP_VERSION__,
  electron: (): string => process.versions.electron,
  getAppSettings: (): Promise<TShowcaseGameSettings> => ipcRenderer.invoke(platformApiChannel, GetAppSettings),
  getBrowserInfo,
  getLegalDocs: (options: TLoadDocPayload): Promise<TLegalDoc> => ipcRenderer.invoke(platformApiChannel, GetLegalDocs, options),
  getPreferredLocales: (): Promise<ReadonlyArray<TLocaleId>> => ipcRenderer.invoke(platformApiChannel, GetPreferredLocales),
  node: (): string => process.versions.node,
  restartApp: (args?: ReadonlyArray<string>): Promise<void> => ipcRenderer.invoke(platformApiChannel, AppRestart, args),
  setAppSettings: (settings: TShowcaseGameSettings): Promise<void> => ipcRenderer.invoke(platformApiChannel, SetAppSettings, settings),
  setFirstRun: (isFirstRun: boolean): Promise<void> => ipcRenderer.invoke(platformApiChannel, UpdateAppSettings, { internal: { isFirstRun } })
};

//platformApiName will be available in the main app as `window[platformApiName]`
contextBridge.exposeInMainWorld(platformApiName, mapping);
