import { contextBridge, ipcRenderer } from 'electron';
import type { TLoadDocPayload, TShowcaseGameSettings, TShowcasesDesktopApi } from '@Showcases/Shared';
import { platformApiChannel, platformApiName } from '@Showcases/Shared';
import { PlatformActions } from './src/Constants';
import type { TLegalDoc } from 'showcases-shared';

const { AppExit, AppRestart, UpdateAppSettings, WriteAppSettings, ReadAppSettings, ReadLegalDocs } = PlatformActions;

declare const __DESKTOP_APP_VERSION__: string;

const mapping: TShowcasesDesktopApi = {
  chrome: (): string => process.versions.chrome,
  closeApp: (): Promise<void> => ipcRenderer.invoke(platformApiChannel, AppExit),
  desktopAppVersion: async (): Promise<string> => __DESKTOP_APP_VERSION__,
  electron: (): string => process.versions.electron,
  readAppSettings: (): Promise<TShowcaseGameSettings> => ipcRenderer.invoke(platformApiChannel, ReadAppSettings),
  loadLegalDocs: (options: TLoadDocPayload): Promise<TLegalDoc> => ipcRenderer.invoke(platformApiChannel, ReadLegalDocs, options),
  node: (): string => process.versions.node,
  restartApp: (args?: ReadonlyArray<string>): Promise<void> => ipcRenderer.invoke(platformApiChannel, AppRestart, args),
  setFirstRun: (isFirstRun: boolean): Promise<void> => ipcRenderer.invoke(platformApiChannel, UpdateAppSettings, { internal: { isFirstRun } }),
  writeAppSettings: (settings: TShowcaseGameSettings): Promise<void> => ipcRenderer.invoke(platformApiChannel, WriteAppSettings, settings)
};

//platformApiName will be available in the main app as `window[platformApiName]`
contextBridge.exposeInMainWorld(platformApiName, mapping);
