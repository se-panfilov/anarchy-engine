import { contextBridge, ipcRenderer } from 'electron';
import { PlatformActions, platformApiChannel, platformApiName } from './src/Constants';
import { TAppSettings } from './src/Models';

const { SaveAppSettings, LoadAppSettings } = PlatformActions;

declare const __APP_VERSION__: string;

contextBridge.exposeInMainWorld(platformApiName, {
  saveAppSettings: (settings: TAppSettings): Promise<void> => ipcRenderer.invoke(platformApiChannel, SaveAppSettings, settings),
  loadAppSettings: (): Promise<TAppSettings> => ipcRenderer.invoke(platformApiChannel, LoadAppSettings),
  node: (): string => process.versions.node,
  chrome: (): string => process.versions.chrome,
  electron: (): string => process.versions.electron,
  desktopAppVersion: async (): Promise<string> => __APP_VERSION__
});
