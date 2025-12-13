import { contextBridge, ipcRenderer } from 'electron';
import type { TLoadDocPayload, TShowcaseGameSettings, TShowcasesDesktopApi } from '@Showcases/Shared';
import { platformApiChannel, platformApiName } from '@Showcases/Shared';
import { PlatformActions } from './src/Constants';
import type { TLegalDoc } from 'showcases-shared';

const { SaveAppSettings, LoadAppSettings, LoadLegalDocs } = PlatformActions;

declare const __DESKTOP_APP_VERSION__: string;

const mapping: TShowcasesDesktopApi = {
  saveAppSettings: (settings: TShowcaseGameSettings): Promise<void> => ipcRenderer.invoke(platformApiChannel, SaveAppSettings, settings),
  loadAppSettings: (): Promise<TShowcaseGameSettings> => ipcRenderer.invoke(platformApiChannel, LoadAppSettings),
  loadLegalDocs: (options: TLoadDocPayload): Promise<TLegalDoc> => ipcRenderer.invoke(platformApiChannel, LoadLegalDocs, options),
  node: (): string => process.versions.node,
  chrome: (): string => process.versions.chrome,
  electron: (): string => process.versions.electron,
  desktopAppVersion: async (): Promise<string> => __DESKTOP_APP_VERSION__
};

//platformApiName will be available in the main app as `window[platformApiName]`
contextBridge.exposeInMainWorld(platformApiName, mapping);
