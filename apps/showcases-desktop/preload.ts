import { contextBridge, ipcRenderer } from 'electron';
import { PlatformActions, platformApiChannel, platformApiName } from './src/Constants';
import type { TGameSettings } from 'showcases_shared';

const { SaveAppSettings, LoadAppSettings } = PlatformActions;

declare const __DESKTOP_APP_VERSION__: string;

//platformApiName will be available in the main world as `window.platformApi`
contextBridge.exposeInMainWorld(platformApiName, {
  saveAppSettings: (settings: TGameSettings): Promise<void> => ipcRenderer.invoke(platformApiChannel, SaveAppSettings, settings),
  loadAppSettings: (): Promise<TGameSettings> => ipcRenderer.invoke(platformApiChannel, LoadAppSettings),
  node: (): string => process.versions.node,
  chrome: (): string => process.versions.chrome,
  electron: (): string => process.versions.electron,
  desktopAppVersion: async (): Promise<string> => __DESKTOP_APP_VERSION__
});
