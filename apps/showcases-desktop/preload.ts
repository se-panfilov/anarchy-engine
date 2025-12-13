import { contextBridge, ipcRenderer } from 'electron';
import { TShowcaseGameSettings, TShowcasesDesktopApi } from 'showcases_shared';
import { platformApiChannel, platformApiName } from '@ShowcasesShared/Constants/PlatformMessages';
import { PlatformActions } from './src/Constants';

const { SaveAppSettings, LoadAppSettings } = PlatformActions;

declare const __DESKTOP_APP_VERSION__: string;

const mapping: TShowcasesDesktopApi = {
  saveAppSettings: (settings: TShowcaseGameSettings): Promise<void> => ipcRenderer.invoke(platformApiChannel, SaveAppSettings, settings),
  loadAppSettings: (): Promise<TShowcaseGameSettings> => ipcRenderer.invoke(platformApiChannel, LoadAppSettings),
  node: (): string => process.versions.node,
  chrome: (): string => process.versions.chrome,
  electron: (): string => process.versions.electron,
  desktopAppVersion: async (): Promise<string> => __DESKTOP_APP_VERSION__
};

//platformApiName will be available in the main app as `window[platformApiName]`
contextBridge.exposeInMainWorld(platformApiName, mapping);
